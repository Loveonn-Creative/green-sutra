import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Heart, ArrowRight, Briefcase } from "lucide-react";

const Careers = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      description: "Build AI models for carbon tracking and ESG compliance automation",
      requirements: ["Python", "TensorFlow", "Machine Learning", "REST APIs"]
    },
    {
      id: 2,
      title: "Product Manager - Sustainability",
      department: "Product",
      location: "Remote",
      type: "Full-time", 
      experience: "2-4 years",
      description: "Drive product strategy for MSME sustainability solutions",
      requirements: ["Product Management", "Sustainability", "User Research", "Analytics"]
    },
    {
      id: 3,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-3 years",
      description: "Create beautiful, accessible user interfaces for our platform",
      requirements: ["React", "TypeScript", "Tailwind CSS", "Mobile-first Design"]
    },
    {
      id: 4,
      title: "Business Development - MSMEs",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "1-3 years",
      description: "Help MSMEs discover and adopt our sustainability solutions",
      requirements: ["B2B Sales", "Hindi + English", "MSME Knowledge", "Relationship Building"]
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance for you and your family"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Learning & Growth",
      description: "Annual learning budget and conference attendance"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote work options"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Equity Package",
      description: "Be an owner in the sustainability revolution"
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
                Join Our Mission
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Help us build the future of sustainable business in India
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                View Open Positions
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Work at Biocog?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join a team that's making a real impact on India's sustainability future
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-accent/5">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Open Positions
              </h2>
              <p className="text-lg text-muted-foreground">
                Find your next opportunity to make a difference
              </p>
            </div>
            
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-xl text-foreground">{job.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Badge variant="secondary">{job.experience}</Badge>
                        <Button variant="outline" size="sm">
                          Apply Now
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Key Requirements:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Culture
              </h2>
              <p className="text-lg text-muted-foreground">
                We believe in creating an environment where everyone can do their best work 
                while making a positive impact on the world.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Collaborative</h3>
                <p className="text-muted-foreground">
                  We work together across teams to solve complex problems
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Purpose-Driven</h3>
                <p className="text-muted-foreground">
                  Every project contributes to a more sustainable future
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Growth-Focused</h3>
                <p className="text-muted-foreground">
                  Continuous learning and professional development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Make an Impact?
              </h2>
              <p className="text-lg text-muted-foreground">
                Don't see a role that fits? We're always looking for talented people who share our mission.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Send Your Resume
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/about">Learn More About Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;