import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Bot, 
  Recycle, 
  FileText, 
  Camera, 
  TrendingUp,
  Shield,
  Users,
  ArrowRight
} from "lucide-react";

interface FeaturesProps {
  currentLanguage: string;
}

const Features = ({ currentLanguage }: FeaturesProps) => {
  const content = {
    en: {
      title: "Three Powerful Tools, One Platform",
      subtitle: "Everything your MSME needs for sustainable growth",
      modules: [
        {
          name: "ESG Carbon Tracker",
          description: "Upload invoices → auto CO₂ classification using AI → Generate ESG compliance reports",
          features: [
            "Smart invoice scanning with AI",
            "Automatic CO₂ emissions calculation", 
            "BEE & ISO 14064 compliant reports",
            "Real-time sustainability scoring"
          ],
          icon: Leaf,
          color: "success"
        },
        {
          name: "Biocog AI Assistant", 
          description: "Real-time AI chatbot guides on tax, loans, compliance with vernacular support",
          features: [
            "Multilingual AI support (5+ languages)",
            "Tax & compliance guidance",
            "Loan matching & pre-approval",
            "Financial literacy modules"
          ],
          icon: Bot,
          color: "primary"
        },
        {
          name: "ReCircle E-Waste Tool",
          description: "Submit device waste → smart match with local recycler → Pickup scheduling + incentives",
          features: [
            "Smart recycler matching",
            "Automated pickup scheduling", 
            "Carbon credit earnings",
            "Waste audit & reporting"
          ],
          icon: Recycle,
          color: "warning"
        }
      ],
      additional: [
        {
          title: "Mobile-First Design",
          description: "Built for Tier 2/3 cities with large touch-friendly buttons and offline support",
          icon: Users
        },
        {
          title: "Instant Reports",
          description: "Download ESG reports in PDF & Excel format within seconds",
          icon: FileText
        },
        {
          title: "Voice Commands",
          description: "Ask questions in Hindi, Bengali, Tamil and more via voice input",
          icon: Camera
        },
        {
          title: "Real-time Analytics",
          description: "Track your sustainability progress with live dashboards",
          icon: TrendingUp
        }
      ]
    },
    hi: {
      title: "तीन शक्तिशाली उपकरण, एक मंच",
      subtitle: "टिकाऊ विकास के लिए आपके MSME की हर जरूरत",
      modules: [
        {
          name: "ESG कार्बन ट्रैकर",
          description: "चालान अपलोड करें → AI के साथ स्वचालित CO₂ वर्गीकरण → ESG अनुपालन रिपोर्ट बनाएं",
          features: [
            "AI के साथ स्मार्ट चालान स्कैनिंग",
            "स्वचालित CO₂ उत्सर्जन गणना",
            "BEE और ISO 14064 अनुपालित रिपोर्ट",
            "रीयल-टाइम स्थिरता स्कोरिंग"
          ],
          icon: Leaf,
          color: "success"
        },
        {
          name: "Biocog AI सहायक",
          description: "रीयल-टाइम AI चैटबॉट कर, ऋण, अनुपालन पर मार्गदर्शन करता है",
          features: [
            "बहुभाषी AI समर्थन (5+ भाषाएं)",
            "कर और अनुपालन मार्गदर्शन",
            "ऋण मिलान और पूर्व-अनुमोदन",
            "वित्तीय साक्षरता मॉड्यूल"
          ],
          icon: Bot,
          color: "primary"
        },
        {
          name: "ReCircle ई-वेस्ट टूल",
          description: "डिवाइस वेस्ट जमा करें → स्थानीय रीसाइक्लर के साथ स्मार्ट मैच → पिकअप शेड्यूलिंग",
          features: [
            "स्मार्ट रीसाइक्लर मैचिंग",
            "स्वचालित पिकअप शेड्यूलिंग",
            "कार्बन क्रेडिट कमाई",
            "वेस्ट ऑडिट और रिपोर्टिंग"
          ],
          icon: Recycle,
          color: "warning"
        }
      ],
      additional: [
        {
          title: "मोबाइल-फर्स्ट डिज़ाइन",
          description: "टियर 2/3 शहरों के लिए बड़े टच-फ्रेंडली बटन और ऑफलाइन समर्थन के साथ बनाया गया",
          icon: Users
        },
        {
          title: "तत्काल रिपोर्ट",
          description: "सेकंडों में PDF और Excel फॉर्मेट में ESG रिपोर्ट डाउनलोड करें",
          icon: FileText
        },
        {
          title: "वॉयस कमांड",
          description: "हिंदी, बंगाली, तमिल और अधिक में वॉयस इनपुट के माध्यम से प्रश्न पूछें",
          icon: Camera
        },
        {
          title: "रीयल-टाइम एनालिटिक्स",
          description: "लाइव डैशबोर्ड के साथ अपनी स्थिरता प्रगति को ट्रैक करें",
          icon: TrendingUp
        }
      ]
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <section id="features" className="py-20 bg-gradient-subtle">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {currentContent.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Modules */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {currentContent.modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card key={index} className="p-8 bg-card border-border hover:shadow-large transition-all duration-300 group">
                <div className="text-center space-y-6">
                  <div className={`
                    w-16 h-16 mx-auto rounded-full flex items-center justify-center
                    ${module.color === 'success' ? 'bg-success/10' : ''}
                    ${module.color === 'primary' ? 'bg-primary/10' : ''}
                    ${module.color === 'warning' ? 'bg-warning/10' : ''}
                  `}>
                    <IconComponent className={`
                      h-8 w-8
                      ${module.color === 'success' ? 'text-success' : ''}
                      ${module.color === 'primary' ? 'text-primary' : ''}
                      ${module.color === 'warning' ? 'text-warning' : ''}
                    `} />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {module.name}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {module.description}
                    </p>
                  </div>

                  <ul className="space-y-3 text-left">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Shield className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentContent.additional.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 bg-card border-border hover:shadow-medium transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-accent rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;