-- Fix security warnings by adding search_path to functions
DROP FUNCTION IF EXISTS public.calculate_carbon_credits_india(NUMERIC, NUMERIC, NUMERIC, NUMERIC);
DROP FUNCTION IF EXISTS public.calculate_green_cibil_score(NUMERIC, NUMERIC, NUMERIC, NUMERIC);

-- Recreate functions with proper security
CREATE OR REPLACE FUNCTION public.calculate_carbon_credits_india(
  energy_kwh NUMERIC DEFAULT 0,
  fuel_liters NUMERIC DEFAULT 0,
  waste_recycled_kg NUMERIC DEFAULT 0,
  renewable_energy_percent NUMERIC DEFAULT 0
) RETURNS NUMERIC 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = 'public'
AS $$
DECLARE
  total_credits NUMERIC := 0;
  energy_factor NUMERIC := 0.82; -- CO2 kg per kWh (India grid emission factor)
  fuel_factor NUMERIC := 2.31; -- CO2 kg per liter of diesel
  waste_factor NUMERIC := 0.5; -- Credits per kg of waste recycled
  renewable_bonus NUMERIC := 0.1; -- Bonus factor for renewable energy
BEGIN
  -- Energy efficiency credits (reduced emissions)
  total_credits := total_credits + (energy_kwh * energy_factor * 0.001); -- Convert to tons
  
  -- Fuel efficiency credits  
  total_credits := total_credits + (fuel_liters * fuel_factor * 0.001); -- Convert to tons
  
  -- Waste recycling credits
  total_credits := total_credits + (waste_recycled_kg * waste_factor * 0.001); -- Convert to tons
  
  -- Renewable energy bonus
  IF renewable_energy_percent > 0 THEN
    total_credits := total_credits + (total_credits * renewable_energy_percent / 100 * renewable_bonus);
  END IF;
  
  RETURN GREATEST(total_credits, 0); -- Ensure non-negative
END;
$$;

-- Create function to calculate Green CIBIL score based on Indian ESG standards
CREATE OR REPLACE FUNCTION public.calculate_green_cibil_score(
  esg_score NUMERIC DEFAULT 0,
  carbon_credits NUMERIC DEFAULT 0,
  compliance_score NUMERIC DEFAULT 0,
  waste_management_score NUMERIC DEFAULT 0
) RETURNS NUMERIC 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = 'public'
AS $$
DECLARE
  base_score NUMERIC := 300; -- Minimum score
  max_score NUMERIC := 900; -- Maximum score
  final_score NUMERIC;
BEGIN
  -- Weighted calculation based on Indian sustainability metrics
  final_score := base_score + 
    (esg_score * 3) + -- ESG has highest weight
    (carbon_credits * 2) + -- Carbon credits significant weight
    (compliance_score * 2.5) + -- Compliance very important in India
    (waste_management_score * 1.5); -- Waste management weight
  
  -- Cap the score between 300 and 900
  final_score := GREATEST(LEAST(final_score, max_score), base_score);
  
  RETURN ROUND(final_score);
END;
$$;