import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import AudioPlayer from "../learning/AudioPlayer";

interface Dialogue {
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

const DialoguePlayer = () => {
  const { dialogueId } = useParams<{ dialogueId: string }>();
  const [dialogue, setDialogue] = useState<Dialogue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDialogue = async () => {
      if (!dialogueId) return;

      try {
        const { data, error } = await supabase
          .from("dialogues")
          .select("*, difficulty:difficulty_levels(name)")
          .eq("id", dialogueId)
          .single();

        if (error) throw error;
        setDialogue(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dialogue:", err);
        setError("Failed to load dialogue. Please try again later.");
        setLoading(false);
      }
    };

    fetchDialogue();
  }, [dialogueId]);

  const handleComplete = () => {
    // In a real app, we would update user progress and award points
    console.log("Dialogue completed");
  };

  const formatDialogueContent = (content: string) => {
    // Split by newlines and format as dialogue
    const lines = content.split("\n");
    return lines.map((line, index) => {
      const [speaker, ...textParts] = line.split(":");
      const text = textParts.join(":").trim();

      if (!text) return null; // Skip empty lines

      return (
        <div key={index} className="mb-4">
          <span className="font-bold text-blue-700">{speaker}:</span>
          <span className="ml-2">{text}</span>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !dialogue) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error || "Dialogue not found"}</p>
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
        Back to Dialogues
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-6 w-6 text-green-500" />
            <CardTitle>{dialogue.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
              {dialogue.difficulty.name}
            </span>
            <span>•</span>
            <span>
              {Math.floor(dialogue.duration / 60)} min {dialogue.duration % 60}{" "}
              sec
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {dialogue.description && (
            <p className="text-gray-600 italic">{dialogue.description}</p>
          )}

          <div className="bg-gray-50 p-6 rounded-lg">
            {formatDialogueContent(dialogue.content)}
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Listen to the Dialogue</h3>
            <AudioPlayer
              audioSrc={dialogue.audio_url}
              title={dialogue.title}
              onComplete={handleComplete}
              showTitle={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DialoguePlayer;
