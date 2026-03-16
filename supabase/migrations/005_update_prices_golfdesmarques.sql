-- Migration 005 : Alignement prix sur Golf des Marques (mars 2026)
-- Source : https://www.golfdesmarques.com/3837-chariots-de-golf-electrique-powerbug
-- Fred confirme alignement total sur leurs prix

-- ============================================================
-- 1. Mise à jour prix trolleys (promo -100€)
-- ============================================================

DO $$
DECLARE
  v_nx_id uuid;
  v_dhc_id uuid;
BEGIN

  SELECT id INTO v_nx_id FROM products WHERE slug = 'nx-lithium' AND store = 'powerbug';
  SELECT id INTO v_dhc_id FROM products WHERE slug = 'nx-dhc-lithium' AND store = 'powerbug';

  -- NX Lithium : 899€ → 799€ (compare_at_price = 899)
  IF v_nx_id IS NOT NULL THEN
    UPDATE products SET base_price = 799 WHERE id = v_nx_id;
    UPDATE product_variants
      SET price = 799, compare_at_price = 899
      WHERE product_id = v_nx_id;
  END IF;

  -- NX DHC Lithium : 999€ → 899€ (compare_at_price = 999)
  IF v_dhc_id IS NOT NULL THEN
    UPDATE products SET base_price = 899 WHERE id = v_dhc_id;
    UPDATE product_variants
      SET price = 899, compare_at_price = 999
      WHERE product_id = v_dhc_id;
  END IF;

END $$;

-- ============================================================
-- 2. Mise à jour prix accessoires existants
-- ============================================================

DO $$
DECLARE
  v_id uuid;

  -- [slug, nouveau prix]
  slugs_prices TEXT[][] := ARRAY[
    ['housse-transport',        '40'],
    ['porte-parapluie',         '30'],
    ['scorecard-holder',        '30'],
    ['drinks-holder',           '20'],
    ['mitaines-electriques',    '60'],
    ['umbrella-holder-extension','25']
  ];
  pair TEXT[];
BEGIN
  FOREACH pair SLICE 1 IN ARRAY slugs_prices LOOP
    SELECT id INTO v_id FROM products WHERE slug = pair[1] AND store = 'powerbug';
    IF v_id IS NOT NULL THEN
      UPDATE products SET base_price = pair[2]::numeric WHERE id = v_id;
      UPDATE product_variants SET price = pair[2]::numeric WHERE product_id = v_id;
    END IF;
  END LOOP;
END $$;

-- ============================================================
-- 3. Mise à jour pièces détachées existantes
-- ============================================================

DO $$
DECLARE
  v_id uuid;
BEGIN
  -- Chargeur batterie Lithium : 29€ → 60€
  SELECT id INTO v_id FROM products WHERE slug = 'chargeur-mini-lithium' AND store = 'powerbug';
  IF v_id IS NULL THEN
    SELECT id INTO v_id FROM products
      WHERE store = 'powerbug'
      AND (name ILIKE '%chargeur%' OR slug ILIKE '%chargeur%')
      AND categories_id IN (SELECT id FROM categories WHERE slug = 'pieces-detachees')
      LIMIT 1;
  END IF;
  IF v_id IS NOT NULL THEN
    UPDATE products SET base_price = 60 WHERE id = v_id;
    UPDATE product_variants SET price = 60 WHERE product_id = v_id;
  END IF;

  -- Roue avant : 25€ → 50€
  SELECT id INTO v_id FROM products
    WHERE store = 'powerbug'
    AND (slug ILIKE '%roue-avant%' OR name ILIKE '%roue avant%')
    LIMIT 1;
  IF v_id IS NOT NULL THEN
    UPDATE products SET base_price = 50 WHERE id = v_id;
    UPDATE product_variants SET price = 50 WHERE product_id = v_id;
  END IF;
END $$;

-- ============================================================
-- 4. Nouveaux accessoires (Golf des Marques, mars 2026)
-- ============================================================

DO $$
DECLARE
  v_brand_id uuid;
  v_cat_accessoires_id uuid;
  v_cat_pieces_id uuid;
  v_product_id uuid;
BEGIN
  SELECT id INTO v_brand_id FROM brands WHERE slug = 'powerbug' LIMIT 1;
  SELECT id INTO v_cat_accessoires_id FROM categories WHERE slug = 'accessoires-trolley' LIMIT 1;
  SELECT id INTO v_cat_pieces_id FROM categories WHERE slug = 'pieces-detachees' LIMIT 1;

  -- Sac isotherme NX (40€)
  IF NOT EXISTS (SELECT 1 FROM products WHERE slug = 'sac-isotherme' AND store = 'powerbug') THEN
    INSERT INTO products (name, slug, description, base_price, store, is_active, featured, categories_id, brand_id)
    VALUES (
      'Sac isotherme NX',
      'sac-isotherme',
      'Sac isotherme pour maintenir vos boissons a temperature pendant tout le tour.',
      40,
      'powerbug', true, false,
      v_cat_accessoires_id, v_brand_id
    )
    RETURNING id INTO v_product_id;
    INSERT INTO product_variants (product_id, price, compare_at_price, stock_quantity, stock_status, flex)
    VALUES (v_product_id, 40, NULL, 10, 'in_stock', 'STD');
  END IF;

  -- Support telephone NX (30€)
  IF NOT EXISTS (SELECT 1 FROM products WHERE slug = 'support-telephone' AND store = 'powerbug') THEN
    INSERT INTO products (name, slug, description, base_price, store, is_active, featured, categories_id, brand_id)
    VALUES (
      'Support telephone NX',
      'support-telephone',
      'Support universel pour telephone ou GPS, fixation sur le guidon du chariot.',
      30,
      'powerbug', true, false,
      v_cat_accessoires_id, v_brand_id
    )
    RETURNING id INTO v_product_id;
    INSERT INTO product_variants (product_id, price, compare_at_price, stock_quantity, stock_status, flex)
    VALUES (v_product_id, 30, NULL, 10, 'in_stock', 'STD');
  END IF;

  -- Sac de rangement NX (45€)
  IF NOT EXISTS (SELECT 1 FROM products WHERE slug = 'sac-rangement' AND store = 'powerbug') THEN
    INSERT INTO products (name, slug, description, base_price, store, is_active, featured, categories_id, brand_id)
    VALUES (
      'Sac de rangement NX',
      'sac-rangement',
      'Sac de rangement pour proteger et transporter votre chariot entre les sorties.',
      45,
      'powerbug', true, false,
      v_cat_accessoires_id, v_brand_id
    )
    RETURNING id INTO v_product_id;
    INSERT INTO product_variants (product_id, price, compare_at_price, stock_quantity, stock_status, flex)
    VALUES (v_product_id, 45, NULL, 10, 'in_stock', 'STD');
  END IF;

  -- Moteur 200W NX (120€)
  IF NOT EXISTS (SELECT 1 FROM products WHERE slug = 'moteur-200w-nx' AND store = 'powerbug') THEN
    INSERT INTO products (name, slug, description, base_price, store, is_active, featured, categories_id, brand_id)
    VALUES (
      'Moteur 200W NX',
      'moteur-200w-nx',
      'Moteur de remplacement 200W officiel pour chariot de golf PowerBug NX.',
      120,
      'powerbug', true, false,
      v_cat_pieces_id, v_brand_id
    )
    RETURNING id INTO v_product_id;
    INSERT INTO product_variants (product_id, price, compare_at_price, stock_quantity, stock_status, flex)
    VALUES (v_product_id, 120, NULL, 5, 'in_stock', 'STD');
  END IF;

  -- Moteur NX DHC (150€)
  IF NOT EXISTS (SELECT 1 FROM products WHERE slug = 'moteur-nx-dhc' AND store = 'powerbug') THEN
    INSERT INTO products (name, slug, description, base_price, store, is_active, featured, categories_id, brand_id)
    VALUES (
      'Moteur NX DHC',
      'moteur-nx-dhc',
      'Moteur de remplacement specifique aux chariots NX DHC avec Downhill Control.',
      150,
      'powerbug', true, false,
      v_cat_pieces_id, v_brand_id
    )
    RETURNING id INTO v_product_id;
    INSERT INTO product_variants (product_id, price, compare_at_price, stock_quantity, stock_status, flex)
    VALUES (v_product_id, 150, NULL, 5, 'in_stock', 'STD');
  END IF;

END $$;
