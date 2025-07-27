import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Have questions? We're here to help you on your sustainability journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Contact Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input id="company" placeholder="Enter your company name" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What's this about?" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you..."
                        className="min-h-32"
                      />
                    </div>
                    
                    <Button variant="hero" size="lg" className="w-full">
                      Send Message
                      <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground">
                    Reach out to us through any of these channels
                  </p>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">Email</h3>
                          <p className="text-muted-foreground">hello@biocog.ai</p>
                          <p className="text-sm text-muted-foreground">
                            We typically respond within 24 hours
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                          <Phone className="h-6 w-6 text-success" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">Phone</h3>
                          <p className="text-muted-foreground">+91 98765 43210</p>
                          <p className="text-sm text-muted-foreground">
                            Monday to Friday, 9 AM to 6 PM IST
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">Office</h3>
                          <p className="text-muted-foreground">
                            Bangalore, Karnataka, India
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Visit by appointment only
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                          <Clock className="h-6 w-6 text-warning" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">Business Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 9:00 AM - 6:00 PM IST
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Saturday: 10:00 AM - 2:00 PM IST
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    How quickly can I get started?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    You can sign up and start tracking your carbon footprint within minutes. 
                    Our onboarding process is designed to get you up and running quickly.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Is there a free trial available?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! We offer a 14-day free trial with full access to all features. 
                    No credit card required to get started.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Do you provide training and support?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Absolutely! We offer comprehensive training materials, live demos, 
                    and dedicated support to help you succeed.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Can I integrate with existing systems?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, we offer API integrations and work with most common business 
                    software used by MSMEs in India.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;