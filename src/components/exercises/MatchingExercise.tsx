import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X, RefreshCw } from "lucide-react";

interface MatchItem {
  id: string;
  content: string;
}

interface MatchPair {
  term: MatchItem;
  definition: MatchItem;
}

interface MatchingExerciseProps {
  title?: string;
  description?: string;
  pairs?: MatchPair[];
  onComplete?: (score: number, total: number) => void;
}

const MatchingExercise = ({
  title = "Matching Exercise",
  description = "Drag the terms on the left to match with their correct definitions on the right.",
  pairs = [
    {
      term: { id: "term-1", content: "Vocabulary" },
      definition: {
        id: "def-1",
        content: "Words that are known and used by a person",
      },
    },
    {
      term: { id: "term-2", content: "Grammar" },
      definition: {
        id: "def-2",
        content: "The system and structure of a language",
      },
    },
    {
      term: { id: "term-3", content: "Pronunciation" },
      definition: { id: "def-3", content: "The way in which a word is spoken" },
    },
    {
      term: { id: "term-4", content: "Syntax" },
      definition: {
        id: "def-4",
        content: "The arrangement of words in a sentence",
      },
    },
    {
      term: { id: "term-5", content: "Idiom" },
      definition: {
        id: "def-5",
        content: "A phrase with a meaning not deducible from individual words",
      },
    },
  ],
  onComplete = () => {},
}: MatchingExerciseProps) => {
  const [terms, setTerms] = useState<MatchItem[]>([]);
  const [definitions, setDefinitions] = useState<MatchItem[]>([]);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{ [key: string]: boolean }>({});
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // Initialize the exercise
    const shuffledTerms = [...pairs.map((pair) => pair.term)];
    const shuffledDefinitions = [...pairs.map((pair) => pair.definition)];

    // Shuffle the arrays
    for (let i = shuffledTerms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTerms[i], shuffledTerms[j]] = [
        shuffledTerms[j],
        shuffledTerms[i],
      ];
    }

    for (let i = shuffledDefinitions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDefinitions[i], shuffledDefinitions[j]] = [
        shuffledDefinitions[j],
        shuffledDefinitions[i],
      ];
    }

    setTerms(shuffledTerms);
    setDefinitions(shuffledDefinitions);
    setMatches({});
    setResults({});
    setIsChecking(false);
    setScore(0);
  }, [pairs]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Only allow dragging from terms to definitions
    if (
      source.droppableId === "terms" &&
      destination.droppableId === "definitions"
    ) {
      const termId = terms[source.index].id;
      const definitionId = definitions[destination.index].id;

      setMatches((prev) => ({
        ...prev,
        [termId]: definitionId,
      }));
    }
  };

  const checkAnswers = () => {
    const newResults: { [key: string]: boolean } = {};
    let correctCount = 0;

    pairs.forEach((pair) => {
      const isCorrect = matches[pair.term.id] === pair.definition.id;
      newResults[pair.term.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setResults(newResults);
    setIsChecking(true);
    setScore(correctCount);
    onComplete(correctCount, pairs.length);
  };

  const resetExercise = () => {
    // Re-initialize the exercise
    const shuffledTerms = [...pairs.map((pair) => pair.term)];
    const shuffledDefinitions = [...pairs.map((pair) => pair.definition)];

    // Shuffle the arrays
    for (let i = shuffledTerms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTerms[i], shuffledTerms[j]] = [
        shuffledTerms[j],
        shuffledTerms[i],
      ];
    }

    for (let i = shuffledDefinitions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDefinitions[i], shuffledDefinitions[j]] = [
        shuffledDefinitions[j],
        shuffledDefinitions[i],
      ];
    }

    setTerms(shuffledTerms);
    setDefinitions(shuffledDefinitions);
    setMatches({});
    setResults({});
    setIsChecking(false);
    setScore(0);
  };

  return (
    <div className="w-full h-full bg-background p-6 rounded-lg">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Terms Column */}
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Terms</h3>
                <Droppable droppableId="terms">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {terms.map((term, index) => (
                        <Draggable
                          key={term.id}
                          draggableId={term.id}
                          index={index}
                          isDragDisabled={isChecking}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn(
                                "p-4 border rounded-md bg-white shadow-sm",
                                snapshot.isDragging ? "shadow-md" : "",
                                isChecking && results[term.id] !== undefined
                                  ? results[term.id]
                                    ? "border-green-500 bg-green-50"
                                    : "border-red-500 bg-red-50"
                                  : "",
                                matches[term.id] ? "opacity-50" : "",
                              )}
                            >
                              <div className="flex justify-between items-center">
                                <span>{term.content}</span>
                                {isChecking &&
                                  results[term.id] !== undefined &&
                                  (results[term.id] ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <X className="h-5 w-5 text-red-500" />
                                  ))}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Definitions Column */}
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Definitions</h3>
                <Droppable droppableId="definitions">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {definitions.map((definition, index) => {
                        const matchedTermId = Object.keys(matches).find(
                          (termId) => matches[termId] === definition.id,
                        );

                        return (
                          <div
                            key={definition.id}
                            className={cn(
                              "p-4 border rounded-md bg-white shadow-sm",
                              matchedTermId ? "border-blue-500 bg-blue-50" : "",
                            )}
                          >
                            {definition.content}
                          </div>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {isChecking && (
              <p className="text-sm font-medium">
                Score: {score} / {pairs.length}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={resetExercise}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={checkAnswers}
              disabled={
                Object.keys(matches).length !== pairs.length || isChecking
              }
            >
              Check Answers
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MatchingExercise;
