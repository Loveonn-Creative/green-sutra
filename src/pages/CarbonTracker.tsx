import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Upload, FileText, TrendingDown } from "lucide-react";

const CarbonTracker = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ESG Carbon Tracker</h1>
            <p className="text-muted-foreground">Track, analyze, and reduce your carbon footprint with AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Invoices</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Upload your invoices to automatically calculate CO₂ emissions</p>
                <Button className="w-full">Upload Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">View detailed carbon analytics and trends</p>
                <Button variant="outline" className="w-full">View Analytics</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>ESG Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Generate compliance reports in PDF & Excel</p>
                <Button variant="secondary" className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default CarbonTracker;