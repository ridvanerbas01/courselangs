import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentItems } from "@/lib/api";
import { Database } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Image } from "lucide-react";

type ContentItem = Database["public"]["Tables"]["content_items"]["Row"];

const CategoryDetailPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchContentItems = async () => {
      if (!categoryId) return;

      try {
        const data = await getContentItems({ categoryId });
        setContentItems(data);

        // Set category name based on first item (if available)
        if (data.length > 0 && data[0].category_id === categoryId) {
          // This would be better if we had a separate API call to get category details
          setCategoryName(data[0].word.split(" ")[0]); // Placeholder
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching content items:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      }
    };

    fetchContentItems();
  }, [categoryId]);

  const getContentTypeIcon = (item: ContentItem) => {
    if (item.audio_url) {
      return <Headphones className="h-5 w-5 text-green-500" />;
    } else if (item.image_url) {
      return <Image className="h-5 w-5 text-purple-500" />;
    } else {
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    }
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

  if (contentItems.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          {categoryName || "Category"}
        </h1>
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No content items found in this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {categoryName || "Category"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getContentTypeIcon(item)}
                  <span className="text-sm text-gray-500">
                    {item.part_of_speech || "Vocabulary"}
                  </span>
                </div>
              </div>
              <CardTitle className="mt-2">{item.word}</CardTitle>
              {item.phonetic && (
                <span className="text-sm text-gray-500">{item.phonetic}</span>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {item.definition}
              </p>
              <Button
                onClick={() => (window.location.href = `/content/${item.id}`)}
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

export default CategoryDetailPage;
