import React from "react";
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ResultFeedbackProps {
  isCorrect?: boolean;
  correctAnswer?: string;
  userAnswer?: string;
  explanation?: string;
  score?: number;
  totalScore?: number;
  nextExerciseHandler?: () => void;
  retryHandler?: () => void;
}

const ResultFeedback = ({
  isCorrect = false,
  correctAnswer = "The correct answer",
  userAnswer = "Your answer",
  explanation = "This is the explanation for why this answer is correct. It provides context and helps with learning.",
  score = 75,
  totalScore = 100,
  nextExerciseHandler = () => console.log("Next exercise clicked"),
  retryHandler = () => console.log("Retry clicked"),
}: ResultFeedbackProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-background">
      <Card className="mb-6 border-2 overflow-hidden">
        <CardHeader
          className={`${isCorrect ? "bg-green-50" : "bg-red-50"} pb-2`}
        >
          <CardTitle className="flex items-center text-xl">
            {isCorrect ? (
              <>
                <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
                <span className="text-green-700">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-6 w-6 text-red-600" />
                <span className="text-red-700">Incorrect</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {!isCorrect && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Your answer:
                </p>
                <p className="p-2 bg-red-50 border border-red-200 rounded-md text-red-800">
                  {userAnswer}
                </p>
              </div>
            )}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Correct answer:
              </p>
              <p className="p-2 bg-green-50 border border-green-200 rounded-md text-green-800">
                {correctAnswer}
              </p>
            </div>
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-700">Explanation</AlertTitle>
              <AlertDescription className="text-blue-800">
                {explanation}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-4">
          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Your score</span>
              <span className="font-medium">
                {score}/{totalScore}
              </span>
            </div>
            <Progress value={(score / totalScore) * 100} className="h-2" />
          </div>
          <div className="flex justify-between w-full gap-4">
            {!isCorrect && (
              <Button
                variant="outline"
                onClick={retryHandler}
                className="flex-1"
              >
                Try Again
              </Button>
            )}
            <Button
              onClick={nextExerciseHandler}
              className={`${isCorrect ? "w-full" : "flex-1"} bg-blue-600 hover:bg-blue-700`}
            >
              Next Exercise
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultFeedback;
