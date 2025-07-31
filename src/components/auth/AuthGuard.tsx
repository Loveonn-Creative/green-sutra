import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  requireRole?: 'trader' | 'manufacturer';
  requireOnboarding?: boolean;
}

const AuthGuard = ({ children, requireRole, requireOnboarding = true }: AuthGuardProps) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  // Show loading while auth or profile is loading
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If profile is required but doesn't exist, redirect to auth
  if (!profile) {
    return <Navigate to="/auth" replace />;
  }

  // Check if onboarding is required but not completed
  if (requireOnboarding && !profile.onboarding_completed) {
    const onboardingPath = profile.role === 'trader' ? '/onboarding-trader' : '/onboarding-manufacturer';
    return <Navigate to={onboardingPath} replace />;
  }

  // Check role requirement
  if (requireRole && profile.role !== requireRole) {
    // Redirect to appropriate dashboard based on actual role
    const dashboardPath = profile.role === 'trader' ? '/trader-dashboard' : '/manufacturer-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;