import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Leaf, TrendingUp } from "lucide-react";

interface HeroProps {
  currentLanguage: string;
}

const Hero = ({ currentLanguage }: HeroProps) => {
  const content = {
    en: {
      tagline: "Empowering MSMEs with AI for a Greener, Smarter Tomorrow",
      subtitle: "India's OS for green MSMEs with AI and deeptech",
      description: "Transform your business with AI-powered carbon tracking, financial literacy, and e-waste management. Built specifically for Indian traders and manufacturers.",
      cta: "Start Your Green Journey",
      tryDemo: "Try Demo",
      features: ["CO₂ Tracking", "Financial AI", "E-Waste Management", "ESG Reports"]
    },
    hi: {
      tagline: "आपका सपना, हमारी जिम्मेदारी — compliance से लेकर carbon तक AI के साथ",
      subtitle: "AI और डीपटेक के साथ भारत का हरित MSME OS",
      description: "AI-संचालित कार्बन ट्रैकिंग, वित्तीय साक्षरता और ई-वेस्ट प्रबंधन के साथ अपने व्यवसाय को बदलें। भारतीय व्यापारियों और निर्माताओं के लिए विशेष रूप से बनाया गया।",
      cta: "अपनी हरित यात्रा शुरू करें",
      tryDemo: "डेमो आज़माएं",
      features: ["CO₂ ट्रैकिंग", "वित्तीय AI", "ई-वेस्ट प्रबंधन", "ESG रिपोर्ट"]
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-success/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-warning/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Biocog
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground max-w-3xl mx-auto">
              {currentContent.tagline}
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {currentContent.description}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {currentContent.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-accent/50 px-4 py-2 rounded-full border border-border">
                {index === 0 && <Leaf className="h-4 w-4 text-success" />}
                {index === 1 && <TrendingUp className="h-4 w-4 text-primary" />}
                {index === 2 && <Shield className="h-4 w-4 text-warning" />}
                {index === 3 && <Zap className="h-4 w-4 text-primary" />}
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/auth">
                {currentContent.cta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/voice-demo">{currentContent.tryDemo}</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">Trusted by MSMEs across India</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium">BEE Certified</div>
              <div className="text-sm font-medium">ISO 14064 Compliant</div>
              <div className="text-sm font-medium">RBI Approved</div>
              <div className="text-sm font-medium">SIDBI Partner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;