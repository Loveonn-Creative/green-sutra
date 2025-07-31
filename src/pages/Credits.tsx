import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, TrendingUp, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import { toast } from 'sonner';

interface CarbonCredit {
  id: string;
  credits_earned: number;
  credits_redeemed: number;
  credits_balance: number;
  source_type: string;
  source_description: string;
  verification_status: string;
  created_at: string;
}

const Credits = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { language, setLanguage } = useTheme();
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchCredits();
  }, [user, navigate]);

  const fetchCredits = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('carbon_credits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching credits:', error);
        toast.error('Failed to load carbon credits');
        return;
      }

      setCredits(data || []);
      
      // Calculate total balance
      const balance = (data || []).reduce((sum, credit) => sum + credit.credits_balance, 0);
      setTotalBalance(balance);
    } catch (error) {
      console.error('Error fetching credits:', error);
      toast.error('Failed to load carbon credits');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={setLanguage} showDashboardNav={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Carbon Credits
            </h1>
            <p className="text-muted-foreground">
              Track and manage your carbon credit portfolio
            </p>
          </div>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button onClick={() => navigate('/carbon-tracker')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Track Carbon
            </Button>
            <Button variant="outline" onClick={() => navigate('/ewaste-recycling')}>
              <CreditCard className="h-4 w-4 mr-2" />
              Earn Credits
            </Button>
          </div>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {totalBalance.toLocaleString()} Credits
              </div>
              <p className="text-xs text-muted-foreground">Available for redemption</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {credits.reduce((sum, credit) => sum + credit.credits_earned, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Lifetime earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Redeemed</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {credits.reduce((sum, credit) => sum + credit.credits_redeemed, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total withdrawn</p>
            </CardContent>
          </Card>
        </div>

        {/* Credits History */}
        <Card>
          <CardHeader>
            <CardTitle>Credit History</CardTitle>
            <CardDescription>Your carbon credit transactions and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-muted-foreground">Loading credits...</p>
              </div>
            ) : credits.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Credits Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start earning carbon credits by tracking your sustainable activities
                </p>
                <Button onClick={() => navigate('/carbon-tracker')}>
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {credits.map((credit) => (
                  <div key={credit.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{credit.source_description || credit.source_type}</h4>
                        <Badge variant={credit.verification_status === 'verified' ? 'default' : 'secondary'}>
                          {credit.verification_status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(credit.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {credit.credits_earned > 0 && (
                        <div className="text-success font-medium">
                          +{credit.credits_earned.toLocaleString()} credits
                        </div>
                      )}
                      {credit.credits_redeemed > 0 && (
                        <div className="text-destructive font-medium">
                          -{credit.credits_redeemed.toLocaleString()} credits
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        Balance: {credit.credits_balance.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Earn More Credits</CardTitle>
              <CardDescription>
                Participate in sustainable activities to earn carbon credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/ewaste-recycling')}>
                  Recycle E-Waste
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/carbon-tracker')}>
                  Track Carbon Footprint
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/esg-evaluation')}>
                  Submit ESG Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Redeem Credits</CardTitle>
              <CardDescription>
                Convert your credits to rewards and benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" disabled>
                  UPI Cash Out (Coming Soon)
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  Green Products (Coming Soon)
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  Carbon Offsets (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Credits;