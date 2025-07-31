import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  useEffect(() => {
    // If not authenticated, redirect to auth page
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    // If authenticated but no profile yet, wait for profile to load
    if (user && !profileLoading && profile) {
      // Check onboarding status and redirect accordingly
      if (!profile.onboarding_completed) {
        if (profile.role === 'trader') {
          navigate('/onboarding-trader');
        } else if (profile.role === 'manufacturer') {
          navigate('/onboarding-manufacturer');
        }
      } else {
        // Redirect to appropriate dashboard based on role
        if (profile.role === 'trader') {
          navigate('/trader-dashboard');
        } else if (profile.role === 'manufacturer') {
          navigate('/manufacturer-dashboard');
        } else {
          navigate('/');
        }
      }
    }
  }, [user, profile, authLoading, profileLoading, navigate]);

  // Show loading while determining where to redirect
  if (authLoading || profileLoading || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;