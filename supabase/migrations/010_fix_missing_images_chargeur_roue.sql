-- Migration 010 : Ajouter les images manquantes pour chargeur-batterie et roue-avant-complete
-- Bug : migration 009 avait supprimé ces images mais ne les avait pas réinsérées

-- Chargeur de batterie Lithium NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/chargeur-batterie-nx.jpg', 'Chargeur de batterie Lithium NX PowerBug', 1, true
FROM products WHERE slug = 'chargeur-batterie' AND store = 'powerbug';

-- Roue avant pour chariots NX
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/roue-avant-nx.jpg', 'Roue avant pour chariots NX PowerBug', 1, true
FROM products WHERE slug = 'roue-avant-complete' AND store = 'powerbug';
