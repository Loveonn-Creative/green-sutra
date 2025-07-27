import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, language = 'en', context = 'general' } = await req.json();

    const systemPrompts = {
      en: `You are Biocog AI Assistant, an expert in sustainability, carbon tracking, financial guidance, and waste management for Indian MSMEs. Provide helpful, practical advice in a friendly tone. Focus on:
      - Carbon footprint tracking and reduction
      - ESG compliance and reporting
      - Financial literacy and MSME loans
      - E-waste management and recycling
      - Tax benefits for green initiatives
      Keep responses concise and actionable.`,
      
      hi: `आप Biocog AI असिस्टेंट हैं, भारतीय MSMEs के लिए स्थिरता, कार्बन ट्रैकिंग, वित्तीय मार्गदर्शन और अपशिष्ट प्रबंधन के विशेषज्ञ हैं। मित्रवत स्वर में सहायक, व्यावहारिक सलाह दें। फोकस करें:
      - कार्बन फुटप्रिंट ट्रैकिंग और कमी
      - ESG अनुपालन और रिपोर्टिंग
      - वित्तीय साक्षरता और MSME लोन
      - ई-वेस्ट प्रबंधन और रीसाइक्लिंग
      - हरित पहलों के लिए कर लाभ
      जवाब संक्षिप्त और कार्यान्वित करने योग्य रखें।`
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});