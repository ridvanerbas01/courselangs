import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getUserStatistics } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Clock } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setEmail(user.email || "");
    setFullName(user.user_metadata?.full_name || "");

    const fetchUserStats = async () => {
      try {
        const data = await getUserStatistics(user.id);
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user statistics:", err);
        setError("Failed to load user statistics. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const handleUpdateProfile = () => {
    // In a real app, we would update the user profile in the database
    alert("Profile update functionality would be implemented here");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">
            Not Logged In
          </h2>
          <p className="text-yellow-600">Please log in to view your profile.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <Button onClick={handleUpdateProfile} className="w-full mt-4">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Learning Statistics */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Learning Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              {stats ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {stats.completedWords}
                      </div>
                      <div className="text-sm text-gray-600">Words Learned</div>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {stats.completedExercises}
                      </div>
                      <div className="text-sm text-gray-600">
                        Exercises Completed
                      </div>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {stats.streakDays}
                      </div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Mastery Levels</h3>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Beginner Level
                        </span>
                        <span className="text-sm font-bold">
                          {stats.masteryLevels.beginner} words
                        </span>
                      </div>
                      <Progress
                        value={
                          (stats.masteryLevels.beginner /
                            (stats.totalWords || 1)) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Intermediate Level
                        </span>
                        <span className="text-sm font-bold">
                          {stats.masteryLevels.intermediate} words
                        </span>
                      </div>
                      <Progress
                        value={
                          (stats.masteryLevels.intermediate /
                            (stats.totalWords || 1)) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Advanced Level
                        </span>
                        <span className="text-sm font-bold">
                          {stats.masteryLevels.advanced} words
                        </span>
                      </div>
                      <Progress
                        value={
                          (stats.masteryLevels.advanced /
                            (stats.totalWords || 1)) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>

                  {stats.recentActivity && stats.recentActivity.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Recent Activity</h3>

                      <div className="space-y-2">
                        {stats.recentActivity.map(
                          (activity: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-gray-50 rounded"
                            >
                              <div>
                                <div className="font-medium">
                                  {activity.activity}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {activity.date}
                                </div>
                              </div>
                              <div className="text-sm font-bold">
                                {activity.score}%
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-gray-600">
                    No statistics available yet. Start learning to see your
                    progress!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
