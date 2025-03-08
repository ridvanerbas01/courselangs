import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExerciseSelector from "./ExerciseSelector";
import MultipleChoiceExercise from "./MultipleChoiceExercise";
import MatchingExercise from "./MatchingExercise";
import FillBlanksExercise from "./FillBlanksExercise";
import AudioExercise from "./AudioExercise";
import ResultFeedback from "./ResultFeedback";
import { useToast } from "@/lib/toast-context";

interface ExerciseContainerProps {
  title?: string;
  description?: string;
  defaultExerciseType?: string;
  onComplete?: (score: number, total: number) => void;
}

const ExerciseContainer = ({
  title = "English Learning Exercises",
  description = "Practice your English skills with various exercise types",
  defaultExerciseType = "multiple-choice",
  onComplete = () => {},
}: ExerciseContainerProps) => {
  const { showToast } = useToast();
  const [exerciseType, setExerciseType] = useState(defaultExerciseType);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleExerciseSelect = (type: string) => {
    setExerciseType(type);
    setShowResults(false);
  };

  const handleExerciseComplete = async (
    exerciseScore: number,
    total: number,
  ) => {
    setScore(exerciseScore);
    setTotalQuestions(total);
    setIsCorrect(exerciseScore === total);
    // These would be set based on the specific exercise
    setUserAnswer("Your submitted answer");
    setCorrectAnswer("The correct answer");
    setExplanation("Explanation of why this is the correct answer.");
    setShowResults(true);
    onComplete(exerciseScore, total);

    // Update user progress in database
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        // Save exercise result
        await supabase.from("user_exercise_results").insert({
          user_id: userData.user.id,
          exercise_id: "placeholder-exercise-id", // In a real app, this would be the actual exercise ID
          score: exerciseScore,
          total_questions: total,
          completed_at: new Date().toISOString(),
        });

        // Update user points
        const { data: userPoints } = await supabase
          .from("user_points")
          .select("total_points, level")
          .eq("user_id", userData.user.id)
          .single();

        if (userPoints) {
          // Award points based on score
          const pointsToAward = exerciseScore * 10;

          await supabase
            .from("user_points")
            .update({
              total_points: userPoints.total_points + pointsToAward,
              level:
                Math.floor((userPoints.total_points + pointsToAward) / 100) + 1,
            })
            .eq("user_id", userData.user.id);
        }

        // Check for achievements
        const { count } = await supabase
          .from("user_exercise_results")
          .select("*", { count: "exact" })
          .eq("user_id", userData.user.id);

        if (count === 10) {
          // Award Exercise Champion achievement
          const { data: achievement } = await supabase
            .from("achievements")
            .select("id")
            .eq("name", "Exercise Champion")
            .single();

          if (achievement) {
            await supabase.from("user_achievements").insert({
              user_id: userData.user.id,
              achievement_id: achievement.id,
            });
          }
        }

        if (exerciseScore === total) {
          // Award Perfect Score achievement
          const { data: achievement } = await supabase
            .from("achievements")
            .select("id")
            .eq("name", "Perfect Score")
            .single();

          if (achievement) {
            await supabase.from("user_achievements").insert({
              user_id: userData.user.id,
              achievement_id: achievement.id,
            });
          }

          // Show success toast
          showToast("success", "Perfect score! +10 XP");
        } else {
          // Show regular completion toast
          showToast("info", `Exercise completed! +${exerciseScore * 10} XP`);
        }
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleNextExercise = () => {
    setShowResults(false);
    // Optionally change to a different exercise type
  };

  const handleRetry = () => {
    setShowResults(false);
  };

  const renderExercise = () => {
    switch (exerciseType) {
      case "multiple-choice":
        return (
          <MultipleChoiceExercise
            onComplete={(score, total) => handleExerciseComplete(score, total)}
          />
        );
      case "matching":
        return (
          <MatchingExercise
            onComplete={(score, total) => handleExerciseComplete(score, total)}
          />
        );
      case "fill-blanks":
        return (
          <FillBlanksExercise
            onComplete={(score, total) => handleExerciseComplete(score, total)}
          />
        );
      case "audio":
        return (
          <AudioExercise
            onSubmit={(answer) => {
              // Simplified for demo - in a real app, would check if answer is correct
              const isCorrect = answer === "Welcome";
              handleExerciseComplete(isCorrect ? 1 : 0, 1);
              setUserAnswer(answer);
              setCorrectAnswer("Welcome");
              setExplanation(
                "The audio clearly says 'Welcome' at the beginning of the clip.",
              );
              setIsCorrect(isCorrect);
            }}
          />
        );
      case "word-pairing":
        // Placeholder - would implement a word pairing exercise
        return (
          <Card className="p-6">
            <CardTitle>Word Pairing Exercise</CardTitle>
            <CardContent>
              <p className="text-muted-foreground">
                This exercise type is coming soon!
              </p>
            </CardContent>
          </Card>
        );
      case "image-based":
        // Placeholder - would implement an image-based exercise
        return (
          <Card className="p-6">
            <CardTitle>Image-Based Exercise</CardTitle>
            <CardContent>
              <p className="text-muted-foreground">
                This exercise type is coming soon!
              </p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <MultipleChoiceExercise
            onComplete={(score, total) => handleExerciseComplete(score, total)}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm">
      <Card className="border-0 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {title}
          </CardTitle>
          <p className="text-gray-600">{description}</p>
        </CardHeader>
        <CardContent className="px-0 space-y-8">
          <ExerciseSelector
            onSelectExercise={handleExerciseSelect}
            selectedExercise={exerciseType}
          />

          {showResults ? (
            <ResultFeedback
              isCorrect={isCorrect}
              userAnswer={userAnswer}
              correctAnswer={correctAnswer}
              explanation={explanation}
              score={score}
              totalScore={totalQuestions}
              nextExerciseHandler={handleNextExercise}
              retryHandler={handleRetry}
            />
          ) : (
            renderExercise()
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseContainer;
