import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Building, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Demo = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    interest: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo request submitted!",
      description: "Our team will contact you within 24 hours to schedule your demo."
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      interest: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Request a Demo</h1>
            <p className="text-muted-foreground text-lg">
              See how Biocog can transform your business with AI-powered sustainability solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Demo Request Form */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule Your Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Your company"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Your Role</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Business Owner</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="trader">Trader</SelectItem>
                          <SelectItem value="manufacturer">Manufacturer</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="interest">Primary Interest</Label>
                      <Select value={formData.interest} onValueChange={(value) => setFormData({...formData, interest: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="What interests you most?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carbon-tracking">Carbon Tracking</SelectItem>
                          <SelectItem value="ai-assistant">AI Assistant</SelectItem>
                          <SelectItem value="ewaste">E-Waste Management</SelectItem>
                          <SelectItem value="esg-reports">ESG Reports</SelectItem>
                          <SelectItem value="all">All Features</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your specific needs or questions..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Request Demo
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Demo Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">30-Minute Demo</h4>
                      <p className="text-sm text-muted-foreground">
                        Personalized walkthrough of features relevant to your business
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Expert Guidance</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn from our sustainability and AI experts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Custom Solutions</h4>
                      <p className="text-sm text-muted-foreground">
                        Discover how Biocog fits your specific industry needs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ready to Try Now?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Explore our interactive features right away:
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/voice-demo">Try Voice Assistant</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/scan-invoice">Try Invoice Scanner</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/auth">Start Free Trial</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm">demo@biocog.ai</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Demo;