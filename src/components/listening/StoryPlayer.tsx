import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import AudioPlayer from "../learning/AudioPlayer";

interface Story {
  id: string;
  title: string;
  description: string;
  content: string;
  audio_url: string;
  image_url?: string;
  difficulty: {
    name: string;
  };
  duration: number;
}

const StoryPlayer = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      if (!storyId) return;

      try {
        const { data, error } = await supabase
          .from("stories")
          .select("*, difficulty:difficulty_levels(name)")
          .eq("id", storyId)
          .single();

        if (error) throw error;
        setStory(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching story:", err);
        setError("Failed to load story. Please try again later.");
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  const handleComplete = () => {
    // In a real app, we would update user progress and award points
    console.log("Story completed");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error || "Story not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Stories
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <CardTitle>{story.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
              {story.difficulty.name}
            </span>
            <span>•</span>
            <span>
              {Math.floor(story.duration / 60)} min {story.duration % 60} sec
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {story.description && (
            <p className="text-gray-600 italic">{story.description}</p>
          )}

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">
              {story.content}
            </p>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Listen to the Story</h3>
            <AudioPlayer
              audioSrc={story.audio_url}
              title={story.title}
              onComplete={handleComplete}
              showTitle={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryPlayer;
