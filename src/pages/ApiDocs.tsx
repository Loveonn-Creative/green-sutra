import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Key, Database, Zap } from "lucide-react";

const ApiDocs = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const endpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/carbon-footprint",
      description: "Get carbon footprint data for a user",
      params: ["user_id", "date_range"]
    },
    {
      method: "POST",
      endpoint: "/api/v1/invoice-scan",
      description: "Submit invoice for carbon footprint calculation",
      params: ["file", "invoice_data"]
    },
    {
      method: "GET",
      endpoint: "/api/v1/esg-score",
      description: "Get ESG score and recommendations",
      params: ["user_id"]
    },
    {
      method: "POST",
      endpoint: "/api/v1/ewaste-submission",
      description: "Submit e-waste for recycling",
      params: ["waste_items", "location"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Integrate Biocog's sustainability platform into your applications with our comprehensive REST API
            </p>
          </div>

          {/* Getting Started */}
          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-primary" />
                  <span>Authentication</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Use API keys for secure access to our endpoints
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-primary" />
                  <span>Data Formats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  JSON-based request and response formats
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Rate Limits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  1000 requests per hour for standard plans
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span>SDKs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Available for Python, Node.js, and Java
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Base URL */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Base URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <code className="text-sm">https://api.biocog.ai</code>
              </div>
            </CardContent>
          </Card>

          {/* Endpoints */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold">API Endpoints</h2>
            {endpoints.map((endpoint, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm">{endpoint.endpoint}</code>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{endpoint.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Parameters:</h4>
                    <div className="flex flex-wrap gap-2">
                      {endpoint.params.map((param, i) => (
                        <Badge key={i} variant="outline">{param}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Code Example */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Example Request</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`curl -X GET "https://api.biocog.ai/v1/carbon-footprint" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "123",
    "date_range": "2024-01-01,2024-01-31"
  }'`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Our technical team is here to help you integrate our API
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:api-support@biocog.ai"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                Contact API Support
              </a>
              <a 
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-input text-base font-medium rounded-md hover:bg-accent"
              >
                View Examples
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default ApiDocs;