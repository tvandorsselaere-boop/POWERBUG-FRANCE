# POWERBUG-FRANCE — Instructions Claude Code

## Projet
Site e-commerce officiel du **distributeur exclusif PowerBug en France**.
Vente de chariots électriques de golf (trolleys), accessoires, batteries et pièces détachées.

- **Stack** : Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Base de données** : Supabase (MUTUALISÉE avec GOLF-SHOP — même projet `golf-ecommerce`)
- **Paiement** : Stripe (CB + Apple Pay + Google Pay)
- **Panier** : Zustand 5 avec persistance localStorage
- **Livraison** : DPD (via Golf des Marques) — France métropolitaine uniquement
- **Emails** : ZeptoMail (transactionnel) + Zoho Mail Lite (boite fred@powerbug.fr)
- **i18n** : FR uniquement au lancement (pas de EN, marché français ciblé)
- **Déploiement** : Vercel
- **Domaine** : powerbug.fr → powerbug-france.vercel.app (redirection active)
- **GitHub** : https://github.com/tvandorsselaere-boop/POWERBUG-FRANCE
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

## Catalogue PowerBug (prix alignés sur powerbug.eu)

### Trolleys (produits principaux)
| Produit | Prix EUR | Variantes |
|---------|----------|-----------|
| NX Lithium | 899€ | Couleur (noir) |
| NX DHC Lithium | 999€ | Couleur (noir) |

### Offre bundle (identique à powerbug.eu)
Achat d'un trolley = **3 accessoires offerts automatiquement** :
- Travel Cover (Housse de transport) — valeur 24,99€
- Drink Holder (Support boisson) — valeur 14,99€
- NX Umbrella Holder (Porte-parapluie) — valeur 24,99€
Total cadeau : ~65€ d'accessoires offerts

### Accessoires
| Produit | Prix EUR |
|---------|----------|
| Housse de transport (Travel Cover) | 24,99€ |
| Porte-parapluie (NX Umbrella Holder) | 24,99€ |
| Support boisson (Drinks Holder) | 14,99€ |
| Siège rembourré (Deluxe Seat) | à confirmer |
| Porte-scorecard (Scorecard Holder) | à confirmer |
| Mitaines électriques (Electric Mitts) | à confirmer |
| Extension porte-sac (Bag Extension) | à confirmer |
| Roues hiver (Hedgehog Winter Wheels) | à confirmer |
| Range Finder (télémètre) | à confirmer |
| Support GPS | à confirmer |

### Batteries & Pièces
| Produit | Prix EUR |
|---------|----------|
| Batterie Lithium 36 trous (Standard) | à confirmer |
| Batterie Lithium 36 trous (Mini) | à confirmer |
| Roue avant complète | à confirmer |
| Roue arrière (paire) | à confirmer |
| Chargeur batterie | à confirmer |

**NOTE** : Les prix confirmés viennent de powerbug.eu. Les prix "à confirmer" seront fournis par le client.

### Variantes PowerBug
Contrairement à Golf-Shop (flex/weight pour les shafts), PowerBug utilise des variantes simples :
- Les trolleys n'ont qu'une couleur (noir) → pas de variante, juste le produit
- Les batteries ont un modèle → variante simple
- Les accessoires n'ont pas de variantes

**Solution** : On utilise le champ `flex` existant de `product_variants` de façon générique :
- Pour PowerBug : `flex` = 'standard' (valeur par défaut, une seule variante par produit)
- Le CHECK constraint doit être élargi : ajouter 'standard' aux valeurs autorisées
- Alternative : utiliser `specs JSONB` pour les attributs spécifiques et un seul variant par produit

## Identité visuelle (basée sur analyse powerbug.eu)

### Charte graphique officielle PowerBug
- **Fond** : `#FFFFFF` (blanc pur) — PAS de dark mode
- **Texte principal** : `#0F0F10` (noir très foncé)
- **Boutons primaires** : `#356B0D` (vert foncé forêt)
- **Accent / highlights** : `#8DC63F` (vert citron/lime)
- **Bordures** : `#DBDBDB` (gris clair)
- **Badges solde** : `#AE1717` (rouge)
- **Etoiles avis** : `#F6A429` (doré)
- **Succès** : `#0E6C4F` (vert forêt)

### Typographie
- **Police : Poppins** (Google Fonts)
- Titres : weight 500-600, taille hero 56px desktop
- Corps : weight 400, 16px
- Style épuré et moderne

### Design
- **Fond BLANC**, design light/clean (pas dark mode)
- Style minimaliste premium sport/outdoor
- Boutons arrondis (border-radius 10px)
- Photos produit sur fond blanc, format carré
- **Logo** : PowerBug officiel (à obtenir du client en HD)
- **Photos** : Utiliser les photos officielles de powerbug.eu (avec autorisation client)

### Améliorations vs powerbug.eu (Shopify)
- Design plus moderne et épuré
- Animations subtiles CSS
- Mobile-first (les golfeurs consultent sur mobile au club)
- Vitesse : Core Web Vitals < 2s
- Conteneur max : 1600px (comme powerbug.eu)
- Gouttières : 24px mobile, 40px desktop

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
/garantie                   → Garantie France (2 ans constructeur)
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
- Étape 2 : Ajouter des accessoires supplémentaires (checklist avec photos + prix)
- Étape 3 : Récapitulatif avec prix total
- **Bundle automatique** : achat trolley = 3 accessoires OFFERTS (Travel Cover + Drink Holder + Umbrella Holder), identique à powerbug.eu
- Possibilité d'ajouter d'autres accessoires en plus (plein tarif)
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

### Phase 0 — Landing page (FAIT)
- [x] Init Next.js 16 + Tailwind CSS 4
- [x] Page "en construction" (dégradé noir/vert, badges, animations CSS)
- [x] SEO basique (meta, OG, robots.txt, sitemap.xml, favicon SVG)
- [x] GitHub repo + Vercel auto-deploy
- [x] Live sur powerbug-france.vercel.app
- [x] Logo officiel PowerBug extrait du brand kit UK

### Phase 1 — Structure + Pages produit (EN COURS — 80% fait)

#### FAIT
- [x] Installer shadcn/ui
- [x] Layout : Header, Footer, Navigation (branding PowerBug)
- [x] Page accueil : sections gamme, arguments ("pourquoi PowerBug"), CTA
- [x] Fiches produit trolleys (NX, NX DHC) avec galerie photos + specs
- [x] Fiches accessoires (/accessoires/[slug]) depuis Supabase
- [x] Page comparateur NX vs NX DHC (/trolleys)
- [x] Page accessoires + batteries combinée (/accessoires)
- [x] Page pièces détachées (/pieces-detachees)
- [x] Page vidéos (/videos) — présentations + tutos YouTube
- [x] Pages fonctionnalités (/fonctionnalites/[slug]) — 8 pages
- [x] Page contact (/contact) — formulaire HTML
- [x] 50 images officielles + 3 vidéos MP4 intégrées

#### RESTE À FAIRE
- [ ] **Hero homepage** : ajouter une vraie section hero (image/vidéo lifestyle, pas juste du texte)
- [ ] **Auth/Login** : page connexion/inscription + icône User header fonctionnelle
- [ ] **Bannière "en construction"** : retirer ou conditionner pour la démo
- [ ] **Contact form backend** : ajouter handler submit (envoi email ou stockage)
- [ ] **Icône recherche header** : implémenter ou retirer
- [ ] **Téléphone placeholder** : remplacer `01 XX XX XX XX` sur /pieces-detachees et "À venir" sur /contact
- [ ] **7 pages manquantes** référencées dans le footer (liens cassés) :
  - [ ] /notre-histoire — histoire PowerBug (established 2003, qualité UK, 8000+ avis)
  - [ ] /garantie — garantie 2 ans constructeur
  - [ ] /faq — questions fréquentes
  - [ ] /livraison — DPD, France métro, 15€ fixe
  - [ ] /cgv — conditions générales de vente (PRO GOLF DISTRIBUTION)
  - [ ] /mentions-legales — mentions légales (SIREN 888 311 610, RCS Aix)
  - [ ] /politique-retour — politique de retour
- [ ] **Synchro données** : configurateur utilise données hardcodées vs accessoires depuis Supabase

### Phase 2 — E-commerce (EN COURS — 70% fait)

#### FAIT
- [x] Panier Zustand (/panier) avec persistance localStorage
- [x] Checkout Stripe (/api/checkout) — crée session, collecte adresse FR
- [x] Webhook Stripe (/api/webhook) — écrit commandes + items dans Supabase
- [x] Confirmation commande (/checkout/confirmation)
- [x] Bundle builder / configurateur (/configurateur) — 3 accessoires OFFERTS (~105€)

#### RESTE À FAIRE
- [ ] **Frais de livraison 15€ fixe** : ajouter au panier + checkout Stripe
- [ ] Emails transactionnels Resend (confirmation, expédition) — **BLOQUÉ : besoin email @powerbug.fr**
- [ ] Page compte client (commandes, adresses) — lié à auth
- [ ] Admin back-office (filtrage multi-store)

### Phase 3 — SEO (score actuel 60/100)
> Source : Guide Facile-IA SEO v3, audit du 14 mars 2026

#### 3A — Quick Wins SEO (~2-3h, score 60→82)
- [ ] Canonical URLs sur toutes les pages (+4 pts)
- [ ] Schema.org WebSite + Organization JSON-LD dans layout.tsx (+8 pts)
- [ ] Schema.org Product JSON-LD sur fiches NX et NX DHC (+3 pts)
- [ ] Breadcrumb Schema BreadcrumbList JSON-LD (breadcrumbs visuels déjà OK) (+3 pts)
- [ ] Section FAQ visible + Schema FAQPage sur homepage (+2 pts)
- [ ] Google Analytics GA4 (= tableau de bord visiteurs Google, gratuit) (+2 pts)
- [ ] Sitemap dynamique : enrichir de 1 à ~20+ URLs

#### 3B — Contenu SEO (1-2 jours, score 82→90)
- [ ] Enrichir homepage (cible 1000+ mots, paragraphes 30-60 mots)
- [ ] Meta tags optimisés + OG images par page
- [ ] Google Search Console

#### 3C — Blog SEO + AEO (score 90→95+)
- [ ] Blog SEO (5 articles prioritaires)
- [ ] Schema.org étendu pour AEO (VideoObject, Review, etc.)

### Phase 4 — Autorité & Local (post-lancement, 1-3 mois)
- [ ] Google Business Profile
- [ ] Citations NAP, backlinks golf
- [ ] Réseaux sociaux : Facebook + Instagram PowerBug France

### Phase 5 — Go-Live

#### À faire côté Tom
- [ ] Configurer messagerie @powerbug.fr (Zoho Mail Lite ~3€/an) + transmettre records DNS à Jimmy
- [ ] Basculer Stripe en production (Fred a créé son compte — tests en env Tom pour l'instant)
- [ ] Tests complets : achat, paiement, emails, mobile
- [ ] Core Web Vitals optimization

#### En attente tiers
- [ ] Records DNS : Jimmy (jimmy@powerbug.co.uk) doit ajouter 3x MX Zoho + SPF/DKIM Resend (une seule intervention)
- [ ] Credentials DPD : en attente Golf des Marques (email relance envoyé)
- [x] Domaine powerbug.fr → Vercel (FAIT — redirection active)
- [x] Logo HD PowerBug (FAIT — extrait du brand kit UK)
- [x] Compte Stripe Fred (FAIT — créé le 14 mars 2026)

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

## Budget infra récurrent (confirmé 2026)

Mutualisé entre PowerBug + Golf-Shop — 1 seul compte par service :

| Service | Prix/mois | Couvre |
|---------|-----------|--------|
| Vercel Pro | $20 | Les 2 sites (projets illimités) |
| Supabase Pro | $25 | Les 2 sites (1 projet partagé, no pause) |
| ZeptoMail | $0 (puis $1.5/10k) | Emails transactionnels PowerBug |
| Zoho Mail Lite | ~1€ | Boite fred@powerbug.fr |
| **Total fixe** | **~$46/mois (~43€)** | **Les 2 sites** |

- Soit ~21€/site/mois à partager entre clients
- Stripe : variable (1.5% + 0.25€/transaction EU)
- À refaire pour Golf-Shop : ZeptoMail (même compte) + Zoho Mail domaine Golf-Shop
- Au go-live : créer compte Resend Pro ou rester ZeptoMail selon volume

## EN ATTENTE DU CLIENT (Fred) — BLOQUANT POUR GO-LIVE

> **Date** : 7 mars 2026
> **Statut** : Le site est fonctionnel techniquement (panier, checkout Stripe, pages produit).
> Les éléments ci-dessous sont nécessaires pour la mise en ligne légale et opérationnelle.
> Sans ces réponses, on ne peut PAS lancer le site en production.

## Gestion de stock — À CONFIRMER avec Fred

> **Hypothèse de travail** : Fred est distributeur, c'est SON stock (acheté à PowerBug UK),
> stocké chez Golf des Marques. Le site gère le stock, Golf des Marques ne fait que préparer/expédier.
> **Cette hypothèse doit être validée par Fred.**

### Fonctionnement prévu (à confirmer)
```
Fred commande à PowerBug UK → Livré chez Golf des Marques (entrepôt)
→ Fred saisit le stock initial dans l'admin du site
→ Client achète → Stripe webhook décrémente le stock automatiquement
→ Stock bas → Email alerte à Fred → Fred recommande à PowerBug UK
→ Réassort livré chez Golf des Marques → Fred met à jour le stock dans l'admin
```

### Ce qu'on code
- Page admin stock : Fred voit tous les produits + quantités, modifie en 1 clic
- Décrémentation automatique à chaque commande payée (webhook Stripe, DÉJÀ FAIT)
- Alerte email quand stock < seuil configurable (ex: 2 unités)
- Produit à 0 → affiché "Rupture de stock" ou "Sur commande" (au choix de Fred)
- Golf des Marques n'ont PAS accès à l'admin stock — c'est Fred qui gère

### Questions à confirmer avec Fred
- [ ] **C'est bien ton stock** (acheté à PowerBug UK) stocké chez Golf des Marques ?
- [ ] **Stock initial** : combien de chaque produit aujourd'hui ? (on a besoin des chiffres pour paramétrer)
- [ ] **Seuil d'alerte** : prévenu à combien d'unités restantes ? (suggestion : 2)
- [ ] **Produit à 0** : afficher "Sur commande — délai X jours" ou masquer du site ?
- [ ] **Délai de réassort** depuis PowerBug UK ? (pour afficher un délai réaliste si rupture)
- [ ] **Fréquence de vérification** : Fred vérifie le stock réel chez Golf des Marques à quelle fréquence ?

## Scénarios automatisation commandes

> Choix à valider avec Fred. Recommandation : **Option 2 au lancement, Option 3 plus tard.**

### Option 1 — Manuel (déconseillé long terme)
```
Client paie → Fred reçoit email notification
→ Fred transmet manuellement à Golf des Marques (email/WhatsApp)
→ Golf des Marques expédie via DPD
→ Golf des Marques renvoie ref tracking à Fred
→ Fred saisit le tracking dans l'admin du site
→ Email de suivi envoyé au client
```
**Avantages** : Rien à coder côté logistique, Fred garde le contrôle total
**Inconvénients** : Beaucoup de saisie manuelle, risque d'oubli du tracking, délai entre expédition et notification client, ne scale pas au-delà de quelques commandes/jour

### Option 2 — Semi-auto (fallback si pas d'accès DPD API)
```
Client paie → webhook Stripe écrit la commande en base (DÉJÀ FAIT)
→ Email auto au client : confirmation de commande
→ Email auto à Golf des Marques : bon de préparation PDF
  (nom, adresse complète, liste produits, quantités)
→ Golf des Marques créent l'étiquette DPD eux-mêmes, expédient
→ Quelqu'un saisit le tracking dans l'admin
→ Email de suivi envoyé automatiquement au client
```
**Avantages** : Peu de dev supplémentaire, Golf des Marques reçoivent tout sans intervention de Fred
**Inconvénients** : Le tracking reste une saisie manuelle, Golf des Marques doivent créer l'étiquette DPD eux-mêmes
**Ce qu'on doit coder** :
- Email confirmation client (Resend, template PowerBug)
- Email bon de préparation PDF à Golf des Marques (Resend + génération PDF)
- Page admin pour saisir le tracking → déclenche email suivi client
- Dashboard admin : liste commandes, statuts, filtres

### Option 3 — Full auto (RECOMMANDÉE — si Golf des Marques donnent les codes DPD)
```
Client paie → webhook Stripe écrit la commande en base (DÉJÀ FAIT)
→ Stock vérifié automatiquement en base
→ Email auto au client : confirmation de commande
→ API DPD : étiquette générée automatiquement avec numéro de tracking
→ Email auto à Golf des Marques : bon de préparation + étiquette DPD en pièce jointe
→ Golf des Marques impriment, collent l'étiquette, déposent le colis
→ Tracking mis à jour automatiquement via API DPD
→ Email de suivi envoyé au client à chaque étape
→ Zéro saisie manuelle pour tout le monde
```
**Avantages** : Golf des Marques n'ont qu'à imprimer et coller, tracking instantané, expérience client premium
**Inconvénients** : Nécessite les credentials DPD de Golf des Marques
**Prérequis (le seul bloquant)** :
- Credentials du compte DPD Pro de Golf des Marques (identifiant API, mot de passe, numéro de compte, code dépôt)
- Adresse exacte de l'entrepôt Golf des Marques (expéditeur sur l'étiquette)
- Accès API activé sur leur compte DPD (gratuit, demande à DPD si pas encore fait)
**Ce qu'on doit coder en plus de l'Option 2** :
- Intégration API DPD : génération étiquette PDF, récupération tracking
- Polling tracking DPD → mise à jour statut commande + email client automatique

### 9. Images / Contenu
- [ ] **Logo PowerBug HD** (PNG ou SVG) — on utilise du texte pour l'instant
- [ ] **Photos produit** : on utilise le CDN powerbug.com.au, est-ce OK définitivement ou Fred veut ses propres photos ?
- [ ] **Autorisation PowerBug UK** pour utiliser les images/vidéos du site officiel sur powerbug.fr ?

### 10. Après lancement
- [ ] **Google Analytics** : Fred a-t-il un compte GA4 ? Sinon on le crée
- [ ] **Réseaux sociaux** : pages Facebook / Instagram PowerBug France existantes ou à créer ?

## Architecture Stripe (encaissement uniquement)

> Stripe ne gère PAS les produits. Notre base Supabase est la source de vérité.
> Stripe = terminal de paiement, rien d'autre.

### Flow de paiement (DÉJÀ CODÉ)
```
1. Client clique "Payer" sur /panier
2. Notre API /api/checkout lit le panier + prix depuis Supabase
3. Crée une Stripe Checkout Session à la volée (line items dynamiques, pas de produit Stripe)
4. Client paie sur la page hébergée par Stripe (CB, Apple Pay, Google Pay)
5. Stripe envoie webhook "payment_intent.succeeded" → /api/webhook
6. Notre webhook : écrit la commande en base Supabase, décrémente le stock, envoie emails
7. Stripe verse l'argent sur le compte bancaire de Fred (J+2 par défaut)
```

### Ce que Fred doit faire
- Créer un compte Stripe (10 min) : https://dashboard.stripe.com/register
- Renseigner son IBAN professionnel + pièce d'identité (KYC obligatoire)
- Nous transmettre les 3 clés : Publishable Key, Secret Key, Webhook Secret
- C'est tout — Fred ne touche plus jamais à Stripe, tout est automatique

### Ce qu'on NE fait PAS dans Stripe
- Pas de création de produits dans Stripe (nos produits sont en Supabase)
- Pas de gestion de stock dans Stripe
- Pas de factures Stripe (on génère les nôtres si besoin)
- Pas de Stripe Billing / abonnements

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
