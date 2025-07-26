import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Users, Factory } from 'lucide-react';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const { createProfile } = useProfile();
  const { translations } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'trader' as 'trader' | 'manufacturer',
    companyName: ''
  });

  const handleSubmit = async (type: 'signin' | 'signup') => {
    setLoading(true);
    try {
      if (type === 'signin') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Successfully signed in!');
          navigate('/');
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.role);
        if (error) {
          toast.error(error.message);
        } else {
          // Create profile after successful signup
          setTimeout(async () => {
            await createProfile({
              role: formData.role,
              company_name: formData.companyName,
              onboarding_completed: false,
              ui_theme: 'suit',
              preferred_language: 'en'
            });
          }, 1000);
          
          toast.success('Account created! Please check your email to verify your account.');
          navigate('/');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already authenticated
  if (user) {
    navigate('/');
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
            {translations.welcome}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">{translations.signIn}</TabsTrigger>
                <TabsTrigger value="signup">{translations.signUp}</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <CardHeader className="px-0">
                  <CardTitle>{translations.signIn}</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">{translations.email}</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signin-password">{translations.password}</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button 
                    onClick={() => handleSubmit('signin')} 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : translations.signIn}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <CardHeader className="px-0">
                  <CardTitle>{translations.signUp}</CardTitle>
                  <CardDescription>
                    Create your Biocog account
                  </CardDescription>
                </CardHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="role">{translations.selectRole}</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: 'trader' | 'manufacturer') => 
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trader">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {translations.trader}
                          </div>
                        </SelectItem>
                        <SelectItem value="manufacturer">
                          <div className="flex items-center">
                            <Factory className="h-4 w-4 mr-2" />
                            {translations.manufacturer}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="company-name">{translations.companyName}</Label>
                    <Input
                      id="company-name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">{translations.email}</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">{translations.password}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button 
                    onClick={() => handleSubmit('signup')} 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : translations.signUp}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;