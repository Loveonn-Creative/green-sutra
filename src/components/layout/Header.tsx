import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const Header = ({ currentLanguage, onLanguageChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/f1eac384-0cb5-42a5-9e59-cfb84d48e1ef.png" 
            alt="Biocog Logo" 
            className="h-8 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>

        {/* Desktop CTA & Language */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative group">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>{languages.find(l => l.code === currentLanguage)?.name}</span>
            </Button>
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-card border border-border rounded-lg shadow-large opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors",
                    currentLanguage === lang.code && "bg-accent text-accent-foreground"
                  )}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/auth">Sign In</a>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <a href="/auth">Get Started</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <nav className="space-y-3">
              <a href="#features" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="#how-it-works" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                How It Works
              </a>
              <a href="#pricing" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </a>
            </nav>
            <div className="pt-4 border-t border-border space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Language</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => onLanguageChange(lang.code)}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md border transition-colors",
                        currentLanguage === lang.code 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-background border-border hover:bg-accent"
                      )}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="mobile" className="w-full" asChild>
                  <a href="/auth">Sign In</a>
                </Button>
                <Button variant="hero" size="mobile" className="w-full" asChild>
                  <a href="/auth">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;