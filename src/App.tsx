import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import TaskApp from "./pages/TaskApp";
import GitHubProjects from "./pages/GitHubProjects";
import Portfolio from "./pages/Portfolio";
import EcommerceHome from "./pages/EcommerceHome";
import CryptoTool from "./pages/CryptoTool";
import SecurityMonitor from "./pages/SecurityMonitor";
import FinanceManager from "./pages/FinanceManager";
import APIDocumentation from "./pages/APIDocumentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TaskApp />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects" element={<GitHubProjects />} />
            <Route path="/ecommerce" element={<EcommerceHome />} />
            <Route path="/crypto-tool" element={<CryptoTool />} />
            <Route path="/security-monitor" element={<SecurityMonitor />} />
            <Route path="/finance" element={<FinanceManager />} />
            <Route path="/api-docs" element={<APIDocumentation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
