import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, ArrowRight, CheckCircle, Users, Target, Globe } from "lucide-react";

const Partners = () => {
  const partnerTypes = [
    {
      title: "Technology Partners",
      description: "Integrate with our API and build sustainability solutions together",
      benefits: ["API Access", "Technical Support", "Co-marketing", "Revenue Sharing"],
      icon: <Globe className="h-8 w-8" />
    },
    {
      title: "Channel Partners", 
      description: "Help us reach more MSMEs across India and earn commissions",
      benefits: ["Sales Training", "Marketing Materials", "Commission Structure", "Lead Generation"],
      icon: <Users className="h-8 w-8" />
    },
    {
      title: "Implementation Partners",
      description: "Help businesses implement our solutions and provide consulting",
      benefits: ["Certification Program", "Training Resources", "Client Referrals", "Support Tools"],
      icon: <Target className="h-8 w-8" />
    }
  ];

  const currentPartners = [
    {
      name: "GreenTech Solutions",
      type: "Technology Partner",
      description: "Leading environmental technology company helping us expand our carbon tracking capabilities",
      logo: "/placeholder.svg"
    },
    {
      name: "MSME India Network",
      type: "Channel Partner", 
      description: "Largest MSME association in India with 50,000+ member businesses",
      logo: "/placeholder.svg"
    },
    {
      name: "Sustainability Consultants",
      type: "Implementation Partner",
      description: "Expert consultants helping businesses implement ESG best practices",
      logo: "/placeholder.svg"
    },
    {
      name: "EcoFinance Bank",
      type: "Financial Partner",
      description: "Green lending partner providing sustainable financing options",
      logo: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Partner with Biocog
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Join our ecosystem and help transform India's sustainability landscape
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Become a Partner
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                View Partnership Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Partner with Us?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join the fastest-growing sustainability platform for Indian businesses
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Massive Market</h3>
                  <p className="text-muted-foreground">
                    Access to 63 million MSMEs across India looking for sustainability solutions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Proven Growth</h3>
                  <p className="text-muted-foreground">
                    300% year-over-year growth with strong market demand and expansion plans
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Handshake className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Win-Win Model</h3>
                  <p className="text-muted-foreground">
                    Competitive revenue sharing and support that helps both partners and clients succeed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 bg-accent/5">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Partnership Opportunities
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the partnership model that fits your business
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {partnerTypes.map((partner, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                      {partner.icon}
                    </div>
                    <CardTitle className="text-xl">{partner.title}</CardTitle>
                    <p className="text-muted-foreground">{partner.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Benefits:</h4>
                      <ul className="space-y-2">
                        {partner.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Partners
              </h2>
              <p className="text-lg text-muted-foreground">
                Trusted organizations working with us to drive sustainability
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {currentPartners.map((partner, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <Handshake className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
                          <Badge variant="secondary" className="text-xs">{partner.type}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{partner.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Application */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Partner?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join our growing network of partners and help shape India's sustainable future
              </p>
            </div>
            
            <div className="bg-background rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">1. Apply</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit your partnership application with details about your business
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">2. Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your application and schedule a discussion
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">3. Launch</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete onboarding and start growing together
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Apply for Partnership
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact">Contact Partnership Team</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;