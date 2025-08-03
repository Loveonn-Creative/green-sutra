import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Languages,
  Zap,
  Brain,
  Globe
} from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface VoiceInterfaceProps {
  onLanguageChange?: (language: string) => void;
  currentLanguage?: string;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ 
  onLanguageChange, 
  currentLanguage = 'en' 
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [volume, setVolume] = useState(1);

  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bho', name: 'भोजपुरी', flag: '🇮🇳' }
  ];

  const startListening = async () => {
    try {
      setIsListening(true);
      setTranscript('');
      
      // Mock voice recognition - in real implementation, would use Web Speech API or OpenAI
      setTimeout(() => {
        const mockTranscripts = {
          en: "Show me carbon tracking solutions for my business",
          hi: "मेरे व्यवसाय के लिए कार्बन ट्रैकिंग समाधान दिखाएं",
          ta: "எனது வணிகத்திற்கான கார்பன் கண்காணிப்பு தீர்வுகளைக் காட்டு",
          bn: "আমার ব্যবসার জন্য কার্বন ট্র্যাকিং সমাধান দেখান",
          te: "నా వ్యాపారం కోసం కార్బన్ ట్రాకింగ్ పరిష్కారాలను చూపించండి",
          bho: "हमार व्यापार खातिर कार्बन ट्रैकिंग के समाधान देखावs"
        };
        
        setTranscript(mockTranscripts[currentLanguage as keyof typeof mockTranscripts] || mockTranscripts.en);
        setIsListening(false);
        handleResponse();
      }, 2000);
      
    } catch (error) {
      setIsListening(false);
      toast({
        title: "Voice Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const handleResponse = async () => {
    setIsSpeaking(true);
    
    // Mock AI response generation
    setTimeout(() => {
      const mockResponses = {
        en: "I can help you track carbon emissions for your MSME. Our Smart Carbon Ledger uses AI to monitor your energy consumption, fuel usage, and waste generation in real-time. Would you like me to show you the ESG evaluation page or carbon intelligence modules?",
        hi: "मैं आपके MSME के लिए कार्बन उत्सर्जन को ट्रैक करने में मदद कर सकता हूं। हमारा स्मार्ट कार्बन लेजर AI का उपयोग करके आपकी ऊर्जा खपत, ईंधन उपयोग और अपशिष्ट उत्पादन की रीयल-टाइम निगरानी करता है।",
        ta: "உங்கள் MSME க்கான கார்பன் உமிழ்வுகளைக் கண்காணிக்க நான் உதவ முடியும். எங்கள் ஸ்மார்ட் கார்பன் லெட்ஜர் AI ஐப் பயன்படுத்தி உங்கள் ஆற்றல் நுகர்வு, எரிபொருள் பயன்பாடு மற்றும் கழிவு உற்பத்தியை நிகழ்நேரத்தில் கண்காணிக்கிறது।",
        bn: "আমি আপনার MSME এর জন্য কার্বন নির্গমন ট্র্যাক করতে সাহায্য করতে পারি। আমাদের স্মার্ট কার্বন লেজার AI ব্যবহার করে আপনার শক্তি খরচ, জ্বালানি ব্যবহার এবং বর্জ্য উৎপাদন রিয়েল-টাইমে মনিটর করে।",
        te: "మీ MSME కోసం కార్బన్ ఉద్గారాలను ట్రాక్ చేయడంలో నేను సహాయం చేయగలను। మా స్మార్ట్ కార్బన్ లెడ్జర్ AI ని ఉపయోగించి మీ శక్తి వినియోగం, ఇంధన వినియోగం మరియు వ్యర్థాల ఉత్పత్తిని రియల్ టైమ్‌లో పర్యవేక్షిస్తుంది।",
        bho: "हम आपके MSME खातिर कार्बन उत्सर्जन के ट्रैकिंग में मदद कर सकत बानी। हमार स्मार्ट कार्बन लेजर AI के इस्तेमाल से आपके ऊर्जा खपत, ईंधन के उपयोग आ कचरा के उत्पादन के रियल-टाइम निगरानी करेला।"
      };
      
      setResponse(mockResponses[currentLanguage as keyof typeof mockResponses] || mockResponses.en);
      setIsSpeaking(false);
      
      toast({
        title: "AI Response Ready",
        description: "Voice response generated in " + supportedLanguages.find(l => l.code === currentLanguage)?.name,
      });
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="h-5 w-5" />
            <span>Voice Language</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {supportedLanguages.map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => onLanguageChange?.(lang.code)}
                className="flex items-center space-x-2"
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-xs">{lang.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-accent/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <Globe className="h-4 w-4 inline mr-1" />
              Now supporting 6 Indian languages with AI-powered voice recognition
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Voice Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Voice Assistant</span>
            <Badge variant="outline">
              {supportedLanguages.find(l => l.code === currentLanguage)?.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Voice Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              onClick={isListening ? stopListening : startListening}
              disabled={isSpeaking}
              className="h-16 w-16 rounded-full"
            >
              {isListening ? (
                <LoadingSpinner size="md" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={toggleMute}
              className="h-16 w-16 rounded-full"
            >
              {volume === 0 ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Status Indicator */}
          <div className="text-center">
            {isListening && (
              <div className="flex items-center justify-center space-x-2 text-primary">
                <div className="animate-pulse">🎤</div>
                <span className="text-sm font-medium">Listening...</span>
              </div>
            )}
            
            {isSpeaking && (
              <div className="flex items-center justify-center space-x-2 text-success">
                <div className="animate-pulse">🔊</div>
                <span className="text-sm font-medium">AI Responding...</span>
              </div>
            )}
            
            {!isListening && !isSpeaking && (
              <div className="text-muted-foreground">
                <Zap className="h-4 w-4 inline mr-1" />
                <span className="text-sm">Ready to help</span>
              </div>
            )}
          </div>

          {/* Voice Transcript */}
          {transcript && (
            <div className="p-4 bg-accent/30 rounded-lg">
              <h4 className="text-sm font-medium mb-2">You said:</h4>
              <p className="text-sm">{transcript}</p>
            </div>
          )}

          {/* AI Response */}
          {response && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="text-sm font-medium mb-2 text-primary">AI Assistant:</h4>
              <p className="text-sm">{response}</p>
            </div>
          )}

          {/* Quick Commands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-accent/20 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Quick Commands:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• "Show me carbon solutions"</li>
                <li>• "Navigate to ESG evaluation"</li>
                <li>• "Explain carbon tracking"</li>
                <li>• "Calculate my emissions"</li>
              </ul>
            </div>
            
            <div className="p-3 bg-accent/20 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Available Pages:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Carbon Intelligence</li>
                <li>• ESG Evaluation</li>
                <li>• Voice Demo</li>
                <li>• Dashboard</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceInterface;