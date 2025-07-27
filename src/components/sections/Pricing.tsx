import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Star,
  ArrowRight,
  Zap,
  Crown,
  Rocket
} from "lucide-react";

interface PricingProps {
  currentLanguage: string;
}

const Pricing = ({ currentLanguage }: PricingProps) => {
  const content = {
    en: {
      title: "Choose Your Growth Plan",
      subtitle: "Start free, scale as you grow. No hidden fees, cancel anytime.",
      trial: {
        title: "Try Before You Commit",
        description: "Test all features with 3 invoice scans and 10 AI conversations",
        cta: "Start Free Trial"
      },
      plans: [
        {
          name: "Starter",
          price: "₹999",
          period: "/month",
          description: "Perfect for small traders and new businesses",
          icon: Zap,
          popular: false,
          features: [
            "50 invoice scans/month",
            "Basic CO₂ tracking",
            "WhatsApp support", 
            "PDF reports",
            "E-waste pickup booking",
            "Hindi + 1 language support"
          ],
          cta: "Start with Starter"
        },
        {
          name: "Growth",
          price: "₹2,499",
          period: "/month", 
          description: "Best for growing MSMEs with regular operations",
          icon: Star,
          popular: true,
          features: [
            "200 invoice scans/month",
            "Advanced AI analytics",
            "Priority phone support",
            "Excel + PDF reports", 
            "Loan pre-approvals",
            "All 5 language support",
            "Custom ESG scoring",
            "Recycler network access"
          ],
          cta: "Choose Growth"
        },
        {
          name: "Scale",
          price: "₹4,999", 
          period: "/month",
          description: "For established manufacturers and large traders",
          icon: Crown,
          popular: false,
          features: [
            "Unlimited invoice scans",
            "Predictive AI insights",
            "Dedicated account manager",
            "API access",
            "Custom integrations",
            "Multi-location support",
            "Carbon credit marketplace",
            "White-label options"
          ],
          cta: "Scale Up Now"
        }
      ],
      enterprise: {
        title: "Enterprise Solutions",
        description: "Custom solutions for large enterprises and government partnerships",
        features: ["Custom AI models", "On-premise deployment", "Dedicated infrastructure", "SLA guarantees"],
        cta: "Contact Sales"
      }
    },
    hi: {
      title: "अपना विकास योजना चुनें",
      subtitle: "मुफ्त शुरू करें, जैसे-जैसे आप बढ़ते हैं, स्केल करें। कोई छुपी फीस नहीं, कभी भी रद्द करें।",
      trial: {
        title: "प्रतिबद्धता से पहले आज़माएं",
        description: "3 चालान स्कैन और 10 AI बातचीत के साथ सभी सुविधाओं का परीक्षण करें",
        cta: "मुफ्त ट्रायल शुरू करें"
      },
      plans: [
        {
          name: "स्टार्टर",
          price: "₹999",
          period: "/माह",
          description: "छोटे व्यापारियों और नए व्यवसायों के लिए बिल्कुल सही",
          icon: Zap,
          popular: false,
          features: [
            "50 चालान स्कैन/माह",
            "बेसिक CO₂ ट्रैकिंग",
            "WhatsApp समर्थन",
            "PDF रिपोर्ट",
            "ई-वेस्ट पिकअप बुकिंग",
            "हिंदी + 1 भाषा समर्थन"
          ],
          cta: "स्टार्टर के साथ शुरू करें"
        },
        {
          name: "ग्रोथ",
          price: "₹2,499",
          period: "/माह",
          description: "नियमित संचालन के साथ बढ़ते MSMEs के लिए सर्वोत्तम",
          icon: Star,
          popular: true,
          features: [
            "200 चालान स्कैन/माह",
            "उन्नत AI एनालिटिक्स",
            "प्राथमिकता फोन समर्थन",
            "Excel + PDF रिपोर्ट",
            "ऋण पूर्व-अनुमोदन",
            "सभी 5 भाषा समर्थन",
            "कस्टम ESG स्कोरिंग",
            "रीसाइक्लर नेटवर्क एक्सेस"
          ],
          cta: "ग्रोथ चुनें"
        },
        {
          name: "स्केल",
          price: "₹4,999",
          period: "/माह",
          description: "स्थापित निर्माताओं और बड़े व्यापारियों के लिए",
          icon: Crown,
          popular: false,
          features: [
            "असीमित चालान स्कैन",
            "प्रेडिक्टिव AI इनसाइट्स",
            "समर्पित खाता प्रबंधक",
            "API एक्सेस",
            "कस्टम इंटीग्रेशन",
            "मल्टी-लोकेशन समर्थन",
            "कार्बन क्रेडिट मार्केटप्लेस",
            "व्हाइट-लेबल विकल्प"
          ],
          cta: "अभी स्केल करें"
        }
      ],
      enterprise: {
        title: "एंटरप्राइज़ समाधान",
        description: "बड़े उद्यमों और सरकारी साझेदारी के लिए कस्टम समाधान",
        features: ["कस्टम AI मॉडल", "ऑन-प्रिमाइसेस तैनाती", "समर्पित इंफ्रास्ट्रक्चर", "SLA गारंटी"],
        cta: "सेल्स से संपर्क करें"
      }
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {currentContent.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Trial Banner */}
        <div className="mb-12">
          <Card className="p-8 bg-gradient-success border-success/20 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-success-foreground">
                {currentContent.trial.title}
              </h3>
              <p className="text-success-foreground/80">
                {currentContent.trial.description}
              </p>
              <Button variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90" asChild>
                <Link to="/auth?mode=trial">
                  {currentContent.trial.cta}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentContent.plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card key={index} className={`
                relative p-8 border-border transition-all duration-300 hover:shadow-large
                ${plan.popular ? 'border-primary shadow-glow bg-primary/5' : 'bg-card'}
              `}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className={`
                      w-16 h-16 mx-auto rounded-full flex items-center justify-center
                      ${plan.popular ? 'bg-primary/20' : 'bg-accent'}
                    `}>
                      <IconComponent className={`
                        h-8 w-8 
                        ${plan.popular ? 'text-primary' : 'text-accent-foreground'}
                      `} />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <Link to={`/auth?plan=${plan.name.toLowerCase()}`}>
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Enterprise */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-brand border-border text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Rocket className="h-10 w-10 text-primary-foreground" />
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                  {currentContent.enterprise.title}
                </h3>
                <p className="text-lg text-primary-foreground/80 mb-6">
                  {currentContent.enterprise.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {currentContent.enterprise.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 justify-center">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                    <span className="text-sm text-primary-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="secondary" size="xl" className="bg-background text-foreground hover:bg-background/90" asChild>
                <Link to="/contact?inquiry=sales">
                  {currentContent.enterprise.cta}
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

export default Pricing;