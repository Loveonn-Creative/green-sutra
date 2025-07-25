import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Scan, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScanInvoice = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      setIsScanning(true);
      // Simulate camera scanning
      setTimeout(() => {
        setScannedData({
          vendor: "ABC Electronics Pvt Ltd",
          amount: "₹45,000",
          items: ["LED TVs", "Mobile Phones"],
          co2Estimate: "2.3 kg CO₂"
        });
        setIsScanning(false);
        toast({
          title: "Invoice scanned successfully!",
          description: "CO₂ emissions calculated automatically."
        });
      }, 2000);
    } catch (error) {
      setIsScanning(false);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access or upload a file instead.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      setIsScanning(true);
      setTimeout(() => {
        setScannedData({
          vendor: "XYZ Trading Company",
          amount: "₹28,500",
          items: ["Office Supplies", "Electronics"],
          co2Estimate: "1.8 kg CO₂"
        });
        setIsScanning(false);
        toast({
          title: "Invoice processed successfully!",
          description: "Carbon footprint analysis complete."
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">AI Invoice Scanner</h1>
            <p className="text-muted-foreground">Scan invoices instantly to calculate carbon emissions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Scanning Options */}
            <Card>
              <CardHeader>
                <CardTitle>Scan Your Invoice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={startCamera}
                  disabled={isScanning}
                  className="w-full h-20 flex flex-col items-center space-y-2"
                >
                  <Camera className="h-8 w-8" />
                  <span>{isScanning ? "Scanning..." : "Use Camera"}</span>
                </Button>

                <div className="relative">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    disabled={isScanning}
                    className="w-full h-20 flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8" />
                    <span>Upload File</span>
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {isScanning && (
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <Scan className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                    <p>Processing invoice with AI...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Scan Results</CardTitle>
              </CardHeader>
              <CardContent>
                {scannedData ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <h3 className="font-semibold mb-2">Invoice Details</h3>
                      <p><strong>Vendor:</strong> {scannedData.vendor}</p>
                      <p><strong>Amount:</strong> {scannedData.amount}</p>
                      <p><strong>Items:</strong> {scannedData.items.join(", ")}</p>
                    </div>
                    
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <h3 className="font-semibold mb-2">Carbon Impact</h3>
                      <p className="text-2xl font-bold text-primary">{scannedData.co2Estimate}</p>
                      <p className="text-sm text-muted-foreground">Estimated CO₂ emissions</p>
                    </div>

                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate ESG Report
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Scan or upload an invoice to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default ScanInvoice;