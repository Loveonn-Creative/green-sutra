import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, BookOpen, Phone, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { useState } from "react";

const HelpCenter = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const content = {
    en: {
      title: "Help Center",
      subtitle: "Get help with Biocog's AI-powered sustainability tools",
      search: "Search for help...",
      categories: {
        getting_started: {
          title: "Getting Started",
          description: "Learn the basics of using Biocog",
          articles: [
            "How to scan your first invoice",
            "Setting up your MSME profile",
            "Understanding carbon footprint reports",
            "Getting started with e-waste recycling"
          ]
        },
        ai_assistant: {
          title: "Biocog AI Assistant",
          description: "Master our vernacular AI chatbot",
          articles: [
            "Voice commands in Hindi",
            "Financial literacy guidance",
            "Tax compliance help",
            "Loan application assistance"
          ]
        },
        carbon_tracking: {
          title: "ESG Carbon Tracker",
          description: "Track and manage your carbon emissions",
          articles: [
            "Invoice scanning best practices",
            "Understanding emission categories",
            "Generating ESG reports",
            "Carbon credit opportunities"
          ]
        },
        ewaste: {
          title: "ReCircle E-Waste",
          description: "Manage electronic waste responsibly",
          articles: [
            "Finding verified recyclers",
            "Scheduling pickups",
            "Tracking recycling incentives",
            "Compliance documentation"
          ]
        }
      },
      contact: {
        title: "Still need help?",
        description: "Our team is here to support your green journey",
        chat: "Start Live Chat",
        call: "Call Support",
        email: "Email Us"
      }
    },
    hi: {
      title: "सहायता केंद्र",
      subtitle: "Biocog के AI-संचालित स्थिरता उपकरणों के साथ सहायता प्राप्त करें",
      search: "सहायता खोजें...",
      categories: {
        getting_started: {
          title: "शुरुआत करना",
          description: "Biocog का उपयोग करने की मूल बातें सीखें",
          articles: [
            "अपना पहला चालान कैसे स्कैन करें",
            "अपना MSME प्रोफाइल सेट करना",
            "कार्बन फुटप्रिंट रिपोर्ट समझना",
            "ई-वेस्ट रीसाइक्लिंग की शुरुआत"
          ]
        },
        ai_assistant: {
          title: "Biocog AI सहायक",
          description: "हमारे देशी AI चैटबॉट में महारत हासिल करें",
          articles: [
            "हिंदी में वॉयस कमांड",
            "वित्तीय साक्षरता मार्गदर्शन",
            "कर अनुपालन सहायता",
            "ऋण आवेदन सहायता"
          ]
        },
        carbon_tracking: {
          title: "ESG कार्बन ट्रैकर",
          description: "अपने कार्बन उत्सर्जन को ट्रैक और प्रबंधित करें",
          articles: [
            "चालान स्कैनिंग की सर्वोत्तम प्रथाएं",
            "उत्सर्जन श्रेणियों को समझना",
            "ESG रिपोर्ट जेनरेट करना",
            "कार्बन क्रेडिट के अवसर"
          ]
        },
        ewaste: {
          title: "ReCircle ई-वेस्ट",
          description: "इलेक्ट्रॉनिक कचरे को जिम्मेदारी से प्रबंधित करें",
          articles: [
            "सत्यापित रीसाइक्लर खोजना",
            "पिकअप शेड्यूल करना",
            "रीसाइक्लिंग प्रोत्साहन ट्रैक करना",
            "अनुपालन दस्तावेज"
          ]
        }
      },
      contact: {
        title: "अभी भी सहायता चाहिए?",
        description: "हमारी टीम आपकी हरित यात्रा का समर्थन करने के लिए यहां है",
        chat: "लाइव चैट शुरू करें",
        call: "सपोर्ट कॉल करें",
        email: "हमें ईमेल करें"
      }
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {currentContent.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {currentContent.subtitle}
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder={currentContent.search}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {Object.entries(currentContent.categories).map(([key, category]) => (
              <Card key={key} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>{category.title}</span>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, index) => (
                      <li key={index}>
                        <a href="#" className="text-primary hover:underline text-sm">
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support */}
          <Card className="bg-accent/50">
            <CardContent className="pt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {currentContent.contact.title}
                </h2>
                <p className="text-muted-foreground">
                  {currentContent.contact.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-14 flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>{currentContent.contact.chat}</span>
                </Button>
                <Button variant="outline" className="h-14 flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>{currentContent.contact.call}</span>
                </Button>
                <Button variant="outline" className="h-14 flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>{currentContent.contact.email}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default HelpCenter;