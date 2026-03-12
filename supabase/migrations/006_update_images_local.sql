-- ============================================
-- MIGRATION 006 — Images locales (assets officiels PowerBug UK)
-- Remplace les URLs CDN Shopify par les chemins locaux Vercel
-- Fichiers dans /public/images/ — servis + optimisés par next/image
-- ============================================

DO $$
DECLARE
  pid UUID;
BEGIN

  -- === TROLLEYS ===

  -- NX Lithium — 6 angles officiels
  SELECT id INTO pid FROM products WHERE slug = 'nx-lithium' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/produit/nx/PowerBug-NX-Main-1.jpg', 'PowerBug NX Lithium - Vue principale', 1, true),
      (pid, '/images/produit/nx/PowerBug-NX-Main-2.jpg', 'PowerBug NX Lithium - Vue latérale', 2, false),
      (pid, '/images/produit/nx/PowerBug-NX-Main-4.jpg', 'PowerBug NX Lithium - Vue arrière', 3, false),
      (pid, '/images/produit/nx/PowerBug-NX-Main-5.jpg', 'PowerBug NX Lithium - Vue détail', 4, false),
      (pid, '/images/produit/nx/PowerBug-NX-Main-6.jpg', 'PowerBug NX Lithium - Vue plié', 5, false),
      (pid, '/images/produit/nx/PowerBug-NX-Main-7.jpg', 'PowerBug NX Lithium - Vue ensemble', 6, false);
  END IF;

  -- NX DHC Lithium — 6 angles officiels
  SELECT id INTO pid FROM products WHERE slug = 'nx-dhc-lithium' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/produit/nx-dhc/PowerBug-NX-Main-1-DHC.jpg', 'PowerBug NX DHC Lithium - Vue principale', 1, true),
      (pid, '/images/produit/nx-dhc/PowerBug-NX-Main-2-DHC.jpg', 'PowerBug NX DHC Lithium - Vue latérale', 2, false),
      (pid, '/images/produit/nx-dhc/PowerBug-NX-Main-4-DHC.jpg', 'PowerBug NX DHC Lithium - Vue arrière', 3, false),
      (pid, '/images/produit/nx-dhc/PowerBug-NX-Main-5-DHC.jpg', 'PowerBug NX DHC Lithium - Vue détail', 4, false),
      (pid, '/images/produit/nx-dhc/PowerBug-NX-Main-6-DHC.jpg', 'PowerBug NX DHC Lithium - Vue plié', 5, false),
      (pid, '/images/produit/nx-dhc/PowerBug-NX-Main-7-DHC.jpg', 'PowerBug NX DHC Lithium - Vue ensemble', 6, false);
  END IF;

  -- === ACCESSOIRES (images officielles du ZIP) ===

  -- Siège rembourré
  SELECT id INTO pid FROM products WHERE slug = 'siege-rembourre' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/accessoires/Seat-Main-min.jpg.webp', 'Siège Rembourré PowerBug NX', 1, true),
      (pid, '/images/accessoires/Trolley-Seat-Mounted-min.jpg.webp', 'Siège Rembourré PowerBug NX - Monté', 2, false);
  END IF;

  -- Porte-parapluie
  SELECT id INTO pid FROM products WHERE slug = 'porte-parapluie' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/accessoires/NX-Umbrella-Holder-min.jpg.webp', 'Porte-parapluie PowerBug NX', 1, true);
  END IF;

  -- Porte-scorecard
  SELECT id INTO pid FROM products WHERE slug = 'porte-scorecard' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/accessoires/score-card-holder.jpg.webp', 'Porte-Scorecard PowerBug NX', 1, true);
  END IF;

  -- Mitaines chauffantes
  SELECT id INTO pid FROM products WHERE slug = 'mitaines-chauffantes' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/accessoires/Heated-Mitt-Main-min.jpg.webp', 'Mitaines Chauffantes PowerBug', 1, true),
      (pid, '/images/accessoires/Heated-Mitt-PowerBug-NX-min.jpg.webp', 'Mitaines Chauffantes PowerBug NX - Monté', 2, false);
  END IF;

  -- Support GPS
  SELECT id INTO pid FROM products WHERE slug = 'support-gps' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/accessoires/GPS-Holder-1-min.jpg.webp', 'Support GPS PowerBug NX', 1, true),
      (pid, '/images/accessoires/GPS-Holder-Mounted-1-min.jpg.webp', 'Support GPS PowerBug NX - Monté', 2, false);
  END IF;

  -- Porte-boisson
  SELECT id INTO pid FROM products WHERE slug = 'porte-boisson' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/accessoires/NX-Drink-Holder-Main-min.jpg.webp', 'Porte-Boisson PowerBug NX', 1, true),
      (pid, '/images/accessoires/NX-Drink-Holder-1-min.jpg.webp', 'Porte-Boisson PowerBug NX - Angle 2', 2, false);
  END IF;

  -- Extension porte-parapluie
  SELECT id INTO pid FROM products WHERE slug = 'extension-porte-sac' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/accessoires/umbrella-holder-extension.jpg.webp', 'Extension Porte-Parapluie PowerBug NX', 1, true);
  END IF;

  -- Roues Hiver Hedgehog (pas dans le catalogue de lancement mais image disponible)
  SELECT id INTO pid FROM products WHERE slug = 'roues-hiver-hedgehog' AND store = 'powerbug';
  IF pid IS NOT NULL THEN
    DELETE FROM product_images WHERE product_id = pid;
    INSERT INTO product_images (product_id, url, alt_text, position, is_primary) VALUES
      (pid, '/images/accessoires/NX-Hedgehog-2-min.jpg.webp', 'Roues Hiver Hedgehog PowerBug', 1, true),
      (pid, '/images/accessoires/NX-Hedgehog-4-min.jpg.webp', 'Roues Hiver Hedgehog PowerBug - Angle 2', 2, false);
  END IF;

  -- Housse de transport (Travel Cover) — pas d'image officielle dans le ZIP, on garde CDN
  -- Range Finder — pas d'image officielle dans le ZIP, on garde CDN
  -- Batteries, roues, chargeur — pas dans le ZIP, on garde CDN

  RAISE NOTICE 'Migration 006 — Images locales appliquées avec succès';
END $$;
