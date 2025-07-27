import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Target, Award, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                About Biocog
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Empowering India's 63 Million MSMEs with AI-driven sustainability solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground">
                  To democratize sustainability for India's micro, small, and medium enterprises through 
                  cutting-edge AI technology. We believe every business, regardless of size, should have 
                  access to tools that help them build a greener future while improving their financial health.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Sustainability</h3>
                          <p className="text-sm text-muted-foreground">
                            Making green practices accessible and profitable for all businesses
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                          <Target className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
                          <p className="text-sm text-muted-foreground">
                            Leveraging AI to simplify complex environmental compliance
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 flex items-center justify-center">
                  <Users className="h-32 w-32 text-primary/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-accent/5">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Environmental Impact</h3>
                  <p className="text-muted-foreground">
                    Every feature we build considers its environmental impact and contribution to a sustainable future
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Inclusivity</h3>
                  <p className="text-muted-foreground">
                    Technology should be accessible to businesses of all sizes, from small traders to large manufacturers
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously push boundaries to create solutions that didn't exist before
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Built for India, by India
              </h2>
              <p className="text-lg text-muted-foreground">
                Our team combines deep expertise in AI, sustainability, and the unique challenges 
                faced by Indian MSMEs to create solutions that truly work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">5+ Years</h3>
                  <p className="text-muted-foreground">AI & Sustainability Research</p>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-12 w-12 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">1000+</h3>
                  <p className="text-muted-foreground">MSMEs Served</p>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-12 w-12 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">10x</h3>
                  <p className="text-muted-foreground">Faster ESG Compliance</p>
                </div>
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
                Join Our Mission
              </h2>
              <p className="text-lg text-muted-foreground">
                Be part of the sustainability revolution transforming Indian businesses
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="/auth">
                  Get Started Today
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/careers">View Careers</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;