-- Add stores array to profiles for multi-site user identification
-- Each site tags users at sign-up. A user can be on both sites.

-- 1. Add stores column (empty array by default)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stores TEXT[] DEFAULT '{}';

-- 2. Tag all existing profiles as golf-shop (they were created from Golf-Shop)
UPDATE profiles SET stores = ARRAY['golf-shop'] WHERE stores = '{}' OR stores IS NULL;

-- 3. Update the trigger to set the store from user metadata at sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_store TEXT;
BEGIN
  user_store := NEW.raw_user_meta_data->>'store';

  INSERT INTO public.profiles (id, full_name, stores)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    CASE
      WHEN user_store IS NOT NULL THEN ARRAY[user_store]
      ELSE '{}'::TEXT[]
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
