import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, Shield, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';
import PhoneVerification from './PhoneVerification';
import { useIsMobile } from '@/hooks/use-mobile';

const EnhancedAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { createProfile } = useProfile();
  const isMobile = useIsMobile();

  const [mode, setMode] = useState<'signin' | 'signup' | 'phone-verify' | 'forgot-password'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState<'trader' | 'manufacturer'>('trader');

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordSuggestions, setPasswordSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'trader' || roleParam === 'manufacturer') {
      setRole(roleParam);
    }

    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup') {
      setMode('signup');
    }
  }, [searchParams]);

  const validatePassword = (pass: string) => {
    let strength = 0;
    const suggestions: string[] = [];

    if (pass.length >= 8) strength += 1;
    else suggestions.push('At least 8 characters');

    if (/[a-z]/.test(pass)) strength += 1;
    else suggestions.push('One lowercase letter');

    if (/[A-Z]/.test(pass)) strength += 1;
    else suggestions.push('One uppercase letter');

    if (/\d/.test(pass)) strength += 1;
    else suggestions.push('One number');

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(pass)) strength += 1;
    else suggestions.push('One special character');

    setPasswordStrength(strength);
    setPasswordSuggestions(suggestions);
  };

  const generateSecurePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let result = '';
    
    // Ensure at least one of each required character type
    result += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    result += '0123456789'[Math.floor(Math.random() * 10)];
    result += '!@#$%^&*'[Math.floor(Math.random() * 8)];
    
    // Fill the rest randomly
    for (let i = 4; i < 12; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Shuffle the result
    return result.split('').sort(() => 0.5 - Math.random()).join('');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and confirm your account');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Signed in successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name || !companyName) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordStrength < 4) {
      toast.error('Password is too weak. Please follow the suggestions.');
      return;
    }

    if (!verifiedPhone) {
      setMode('phone-verify');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password, role);

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Please sign in instead.');
          setMode('signin');
        } else {
          toast.error(error.message);
        }
      } else {
        // Create profile
        await createProfile({
          role,
          company_name: companyName,
          contact_person: name,
          phone: verifiedPhone,
          preferred_language: 'en',
          onboarding_completed: false
        });

        toast.success('Account created successfully! Please check your email to verify your account.');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      // In a real implementation, you would call the forgot password function
      toast.success('Password reset instructions sent to your email');
      setMode('signin');
    } catch (error) {
      toast.error('Failed to send reset email');
    }
    setLoading(false);
  };

  const handlePhoneVerification = (phone: string) => {
    setVerifiedPhone(phone);
    setMode('signup');
    toast.success('Phone verified! Complete your registration.');
  };

  if (mode === 'phone-verify') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 flex items-center justify-center p-4">
        <PhoneVerification
          onVerificationComplete={handlePhoneVerification}
          onBack={() => setMode('signup')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-lg relative z-10 bg-card/40 backdrop-blur-xl border-primary/20">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot-password' && 'Reset Password'}
          </CardTitle>
          <CardDescription className="text-base">
            {mode === 'signin' && 'Sign in to your Biocog account'}
            {mode === 'signup' && 'Join the sustainable business revolution'}
            {mode === 'forgot-password' && 'Enter your email to reset your password'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {mode !== 'forgot-password' ? (
            <Tabs value={mode} onValueChange={(value) => setMode(value as any)} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-primary-foreground"
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setMode('forgot-password')}
                    className="text-primary hover:text-primary-glow"
                  >
                    Forgot your password?
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select value={role} onValueChange={(value: 'trader' | 'manufacturer') => setRole(value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trader">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Trader
                          </div>
                        </SelectItem>
                        <SelectItem value="manufacturer">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Manufacturer
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Contact Person Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-company">Company Name *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-company"
                        type="text"
                        placeholder="Your company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Verification Status */}
                  {verifiedPhone ? (
                    <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="text-sm text-success">Phone verified: +91 {verifiedPhone}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <Phone className="w-5 h-5 text-warning" />
                      <span className="text-sm text-warning">Phone verification required</span>
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signup-password">Password *</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newPassword = generateSecurePassword();
                          setPassword(newPassword);
                          setConfirmPassword(newPassword);
                          validatePassword(newPassword);
                          toast.success('Secure password generated!');
                        }}
                        className="text-xs text-primary hover:text-primary-glow"
                      >
                        Generate Secure
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          validatePassword(e.target.value);
                        }}
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${
                                passwordStrength < 2 ? 'bg-destructive' :
                                passwordStrength < 4 ? 'bg-warning' : 'bg-success'
                              }`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                          </div>
                          <Badge variant={passwordStrength < 2 ? 'destructive' : passwordStrength < 4 ? 'secondary' : 'default'}>
                            {passwordStrength < 2 ? 'Weak' : passwordStrength < 4 ? 'Medium' : 'Strong'}
                          </Badge>
                        </div>
                        
                        {passwordSuggestions.length > 0 && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Needs: </span>
                            {passwordSuggestions.join(', ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                      {confirmPassword && password && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {password === confirmPassword ? (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !verifiedPhone}
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-primary-foreground"
                  >
                    {loading ? 'Creating Account...' : verifiedPhone ? 'Create Account' : 'Verify Phone First'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {!verifiedPhone && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setMode('phone-verify')}
                      className="w-full"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Verify Phone Number
                    </Button>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-primary-foreground"
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setMode('signin')}
                className="w-full"
              >
                Back to Sign In
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAuth;