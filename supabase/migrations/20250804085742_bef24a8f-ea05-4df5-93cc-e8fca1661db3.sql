-- Create OTP verification table for phone-based authentication
CREATE TABLE public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone VARCHAR(15) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies for OTP verification
CREATE POLICY "Users can verify their own OTP" 
ON public.otp_verifications 
FOR ALL
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create support tickets table
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Create policies for support tickets
CREATE POLICY "Users can manage their own support tickets" 
ON public.support_tickets 
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all support tickets"
ON public.support_tickets
FOR SELECT
USING (true);

-- Create carbon calculations table for real tracking
CREATE TABLE public.carbon_calculations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  calculation_type TEXT NOT NULL, -- 'energy', 'waste', 'transport', etc.
  input_data JSONB NOT NULL, -- Store calculation inputs
  carbon_saved NUMERIC NOT NULL DEFAULT 0,
  carbon_credits_earned NUMERIC NOT NULL DEFAULT 0,
  calculation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.carbon_calculations ENABLE ROW LEVEL SECURITY;

-- Create policies for carbon calculations
CREATE POLICY "Users can manage their own carbon calculations" 
ON public.carbon_calculations 
FOR ALL
USING (auth.uid() = user_id);

-- Create pickup schedules table for e-waste management
CREATE TABLE public.pickup_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pickup_type TEXT NOT NULL, -- 'e-waste', 'recyclables', etc.
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  address TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  items_description TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'confirmed', 'picked_up', 'cancelled'
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pickup_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for pickup schedules
CREATE POLICY "Users can manage their own pickup schedules" 
ON public.pickup_schedules 
FOR ALL
USING (auth.uid() = user_id);

-- Create feedback surveys table for AI recommendations
CREATE TABLE public.feedback_surveys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  survey_type TEXT NOT NULL, -- 'supplier_feedback', 'platform_feedback', etc.
  responses JSONB NOT NULL, -- Store survey responses
  ai_recommendations JSONB, -- Store AI-generated recommendations
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback_surveys ENABLE ROW LEVEL SECURITY;

-- Create policies for feedback surveys
CREATE POLICY "Users can manage their own feedback surveys" 
ON public.feedback_surveys 
FOR ALL
USING (auth.uid() = user_id);

-- Add language preference and phone verification to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS regional_language TEXT,
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS total_carbon_saved NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_credits_earned NUMERIC DEFAULT 0;

-- Create trigger for automatic timestamp updates on all tables
CREATE TRIGGER update_support_tickets_updated_at
BEFORE UPDATE ON public.support_tickets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pickup_schedules_updated_at
BEFORE UPDATE ON public.pickup_schedules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_otp_verifications_phone ON public.otp_verifications(phone);
CREATE INDEX idx_otp_verifications_expires_at ON public.otp_verifications(expires_at);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_carbon_calculations_user_date ON public.carbon_calculations(user_id, calculation_date);
CREATE INDEX idx_pickup_schedules_user_status ON public.pickup_schedules(user_id, status);