-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('trader', 'manufacturer')),
  company_name TEXT,
  contact_person TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  gst_number TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  ui_theme TEXT DEFAULT 'suit' CHECK (ui_theme IN ('sari', 'suit')),
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ESG reports table
CREATE TABLE public.esg_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_name TEXT NOT NULL,
  reporting_period TEXT NOT NULL,
  emissions_scope1 DECIMAL(10,2) DEFAULT 0,
  emissions_scope2 DECIMAL(10,2) DEFAULT 0,
  emissions_scope3 DECIMAL(10,2) DEFAULT 0,
  waste_generated DECIMAL(10,2) DEFAULT 0,
  waste_recycled DECIMAL(10,2) DEFAULT 0,
  water_consumption DECIMAL(10,2) DEFAULT 0,
  energy_consumption DECIMAL(10,2) DEFAULT 0,
  renewable_energy_percent DECIMAL(5,2) DEFAULT 0,
  employee_count INTEGER DEFAULT 0,
  safety_incidents INTEGER DEFAULT 0,
  diversity_score DECIMAL(5,2) DEFAULT 0,
  overall_esg_score DECIMAL(5,2) DEFAULT 0,
  green_cibil_score DECIMAL(5,2) DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'verified')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create carbon credits table
CREATE TABLE public.carbon_credits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_earned DECIMAL(10,2) NOT NULL DEFAULT 0,
  credits_redeemed DECIMAL(10,2) NOT NULL DEFAULT 0,
  credits_balance DECIMAL(10,2) NOT NULL DEFAULT 0,
  source_type TEXT NOT NULL CHECK (source_type IN ('emission_reduction', 'renewable_energy', 'waste_recycling', 'esg_improvement')),
  source_description TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  transaction_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create e-waste ledger table
CREATE TABLE public.ewaste_ledger (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submission_id TEXT NOT NULL UNIQUE,
  weight_kg DECIMAL(10,2) NOT NULL,
  recycler_id TEXT NOT NULL,
  recycler_name TEXT NOT NULL,
  waste_type TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  carbon_credits_earned DECIMAL(10,2) DEFAULT 0,
  record_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI mandi listings table
CREATE TABLE public.mandi_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  manufacturer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_category TEXT NOT NULL,
  carbon_efficiency_score DECIMAL(5,2) NOT NULL,
  solar_powered BOOLEAN DEFAULT false,
  location_city TEXT NOT NULL,
  location_state TEXT NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  minimum_order_quantity INTEGER NOT NULL,
  delivery_time_days INTEGER NOT NULL,
  certifications TEXT[],
  description TEXT,
  images TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gamification achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  achievement_title TEXT NOT NULL,
  achievement_description TEXT NOT NULL,
  points_earned INTEGER NOT NULL DEFAULT 0,
  badge_icon TEXT,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esg_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ewaste_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandi_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for ESG reports
CREATE POLICY "Users can view their own ESG reports" ON public.esg_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own ESG reports" ON public.esg_reports
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for carbon credits
CREATE POLICY "Users can view their own carbon credits" ON public.carbon_credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own carbon credits" ON public.carbon_credits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for e-waste ledger
CREATE POLICY "Users can view their own e-waste records" ON public.ewaste_ledger
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own e-waste records" ON public.ewaste_ledger
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for mandi listings
CREATE POLICY "Everyone can view active mandi listings" ON public.mandi_listings
  FOR SELECT USING (is_active = true);

CREATE POLICY "Manufacturers can manage their own listings" ON public.mandi_listings
  FOR ALL USING (auth.uid() = manufacturer_id);

-- Create RLS policies for achievements
CREATE POLICY "Users can view their own achievements" ON public.achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON public.achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_esg_reports_updated_at
  BEFORE UPDATE ON public.esg_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mandi_listings_updated_at
  BEFORE UPDATE ON public.mandi_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();