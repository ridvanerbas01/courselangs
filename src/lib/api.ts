import { supabase } from "./supabase";
import { Database } from "@/types/database.types";

type Category = Database["public"]["Tables"]["categories"]["Row"];
type ContentItem = Database["public"]["Tables"]["content_items"]["Row"];
type Example = Database["public"]["Tables"]["examples"]["Row"];
type RelatedWord = Database["public"]["Tables"]["related_words"]["Row"];
type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
type ExerciseOption = Database["public"]["Tables"]["exercise_options"]["Row"];
type ExerciseType = Database["public"]["Tables"]["exercise_types"]["Row"];
type DifficultyLevel = Database["public"]["Tables"]["difficulty_levels"]["Row"];
type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];
type UserExerciseResult =
  Database["public"]["Tables"]["user_exercise_results"]["Row"];
type UserStreak = Database["public"]["Tables"]["user_streaks"]["Row"];
type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"];

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data || [];
};

// Content Items
export const getContentItems = async (options?: {
  categoryId?: string;
  difficultyId?: string;
  search?: string;
  limit?: number;
  random?: boolean;
}): Promise<ContentItem[]> => {
  let query = supabase.from("content_items").select("*");

  if (options?.categoryId) {
    query = query.eq("category_id", options.categoryId);
  }

  if (options?.difficultyId) {
    query = query.eq("difficulty_id", options.difficultyId);
  }

  if (options?.search) {
    query = query.ilike("word", `%${options.search}%`);
  }

  if (options?.random) {
    query = query.order("id", { ascending: false });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export const getContentItemById = async (
  id: string,
): Promise<ContentItem | null> => {
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

// Get content item with examples and related words
export const getContentItemDetails = async (id: string) => {
  const { data: contentItem, error: contentError } = await supabase
    .from("content_items")
    .select("*, category:categories(*), difficulty:difficulty_levels(*)")
    .eq("id", id)
    .single();

  if (contentError) throw contentError;

  const { data: examples, error: examplesError } = await supabase
    .from("examples")
    .select("*")
    .eq("content_item_id", id);

  if (examplesError) throw examplesError;

  const { data: relatedWords, error: relatedWordsError } = await supabase
    .from("related_words")
    .select("*")
    .eq("content_item_id", id);

  if (relatedWordsError) throw relatedWordsError;

  return {
    ...contentItem,
    examples: examples || [],
    relatedWords: relatedWords || [],
  };
};

// Get random content item
export const getRandomContentItem = async (): Promise<ContentItem | null> => {
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};

// Exercises
export const getExerciseTypes = async (): Promise<ExerciseType[]> => {
  const { data, error } = await supabase.from("exercise_types").select("*");
  if (error) throw error;
  return data || [];
};

export const getExercises = async (options?: {
  exerciseTypeId?: string;
  difficultyId?: string;
  contentItemId?: string;
  limit?: number;
}): Promise<Exercise[]> => {
  let query = supabase.from("exercises").select("*");

  if (options?.exerciseTypeId) {
    query = query.eq("exercise_type_id", options.exerciseTypeId);
  }

  if (options?.difficultyId) {
    query = query.eq("difficulty_id", options.difficultyId);
  }

  if (options?.contentItemId) {
    query = query.eq("content_item_id", options.contentItemId);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const getExerciseWithOptions = async (id: string) => {
  const { data: exercise, error: exerciseError } = await supabase
    .from("exercises")
    .select(
      "*, exercise_type:exercise_types(*), content_item:content_items(*), difficulty:difficulty_levels(*)",
    )
    .eq("id", id)
    .single();

  if (exerciseError) throw exerciseError;

  const { data: options, error: optionsError } = await supabase
    .from("exercise_options")
    .select("*")
    .eq("exercise_id", id);

  if (optionsError) throw optionsError;

  return {
    ...exercise,
    options: options || [],
  };
};

// User Progress
export const getUserProgress = async (
  userId: string,
): Promise<UserProgress[]> => {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*, content_item:content_items(*)")
    .eq("user_id", userId);
  if (error) throw error;
  return data || [];
};

export const updateUserProgress = async (
  userId: string,
  contentItemId: string,
  masteryLevel: number,
) => {
  const { data, error } = await supabase
    .from("user_progress")
    .upsert({
      user_id: userId,
      content_item_id: contentItemId,
      mastery_level: masteryLevel,
      last_practiced: new Date().toISOString(),
    })
    .select();
  if (error) throw error;
  return data;
};

// Exercise Results
export const saveExerciseResult = async (
  userId: string,
  exerciseId: string,
  score: number,
  totalQuestions: number,
) => {
  const { data, error } = await supabase
    .from("user_exercise_results")
    .insert({
      user_id: userId,
      exercise_id: exerciseId,
      score,
      total_questions: totalQuestions,
      completed_at: new Date().toISOString(),
    })
    .select();
  if (error) throw error;
  return data;
};

export const getUserExerciseResults = async (
  userId: string,
): Promise<UserExerciseResult[]> => {
  const { data, error } = await supabase
    .from("user_exercise_results")
    .select("*, exercise:exercises(*)")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

// User Streaks
export const getUserStreak = async (
  userId: string,
): Promise<UserStreak | null> => {
  const { data, error } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error && error.code !== "PGRST116") throw error; // PGRST116 is "No rows found"
  return data;
};

export const updateUserStreak = async (userId: string) => {
  // Get current streak
  const currentStreak = await getUserStreak(userId);

  const today = new Date().toISOString().split("T")[0];
  let newCurrentStreak = 1;
  let newLongestStreak = currentStreak?.longest_streak || 0;

  if (currentStreak) {
    const lastActivityDate = new Date(currentStreak.last_activity_date || "");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // If last activity was yesterday, increment streak
    if (lastActivityDate.toISOString().split("T")[0] === yesterdayStr) {
      newCurrentStreak = (currentStreak.current_streak || 0) + 1;
    }
    // If last activity was today, keep current streak
    else if (lastActivityDate.toISOString().split("T")[0] === today) {
      newCurrentStreak = currentStreak.current_streak || 1;
    }
    // Otherwise reset streak (gap in activity)

    // Update longest streak if needed
    newLongestStreak = Math.max(
      newCurrentStreak,
      currentStreak.longest_streak || 0,
    );
  }

  const { data, error } = await supabase
    .from("user_streaks")
    .upsert({
      user_id: userId,
      current_streak: newCurrentStreak,
      longest_streak: newLongestStreak,
      last_activity_date: today,
    })
    .select();
  if (error) throw error;
  return data;
};

// Bookmarks
export const getUserBookmarks = async (userId: string): Promise<Bookmark[]> => {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*, content_item:content_items(*)")
    .eq("user_id", userId);
  if (error) throw error;
  return data || [];
};

export const toggleBookmark = async (userId: string, contentItemId: string) => {
  // Check if bookmark exists
  const { data: existingBookmark, error: checkError } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .eq("content_item_id", contentItemId);

  if (checkError) throw checkError;

  if (existingBookmark && existingBookmark.length > 0) {
    // Delete bookmark if it exists
    const { error: deleteError } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("content_item_id", contentItemId);
    if (deleteError) throw deleteError;
    return { bookmarked: false };
  } else {
    // Create bookmark if it doesn't exist
    const { data, error: insertError } = await supabase
      .from("bookmarks")
      .insert({
        user_id: userId,
        content_item_id: contentItemId,
      })
      .select();
    if (insertError) throw insertError;
    return { bookmarked: true, data };
  }
};

export const isBookmarked = async (userId: string, contentItemId: string) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .eq("content_item_id", contentItemId);

  if (error) throw error;
  return data && data.length > 0;
};

// Difficulty Levels
export const getDifficultyLevels = async (): Promise<DifficultyLevel[]> => {
  const { data, error } = await supabase.from("difficulty_levels").select("*");
  if (error) throw error;
  return data || [];
};

// Get user statistics
export const getUserStatistics = async (userId: string) => {
  // Get total words learned (with mastery level > 0)
  const { data: progressData, error: progressError } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .gt("mastery_level", 0);

  if (progressError) throw progressError;

  // Get total exercises completed
  const { data: exerciseData, error: exerciseError } = await supabase
    .from("user_exercise_results")
    .select("*")
    .eq("user_id", userId);

  if (exerciseError) throw exerciseError;

  // Get user streak
  const streak = await getUserStreak(userId);

  // Calculate mastery levels
  const masteryLevels = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
  };

  // Get content items with their difficulty levels
  const { data: contentItems, error: contentError } = await supabase
    .from("content_items")
    .select("id, difficulty:difficulty_levels(name)")
    .in("id", progressData?.map((p) => p.content_item_id) || []);

  if (contentError) throw contentError;

  // Count items by difficulty
  contentItems?.forEach((item) => {
    const difficultyName = item.difficulty?.name as keyof typeof masteryLevels;
    if (difficultyName && difficultyName in masteryLevels) {
      masteryLevels[difficultyName]++;
    }
  });

  // Get recent activity
  const { data: recentActivity, error: activityError } = await supabase
    .from("user_exercise_results")
    .select("*, exercise:exercises(title)")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(5);

  if (activityError) throw activityError;

  return {
    totalWords: progressData?.length || 0,
    completedWords: progressData?.length || 0,
    totalExercises: exerciseData?.length || 0,
    completedExercises: exerciseData?.length || 0,
    streakDays: streak?.current_streak || 0,
    masteryLevels,
    recentActivity:
      recentActivity?.map((activity) => ({
        date: new Date(activity.completed_at || "").toISOString().split("T")[0],
        activity: activity.exercise?.title || "Exercise",
        score: Math.round((activity.score / activity.total_questions) * 100),
      })) || [],
  };
};

// Get recommended content for a user
export const getRecommendedContent = async (userId: string) => {
  // Get user's progress to determine what they've already learned
  const { data: userProgress, error: progressError } = await supabase
    .from("user_progress")
    .select("content_item_id, mastery_level")
    .eq("user_id", userId);

  if (progressError) throw progressError;

  // Get content items the user hasn't mastered yet (mastery_level < 3) or hasn't seen
  const learnedItemIds =
    userProgress
      ?.filter((p) => p.mastery_level && p.mastery_level >= 3)
      .map((p) => p.content_item_id) || [];

  // Get a mix of content: some new, some partially learned
  const { data: recommendedItems, error: itemsError } = await supabase
    .from("content_items")
    .select("*, category:categories(title), difficulty:difficulty_levels(name)")
    .not("id", "in", learnedItemIds.length > 0 ? learnedItemIds : ["none"])
    .limit(10);

  if (itemsError) throw itemsError;

  // Format the recommended items
  return (
    recommendedItems?.map((item) => ({
      id: item.id,
      title: item.word,
      description: item.definition,
      type: item.audio_url ? "listening" : item.image_url ? "video" : "reading",
      difficulty:
        (item.difficulty?.name as "beginner" | "intermediate" | "advanced") ||
        "beginner",
      estimatedTime: `${Math.floor(Math.random() * 20) + 5} min`,
      category: item.category?.title || "Vocabulary",
    })) || []
  );
};
