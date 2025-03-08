import React from "react";
import { ChevronRight, BookOpen, Headphones, Video } from "lucide-react";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "reading" | "listening" | "video";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  category: string;
}

interface RecommendedContentProps {
  title?: string;
  description?: string;
  items?: ContentItem[];
}

const defaultItems: ContentItem[] = [
  {
    id: "1",
    title: "Common Everyday Phrases",
    description:
      "Learn the most frequently used expressions in daily conversations",
    type: "reading",
    difficulty: "beginner",
    estimatedTime: "10 min",
    category: "Conversation",
  },
  {
    id: "2",
    title: "Pronunciation Practice: TH Sound",
    description:
      'Master the challenging "th" sound in English with audio examples',
    type: "listening",
    difficulty: "intermediate",
    estimatedTime: "15 min",
    category: "Pronunciation",
  },
  {
    id: "3",
    title: "Business English: Email Writing",
    description: "Learn professional email formats and common phrases",
    type: "reading",
    difficulty: "intermediate",
    estimatedTime: "20 min",
    category: "Business",
  },
  {
    id: "4",
    title: "English Idioms About Time",
    description:
      "Understand and use common time-related idioms in conversation",
    type: "video",
    difficulty: "intermediate",
    estimatedTime: "12 min",
    category: "Idioms",
  },
  {
    id: "5",
    title: "Advanced Grammar: Conditionals",
    description: "Master all types of conditional sentences in English",
    type: "reading",
    difficulty: "advanced",
    estimatedTime: "25 min",
    category: "Grammar",
  },
];

const getContentTypeIcon = (type: ContentItem["type"]) => {
  switch (type) {
    case "reading":
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    case "listening":
      return <Headphones className="h-5 w-5 text-green-500" />;
    case "video":
      return <Video className="h-5 w-5 text-red-500" />;
    default:
      return <BookOpen className="h-5 w-5 text-blue-500" />;
  }
};

const getDifficultyColor = (difficulty: ContentItem["difficulty"]) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800";
    case "intermediate":
      return "bg-blue-100 text-blue-800";
    case "advanced":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecommendedContent: React.FC<RecommendedContentProps> = ({
  title = "Recommended for You",
  description = "Based on your learning history and preferences",
  items = defaultItems,
}) => {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getContentTypeIcon(item.type)}
                        <span className="text-sm text-gray-500 capitalize">
                          {item.type}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(item.difficulty)}`}
                      >
                        {item.difficulty}
                      </span>
                    </div>
                    <CardTitle className="mt-2 text-lg">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">
                      Category:{" "}
                      <span className="font-medium">{item.category}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{item.estimatedTime}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      Start
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </div>
      </Carousel>
    </div>
  );
};

export default RecommendedContent;
