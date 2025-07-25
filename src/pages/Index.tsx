import { useState } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import MobileFirst from "@/components/sections/MobileFirst";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />
      <main>
        <Hero currentLanguage={currentLanguage} />
        <Features currentLanguage={currentLanguage} />
        <HowItWorks currentLanguage={currentLanguage} />
        <MobileFirst currentLanguage={currentLanguage} />
        <Pricing currentLanguage={currentLanguage} />
      </main>
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Index;
