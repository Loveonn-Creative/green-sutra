import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Store, TrendingUp, Leaf, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";

const OnboardingTrader = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    gstNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    businessType: "",
    annualTurnover: "",
    painPoints: [] as string[],
    goals: [] as string[]
  });
  const { toast } = useToast();

  const content = {
    en: {
      title: "Welcome, Trader!",
      subtitle: "Let's set up your sustainable trading journey",
      steps: ["Business Info", "Trading Details", "Goals & Challenges"],
      businessInfo: {
        title: "Tell us about your business",
        businessName: "Business Name",
        gstNumber: "GST Number",
        contactPerson: "Contact Person",
        phone: "Phone Number",
        email: "Email Address",
        city: "City",
        state: "State"
      },
      tradingDetails: {
        title: "Your trading operations",
        businessType: "Type of Trading",
        businessTypes: {
          retail: "Retail Trading",
          wholesale: "Wholesale Trading", 
          import_export: "Import/Export",
          commodity: "Commodity Trading",
          electronics: "Electronics & Appliances",
          textiles: "Textiles & Garments",
          other: "Other"
        },
        annualTurnover: "Annual Turnover",
        turnovers: {
          "0-10L": "₹0 - ₹10 Lakhs",
          "10L-1Cr": "₹10 Lakhs - ₹1 Crore",
          "1Cr-10Cr": "₹1 Crore - ₹10 Crores",
          "10Cr+": "₹10 Crores+"
        }
      },
      challenges: {
        title: "What challenges do you face?",
        description: "Select all that apply to get personalized recommendations",
        painPoints: [
          "Tax compliance complexity",
          "Managing cash flow",
          "Understanding carbon footprint",
          "Finding reliable suppliers",
          "Accessing credit/loans",
          "Digital payment adoption"
        ],
        goalsTitle: "What are your green business goals?",
        goals: [
          "Reduce operational carbon footprint",
          "Access green financing",
          "Implement sustainable practices",
          "Get ESG compliance reports",
          "Find eco-friendly suppliers",
          "Educate team on sustainability"
        ]
      },
      buttons: {
        next: "Next Step",
        previous: "Previous",
        complete: "Complete Setup"
      },
      success: "Welcome to Biocog! Your trading dashboard is ready."
    },
    hi: {
      title: "स्वागत है, व्यापारी!",
      subtitle: "आइए आपकी टिकाऊ व्यापारिक यात्रा सेट करें",
      steps: ["व्यावसायिक जानकारी", "व्यापारिक विवरण", "लक्ष्य और चुनौतियां"],
      businessInfo: {
        title: "अपने व्यवसाय के बारे में बताएं",
        businessName: "व्यवसाय का नाम",
        gstNumber: "GST नंबर",
        contactPerson: "संपर्क व्यक्ति",
        phone: "फोन नंबर",
        email: "ईमेल पता",
        city: "शहर",
        state: "राज्य"
      },
      tradingDetails: {
        title: "आपके व्यापारिक संचालन",
        businessType: "व्यापार का प्रकार",
        businessTypes: {
          retail: "खुदरा व्यापार",
          wholesale: "थोक व्यापार",
          import_export: "आयात/निर्यात",
          commodity: "कमोडिटी ट्रेडिंग",
          electronics: "इलेक्ट्रॉनिक्स और उपकरण",
          textiles: "वस्त्र और परिधान",
          other: "अन्य"
        },
        annualTurnover: "वार्षिक टर्नओवर",
        turnovers: {
          "0-10L": "₹0 - ₹10 लाख",
          "10L-1Cr": "₹10 लाख - ₹1 करोड़",
          "1Cr-10Cr": "₹1 करोड़ - ₹10 करोड़",
          "10Cr+": "₹10 करोड़+"
        }
      },
      challenges: {
        title: "आप किन चुनौतियों का सामना करते हैं?",
        description: "व्यक्तिगत सिफारिशें पाने के लिए सभी लागू विकल्प चुनें",
        painPoints: [
          "कर अनुपालन जटिलता",
          "नकदी प्रवाह प्रबंधन",
          "कार्बन फुटप्रिंट समझना",
          "विश्वसनीय आपूर्तिकर्ता खोजना",
          "क्रेडिट/ऋण पहुंच",
          "डिजिटल भुगतान अपनाना"
        ],
        goalsTitle: "आपके हरित व्यावसायिक लक्ष्य क्या हैं?",
        goals: [
          "परिचालन कार्बन फुटप्रिंट कम करना",
          "हरित वित्तपोषण पहुंच",
          "टिकाऊ प्रथाओं को लागू करना",
          "ESG अनुपालन रिपोर्ट प्राप्त करना",
          "पर्यावरण-अनुकूल आपूर्तिकर्ता खोजना",
          "स्थिरता पर टीम को शिक्षित करना"
        ]
      },
      buttons: {
        next: "अगला चरण",
        previous: "पिछला",
        complete: "सेटअप पूरा करें"
      },
      success: "Biocog में आपका स्वागत है! आपका ट्रेडिंग डैशबोर्ड तैयार है।"
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      toast({
        title: currentContent.success,
        description: "Your personalized dashboard is being prepared..."
      });
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleArrayValue = (array: string[], value: string, setter: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {currentContent.title}
            </h1>
            <p className="text-muted-foreground">
              {currentContent.subtitle}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {currentContent.steps.map((stepName, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step > index + 1 ? 'bg-success text-white' : 
                    step === index + 1 ? 'bg-primary text-white' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground hidden md:block">
                    {stepName}
                  </span>
                  {index < currentContent.steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 mx-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card>
            <CardContent className="pt-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">{currentContent.businessInfo.title}</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">{currentContent.businessInfo.businessName}</Label>
                      <Input 
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        placeholder="Enter business name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gstNumber">{currentContent.businessInfo.gstNumber}</Label>
                      <Input 
                        id="gstNumber"
                        value={formData.gstNumber}
                        onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
                        placeholder="22AAAAA0000A1Z5"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">{currentContent.businessInfo.contactPerson}</Label>
                      <Input 
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{currentContent.businessInfo.phone}</Label>
                      <Input 
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">{currentContent.businessInfo.email}</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="business@example.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">{currentContent.businessInfo.city}</Label>
                      <Input 
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">{currentContent.businessInfo.state}</Label>
                      <Input 
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">{currentContent.tradingDetails.title}</h2>
                  </div>

                  <div>
                    <Label>{currentContent.tradingDetails.businessType}</Label>
                    <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trading type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(currentContent.tradingDetails.businessTypes).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{currentContent.tradingDetails.annualTurnover}</Label>
                    <Select value={formData.annualTurnover} onValueChange={(value) => setFormData({...formData, annualTurnover: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select turnover range" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(currentContent.tradingDetails.turnovers).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{currentContent.challenges.title}</h2>
                    <p className="text-muted-foreground mb-4">{currentContent.challenges.description}</p>
                  </div>

                  <div className="space-y-3">
                    {currentContent.challenges.painPoints.map((point, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`pain-${index}`}
                          checked={formData.painPoints.includes(point)}
                          onCheckedChange={() => toggleArrayValue(formData.painPoints, point, (arr) => setFormData({...formData, painPoints: arr}))}
                        />
                        <Label htmlFor={`pain-${index}`}>{point}</Label>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">{currentContent.challenges.goalsTitle}</h3>
                    <div className="space-y-3">
                      {currentContent.challenges.goals.map((goal, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`goal-${index}`}
                            checked={formData.goals.includes(goal)}
                            onCheckedChange={() => toggleArrayValue(formData.goals, goal, (arr) => setFormData({...formData, goals: arr}))}
                          />
                          <Label htmlFor={`goal-${index}`}>{goal}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={step === 1}
                >
                  {currentContent.buttons.previous}
                </Button>
                <Button onClick={handleNext}>
                  {step === 3 ? currentContent.buttons.complete : currentContent.buttons.next}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OnboardingTrader;