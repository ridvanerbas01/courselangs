import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ListChecks } from "lucide-react";

interface WordList {
  id: string;
  title: string;
  description: string;
  word_count: number;
}

const WordLists = () => {
  const [wordLists, setWordLists] = useState<WordList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWordLists = async () => {
      try {
        const { data, error } = await supabase.from("word_lists").select("*");

        if (error) throw error;
        setWordLists(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching word lists:", err);
        setError("Failed to load word lists. Please try again later.");
        setLoading(false);
      }
    };

    fetchWordLists();
  }, []);

  const handleWordListSelect = (wordListId: string) => {
    navigate(`/vocabulary/${wordListId}`);
  };

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
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Word Lists</h1>
      </div>

      {wordLists.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No word lists found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wordLists.map((wordList) => (
            <Card
              key={wordList.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-500">Word List</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <ListChecks className="h-4 w-4" />
                    <span>{wordList.word_count} words</span>
                  </div>
                </div>
                <CardTitle className="mt-2">{wordList.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {wordList.description ||
                    "A curated list of essential English vocabulary."}
                </p>
                <Button
                  onClick={() => handleWordListSelect(wordList.id)}
                  className="w-full"
                >
                  View Words
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordLists;
