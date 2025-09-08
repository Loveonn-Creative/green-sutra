import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGuestAccess } from "@/hooks/useGuestAccess";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  Zap, 
  Bot, 
  FileText, 
  Camera,
  ArrowRight,
  Trophy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Trial = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isGuestMode } = useGuestAccess();
  const { toast } = useToast();
  
  const selectedPlan = searchParams.get("plan") || "trial";
  
  // Mock trial data
  const [trialData, setTrialData] = useState({
    daysRemaining: 14,
    invoiceScansUsed: 1,
    invoiceScansLimit: 3,
    aiConversationsUsed: 2,
    aiConversationsLimit: 10,
    featuresUnlocked: ["invoice-scan", "ai-chat", "basic-reports"]
  });

  useEffect(() => {
    if (!user && !isGuestMode) {
      navigate("/auth?mode=trial");
      return;
    }
  }, [user, isGuestMode, navigate]);

  const handleUpgrade = () => {
    navigate(`/auth?plan=${selectedPlan}`);
  };

  const features = [
    {
      id: "invoice-scan",
      name: "Invoice Scanner",
      description: "AI-powered invoice scanning and CO₂ calculation",
      icon: Camera,
      link: "/scan-invoice",
      completed: trialData.featuresUnlocked.includes("invoice-scan")
    },
    {
      id: "ai-chat",
      name: "AI Assistant", 
      description: "Multilingual business guidance chatbot",
      icon: Bot,
      link: "/voice-demo",
      completed: trialData.featuresUnlocked.includes("ai-chat")
    },
    {
      id: "basic-reports",
      name: "ESG Reports",
      description: "Generate basic sustainability reports",
      icon: FileText,
      link: "/esg-evaluation",
      completed: trialData.featuresUnlocked.includes("basic-reports")
    }
  ];

  if (!user && !isGuestMode) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Free Trial Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your 14-day free trial! Explore all features with no commitment.
            </p>
          </div>

          {/* Trial Status */}
          <Card className="mb-8 bg-gradient-success border-success/20">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-success-foreground">
                    {trialData.daysRemaining}
                  </div>
                  <div className="text-success-foreground/80">Days Remaining</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success-foreground">
                    {trialData.invoiceScansUsed}/{trialData.invoiceScansLimit}
                  </div>
                  <div className="text-success-foreground/80">Invoice Scans</div>
                  <Progress 
                    value={(trialData.invoiceScansUsed / trialData.invoiceScansLimit) * 100} 
                    className="mt-1"
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold text-success-foreground">
                    {trialData.aiConversationsUsed}/{trialData.aiConversationsLimit}
                  </div>
                  <div className="text-success-foreground/80">AI Conversations</div>
                  <Progress 
                    value={(trialData.aiConversationsUsed / trialData.aiConversationsLimit) * 100} 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Button 
                    variant="secondary" 
                    onClick={handleUpgrade}
                    className="bg-background text-foreground hover:bg-background/90"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="features" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Try Features</TabsTrigger>
              <TabsTrigger value="progress">Your Progress</TabsTrigger>
              <TabsTrigger value="upgrade">Upgrade Options</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="relative">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                          </div>
                          {feature.completed && (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Tried
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {feature.description}
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                          <a href={feature.link}>
                            Try Now
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Trial Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Features Explored</h4>
                      <div className="space-y-2">
                        {features.map((feature) => (
                          <div key={feature.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <feature.icon className="h-4 w-4" />
                              <span>{feature.name}</span>
                            </div>
                            {feature.completed ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Usage Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-accent/50 rounded-lg">
                          <div className="text-lg font-bold">1</div>
                          <div className="text-sm text-muted-foreground">Invoices Scanned</div>
                        </div>
                        <div className="text-center p-4 bg-accent/50 rounded-lg">
                          <div className="text-lg font-bold">2</div>
                          <div className="text-sm text-muted-foreground">AI Conversations</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upgrade">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <div className="text-center">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <CardTitle>Starter</CardTitle>
                      <div className="text-2xl font-bold">₹999<span className="text-sm font-normal">/month</span></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />50 invoice scans/month</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Basic CO₂ tracking</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />WhatsApp support</li>
                    </ul>
                    <Button className="w-full mt-4" onClick={() => handleUpgrade()}>
                      Choose Starter
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary shadow-glow bg-primary/5">
                  <CardHeader>
                    <div className="text-center">
                      <Badge className="mb-2">Most Popular</Badge>
                      <div className="w-8 h-8 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Growth</CardTitle>
                      <div className="text-2xl font-bold">₹2,499<span className="text-sm font-normal">/month</span></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />200 invoice scans/month</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Advanced AI analytics</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Priority phone support</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />All 5 language support</li>
                    </ul>
                    <Button className="w-full mt-4" onClick={() => handleUpgrade()}>
                      Choose Growth
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <div className="text-center">
                      <Trophy className="h-8 w-8 mx-auto mb-2 text-warning" />
                      <CardTitle>Scale</CardTitle>
                      <div className="text-2xl font-bold">₹4,999<span className="text-sm font-normal">/month</span></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Unlimited invoice scans</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Predictive AI insights</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Dedicated account manager</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />API access</li>
                    </ul>
                    <Button className="w-full mt-4" onClick={() => handleUpgrade()}>
                      Choose Scale
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Trial;