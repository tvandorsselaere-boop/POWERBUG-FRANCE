-- Migration 012 : Correction prix housse-transport (30€ → 40€ pour aligner sur golfdesmarques.com)

UPDATE products SET base_price = 40
WHERE slug = 'housse-transport' AND store = 'powerbug';

UPDATE product_variants SET price = 40
WHERE product_id = (SELECT id FROM products WHERE slug = 'housse-transport' AND store = 'powerbug');
