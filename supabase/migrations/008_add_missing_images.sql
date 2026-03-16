-- Migration 008 : Ajouter les images manquantes pour les nouveaux produits accessoires
-- À jouer après migration 007

-- ============================================================
-- Images accessoires (URLs publiques /images/accessoires/)
-- ============================================================

-- Support téléphone NX → GPS-Holder-1-min.jpg.webp
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/GPS-Holder-1-min.jpg.webp', 'Support telephone NX PowerBug', 1, true
FROM products WHERE slug = 'support-telephone' AND store = 'powerbug'
ON CONFLICT DO NOTHING;

-- Sac rangement NX → bug-bag.jpg.webp
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/bug-bag.jpg.webp', 'Sac de rangement NX PowerBug', 1, true
FROM products WHERE slug = 'sac-rangement' AND store = 'powerbug'
ON CONFLICT DO NOTHING;

-- Housse de transport NX → bug-bag.jpg.webp (même image, c'est un sac de transport)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/bug-bag.jpg.webp', 'Housse de transport NX PowerBug', 1, true
FROM products WHERE slug = 'housse-transport' AND store = 'powerbug'
  AND NOT EXISTS (
    SELECT 1 FROM product_images pi WHERE pi.product_id = products.id
  );

-- ============================================================
-- Vérifier que les images existantes ont bien leur lien en DB
-- (pour les produits qui avaient déjà une image physique)
-- ============================================================

-- Scorecard holder
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/score-card-holder.jpg.webp', 'Porte-scorecard NX PowerBug', 1, true
FROM products WHERE slug = 'scorecard-holder' AND store = 'powerbug'
  AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = products.id)
ON CONFLICT DO NOTHING;

-- Porte-parapluie
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/NX-Umbrella-Holder-min.jpg.webp', 'Porte-parapluie NX PowerBug', 1, true
FROM products WHERE slug = 'porte-parapluie' AND store = 'powerbug'
  AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = products.id)
ON CONFLICT DO NOTHING;

-- Extension porte-parapluie
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/umbrella-holder-extension.jpg.webp', 'Extension porte-parapluie NX PowerBug', 1, true
FROM products WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug'
  AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = products.id)
ON CONFLICT DO NOTHING;

-- Porte-gobelet
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/NX-Drink-Holder-Main-min.jpg.webp', 'Porte-gobelet NX PowerBug', 1, true
FROM products WHERE slug = 'drinks-holder' AND store = 'powerbug'
  AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = products.id)
ON CONFLICT DO NOTHING;

-- Mitaines chauffantes
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/Heated-Mitt-Main-min.jpg.webp', 'Mitaines chauffantes NX PowerBug', 1, true
FROM products WHERE slug = 'mitaines-electriques' AND store = 'powerbug'
  AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = products.id)
ON CONFLICT DO NOTHING;
