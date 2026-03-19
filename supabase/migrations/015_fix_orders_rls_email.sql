-- Fix: allow users to read their own orders by email (not just user_id)
-- The Stripe webhook stores email but not user_id, so the existing RLS policy
-- "Users read own orders" (auth.uid() = user_id) blocks all reads.

-- Drop the old policy and replace with one that checks both user_id OR email
DROP POLICY IF EXISTS "Users read own orders" ON orders;

CREATE POLICY "Users read own orders" ON orders
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR email = auth.jwt()->>'email'
  );
