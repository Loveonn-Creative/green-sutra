import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, Truck, CreditCard, Network, CheckCircle, ArrowRight } from "lucide-react";

const Recyclers = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const features = [
    {
      icon: Recycle,
      title: "E-Waste Management",
      description: "Comprehensive platform for managing electronic waste collection and processing"
    },
    {
      icon: Truck,
      title: "Route Optimization",
      description: "AI-powered logistics to optimize collection routes and reduce costs"
    },
    {
      icon: CreditCard,
      title: "Carbon Credit Trading",
      description: "Monetize your recycling efforts through carbon credit generation"
    },
    {
      icon: Network,
      title: "Network Connectivity",
      description: "Connect with MSMEs and enterprises for consistent waste supply"
    }
  ];

  const benefits = [
    "Access to verified MSME partners",
    "Automated documentation and compliance",
    "Real-time tracking of recycling operations",
    "Carbon credit certification and trading",
    "Digital payment integration",
    "Performance analytics and insights"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Recycler Network Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join India's largest network of verified recyclers. Scale your operations, 
              increase efficiency, and contribute to a circular economy.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth?role=recycler">
                Join Network
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

          {/* Stats Section */}
          <div className="bg-secondary/50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Network Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Verified Recyclers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Tons Recycled</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">₹50L+</div>
                <p className="text-muted-foreground">Carbon Credits Generated</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                <p className="text-muted-foreground">MSME Partners</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Join Our Network?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Register & Verify</h3>
                <p className="text-muted-foreground">Complete your profile and get verified by our team</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Connect & Collect</h3>
                <p className="text-muted-foreground">Get matched with MSMEs for waste collection</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Process & Earn</h3>
                <p className="text-muted-foreground">Process waste and earn carbon credits</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Recycling Business?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of recyclers building India's circular economy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?role=recycler">Join Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact?type=recycler">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Recyclers;