import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Camera, MapPin, Bell, Download, Star } from "lucide-react";

const Mobile = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const features = [
    {
      icon: Camera,
      title: "Invoice Scanning",
      description: "Instantly scan invoices to calculate carbon footprint on the go"
    },
    {
      icon: MapPin,
      title: "Location-Based Services",
      description: "Find nearby recyclers and sustainability services"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get reminders for sustainability goals and e-waste pickups"
    },
    {
      icon: Smartphone,
      title: "Offline Mode",
      description: "Continue tracking even without internet connection"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sustainability in Your Pocket
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Take your sustainability journey anywhere with the Biocog mobile app. 
                Track carbon footprint, manage e-waste, and earn green credits on the go.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  <Download className="h-5 w-5 mr-2" />
                  Download for iOS
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Download className="h-5 w-5 mr-2" />
                  Download for Android
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 text-center">
                <Smartphone className="h-32 w-32 mx-auto text-primary mb-4" />
                <p className="text-muted-foreground">Mobile app mockup coming soon</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Mobile App Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* App Stats */}
          <div className="bg-secondary/50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">App Performance</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.8</div>
                <p className="text-muted-foreground">App Store Rating</p>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Downloads</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <p className="text-muted-foreground">Uptime</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">&lt; 2s</div>
                <p className="text-muted-foreground">Scan Time</p>
              </div>
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Coming Soon</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Voice Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Voice-powered sustainability tracking and recommendations</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AR Scanner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Augmented reality scanner for product sustainability information</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Connect with other businesses on their sustainability journey</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Get Notified When We Launch</h2>
            <p className="text-muted-foreground mb-8">
              Be the first to know when our mobile app is available
            </p>
            <Button size="lg" asChild>
              <Link to="/auth?notify=mobile">Notify Me</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Mobile;