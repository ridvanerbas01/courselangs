import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
  explanation?: string;
}

interface MultipleChoiceExerciseProps {
  questions?: Question[];
  onComplete?: (score: number, totalQuestions: number) => void;
  showFeedbackImmediately?: boolean;
}

const MultipleChoiceExercise = ({
  questions = [
    {
      id: "1",
      question: 'What is the past tense of "go"?',
      options: [
        { id: "a", text: "goed", isCorrect: false },
        { id: "b", text: "went", isCorrect: true },
        { id: "c", text: "gone", isCorrect: false },
        { id: "d", text: "going", isCorrect: false },
      ],
      explanation:
        '"Went" is the correct past tense form of "go". "Gone" is the past participle.',
    },
    {
      id: "2",
      question: 'Which word is a synonym for "happy"?',
      options: [
        { id: "a", text: "sad", isCorrect: false },
        { id: "b", text: "angry", isCorrect: false },
        { id: "c", text: "joyful", isCorrect: true },
        { id: "d", text: "tired", isCorrect: false },
      ],
      explanation: '"Joyful" means feeling or expressing great happiness.',
    },
    {
      id: "3",
      question: "Which sentence is grammatically correct?",
      options: [
        { id: "a", text: "She don't like coffee.", isCorrect: false },
        { id: "b", text: "She doesn't likes coffee.", isCorrect: false },
        { id: "c", text: "She doesn't like coffee.", isCorrect: true },
        { id: "d", text: "She not like coffee.", isCorrect: false },
      ],
      explanation:
        'The correct form is "She doesn\'t like coffee" using the auxiliary verb "doesn\'t" with the base form of the main verb.',
    },
  ],
  onComplete = () => {},
  showFeedbackImmediately = true,
}: MultipleChoiceExerciseProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (value: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (showFeedbackImmediately) {
        setShowResults(false);
      }
    } else {
      // Exercise completed
      const score = calculateScore();
      setIsCompleted(true);
      onComplete(score, questions.length);
    }
  };

  const handleCheck = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      const selectedOptionId = selectedOptions[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(
          (option) => option.id === selectedOptionId,
        );
        if (selectedOption?.isCorrect) {
          score += 1;
        }
      }
    });
    return score;
  };

  const isCurrentAnswerCorrect = () => {
    const selectedOptionId = selectedOptions[currentQuestion.id];
    if (!selectedOptionId) return false;

    const selectedOption = currentQuestion.options.find(
      (option) => option.id === selectedOptionId,
    );
    return selectedOption?.isCorrect || false;
  };

  const getCorrectOptionId = () => {
    const correctOption = currentQuestion.options.find(
      (option) => option.isCorrect,
    );
    return correctOption?.id;
  };

  if (isCompleted) {
    const score = calculateScore();
    return (
      <Card className="w-full max-w-3xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Exercise Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold mb-4">
            {score} / {questions.length}
          </div>
          <p className="text-lg mb-6">
            {score === questions.length
              ? "Perfect score! Excellent work!"
              : score >= questions.length / 2
                ? "Good job! Keep practicing to improve further."
                : "Keep practicing! You'll get better with time."}
          </p>
          <Button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setSelectedOptions({});
              setShowResults(false);
              setIsCompleted(false);
            }}
            className="mr-2"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl">
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">
            {currentQuestion.question}
          </h3>

          <RadioGroup
            value={selectedOptions[currentQuestion.id] || ""}
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-2 p-3 rounded-lg border ${
                  showResults &&
                  option.id === selectedOptions[currentQuestion.id]
                    ? option.isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <RadioGroupItem
                  value={option.id}
                  id={`option-${option.id}`}
                  disabled={showResults}
                />
                <label
                  htmlFor={`option-${option.id}`}
                  className="flex-grow cursor-pointer text-base"
                >
                  {option.text}
                </label>
                {showResults &&
                  option.id === selectedOptions[currentQuestion.id] &&
                  (option.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ))}
                {showResults &&
                  option.isCorrect &&
                  option.id !== selectedOptions[currentQuestion.id] && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
              </div>
            ))}
          </RadioGroup>

          {showResults && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-800">
                {currentQuestion.explanation ||
                  (isCurrentAnswerCorrect()
                    ? "Correct! Well done."
                    : `Incorrect. The correct answer is ${currentQuestion.options.find((o) => o.isCorrect)?.text}.`)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex-1">
          {currentQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                if (showFeedbackImmediately) {
                  setShowResults(false);
                }
              }}
            >
              Previous
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {!showResults && (
            <Button
              onClick={handleCheck}
              disabled={!selectedOptions[currentQuestion.id]}
            >
              Check Answer
            </Button>
          )}
          {(showResults || !showFeedbackImmediately) && (
            <Button onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Finish"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MultipleChoiceExercise;
