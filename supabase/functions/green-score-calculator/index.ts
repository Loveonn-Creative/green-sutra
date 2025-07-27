import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeatherData {
  temperature: number;
  humidity: number;
  aqi?: number;
}

interface ESGData {
  emissions_scope1: number;
  emissions_scope2: number;
  emissions_scope3: number;
  energy_consumption: number;
  renewable_energy_percent: number;
  water_consumption: number;
  waste_generated: number;
  waste_recycled: number;
  safety_incidents: number;
  employee_count: number;
}

interface CarbonCreditsData {
  credits_earned: number;
  credits_redeemed: number;
  credits_balance: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, location = { lat: 28.6139, lon: 77.2090 } } = await req.json(); // Default to Delhi

    // Initialize Supabase client
    const supabaseUrl = 'https://dpgqvecblgvhtouclfqd.supabase.co';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl, supabaseServiceKey!);

    // Fetch user's ESG data
    const { data: esgData } = await supabase
      .from('esg_reports')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Fetch user's carbon credits
    const { data: creditsData } = await supabase
      .from('carbon_credits')
      .select('*')
      .eq('user_id', userId);

    // Fetch weather data (mock IMD API)
    const weatherData: WeatherData = await fetchWeatherData(location.lat, location.lon);

    // Calculate Green CIBIL Score
    const score = calculateGreenScore(esgData, creditsData, weatherData);

    return new Response(JSON.stringify({ 
      score: score.overall,
      factors: score.factors,
      recommendations: score.recommendations,
      weatherContext: weatherData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in green-score-calculator:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    // In real implementation, use IMD API
    // For demo, return mock data with seasonal variations
    const month = new Date().getMonth();
    const isSummer = month >= 3 && month <= 5;
    const isMonsoon = month >= 6 && month <= 9;
    
    return {
      temperature: isSummer ? 42 : isMonsoon ? 28 : 18,
      humidity: isMonsoon ? 85 : isSummer ? 45 : 60,
      aqi: Math.floor(Math.random() * 200) + 50 // Mock AQI
    };
  } catch (error) {
    // Fallback data
    return { temperature: 25, humidity: 60, aqi: 150 };
  }
}

function calculateGreenScore(
  esgData: ESGData | null, 
  creditsData: CarbonCreditsData[] | null, 
  weatherData: WeatherData
): {
  overall: number;
  factors: {
    carbonEfficiency: number;
    wasteManagement: number;
    energyUsage: number;
    compliance: number;
  };
  recommendations: string[];
} {
  const factors = {
    carbonEfficiency: 0,
    wasteManagement: 0,
    energyUsage: 0,
    compliance: 0
  };

  const recommendations: string[] = [];

  if (esgData) {
    // Carbon Efficiency (0-100)
    const totalEmissions = (esgData.emissions_scope1 || 0) + (esgData.emissions_scope2 || 0) + (esgData.emissions_scope3 || 0);
    factors.carbonEfficiency = Math.max(0, Math.min(100, 100 - (totalEmissions / 1000) * 10));
    
    if (factors.carbonEfficiency < 70) {
      recommendations.push("Reduce Scope 1 & 2 emissions by implementing energy-efficient practices");
    }

    // Waste Management (0-100)
    const wasteRecycledRatio = esgData.waste_generated > 0 ? (esgData.waste_recycled / esgData.waste_generated) * 100 : 50;
    factors.wasteManagement = Math.min(100, wasteRecycledRatio);
    
    if (factors.wasteManagement < 80) {
      recommendations.push("Increase waste recycling rate - connect with verified recyclers through ReCircle");
    }

    // Energy Usage (0-100)
    factors.energyUsage = Math.min(100, (esgData.renewable_energy_percent || 0));
    
    if (factors.energyUsage < 60) {
      recommendations.push("Transition to renewable energy sources - explore solar/wind options");
    }

    // Compliance (0-100)
    const safetyScore = esgData.employee_count > 0 ? Math.max(0, 100 - (esgData.safety_incidents / esgData.employee_count) * 100) : 80;
    factors.compliance = safetyScore;
    
    if (factors.compliance < 90) {
      recommendations.push("Improve workplace safety measures and ESG compliance reporting");
    }
  } else {
    // Default scores for new users
    factors.carbonEfficiency = 50;
    factors.wasteManagement = 40;
    factors.energyUsage = 30;
    factors.compliance = 60;
    recommendations.push("Start tracking your ESG data to improve your Green CIBIL Score");
  }

  // Carbon Credits Bonus
  const totalCredits = creditsData?.reduce((sum, credit) => sum + credit.credits_earned, 0) || 0;
  const creditsBonus = Math.min(20, totalCredits / 10); // Max 20 bonus points

  // Weather Context Adjustment
  let weatherAdjustment = 0;
  if (weatherData.aqi && weatherData.aqi > 200) {
    weatherAdjustment = -5; // Penalty for high pollution areas
    recommendations.push("Consider air quality improvement initiatives due to high local AQI");
  } else if (weatherData.aqi && weatherData.aqi < 100) {
    weatherAdjustment = 2; // Bonus for clean air areas
  }

  // Calculate overall score
  const baseScore = (factors.carbonEfficiency + factors.wasteManagement + factors.energyUsage + factors.compliance) / 4;
  const overall = Math.min(100, Math.max(0, baseScore + creditsBonus + weatherAdjustment));

  return {
    overall: Math.round(overall),
    factors,
    recommendations
  };
}