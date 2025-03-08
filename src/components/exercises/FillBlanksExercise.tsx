import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, X } from "lucide-react";

interface FillBlanksExerciseProps {
  title?: string;
  description?: string;
  sentences?: Array<{
    id: string;
    text: string;
    blanks: Array<{
      index: number;
      word: string;
    }>;
  }>;
  onComplete?: (score: number, total: number) => void;
}

const FillBlanksExercise = ({
  title = "Fill in the Blanks Exercise",
  description = "Complete the sentences by filling in the missing words.",
  sentences = [
    {
      id: "1",
      text: "The cat is sleeping on the ___.",
      blanks: [{ index: 0, word: "bed" }],
    },
    {
      id: "2",
      text: "I ___ to the store to buy some ___.",
      blanks: [
        { index: 0, word: "went" },
        { index: 1, word: "groceries" },
      ],
    },
    {
      id: "3",
      text: "She ___ her homework before ___ to bed.",
      blanks: [
        { index: 0, word: "finished" },
        { index: 1, word: "going" },
      ],
    },
  ],
  onComplete = () => {},
}: FillBlanksExerciseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize answers object
  React.useEffect(() => {
    const initialAnswers: Record<string, string[]> = {};
    sentences.forEach((sentence) => {
      initialAnswers[sentence.id] = Array(sentence.blanks.length).fill("");
    });
    setAnswers(initialAnswers);
  }, [sentences]);

  const handleInputChange = (
    sentenceId: string,
    blankIndex: number,
    value: string,
  ) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      newAnswers[sentenceId][blankIndex] = value;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    let totalBlanks = 0;

    sentences.forEach((sentence) => {
      sentence.blanks.forEach((blank, index) => {
        totalBlanks++;
        if (
          answers[sentence.id][index].toLowerCase().trim() ===
          blank.word.toLowerCase()
        ) {
          correctAnswers++;
        }
      });
    });

    setScore(correctAnswers);
    onComplete(correctAnswers, totalBlanks);
  };

  const handleTryAgain = () => {
    setShowResults(false);
    setCurrentIndex(0);

    // Reset answers
    const initialAnswers: Record<string, string[]> = {};
    sentences.forEach((sentence) => {
      initialAnswers[sentence.id] = Array(sentence.blanks.length).fill("");
    });
    setAnswers(initialAnswers);
  };

  const renderSentence = (
    sentence: string,
    blanks: Array<{ index: number; word: string }>,
  ) => {
    const parts = sentence.split("___");
    return (
      <div className="flex flex-wrap items-center gap-2">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index < parts.length - 1 && (
              <Input
                className="w-32 inline-block"
                value={answers[sentences[currentIndex].id]?.[index] || ""}
                onChange={(e) =>
                  handleInputChange(
                    sentences[currentIndex].id,
                    index,
                    e.target.value,
                  )
                }
                placeholder="type here"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderResults = () => {
    const totalBlanks = sentences.reduce(
      (acc, sentence) => acc + sentence.blanks.length,
      0,
    );

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Your Results</h3>
          <p className="text-lg">
            You got <span className="font-bold">{score}</span> out of{" "}
            <span className="font-bold">{totalBlanks}</span> correct!
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-32 rounded-full flex items-center justify-center bg-background border-4 border-primary">
              <span className="text-3xl font-bold">
                {Math.round((score / totalBlanks) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Review Your Answers:</h4>
          {sentences.map((sentence, sentenceIndex) => (
            <div key={sentence.id} className="p-4 rounded-lg bg-muted">
              <div className="mb-2">
                {renderSentenceWithAnswers(sentence, sentenceIndex)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleTryAgain}>Try Again</Button>
        </div>
      </div>
    );
  };

  const renderSentenceWithAnswers = (
    sentence: FillBlanksExerciseProps["sentences"][0],
    sentenceIndex: number,
  ) => {
    const parts = sentence.text.split("___");

    return (
      <div className="flex flex-wrap items-center gap-2">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index < parts.length - 1 && (
              <div className="inline-flex items-center">
                <span
                  className={`px-2 py-1 rounded ${
                    answers[sentence.id][index].toLowerCase().trim() ===
                    sentence.blanks[index].word.toLowerCase()
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {answers[sentence.id][index]}
                  {answers[sentence.id][index].toLowerCase().trim() ===
                  sentence.blanks[index].word.toLowerCase() ? (
                    <Check className="inline ml-1 w-4 h-4 text-green-600" />
                  ) : (
                    <X className="inline ml-1 w-4 h-4 text-red-600" />
                  )}
                </span>
                {answers[sentence.id][index].toLowerCase().trim() !==
                  sentence.blanks[index].word.toLowerCase() && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    Correct:{" "}
                    <span className="font-medium">
                      {sentence.blanks[index].word}
                    </span>
                  </span>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground mb-2">
              Question {currentIndex + 1} of {sentences.length}
            </div>

            <div className="p-6 rounded-lg bg-muted">
              {renderSentence(
                sentences[currentIndex].text,
                sentences[currentIndex].blanks,
              )}
            </div>
          </div>
        ) : (
          renderResults()
        )}
      </CardContent>
      {!showResults && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentIndex === sentences.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default FillBlanksExercise;
