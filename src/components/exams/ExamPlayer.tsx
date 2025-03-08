import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/lib/toast-context";

interface ExamQuestion {
  id: string;
  question: string;
  question_type: string;
  points: number;
  options: {
    id: string;
    option_text: string;
    is_correct: boolean;
  }[];
}

interface Exam {
  id: string;
  title: string;
  description: string;
  time_limit: number;
  difficulty: {
    name: string;
  };
  questions: ExamQuestion[];
}

const ExamPlayer = () => {
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExam = async () => {
      if (!examId) return;

      try {
        // Fetch exam details
        const { data: examData, error: examError } = await supabase
          .from("exams")
          .select(
            "id, title, description, time_limit, difficulty:difficulty_levels(name)",
          )
          .eq("id", examId)
          .single();

        if (examError) throw examError;

        // Fetch exam questions
        const { data: questionsData, error: questionsError } = await supabase
          .from("exam_questions")
          .select("id, question, question_type, points")
          .eq("exam_id", examId);

        if (questionsError) throw questionsError;

        // Fetch options for each question
        const questionsWithOptions = await Promise.all(
          questionsData.map(async (question) => {
            const { data: optionsData, error: optionsError } = await supabase
              .from("exam_question_options")
              .select("id, option_text, is_correct")
              .eq("exam_question_id", question.id);

            if (optionsError) throw optionsError;

            return {
              ...question,
              options: optionsData || [],
            };
          }),
        );

        setExam({
          ...examData,
          questions: questionsWithOptions,
        });

        // Calculate total points
        const total = questionsWithOptions.reduce(
          (sum, q) => sum + q.points,
          0,
        );
        setTotalPoints(total);

        // Set time remaining in seconds
        setTimeRemaining(examData.time_limit * 60);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching exam:", err);
        setError("Failed to load exam. Please try again later.");
        setLoading(false);
      }
    };

    fetchExam();

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [examId]);

  const startExam = () => {
    setExamStarted(true);

    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up, submit the exam
          clearInterval(timerRef.current!);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < exam!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitExam = async () => {
    if (!exam || !user) return;

    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Calculate score
    let userScore = 0;
    exam.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (!userAnswer) return;

      if (question.question_type === "multiple-choice") {
        const correctOption = question.options.find((opt) => opt.is_correct);
        if (correctOption && userAnswer === correctOption.id) {
          userScore += question.points;
        }
      } else if (question.question_type === "fill-in-blanks") {
        const correctOption = question.options.find((opt) => opt.is_correct);
        if (
          correctOption &&
          userAnswer.toLowerCase().trim() ===
            correctOption.option_text.toLowerCase().trim()
        ) {
          userScore += question.points;
        }
      }
    });

    setScore(userScore);

    // Save result to database
    try {
      await supabase.from("user_exam_results").insert({
        user_id: user.id,
        exam_id: exam.id,
        score: userScore,
        total_points: totalPoints,
        time_taken: exam.time_limit * 60 - timeRemaining,
      });

      // Update user points
      const { data: userPoints } = await supabase
        .from("user_points")
        .select("total_points, level")
        .eq("user_id", user.id)
        .single();

      if (userPoints) {
        // Award points based on score percentage
        const scorePercentage = (userScore / totalPoints) * 100;
        const pointsToAward = Math.round(scorePercentage / 10) * 10; // 10 points per 10% score

        await supabase
          .from("user_points")
          .update({
            total_points: userPoints.total_points + pointsToAward,
            // Level up if enough points (simple formula: level * 100 points needed)
            level:
              Math.floor((userPoints.total_points + pointsToAward) / 100) + 1,
          })
          .eq("user_id", user.id);
      }

      // Check for achievements
      const examCount = await supabase
        .from("user_exam_results")
        .select("id", { count: "exact" })
        .eq("user_id", user.id);

      if (examCount.count === 5) {
        // Award "Quiz Whiz" achievement
        const { data: quizAchievement } = await supabase
          .from("achievements")
          .select("id")
          .eq("name", "Quiz Whiz")
          .single();

        if (quizAchievement) {
          await supabase.from("user_achievements").insert({
            user_id: user.id,
            achievement_id: quizAchievement.id,
          });
        }
      }

      if (scorePercentage === 100) {
        // Award "Perfect Score" achievement
        const { data: perfectScoreAchievement } = await supabase
          .from("achievements")
          .select("id")
          .eq("name", "Perfect Score")
          .single();

        if (perfectScoreAchievement) {
          await supabase.from("user_achievements").insert({
            user_id: user.id,
            achievement_id: perfectScoreAchievement.id,
          });
        }

        // Show perfect score notification
        showToast("success", "Perfect score on the exam! +100 XP");
      } else {
        // Show regular completion notification
        showToast("info", `Exam completed! +${pointsToAward} XP`);
      }
    } catch (error) {
      console.error("Error saving exam results:", error);
    }

    setExamCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const renderQuestion = (question: ExamQuestion) => {
    if (question.question_type === "multiple-choice") {
      return (
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                <label
                  htmlFor={`option-${option.id}`}
                  className="flex-grow cursor-pointer text-base"
                >
                  {option.option_text}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    } else if (question.question_type === "fill-in-blanks") {
      return (
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          <Input
            type="text"
            placeholder="Type your answer here"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full"
          />
        </div>
      );
    }

    return null;
  };

  const renderExamResults = () => {
    const percentage = Math.round((score / totalPoints) * 100);

    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Exam Completed!</h2>

        <div className="w-40 h-40 mx-auto rounded-full border-8 border-blue-500 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold">{percentage}%</div>
            <div className="text-sm text-gray-500">
              {score}/{totalPoints} points
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg max-w-md mx-auto">
          <p className="font-medium mb-2">Your Results:</p>
          <p className="text-gray-700 mb-4">
            You answered {Object.keys(answers).length} out of{" "}
            {exam?.questions.length} questions and scored {score} points.
          </p>
          <p className="text-gray-700">
            Time taken:{" "}
            {formatTime((exam?.time_limit || 0) * 60 - timeRemaining)}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate("/exams")}>
            Back to Exams
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error || "Exam not found"}</p>
          <button
            onClick={() => navigate("/exams")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate("/exams")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Exams
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{exam.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                {exam.description ||
                  "Test your knowledge with this timed exam."}
              </p>
            </div>

            <div className="flex items-center gap-2 text-amber-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">
                Time Limit: {exam.time_limit} minutes
              </span>
            </div>

            <div className="flex items-center gap-2 text-blue-600">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-medium">Important:</p>
                <p className="text-sm">
                  Once you start the exam, the timer will begin. You must
                  complete all questions before the time runs out.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={startExam} className="w-full py-6 text-lg">
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (examCompleted) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <Card>
          <CardContent className="py-8">{renderExamResults()}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>{exam.title}</CardTitle>
            <div className="flex items-center gap-2 text-amber-600 font-medium">
              <Clock className="h-5 w-5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>
                Question {currentQuestionIndex + 1} of {exam.questions.length}
              </span>
              <span>{Object.keys(answers).length} answered</span>
            </div>
            <Progress
              value={((currentQuestionIndex + 1) / exam.questions.length) * 100}
              className="h-2"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {renderQuestion(exam.questions[currentQuestionIndex])}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {currentQuestionIndex === exam.questions.length - 1 ? (
                <Button
                  onClick={submitExam}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Exam
                </Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamPlayer;
