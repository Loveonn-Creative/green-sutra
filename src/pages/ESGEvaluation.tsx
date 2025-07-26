import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, TrendingUp, Users, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';

const ESGEvaluation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage, translations } = useTheme();
  const [esgData, setEsgData] = useState({
    // Environmental
    emissions_scope1: '',
    emissions_scope2: '',
    emissions_scope3: '',
    waste_generated: '',
    waste_recycled: '',
    water_consumption: '',
    energy_consumption: '',
    renewable_energy_percent: '',
    
    // Social
    employee_count: '',
    safety_incidents: '',
    diversity_score: '',
    
    // Governance
    report_name: '',
    reporting_period: '2024'
  });

  const [scores, setScores] = useState({
    environmental: 0,
    social: 0,
    governance: 0,
    overall: 0
  });

  const calculateESGScore = () => {
    // Simplified ESG scoring algorithm
    const envScore = Math.min(100, 
      (100 - (parseFloat(esgData.emissions_scope1) || 0) * 0.1) * 
      (parseFloat(esgData.renewable_energy_percent) || 0) / 100
    );
    
    const socialScore = Math.min(100,
      85 - (parseFloat(esgData.safety_incidents) || 0) * 5 + 
      (parseFloat(esgData.diversity_score) || 0)
    );
    
    const govScore = 75; // Base governance score
    
    const overall = (envScore + socialScore + govScore) / 3;
    
    setScores({
      environmental: Math.round(envScore),
      social: Math.round(socialScore),
      governance: Math.round(govScore),
      overall: Math.round(overall)
    });
  };

  const handleSubmit = async () => {
    // Calculate scores first
    calculateESGScore();
    
    // Here you would typically save to Supabase
    // For now, just show success and redirect
    alert('ESG Report submitted successfully!');
    navigate('/trader-dashboard');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">ESG Evaluation</h1>
          <p className="text-muted-foreground">
            Comprehensive ESG assessment based on BRSR and GRI standards
          </p>
        </div>

        {scores.overall > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Your ESG Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{scores.overall}</div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <Progress value={scores.overall} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{scores.environmental}</div>
                  <div className="text-sm text-muted-foreground">Environmental</div>
                  <Progress value={scores.environmental} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{scores.social}</div>
                  <div className="text-sm text-muted-foreground">Social</div>
                  <Progress value={scores.social} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-dark">{scores.governance}</div>
                  <div className="text-sm text-muted-foreground">Governance</div>
                  <Progress value={scores.governance} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="environmental" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="environmental" className="flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              Environmental
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Social
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Governance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="environmental">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Assessment</CardTitle>
                <CardDescription>
                  Measure your environmental footprint across emissions, waste, and resource consumption
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scope1">Scope 1 Emissions (tCO2e)</Label>
                    <Input
                      id="scope1"
                      type="number"
                      value={esgData.emissions_scope1}
                      onChange={(e) => setEsgData({...esgData, emissions_scope1: e.target.value})}
                      placeholder="Direct emissions"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scope2">Scope 2 Emissions (tCO2e)</Label>
                    <Input
                      id="scope2"
                      type="number"
                      value={esgData.emissions_scope2}
                      onChange={(e) => setEsgData({...esgData, emissions_scope2: e.target.value})}
                      placeholder="Indirect emissions"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scope3">Scope 3 Emissions (tCO2e)</Label>
                    <Input
                      id="scope3"
                      type="number"
                      value={esgData.emissions_scope3}
                      onChange={(e) => setEsgData({...esgData, emissions_scope3: e.target.value})}
                      placeholder="Value chain emissions"
                    />
                  </div>
                  <div>
                    <Label htmlFor="renewable">Renewable Energy (%)</Label>
                    <Input
                      id="renewable"
                      type="number"
                      max="100"
                      value={esgData.renewable_energy_percent}
                      onChange={(e) => setEsgData({...esgData, renewable_energy_percent: e.target.value})}
                      placeholder="% of renewable energy"
                    />
                  </div>
                  <div>
                    <Label htmlFor="waste-gen">Waste Generated (tonnes)</Label>
                    <Input
                      id="waste-gen"
                      type="number"
                      value={esgData.waste_generated}
                      onChange={(e) => setEsgData({...esgData, waste_generated: e.target.value})}
                      placeholder="Total waste generated"
                    />
                  </div>
                  <div>
                    <Label htmlFor="waste-rec">Waste Recycled (tonnes)</Label>
                    <Input
                      id="waste-rec"
                      type="number"
                      value={esgData.waste_recycled}
                      onChange={(e) => setEsgData({...esgData, waste_recycled: e.target.value})}
                      placeholder="Waste recycled"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Impact Assessment</CardTitle>
                <CardDescription>
                  Evaluate your social impact on employees, communities, and stakeholders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employees">Employee Count</Label>
                    <Input
                      id="employees"
                      type="number"
                      value={esgData.employee_count}
                      onChange={(e) => setEsgData({...esgData, employee_count: e.target.value})}
                      placeholder="Total employees"
                    />
                  </div>
                  <div>
                    <Label htmlFor="incidents">Safety Incidents</Label>
                    <Input
                      id="incidents"
                      type="number"
                      value={esgData.safety_incidents}
                      onChange={(e) => setEsgData({...esgData, safety_incidents: e.target.value})}
                      placeholder="Number of incidents"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diversity">Diversity Score (0-100)</Label>
                    <Input
                      id="diversity"
                      type="number"
                      max="100"
                      value={esgData.diversity_score}
                      onChange={(e) => setEsgData({...esgData, diversity_score: e.target.value})}
                      placeholder="Diversity & inclusion score"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance">
            <Card>
              <CardHeader>
                <CardTitle>Governance Assessment</CardTitle>
                <CardDescription>
                  Corporate governance, transparency, and ethical practices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input
                      id="report-name"
                      value={esgData.report_name}
                      onChange={(e) => setEsgData({...esgData, report_name: e.target.value})}
                      placeholder="ESG Report 2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="period">Reporting Period</Label>
                    <Input
                      id="period"
                      value={esgData.reporting_period}
                      onChange={(e) => setEsgData({...esgData, reporting_period: e.target.value})}
                      placeholder="2024"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 mt-8">
          <Button onClick={calculateESGScore} variant="outline" className="flex-1">
            Calculate ESG Score
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Submit ESG Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ESGEvaluation;