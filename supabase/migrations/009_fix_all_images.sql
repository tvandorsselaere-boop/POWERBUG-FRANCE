-- Migration 009 : Fix complet images produits PowerBug
-- Supprime les anciennes entrées et réinsère proprement pour tous les produits

-- ============================================================
-- Nettoyer et réinsérer toutes les images accessoires
-- ============================================================

DELETE FROM product_images
WHERE product_id IN (
  SELECT id FROM products WHERE store = 'powerbug'
  AND slug IN (
    'scorecard-holder', 'drinks-holder', 'mitaines-electriques',
    'umbrella-holder-extension', 'housse-transport', 'porte-parapluie',
    'support-telephone', 'sac-isotherme', 'sac-rangement',
    'moteur-200w-nx', 'moteur-nx-dhc', 'chargeur-batterie', 'roue-avant-complete'
  )
);

-- Porte-scorecard NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/score-card-holder.jpg.webp', 'Porte-scorecard NX PowerBug', 1, true
FROM products WHERE slug = 'scorecard-holder' AND store = 'powerbug';

-- Porte-gobelet NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/NX-Drink-Holder-Main-min.jpg.webp', 'Porte-gobelet NX PowerBug', 1, true
FROM products WHERE slug = 'drinks-holder' AND store = 'powerbug';

-- Mitaines chauffantes NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/Heated-Mitt-Main-min.jpg.webp', 'Mitaines chauffantes NX PowerBug', 1, true
FROM products WHERE slug = 'mitaines-electriques' AND store = 'powerbug';

-- Extension porte-parapluie NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/umbrella-holder-extension.jpg.webp', 'Extension porte-parapluie NX PowerBug', 1, true
FROM products WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug';

-- Housse de transport NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/bug-bag.jpg.webp', 'Housse de transport NX PowerBug', 1, true
FROM products WHERE slug = 'housse-transport' AND store = 'powerbug';

-- Porte-parapluie NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/NX-Umbrella-Holder-min.jpg.webp', 'Porte-parapluie NX PowerBug', 1, true
FROM products WHERE slug = 'porte-parapluie' AND store = 'powerbug';

-- Support téléphone NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/GPS-Holder-1-min.jpg.webp', 'Support telephone NX PowerBug', 1, true
FROM products WHERE slug = 'support-telephone' AND store = 'powerbug';

-- Sac isotherme NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/sac-isotherme-nx.jpg', 'Sac isotherme NX PowerBug', 1, true
FROM products WHERE slug = 'sac-isotherme' AND store = 'powerbug';

-- Sac de rangement NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/bug-bag.jpg.webp', 'Sac de rangement NX PowerBug', 1, true
FROM products WHERE slug = 'sac-rangement' AND store = 'powerbug';

-- Moteur 200W NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/moteur-200w-nx.jpg', 'Moteur 200W NX PowerBug', 1, true
FROM products WHERE slug = 'moteur-200w-nx' AND store = 'powerbug';

-- Moteur NX DHC
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/moteur-nx-dhc.jpg', 'Moteur NX DHC PowerBug', 1, true
FROM products WHERE slug = 'moteur-nx-dhc' AND store = 'powerbug';
