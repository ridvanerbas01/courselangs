import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Award, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
}

const AchievementNotification = () => {
  const { user } = useAuth();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Subscribe to new achievements
    const achievementsSubscription = supabase
      .channel("user_achievements_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_achievements",
          filter: `user_id=eq.${user.id}`,
        },
        async (payload) => {
          if (payload.new && payload.new.achievement_id) {
            // Fetch achievement details
            const { data, error } = await supabase
              .from("achievements")
              .select("*")
              .eq("id", payload.new.achievement_id)
              .single();

            if (!error && data) {
              setAchievement(data);
              setShow(true);

              // Auto-hide after 5 seconds
              setTimeout(() => {
                setShow(false);
              }, 5000);
            }
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(achievementsSubscription);
    };
  }, [user]);

  return (
    <AnimatePresence>
      {show && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50 max-w-sm"
        >
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-200 p-2 rounded-full">
                  <Award className="h-6 w-6 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-bold text-yellow-800">
                    Achievement Unlocked!
                  </h3>
                  <p className="text-yellow-700 font-medium">
                    {achievement.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-yellow-700 hover:text-yellow-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-yellow-600">
              {achievement.description}
            </p>
            <p className="mt-1 text-xs font-bold text-yellow-800">
              +{achievement.points} XP
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementNotification;
