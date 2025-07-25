import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Heart,
  ArrowRight
} from "lucide-react";

interface FooterProps {
  currentLanguage: string;
}

const Footer = ({ currentLanguage }: FooterProps) => {
  const content = {
    en: {
      tagline: "Empowering India's 63 Million MSMEs",
      description: "From Carbon to Credit – AI for India's green future",
      cta: {
        title: "Ready to Go Green?",
        subtitle: "Join thousands of MSMEs building a sustainable future",
        button: "Start Your Journey"
      },
      links: {
        product: {
          title: "Product",
          items: ["Features", "How it Works", "Pricing", "API Documentation", "Mobile App"]
        },
        company: {
          title: "Company", 
          items: ["About Us", "Careers", "Press", "Partners", "Blog"]
        },
        support: {
          title: "Support",
          items: ["Help Center", "Contact", "Privacy Policy", "Terms of Service", "Security"]
        },
        solutions: {
          title: "Solutions",
          items: ["For Traders", "For Manufacturers", "Enterprise", "Government", "Recyclers"]
        }
      },
      contact: {
        title: "Get in Touch",
        email: "hello@biocog.ai",
        phone: "+91 98765 43210",
        address: "Bangalore, Karnataka, India"
      },
      certifications: ["ISO 27001", "SOC 2", "GDPR Compliant", "RBI Approved"],
      copyright: "Built with ❤️ for India's MSMEs"
    },
    hi: {
      tagline: "भारत के 6.3 करोड़ MSMEs को सशक्त बनाना",
      description: "कार्बन से क्रेडिट तक – भारत के हरित भविष्य के लिए AI",
      cta: {
        title: "हरित बनने के लिए तैयार हैं?",
        subtitle: "हजारों MSMEs के साथ जुड़ें जो एक टिकाऊ भविष्य बना रहे हैं",
        button: "अपनी यात्रा शुरू करें"
      },
      links: {
        product: {
          title: "उत्पाद",
          items: ["सुविधाएं", "यह कैसे काम करता है", "मूल्य निर्धारण", "API डॉक्यूमेंटेशन", "मोबाइल ऐप"]
        },
        company: {
          title: "कंपनी",
          items: ["हमारे बारे में", "करियर", "प्रेस", "पार्टनर्स", "ब्लॉग"]
        },
        support: {
          title: "समर्थन",
          items: ["सहायता केंद्र", "संपर्क", "गोपनीयता नीति", "सेवा की शर्तें", "सुरक्षा"]
        },
        solutions: {
          title: "समाधान",
          items: ["व्यापारियों के लिए", "निर्माताओं के लिए", "एंटरप्राइज़", "सरकार", "रीसाइक्लर"]
        }
      },
      contact: {
        title: "संपर्क में रहें",
        email: "hello@biocog.ai",
        phone: "+91 98765 43210",
        address: "बैंगलोर, कर्नाटक, भारत"
      },
      certifications: ["ISO 27001", "SOC 2", "GDPR अनुपालित", "RBI अनुमोदित"],
      copyright: "भारत के MSMEs के लिए ❤️ के साथ निर्मित"
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <footer className="bg-secondary-dark text-secondary-foreground">
      {/* CTA Section */}
      <div className="border-b border-border/20">
        <div className="container px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {currentContent.cta.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {currentContent.cta.subtitle}
              </p>
            </div>
            <Button variant="hero" size="xl" className="group">
              {currentContent.cta.button}
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/f1eac384-0cb5-42a5-9e59-cfb84d48e1ef.png" 
                alt="Biocog Logo" 
                className="h-12 w-auto"
              />
              <div>
                <p className="text-lg font-semibold text-foreground mb-2">
                  {currentContent.tagline}
                </p>
                <p className="text-muted-foreground">
                  {currentContent.description}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">{currentContent.contact.title}</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${currentContent.contact.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {currentContent.contact.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href={`tel:${currentContent.contact.phone}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {currentContent.contact.phone}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-muted-foreground">
                    {currentContent.contact.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid md:grid-cols-4 gap-8">
            {Object.entries(currentContent.links).map(([key, section]) => (
              <div key={key} className="space-y-4">
                <h4 className="font-semibold text-foreground">{section.title}</h4>
                <ul className="space-y-3">
                  {section.items.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border/20">
        <div className="container px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-6">
              {currentContent.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{cert}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 Biocog.</span>
              <span>{currentContent.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;