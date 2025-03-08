import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Önce localStorage'dan oturum bilgilerini kontrol et
      const savedSession = localStorage.getItem("userSession");

      if (savedSession) {
        // localStorage'da oturum bilgisi var, geçerli mi kontrol et
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          // Geçerli oturum var
          setIsAuthenticated(true);
          setIsCheckingAuth(false);
          return;
        }
      }

      // Supabase auth durumunu kontrol et
      if (!loading) {
        if (user) {
          setIsAuthenticated(true);
        } else {
          // Kullanıcı oturum açmamış, ana sayfaya yönlendir
          navigate("/", { replace: true });
        }
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [user, loading, navigate]);

  if (loading || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
