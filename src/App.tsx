
import React from 'react';
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
  // hey
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
                <BrowserRouter>
                  <Routes>
                    <Route path="/QUBITX" element={<Index />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
