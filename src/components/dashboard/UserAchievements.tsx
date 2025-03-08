import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Trophy } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  earned?: boolean;
  earned_at?: string;
}

interface UserPoints {
  total_points: number;
  level: number;
}

const UserAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userPoints, setUserPoints] = useState<UserPoints>({
    total_points: 0,
    level: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user) return;

      try {
        // Fetch all achievements
        const { data: allAchievements, error: achievementsError } =
          await supabase.from("achievements").select("*");

        if (achievementsError) throw achievementsError;

        // Fetch user's earned achievements
        const { data: userAchievements, error: userAchievementsError } =
          await supabase
            .from("user_achievements")
            .select("achievement_id, earned_at")
            .eq("user_id", user.id);

        if (userAchievementsError) throw userAchievementsError;

        // Fetch user points
        const { data: points, error: pointsError } = await supabase
          .from("user_points")
          .select("total_points, level")
          .eq("user_id", user.id)
          .single();

        if (pointsError && pointsError.code !== "PGRST116") throw pointsError;

        // If user has no points record yet, create one
        if (!points) {
          const { data: newPoints, error: newPointsError } = await supabase
            .from("user_points")
            .insert({
              user_id: user.id,
              total_points: 0,
              level: 1,
            })
            .select()
            .single();

          if (newPointsError) throw newPointsError;
          setUserPoints(newPoints || { total_points: 0, level: 1 });
        } else {
          setUserPoints(points);
        }

        // Mark achievements as earned if user has earned them
        const achievementsWithStatus =
          allAchievements?.map((achievement) => {
            const userAchievement = userAchievements?.find(
              (ua) => ua.achievement_id === achievement.id,
            );
            return {
              ...achievement,
              earned: !!userAchievement,
              earned_at: userAchievement?.earned_at,
            };
          }) || [];

        setAchievements(achievementsWithStatus);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "award":
        return <Award className="h-6 w-6 text-yellow-500" />;
      case "trophy":
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case "star":
        return <Star className="h-6 w-6 text-yellow-500" />;
      default:
        return <Award className="h-6 w-6 text-yellow-500" />;
    }
  };

  // Calculate XP needed for next level (simple formula: level * 100)
  const xpForNextLevel = userPoints.level * 100;
  const progressToNextLevel = Math.min(
    100,
    (userPoints.total_points / xpForNextLevel) * 100,
  );

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Achievements & Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm font-medium">
                Level {userPoints.level}
              </span>
              <p className="text-xs text-gray-500">
                {userPoints.total_points} XP
              </p>
            </div>
            <span className="text-xs text-gray-500">
              {xpForNextLevel} XP needed for Level {userPoints.level + 1}
            </span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 border rounded-lg flex items-center gap-3 ${achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200 opacity-70"}`}
            >
              <div
                className={`p-2 rounded-full ${achievement.earned ? "bg-yellow-100" : "bg-gray-200"}`}
              >
                {getIconComponent(achievement.icon)}
              </div>
              <div>
                <h4 className="font-medium text-sm">{achievement.name}</h4>
                <p className="text-xs text-gray-600">
                  {achievement.description}
                </p>
                {achievement.earned && achievement.earned_at && (
                  <p className="text-xs text-green-600 mt-1">
                    Earned:{" "}
                    {new Date(achievement.earned_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="ml-auto text-xs font-bold">
                +{achievement.points} XP
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserAchievements;
