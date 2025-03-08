import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { BarChart, Activity, Award, BookOpen, Clock } from "lucide-react";

interface ProgressTrackerProps {
  userName?: string;
  totalWords?: number;
  completedWords?: number;
  totalExercises?: number;
  completedExercises?: number;
  streakDays?: number;
  masteryLevels?: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  recentActivity?: {
    date: string;
    activity: string;
    score: number;
  }[];
}

const ProgressTracker = ({
  userName = "Student",
  totalWords = 1000,
  completedWords = 350,
  totalExercises = 200,
  completedExercises = 75,
  streakDays = 12,
  masteryLevels = {
    beginner: 65,
    intermediate: 40,
    advanced: 15,
  },
  recentActivity = [
    { date: "2023-06-01", activity: "Vocabulary Quiz", score: 85 },
    { date: "2023-06-02", activity: "Matching Exercise", score: 90 },
    { date: "2023-06-03", activity: "Fill in the Blanks", score: 75 },
    { date: "2023-06-04", activity: "Audio Exercise", score: 80 },
  ],
}: ProgressTrackerProps) => {
  const wordsProgress = Math.round((completedWords / totalWords) * 100);
  const exercisesProgress = Math.round(
    (completedExercises / totalExercises) * 100,
  );

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          <span>Learning Progress</span>
        </CardTitle>
        <CardDescription>Track your English learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="mastery">Mastery Levels</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Words Learned</span>
                  </div>
                  <span className="text-sm font-bold">
                    {completedWords}/{totalWords}
                  </span>
                </div>
                <Progress value={wordsProgress} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">
                      Exercises Completed
                    </span>
                  </div>
                  <span className="text-sm font-bold">
                    {completedExercises}/{totalExercises}
                  </span>
                </div>
                <Progress value={exercisesProgress} className="h-2" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-amber-500 mb-1" />
                  <span className="text-2xl font-bold">{streakDays}</span>
                  <span className="text-xs text-gray-500">Day Streak</span>
                </div>
              </div>

              <div className="text-center">
                <div className="flex flex-col items-center">
                  <Award className="h-8 w-8 text-purple-500 mb-1" />
                  <span className="text-2xl font-bold">
                    {Math.round((completedWords / totalWords) * 100)}%
                  </span>
                  <span className="text-xs text-gray-500">
                    Overall Progress
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mastery" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Beginner Level</span>
                  <span className="text-sm font-bold">
                    {masteryLevels.beginner}%
                  </span>
                </div>
                <Progress
                  value={masteryLevels.beginner}
                  className="h-2 bg-blue-100"
                >
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${masteryLevels.beginner}%` }}
                  />
                </Progress>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Intermediate Level
                  </span>
                  <span className="text-sm font-bold">
                    {masteryLevels.intermediate}%
                  </span>
                </div>
                <Progress
                  value={masteryLevels.intermediate}
                  className="h-2 bg-yellow-100"
                >
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: `${masteryLevels.intermediate}%` }}
                  />
                </Progress>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Advanced Level</span>
                  <span className="text-sm font-bold">
                    {masteryLevels.advanced}%
                  </span>
                </div>
                <Progress
                  value={masteryLevels.advanced}
                  className="h-2 bg-green-100"
                >
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${masteryLevels.advanced}%` }}
                  />
                </Progress>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Your strongest skills are in beginner-level content. Continue
                practicing intermediate and advanced exercises to improve your
                overall mastery.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold ${activity.score >= 80 ? "text-green-600" : activity.score >= 60 ? "text-amber-600" : "text-red-600"}`}
                    >
                      {activity.score}%
                    </span>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 text-center">
              <button className="text-sm text-primary hover:underline">
                View All Activity
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
