import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ListChecks, Award, Headphones, Clock } from "lucide-react";
import CategoryBrowser from "./CategoryBrowser";
import UserAchievements from "./UserAchievements";
import ProgressTracker from "./ProgressTracker";
import RecommendedContent from "./RecommendedContent";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardTabsProps {
  userName: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ userName }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  // Function to handle direct navigation to content pages
  const navigateToPage = (path: string) => {
    navigate(path);
  };

  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger
          value="overview"
          className="flex flex-col items-center py-3 px-2 h-auto"
        >
          <BookOpen className="h-5 w-5 mb-1" />
          <span className="text-xs">Overview</span>
        </TabsTrigger>
        <TabsTrigger
          value="categories"
          className="flex flex-col items-center py-3 px-2 h-auto"
        >
          <ListChecks className="h-5 w-5 mb-1" />
          <span className="text-xs">Categories</span>
        </TabsTrigger>
        <TabsTrigger
          value="exercises"
          className="flex flex-col items-center py-3 px-2 h-auto"
        >
          <Clock className="h-5 w-5 mb-1" />
          <span className="text-xs">Exercises</span>
        </TabsTrigger>
        <TabsTrigger
          value="listening"
          className="flex flex-col items-center py-3 px-2 h-auto"
        >
          <Headphones className="h-5 w-5 mb-1" />
          <span className="text-xs">Listening</span>
        </TabsTrigger>
        <TabsTrigger
          value="achievements"
          className="flex flex-col items-center py-3 px-2 h-auto"
        >
          <Award className="h-5 w-5 mb-1" />
          <span className="text-xs">Achievements</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProgressTracker userName={userName} />
          </div>
          <div className="lg:col-span-2">
            <RecommendedContent />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="categories" className="space-y-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Browse Categories</h2>
          <Button
            variant="outline"
            onClick={() => navigateToPage("/categories")}
          >
            View All Categories
          </Button>
        </div>
        <CategoryBrowser onCategorySelect={handleCategorySelect} />
      </TabsContent>

      <TabsContent value="exercises" className="space-y-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Practice Exercises</h2>
          <Button
            variant="outline"
            onClick={() => navigateToPage("/exercises")}
          >
            View All Exercises
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExerciseTypeCard
            title="Multiple Choice"
            description="Test your knowledge with multiple choice questions"
            icon={<BookOpen className="h-10 w-10 text-blue-500" />}
            onClick={() => navigateToPage("/exercises?type=multiple-choice")}
          />
          <ExerciseTypeCard
            title="Fill in the Blanks"
            description="Complete sentences by filling in missing words"
            icon={<ListChecks className="h-10 w-10 text-green-500" />}
            onClick={() => navigateToPage("/exercises?type=fill-blanks")}
          />
          <ExerciseTypeCard
            title="Matching"
            description="Match words with their definitions"
            icon={<Award className="h-10 w-10 text-purple-500" />}
            onClick={() => navigateToPage("/exercises?type=matching")}
          />
          <ExerciseTypeCard
            title="Audio Exercises"
            description="Listen and answer questions about what you hear"
            icon={<Headphones className="h-10 w-10 text-yellow-500" />}
            onClick={() => navigateToPage("/exercises?type=audio")}
          />
          <ExerciseTypeCard
            title="Timed Exams"
            description="Test your knowledge with timed exams"
            icon={<Clock className="h-10 w-10 text-red-500" />}
            onClick={() => navigateToPage("/exams")}
          />
        </div>
      </TabsContent>

      <TabsContent value="listening" className="space-y-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Listening Practice</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ListeningRoomCard
            title="Stories"
            description="Listen to short stories and improve your comprehension"
            count={5}
            onClick={() => navigateToPage("/listening/stories")}
          />
          <ListeningRoomCard
            title="Dialogues"
            description="Practice with real-world conversations"
            count={5}
            onClick={() => navigateToPage("/listening/dialogues")}
          />
        </div>
      </TabsContent>

      <TabsContent value="achievements" className="space-y-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Achievements</h2>
          <Button
            variant="outline"
            onClick={() => navigateToPage("/vocabulary")}
          >
            View Word Lists
          </Button>
        </div>
        <UserAchievements />
      </TabsContent>
    </Tabs>
  );
};

interface ExerciseTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ExerciseTypeCard: React.FC<ExerciseTypeCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <Button onClick={onClick} className="w-full">
        Start
      </Button>
    </div>
  );
};

interface ListeningRoomCardProps {
  title: string;
  description: string;
  count: number;
  onClick: () => void;
}

const ListeningRoomCard: React.FC<ListeningRoomCardProps> = ({
  title,
  description,
  count,
  onClick,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
        <Headphones className="h-16 w-16" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{count} items available</span>
          <Button onClick={onClick}>Enter Room</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTabs;
