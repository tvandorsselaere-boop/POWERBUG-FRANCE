-- ============================================
-- MIGRATION 005 — Images produits PowerBug
-- URLs provenant du CDN Shopify powerbug.eu
-- ============================================

DO $$
DECLARE
  pid UUID;
BEGIN

  -- === TROLLEYS ===

  -- NX Lithium (4 images)
  SELECT id INTO pid FROM products WHERE slug = 'nx-lithium' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://powerbug.eu/cdn/shop/products/NX-Main-1-min.jpg?v=1681470541', 'PowerBug NX Lithium - Vue principale', 1, true),
      (pid, 'https://powerbug.eu/cdn/shop/products/NX-Rear-1-min.jpg?v=1681470541', 'PowerBug NX Lithium - Vue arriere', 2, false),
      (pid, 'https://powerbug.eu/cdn/shop/products/NX-Folded-1-min.jpg?v=1681470541', 'PowerBug NX Lithium - Plie', 3, false),
      (pid, 'https://powerbug.eu/cdn/shop/products/NX-Battery-Tray-min_eb022816-6154-4307-a4dc-6a32562d28d1.jpg?v=1681470542', 'PowerBug NX Lithium - Batterie', 4, false);
  END IF;

  -- NX DHC Lithium (4 images)
  SELECT id INTO pid FROM products WHERE slug = 'nx-dhc-lithium' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://powerbug.eu/cdn/shop/products/NX-DHC-Main-1-min.jpg?v=1681414107', 'PowerBug NX DHC Lithium - Vue principale', 1, true),
      (pid, 'https://powerbug.eu/cdn/shop/products/NX-DHC-Rear-1-min.jpg?v=1681414107', 'PowerBug NX DHC Lithium - Vue arriere', 2, false),
      (pid, 'https://powerbug.eu/cdn/shop/products/NX-DHC-Folded-1-min.jpg?v=1681414107', 'PowerBug NX DHC Lithium - Plie', 3, false),
      (pid, 'https://powerbug.eu/cdn/shop/products/NX-Battery-Tray-min.jpg?v=1681414106', 'PowerBug NX DHC Lithium - Batterie', 4, false);
  END IF;

  -- === ACCESSOIRES ===

  -- Siege Rembourre Deluxe
  SELECT id INTO pid FROM products WHERE slug = 'siege-rembourre' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/files/Seat-Main-min.jpg?v=1712829105', 'Siege Rembourre Deluxe PowerBug', 1, true);
  END IF;

  -- Porte-parapluie NX
  SELECT id INTO pid FROM products WHERE slug = 'porte-parapluie' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/files/NX-Umbrella-Holder-min.jpg?v=1718889496', 'NX Umbrella Holder PowerBug', 1, true);
  END IF;

  -- Porte-scorecard
  SELECT id INTO pid FROM products WHERE slug = 'porte-scorecard' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/products/score-card-holder.jpg?v=1700215827', 'Porte-Scorecard PowerBug', 1, true);
  END IF;

  -- Housse de transport (Travel Cover) - utilise l'image du caddy pack (closest match)
  SELECT id INTO pid FROM products WHERE slug = 'housse-transport' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/products/boot-tidy.jpg?v=1700215640', 'Travel Cover PowerBug', 1, true);
  END IF;

  -- Mitaines chauffantes
  SELECT id INTO pid FROM products WHERE slug = 'mitaines-chauffantes' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/files/Heated-Mitt-Main-min.jpg?v=1702028567', 'Mitaines Chauffantes PowerBug', 1, true);
  END IF;

  -- Extension Porte-Sac
  SELECT id INTO pid FROM products WHERE slug = 'extension-porte-sac' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/products/bag-support-upgrade.jpg?v=1587119680', 'Extension Porte-Sac PowerBug', 1, true);
  END IF;

  -- Roues Hiver Hedgehog
  SELECT id INTO pid FROM products WHERE slug = 'roues-hiver-hedgehog' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/files/NX-Hedgehog-2-min.jpg?v=1697622068', 'Roues Hiver Hedgehog PowerBug', 1, true);
  END IF;

  -- Support GPS
  SELECT id INTO pid FROM products WHERE slug = 'support-gps' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/files/GPS-Holder-1-min.jpg?v=1700215765', 'Support GPS PowerBug', 1, true);
  END IF;

  -- Porte-boisson (Drink Holder)
  SELECT id INTO pid FROM products WHERE slug = 'porte-boisson' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/files/NX-Drink-Holder-Main-min.jpg?v=1732192143', 'Drink Holder PowerBug', 1, true);
  END IF;

  -- === TELEMETRE ===

  -- Range Finder
  SELECT id INTO pid FROM products WHERE slug = 'range-finder' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/files/PowerBug-Range-Finder-2-min.jpg?v=1755799747', 'PowerBug Range Finder', 1, true);
  END IF;

  -- === BATTERIES & PIECES ===

  -- Batterie Lithium 36 Trous
  SELECT id INTO pid FROM products WHERE slug = 'batterie-lithium-36' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/files/NX-Battery-36-Hole-min.jpg?v=1698749666', 'Batterie Lithium 36 Trous PowerBug', 1, true);
  END IF;

  -- Roue Avant Complete
  SELECT id INTO pid FROM products WHERE slug = 'roue-avant-complete' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/products/Front-Wheel-Assembly---Black-min.jpg?v=1653489043', 'Roue Avant Complete PowerBug', 1, true);
  END IF;

  -- Roues Arriere (paire)
  SELECT id INTO pid FROM products WHERE slug = 'roues-arriere-paire' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/products/right-hand-wheel_472dc887-33fe-4295-bb48-4a699d781fe9.jpg?v=1587109858', 'Roues Arriere PowerBug', 1, true);
  END IF;

  -- Chargeur Batterie
  SELECT id INTO pid FROM products WHERE slug = 'chargeur-batterie' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, 'https://cdn.shopify.com/s/files/1/0306/1078/4391/products/mini-lithium-charger.jpg?v=1585842560', 'Chargeur Batterie PowerBug', 1, true);
  END IF;

  RAISE NOTICE 'PowerBug product images inserted successfully';
END $$;
