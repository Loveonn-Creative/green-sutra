-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically call the function when a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies for better security
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Create function to get user role for routing
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid)
RETURNS text AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE user_id = user_uuid LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;