-- Migration 011 : Images et descriptions depuis Golf des Marques
-- Source : https://www.golfdesmarques.com/3846-accessoires + /3847-pieces-detachees
-- Date : 18 mars 2026

-- ============================================================
-- 1. Supprimer les anciennes images pour les remplacer par celles de GdM
-- ============================================================

DELETE FROM product_images
WHERE product_id IN (
  SELECT id FROM products WHERE store = 'powerbug'
  AND slug IN (
    'porte-parapluie', 'housse-transport', 'umbrella-holder-extension',
    'scorecard-holder', 'sac-isotherme', 'drinks-holder',
    'support-telephone', 'mitaines-electriques', 'sac-rangement',
    'chargeur-batterie', 'roue-avant-complete', 'moteur-200w-nx', 'moteur-nx-dhc'
  )
);

-- ============================================================
-- 2. Descriptions enrichies (source Golf des Marques)
-- ============================================================

UPDATE products SET description = 'Support parapluie spécifiquement conçu pour les chariots NX PowerBug. Se fixe directement sur la station d''accessoires intégrée de la poignée, sans matériel de montage supplémentaire. Compatible avec les manches de parapluie jusqu''à 37mm de diamètre. Reste fixé lorsque le chariot est replié pour faciliter le chargement et le déchargement.'
WHERE slug = 'porte-parapluie' AND store = 'powerbug';

UPDATE products SET description = 'Housse de protection indispensable pour combiner propreté et praticité lors de vos déplacements. Protège votre chariot des chocs et isole la saleté, l''herbe et l''humidité accumulées sur le parcours. Compatible avec la plupart des marques de chariots électriques. Dimensions : jusqu''à 92cm de longueur, 62cm de largeur et 52cm de hauteur (replié).'
WHERE slug = 'housse-transport' AND store = 'powerbug';

UPDATE products SET description = 'Extension de porte-parapluie offrant une hausse de 15 cm par rapport aux supports standards. Installation simple par insertion sans outils. Améliore l''ergonomie en élevant le point d''ancrage du parapluie, augmentant la visibilité et la liberté de mouvement entre les trous. Compatible PowerBug NX, Motocaddy, Powakaddy et la plupart des chariots électriques.'
WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug';

UPDATE products SET description = 'Porte carte de score avec couvercle transparent rigide protégeant votre carte des intempéries tout en maintenant la visibilité. Comprend un emplacement intégré pour jusqu''à 5 tees et un porte-crayon, gardant l''essentiel à portée de main. Fabrication en matériaux résistants aux UV avec charnières renforcées pour une utilisation quotidienne.'
WHERE slug = 'scorecard-holder' AND store = 'powerbug';

UPDATE products SET description = 'Sac isotherme conçu pour les chariots NX. Compartiment principal zippé avec isolation thermique pour garder boissons et nourriture au frais, compatible avec des packs de glace. Poche avant sécurisée pour vos objets de valeur (téléphone, clés, portefeuille). Sangles élastiques arrière pour une fixation stable sur le chariot sans déplacement.'
WHERE slug = 'sac-isotherme' AND store = 'powerbug';

UPDATE products SET description = 'Porte-gobelet PowerBug pour maintenir une hydratation optimale tout au long de votre parcours. Design spacieux accueillant canettes standard, grandes bouteilles d''eau et bouteilles sport. Installation et retrait rapides via la station d''accessoires intégrée de la poignée NX. Compatible avec Motocaddy après 2018.'
WHERE slug = 'drinks-holder' AND store = 'powerbug';

UPDATE products SET description = 'Support smartphone et GPS, l''accessoire indispensable du golfeur connecté. Compatible avec une large gamme d''appareils, des smartphones standards aux modèles plus grands et GPS golf dédiés. Conception résistante aux vibrations pour les terrains variés. Accès instantané aux distances, obstacles et données de parcours sans fouiller dans votre sac.'
WHERE slug = 'support-telephone' AND store = 'powerbug';

UPDATE products SET description = 'Moufles chauffantes conçues pour les chariots NX, pour jouer confortablement par temps froid. Trois réglages de chaleur ajustables selon les conditions météo. Alimentées via le port USB de la poignée NX — aucune batterie externe nécessaire. Matériaux isolants avec textiles résistants au vent et à l''humidité. Maintient la sensibilité des doigts pour une précision de jeu optimale.'
WHERE slug = 'mitaines-electriques' AND store = 'powerbug';

UPDATE products SET description = 'Sac de rangement essentiel pour isoler votre chariot replié du coffre de votre voiture. Évite les traces d''herbe, de boue et d''humidité sur les revêtements intérieurs. Construction semi-rigide avec panneau arrière rigide et ventilation naturelle pour le séchage des équipements mouillés. Dimensions : L 90cm × l 46cm × H 61cm. Se replie à plat lorsqu''il n''est pas utilisé.'
WHERE slug = 'sac-rangement' AND store = 'powerbug';

UPDATE products SET description = 'Chargeur officiel PowerBug pour recharger en toute sécurité votre batterie Lithium NX. Temps de charge de 3 à 6 heures avec indicateurs visuels de charge intégrés. Systèmes de sécurité contre la surcharge, les courts-circuits et les inversions de polarité. Design compact pour faciliter le transport. Utiliser le chargeur d''origine préserve la chimie des cellules et maintient des performances constantes.'
WHERE slug = 'chargeur-batterie' AND store = 'powerbug';

UPDATE products SET description = 'Ensemble roue avant officiel de remplacement pour chariots électriques PowerBug NX. Kit complet incluant boîtier de protection haute résistance, roue avec bande de roulement adaptée aux parcours de golf et axe réglable pour un alignement précis. Matériaux résistants à toutes les conditions météo pour une longévité optimale. Restaure la trajectoire et réduit la consommation de batterie.'
WHERE slug = 'roue-avant-complete' AND store = 'powerbug';

UPDATE products SET description = 'Moteur de remplacement 200W officiel pour chariots NX. Fonctionnement silencieux minimisant les perturbations sur le parcours. Couple amélioré pour terrains difficiles et montées en pente. Motorisation à courant continu avec boîtier dissipateur de chaleur et étanchéité renforcée contre l''eau et la poussière. Connecteurs standards pour une installation simplifiée.'
WHERE slug = 'moteur-200w-nx' AND store = 'powerbug';

UPDATE products SET description = 'Moteur de remplacement spécifique aux chariots NX DHC équipés du système Downhill Control. Gère la propulsion sur terrain plat et les montées, tout en assurant la régulation automatique de la vitesse en descente pour une sécurité maximale. Compatible avec les numéros de série TPB P10 et TPB P9. Composant OEM préservant l''intégrité du système électronique.'
WHERE slug = 'moteur-nx-dhc' AND store = 'powerbug';

-- ============================================================
-- 3. Insérer les nouvelles images (source Golf des Marques)
-- ============================================================

-- porte-parapluie (2 images)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/porte-parapluie-1.jpg', 'Porte-parapluie NX PowerBug', 1, true
FROM products WHERE slug = 'porte-parapluie' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/porte-parapluie-2.jpg', 'Porte-parapluie NX PowerBug - vue 2', 2, false
FROM products WHERE slug = 'porte-parapluie' AND store = 'powerbug';

-- housse-transport (2 images)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/housse-transport-1.jpg', 'Housse de transport NX PowerBug', 1, true
FROM products WHERE slug = 'housse-transport' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/housse-transport-2.jpg', 'Housse de transport NX PowerBug - vue 2', 2, false
FROM products WHERE slug = 'housse-transport' AND store = 'powerbug';

-- umbrella-holder-extension (3 images)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/umbrella-holder-extension-1.jpg', 'Extension porte-parapluie NX PowerBug', 1, true
FROM products WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/umbrella-holder-extension-2.jpg', 'Extension porte-parapluie NX PowerBug - vue 2', 2, false
FROM products WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/umbrella-holder-extension-3.jpg', 'Extension porte-parapluie NX PowerBug - vue 3', 3, false
FROM products WHERE slug = 'umbrella-holder-extension' AND store = 'powerbug';

-- scorecard-holder (1 image)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/scorecard-holder-1.jpg', 'Porte carte de score NX PowerBug', 1, true
FROM products WHERE slug = 'scorecard-holder' AND store = 'powerbug';

-- sac-isotherme (4 images)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/sac-isotherme-1.jpg', 'Sac isotherme NX PowerBug', 1, true
FROM products WHERE slug = 'sac-isotherme' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/sac-isotherme-2.jpg', 'Sac isotherme NX PowerBug - vue 2', 2, false
FROM products WHERE slug = 'sac-isotherme' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/sac-isotherme-3.jpg', 'Sac isotherme NX PowerBug - vue 3', 3, false
FROM products WHERE slug = 'sac-isotherme' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/sac-isotherme-4.jpg', 'Sac isotherme NX PowerBug - vue 4', 4, false
FROM products WHERE slug = 'sac-isotherme' AND store = 'powerbug';

-- drinks-holder (3 images)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/drinks-holder-1.jpg', 'Porte-gobelet NX PowerBug', 1, true
FROM products WHERE slug = 'drinks-holder' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/drinks-holder-2.jpg', 'Porte-gobelet NX PowerBug - vue 2', 2, false
FROM products WHERE slug = 'drinks-holder' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/drinks-holder-3.jpg', 'Porte-gobelet NX PowerBug - vue 3', 3, false
FROM products WHERE slug = 'drinks-holder' AND store = 'powerbug';

-- support-telephone (2 images)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/support-telephone-1.jpg', 'Support téléphone NX PowerBug', 1, true
FROM products WHERE slug = 'support-telephone' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/support-telephone-2.jpg', 'Support téléphone NX PowerBug - vue 2', 2, false
FROM products WHERE slug = 'support-telephone' AND store = 'powerbug';

-- mitaines-electriques (2 images)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/mitaines-electriques-1.jpg', 'Moufles chauffantes NX PowerBug', 1, true
FROM products WHERE slug = 'mitaines-electriques' AND store = 'powerbug';

INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/mitaines-electriques-2.jpg', 'Moufles chauffantes NX PowerBug - vue 2', 2, false
FROM products WHERE slug = 'mitaines-electriques' AND store = 'powerbug';

-- sac-rangement (1 image)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/sac-rangement-1.jpg', 'Sac de rangement NX PowerBug', 1, true
FROM products WHERE slug = 'sac-rangement' AND store = 'powerbug';

-- chargeur-batterie (1 image)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/chargeur-batterie-1.jpg', 'Chargeur de batterie Lithium NX PowerBug', 1, true
FROM products WHERE slug = 'chargeur-batterie' AND store = 'powerbug';

-- roue-avant-complete (1 image)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/roue-avant-1.jpg', 'Roue avant pour chariots NX PowerBug', 1, true
FROM products WHERE slug = 'roue-avant-complete' AND store = 'powerbug';

-- moteur-200w-nx (1 image)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/moteur-200w-nx-1.jpg', 'Moteur 200W NX PowerBug', 1, true
FROM products WHERE slug = 'moteur-200w-nx' AND store = 'powerbug';

-- moteur-nx-dhc (1 image)
INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
SELECT id, '/images/accessoires/gdm/moteur-nx-dhc-1.jpg', 'Moteur NX DHC PowerBug', 1, true
FROM products WHERE slug = 'moteur-nx-dhc' AND store = 'powerbug';
