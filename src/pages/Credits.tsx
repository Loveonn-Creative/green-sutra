import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  TrendingUp, 
  Download, 
  Smartphone,
  History,
  Award,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import Header from '@/components/layout/Header';

const Credits = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage, translations } = useTheme();

  // Mock data
  const creditData = {
    totalBalance: 2485,
    totalEarned: 3850,
    totalRedeemed: 1365,
    monthlyTarget: 500,
    currentMonthEarned: 320,
    transactions: [
      {
        id: 1,
        type: 'earned',
        amount: 150,
        source: 'Solar Panel Installation',
        description: 'Installed 5kW solar system - verified carbon reduction',
        date: '2024-01-20',
        status: 'verified',
        co2Saved: 2.3
      },
      {
        id: 2,
        type: 'redeemed',
        amount: -100,
        source: 'UPI Transfer',
        description: 'Redeemed to bank account via UPI',
        date: '2024-01-18',
        status: 'completed',
        transactionId: 'UPI2024011823456'
      },
      {
        id: 3,
        type: 'earned',
        amount: 75,
        source: 'E-Waste Recycling',
        description: 'Recycled 50kg electronic waste',
        date: '2024-01-15',
        status: 'verified',
        co2Saved: 0.8
      },
      {
        id: 4,
        type: 'earned',
        amount: 200,
        source: 'ESG Improvement',
        description: 'Quarterly ESG score improvement bonus',
        date: '2024-01-10',
        status: 'verified',
        co2Saved: 3.2
      },
      {
        id: 5,
        type: 'redeemed',
        amount: -50,
        source: 'Gift Voucher',
        description: 'Amazon gift voucher redemption',
        date: '2024-01-08',
        status: 'completed',
        voucherCode: 'AMZ-GFT-5874'
      }
    ],
    redeemOptions: [
      {
        type: 'upi',
        title: 'Bank Transfer (UPI)',
        description: 'Instant transfer to your bank account',
        minAmount: 100,
        maxAmount: 10000,
        fee: 0,
        processingTime: 'Instant'
      },
      {
        type: 'voucher',
        title: 'Gift Vouchers',
        description: 'Amazon, Flipkart, and more',
        minAmount: 50,
        maxAmount: 5000,
        fee: 0,
        processingTime: '24 hours'
      },
      {
        type: 'donation',
        title: 'Charity Donation',
        description: 'Donate to environmental causes',
        minAmount: 25,
        maxAmount: null,
        fee: 0,
        processingTime: 'Instant'
      }
    ]
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Carbon Credits Portfolio</h1>
          <p className="text-muted-foreground">
            Track your carbon credits, redemptions, and environmental impact
          </p>
        </div>

        {/* Credit Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Balance</CardTitle>
              <CreditCard className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{creditData.totalBalance.toLocaleString()}</div>
              <p className="text-xs opacity-75">Available credits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {creditData.totalEarned.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Lifetime earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Redeemed</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {creditData.totalRedeemed.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Lifetime redemptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Progress</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {creditData.currentMonthEarned}/{creditData.monthlyTarget}
              </div>
              <Progress 
                value={(creditData.currentMonthEarned / creditData.monthlyTarget) * 100} 
                className="mt-2" 
              />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions" className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              Transaction History
            </TabsTrigger>
            <TabsTrigger value="redeem" className="flex items-center">
              <Smartphone className="h-4 w-4 mr-2" />
              Redeem Credits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your carbon credit earning and redemption history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creditData.transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'earned' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                        }`}>
                          {transaction.type === 'earned' ? 
                            <ArrowUpRight className="h-5 w-5" /> : 
                            <ArrowDownLeft className="h-5 w-5" />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{transaction.source}</div>
                          <div className="text-sm text-muted-foreground">{transaction.description}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={transaction.status === 'verified' ? 'default' : 'secondary'}>
                              {transaction.status}
                            </Badge>
                            {transaction.co2Saved && (
                              <Badge variant="outline" className="text-success">
                                {transaction.co2Saved}t CO2 saved
                              </Badge>
                            )}
                          </div>
                          {transaction.transactionId && (
                            <div className="text-xs text-muted-foreground mt-1">
                              ID: {transaction.transactionId}
                            </div>
                          )}
                          {transaction.voucherCode && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Code: {transaction.voucherCode}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          transaction.type === 'earned' ? 'text-success' : 'text-warning'
                        }`}>
                          {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                        </div>
                        <div className="text-sm text-muted-foreground">{transaction.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="redeem">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creditData.redeemOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {option.type === 'upi' && <Smartphone className="h-5 w-5 mr-2" />}
                      {option.type === 'voucher' && <CreditCard className="h-5 w-5 mr-2" />}
                      {option.type === 'donation' && <Award className="h-5 w-5 mr-2" />}
                      {option.title}
                    </CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Min Amount:</span>
                        <span className="font-medium">{option.minAmount} credits</span>
                      </div>
                      {option.maxAmount && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Amount:</span>
                          <span className="font-medium">{option.maxAmount} credits</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Fee:</span>
                        <span className="font-medium">
                          {option.fee === 0 ? 'Free' : `${option.fee} credits`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Time:</span>
                        <span className="font-medium">{option.processingTime}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      disabled={creditData.totalBalance < option.minAmount}
                    >
                      Redeem Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">₹1 = 1 Credit</div>
                    <div className="text-sm text-muted-foreground">Exchange Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">UPI Redemption</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">0%</div>
                    <div className="text-sm text-muted-foreground">Processing Fee</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Credits;