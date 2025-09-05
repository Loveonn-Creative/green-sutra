import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { GuestAccessProvider } from "./hooks/useGuestAccess";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ui/error-boundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HelpCenter from "./pages/HelpCenter";
import Security from "./pages/Security";
import TermsOfService from "./pages/TermsOfService";
import OnboardingTrader from "./pages/OnboardingTrader";
import OnboardingManufacturer from "./pages/OnboardingManufacturer";
import VoiceDemo from "./pages/VoiceDemo";
import CarbonIntelligence from "./pages/CarbonIntelligence";
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
import Demo from "./pages/Demo";
import Trial from "./pages/Trial";
import Privacy from "./pages/Privacy";
import Enterprise from "./pages/Enterprise";
import Government from "./pages/Government";
import Recyclers from "./pages/Recyclers";
import ApiDocs from "./pages/ApiDocs";
import Mobile from "./pages/Mobile";
import Press from "./pages/Press";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import AdminDashboard from "./pages/AdminDashboard";
import AuthGuard from "./components/auth/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GuestAccessProvider>
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
              <Route path="/account-settings" element={
                <AuthGuard>
                  <AccountSettings />
                </AuthGuard>
              } />
              <Route path="/onboarding-trader" element={
                <AuthGuard requireRole="trader" requireOnboarding={false}>
                  <OnboardingTrader />
                </AuthGuard>
              } />
              <Route path="/onboarding-manufacturer" element={
                <AuthGuard requireRole="manufacturer" requireOnboarding={false}>
                  <OnboardingManufacturer />
                </AuthGuard>
              } />
              <Route path="/carbon-tracker" element={<CarbonTracker />} />
              <Route path="/ewaste-recycling" element={<EWasteRecycling />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/security" element={<Security />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/voice-demo" element={<VoiceDemo />} />
              <Route path="/carbon-intelligence" element={<CarbonIntelligence />} />
              <Route path="/scan-invoice" element={<ScanInvoice />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/trial" element={<Trial />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/government" element={<Government />} />
              <Route path="/recyclers" element={<Recyclers />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/mobile" element={<Mobile />} />
              <Route path="/press" element={<Press />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
        </GuestAccessProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;