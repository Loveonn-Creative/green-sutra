import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, FileCheck, Globe } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { useState } from "react";

const Security = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const content = {
    en: {
      title: "Security & Privacy",
      subtitle: "Your data security is our top priority",
      intro: "At Biocog, we understand that MSMEs handle sensitive financial and operational data. Our security infrastructure is built to enterprise standards, ensuring your information remains protected while you focus on building a sustainable future.",
      certifications: [
        { name: "ISO 27001", status: "Certified", icon: Shield },
        { name: "SOC 2 Type II", status: "Compliant", icon: FileCheck },
        { name: "GDPR", status: "Compliant", icon: Globe },
        { name: "RBI Guidelines", status: "Approved", icon: Database }
      ],
      sections: {
        data_protection: {
          title: "Data Protection",
          description: "How we safeguard your information",
          features: [
            "256-bit AES encryption for data at rest",
            "TLS 1.3 encryption for data in transit",
            "Multi-factor authentication (MFA)",
            "Regular security audits and penetration testing",
            "Automated backup with 99.9% uptime guarantee"
          ]
        },
        privacy_controls: {
          title: "Privacy Controls", 
          description: "You control your data",
          features: [
            "Data minimization - we only collect what's necessary",
            "Right to access, modify, or delete your data",
            "Granular permission controls",
            "Anonymous usage analytics",
            "No data sharing without explicit consent"
          ]
        },
        compliance: {
          title: "Regulatory Compliance",
          description: "Meeting India's data protection standards",
          features: [
            "Digital Personal Data Protection Act (DPDP) 2023 ready",
            "Reserve Bank of India (RBI) guidelines compliant",
            "GST data handling as per CBIC norms",
            "Regular compliance audits",
            "Data localization in Indian data centers"
          ]
        },
        incident_response: {
          title: "Incident Response",
          description: "Rapid response to security events",
          features: [
            "24/7 security monitoring",
            "Automated threat detection",
            "Incident response within 1 hour",
            "Transparent breach notification",
            "Regular security updates and patches"
          ]
        }
      },
      trust_indicators: {
        title: "Why MSMEs Trust Biocog",
        points: [
          "Used by 10,000+ Indian MSMEs",
          "Zero data breaches since inception",
          "India-first security architecture",
          "Vernacular privacy notices",
          "MSME-specific data protection"
        ]
      }
    },
    hi: {
      title: "सुरक्षा और गोपनीयता",
      subtitle: "आपकी डेटा सुरक्षा हमारी सर्वोच्च प्राथमिकता है",
      intro: "Biocog में, हम समझते हैं कि MSMEs संवेदनशील वित्तीय और परिचालन डेटा संभालते हैं। हमारी सुरक्षा अवसंरचना एंटरप्राइज़ मानकों के लिए बनाई गई है, यह सुनिश्चित करते हुए कि आपकी जानकारी सुरक्षित रहे जबकि आप एक टिकाऊ भविष्य बनाने पर ध्यान केंद्रित करते हैं।",
      certifications: [
        { name: "ISO 27001", status: "प्रमाणित", icon: Shield },
        { name: "SOC 2 Type II", status: "अनुपालित", icon: FileCheck },
        { name: "GDPR", status: "अनुपालित", icon: Globe },
        { name: "RBI दिशानिर्देश", status: "अनुमोदित", icon: Database }
      ],
      sections: {
        data_protection: {
          title: "डेटा सुरक्षा",
          description: "हम आपकी जानकारी की सुरक्षा कैसे करते हैं",
          features: [
            "आराम में डेटा के लिए 256-बिट AES एन्क्रिप्शन",
            "ट्रांजिट में डेटा के लिए TLS 1.3 एन्क्रिप्शन",
            "मल्टी-फैक्टर प्रमाणीकरण (MFA)",
            "नियमित सुरक्षा ऑडिट और पेनेट्रेशन टेस्टिंग",
            "99.9% अपटाइम गारंटी के साथ स्वचालित बैकअप"
          ]
        },
        privacy_controls: {
          title: "गोपनीयता नियंत्रण",
          description: "आप अपने डेटा को नियंत्रित करते हैं",
          features: [
            "डेटा न्यूनीकरण - हम केवल आवश्यक चीजों को एकत्र करते हैं",
            "अपने डेटा तक पहुंचने, संशोधित करने या हटाने का अधिकार",
            "विस्तृत अनुमति नियंत्रण",
            "गुमनाम उपयोग विश्लेषण",
            "स्पष्ट सहमति के बिना कोई डेटा साझाकरण नहीं"
          ]
        },
        compliance: {
          title: "नियामक अनुपालन",
          description: "भारत के डेटा सुरक्षा मानकों को पूरा करना",
          features: [
            "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP) 2023 तैयार",
            "भारतीय रिज़र्व बैंक (RBI) दिशानिर्देशों का अनुपालन",
            "CBIC मानदंडों के अनुसार GST डेटा हैंडलिंग",
            "नियमित अनुपालन ऑडिट",
            "भारतीय डेटा केंद्रों में डेटा स्थानीयकरण"
          ]
        },
        incident_response: {
          title: "घटना प्रतिक्रिया",
          description: "सुरक्षा घटनाओं के लिए त्वरित प्रतिक्रिया",
          features: [
            "24/7 सुरक्षा निगरानी",
            "स्वचालित खतरा पहचान",
            "1 घंटे के भीतर घटना प्रतिक्रिया",
            "पारदर्शी उल्लंघन अधिसूचना",
            "नियमित सुरक्षा अपडेट और पैच"
          ]
        }
      },
      trust_indicators: {
        title: "MSMEs Biocog पर क्यों भरोसा करते हैं",
        points: [
          "10,000+ भारतीय MSMEs द्वारा उपयोग",
          "स्थापना के बाद से शून्य डेटा उल्लंघन",
          "भारत-प्रथम सुरक्षा आर्किटेक्चर",
          "देशी गोपनीयता सूचनाएं",
          "MSME-विशिष्ट डेटा सुरक्षा"
        ]
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {currentContent.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              {currentContent.subtitle}
            </p>
            <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {currentContent.intro}
            </p>
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <div className="grid md:grid-cols-4 gap-6">
              {currentContent.certifications.map((cert, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <cert.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{cert.name}</h3>
                    <Badge variant="secondary">{cert.status}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Security Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {Object.entries(currentContent.sections).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <span>{section.title}</span>
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <Card className="bg-accent/50">
            <CardContent className="pt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {currentContent.trust_indicators.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {currentContent.trust_indicators.points.map((point, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Security;