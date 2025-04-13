import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./pages/AdminRoute";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "@/contexts/LoadingSpinner";
import axios from "axios";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingStart = async () => {
    setLoading(true);
    let success = false;

    while (!success) {
      try {
        await axios.get("https://qubitx-backend.onrender.com"); // Replace with your actual API endpoint
        success = true;
        setLoading(false);
      } catch (error) {
        console.error("Error fetching server status, retrying...", error);
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
      }
    }
  };

  useEffect(() => {
    handleLoadingStart();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cyber-dark text-white">
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
              <div className="relative min-h-screen bg-cyber-dark text-white">
                <div className="tech-animation-bg fixed inset-0 pointer-events-none z-0"></div>
                <div className="quantum-grid fixed inset-0 pointer-events-none z-0"></div>
                <div className="neural-pattern fixed inset-0 pointer-events-none z-0"></div>
                <div className="data-stream fixed inset-0 pointer-events-none z-0"></div>

              
                <div className="relative z-10">
                  <BrowserRouter basename="/QUBITX">
                    <Routes>
                      <Route path="" element={<Index />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route
                        path="/admin"
                        element={
                          <AdminRoute>
                            <AdminDashboard />
                          </AdminRoute>
                        }
                      />
                      {/* Catch-all route for 404 Not Found */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </div>
                <Toaster />
                <Sonner />
              </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
