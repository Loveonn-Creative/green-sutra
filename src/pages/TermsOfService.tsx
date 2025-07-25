import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { useState } from "react";

const TermsOfService = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const content = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: December 2024",
      sections: {
        acceptance: {
          title: "1. Acceptance of Terms",
          content: `By accessing and using Biocog's AI-powered sustainability platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.`
        },
        description: {
          title: "2. Service Description", 
          content: `Biocog provides AI-driven tools for Indian MSMEs including:
          • ESG Carbon Tracker for emission monitoring
          • Biocog AI Assistant for vernacular financial guidance  
          • ReCircle E-Waste Tool for responsible waste management
          • Compliance reporting and sustainability analytics`
        },
        eligibility: {
          title: "3. User Eligibility",
          content: `Our services are primarily designed for:
          • Indian Micro, Small, and Medium Enterprises (MSMEs)
          • Registered businesses with valid GST identification
          • Users aged 18 years or older
          • Entities seeking sustainability and compliance solutions`
        },
        acceptable_use: {
          title: "4. Acceptable Use",
          content: `You agree to use our platform only for lawful purposes and in accordance with these terms. Prohibited activities include:
          • Uploading false or fraudulent documents
          • Attempting to reverse engineer our AI algorithms
          • Sharing account credentials with unauthorized parties
          • Using the service for any illegal activities`
        },
        data_usage: {
          title: "5. Data Usage and Privacy",
          content: `By using our services, you consent to:
          • Processing of invoice and business data for emission calculations
          • AI analysis of uploaded documents for sustainability insights
          • Storage of data in India-based secure data centers
          • Compliance with Digital Personal Data Protection Act (DPDP) 2023`
        },
        ai_disclaimer: {
          title: "6. AI and Automation Disclaimer",
          content: `Our AI-powered features provide estimates and recommendations based on available data. Users acknowledge that:
          • Carbon emission calculations are estimates based on industry standards
          • AI recommendations should be validated by qualified professionals
          • Biocog is not liable for decisions made based solely on AI outputs
          • Regular updates may improve accuracy but cannot guarantee perfection`
        },
        payment_terms: {
          title: "7. Payment and Billing",
          content: `For paid services:
          • Payments are processed securely through UPI and bank transfers
          • Subscription fees are non-refundable except as required by law
          • Price changes will be communicated 30 days in advance
          • Failed payments may result in service suspension`
        },
        limitation_of_liability: {
          title: "8. Limitation of Liability",
          content: `Biocog's liability is limited to the maximum extent permitted by Indian law. We are not liable for:
          • Indirect, incidental, or consequential damages
          • Loss of business, profits, or data
          • Service interruptions due to technical issues
          • Third-party integrations or external service failures`
        },
        termination: {
          title: "9. Termination",
          content: `Either party may terminate this agreement:
          • Users may cancel their account at any time
          • Biocog may suspend accounts for terms violations
          • Data export facilities will be provided for 30 days post-termination
          • Certain obligations survive termination including confidentiality`
        },
        governing_law: {
          title: "10. Governing Law",
          content: `These terms are governed by Indian law and subject to the jurisdiction of courts in Bangalore, Karnataka. Any disputes will be resolved through:
          • First, good faith negotiations
          • Mediation if direct negotiation fails
          • Arbitration under Indian Arbitration Act if required`
        }
      }
    },
    hi: {
      title: "सेवा की शर्तें",
      lastUpdated: "अंतिम अपडेट: दिसंबर 2024",
      sections: {
        acceptance: {
          title: "1. शर्तों की स्वीकृति",
          content: `Biocog के AI-संचालित स्थिरता प्लेटफॉर्म का उपयोग करके, आप इन सेवा की शर्तों और सभी लागू कानूनों और नियमों से बाध्य होने के लिए सहमत हैं। यदि आप इनमें से किसी भी शर्त से सहमत नहीं हैं, तो आपको इस सेवा का उपयोग करने से प्रतिबंधित किया गया है।`
        },
        description: {
          title: "2. सेवा विवरण",
          content: `Biocog भारतीय MSMEs के लिए AI-संचालित उपकरण प्रदान करता है जिसमें शामिल हैं:
          • उत्सर्जन निगरानी के लिए ESG कार्बन ट्रैकर
          • देशी वित्तीय मार्गदर्शन के लिए Biocog AI सहायक
          • जिम्मेदार अपशिष्ट प्रबंधन के लिए ReCircle ई-वेस्ट टूल
          • अनुपालन रिपोर्टिंग और स्थिरता विश्लेषण`
        },
        eligibility: {
          title: "3. उपयोगकर्ता पात्रता",
          content: `हमारी सेवाएं मुख्य रूप से इनके लिए डिज़ाइन की गई हैं:
          • भारतीय सूक्ष्म, लघु और मध्यम उद्यम (MSMEs)
          • वैध GST पहचान वाले पंजीकृत व्यवसाय
          • 18 वर्ष या उससे अधिक आयु के उपयोगकर्ता
          • स्थिरता और अनुपालन समाधान चाहने वाली संस्थाएं`
        },
        acceptable_use: {
          title: "4. स्वीकार्य उपयोग",
          content: `आप हमारे प्लेटफॉर्म का उपयोग केवल वैध उद्देश्यों के लिए और इन शर्तों के अनुसार करने के लिए सहमत हैं। निषिद्ध गतिविधियों में शामिल हैं:
          • झूठे या धोखाधड़ी वाले दस्तावेज अपलोड करना
          • हमारे AI एल्गोरिदम को रिवर्स इंजीनियर करने का प्रयास
          • अनधिकृत पार्टियों के साथ खाता क्रेडेंशियल साझा करना
          • किसी भी अवैध गतिविधि के लिए सेवा का उपयोग`
        },
        data_usage: {
          title: "5. डेटा उपयोग और गोपनीयता",
          content: `हमारी सेवाओं का उपयोग करके, आप इस बात के लिए सहमति देते हैं:
          • उत्सर्जन गणना के लिए चालान और व्यावसायिक डेटा की प्रसंस्करण
          • स्थिरता अंतर्दृष्टि के लिए अपलोड किए गए दस्तावेजों का AI विश्लेषण
          • भारत-आधारित सुरक्षित डेटा केंद्रों में डेटा भंडारण
          • डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP) 2023 का अनुपालन`
        },
        ai_disclaimer: {
          title: "6. AI और स्वचालन अस्वीकरण",
          content: `हमारी AI-संचालित सुविधाएं उपलब्ध डेटा के आधार पर अनुमान और सिफारिशें प्रदान करती हैं। उपयोगकर्ता स्वीकार करते हैं कि:
          • कार्बन उत्सर्जन गणना उद्योग मानकों के आधार पर अनुमान हैं
          • AI सिफारिशों को योग्य पेशेवरों द्वारा सत्यापित किया जाना चाहिए
          • Biocog केवल AI आउटपुट के आधार पर लिए गए निर्णयों के लिए उत्तरदायी नहीं है
          • नियमित अपडेट सटीकता में सुधार कर सकते हैं लेकिन पूर्णता की गारंटी नहीं दे सकते`
        },
        payment_terms: {
          title: "7. भुगतान और बिलिंग",
          content: `भुगतान सेवाओं के लिए:
          • भुगतान UPI और बैंक ट्रांसफर के माध्यम से सुरक्षित रूप से संसाधित होते हैं
          • सब्सक्रिप्शन शुल्क कानून द्वारा आवश्यक के अलावा वापसी योग्य नहीं हैं
          • मूल्य परिवर्तन 30 दिन पहले सूचित किए जाएंगे
          • असफल भुगतान के परिणामस्वरूप सेवा निलंबन हो सकता है`
        },
        limitation_of_liability: {
          title: "8. दायित्व की सीमा",
          content: `Biocog की देयता भारतीय कानून द्वारा अनुमतित अधिकतम सीमा तक सीमित है। हम इसके लिए उत्तरदायी नहीं हैं:
          • अप्रत्यक्ष, आकस्मिक, या परिणामी क्षति
          • व्यवसाय, लाभ, या डेटा की हानि
          • तकनीकी मुद्दों के कारण सेवा में बाधा
          • तृतीय-पक्ष एकीकरण या बाहरी सेवा विफलताएं`
        },
        termination: {
          title: "9. समाप्ति",
          content: `कोई भी पक्ष इस समझौते को समाप्त कर सकता है:
          • उपयोगकर्ता किसी भी समय अपना खाता रद्द कर सकते हैं
          • Biocog शर्तों के उल्लंघन के लिए खाते निलंबित कर सकता है
          • समाप्ति के बाद 30 दिनों के लिए डेटा निर्यात सुविधाएं प्रदान की जाएंगी
          • कुछ दायित्व गोपनीयता सहित समाप्ति के बाद भी बने रहते हैं`
        },
        governing_law: {
          title: "10. शासी कानून",
          content: `ये शर्तें भारतीय कानून द्वारा शासित हैं और बैंगलोर, कर्नाटक की अदालतों के क्षेत्राधिकार के अधीन हैं। किसी भी विवाद का समाधान इस प्रकार किया जाएगा:
          • पहले, सद्भावना बातचीत
          • यदि प्रत्यक्ष बातचीत असफल हो तो मध्यस्थता
          • यदि आवश्यक हो तो भारतीय मध्यस्थता अधिनियम के तहत मध्यस्थता`
        }
      }
    }
  };

  const currentContent = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {currentContent.title}
            </h1>
            <p className="text-muted-foreground">{currentContent.lastUpdated}</p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-gray max-w-none">
            {Object.entries(currentContent.sections).map(([key, section]) => (
              <div key={key} className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-16 p-6 bg-accent/50 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {currentLanguage === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
            </h3>
            <p className="text-muted-foreground">
              {currentLanguage === 'hi' 
                ? 'इन शर्तों के बारे में प्रश्नों के लिए, कृपया संपर्क करें: '
                : 'For questions about these terms, please contact: '
              }
              <a href="mailto:legal@biocog.ai" className="text-primary hover:underline">
                legal@biocog.ai
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default TermsOfService;