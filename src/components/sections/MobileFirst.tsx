import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Wifi,
  Volume2,
  Languages,
  Zap,
  ArrowRight
} from "lucide-react";

interface MobileFirstProps {
  currentLanguage: string;
}

const MobileFirst = ({ currentLanguage }: MobileFirstProps) => {
  const content = {
    en: {
      title: "Built for Bharat",
      subtitle: "Mobile-first design for Tier 2/3 cities with real India in mind",
      features: [
        {
          title: "Works Offline",
          description: "Scans invoices and queues sync when you're back online. No internet? No problem.",
          icon: Wifi,
          stat: "Patchy networks supported"
        },
        {
          title: "Voice Commands in Hindi",
          description: "Ask 'Kitna carbon hua?' and get instant answers. JioPhone-style voice for everyone.",
          icon: Volume2,
          stat: "5+ Indian languages"
        },
        {
          title: "Large Touch Buttons",
          description: "Designed for all ages with clear, large buttons that work with any touch sensitivity.",
          icon: Smartphone,
          stat: "Senior-friendly UI"
        },
        {
          title: "Zero Training Needed",
          description: "First invoice scan auto-detects your industry. AI learns your business without setup.",
          icon: Zap,
          stat: "Works instantly"
        }
      ],
      demo: {
        title: "Experience Mobile-First AI",
        description: "Try our voice commands: Say 'Show my carbon footprint' in any language",
        cta: "Try Voice Demo"
      },
      stats: [
        { label: "Offline Mode", value: "100%" },
        { label: "Voice Accuracy", value: "95%" },
        { label: "Load Time", value: "<2s" },
        { label: "Battery Usage", value: "Low" }
      ]
    },
    hi: {
      title: "भारत के लिए बनाया गया",
      subtitle: "वास्तविक भारत को ध्यान में रखते हुए टियर 2/3 शहरों के लिए मोबाइल-फर्स्ट डिज़ाइन",
      features: [
        {
          title: "ऑफलाइन काम करता है",
          description: "चालान स्कैन करता है और जब आप वापस ऑनलाइन होते हैं तो सिंक को क्यू करता है। इंटरनेट नहीं? कोई समस्या नहीं।",
          icon: Wifi,
          stat: "कमजोर नेटवर्क समर्थित"
        },
        {
          title: "हिंदी में वॉयस कमांड",
          description: "'कितना कार्बन हुआ?' पूछें और तुरंत उत्तर पाएं। सभी के लिए JioPhone-स्टाइल वॉयस।",
          icon: Volume2,
          stat: "5+ भारतीय भाषाएं"
        },
        {
          title: "बड़े टच बटन",
          description: "सभी उम्र के लिए स्पष्ट, बड़े बटन के साथ डिज़ाइन किया गया जो किसी भी टच संवेदनशीलता के साथ काम करता है।",
          icon: Smartphone,
          stat: "वरिष्ठ-अनुकूल UI"
        },
        {
          title: "कोई ट्रेनिंग की जरूरत नहीं",
          description: "पहला चालान स्कैन आपके उद्योग को स्वचालित रूप से पहचानता है। AI बिना सेटअप के आपका व्यवसाय सीखता है।",
          icon: Zap,
          stat: "तुरंत काम करता है"
        }
      ],
      demo: {
        title: "मोबाइल-फर्स्ट AI का अनुभव करें",
        description: "हमारे वॉयस कमांड आज़माएं: किसी भी भाषा में 'मेरा कार्बन फुटप्रिंट दिखाएं' कहें",
        cta: "वॉयस डेमो आज़माएं"
      },
      stats: [
        { label: "ऑफलाइन मोड", value: "100%" },
        { label: "वॉयस सटीकता", value: "95%" },
        { label: "लोड टाइम", value: "<2s" },
        { label: "बैटरी उपयोग", value: "कम" }
      ]
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {currentContent.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {currentContent.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 bg-card border-border hover:shadow-large transition-all duration-300 group">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="inline-block px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                      {feature.stat}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mb-16">
          <Card className="p-8 bg-card border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {currentContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Mobile Demo */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-gradient-brand border-border">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  {currentContent.demo.title}
                </h3>
                <p className="text-lg text-primary-foreground/80">
                  {currentContent.demo.description}
                </p>
                <Button variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90">
                  {currentContent.demo.cta}
                  <Volume2 className="h-5 w-5 ml-2" />
                </Button>
              </div>
              
              <div className="p-8 flex justify-center">
                <div className="relative">
                  {/* Phone mockup */}
                  <div className="w-64 h-96 bg-background rounded-3xl border-8 border-secondary-dark shadow-2xl overflow-hidden">
                    <div className="h-full bg-gradient-subtle p-6 flex flex-col justify-center items-center space-y-6">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse-glow">
                        <Volume2 className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-foreground">Listening...</p>
                        <p className="text-xs text-muted-foreground">"Kitna carbon hua?"</p>
                      </div>
                      <div className="w-full space-y-2">
                        <div className="h-2 bg-success/20 rounded-full overflow-hidden">
                          <div className="h-full bg-success rounded-full w-3/4 animate-pulse"></div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">Processing speech...</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating voice indicators */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-float"></div>
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-success/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MobileFirst;