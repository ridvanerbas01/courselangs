import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Search, Volume2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast-context";

interface WordList {
  id: string;
  title: string;
  description: string;
  word_count: number;
}

interface WordItem {
  id: string;
  word: string;
  definition: string;
  part_of_speech: string | null;
  phonetic: string | null;
  audio_url: string | null;
}

const WordListDetail = () => {
  const { wordListId } = useParams<{ wordListId: string }>();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [wordList, setWordList] = useState<WordList | null>(null);
  const [words, setWords] = useState<WordItem[]>([]);
  const [filteredWords, setFilteredWords] = useState<WordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWordList = async () => {
      if (!wordListId) return;

      try {
        // Fetch word list details
        const { data: wordListData, error: wordListError } = await supabase
          .from("word_lists")
          .select("*")
          .eq("id", wordListId)
          .single();

        if (wordListError) throw wordListError;
        setWordList(wordListData);

        // Fetch word list items
        const { data: wordListItems, error: itemsError } = await supabase
          .from("word_list_items")
          .select("content_item_id")
          .eq("word_list_id", wordListId);

        if (itemsError) throw itemsError;

        if (wordListItems && wordListItems.length > 0) {
          // Fetch content items
          const contentItemIds = wordListItems.map(
            (item) => item.content_item_id,
          );
          const { data: contentItems, error: contentError } = await supabase
            .from("content_items")
            .select("id, word, definition, part_of_speech, phonetic, audio_url")
            .in("id", contentItemIds);

          if (contentError) throw contentError;
          setWords(contentItems || []);
          setFilteredWords(contentItems || []);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching word list:", err);
        setError("Failed to load word list. Please try again later.");
        setLoading(false);
      }
    };

    fetchWordList();
  }, [wordListId]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredWords(words);
    } else {
      const filtered = words.filter(
        (word) =>
          word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word.definition.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredWords(filtered);
    }
  }, [searchTerm, words]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleWordClick = (wordId: string) => {
    navigate(`/content/${wordId}`);
  };

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleMarkLearned = async (wordId: string) => {
    if (!user) return;

    try {
      // Check if progress record exists
      const { data: existingProgress } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("content_item_id", wordId)
        .single();

      if (existingProgress) {
        // Update existing progress
        await supabase
          .from("user_progress")
          .update({
            mastery_level: Math.min(
              (existingProgress.mastery_level || 0) + 1,
              3,
            ),
            last_practiced: new Date().toISOString(),
          })
          .eq("id", existingProgress.id);
      } else {
        // Create new progress record
        await supabase.from("user_progress").insert({
          user_id: user.id,
          content_item_id: wordId,
          mastery_level: 1,
          last_practiced: new Date().toISOString(),
        });
      }

      // Update user points
      const { data: userPoints } = await supabase
        .from("user_points")
        .select("total_points")
        .eq("user_id", user.id)
        .single();

      if (userPoints) {
        await supabase
          .from("user_points")
          .update({
            total_points: userPoints.total_points + 5,
            level: Math.floor((userPoints.total_points + 5) / 100) + 1,
          })
          .eq("user_id", user.id);
      }

      // Check for Word Master achievement
      const { count } = await supabase
        .from("user_progress")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .gt("mastery_level", 0);

      if (count === 50) {
        // Award Word Master achievement
        const { data: achievement } = await supabase
          .from("achievements")
          .select("id")
          .eq("name", "Word Master")
          .single();

        if (achievement) {
          await supabase.from("user_achievements").insert({
            user_id: user.id,
            achievement_id: achievement.id,
          });
        }
      }

      // Refresh the word list
      const updatedWords = [...words];
      setWords(updatedWords);

      // Show success message
      showToast("success", "Word marked as learned! +5 XP");
    } catch (error) {
      console.error("Error marking word as learned:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !wordList) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error || "Word list not found"}</p>
          <button
            onClick={() => navigate("/vocabulary")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Word Lists
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
        onClick={() => navigate("/vocabulary")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Word Lists
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{wordList.title}</h1>
          <p className="text-gray-600">{wordList.description}</p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search words..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {filteredWords.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No words found in this list.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => (
            <Card key={word.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-500">
                      {word.part_of_speech || "Vocabulary"}
                    </span>
                  </div>
                  {word.audio_url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => playAudio(word.audio_url!)}
                      className="text-blue-500"
                    >
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                <CardTitle className="mt-2">{word.word}</CardTitle>
                {word.phonetic && (
                  <span className="text-sm text-gray-500">{word.phonetic}</span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {word.definition}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleMarkLearned(word.id)}
                    className="flex-1"
                  >
                    Mark as Learned
                  </Button>
                  <Button
                    onClick={() => handleWordClick(word.id)}
                    className="flex-1"
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordListDetail;
