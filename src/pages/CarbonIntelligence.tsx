import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { 
  Satellite, 
  Brain, 
  Leaf, 
  Zap, 
  Factory, 
  Wheat, 
  Microscope, 
  Cpu, 
  Target, 
  Mic,
  Play,
  ChevronRight,
  Filter,
  Globe,
  TrendingUp,
  Shield,
  Database,
  Coins,
  Users,
  BarChart,
  Settings,
  Lightbulb,
  Beaker,
  TreePine,
  Mountain,
  Recycle,
  Flame,
  Search,
  Eye,
  MapPin,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/loading-spinner';
import VoiceInterface from '@/components/voice/VoiceInterface';

const CarbonIntelligence = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const content = {
    en: {
      title: "Carbon Intelligence & Next-Gen Climate Solutions",
      subtitle: "CINCS - From invisible emissions to actionable climate intelligence",
      description: "Advanced AI-powered carbon intelligence modules and breakthrough climate technologies in development",
      voiceDemo: "Voice Navigate Demo",
      seeInAction: "See It In Action",
      requestDemo: "Request Demo",
      solutions: "Solutions",
      exploreIdeas: "Explore Ideas", 
      satelliteVision: "Satellite Vision",
      languages: "Languages: English, Hindi (Others in development)",
      categories: "R&D & Ideation Zone – Under Development"
    },
    hi: {
      title: "कार्बन इंटेलिजेंस और अगली पीढ़ी के जलवायु समाधान",
      subtitle: "CINCS - अदृश्य उत्सर्जन से कार्रवाई योग्य जलवायु बुद्धिमत्ता तक",
      description: "उन्नत AI-संचालित कार्बन इंटेलिजेंस मॉड्यूल और विकास में सफलता जलवायु प्रौद्योगिकियां",
      voiceDemo: "वॉयस नेविगेट डेमो",
      seeInAction: "इसे क्रिया में देखें",
      requestDemo: "डेमो का अनुरोध करें",
      solutions: "समाधान",
      exploreIdeas: "आइडिया एक्सप्लोर करें",
      satelliteVision: "सैटेलाइट विज़न",
      languages: "भाषाएं: अंग्रेजी, हिंदी (अन्य विकास में)",
      categories: "R&D और आइडिएशन ज़ोन - विकास के तहत"
    }
  };

  const filters = [
    { id: 'all', label: 'All Solutions', icon: Globe },
    { id: 'ai-powered', label: 'AI-Powered', icon: Brain },
    { id: 'satellite', label: 'Satellite-Based', icon: Satellite },
    { id: 'biotech', label: 'Bio-Tech', icon: Microscope },
    { id: 'agriculture', label: 'Agriculture', icon: Wheat },
    { id: 'industry', label: 'Heavy Industry', icon: Factory },
    { id: 'carbon-markets', label: 'Carbon Markets', icon: Coins },
    { id: 'msme', label: 'MSME Decarbonization', icon: Users }
  ];

  const coreModules = [
    {
      title: "Smart Carbon Ledger",
      description: "Real-time, AI-enhanced GHG tracking for MSMEs using IoT, satellite, and transactional proxies",
      status: "MVP Live",
      icon: Database,
      features: ["Real-time tracking", "API-driven", "Mobile & Web", "Audit logs"],
      category: "ai-powered"
    },
    {
      title: "AI Emission Reduction Marketplace",
      description: "AI-matched interventions connecting MSMEs with green vendors, EV leasing, and solar solutions",
      status: "In Development",
      icon: TrendingUp,
      features: ["Smart matching", "Vendor directory", "Onboarding workflow", "ROI tracking"],
      category: "ai-powered"
    },
    {
      title: "Tokenized Carbon Incentives",
      description: "Verified emission cuts converted to tradable credits for corporate Scope 3 compliance",
      status: "Prototype",
      icon: Coins,
      features: ["Token balance", "Transfer logs", "Corporate trading", "Verification"],
      category: "carbon-markets"
    },
    {
      title: "B2B Climate Stack SDK",
      description: "API integration for fintech/ERP/ESG tools with adaptive onboarding for external partners",
      status: "Coming Soon",
      icon: Settings,
      features: ["API docs", "Integration guides", "Demo APIs", "Partner UI"],
      category: "ai-powered"
    }
  ];

  const shadowAIFeatures = [
    {
      title: "Zero-Input Carbon Baseline",
      description: "Map and predict CO₂ with digital exhaust from electricity bills, GPS/UPI, GST invoices",
      progress: 75
    },
    {
      title: "WhatsApp Shadow Reports",
      description: "Instant freemium reports via chat with physics + LLM/ML-powered insights",
      progress: 60
    },
    {
      title: "Auto Intervention Suggestions",
      description: "AI suggests best ROI interventions based on carbon shadow analysis",
      progress: 80
    }
  ];

  const researchProjects = [
    {
      title: "Livestock Methane Reduction",
      problem: "Livestock methane emissions contribute 14% of global greenhouse gases",
      solution: "Gene-edited gut microbes using CRISPR to reduce methane production",
      stage: "In Research",
      aiRole: "Predictive simulation of microbial gene impact",
      partner: "DBT-ICAR partnership potential",
      category: "biotech",
      icon: Microscope
    },
    {
      title: "Green Cement Discovery",
      problem: "Cement production accounts for 8% of global CO₂ emissions",
      solution: "AI-discovered binders using rice husk ash + magnesite, steel slag integration",
      stage: "Ideation",
      aiRole: "Material discovery and curing prediction",
      partner: "Potential collaboration with Tata/JSW",
      category: "ai-powered",
      icon: Factory
    },
    {
      title: "Carbon Shadow AI",
      problem: "No real CO₂ tracking at MSME level due to complexity and cost",
      solution: "Auto-emission profiles via digital exhaust, plug-and-play baseline reports",
      stage: "MVP Live",
      aiRole: "Pattern detection and carbon estimation from proxies",
      partner: "Integration with Indian fintech ecosystem",
      category: "ai-powered",
      icon: Brain
    },
    {
      title: "Industrial Heat Optimization",
      problem: "Indian industries waste massive amounts of thermal energy",
      solution: "AI clamps for boilers/furnaces with real-time optimization, no retrofit needed",
      stage: "Prototype",
      aiRole: "Real-time optimization of industrial heat loss",
      partner: "MSME manufacturing clusters",
      category: "industry",
      icon: Flame
    },
    {
      title: "Distributed CO₂ Capture",
      problem: "Large-scale CO₂ capture unviable for distributed rural areas",
      solution: "Micro scrubbers + methanol conversion with blockchain credit trading",
      stage: "Ideation",
      aiRole: "Microgrid analysis and token economy modeling",
      partner: "Rural development partnerships",
      category: "carbon-markets",
      icon: Recycle
    },
    {
      title: "Enhanced Photosynthesis",
      problem: "Natural photosynthesis is inefficient for large-scale carbon capture",
      solution: "Bioengineered algae/bacteria to convert CO₂ into ethanol using AlphaFold models",
      stage: "In Research",
      aiRole: "Enzyme sequence prediction and optimization",
      partner: "Biotech research institutions",
      category: "biotech",
      icon: Beaker
    },
    {
      title: "Methane Leak Detection",
      problem: "Undetected methane leaks from industrial and agricultural sources",
      solution: "Satellite + AI monitoring using ISRO/NASA data with ML for hotspot detection",
      stage: "In Research",
      aiRole: "Satellite image analysis and leak prediction",
      partner: "ISRO/NASA collaboration",
      category: "satellite",
      icon: Satellite
    },
    {
      title: "Precision Agriculture Emissions",
      problem: "Paddy cultivation and agriculture contribute significantly to methane emissions",
      solution: "AI models to optimize agricultural practices for emission reduction",
      stage: "Ongoing",
      aiRole: "Crop optimization and emission modeling",
      partner: "Agricultural research institutes",
      category: "agriculture",
      icon: Wheat
    },
    {
      title: "Nature-Based Carbon Monitoring",
      problem: "Lack of scalable monitoring for land-based carbon sequestration",
      solution: "Sensor + satellite integration for real-time forest and land carbon mapping",
      stage: "Planning",
      aiRole: "Multi-source data fusion and carbon accounting",
      partner: "Forest department collaborations",
      category: "satellite",
      icon: TreePine
    },
    {
      title: "Micro-Algae Sequestration",
      problem: "Limited scalable biological carbon capture solutions",
      solution: "Early-stage pilots tracking biomass yields in India's optimal zones",
      stage: "Early Pilot",
      aiRole: "Growth optimization and yield prediction",
      partner: "Marine research institutions",
      category: "biotech",
      icon: Mountain
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleVoiceDemo = () => {
    setIsVoiceActive(!isVoiceActive);
    toast({
      title: isVoiceActive ? "Voice Demo Stopped" : "Voice Demo Started",
      description: isVoiceActive ? 
        "Voice navigation disabled" : 
        "Say 'Show me solutions', 'Explore satellite', or 'Request demo' in Hindi/English",
    });
  };

  const handleVoiceCommand = async () => {
    try {
      setIsListening(true);
      
      // Mock voice command handling - in real implementation, this would connect to OpenAI API
      setTimeout(() => {
        setIsListening(false);
        toast({
          title: "Voice Command Ready",
          description: "Say 'Show me methane solutions' or 'Request demo' to navigate",
        });
      }, 2000);
    } catch (error) {
      setIsListening(false);
      toast({
        title: "Voice Error",
        description: "Voice commands available in Hindi & English only",
        variant: "destructive"
      });
    }
  };

  const filteredResearch = activeFilter === 'all' 
    ? researchProjects 
    : researchProjects.filter(project => project.category === activeFilter);

  const currentContent = content[selectedLanguage as keyof typeof content];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with World-Class Navigation */}
      <section className="relative bg-gradient-to-br from-success-light via-background to-accent/30 py-20 overflow-hidden">
        {/* Nature-inspired background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-6xl">🌱</div>
          <div className="absolute top-40 right-20 text-4xl">🌍</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">⚡</div>
          <div className="absolute bottom-40 right-1/3 text-3xl">🛰️</div>
        </div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header with Navigation */}
            <div className="text-center space-y-8 mb-16">
              <div className="space-y-4">
                <Badge variant="outline" className="mb-4 border-success/30 text-success bg-success-light/20">
                  {currentContent.categories}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-success via-primary to-accent-foreground bg-clip-text text-transparent">
                    Carbon Intelligence &
                  </span>
                  <br />
                  <span className="text-foreground">Next-Gen Climate Solutions</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  {currentContent.subtitle}
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                {currentContent.description}
              </p>
            </div>

            {/* World-Class Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <Button 
                variant="default" 
                size="lg" 
                className="h-16 bg-success hover:bg-success/90 text-white group"
                onClick={() => scrollToSection('core-modules')}
              >
                <Search className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold">{currentContent.solutions}</div>
                  <div className="text-xs opacity-90">Core Modules</div>
                </div>
                <ChevronRight className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-1" />
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 border-primary/20 hover:bg-primary/5 group"
                onClick={() => handleVoiceDemo()}
              >
                <Mic className={`h-5 w-5 mr-2 ${isVoiceActive ? 'text-primary animate-pulse' : ''}`} />
                <div className="text-left">
                  <div className="font-semibold">{currentContent.requestDemo}</div>
                  <div className="text-xs text-muted-foreground">Voice & AI</div>
                </div>
                <Play className="h-4 w-4 ml-auto" />
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 border-accent-foreground/20 hover:bg-accent group"
                onClick={() => scrollToSection('research-gallery')}
              >
                <Lightbulb className="h-5 w-5 mr-2 text-accent-foreground" />
                <div className="text-left">
                  <div className="font-semibold">{currentContent.exploreIdeas}</div>
                  <div className="text-xs text-muted-foreground">Research & R&D</div>
                </div>
                <Eye className="h-4 w-4 ml-auto" />
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 border-blue-200 hover:bg-blue-50 group"
                onClick={() => {
                  setActiveFilter('satellite');
                  scrollToSection('research-gallery');
                }}
              >
                <Satellite className="h-5 w-5 mr-2 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold">{currentContent.satelliteVision}</div>
                  <div className="text-xs text-muted-foreground">Space-AI Tech</div>
                </div>
                <MapPin className="h-4 w-4 ml-auto" />
              </Button>
            </div>

            {/* Voice & Language Support */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 border-t border-success/10">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedLanguage(selectedLanguage === 'en' ? 'hi' : 'en')}
                  className="text-sm"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {selectedLanguage === 'en' ? 'हिंदी में देखें' : 'View in English'}
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground text-center">
                {currentContent.languages}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Interface Component */}
      {isVoiceActive && (
        <div className="fixed bottom-8 right-8 z-50">
          <VoiceInterface 
            onSpeakingChange={(speaking) => setIsListening(speaking)}
            language={selectedLanguage}
          />
        </div>
      )}

      {/* Core Modules Section */}
      <section id="core-modules" className="py-20">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Carbon Intelligence Core
              </h2>
              <p className="text-lg text-muted-foreground">
                Production-ready modules for immediate deployment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {coreModules.map((module, index) => (
                <Card key={index} className="hover:shadow-large transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <module.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{module.title}</CardTitle>
                          <Badge variant={module.status === 'MVP Live' ? 'default' : 'outline'}>
                            {module.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-base">
                      {module.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {module.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Carbon Shadow AI Module */}
      <section className="py-20 bg-accent/20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Carbon Shadow AI Module
              </h2>
              <p className="text-lg text-muted-foreground">
                Zero-input carbon tracking for non-compliant or onboarding users
              </p>
            </div>

            <div className="space-y-8">
              {shadowAIFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                      <Badge variant="outline">
                        {feature.progress}% Complete
                      </Badge>
                    </div>
                    <Progress value={feature.progress} className="w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-warning-light/20 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-6 w-6 text-warning mt-1" />
                <div>
                  <h4 className="font-semibold text-warning-foreground mb-2">
                    Integration Notice
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Built on Biocog's existing infrastructure – Nothing breaks, everything extends. 
                    All features integrate seamlessly with current authentication and user management systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Ideation Gallery */}
      <section id="research-gallery" className="py-20">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Research & Ideation Gallery
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Breakthrough climate technologies in development
              </p>

              {/* Filter System */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.id)}
                    className="flex items-center space-x-2"
                  >
                    <filter.icon className="h-4 w-4" />
                    <span>{filter.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Research Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResearch.map((project, index) => (
                <Card key={index} className="hover:shadow-large transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <project.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge 
                        variant={project.stage === 'MVP Live' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {project.stage}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-destructive mb-2">Problem:</h4>
                      <p className="text-sm text-muted-foreground">{project.problem}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-success mb-2">Solution:</h4>
                      <p className="text-sm text-muted-foreground">{project.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-primary mb-2">AI Role:</h4>
                      <p className="text-sm text-muted-foreground">{project.aiRole}</p>
                    </div>
                    
                    {project.partner && (
                      <div>
                        <h4 className="font-medium text-accent-foreground mb-2">Partnership:</h4>
                        <p className="text-sm text-muted-foreground">{project.partner}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Satellite Services Banner */}
            <div className="mt-16 p-6 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Satellite className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Satellite + AI Services Update
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Satellite-based leak detection and precision agriculture services are in active ideation phase. 
                    We're researching partnerships with ISRO/NASA for methane hotspot detection and agricultural optimization.
                  </p>
                </div>
              </div>
            </div>

            {/* Transparency Notice */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground italic">
                All features marked 'Ideation' are in R&D and may not be commercially deployed yet. 
                We believe in radical transparency for climate solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarbonIntelligence;