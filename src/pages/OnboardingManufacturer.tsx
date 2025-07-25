import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Factory, Cog, Leaf, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";

const OnboardingManufacturer = () => {
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
    industry: "",
    manufacturingType: "",
    annualTurnover: "",
    employees: "",
    painPoints: [] as string[],
    goals: [] as string[]
  });
  const { toast } = useToast();

  const content = {
    en: {
      title: "Welcome, Manufacturer!",
      subtitle: "Let's optimize your sustainable manufacturing operations",
      steps: ["Business Info", "Manufacturing Details", "Goals & Challenges"],
      businessInfo: {
        title: "Tell us about your manufacturing business",
        businessName: "Company Name",
        gstNumber: "GST Number",
        contactPerson: "Contact Person",
        phone: "Phone Number",
        email: "Email Address",
        city: "City",
        state: "State"
      },
      manufacturingDetails: {
        title: "Your manufacturing operations",
        industry: "Industry Sector",
        industries: {
          textiles: "Textiles & Garments",
          automotive: "Automotive Parts",
          chemicals: "Chemicals & Pharmaceuticals",
          electronics: "Electronics & Components",
          food: "Food & Beverages",
          metals: "Metals & Alloys",
          plastics: "Plastics & Polymers",
          machinery: "Machinery & Equipment",
          other: "Other"
        },
        manufacturingType: "Manufacturing Type",
        types: {
          assembly: "Assembly Operations",
          processing: "Raw Material Processing",
          fabrication: "Metal Fabrication",
          chemical: "Chemical Processing",
          packaging: "Packaging & Labeling",
          mixed: "Mixed Operations"
        },
        annualTurnover: "Annual Turnover",
        turnovers: {
          "0-1Cr": "₹0 - ₹1 Crore",
          "1Cr-10Cr": "₹1 Crore - ₹10 Crores",
          "10Cr-50Cr": "₹10 Crores - ₹50 Crores",
          "50Cr+": "₹50 Crores+"
        },
        employees: "Number of Employees",
        employeeCounts: {
          "1-10": "1-10 employees",
          "11-50": "11-50 employees",
          "51-200": "51-200 employees",
          "200+": "200+ employees"
        }
      },
      challenges: {
        title: "What manufacturing challenges do you face?",
        description: "Select all that apply to get specialized recommendations",
        painPoints: [
          "Energy cost management",
          "Waste reduction and recycling",
          "Supply chain sustainability",
          "Emission monitoring and reporting",
          "Regulatory compliance (PCB, BIS)",
          "Equipment efficiency optimization",
          "Raw material sourcing",
          "Quality control systems"
        ],
        goalsTitle: "What are your sustainable manufacturing goals?",
        goals: [
          "Reduce energy consumption by 20%",
          "Achieve zero waste to landfill",
          "Implement circular economy practices",
          "Get ISO 14001 certification",
          "Carbon neutral operations",
          "Green supply chain management",
          "Smart factory automation",
          "Employee sustainability training"
        ]
      },
      buttons: {
        next: "Next Step",
        previous: "Previous",
        complete: "Complete Setup"
      },
      success: "Welcome to Biocog! Your manufacturing dashboard is ready."
    },
    hi: {
      title: "स्वागत है, निर्माता!",
      subtitle: "आइए आपके टिकाऊ निर्माण संचालन को अनुकूलित करें",
      steps: ["व्यावसायिक जानकारी", "निर्माण विवरण", "लक्ष्य और चुनौतियां"],
      businessInfo: {
        title: "अपने निर्माण व्यवसाय के बारे में बताएं",
        businessName: "कंपनी का नाम",
        gstNumber: "GST नंबर",
        contactPerson: "संपर्क व्यक्ति",
        phone: "फोन नंबर",
        email: "ईमेल पता",
        city: "शहर",
        state: "राज्य"
      },
      manufacturingDetails: {
        title: "आपके निर्माण संचालन",
        industry: "उद्योग क्षेत्र",
        industries: {
          textiles: "वस्त्र और परिधान",
          automotive: "ऑटोमोटिव पार्ट्स",
          chemicals: "रसायन और फार्मास्यूटिकल्स",
          electronics: "इलेक्ट्रॉनिक्स और कंपोनेंट्स",
          food: "खाद्य और पेय",
          metals: "धातु और मिश्र धातु",
          plastics: "प्लास्टिक और पॉलिमर",
          machinery: "मशीनरी और उपकरण",
          other: "अन्य"
        },
        manufacturingType: "निर्माण प्रकार",
        types: {
          assembly: "असेंबली संचालन",
          processing: "कच्चे माल की प्रसंस्करण",
          fabrication: "धातु निर्माण",
          chemical: "रासायनिक प्रसंस्करण",
          packaging: "पैकेजिंग और लेबलिंग",
          mixed: "मिश्रित संचालन"
        },
        annualTurnover: "वार्षिक टर्नओवर",
        turnovers: {
          "0-1Cr": "₹0 - ₹1 करोड़",
          "1Cr-10Cr": "₹1 करोड़ - ₹10 करोड़",
          "10Cr-50Cr": "₹10 करोड़ - ₹50 करोड़",
          "50Cr+": "₹50 करोड़+"
        },
        employees: "कर्मचारियों की संख्या",
        employeeCounts: {
          "1-10": "1-10 कर्मचारी",
          "11-50": "11-50 कर्मचारी",
          "51-200": "51-200 कर्मचारी",
          "200+": "200+ कर्मचारी"
        }
      },
      challenges: {
        title: "आप किन निर्माण चुनौतियों का सामना करते हैं?",
        description: "विशेष सिफारिशें पाने के लिए सभी लागू विकल्प चुनें",
        painPoints: [
          "ऊर्जा लागत प्रबंधन",
          "अपशिष्ट कमी और पुनर्चक्रण",
          "आपूर्ति श्रृंखला स्थिरता",
          "उत्सर्जन निगरानी और रिपोर्टिंग",
          "नियामक अनुपालन (PCB, BIS)",
          "उपकरण दक्षता अनुकूलन",
          "कच्चे माल की सोर्सिंग",
          "गुणवत्ता नियंत्रण प्रणाली"
        ],
        goalsTitle: "आपके टिकाऊ निर्माण लक्ष्य क्या हैं?",
        goals: [
          "ऊर्जा खपत 20% कम करना",
          "शून्य अपशिष्ट लैंडफिल प्राप्त करना",
          "परिपत्र अर्थव्यवस्था प्रथाओं को लागू करना",
          "ISO 14001 प्रमाणन प्राप्त करना",
          "कार्बन न्यूट्रल संचालन",
          "हरित आपूर्ति श्रृंखला प्रबंधन",
          "स्मार्ट फैक्ट्री स्वचालन",
          "कर्मचारी स्थिरता प्रशिक्षण"
        ]
      },
      buttons: {
        next: "अगला चरण",
        previous: "पिछला",
        complete: "सेटअप पूरा करें"
      },
      success: "Biocog में आपका स्वागत है! आपका निर्माण डैशबोर्ड तैयार है।"
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
        description: "Your personalized manufacturing dashboard is being prepared..."
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
              <Factory className="h-8 w-8 text-white" />
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
                        placeholder="Enter company name"
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
                      placeholder="company@example.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">{currentContent.businessInfo.city}</Label>
                      <Input 
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="Chennai"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">{currentContent.businessInfo.state}</Label>
                      <Input 
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        placeholder="Tamil Nadu"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">{currentContent.manufacturingDetails.title}</h2>
                  </div>

                  <div>
                    <Label>{currentContent.manufacturingDetails.industry}</Label>
                    <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(currentContent.manufacturingDetails.industries).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{currentContent.manufacturingDetails.manufacturingType}</Label>
                    <Select value={formData.manufacturingType} onValueChange={(value) => setFormData({...formData, manufacturingType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select manufacturing type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(currentContent.manufacturingDetails.types).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{currentContent.manufacturingDetails.annualTurnover}</Label>
                      <Select value={formData.annualTurnover} onValueChange={(value) => setFormData({...formData, annualTurnover: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select turnover" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(currentContent.manufacturingDetails.turnovers).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>{currentContent.manufacturingDetails.employees}</Label>
                      <Select value={formData.employees} onValueChange={(value) => setFormData({...formData, employees: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee count" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(currentContent.manufacturingDetails.employeeCounts).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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

export default OnboardingManufacturer;