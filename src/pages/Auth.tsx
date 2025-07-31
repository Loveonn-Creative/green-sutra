import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Users, Factory } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, user } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'trader' | 'manufacturer'>('trader');
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Handle URL parameters for trial mode, plan selection, etc.
  useEffect(() => {
    const urlRole = searchParams.get('role');
    if (urlRole && (urlRole === 'trader' || urlRole === 'manufacturer')) {
      setRole(urlRole);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (type: 'signin' | 'signup') => {
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!isValidPassword(password)) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (type === 'signup') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      if (!companyName.trim()) {
        toast.error('Company name is required');
        return;
      }

      if (!contactPerson.trim()) {
        toast.error('Contact person name is required');
        return;
      }
    }

    setLoading(true);

    try {
      if (type === 'signup') {
        const { error } = await signUp(email, password, role);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in instead.');
          } else if (error.message.includes('Password should be at least 6 characters')) {
            toast.error('Password must be at least 6 characters long');
          } else {
            toast.error(error.message || 'Failed to create account');
          }
        } else {
          toast.success('Account created successfully! Redirecting to complete your profile...');
          
          // Handle URL parameters for specific flows
          const mode = searchParams.get('mode');
          const plan = searchParams.get('plan');
          
          if (mode === 'trial') {
            navigate('/trial');
          } else if (plan) {
            navigate(`/pricing?plan=${plan}`);
          } else if (role === 'trader') {
            navigate(`/onboarding-trader?company=${encodeURIComponent(companyName)}&contact=${encodeURIComponent(contactPerson)}&phone=${encodeURIComponent(phone)}`);
          } else {
            navigate(`/onboarding-manufacturer?company=${encodeURIComponent(companyName)}&contact=${encodeURIComponent(contactPerson)}&phone=${encodeURIComponent(phone)}`);
          }
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else if (error.message.includes('Email not confirmed')) {
            toast.error('Please confirm your email address before signing in');
          } else {
            toast.error(error.message || 'Failed to sign in');
          }
        } else {
          toast.success('Signed in successfully!');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!isValidEmail(resetEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset email sent! Check your inbox.');
        setShowForgotPassword(false);
        setResetEmail('');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-foreground">Biocog</h1>
          </div>
          <p className="text-muted-foreground">
            Sustainable Business Platform
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <CardHeader className="px-0">
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('signin'); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Forgot your password?
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <CardHeader className="px-0">
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>
                    Create your Biocog account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('signup'); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Select Role</Label>
                    <Select
                      value={role}
                      onValueChange={(value: 'trader' | 'manufacturer') => setRole(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trader">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Trader
                          </div>
                        </SelectItem>
                        <SelectItem value="manufacturer">
                          <div className="flex items-center">
                            <Factory className="h-4 w-4 mr-2" />
                            Manufacturer
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter your company name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Person</Label>
                    <Input
                      id="contact"
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Enter contact person name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password (min 6 characters)"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {showForgotPassword && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email address and we'll send you a link to reset your password.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleForgotPassword}
                        disabled={loading}
                        className="flex-1"
                      >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetEmail('');
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;