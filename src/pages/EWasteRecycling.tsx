import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, MapPin, Calendar, Gift } from "lucide-react";

const EWasteRecycling = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ReCircle E-Waste Tool</h1>
            <p className="text-muted-foreground">Connect with verified recyclers for responsible e-waste disposal</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Recycle className="h-5 w-5" />
                  <span>Submit Waste</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Add your electronic waste items</p>
                <Button className="w-full">Add Items</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Find Recyclers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Match with local verified recyclers</p>
                <Button variant="outline" className="w-full">Find Near Me</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Pickup</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Book convenient pickup slots</p>
                <Button variant="secondary" className="w-full">Schedule</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5" />
                  <span>Track Incentives</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Monitor your recycling rewards</p>
                <Button variant="outline" className="w-full">View Rewards</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default EWasteRecycling;