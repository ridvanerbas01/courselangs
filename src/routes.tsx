import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import CategoriesPage from "./components/pages/CategoriesPage";
import CategoryDetailPage from "./components/pages/CategoryDetailPage";
import ExercisesPage from "./components/pages/ExercisesPage";
import ExerciseDetailPage from "./components/pages/ExerciseDetailPage";
import ContentDetailPage from "./components/pages/ContentDetailPage";
import AboutPage from "./components/pages/AboutPage";
import ProfilePage from "./components/pages/ProfilePage";
import BookmarksPage from "./components/pages/BookmarksPage";
import DashboardPage from "./components/pages/DashboardPage";
import AuthGuard from "./components/auth/AuthGuard";
import StoriesList from "./components/listening/StoriesList";
import DialoguesList from "./components/listening/DialoguesList";
import StoryPlayer from "./components/listening/StoryPlayer";
import DialoguePlayer from "./components/listening/DialoguePlayer";
import ExamsList from "./components/exams/ExamsList";
import ExamPlayer from "./components/exams/ExamPlayer";
import WordLists from "./components/vocabulary/WordLists";
import WordListDetail from "./components/vocabulary/WordListDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        }
      />
      <Route
        path="/categories"
        element={
          <AuthGuard>
            <CategoriesPage />
          </AuthGuard>
        }
      />
      <Route
        path="/category/:categoryId"
        element={
          <AuthGuard>
            <CategoryDetailPage />
          </AuthGuard>
        }
      />
      <Route
        path="/exercises"
        element={
          <AuthGuard>
            <ExercisesPage />
          </AuthGuard>
        }
      />
      <Route
        path="/exercise/:exerciseId"
        element={
          <AuthGuard>
            <ExerciseDetailPage />
          </AuthGuard>
        }
      />
      <Route
        path="/content/:contentId"
        element={
          <AuthGuard>
            <ContentDetailPage />
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <AuthGuard>
            <BookmarksPage />
          </AuthGuard>
        }
      />

      {/* Listening Routes */}
      <Route
        path="/listening/stories"
        element={
          <AuthGuard>
            <StoriesList />
          </AuthGuard>
        }
      />
      <Route
        path="/listening/stories/:storyId"
        element={
          <AuthGuard>
            <StoryPlayer />
          </AuthGuard>
        }
      />
      <Route
        path="/listening/dialogues"
        element={
          <AuthGuard>
            <DialoguesList />
          </AuthGuard>
        }
      />
      <Route
        path="/listening/dialogues/:dialogueId"
        element={
          <AuthGuard>
            <DialoguePlayer />
          </AuthGuard>
        }
      />

      {/* Exams Routes */}
      <Route
        path="/exams"
        element={
          <AuthGuard>
            <ExamsList />
          </AuthGuard>
        }
      />
      <Route
        path="/exams/:examId"
        element={
          <AuthGuard>
            <ExamPlayer />
          </AuthGuard>
        }
      />

      {/* Vocabulary Routes */}
      <Route
        path="/vocabulary"
        element={
          <AuthGuard>
            <WordLists />
          </AuthGuard>
        }
      />
      <Route
        path="/vocabulary/:wordListId"
        element={
          <AuthGuard>
            <WordListDetail />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
