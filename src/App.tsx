import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import AppRoutes from "./routes";
import { AuthProvider } from "./lib/auth";
import AchievementNotification from "./components/dashboard/AchievementNotification";
import { ToastProvider } from "./lib/toast-context";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <>
            <AchievementNotification />
            <AppRoutes />
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </>
        </Suspense>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
