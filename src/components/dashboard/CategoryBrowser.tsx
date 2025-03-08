import React from "react";
import {
  Book,
  BookOpen,
  Bookmark,
  Brain,
  FileText,
  Headphones,
  Languages,
  Lightbulb,
  MessageSquare,
  Mic,
  Pencil,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  wordCount: number;
  color: string;
}

interface CategoryBrowserProps {
  categories?: Category[];
  onCategorySelect?: (categoryId: string) => void;
}

const CategoryBrowser = ({
  categories = [
    {
      id: "1",
      title: "Vocabulary",
      description: "Essential words for daily conversations",
      icon: <Book className="h-8 w-8" />,
      wordCount: 250,
      color: "bg-blue-100",
    },
    {
      id: "2",
      title: "Grammar",
      description: "Rules and structures of English language",
      icon: <Pencil className="h-8 w-8" />,
      wordCount: 120,
      color: "bg-green-100",
    },
    {
      id: "3",
      title: "Phrases",
      description: "Common expressions and idioms",
      icon: <MessageSquare className="h-8 w-8" />,
      wordCount: 180,
      color: "bg-yellow-100",
    },
    {
      id: "4",
      title: "Pronunciation",
      description: "Learn correct English sounds",
      icon: <Mic className="h-8 w-8" />,
      wordCount: 90,
      color: "bg-purple-100",
    },
    {
      id: "5",
      title: "Reading",
      description: "Texts for comprehension practice",
      icon: <BookOpen className="h-8 w-8" />,
      wordCount: 150,
      color: "bg-pink-100",
    },
    {
      id: "6",
      title: "Listening",
      description: "Audio exercises for better understanding",
      icon: <Headphones className="h-8 w-8" />,
      wordCount: 110,
      color: "bg-indigo-100",
    },
    {
      id: "7",
      title: "Idioms",
      description: "Figurative expressions in English",
      icon: <Lightbulb className="h-8 w-8" />,
      wordCount: 75,
      color: "bg-orange-100",
    },
    {
      id: "8",
      title: "Academic",
      description: "Formal language for education",
      icon: <FileText className="h-8 w-8" />,
      wordCount: 200,
      color: "bg-teal-100",
    },
    {
      id: "9",
      title: "Business",
      description: "Professional vocabulary for work",
      icon: <Bookmark className="h-8 w-8" />,
      wordCount: 160,
      color: "bg-red-100",
    },
    {
      id: "10",
      title: "Slang",
      description: "Informal language and expressions",
      icon: <Languages className="h-8 w-8" />,
      wordCount: 85,
      color: "bg-cyan-100",
    },
    {
      id: "11",
      title: "Advanced",
      description: "Complex vocabulary for proficient users",
      icon: <Brain className="h-8 w-8" />,
      wordCount: 230,
      color: "bg-emerald-100",
    },
  ],
  onCategorySelect = (id) => console.log(`Category selected: ${id}`),
}: CategoryBrowserProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Learning Categories
        </h2>
        <p className="text-gray-600">Browse categories to start learning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              category.color,
            )}
            onClick={() => onCategorySelect(category.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                {category.icon}
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {category.wordCount} words
              </p>
            </CardContent>
            <CardFooter>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Start Learning
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryBrowser;
