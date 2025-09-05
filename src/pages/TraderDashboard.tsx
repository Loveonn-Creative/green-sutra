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
  TrendingUp, 
  Leaf, 
  CreditCard, 
  Users, 
  Award,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';

const TraderDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isGuestMode } = useGuestAccess();
  const { language, setLanguage, translations } = useTheme();

  // Mock data - in real app, this would come from Supabase
  const dashboardData = {
    carbonCredits: 1250,
    greenScore: 785,
    esgScore: 82,
    carbonSaved: 15.7,
    achievements: [
      { title: 'Green Pioneer', description: 'First ESG report', points: 100, icon: '🌱' },
      { title: 'Carbon Saver', description: 'Saved 10+ tonnes CO2', points: 250, icon: '♻️' },
      { title: 'E-Waste Hero', description: 'Recycled 100kg e-waste', points: 150, icon: '📱' }
    ],
    recentTransactions: [
      { type: 'earned', amount: 150, source: 'Solar Panel Installation', date: '2024-01-15' },
      { type: 'redeemed', amount: -75, source: 'UPI Cashout', date: '2024-01-10' },
      { type: 'earned', amount: 200, source: 'E-Waste Recycling', date: '2024-01-08' }
    ],
    suppliers: [
      { name: 'Green Tech Solutions', location: 'Mumbai', carbonScore: 95, category: 'Electronics' },
      { name: 'Eco Manufacturing', location: 'Pune', carbonScore: 88, category: 'Textiles' },
      { name: 'Solar Dynamics', location: 'Bangalore', carbonScore: 92, category: 'Energy' }
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
              {translations.welcome}, Trader!
            </h1>
            <p className="text-muted-foreground">
              Manage your ESG portfolio and carbon credits
            </p>
          </div>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button onClick={() => navigate('/esg-evaluation')}>
              <Plus className="h-4 w-4 mr-2" />
              New ESG Report
            </Button>
            <Button variant="outline" onClick={() => navigate('/ai-mandi')}>
              <Search className="h-4 w-4 mr-2" />
              AI Mandi
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbon Credits</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {dashboardData.carbonCredits.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Green CIBIL Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {dashboardData.greenScore}
              </div>
              <Progress value={dashboardData.greenScore / 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ESG Score</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {dashboardData.esgScore}/100
              </div>
              <Progress value={dashboardData.esgScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbon Saved</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {dashboardData.carbonSaved}t
              </div>
              <p className="text-xs text-muted-foreground">CO2 equivalent</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                    <Badge variant="secondary">+{achievement.points} pts</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Transactions</CardTitle>
              <CardDescription>Your recent carbon credit activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{transaction.source}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                    <div className={`font-medium ${
                      transaction.type === 'earned' ? 'text-success' : 'text-destructive'
                    }`}>
                      {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/credits')}>
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          {/* Top Suppliers */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recommended Green Suppliers
              </CardTitle>
              <CardDescription>
                AI-matched suppliers based on your carbon efficiency requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dashboardData.suppliers.map((supplier, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{supplier.name}</div>
                      <Badge variant={supplier.carbonScore >= 90 ? 'default' : 'secondary'}>
                        {supplier.carbonScore}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{supplier.location}</div>
                    <div className="text-sm text-muted-foreground mb-3">{supplier.category}</div>
                    <Button variant="outline" size="sm" className="w-full">
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" onClick={() => navigate('/ai-mandi')}>
                <Search className="h-4 w-4 mr-2" />
                Explore AI Mandi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer currentLanguage={language} />
    </div>
  );
};

export default TraderDashboard;