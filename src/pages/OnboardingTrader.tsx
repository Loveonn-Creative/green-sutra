import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const OnboardingTrader = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: searchParams.get('company') || '',
    contactPerson: searchParams.get('contact') || '',
    phone: searchParams.get('phone') || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    businessType: '',
    annualTurnover: '',
    sustainability: {
      currentPractices: [] as string[],
      goals: '',
      challenges: ''
    },
    preferences: {
      theme: 'suit' as 'sari' | 'suit',
      language: 'en'
    }
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const steps = [
    { title: 'Business Information', description: 'Basic company details' },
    { title: 'Business Operations', description: 'Trading specifics' },
    { title: 'Sustainability Goals', description: 'ESG preferences' },
    { title: 'Preferences', description: 'UI and language settings' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      const updateData = {
        company_name: formData.companyName,
        contact_person: formData.contactPerson,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        gst_number: formData.gstNumber,
        ui_theme: formData.preferences.theme,
        preferred_language: formData.preferences.language,
        onboarding_completed: true
      };
      
      const { error } = await updateProfile(updateData);
      
      if (error) {
        toast.error('Failed to complete onboarding. Please try again.');
        console.error('Onboarding error:', error);
      } else {
        toast.success('Onboarding completed successfully! Welcome to Biocog.');
        navigate('/trader-dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, Trader!</h1>
          <p className="text-muted-foreground">Let's set up your trading profile to get started</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-full mt-4 ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Enter contact person"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      disabled
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter full address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="Enter PIN code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                    <Input
                      id="gstNumber"
                      value={formData.gstNumber}
                      onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                      placeholder="Enter GST number"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Business Operations</h2>
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail Trading</SelectItem>
                      <SelectItem value="wholesale">Wholesale Trading</SelectItem>
                      <SelectItem value="import-export">Import/Export</SelectItem>
                      <SelectItem value="commodity">Commodity Trading</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="annualTurnover">Annual Turnover</Label>
                  <Select value={formData.annualTurnover} onValueChange={(value) => setFormData({ ...formData, annualTurnover: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select annual turnover" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10L">₹0 - ₹10 Lakhs</SelectItem>
                      <SelectItem value="10L-1Cr">₹10 Lakhs - ₹1 Crore</SelectItem>
                      <SelectItem value="1Cr-10Cr">₹1 Crore - ₹10 Crores</SelectItem>
                      <SelectItem value="10Cr+">₹10 Crores+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Sustainability Goals</h2>
                <div>
                  <Label htmlFor="goals">Your sustainability goals</Label>
                  <Textarea
                    id="goals"
                    value={formData.sustainability.goals}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      sustainability: { ...formData.sustainability, goals: e.target.value }
                    })}
                    placeholder="Describe your sustainability goals..."
                  />
                </div>
                <div>
                  <Label htmlFor="challenges">Current challenges</Label>
                  <Textarea
                    id="challenges"
                    value={formData.sustainability.challenges}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      sustainability: { ...formData.sustainability, challenges: e.target.value }
                    })}
                    placeholder="What sustainability challenges do you face?"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Preferences</h2>
                <div>
                  <Label htmlFor="theme">UI Theme</Label>
                  <Select value={formData.preferences.theme} onValueChange={(value: 'sari' | 'suit') => setFormData({ 
                    ...formData, 
                    preferences: { ...formData.preferences, theme: value }
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sari">Sari (Traditional)</SelectItem>
                      <SelectItem value="suit">Suit (Modern)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select value={formData.preferences.language} onValueChange={(value) => setFormData({ 
                    ...formData, 
                    preferences: { ...formData.preferences, language: value }
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी</SelectItem>
                      <SelectItem value="te">తెలుగు</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleComplete}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading ? 'Completing...' : 'Complete Onboarding'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingTrader;