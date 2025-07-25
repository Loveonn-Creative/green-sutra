import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/security" element={<Security />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/onboarding/trader" element={<OnboardingTrader />} />
          <Route path="/onboarding/manufacturer" element={<OnboardingManufacturer />} />
          <Route path="/voice-demo" element={<VoiceDemo />} />
          <Route path="/carbon-tracker" element={<CarbonTracker />} />
          <Route path="/ewaste-recycling" element={<EWasteRecycling />} />
          <Route path="/scan-invoice" element={<ScanInvoice />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
