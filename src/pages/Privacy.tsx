import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";

const Privacy = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: January 2024</p>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  submit carbon footprint data, or contact us for support.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide and maintain our sustainability platform</li>
                  <li>Calculate and track your carbon footprint</li>
                  <li>Generate ESG reports and green credit recommendations</li>
                  <li>Facilitate connections with verified recyclers</li>
                  <li>Improve our AI-powered analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at 
                  <a href="mailto:privacy@biocog.ai" className="text-primary hover:underline ml-1">
                    privacy@biocog.ai
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Privacy;