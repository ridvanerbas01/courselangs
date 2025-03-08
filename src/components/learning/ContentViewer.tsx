import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Headphones,
  Play,
  Volume2,
  Star,
  BookMarked,
  ExternalLink,
} from "lucide-react";
import AudioPlayer from "./AudioPlayer";

interface Example {
  id: string;
  text: string;
  translation?: string;
}

interface RelatedWord {
  id: string;
  word: string;
  partOfSpeech: string;
}

interface ContentItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  examples: Example[];
  audioSrc?: string;
  imageUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  relatedWords?: RelatedWord[];
  category: string;
}

interface ContentViewerProps {
  content?: ContentItem;
  onBookmark?: (id: string) => void;
  isBookmarked?: boolean;
  onStartExercise?: () => void;
}

const ContentViewer = ({
  content = {
    id: "1",
    word: "Serendipity",
    phonetic: "/ˌser.ənˈdɪp.ə.ti/",
    partOfSpeech: "noun",
    definition: "The fact of finding interesting or valuable things by chance",
    examples: [
      {
        id: "ex1",
        text: "The discovery of penicillin was a serendipity.",
        translation: "The accidental discovery of penicillin was fortunate.",
      },
      {
        id: "ex2",
        text: "They met through serendipity at a coffee shop.",
        translation: "They met by chance at a coffee shop.",
      },
      {
        id: "ex3",
        text: "Many scientific discoveries happen through serendipity.",
        translation: "Many scientific discoveries occur by accident.",
      },
    ],
    audioSrc:
      "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-0.mp3",
    imageUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80",
    difficulty: "intermediate",
    relatedWords: [
      { id: "rw1", word: "Chance", partOfSpeech: "noun" },
      { id: "rw2", word: "Fortunate", partOfSpeech: "adjective" },
      { id: "rw3", word: "Coincidence", partOfSpeech: "noun" },
      { id: "rw4", word: "Luck", partOfSpeech: "noun" },
    ],
    category: "Vocabulary",
  },
  onBookmark = () => {},
  isBookmarked = false,
  onStartExercise = () => {},
}: ContentViewerProps) => {
  const [activeTab, setActiveTab] = useState("details");

  const getDifficultyColor = (difficulty: ContentItem["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{content.word}</h1>
            <Badge
              className={cn("text-xs", getDifficultyColor(content.difficulty))}
            >
              {content.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-500 font-medium">
              {content.phonetic}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500 italic">{content.partOfSpeech}</span>
            <span className="text-gray-500">•</span>
            <span className="text-blue-600 text-sm">{content.category}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onBookmark(content.id)}
          className={cn(
            "rounded-full",
            isBookmarked
              ? "text-yellow-500 border-yellow-200"
              : "text-gray-400",
          )}
        >
          <Star
            className={cn(
              "h-5 w-5",
              isBookmarked ? "fill-yellow-500" : "fill-transparent",
            )}
          />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="details" className="text-sm">
            Details
          </TabsTrigger>
          <TabsTrigger value="examples" className="text-sm">
            Examples
          </TabsTrigger>
          <TabsTrigger value="related" className="text-sm">
            Related Words
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    Definition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{content.definition}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-blue-500" />
                    Pronunciation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AudioPlayer
                    audioSrc={content.audioSrc}
                    title={`${content.word} Pronunciation`}
                    showTitle={false}
                  />
                </CardContent>
              </Card>
            </div>

            {content.imageUrl && (
              <div className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Visual Reference</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-4">
                    <div className="relative w-full h-64 overflow-hidden rounded-md">
                      <img
                        src={content.imageUrl}
                        alt={content.word}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-blue-500" />
                Usage Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.examples.map((example) => (
                <div
                  key={example.id}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <p className="text-gray-800 font-medium mb-2">
                    {example.text}
                  </p>
                  {example.translation && (
                    <p className="text-gray-600 text-sm italic">
                      {example.translation}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="related" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-blue-500" />
                Related Words
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {content.relatedWords?.map((word) => (
                  <div
                    key={word.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <p className="font-medium text-blue-600">{word.word}</p>
                    <p className="text-xs text-gray-500 italic">
                      {word.partOfSpeech}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={onStartExercise}
          className="px-8 py-6 h-auto text-lg font-medium"
        >
          <Play className="mr-2 h-5 w-5" />
          Practice with Exercises
        </Button>
      </div>
    </div>
  );
};

export default ContentViewer;
