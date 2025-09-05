import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useGuestAccess } from '@/hooks/useGuestAccess';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Leaf, 
  TrendingUp, 
  Zap,
  Award,
  Plus,
  BarChart3,
  ShoppingBag
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';

const ManufacturerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isGuestMode } = useGuestAccess();
  const { language, setLanguage, translations } = useTheme();

  // Mock data - in real app, this would come from Supabase
  const dashboardData = {
    carbonEfficiency: 89,
    energyFromRenewable: 65,
    esgCompliance: 91,
    wasteReduction: 78,
    productListings: 12,
    activeOrders: 8,
    sustainabilityMetrics: {
      carbonFootprint: 2.3, // tonnes CO2e per unit
      waterUsage: 15.2, // liters per unit
      wasteGenerated: 0.8, // kg per unit
      energyConsumption: 45.7 // kWh per unit
    },
    recentActivities: [
      { type: 'listing', description: 'Solar-powered textile machinery listed', date: '2024-01-15' },
      { type: 'order', description: 'New order from Green Trading Co.', date: '2024-01-14' },
      { type: 'certification', description: 'ISO 14001 certification renewed', date: '2024-01-12' },
      { type: 'improvement', description: 'Reduced carbon footprint by 5%', date: '2024-01-10' }
    ],
    certifications: [
      { name: 'ISO 14001', status: 'Valid', expiry: '2025-01-15' },
      { name: 'Energy Star', status: 'Valid', expiry: '2024-12-20' },
      { name: 'Green Building', status: 'Pending', expiry: '2024-11-30' }
    ]
  };

  if (!user && !isGuestMode) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={setLanguage} showDashboardNav={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {translations.welcome}, Manufacturer!
            </h1>
            <p className="text-muted-foreground">
              Track your sustainability metrics and manage your green marketplace presence
            </p>
          </div>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button onClick={() => navigate('/esg-evaluation')}>
              <Plus className="h-4 w-4 mr-2" />
              Update ESG Data
            </Button>
            <Button variant="outline" onClick={() => navigate('/ai-mandi')}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Manage Listings
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbon Efficiency</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {dashboardData.carbonEfficiency}%
              </div>
              <Progress value={dashboardData.carbonEfficiency} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">+3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Renewable Energy</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {dashboardData.energyFromRenewable}%
              </div>
              <Progress value={dashboardData.energyFromRenewable} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Solar + Wind power</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ESG Compliance</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {dashboardData.esgCompliance}%
              </div>
              <Progress value={dashboardData.esgCompliance} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">BRSR compliant</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Factory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-dark">
                {dashboardData.productListings}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{dashboardData.activeOrders} pending orders</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sustainability Metrics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Sustainability Metrics
              </CardTitle>
              <CardDescription>
                Per-unit environmental impact measurements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Carbon Footprint</span>
                      <span className="text-sm text-muted-foreground">
                        {dashboardData.sustainabilityMetrics.carbonFootprint}t CO2e/unit
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Water Usage</span>
                      <span className="text-sm text-muted-foreground">
                        {dashboardData.sustainabilityMetrics.waterUsage}L/unit
                      </span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Waste Generated</span>
                      <span className="text-sm text-muted-foreground">
                        {dashboardData.sustainabilityMetrics.wasteGenerated}kg/unit
                      </span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Energy Consumption</span>
                      <span className="text-sm text-muted-foreground">
                        {dashboardData.sustainabilityMetrics.energyConsumption}kWh/unit
                      </span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Your environmental and quality certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{cert.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Expires: {cert.expiry}
                      </div>
                    </div>
                    <Badge variant={cert.status === 'Valid' ? 'default' : 'secondary'}>
                      {cert.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Add Certificate
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest sustainability and business activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'improvement' ? 'bg-success' :
                      activity.type === 'order' ? 'bg-primary' :
                      activity.type === 'certification' ? 'bg-warning' :
                      'bg-secondary'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{activity.description}</div>
                      <div className="text-xs text-muted-foreground">{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center"
            onClick={() => navigate('/carbon-tracker')}
          >
            <TrendingUp className="h-6 w-6 mb-2" />
            Carbon Tracker
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center"
            onClick={() => navigate('/ewaste-recycling')}
          >
            <Leaf className="h-6 w-6 mb-2" />
            E-Waste Management
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center"
            onClick={() => navigate('/scan-invoice')}
          >
            <BarChart3 className="h-6 w-6 mb-2" />
            Invoice Scanner
          </Button>
        </div>
      </div>
      
      <Footer currentLanguage={language} />
    </div>
  );
};

export default ManufacturerDashboard;