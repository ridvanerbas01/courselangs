import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentItemDetails, isBookmarked, toggleBookmark } from "@/lib/api";
import ContentViewer from "@/components/learning/ContentViewer";
import { useAuth } from "@/lib/auth";

const ContentDetailPage = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchContentDetails = async () => {
      if (!contentId) return;

      try {
        const data = await getContentItemDetails(contentId);
        setContent(data);

        // Check if content is bookmarked if user is logged in
        if (user) {
          const isContentBookmarked = await isBookmarked(user.id, contentId);
          setBookmarked(isContentBookmarked);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching content details:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      }
    };

    fetchContentDetails();
  }, [contentId, user]);

  const handleBookmark = async (id: string) => {
    if (!user) {
      // Redirect to login or show login modal
      alert("Please log in to bookmark content");
      return;
    }

    try {
      const result = await toggleBookmark(user.id, id);
      setBookmarked(result.bookmarked);
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  const handleStartExercise = () => {
    // Redirect to exercises related to this content
    window.location.href = `/exercises?contentId=${contentId}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error || "Content not found"}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Format content for ContentViewer
  const formattedContent = {
    id: content.id,
    word: content.word,
    phonetic: content.phonetic,
    partOfSpeech: content.part_of_speech,
    definition: content.definition,
    examples: content.examples,
    audioSrc: content.audio_url,
    imageUrl: content.image_url,
    difficulty: content.difficulty?.name || "beginner",
    relatedWords: content.relatedWords,
    category: content.category?.title || "Vocabulary",
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <ContentViewer
        content={formattedContent}
        isBookmarked={bookmarked}
        onBookmark={handleBookmark}
        onStartExercise={handleStartExercise}
      />
    </div>
  );
};

export default ContentDetailPage;
