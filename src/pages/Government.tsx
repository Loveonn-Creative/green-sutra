import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, BarChart3, FileText, Globe, CheckCircle, ArrowRight } from "lucide-react";

const Government = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const solutions = [
    {
      icon: Building,
      title: "Policy Implementation",
      description: "Tools to implement and monitor sustainability policies across departments"
    },
    {
      icon: BarChart3,
      title: "Regional Analytics",
      description: "Comprehensive carbon footprint tracking for entire regions and districts"
    },
    {
      icon: FileText,
      title: "Compliance Reporting",
      description: "Automated generation of environmental compliance reports"
    },
    {
      icon: Globe,
      title: "Citizen Engagement",
      description: "Platform for citizens to participate in sustainability initiatives"
    }
  ];

  const benefits = [
    "Monitor MSME compliance with environmental standards",
    "Track progress towards carbon neutrality goals",
    "Generate reports for international climate commitments",
    "Facilitate green credit allocation",
    "Enable data-driven policy decisions",
    "Promote circular economy initiatives"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Government Sustainability Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Empower your administration with comprehensive tools to monitor, measure, and manage 
              environmental initiatives across your jurisdiction.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact?type=government">
                Request Partnership
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {solutions.map((solution, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <solution.icon className="h-6 w-6 text-primary" />
                    <span>{solution.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Impact Stats */}
          <div className="bg-secondary/50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Supporting India's Climate Goals</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">63M+</div>
                <p className="text-muted-foreground">MSMEs to be monitored</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50%</div>
                <p className="text-muted-foreground">Reduction in carbon emissions target</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2030</div>
                <p className="text-muted-foreground">Net zero commitment support</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Platform Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Partner with Us for a Sustainable Future</h2>
            <p className="text-muted-foreground mb-8">
              Join our mission to empower India's MSMEs in their sustainability journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact?type=government">Contact Us</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">View Platform Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Government;