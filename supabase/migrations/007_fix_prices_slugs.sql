-- Migration 007 : Correction prix + slugs (à jouer après 005 si 006 n'avait pas encore tourné)
-- À jouer dans Supabase SQL Editor

-- ============================================================
-- 1. Renommer les slugs (idempotent)
-- ============================================================

UPDATE products SET slug = 'scorecard-holder'
WHERE slug = 'porte-scorecard' AND store = 'powerbug';

UPDATE products SET slug = 'drinks-holder'
WHERE slug = 'porte-boisson' AND store = 'powerbug';

UPDATE products SET slug = 'mitaines-electriques'
WHERE slug = 'mitaines-chauffantes' AND store = 'powerbug';

UPDATE products SET slug = 'umbrella-holder-extension'
WHERE slug = 'extension-porte-sac' AND store = 'powerbug';

-- ============================================================
-- 2. Corriger les prix accessoires (avec les bons slugs)
-- ============================================================

UPDATE products SET base_price = 30
WHERE slug = 'scorecard-holder' AND store = 'powerbug';
UPDATE product_variants SET price = 30
WHERE product_id = (SELECT id FROM products WHERE slug = 'scorecard-holder' AND store = 'powerbug');

UPDATE products SET base_price = 20
WHERE slug = 'drinks-holder' AND store = 'powerbug';
UPDATE product_variants SET price = 20
WHERE product_id = (SELECT id FROM products WHERE slug = 'drinks-holder' AND store = 'powerbug');

UPDATE products SET base_price = 60
WHERE slug = 'mitaines-electriques' AND store = 'powerbug';
UPDATE product_variants SET price = 60
WHERE product_id = (SELECT id FROM products WHERE slug = 'mitaines-electriques' AND store = 'powerbug');

UPDATE products SET base_price = 25
WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug';
UPDATE product_variants SET price = 25
WHERE product_id = (SELECT id FROM products WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug');

UPDATE products SET base_price = 30
WHERE slug = 'housse-transport' AND store = 'powerbug';
UPDATE product_variants SET price = 30
WHERE product_id = (SELECT id FROM products WHERE slug = 'housse-transport' AND store = 'powerbug');

UPDATE products SET base_price = 30
WHERE slug = 'porte-parapluie' AND store = 'powerbug';
UPDATE product_variants SET price = 30
WHERE product_id = (SELECT id FROM products WHERE slug = 'porte-parapluie' AND store = 'powerbug');

-- ============================================================
-- 3. Déplacer le chargeur vers pieces-detachees
--    (était dans "batteries" → n'apparaissait pas sur /pieces-detachees)
-- ============================================================

UPDATE products
SET category_id = (SELECT id FROM categories WHERE slug = 'pieces-detachees' LIMIT 1)
WHERE slug = 'chargeur-batterie' AND store = 'powerbug';

-- ============================================================
-- 4. Désactiver les produits hors catalogue GdM
-- ============================================================

UPDATE products
SET is_active = false
WHERE store = 'powerbug'
  AND slug IN (
    'siege-rembourre',
    'roues-hiver-hedgehog',
    'support-gps',
    'range-finder',
    'batterie-lithium-36',
    'roues-arriere-paire',
    'caddy-pack',
    'batterie-nx-lithium',
    'batterie-universelle',
    'extended-battery-lead',
    'chargeur-mini-lithium'
  );

-- ============================================================
-- 5. Mettre à jour les noms
-- ============================================================

UPDATE products SET
  name = 'Porte-scorecard NX',
  description = 'Support de carte de score pour garder vos statistiques protegees et bien organisees pendant la partie.'
WHERE slug = 'scorecard-holder' AND store = 'powerbug';

UPDATE products SET
  name = 'Porte-gobelet NX',
  description = 'Indispensable pour maintenir une hydratation optimale tout au long de votre parcours.'
WHERE slug = 'drinks-holder' AND store = 'powerbug';

UPDATE products SET
  name = 'Mitaines chauffantes NX',
  description = 'Accessoire ultime pour les golfeurs qui ne veulent pas laisser le froid interrompre leur passion.'
WHERE slug = 'mitaines-electriques' AND store = 'powerbug';

UPDATE products SET
  name = 'Extension porte-parapluie NX',
  description = 'Extension ideale pour les grands golfeurs ou ceux souhaitant plus de liberte de mouvement sous leur parapluie.'
WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug';

UPDATE products SET
  name = 'Housse de transport NX',
  description = 'Housse de transport indispensable pour proteger votre chariot lors de vos deplacements.'
WHERE slug = 'housse-transport' AND store = 'powerbug';

UPDATE products SET
  name = 'Porte-parapluie NX',
  description = 'Support pour parapluie, fixation solide sur le chariot. Essentiel par temps variable sur le parcours.'
WHERE slug = 'porte-parapluie' AND store = 'powerbug';
