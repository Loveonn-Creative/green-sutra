-- Fix function search path security issues
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role, preferred_language, ui_theme, onboarding_completed)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'role', 'trader'),
    'en',
    'suit',
    false
  );
  RETURN NEW;
END;
$$;

-- Fix get_user_role function search path
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE user_id = user_uuid LIMIT 1);
END;
$$;