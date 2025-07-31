import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Upload, FileText, TrendingDown, Leaf, Award } from "lucide-react";
import { toast } from "sonner";

const CarbonTracker = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage } = useTheme();
  const [esgReports, setEsgReports] = useState([]);
  const [carbonCredits, setCarbonCredits] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch ESG reports
      const { data: reports } = await supabase
        .from('esg_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch carbon credits
      const { data: credits } = await supabase
        .from('carbon_credits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setEsgReports(reports || []);
      setCarbonCredits(credits || []);
      
      // Calculate total credits
      const total = credits?.reduce((sum, credit) => sum + Number(credit.credits_balance), 0) || 0;
      setTotalCredits(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadInvoice = () => {
    navigate('/scan-invoice');
  };

  const handleViewAnalytics = () => {
    toast.info("Analytics feature coming soon!", {
      description: "We're working on advanced carbon analytics dashboard"
    });
  };

  const handleGenerateReport = () => {
    navigate('/esg-evaluation');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={setLanguage} showDashboardNav={true} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ESG Carbon Tracker</h1>
            <p className="text-muted-foreground">Track, analyze, and reduce your carbon footprint with AI</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-success" />
                    Carbon Credits
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">{totalCredits.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Total credits earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  ESG Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{esgReports.length}</div>
                <p className="text-sm text-muted-foreground">Reports submitted</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2 text-warning" />
                  Carbon Footprint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">
                  {esgReports.length > 0 ? 
                    (esgReports[0].emissions_scope1 + esgReports[0].emissions_scope2 + esgReports[0].emissions_scope3).toFixed(1) 
                    : '0.0'
                  }
                </div>
                <p className="text-sm text-muted-foreground">tCO₂e</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Invoices</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Upload your invoices to automatically calculate CO₂ emissions</p>
                <Button className="w-full" onClick={handleUploadInvoice}>Upload Now</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">View detailed carbon analytics and trends</p>
                <Button variant="outline" className="w-full" onClick={handleViewAnalytics}>View Analytics</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>ESG Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Generate compliance reports in PDF & Excel</p>
                <Button variant="secondary" className="w-full" onClick={handleGenerateReport}>Generate Report</Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          {carbonCredits.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  Recent Carbon Credit Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {carbonCredits.slice(0, 5).map((credit, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{credit.source_description || credit.source_type}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(credit.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-success">+{credit.credits_earned} credits</div>
                        <div className="text-sm text-muted-foreground">{credit.verification_status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer currentLanguage={language} />
    </div>
  );
};

export default CarbonTracker;