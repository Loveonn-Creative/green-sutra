-- Create admin_requests table for user approval requests
CREATE TABLE public.admin_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  user_role TEXT NOT NULL,
  company_name TEXT,
  contact_person TEXT,
  phone TEXT,
  request_type TEXT NOT NULL DEFAULT 'signup_approval',
  status TEXT NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID,
  admin_notes TEXT
);

-- Enable RLS
ALTER TABLE public.admin_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for users to insert their own requests
CREATE POLICY "Users can create approval requests" 
ON public.admin_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for admins to view all requests (we'll use a role check later)
CREATE POLICY "Admin can view all requests" 
ON public.admin_requests 
FOR SELECT 
USING (true);

-- Create policy for admins to update requests
CREATE POLICY "Admin can update requests" 
ON public.admin_requests 
FOR UPDATE 
USING (true);

-- Create contact_submissions table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new',
  responded_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT
);

-- Enable RLS for contact submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Admin can view all submissions
CREATE POLICY "Admin can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (true);

-- Admin can update submissions
CREATE POLICY "Admin can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (true);

-- Create demo_requests table
CREATE TABLE public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  interest TEXT,
  message TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT
);

-- Enable RLS for demo requests
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit demo requests
CREATE POLICY "Anyone can submit demo requests" 
ON public.demo_requests 
FOR INSERT 
WITH CHECK (true);

-- Admin can view all demo requests
CREATE POLICY "Admin can view all demo requests" 
ON public.demo_requests 
FOR SELECT 
USING (true);

-- Admin can update demo requests
CREATE POLICY "Admin can update demo requests" 
ON public.demo_requests 
FOR UPDATE 
USING (true);

-- Add approval_status to profiles table
ALTER TABLE public.profiles 
ADD COLUMN approval_status TEXT DEFAULT 'approved';

-- Create function to calculate carbon credits based on Indian standards
CREATE OR REPLACE FUNCTION public.calculate_carbon_credits_india(
  energy_kwh NUMERIC DEFAULT 0,
  fuel_liters NUMERIC DEFAULT 0,
  waste_recycled_kg NUMERIC DEFAULT 0,
  renewable_energy_percent NUMERIC DEFAULT 0
) RETURNS NUMERIC AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to calculate Green CIBIL score based on Indian ESG standards
CREATE OR REPLACE FUNCTION public.calculate_green_cibil_score(
  esg_score NUMERIC DEFAULT 0,
  carbon_credits NUMERIC DEFAULT 0,
  compliance_score NUMERIC DEFAULT 0,
  waste_management_score NUMERIC DEFAULT 0
) RETURNS NUMERIC AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;