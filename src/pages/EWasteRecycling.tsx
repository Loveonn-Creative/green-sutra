import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useGuestAccess } from '@/hooks/useGuestAccess';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recycle, MapPin, Calendar, Gift, Award, History } from "lucide-react";
import EWasteModal from "@/components/e-waste/EWasteModal";
import { toast } from "sonner";

const EWasteRecycling = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isGuestMode } = useGuestAccess();
  const { language, setLanguage } = useTheme();
  const [ewasteRecords, setEwasteRecords] = useState([]);
  const [carbonCredits, setCarbonCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEwasteData();
    }
  }, [user]);

  const fetchEwasteData = async () => {
    try {
      // Fetch e-waste records
      const { data: records } = await supabase
        .from('ewaste_ledger')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setEwasteRecords(records || []);
      
      // Calculate total carbon credits from e-waste
      const totalCredits = records?.reduce((sum, record) => sum + Number(record.carbon_credits_earned), 0) || 0;
      setCarbonCredits(totalCredits);
    } catch (error) {
      console.error('Error fetching e-waste data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEwasteSubmit = async (items) => {
    if (!user) return;

    try {
      // Calculate estimated values
      const totalWeight = items.reduce((sum, item) => sum + (item.estimatedWeight || 0), 0);
      const estimatedCredits = totalWeight * 0.8; // 0.8 credits per kg

      // Create e-waste ledger entry
      const { error: ewasteError } = await supabase
        .from('ewaste_ledger')
        .insert([{
          user_id: user.id,
          submission_id: `EW-${Date.now()}`,
          waste_type: items.map(item => item.type).join(', '),
          weight_kg: totalWeight,
          recycler_id: 'REC-001',
          recycler_name: 'GreenTech Recyclers',
          pickup_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
          carbon_credits_earned: estimatedCredits,
          verification_status: 'pending',
          record_hash: `hash-${Date.now()}`
        }]);

      if (ewasteError) throw ewasteError;

      // Create carbon credits entry
      const { error: creditsError } = await supabase
        .from('carbon_credits')
        .insert([{
          user_id: user.id,
          source_type: 'e-waste_recycling',
          source_description: `E-waste recycling: ${items.length} items, ${totalWeight}kg`,
          credits_earned: estimatedCredits,
          credits_balance: estimatedCredits,
          verification_status: 'pending'
        }]);

      if (creditsError) throw creditsError;

      toast.success('E-waste submission successful!', {
        description: `Estimated ${estimatedCredits.toFixed(1)} carbon credits will be credited once verified.`
      });

      // Refresh data
      fetchEwasteData();
    } catch (error) {
      console.error('Error submitting e-waste:', error);
      toast.error('Failed to submit e-waste', {
        description: 'Please try again or contact support.'
      });
    }
  };

  const handleFindRecyclers = () => {
    toast.info("Finding recyclers near you...", {
      description: "We'll match you with verified recyclers in your area"
    });
  };

  const handleSchedulePickup = () => {
    toast.info("Opening schedule picker...", {
      description: "Choose a convenient time for e-waste pickup"
    });
  };

  const handleViewRewards = () => {
    navigate('/credits');
  };

  if (!user && !isGuestMode) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={setLanguage} showDashboardNav={true} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ReCircle E-Waste Tool</h1>
            <p className="text-muted-foreground">Connect with verified recyclers for responsible e-waste disposal</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-success" />
                  Carbon Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">{carbonCredits.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">From e-waste recycling</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Recycle className="h-5 w-5 mr-2 text-primary" />
                  Items Recycled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{ewasteRecords.length}</div>
                <p className="text-sm text-muted-foreground">Total submissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-warning" />
                  Weight Recycled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">
                  {ewasteRecords.reduce((sum, record) => sum + Number(record.weight_kg), 0).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Kilograms</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Recycle className="h-5 w-5" />
                  <span>Submit Waste</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Add your electronic waste items</p>
                <EWasteModal 
                  trigger={<Button className="w-full">Add Items</Button>}
                  onSubmit={handleEwasteSubmit}
                />
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Find Recyclers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Match with local verified recyclers</p>
                <Button variant="outline" className="w-full" onClick={handleFindRecyclers}>Find Near Me</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Pickup</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Book convenient pickup slots</p>
                <Button variant="secondary" className="w-full" onClick={handleSchedulePickup}>Schedule</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5" />
                  <span>Track Incentives</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Monitor your recycling rewards</p>
                <Button variant="outline" className="w-full" onClick={handleViewRewards}>View Rewards</Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions */}
          {ewasteRecords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Recent E-Waste Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ewasteRecords.slice(0, 5).map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{record.waste_type}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.recycler_name} • {new Date(record.pickup_date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">{record.weight_kg} kg</div>
                          <div className="text-sm text-success">+{record.carbon_credits_earned} credits</div>
                        </div>
                        <Badge variant={record.verification_status === 'verified' ? 'default' : 'secondary'}>
                          {record.verification_status}
                        </Badge>
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

export default EWasteRecycling;