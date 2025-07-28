import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Shield, Users, CheckCircle, ArrowRight } from "lucide-react";

const Enterprise = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const features = [
    {
      icon: Building2,
      title: "Enterprise Dashboard",
      description: "Comprehensive sustainability management for large organizations"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Deep insights into carbon footprint and ESG performance"
    },
    {
      icon: Shield,
      title: "Compliance Management",
      description: "Automated reporting for regulatory requirements"
    },
    {
      icon: Users,
      title: "Multi-Team Support",
      description: "Role-based access for different departments"
    }
  ];

  const benefits = [
    "Dedicated account manager",
    "Custom ESG reporting",
    "API access for integrations",
    "Priority support",
    "White-label solutions",
    "Advanced data analytics"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise Sustainability Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive ESG management platform for large organizations. 
              Scale your sustainability initiatives with advanced analytics and automated reporting.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact?type=enterprise">
                Schedule Demo
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

          {/* Benefits Section */}
          <div className="bg-secondary/50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Enterprise Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Sustainability?</h2>
            <p className="text-muted-foreground mb-8">
              Contact our enterprise team to discuss your specific requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact?type=enterprise">Contact Sales</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Enterprise;