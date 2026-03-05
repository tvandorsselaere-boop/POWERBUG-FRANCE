-- ============================================
-- MIGRATION 004 — Multi-store support
-- Ajoute le champ 'store' pour mutualiser la DB entre Golf-Shop et PowerBug
-- À exécuter sur le projet Supabase golf-ecommerce
-- ============================================

-- ============================================
-- 1. AJOUTER LE CHAMP STORE
-- ============================================

-- Products
ALTER TABLE products ADD COLUMN IF NOT EXISTS store TEXT NOT NULL DEFAULT 'golf-shop';
CREATE INDEX IF NOT EXISTS idx_products_store ON products(store);

-- Orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS store TEXT NOT NULL DEFAULT 'golf-shop';
CREATE INDEX IF NOT EXISTS idx_orders_store ON orders(store);

-- Promo codes
ALTER TABLE promo_codes ADD COLUMN IF NOT EXISTS store TEXT NOT NULL DEFAULT 'golf-shop';
CREATE INDEX IF NOT EXISTS idx_promo_codes_store ON promo_codes(store);

-- ============================================
-- 2. ÉLARGIR LE CHECK CONSTRAINT SUR FLEX
-- Pour supporter les produits sans variantes (trolleys, accessoires)
-- ============================================

ALTER TABLE product_variants DROP CONSTRAINT IF EXISTS product_variants_flex_check;
ALTER TABLE product_variants ADD CONSTRAINT product_variants_flex_check 
  CHECK (flex IN ('L', 'A', 'R', 'S', 'X', 'TX', 'STD'));

-- Supprimer l'ancien UNIQUE constraint qui incluait flex+weight
ALTER TABLE product_variants DROP CONSTRAINT IF EXISTS product_variants_product_id_flex_weight_key;
-- Recréer avec une contrainte plus souple
ALTER TABLE product_variants ADD CONSTRAINT product_variants_unique_variant 
  UNIQUE (product_id, flex, weight);

-- ============================================
-- 3. METTRE À JOUR LES RLS POLICIES
-- Ajouter le filtrage par store sur les policies publiques
-- ============================================

-- Products : les policies existantes restent, on ne touche pas
-- (elles filtrent déjà par is_active, le filtrage store se fait côté applicatif)
-- Note : si on veut un filtrage RLS strict par store, il faudrait un custom claim
-- ou un header. Pour l'instant, le filtrage applicatif suffit.

-- ============================================
-- 4. CATÉGORIES POWERBUG
-- ============================================

INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
  ('Chariots électriques', 'chariots-electriques', 'Chariots électriques de golf PowerBug', 'zap', 1),
  ('Accessoires', 'accessoires-trolley', 'Accessoires pour chariots PowerBug', 'package', 2),
  ('Batteries', 'batteries', 'Batteries lithium et chargeurs', 'battery-charging', 3),
  ('Pièces détachées', 'pieces-detachees', 'Pièces de rechange PowerBug', 'wrench', 4),
  ('Télémètres', 'telemetres', 'Télémètres laser de golf', 'target', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 5. MARQUE POWERBUG
-- ============================================

INSERT INTO brands (name, slug, logo_url, description, website_url, sort_order) VALUES
  ('PowerBug', 'powerbug', NULL, 'Marque britannique de chariots électriques de golf premium. Plus de 20 ans d''historique, 8400+ avis clients, garantie 3 ans.', 'https://powerbug.eu', 1)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 6. SEED PRODUITS POWERBUG
-- ============================================

-- Variables pour les IDs
DO $$
DECLARE
  brand_pb UUID;
  cat_trolley UUID;
  cat_accessoire UUID;
  cat_batterie UUID;
  cat_pieces UUID;
  cat_telemetre UUID;
  prod_nx UUID;
  prod_nxdhc UUID;
  prod_seat UUID;
  prod_umbrella UUID;
  prod_scorecard UUID;
  prod_cover UUID;
  prod_mitts UUID;
  prod_extension UUID;
  prod_winter UUID;
  prod_rangefinder UUID;
  prod_gps UUID;
  prod_drinks UUID;
  prod_battery UUID;
  prod_frontwheel UUID;
  prod_rearwheels UUID;
  prod_charger UUID;
BEGIN
  -- Récupérer les IDs
  SELECT id INTO brand_pb FROM brands WHERE slug = 'powerbug';
  SELECT id INTO cat_trolley FROM categories WHERE slug = 'chariots-electriques';
  SELECT id INTO cat_accessoire FROM categories WHERE slug = 'accessoires-trolley';
  SELECT id INTO cat_batterie FROM categories WHERE slug = 'batteries';
  SELECT id INTO cat_pieces FROM categories WHERE slug = 'pieces-detachees';
  SELECT id INTO cat_telemetre FROM categories WHERE slug = 'telemetres';

  -- === TROLLEYS ===
  
  INSERT INTO products (id, brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, seo_title, seo_description, store)
  VALUES (
    gen_random_uuid(), brand_pb, cat_trolley,
    'PowerBug NX Lithium',
    'nx-lithium',
    'Le chariot électrique NX Lithium offre une qualité premium, une fiabilité éprouvée et une facilité d''utilisation exceptionnelle. Système 28.8V haute performance, batterie 36 trous, pliage en un geste. Le choix idéal pour les golfeurs exigeants.',
    899.00, 'new', true, true,
    '{"voltage": "28V", "autonomie": "36 trous", "poids": "~8.5 kg", "pliage": "VRAP compact", "roues": "Anti-colmatage + Winter-Ready", "station_accessoires": "Integree", "garantie": "3 ans trolley + batterie"}'::jsonb,
    'PowerBug NX Lithium - Chariot Électrique Golf | Distributeur France',
    'Découvrez le PowerBug NX Lithium : chariot électrique golf premium, batterie 36 trous, pliage 1 geste, garantie 3 ans. Livraison France.',
    'powerbug'
  ) RETURNING id INTO prod_nx;

  INSERT INTO products (id, brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, seo_title, seo_description, store)
  VALUES (
    gen_random_uuid(), brand_pb, cat_trolley,
    'PowerBug NX DHC Lithium',
    'nx-dhc-lithium',
    'Le NX DHC intègre toutes les qualités du NX Lithium avec en plus le Downhill Control (contrôle de descente) et un frein de parking électronique. Parfait pour les parcours vallonnés. Maîtrisez chaque pente en toute sérénité.',
    999.00, 'new', true, true,
    '{"voltage": "28V", "autonomie": "36 trous", "poids": "~9 kg", "pliage": "VRAP compact", "roues": "Anti-colmatage + Winter-Ready", "station_accessoires": "Integree", "dhc": "Oui - Downhill Control", "frein_parking": "Oui - Electronique", "garantie": "3 ans trolley + batterie"}'::jsonb,
    'PowerBug NX DHC Lithium - Chariot Golf avec Contrôle de Descente | France',
    'PowerBug NX DHC : chariot électrique golf avec Downhill Control et frein parking. Idéal parcours vallonnés. Garantie 3 ans. Livraison France.',
    'powerbug'
  ) RETURNING id INTO prod_nxdhc;

  -- === ACCESSOIRES ===

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'Siège Rembourré Deluxe', 'siege-rembourre', 'Siège rembourré avec compartiment de rangement intégré. Se monte en quelques secondes sur tous les modèles PowerBug.', 39.00, 'new', true, false, '{"compatibilite": "Tous modèles PowerBug", "rangement": "Oui"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_seat;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'NX Umbrella Holder', 'porte-parapluie', 'Porte-parapluie universel, montage direct sur la poignée du chariot. Offert avec l''achat d''un trolley.', 24.99, 'new', true, false, '{"compatibilite": "Tous modèles PowerBug", "bundle": true}'::jsonb, 'powerbug')
  RETURNING id INTO prod_umbrella;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'Porte-Scorecard', 'porte-scorecard', 'Support de carte de score, se fixe directement sur la poignée.', 12.00, 'new', true, false, '{"compatibilite": "Tous modèles PowerBug"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_scorecard;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'Travel Cover', 'housse-transport', 'Housse de transport pour votre PowerBug. Offerte avec l''achat d''un trolley.', 24.99, 'new', true, false, '{"materiau": "Nylon resistant", "bundle": true}'::jsonb, 'powerbug')
  RETURNING id INTO prod_cover;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'Mitaines Électriques Chauffantes', 'mitaines-chauffantes', 'Mitaines chauffantes alimentées par la batterie du chariot. Gardez les mains au chaud même par temps froid.', 29.00, 'new', true, false, '{"alimentation": "Batterie trolley", "compatibilite": "Tous modèles PowerBug"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_mitts;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'Extension Porte-Sac', 'extension-porte-sac', 'Extension pour adapter tous les types de sacs de golf à votre chariot PowerBug.', 29.00, 'new', true, false, '{"compatibilite": "Tous modèles PowerBug"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_extension;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'Roues Hiver Hedgehog', 'roues-hiver-hedgehog', 'Roues hiver à crampons pour une traction maximale sur terrain humide et boueux. Nettoyage facile grâce au design anti-colmatage.', 39.00, 'new', true, false, '{"type": "Crampons hiver", "nettoyage": "Design anti-colmatage"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_winter;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'Support GPS', 'support-gps', 'Support universel pour GPS ou smartphone, montage direct sur la poignée.', 15.00, 'new', true, false, '{"compatibilite": "Tous GPS et smartphones"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_gps;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_accessoire, 'Drink Holder', 'porte-boisson', 'Support pour bouteille ou canette. Offert avec l''achat d''un trolley.', 14.99, 'new', true, false, '{"compatibilite": "Tous modèles PowerBug", "bundle": true}'::jsonb, 'powerbug')
  RETURNING id INTO prod_drinks;

  -- === TÉLÉMÈTRE ===

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_telemetre, 'PowerBug Range Finder', 'range-finder', 'Télémètre laser de golf PowerBug avec fonction pente, batterie rechargeable et optique de précision. Compact et léger.', 89.00, 'new', true, true, '{"portee": "800m", "precision": "±0.5m", "pente": "Oui", "batterie": "Rechargeable USB-C", "grossissement": "6x"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_rangefinder;

  -- === BATTERIES & PIÈCES ===

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_batterie, 'Batterie Lithium 36 Trous', 'batterie-lithium-36', 'Batterie de remplacement lithium 28.8V pour tous les modèles NX. Autonomie 36 trous, ultra-légère, sans câble externe.', 149.00, 'new', true, false, '{"voltage": "28.8V", "autonomie": "36 trous", "type": "Lithium", "connecteur": "Sans câble (slot direct)"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_battery;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_pieces, 'Roue Avant Complète', 'roue-avant-complete', 'Assemblage roue avant complet. Démontage sans outil pour un nettoyage facile.', 25.00, 'new', true, false, '{"compatibilite": "NX / NX DHC", "demontage": "Sans outil"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_frontwheel;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_pieces, 'Paire de Roues Arrière', 'roues-arriere-paire', 'Paire de roues arrière caoutchouc anti-dérapant. Inversibles pour un rangement compact.', 35.00, 'new', true, false, '{"compatibilite": "NX / NX DHC", "inversibles": "Oui"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_rearwheels;

  INSERT INTO products (brand_id, category_id, name, slug, description, base_price, condition, is_active, featured, specs, store)
  VALUES (brand_pb, cat_pieces, 'Chargeur Batterie', 'chargeur-batterie', 'Chargeur de remplacement pour batteries lithium PowerBug.', 29.00, 'new', true, false, '{"compatibilite": "Toutes batteries lithium PowerBug"}'::jsonb, 'powerbug')
  RETURNING id INTO prod_charger;

  -- === VARIANTS (1 par produit, flex = STD) ===

  INSERT INTO product_variants (product_id, flex, price, compare_at_price, stock_quantity, stock_status, is_active, sku) VALUES
    (prod_nx, 'STD', 899.00, NULL, 10, 'in_stock', true, 'PB-NX-LI'),
    (prod_nxdhc, 'STD', 999.00, NULL, 10, 'in_stock', true, 'PB-NX-DHC-LI'),
    (prod_seat, 'STD', 39.00, NULL, 20, 'in_stock', true, 'PB-ACC-SEAT'),
    (prod_umbrella, 'STD', 24.99, NULL, 20, 'in_stock', true, 'PB-ACC-UMBRELLA'),
    (prod_scorecard, 'STD', 12.00, NULL, 20, 'in_stock', true, 'PB-ACC-SCORECARD'),
    (prod_cover, 'STD', 24.99, NULL, 15, 'in_stock', true, 'PB-ACC-COVER'),
    (prod_mitts, 'STD', 29.00, NULL, 15, 'in_stock', true, 'PB-ACC-MITTS'),
    (prod_extension, 'STD', 29.00, NULL, 15, 'in_stock', true, 'PB-ACC-EXTENSION'),
    (prod_winter, 'STD', 39.00, NULL, 15, 'in_stock', true, 'PB-ACC-WINTER'),
    (prod_gps, 'STD', 15.00, NULL, 20, 'in_stock', true, 'PB-ACC-GPS'),
    (prod_drinks, 'STD', 14.99, NULL, 20, 'in_stock', true, 'PB-ACC-DRINKS'),
    (prod_rangefinder, 'STD', 89.00, NULL, 10, 'in_stock', true, 'PB-RANGE-FINDER'),
    (prod_battery, 'STD', 149.00, NULL, 10, 'in_stock', true, 'PB-BAT-36'),
    (prod_frontwheel, 'STD', 25.00, NULL, 15, 'in_stock', true, 'PB-SPARE-FRONT'),
    (prod_rearwheels, 'STD', 35.00, NULL, 15, 'in_stock', true, 'PB-SPARE-REAR'),
    (prod_charger, 'STD', 29.00, NULL, 10, 'in_stock', true, 'PB-SPARE-CHARGER');

  RAISE NOTICE 'PowerBug seed data inserted: 16 products with variants';
END $$;
