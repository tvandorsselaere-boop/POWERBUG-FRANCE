-- 017: Add UNIQUE constraint on payment_id + index on email
-- Prevents duplicate orders from concurrent webhooks
-- Speeds up customer order lookups by email

-- Idempotency: ensure one order per Stripe payment
ALTER TABLE orders ADD CONSTRAINT orders_payment_id_unique UNIQUE (payment_id);

-- Performance: fast lookup when customer views their orders
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
