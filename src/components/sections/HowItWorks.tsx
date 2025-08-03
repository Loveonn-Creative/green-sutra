import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Upload, 
  Brain, 
  FileOutput, 
  ArrowDown,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Factory
} from "lucide-react";

interface HowItWorksProps {
  currentLanguage: string;
}

const HowItWorks = ({ currentLanguage }: HowItWorksProps) => {
  const content = {
    en: {
      title: "How Biocog Works",
      subtitle: "From invoice to impact in 3 simple steps",
      steps: [
        {
          number: "01",
          title: "Upload Your Invoices",
          description: "Take a photo or upload your business invoices. Our AI instantly reads and processes them in any format.",
          icon: Upload,
          details: ["Mobile camera scanning", "PDF & image support", "Multiple invoice batch upload", "Auto data extraction"]
        },
        {
          number: "02", 
          title: "AI Analyzes & Reports",
          description: "Our smart AI calculates CO₂ emissions, matches recyclers, and provides financial insights automatically.",
          icon: Brain,
          details: ["Real-time CO₂ calculation", "Smart recycler matching", "Financial health scoring", "Compliance checking"]
        },
        {
          number: "03",
          title: "Get Reports & Take Action", 
          description: "Download ESG reports, schedule e-waste pickup, access loans, and track your green progress.",
          icon: FileOutput,
          details: ["PDF & Excel reports", "Automated pickup booking", "Loan pre-approvals", "Progress tracking"]
        }
      ],
      demo: {
        title: "See It In Action",
        subtitle: "Watch how MSMEs transform their business with Biocog",
        cta: "Request Demo"
      },
      onboarding: {
        title: "Smart Onboarding",
        subtitle: "Choose your business type for personalized experience",
        types: [
          {
            title: "I'm a Trader",
            description: "Buy, sell, distribute products",
            features: ["Invoice tracking", "Supplier analysis", "Trade compliance"]
          },
          {
            title: "I'm a Manufacturer", 
            description: "Produce, create, manufacture goods",
            features: ["Production tracking", "Waste monitoring", "Energy analysis"]
          }
        ]
      }
    },
    hi: {
      title: "Biocog कैसे काम करता है",
      subtitle: "3 सरल चरणों में चालान से प्रभाव तक",
      steps: [
        {
          number: "01",
          title: "अपने चालान अपलोड करें",
          description: "अपने व्यावसायिक चालानों की फोटो लें या अपलोड करें। हमारा AI तुरंत उन्हें किसी भी प्रारूप में पढ़ता और प्रोसेस करता है।",
          icon: Upload,
          details: ["मोबाइल कैमरा स्कैनिंग", "PDF और इमेज समर्थन", "एकाधिक चालान बैच अपलोड", "स्वचालित डेटा निष्कर्षण"]
        },
        {
          number: "02",
          title: "AI विश्लेषण और रिपोर्ट",
          description: "हमारा स्मार्ट AI स्वचालित रूप से CO₂ उत्सर्जन की गणना करता है, रीसाइक्लर मैच करता है, और वित्तीय अंतर्दृष्टि प्रदान करता है।",
          icon: Brain,
          details: ["रीयल-टाइम CO₂ गणना", "स्मार्ट रीसाइक्लर मैचिंग", "वित्तीय स्वास्थ्य स्कोरिंग", "अनुपालन जांच"]
        },
        {
          number: "03",
          title: "रिपोर्ट प्राप्त करें और कार्य करें",
          description: "ESG रिपोर्ट डाउनलोड करें, ई-वेस्ट पिकअप शेड्यूल करें, ऋण का उपयोग करें, और अपनी हरित प्रगति को ट्रैक करें।",
          icon: FileOutput,
          details: ["PDF और Excel रिपोर्ट", "स्वचालित पिकअप बुकिंग", "ऋण पूर्व-अनुमोदन", "प्रगति ट्रैकिंग"]
        }
      ],
      demo: {
        title: "इसे कार्य में देखें",
        subtitle: "देखें कि कैसे MSMEs Biocog के साथ अपने व्यवसाय को बदलते हैं",
        cta: "डेमो का अनुरोध करें"
      },
      onboarding: {
        title: "स्मार्ट ऑनबोर्डिंग",
        subtitle: "व्यक्तिगत अनुभव के लिए अपना व्यवसाय प्रकार चुनें",
        types: [
          {
            title: "मैं एक व्यापारी हूं",
            description: "उत्पाद खरीदें, बेचें, वितरित करें",
            features: ["चालान ट्रैकिंग", "आपूर्तिकर्ता विश्लेषण", "व्यापार अनुपालन"]
          },
          {
            title: "मैं एक निर्माता हूं",
            description: "उत्पादन, निर्माण, माल बनाएं",
            features: ["उत्पादन ट्रैकिंग", "अपशिष्ट निगरानी", "ऊर्जा विश्लेषण"]
          }
        ]
      }
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container px-4">
        {/* Main How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {currentContent.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-12">
          {currentContent.steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === currentContent.steps.length - 1;
            
            return (
              <div key={index} className="relative">
                <Card className="p-8 bg-card border-border hover:shadow-large transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {step.number}
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-32 h-32 bg-gradient-brand rounded-full flex items-center justify-center shadow-glow">
                        <IconComponent className="h-16 w-16 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Arrow between steps */}
                {!isLast && (
                  <div className="flex justify-center my-8">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center border-2 border-border">
                      <ArrowDown className="h-6 w-6 text-accent-foreground" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Smart Onboarding Section */}
        <div className="mt-20 pt-20 border-t border-border bg-gradient-to-br from-nature-primary/5 via-background to-nature-accent/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Enhanced background elements */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
          <div className="absolute top-10 right-10 w-20 h-20 bg-nature-accent/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-nature-primary/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {currentContent.onboarding.title}
              </h3>
              <p className="text-lg text-muted-foreground">
                {currentContent.onboarding.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {currentContent.onboarding.types.map((type, index) => (
                <Card key={index} className="p-8 bg-background/90 backdrop-blur-sm border-nature-primary/30 hover:shadow-nature transition-all duration-300 group cursor-pointer hover:border-nature-primary/60 hover:bg-gradient-to-br hover:from-nature-primary/5 hover:to-nature-accent/5">
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-nature-primary to-nature-accent rounded-full flex items-center justify-center mb-4 shadow-soft group-hover:shadow-nature transition-all duration-300">
                      {index === 0 ? (
                        <BarChart3 className="h-8 w-8 text-primary-foreground" />
                      ) : (
                        <Factory className="h-8 w-8 text-primary-foreground" />
                      )}
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">
                      {type.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {type.description}
                    </p>
                    <ul className="space-y-3">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-nature-primary group-hover:to-nature-accent group-hover:text-primary-foreground transition-all duration-300 border-nature-primary/40 hover:border-nature-primary group-hover:border-transparent"
                      asChild
                    >
                      <Link to={index === 0 ? "/onboarding-trader" : "/onboarding-manufacturer"}>
                        Choose This Path
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Demo CTA */}
        <div className="mt-16 text-center">
          <Card className="p-12 bg-gradient-brand border-border shadow-glow">
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                {currentContent.demo.title}
              </h3>
              <p className="text-lg text-primary-foreground/80">
                {currentContent.demo.subtitle}
              </p>
              <Button 
                variant="secondary" 
                size="xl" 
                className="bg-background text-foreground hover:bg-background/90 hover:shadow-soft transition-all duration-300"
                asChild
              >
                <Link to="/demo">
                  {currentContent.demo.cta}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;