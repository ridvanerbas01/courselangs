import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Header from "./layout/Header";
import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./landing/LandingPage";
import AuthModal from "./auth/AuthModal";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      // Önce localStorage'dan oturum bilgilerini kontrol et
      const savedSession = localStorage.getItem("userSession");
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        setIsLoggedIn(sessionData.isLoggedIn);
        setUserName(sessionData.userName);
        setShowAuthModal(false);
      }

      // Supabase oturumunu kontrol et
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        // Get user profile
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          const userName =
            userData.user.user_metadata?.full_name ||
            userData.user.email?.split("@")[0] ||
            "User";
          setUserName(userName);

          // Oturum bilgilerini localStorage'a kaydet/güncelle
          localStorage.setItem(
            "userSession",
            JSON.stringify({
              isLoggedIn: true,
              userName: userName,
              userId: userData.user.id,
            }),
          );
        }
        // Close auth modal if it's open
        setShowAuthModal(false);
      } else {
        // Eğer supabase oturumu yoksa localStorage'daki bilgileri temizle
        localStorage.removeItem("userSession");
        setIsLoggedIn(false);
        setUserName("User");
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setIsLoggedIn(true);
          setUserName(
            session.user.user_metadata?.full_name ||
              session.user.email?.split("@")[0] ||
              "User",
          );
          // Close auth modal when signed in
          setShowAuthModal(false);
        } else if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
          // Reset user data on sign out
          setUserName("User");
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [userName, setUserName] = useState("John Doe");

  const handleLogin = async (data: any) => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    // Get user profile from database
    try {
      const { data: userData, error } = await supabase.auth.getUser();
      if (userData.user) {
        setUserName(
          userData.user.user_metadata?.full_name ||
            userData.user.email?.split("@")[0] ||
            "User",
        );

        // Oturum bilgilerini localStorage'a kaydet
        localStorage.setItem(
          "userSession",
          JSON.stringify({
            isLoggedIn: true,
            userName:
              userData.user.user_metadata?.full_name ||
              userData.user.email?.split("@")[0] ||
              "User",
            userId: userData.user.id,
          }),
        );
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  const handleSignup = async (data: any) => {
    setIsLoggedIn(true);
    setUserName(data.name);
    setShowAuthModal(false);
    // Navigate to dashboard after signup
    window.location.href = "/dashboard";
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUserName("User");

      // Oturum bilgilerini localStorage'dan temizle
      localStorage.removeItem("userSession");

      // Ana sayfaya yönlendir
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const openLoginModal = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const openSignupModal = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={openLoginModal}
        onSignup={openSignupModal}
        onLogout={handleLogout}
        onSearch={(query) => console.log("Search query:", query)}
      />

      {isLoggedIn ? (
        <Dashboard userName={userName} />
      ) : (
        <LandingPage onLogin={openLoginModal} onSignup={openSignupModal} />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default Home;
