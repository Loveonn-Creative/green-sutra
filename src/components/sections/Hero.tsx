import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Leaf, TrendingUp, Mic } from "lucide-react";
import VoiceInterface from "@/components/voice/VoiceInterface";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-nature-secondary/10 to-nature-accent/10">
      {/* Enhanced nature-inspired background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Enhanced floating elements with nature theme */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-nature opacity-20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-nature-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-nature-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-10 right-1/4 w-3 h-3 bg-nature-primary rounded-full animate-ping" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-nature-accent rounded-full animate-ping delay-500" />

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

          {/* Enhanced CTA buttons with nature styling */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Button variant="hero" size="xl" className="group bg-gradient-nature hover:shadow-nature transition-all duration-300" asChild>
              <Link to="/auth">
                {currentContent.cta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-nature-primary/40 hover:border-nature-primary hover:shadow-soft transition-all duration-300" asChild>
              <Link to="/voice-demo">{currentContent.tryDemo}</Link>
            </Button>
          </div>

          {/* Voice Interface Integration */}
          <div className="mt-8 p-4 bg-background/60 backdrop-blur-sm rounded-2xl border border-nature-primary/20 shadow-soft max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Mic className="h-4 w-4 text-nature-primary" />
              <span className="text-sm font-medium text-nature-primary">
                {currentLanguage === 'hi' ? 'आवाज़ से बात करें' : 'Voice Enabled'}
              </span>
            </div>
            <div className="scale-90">
              <VoiceInterface 
                language={currentLanguage}
                onLanguageChange={() => {}}
              />
            </div>
          </div>

          {/* Innovation showcase */}
          <div className="pt-12 border-t border-border/50">
            <div className="bg-accent/30 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">🚀 Next-Gen Climate Innovation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore cutting-edge carbon intelligence and breakthrough climate technologies
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/carbon-intelligence">
                  Explore CINCS →
                </Link>
              </Button>
            </div>
            
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