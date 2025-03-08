import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import CategoryBrowser from "./CategoryBrowser";
import ProgressTracker from "./ProgressTracker";
import RecommendedContent from "./RecommendedContent";
import DashboardTabs from "./DashboardTabs";
import PointsBadge from "./PointsBadge";
import AuthGuard from "../auth/AuthGuard";

interface DashboardProps {
  userName?: string;
  isLoading?: boolean;
}

const Dashboard = ({
  userName = "Learner",
  isLoading = false,
}: DashboardProps) => {
  const { user } = useAuth();

  useEffect(() => {
    // Update user streak when visiting dashboard
    const updateStreak = async () => {
      if (!user) return;

      try {
        // Get current streak
        const { data: currentStreak } = await supabase
          .from("user_streaks")
          .select("*")
          .eq("user_id", user.id)
          .single();

        const today = new Date().toISOString().split("T")[0];
        let newCurrentStreak = 1;
        let newLongestStreak = currentStreak?.longest_streak || 0;

        if (currentStreak) {
          const lastActivityDate = new Date(
            currentStreak.last_activity_date || "",
          );
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0];

          // If last activity was yesterday, increment streak
          if (lastActivityDate.toISOString().split("T")[0] === yesterdayStr) {
            newCurrentStreak = (currentStreak.current_streak || 0) + 1;
          }
          // If last activity was today, keep current streak
          else if (lastActivityDate.toISOString().split("T")[0] === today) {
            newCurrentStreak = currentStreak.current_streak || 1;
          }

          // Update longest streak if needed
          newLongestStreak = Math.max(
            newCurrentStreak,
            currentStreak.longest_streak || 0,
          );

          // Check for Streak Warrior achievement (7-day streak)
          if (newCurrentStreak === 7) {
            const { data: achievement } = await supabase
              .from("achievements")
              .select("id")
              .eq("name", "Streak Warrior")
              .single();

            if (achievement) {
              // Check if user already has this achievement
              const { data: existingAchievement } = await supabase
                .from("user_achievements")
                .select("id")
                .eq("user_id", user.id)
                .eq("achievement_id", achievement.id)
                .single();

              if (!existingAchievement) {
                await supabase.from("user_achievements").insert({
                  user_id: user.id,
                  achievement_id: achievement.id,
                });
              }
            }
          }
        }

        // Update streak
        await supabase.from("user_streaks").upsert({
          user_id: user.id,
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_activity_date: today,
        });
      } catch (error) {
        console.error("Error updating streak:", error);
      }
    };

    updateStreak();
  }, [user]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome back, {userName}!
              </h1>
              <p className="text-gray-600 mt-2">
                Continue your English learning journey. You're making great
                progress!
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <PointsBadge size="lg" />
            </div>
          </div>

          {/* Main Dashboard Content */}
          <DashboardTabs userName={userName} />
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
