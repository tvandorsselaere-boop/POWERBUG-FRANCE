# POWERBUG-FRANCE — Instructions Claude Code

## Projet
Site e-commerce officiel du **distributeur exclusif PowerBug en France**.
Vente de chariots électriques de golf (trolleys), accessoires, batteries et pièces détachées.

- **Stack** : Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Base de données** : Supabase (MUTUALISÉE avec GOLF-SHOP — même projet `golf-ecommerce`)
- **Paiement** : Stripe (CB + Apple Pay + Google Pay)
- **Panier** : Zustand 5 avec persistance localStorage
- **Livraison** : Colissimo + Mondial Relay
- **Emails** : Resend
- **i18n** : FR uniquement au lancement (pas de EN, marché français ciblé)
- **Déploiement** : Vercel
- **Domaine** : À définir (powerbug-france.fr ? powerbug.fr ?)
- **Propriétaire** : Tom Van Dorsselaere (Facile-IA) pour un client distributeur PowerBug
- **Repo local** : `/Users/vandorsselaere/Documents/CURSOR/POWERBUG-FRANCE/`
- **Projet frère** : `/Users/vandorsselaere/Documents/CURSOR/GOLF-SHOP/` (même Supabase)

## Architecture multi-store

Ce projet **partage la base de données Supabase** avec GOLF-SHOP.

### Principes
- Champ `store TEXT NOT NULL DEFAULT 'golf-shop'` ajouté sur `products`, `orders`, `promo_codes`
- PowerBug filtre avec `store = 'powerbug'` dans toutes les requêtes
- Golf-Shop filtre avec `store = 'golf-shop'` (rétrocompatible, default existant)
- Les tables `profiles`, `brands`, `categories` sont partagées (pas de store)
- RLS policies mises à jour pour filtrer par store côté public
- L'admin de chaque site ne voit que ses propres données

### Migration Supabase
Fichier : `supabase/migrations/004_multi_store.sql`
- Ajoute `store` sur products, orders, promo_codes
- Met les données existantes à `'golf-shop'`
- Ajoute les catégories et marques PowerBug
- Seed les 2 trolleys + accessoires + batteries

## Catalogue PowerBug (produits à créer)

### Trolleys (produits principaux)
| Produit | Prix EU (estimé) | Variantes |
|---------|-----------------|-----------|
| NX Lithium | ~399€ | Couleur (noir) |
| NX DHC Lithium | ~449€ | Couleur (noir) |

### Accessoires
| Produit | Prix EU (estimé) |
|---------|-----------------|
| Siège rembourré (Deluxe Seat) | ~39€ |
| Porte-parapluie (Umbrella Holder) | ~15€ |
| Porte-scorecard (Scorecard Holder) | ~12€ |
| Housse de transport (Travel Cover) | ~49€ |
| Mitaines électriques (Electric Mitts) | ~29€ |
| Extension porte-sac (Bag Extension) | ~29€ |
| Roues hiver (Hedgehog Winter Wheels) | ~39€ |
| Range Finder (télémètre) | ~89€ |
| Support GPS | ~15€ |
| Support boisson (Drinks Holder) | ~12€ |

### Batteries & Pièces
| Produit | Prix EU (estimé) |
|---------|-----------------|
| Batterie Lithium 36 trous (remplacement) | ~149€ |
| Roue avant complète | ~25€ |
| Roue arrière (paire) | ~35€ |
| Chargeur batterie | ~29€ |

**IMPORTANT** : Les prix définitifs viendront du client. Utiliser ces estimations pour le développement.

### Variantes PowerBug
Contrairement à Golf-Shop (flex/weight pour les shafts), PowerBug utilise des variantes simples :
- Les trolleys n'ont qu'une couleur (noir) → pas de variante, juste le produit
- Les batteries ont un modèle → variante simple
- Les accessoires n'ont pas de variantes

**Solution** : On utilise le champ `flex` existant de `product_variants` de façon générique :
- Pour PowerBug : `flex` = 'standard' (valeur par défaut, une seule variante par produit)
- Le CHECK constraint doit être élargi : ajouter 'standard' aux valeurs autorisées
- Alternative : utiliser `specs JSONB` pour les attributs spécifiques et un seul variant par produit

## Identité visuelle

### À respecter (identité PowerBug)
- **Couleurs principales** : Vert (#00A651 ou similaire), Noir, Blanc
- **Logo** : PowerBug officiel (à obtenir du client en HD)
- **Typographie** : Sans-serif moderne (Inter, DM Sans, ou celle de powerbug.eu)
- **Photos** : Utiliser les photos officielles de powerbug.eu (avec autorisation client)
- **Ton** : Premium mais accessible, passionné de golf

### Améliorations vs powerbug.eu
- Design plus moderne et épuré que le Shopify actuel
- Animations subtiles (Framer Motion ou CSS)
- Glassmorphism léger si cohérent avec la marque
- Mobile-first (les golfeurs consultent sur mobile au club)
- Vitesse : Core Web Vitals < 2s

## Pages du site

### Pages principales
```
/                           → Accueil (hero, gamme, arguments, avis)
/trolleys                   → Page comparaison NX vs NX DHC (PRIORITÉ)
/trolleys/nx-lithium        → Fiche produit NX
/trolleys/nx-dhc-lithium    → Fiche produit NX DHC
/accessoires                → Grille accessoires
/accessoires/[slug]         → Fiche accessoire
/batteries                  → Batteries & pièces
/configurateur              → Bundle builder (PRIORITÉ)
/panier                     → Panier
/checkout                   → Checkout Stripe
/checkout/confirmation      → Confirmation commande
```

### Pages contenu
```
/notre-histoire             → L'histoire PowerBug (20+ ans, qualité UK)
/garantie                   → Garantie France (3 ans trolley + batterie)
/faq                        → FAQ complète (SEO + AEO)
/contact                    → Formulaire + infos distributeur
/livraison                  → Infos livraison France/EU
/cgv                        → CGV
/mentions-legales           → Mentions légales
/politique-retour           → Politique retour 30 jours
/blog                       → Blog SEO (Phase 3)
```

### Pages admin
```
/admin                      → Dashboard (stats, dernières commandes)
/admin/commandes            → Liste commandes (filtrées store='powerbug')
/admin/commandes/[id]       → Détail commande
/admin/produits             → Liste produits (filtrés store='powerbug')
/admin/produits/[id]        → Édition produit
/admin/promos               → Codes promo
```

## Fonctionnalités prioritaires

### 1. Comparateur NX vs NX DHC (PRIORITÉ LANCEMENT)
Page interactive `/trolleys` :
- Tableau comparatif côte à côte
- Toggle pour mettre en avant les différences
- Specs : prix, poids, autonomie, DHC, frein parking, VRAP, USB
- Photos des 2 modèles
- CTA "Ajouter au panier" sur chaque colonne
- Schema.org Product + CompareAction pour AEO
- Responsive : stack en colonnes sur mobile

### 2. Bundle Builder / Configurateur (PRIORITÉ LANCEMENT)
Page interactive `/configurateur` :
- Étape 1 : Choisir son trolley (NX ou NX DHC)
- Étape 2 : Ajouter des accessoires (checklist avec photos + prix)
- Étape 3 : Récapitulatif avec prix total + économie bundle
- Réduction automatique : -50% sur accessoires si achetés avec un trolley (comme powerbug.eu)
- Animation du prix total en temps réel
- CTA "Ajouter tout au panier"
- Partage : "Envoyer ma config par email"

### 3. E-commerce complet
- Fiche produit avec galerie, specs, avis
- Panier Zustand (même pattern que Golf-Shop)
- Checkout Stripe (réutiliser le flow Golf-Shop)
- Emails transactionnels Resend
- Admin back-office (filtré par store='powerbug')

## Phases de développement

### Phase 1 — Structure + Pages produit (Semaine 1-2)
- [ ] Init Next.js + Tailwind + shadcn/ui
- [ ] Migration Supabase multi-store (004_multi_store.sql)
- [ ] Layout : Header, Footer, Navigation (branding PowerBug)
- [ ] Page accueil : Hero, section gamme, arguments ("pourquoi PowerBug")
- [ ] Fiches produit trolleys (NX, NX DHC)
- [ ] Fiches accessoires
- [ ] Page comparateur NX vs NX DHC
- [ ] Seed data : tous les produits PowerBug en base

### Phase 2 — E-commerce + Bundle Builder (Semaine 2-3)
- [ ] Panier Zustand (copier/adapter de Golf-Shop)
- [ ] Checkout Stripe (copier/adapter de Golf-Shop)
- [ ] Webhook Stripe + écriture commande (store='powerbug')
- [ ] Bundle builder / configurateur
- [ ] Emails transactionnels (confirmation, expédition)
- [ ] Page compte client (commandes, adresses)
- [ ] Admin back-office (filtrage multi-store)

### Phase 3 — Contenu + SEO + AEO (Semaine 3-4)
- [ ] Pages statiques : Notre histoire, Garantie, FAQ, CGV, etc.
- [ ] Blog (5-10 articles SEO)
- [ ] Schema.org : Product, FAQ, Organization, BreadcrumbList
- [ ] Meta tags, sitemap, robots.txt
- [ ] Google Search Console
- [ ] Optimisation AEO (réponses IA)

### Phase 4 — Go-Live (Semaine 4)
- [ ] Tests complets : achat, paiement, emails, mobile
- [ ] Core Web Vitals optimization
- [ ] Domaine + DNS
- [ ] Stripe production
- [ ] Facebook + Instagram pages

## Réutilisation depuis Golf-Shop

### À copier/adapter directement
| Composant | Source Golf-Shop | Adaptation |
|-----------|-----------------|------------|
| Supabase clients | `src/lib/supabase/` | Ajouter filtre `store='powerbug'` |
| Stripe checkout | `src/lib/payment/stripe.ts` | Même logique, clés séparées ou partagées |
| Cart store | `src/store/cart-store.ts` | Copie quasi identique |
| Checkout flow | `src/app/[locale]/checkout/` | Adapter UI PowerBug |
| Admin layout | `src/app/[locale]/admin/` | Filtrer par store |
| Auth hook | `src/hooks/use-auth.ts` | Identique |
| Middleware | `src/middleware.ts` | Simplifier (pas de i18n multi-locale) |
| Email templates | `src/lib/email/` | Rebrander PowerBug |
| Shipping calculator | `src/lib/shipping/` | Adapter poids trolleys |
| UI components | `src/components/ui/` | Copie identique |

### À créer from scratch
- Page comparateur NX vs NX DHC
- Bundle builder / configurateur
- Hero et page d'accueil PowerBug
- Contenu spécifique (notre histoire, garantie, FAQ)
- Branding / thème couleurs PowerBug

## Conventions de code

### Identiques à Golf-Shop
- App Router (pas de Pages Router)
- Server Components par défaut, 'use client' uniquement si nécessaire
- Supabase server client pour les Server Components
- Supabase browser client pour les Client Components
- Zustand pour le state global (panier)
- shadcn/ui pour les composants UI
- Tailwind CSS pour le styling
- TypeScript strict

### Spécifique PowerBug
- PAS de i18n multi-locale : FR uniquement → pas besoin de next-intl
- Routes simples : `/trolleys` au lieu de `/fr/trolleys`
- Toutes les requêtes Supabase incluent `.eq('store', 'powerbug')`
- Les inserts en base incluent `store: 'powerbug'`

## Tarification & Mentions légales

- **Auto-entrepreneur** : TVA non applicable, article 293 B du CGI
- Prix affichés = prix TTC (pas de mention HT)
- Mention "Site réalisé par Facile-IA" dans le footer
- Setup 499€ + 49€/mois + 10% commission sur CA via site

## Variables d'environnement

```env
# Supabase (MÊME instance que Golf-Shop)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Stripe (compte séparé ou même compte avec metadata)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=xxx
STRIPE_SECRET_KEY=xxx
STRIPE_WEBHOOK_SECRET=xxx

# Resend
RESEND_API_KEY=xxx

# Site
NEXT_PUBLIC_SITE_URL=https://powerbug-france.fr
NEXT_PUBLIC_STORE_ID=powerbug
```
