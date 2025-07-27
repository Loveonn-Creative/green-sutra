import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HelpCenter from "./pages/HelpCenter";
import Security from "./pages/Security";
import TermsOfService from "./pages/TermsOfService";
import OnboardingTrader from "./pages/OnboardingTrader";
import OnboardingManufacturer from "./pages/OnboardingManufacturer";
import VoiceDemo from "./pages/VoiceDemo";
import CarbonTracker from "./pages/CarbonTracker";
import EWasteRecycling from "./pages/EWasteRecycling";
import ScanInvoice from "./pages/ScanInvoice";
import Auth from "./pages/Auth";
import ESGEvaluation from "./pages/ESGEvaluation";
import TraderDashboard from "./pages/TraderDashboard";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import AIMandi from "./pages/AIMandi";
import Credits from "./pages/Credits";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Partners from "./pages/Partners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/esg-evaluation" element={<ESGEvaluation />} />
              <Route path="/trader-dashboard" element={<TraderDashboard />} />
              <Route path="/manufacturer-dashboard" element={<ManufacturerDashboard />} />
              <Route path="/ai-mandi" element={<AIMandi />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/security" element={<Security />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/onboarding/trader" element={<OnboardingTrader />} />
              <Route path="/onboarding/manufacturer" element={<OnboardingManufacturer />} />
              <Route path="/voice-demo" element={<VoiceDemo />} />
              <Route path="/carbon-tracker" element={<CarbonTracker />} />
              <Route path="/ewaste-recycling" element={<EWasteRecycling />} />
              <Route path="/scan-invoice" element={<ScanInvoice />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/partners" element={<Partners />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
