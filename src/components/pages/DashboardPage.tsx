import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import Dashboard from "@/components/dashboard/Dashboard";
import { getUserStatistics, getRecommendedContent } from "@/lib/api";
import { supabase } from "@/lib/supabase";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [recommendedContent, setRecommendedContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState("Learner");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        // Get user profile from database
        const { data, error } = await supabase
          .from("users")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setUserName(data.full_name || user.email?.split("@")[0] || "Learner");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchDashboardData = async () => {
      try {
        // Fetch user statistics
        const userStats = await getUserStatistics(user.id);
        setStats(userStats);

        // Fetch recommended content
        const content = await getRecommendedContent(user.id);
        setRecommendedContent(content);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchDashboardData();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">
            Not Logged In
          </h2>
          <p className="text-yellow-600">
            Please log in to view your dashboard.
          </p>
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

  return <Dashboard userName={userName} isLoading={loading} />;
};

export default DashboardPage;
