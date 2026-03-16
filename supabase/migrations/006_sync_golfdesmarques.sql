-- Migration 006 : Synchronisation catalogue avec Golf des Marques
-- Seuls les produits vendus sur golfdesmarques.com/3837, /3846, /3847 sont gardés actifs
-- Source vérifiée le 16 mars 2026

-- ============================================================
-- 1. Désactiver les produits non présents chez Golf des Marques
-- ============================================================

UPDATE products
SET is_active = false
WHERE store = 'powerbug'
  AND slug IN (
    'siege-rembourre',        -- pas chez GdM
    'roues-hiver-hedgehog',   -- pas chez GdM
    'support-gps',            -- remplacé par support-telephone
    'range-finder',           -- pas chez GdM
    'batterie-lithium-36',    -- pas chez GdM (pas vendu séparément)
    'roues-arriere-paire',    -- pas chez GdM
    'caddy-pack',             -- pas chez GdM
    'batterie-nx-lithium',    -- pas chez GdM
    'batterie-universelle',   -- pas chez GdM
    'extended-battery-lead',  -- pas chez GdM
    'chargeur-mini-lithium'   -- remplacé par chargeur-batterie dans pieces-detachees
  );

-- ============================================================
-- 2. Corriger les slugs DB pour qu'ils correspondent à products.ts
-- ============================================================

-- porte-scorecard → scorecard-holder (bundle + configurateur utilisent "scorecard-holder")
UPDATE products SET slug = 'scorecard-holder'
WHERE slug = 'porte-scorecard' AND store = 'powerbug';

-- porte-boisson → drinks-holder
UPDATE products SET slug = 'drinks-holder'
WHERE slug = 'porte-boisson' AND store = 'powerbug';

-- mitaines-chauffantes → mitaines-electriques (slug dans products.ts)
UPDATE products SET slug = 'mitaines-electriques'
WHERE slug = 'mitaines-chauffantes' AND store = 'powerbug';

-- extension-porte-sac → umbrella-holder-extension (slug dans products.ts)
UPDATE products SET slug = 'umbrella-holder-extension'
WHERE slug = 'extension-porte-sac' AND store = 'powerbug';

-- ============================================================
-- 3. Mettre à jour les noms pour correspondre à Golf des Marques
-- ============================================================

UPDATE products SET name = 'Porte-parapluie NX',
  description = 'Support pour parapluie, fixation solide sur le chariot. Essentiel par temps variable sur le parcours.'
WHERE slug = 'porte-parapluie' AND store = 'powerbug';

UPDATE products SET name = 'Housse de transport NX',
  description = 'Housse de transport indispensable pour protéger votre chariot lors de vos déplacements.'
WHERE slug = 'housse-transport' AND store = 'powerbug';

UPDATE products SET name = 'Extension porte-parapluie NX',
  description = 'Extension idéale pour les grands golfeurs ou ceux souhaitant plus de liberté de mouvement sous leur parapluie.'
WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug';

UPDATE products SET name = 'Porte-scorecard NX',
  description = 'Support de carte de score pour garder vos statistiques protégées et bien organisées pendant la partie.'
WHERE slug = 'scorecard-holder' AND store = 'powerbug';

UPDATE products SET name = 'Porte-gobelet NX',
  description = 'Indispensable pour maintenir une hydratation optimale tout au long de votre parcours.'
WHERE slug = 'drinks-holder' AND store = 'powerbug';

UPDATE products SET name = 'Mitaines chauffantes NX',
  description = 'Accessoire ultime pour les golfeurs qui ne veulent pas laisser le froid interrompre leur passion.'
WHERE slug = 'mitaines-electriques' AND store = 'powerbug';

-- Chargeur batterie : déjà dans pieces-detachees, juste mettre à jour nom et prix
UPDATE products SET
  name = 'Chargeur de batterie Lithium NX',
  description = 'Chargeur officiel PowerBug pour recharger votre batterie Lithium NX en toute sécurité.',
  base_price = 60
WHERE slug = 'chargeur-batterie' AND store = 'powerbug';

UPDATE product_variants SET price = 60
WHERE product_id = (SELECT id FROM products WHERE slug = 'chargeur-batterie' AND store = 'powerbug');

-- Roue avant : mettre à jour nom et prix
UPDATE products SET
  name = 'Roue avant pour chariots NX',
  description = 'Ensemble de roue avant officiel PowerBug, pièce de rechange pour la longévité de votre chariot.',
  base_price = 50
WHERE slug = 'roue-avant-complete' AND store = 'powerbug';

UPDATE product_variants SET price = 50
WHERE product_id = (SELECT id FROM products WHERE slug = 'roue-avant-complete' AND store = 'powerbug');
