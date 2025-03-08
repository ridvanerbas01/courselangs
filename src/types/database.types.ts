export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          content_item_id: string | null;
          created_at: string | null;
          id: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          content_item_id?: string | null;
          created_at?: string | null;
          id?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          content_item_id?: string | null;
          created_at?: string | null;
          id?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_content_item_id_fkey";
            columns: ["content_item_id"];
            referencedRelation: "content_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          color: string | null;
          created_at: string | null;
          description: string | null;
          icon: string | null;
          id: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          color?: string | null;
          created_at?: string | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          color?: string | null;
          created_at?: string | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      content_items: {
        Row: {
          audio_url: string | null;
          category_id: string | null;
          created_at: string | null;
          definition: string;
          difficulty_id: string | null;
          id: string;
          image_url: string | null;
          part_of_speech: string | null;
          phonetic: string | null;
          updated_at: string | null;
          word: string;
        };
        Insert: {
          audio_url?: string | null;
          category_id?: string | null;
          created_at?: string | null;
          definition: string;
          difficulty_id?: string | null;
          id?: string;
          image_url?: string | null;
          part_of_speech?: string | null;
          phonetic?: string | null;
          updated_at?: string | null;
          word: string;
        };
        Update: {
          audio_url?: string | null;
          category_id?: string | null;
          created_at?: string | null;
          definition?: string;
          difficulty_id?: string | null;
          id?: string;
          image_url?: string | null;
          part_of_speech?: string | null;
          phonetic?: string | null;
          updated_at?: string | null;
          word?: string;
        };
        Relationships: [
          {
            foreignKeyName: "content_items_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "content_items_difficulty_id_fkey";
            columns: ["difficulty_id"];
            referencedRelation: "difficulty_levels";
            referencedColumns: ["id"];
          },
        ];
      };
      difficulty_levels: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      examples: {
        Row: {
          content_item_id: string | null;
          created_at: string | null;
          id: string;
          text: string;
          translation: string | null;
          updated_at: string | null;
        };
        Insert: {
          content_item_id?: string | null;
          created_at?: string | null;
          id?: string;
          text: string;
          translation?: string | null;
          updated_at?: string | null;
        };
        Update: {
          content_item_id?: string | null;
          created_at?: string | null;
          id?: string;
          text?: string;
          translation?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "examples_content_item_id_fkey";
            columns: ["content_item_id"];
            referencedRelation: "content_items";
            referencedColumns: ["id"];
          },
        ];
      };
      exercise_options: {
        Row: {
          created_at: string | null;
          exercise_id: string | null;
          id: string;
          is_correct: boolean | null;
          text: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          exercise_id?: string | null;
          id?: string;
          is_correct?: boolean | null;
          text: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          exercise_id?: string | null;
          id?: string;
          is_correct?: boolean | null;
          text?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "exercise_options_exercise_id_fkey";
            columns: ["exercise_id"];
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
        ];
      };
      exercise_types: {
        Row: {
          created_at: string | null;
          description: string | null;
          icon: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          content_item_id: string | null;
          created_at: string | null;
          description: string | null;
          difficulty_id: string | null;
          exercise_type_id: string | null;
          id: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          content_item_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          difficulty_id?: string | null;
          exercise_type_id?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          content_item_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          difficulty_id?: string | null;
          exercise_type_id?: string | null;
          id?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "exercises_content_item_id_fkey";
            columns: ["content_item_id"];
            referencedRelation: "content_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercises_difficulty_id_fkey";
            columns: ["difficulty_id"];
            referencedRelation: "difficulty_levels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercises_exercise_type_id_fkey";
            columns: ["exercise_type_id"];
            referencedRelation: "exercise_types";
            referencedColumns: ["id"];
          },
        ];
      };
      related_words: {
        Row: {
          content_item_id: string | null;
          created_at: string | null;
          id: string;
          part_of_speech: string | null;
          updated_at: string | null;
          word: string;
        };
        Insert: {
          content_item_id?: string | null;
          created_at?: string | null;
          id?: string;
          part_of_speech?: string | null;
          updated_at?: string | null;
          word: string;
        };
        Update: {
          content_item_id?: string | null;
          created_at?: string | null;
          id?: string;
          part_of_speech?: string | null;
          updated_at?: string | null;
          word?: string;
        };
        Relationships: [
          {
            foreignKeyName: "related_words_content_item_id_fkey";
            columns: ["content_item_id"];
            referencedRelation: "content_items";
            referencedColumns: ["id"];
          },
        ];
      };
      user_exercise_results: {
        Row: {
          completed_at: string | null;
          created_at: string | null;
          exercise_id: string | null;
          id: string;
          score: number;
          total_questions: number;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string | null;
          exercise_id?: string | null;
          id?: string;
          score: number;
          total_questions: number;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string | null;
          exercise_id?: string | null;
          id?: string;
          score?: number;
          total_questions?: number;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_exercise_results_exercise_id_fkey";
            columns: ["exercise_id"];
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_exercise_results_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_progress: {
        Row: {
          content_item_id: string | null;
          created_at: string | null;
          id: string;
          last_practiced: string | null;
          mastery_level: number | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          content_item_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_practiced?: string | null;
          mastery_level?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          content_item_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_practiced?: string | null;
          mastery_level?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_progress_content_item_id_fkey";
            columns: ["content_item_id"];
            referencedRelation: "content_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_progress_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_streaks: {
        Row: {
          created_at: string | null;
          current_streak: number | null;
          id: string;
          last_activity_date: string | null;
          longest_streak: number | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          current_streak?: number | null;
          id?: string;
          last_activity_date?: string | null;
          longest_streak?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          current_streak?: number | null;
          id?: string;
          last_activity_date?: string | null;
          longest_streak?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_streaks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          email: string;
          full_name: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          email: string;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          email?: string;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
