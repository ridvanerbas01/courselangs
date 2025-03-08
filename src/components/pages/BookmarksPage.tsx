import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getUserBookmarks, toggleBookmark } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Image, Star } from "lucide-react";

const BookmarksPage = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const data = await getUserBookmarks(user.id);
        setBookmarks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        setError("Failed to load bookmarks. Please try again later.");
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  const handleRemoveBookmark = async (contentItemId: string) => {
    if (!user) return;

    try {
      await toggleBookmark(user.id, contentItemId);
      // Remove the bookmark from the list
      setBookmarks(
        bookmarks.filter(
          (bookmark) => bookmark.content_item_id !== contentItemId,
        ),
      );
    } catch (err) {
      console.error("Error removing bookmark:", err);
    }
  };

  const getContentTypeIcon = (item: any) => {
    if (item.content_item?.audio_url) {
      return <Headphones className="h-5 w-5 text-green-500" />;
    } else if (item.content_item?.image_url) {
      return <Image className="h-5 w-5 text-purple-500" />;
    } else {
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">
            Not Logged In
          </h2>
          <p className="text-yellow-600">
            Please log in to view your bookmarks.
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

  if (bookmarks.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Your Bookmarks
        </h1>
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            You haven't bookmarked any content yet.
          </p>
          <Button onClick={() => (window.location.href = "/categories")}>
            Browse Categories
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Bookmarks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getContentTypeIcon(bookmark)}
                  <span className="text-sm text-gray-500">
                    {bookmark.content_item?.part_of_speech || "Vocabulary"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveBookmark(bookmark.content_item_id)}
                  className="text-yellow-500"
                >
                  <Star className="h-5 w-5 fill-yellow-500" />
                </Button>
              </div>
              <CardTitle className="mt-2">
                {bookmark.content_item?.word}
              </CardTitle>
              {bookmark.content_item?.phonetic && (
                <span className="text-sm text-gray-500">
                  {bookmark.content_item.phonetic}
                </span>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {bookmark.content_item?.definition}
              </p>
              <Button
                onClick={() =>
                  (window.location.href = `/content/${bookmark.content_item_id}`)
                }
                className="w-full"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;
