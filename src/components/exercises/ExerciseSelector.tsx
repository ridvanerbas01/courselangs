import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Puzzle,
  Headphones,
  Image,
  PenTool,
  SplitSquareVertical,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExerciseType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface ExerciseSelectorProps {
  onSelectExercise?: (exerciseType: string) => void;
  selectedExercise?: string;
}

const ExerciseSelector = ({
  onSelectExercise = () => {},
  selectedExercise = "multiple-choice",
}: ExerciseSelectorProps) => {
  const exerciseTypes: ExerciseType[] = [
    {
      id: "multiple-choice",
      name: "Multiple Choice",
      description:
        "Answer questions by selecting the correct option from multiple choices",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      id: "matching",
      name: "Matching",
      description: "Match words with their definitions or related concepts",
      icon: <SplitSquareVertical className="h-6 w-6" />,
    },
    {
      id: "fill-blanks",
      name: "Fill in the Blanks",
      description: "Complete sentences by filling in missing words",
      icon: <PenTool className="h-6 w-6" />,
    },
    {
      id: "word-pairing",
      name: "Word Pairing",
      description:
        "Pair related words together to build vocabulary connections",
      icon: <Puzzle className="h-6 w-6" />,
    },
    {
      id: "audio",
      name: "Audio Questions",
      description:
        "Listen to audio clips and answer questions about what you hear",
      icon: <Headphones className="h-6 w-6" />,
    },
    {
      id: "image-based",
      name: "Image Questions",
      description: "Identify words or concepts based on images",
      icon: <Image className="h-6 w-6" />,
    },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Choose Exercise Type
      </h2>

      <Tabs defaultValue={selectedExercise} onValueChange={onSelectExercise}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          {exerciseTypes.map((type) => (
            <TooltipProvider key={type.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value={type.id}
                    className="flex flex-col items-center py-3 px-2 h-auto"
                  >
                    {type.icon}
                    <span className="mt-2 text-xs">{type.name}</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{type.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </TabsList>

        {exerciseTypes.map((type) => (
          <TabsContent key={type.id} value={type.id}>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                {type.icon}
                <h3 className="text-xl font-semibold">{type.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <Button onClick={() => onSelectExercise(type.id)}>
                Start {type.name} Exercise
              </Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExerciseSelector;
