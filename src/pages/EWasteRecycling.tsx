import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, MapPin, Calendar, Gift } from "lucide-react";
import EWasteModal from "@/components/e-waste/EWasteModal";
import { toast } from "sonner";

const EWasteRecycling = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

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
    toast.success("Current rewards: 150 carbon credits!", {
      description: "Keep recycling to earn more credits"
    });
  };

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
                <EWasteModal 
                  trigger={<Button className="w-full">Add Items</Button>}
                  onSubmit={(items) => console.log('Submitted items:', items)}
                />
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
                <Button variant="outline" className="w-full" onClick={handleFindRecyclers}>Find Near Me</Button>
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
                <Button variant="secondary" className="w-full" onClick={handleSchedulePickup}>Schedule</Button>
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
                <Button variant="outline" className="w-full" onClick={handleViewRewards}>View Rewards</Button>
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