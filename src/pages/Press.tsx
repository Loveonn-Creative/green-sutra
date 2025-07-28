import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Download } from "lucide-react";

const Press = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const pressReleases = [
    {
      title: "Biocog Raises $5M Series A to Scale AI-Powered Sustainability Platform",
      date: "January 15, 2024",
      excerpt: "Leading investors back Biocog's mission to empower 63 million Indian MSMEs with carbon tracking and green credit solutions."
    },
    {
      title: "Partnership with Government of Karnataka for MSME Sustainability",
      date: "December 8, 2023",
      excerpt: "Biocog partners with Karnataka government to provide sustainability tracking for state's MSME sector."
    },
    {
      title: "Launch of AI-Powered Invoice Carbon Calculator",
      date: "November 22, 2023",
      excerpt: "Revolutionary AI technology enables instant carbon footprint calculation from business invoices."
    }
  ];

  const mediaKit = [
    { name: "Company Logo Pack", type: "ZIP", size: "2.3 MB" },
    { name: "Product Screenshots", type: "ZIP", size: "15.7 MB" },
    { name: "Executive Photos", type: "ZIP", size: "8.9 MB" },
    { name: "Company Fact Sheet", type: "PDF", size: "1.2 MB" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Latest news, press releases, and media resources about Biocog's mission to empower 
              sustainable business practices across India.
            </p>
          </div>

          {/* Press Releases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{release.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {release.date}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                    <Button variant="outline" size="sm">
                      Read Full Release
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Media Kit</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mediaKit.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.type} • {item.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Company Facts */}
          <div className="bg-secondary/50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Company at a Glance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Key Facts</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Founded: 2023</li>
                  <li>• Headquarters: Bangalore, India</li>
                  <li>• Target Market: 63M+ Indian MSMEs</li>
                  <li>• Focus: AI-powered sustainability</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Leadership</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• CEO: Available for interviews</li>
                  <li>• CTO: Technology insights</li>
                  <li>• Head of Sustainability: Industry expertise</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-muted-foreground mb-8">
              For interviews, statements, or additional information, please contact our media team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="mailto:press@biocog.ai">
                  Contact Press Team
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/contact?type=media">
                  Media Inquiry Form
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Press;