import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Globe, User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  showDashboardNav?: boolean;
}

const Header = ({ currentLanguage, onLanguageChange, showDashboardNav = false }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/f1eac384-0cb5-42a5-9e59-cfb84d48e1ef.png" 
            alt="Biocog Logo" 
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {showDashboardNav && user ? (
            // Dashboard Navigation
            <>
              <Link to={profile?.role === 'trader' ? '/trader-dashboard' : '/manufacturer-dashboard'} 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/esg-evaluation" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                ESG Evaluation
              </Link>
              <Link to="/ai-mandi" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                AI Mandi
              </Link>
              <Link to="/carbon-tracker" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Carbon Tracker
              </Link>
              <Link to="/ewaste-recycling" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                E-Waste
              </Link>
            </>
          ) : (
            // Public Navigation
            <>
              <a href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border z-50">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={cn(
                    "cursor-pointer",
                    currentLanguage === lang.code && "bg-accent"
                  )}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Guest Access Button */}
          <Button variant="outline" size="sm" asChild>
            <Link to="/ai-mandi">Guest Access</Link>
          </Button>

          {/* User Menu or Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border z-50 w-56">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {profile?.contact_person || profile?.company_name || user.email}
                </div>
                <div className="px-2 py-1 text-xs text-muted-foreground">
                  {profile?.role && `${profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}`}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(profile?.role === 'trader' ? '/trader-dashboard' : '/manufacturer-dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/account-settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border z-50">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={cn(
                    "cursor-pointer",
                    currentLanguage === lang.code && "bg-accent"
                  )}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile User Menu or Menu Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border z-50 w-64">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {profile?.contact_person || profile?.company_name || user.email}
                </div>
                <div className="px-2 py-1 text-xs text-muted-foreground mb-2">
                  {profile?.role && `${profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}`}
                </div>
                <DropdownMenuSeparator />
                
                {/* Mobile Dashboard Navigation */}
                <DropdownMenuItem onClick={() => navigate(profile?.role === 'trader' ? '/trader-dashboard' : '/manufacturer-dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/esg-evaluation')}>
                  ESG Evaluation
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/ai-mandi')}>
                  AI Mandi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/carbon-tracker')}>
                  Carbon Tracker
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/ewaste-recycling')}>
                  E-Waste Recycling
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/account-settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-8 w-8 p-0"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu for non-authenticated users */}
      {isMobileMenuOpen && !user && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <nav className="space-y-3">
              <a href="/#features" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="/#how-it-works" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                How It Works
              </a>
              <a href="/#pricing" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </a>
              <Link to="/about" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/blog" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </nav>
            <div className="pt-4 border-t border-border space-y-3">
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/auth">Get Started</Link>
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