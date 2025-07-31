import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'sari' | 'suit';
type Language = 'en' | 'hi' | 'bn' | 'mr' | 'ta' | 'te';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome to Biocog',
    dashboard: 'Dashboard',
    esgReports: 'ESG Reports',
    carbonCredits: 'Carbon Credits',
    ewasteTracker: 'E-Waste Tracker',
    aiMandi: 'AI Mandi',
    profile: 'Profile',
    logout: 'Logout',
    trader: 'Trader',
    manufacturer: 'Manufacturer',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    companyName: 'Company Name',
    selectRole: 'Select Your Role',
    greenScore: 'Green CIBIL Score',
    carbonSaved: 'Carbon Saved',
    creditsEarned: 'Credits Earned',
    esgScore: 'ESG Score'
  },
  hi: {
    welcome: 'बायोकॉग में आपका स्वागत है',
    dashboard: 'डैशबोर्ड',
    esgReports: 'ईएसजी रिपोर्ट',
    carbonCredits: 'कार्बन क्रेडिट',
    ewasteTracker: 'ई-वेस्ट ट्रैकर',
    aiMandi: 'एआई मंडी',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    trader: 'व्यापारी',
    manufacturer: 'निर्माता',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    companyName: 'कंपनी का नाम',
    selectRole: 'अपनी भूमिका चुनें',
    greenScore: 'हरित सिबिल स्कोर',
    carbonSaved: 'कार्बन बचाया गया',
    creditsEarned: 'क्रेडिट अर्जित',
    esgScore: 'ईएसजी स्कोर'
  },
  bn: {
    welcome: 'বায়োকগে স্বাগতম',
    dashboard: 'ড্যাশবোর্ড',
    esgReports: 'ইএসজি রিপোর্ট',
    carbonCredits: 'কার্বন ক্রেডিট',
    ewasteTracker: 'ই-বর্জ্য ট্র্যাকার',
    aiMandi: 'এআই মন্ডি',
    profile: 'প্রোফাইল',
    logout: 'লগআউট',
    trader: 'ব্যবসায়ী',
    manufacturer: 'নির্মাতা',
    signIn: 'সাইন ইন',
    signUp: 'সাইন আপ',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    companyName: 'কোম্পানির নাম',
    selectRole: 'আপনার ভূমিকা নির্বাচন করুন',
    greenScore: 'গ্রিন সিবিল স্কোর',
    carbonSaved: 'কার্বন সংরক্ষিত',
    creditsEarned: 'ক্রেডিট অর্জিত',
    esgScore: 'ইএসজি স্কোর'
  },
  mr: {
    welcome: 'बायोकॉगमध्ये आपले स्वागत आहे',
    dashboard: 'डॅशबोर्ड',
    esgReports: 'ईएसजी अहवाल',
    carbonCredits: 'कार्बन क्रेडिट',
    ewasteTracker: 'ई-कचरा ट्रॅकर',
    aiMandi: 'एआय मंडी',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    trader: 'व्यापारी',
    manufacturer: 'निर्माता',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    companyName: 'कंपनीचे नाव',
    selectRole: 'तुमची भूमिका निवडा',
    greenScore: 'हरित सिबिल स्कोर',
    carbonSaved: 'कार्बन वाचवले',
    creditsEarned: 'क्रेडिट मिळवले',
    esgScore: 'ईएसजी स्कोर'
  },
  ta: {
    welcome: 'பயோகாக்கில் உங்களை வரவேற்கிறோம்',
    dashboard: 'டாஷ்போர்டு',
    esgReports: 'ESG அறிக்கைகள்',
    carbonCredits: 'கார்பன் கிரெடிட்ஸ்',
    ewasteTracker: 'மின்-கழிவு கண்காணிப்பாளர்',
    aiMandi: 'AI மண்டி',
    profile: 'சுயவிவரம்',
    logout: 'வெளியேறு',
    trader: 'வர்த்தகர்',
    manufacturer: 'உற்பத்தியாளர்',
    signIn: 'உள்நுழைய',
    signUp: 'பதிவு செய்ய',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    companyName: 'நிறுவனத்தின் பெயர்',
    selectRole: 'உங்கள் பாத்திரத்தை தேர்ந்தெடுக்கவும்',
    greenScore: 'பச்சை சிபில் மதிப்பெண்',
    carbonSaved: 'கார்பன் சேமிக்கப்பட்டது',
    creditsEarned: 'கிரெடிட்ஸ் பெறப்பட்டது',
    esgScore: 'ESG மதிப்பெண்'
  },
  te: {
    welcome: 'బయోకాగ్‌లో మిమ్మల్ని స్వాగతిస్తున్నాము',
    dashboard: 'డ్యాష్‌బోర్డ్',
    esgReports: 'ESG నివేదికలు',
    carbonCredits: 'కార్బన్ క్రెడిట్స్',
    ewasteTracker: 'ఇ-వేస్ట్ ట్రాకర్',
    aiMandi: 'AI మండి',
    profile: 'ప్రొఫైల్',
    logout: 'లాగ్అవుట్',
    trader: 'వ్యాపారి',
    manufacturer: 'తయారీదారు',
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    companyName: 'కంపెనీ పేరు',
    selectRole: 'మీ పాత్రను ఎంచుకోండి',
    greenScore: 'గ్రీన్ సిబిల్ స్కోర్',
    carbonSaved: 'కార్బన్ సేవ్ చేయబడింది',
    creditsEarned: 'క్రెడిట్స్ సంపాదించబడ్డాయి',
    esgScore: 'ESG స్కోర్'
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('suit');
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load theme and language from localStorage
    const savedTheme = localStorage.getItem('biocog-theme') as Theme;
    const savedLanguage = localStorage.getItem('biocog-language') as Language;
    
    if (savedTheme) setThemeState(savedTheme);
    if (savedLanguage) setLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    // Apply theme classes to document body
    document.body.className = theme === 'sari' 
      ? 'theme-sari bg-gradient-subtle' 
      : 'theme-suit bg-background';
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('biocog-theme', newTheme);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('biocog-language', newLanguage);
  };

  const value = {
    theme,
    language,
    setTheme,
    setLanguage,
    translations: translations[language] || translations.en,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};