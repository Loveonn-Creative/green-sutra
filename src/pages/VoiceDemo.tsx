import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Zap, Languages } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { useToast } from "@/hooks/use-toast";

const VoiceDemo = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [selectedVoiceLanguage, setSelectedVoiceLanguage] = useState("en");
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);
  const { toast } = useToast();

  const content = {
    en: {
      title: "Biocog AI Voice Assistant Demo",
      subtitle: "Experience our vernacular AI assistant for MSMEs",
      description: "Talk to our AI in English or Hindi about carbon tracking, financial guidance, or waste management.",
      voiceLanguage: "Voice Language",
      startListening: "Start Talking",
      stopListening: "Stop Talking",
      speaking: "AI is Speaking...",
      yourMessage: "Your Message",
      aiResponse: "AI Response",
      sampleQuestions: "Try asking:",
      questions: [
        "How do I calculate my carbon footprint?",
        "मुझे लोन की जानकारी चाहिए",
        "What are the tax benefits for going green?",
        "ई-वेस्ट रीसाइक्लिंग कैसे करें?",
        "Show me my ESG compliance report"
      ],
      features: [
        "Multi-language support (English & Hindi)",
        "Real-time speech recognition",
        "Context-aware responses",
        "Financial literacy guidance",
        "Carbon footprint insights"
      ],
      note: "Note: This is a demo version. The full version includes advanced AI with live data integration."
    },
    hi: {
      title: "Biocog AI वॉयस असिस्टेंट डेमो",
      subtitle: "MSMEs के लिए हमारे देशी AI असिस्टेंट का अनुभव करें",
      description: "कार्बन ट्रैकिंग, वित्तीय मार्गदर्शन, या अपशिष्ट प्रबंधन के बारे में हमारे AI से अंग्रेजी या हिंदी में बात करें।",
      voiceLanguage: "वॉयस भाषा",
      startListening: "बात करना शुरू करें",
      stopListening: "बात करना बंद करें",
      speaking: "AI बोल रहा है...",
      yourMessage: "आपका संदेश",
      aiResponse: "AI का जवाब",
      sampleQuestions: "पूछने की कोशिश करें:",
      questions: [
        "How do I calculate my carbon footprint?",
        "मुझे लोन की जानकारी चाहिए",
        "What are the tax benefits for going green?",
        "ई-वेस्ट रीसाइक्लिंग कैसे करें?",
        "Show me my ESG compliance report"
      ],
      features: [
        "बहु-भाषा समर्थन (अंग्रेजी और हिंदी)",
        "रियल-टाइम स्पीच रिकग्निशन",
        "संदर्भ-जागरूक प्रतिक्रियाएं",
        "वित्तीय साक्षरता मार्गदर्शन",
        "कार्बन फुटप्रिंट अंतर्दृष्टि"
      ],
      note: "नोट: यह एक डेमो संस्करण है। पूर्ण संस्करण में लाइव डेटा एकीकरण के साथ उन्नत AI शामिल है।"
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = selectedVoiceLanguage === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        handleAIResponse(speechResult);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [selectedVoiceLanguage]);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setResponse("");
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleAIResponse = (userInput: string) => {
    // Simulate AI processing
    setTimeout(() => {
      let aiResponse = "";
      
      // Simple pattern matching for demo
      const input = userInput.toLowerCase();
      
      if (input.includes("carbon") || input.includes("कार्बन")) {
        aiResponse = selectedVoiceLanguage === 'hi' 
          ? "आपका कार्बन फुटप्रिंट ट्रैक करने के लिए, बस अपने चालान अपलोड करें। हमारा AI आपके CO₂ उत्सर्जन की गणना करेगा और व्यक्तिगत सुझाव देगा।"
          : "To track your carbon footprint, simply upload your invoices. Our AI will calculate your CO₂ emissions and provide personalized recommendations.";
      } else if (input.includes("loan") || input.includes("लोन")) {
        aiResponse = selectedVoiceLanguage === 'hi' 
          ? "हमारा Biocog AI आपको MSME लोन के लिए सबसे अच्छे विकल्प खोजने में मदद कर सकता है। आपका GST टर्नओवर और कारोबारी प्रोफाइल के आधार पर व्यक्तिगत सुझाव मिलेंगे।"
          : "Our Biocog AI can help you find the best MSME loan options. You'll get personalized recommendations based on your GST turnover and business profile.";
      } else if (input.includes("waste") || input.includes("वेस्ट")) {
        aiResponse = selectedVoiceLanguage === 'hi' 
          ? "ReCircle टूल का उपयोग करके आप अपने ई-वेस्ट को सत्यापित रीसाइक्लर्स के साथ मैच कर सकते हैं। पिकअप शेड्यूल करें और प्रोत्साहन ट्रैक करें।"
          : "Using the ReCircle tool, you can match your e-waste with verified recyclers. Schedule pickups and track incentives for responsible disposal.";
      } else {
        aiResponse = selectedVoiceLanguage === 'hi' 
          ? "मैं Biocog AI असिस्टेंट हूं। मैं आपको कार्बन ट्रैकिंग, वित्तीय मार्गदर्शन, और अपशिष्ट प्रबंधन में मदद कर सकता हूं। कुछ और पूछें!"
          : "I'm the Biocog AI Assistant. I can help you with carbon tracking, financial guidance, and waste management. Ask me anything else!";
      }
      
      setResponse(aiResponse);
      speakResponse(aiResponse);
    }, 1000);
  };

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedVoiceLanguage === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {currentContent.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {currentContent.subtitle}
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {currentContent.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Voice Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="h-5 w-5" />
                  <span>Voice Interface</span>
                </CardTitle>
                <CardDescription>
                  {currentContent.voiceLanguage}:
                  <select 
                    value={selectedVoiceLanguage}
                    onChange={(e) => setSelectedVoiceLanguage(e.target.value)}
                    className="ml-2 p-1 border rounded"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Voice Controls */}
                <div className="flex justify-center space-x-4">
                  {!isListening ? (
                    <Button onClick={startListening} size="lg" className="h-16 w-16 rounded-full">
                      <Mic className="h-6 w-6" />
                    </Button>
                  ) : (
                    <Button onClick={stopListening} variant="destructive" size="lg" className="h-16 w-16 rounded-full">
                      <MicOff className="h-6 w-6" />
                    </Button>
                  )}
                  
                  {isSpeaking ? (
                    <Button onClick={stopSpeaking} variant="outline" size="lg" className="h-16 w-16 rounded-full">
                      <VolumeX className="h-6 w-6" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="lg" className="h-16 w-16 rounded-full" disabled>
                      <Volume2 className="h-6 w-6" />
                    </Button>
                  )}
                </div>

                {/* Status */}
                <div className="text-center">
                  {isListening && (
                    <Badge variant="secondary" className="animate-pulse">
                      Listening...
                    </Badge>
                  )}
                  {isSpeaking && (
                    <Badge variant="secondary" className="animate-pulse">
                      {currentContent.speaking}
                    </Badge>
                  )}
                </div>

                {/* Transcript */}
                {transcript && (
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <h4 className="font-semibold mb-2">{currentContent.yourMessage}:</h4>
                    <p className="text-muted-foreground">{transcript}</p>
                  </div>
                )}

                {/* AI Response */}
                {response && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold mb-2">{currentContent.aiResponse}:</h4>
                    <p className="text-muted-foreground">{response}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample Questions & Features */}
            <div className="space-y-6">
              {/* Sample Questions */}
              <Card>
                <CardHeader>
                  <CardTitle>{currentContent.sampleQuestions}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentContent.questions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setTranscript(question);
                          handleAIResponse(question);
                        }}
                        className="w-full p-3 text-left bg-accent/30 hover:bg-accent/50 rounded-lg transition-colors"
                      >
                        <span className="text-sm text-muted-foreground">"{question}"</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>AI Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentContent.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Note */}
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>📝 {currentContent.note}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default VoiceDemo;