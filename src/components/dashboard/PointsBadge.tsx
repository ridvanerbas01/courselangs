import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Award } from "lucide-react";

interface PointsBadgeProps {
  size?: "sm" | "md" | "lg";
  showLevel?: boolean;
}

const PointsBadge: React.FC<PointsBadgeProps> = ({
  size = "md",
  showLevel = true,
}) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("user_points")
          .select("total_points, level")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching user points:", error);
          return;
        }

        if (data) {
          setPoints(data.total_points);
          setLevel(data.level);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchUserPoints:", error);
        setLoading(false);
      }
    };

    fetchUserPoints();

    // Subscribe to changes in user_points table
    const pointsSubscription = supabase
      .channel("user_points_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_points",
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.new) {
            setPoints(payload.new.total_points);
            setLevel(payload.new.level);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(pointsSubscription);
    };
  }, [user]);

  if (loading) {
    return null;
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <div
      className={`flex items-center gap-1 bg-yellow-100 text-yellow-800 rounded-full ${sizeClasses[size]}`}
    >
      <Award
        className={
          size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5"
        }
      />
      <span className="font-medium">{points} XP</span>
      {showLevel && (
        <span className="ml-1 bg-yellow-200 px-1.5 py-0.5 rounded-full text-xs font-bold">
          Lvl {level}
        </span>
      )}
    </div>
  );
};

export default PointsBadge;
