-- Create storage bucket for invoice PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('invoices', 'invoices', false, 1048576, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Only service role can upload (webhook). Authenticated users can download their own invoices.
-- Storage path convention: {store}/{order_id}.pdf
-- RLS: users can read invoices for orders matching their email
CREATE POLICY "Users read own invoices"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'invoices'
  AND EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = REPLACE(SPLIT_PART(storage.objects.name, '/', 2), '.pdf', '')
      AND orders.email = auth.jwt()->>'email'
  )
);
