#!/bin/bash
# Script de monitoring PowerBug France
# Usage: bash scripts/check-site.sh

BASE="https://www.powerbug.fr"
ERRORS=0
TOTAL=0

echo "====================================="
echo " PowerBug France — Check site"
echo " $(date '+%Y-%m-%d %H:%M:%S')"
echo "====================================="
echo ""

# Pages principales
PAGES=(
  "/"
  "/trolleys"
  "/trolleys/nx-lithium"
  "/trolleys/nx-dhc-lithium"
  "/accessoires"
  "/panier"
  "/videos"
  "/contact"
  "/faq"
  "/garantie"
  "/livraison"
  "/cgv"
  "/mentions-legales"
  "/politique-retour"
  "/notre-histoire"
  "/pieces-detachees"
  "/avis"
  "/fonctionnalites/pliage-vrap"
  "/fonctionnalites/28v-power"
  "/fonctionnalites/roue-anti-colmatage"
  "/fonctionnalites/nx-handle"
  "/fonctionnalites/pneus-winter-ready"
  "/fonctionnalites/station-accessoires"
  "/fonctionnalites/downhill-control"
  "/fonctionnalites/frein-parking"
  "/compte"
  "/checkout/confirmation"
)

# API endpoints
APIS=(
  "/api/webhook"
  "/api/contact"
)

echo "1. PAGES (HTTP 200 attendu)"
echo "-----------------------------------"
for page in "${PAGES[@]}"; do
  TOTAL=$((TOTAL + 1))
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "${BASE}${page}")
  if [ "$STATUS" = "200" ]; then
    echo "  OK  $STATUS  $page"
  elif [ "$STATUS" = "307" ] || [ "$STATUS" = "308" ]; then
    echo "  ->  $STATUS  $page (redirect, normal si non connecte)"
  else
    echo "  FAIL $STATUS  $page"
    ERRORS=$((ERRORS + 1))
  fi
done

echo ""
echo "2. API ENDPOINTS"
echo "-----------------------------------"
for api in "${APIS[@]}"; do
  TOTAL=$((TOTAL + 1))
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "${BASE}${api}")
  # Les APIs retournent 405 (method not allowed) en GET, c'est normal
  if [ "$STATUS" = "200" ] || [ "$STATUS" = "405" ] || [ "$STATUS" = "400" ]; then
    echo "  OK  $STATUS  $api (endpoint accessible)"
  else
    echo "  FAIL $STATUS  $api"
    ERRORS=$((ERRORS + 1))
  fi
done

echo ""
echo "3. RESOURCES CRITIQUES"
echo "-----------------------------------"
RESOURCES=(
  "/images/nx-main.jpg"
  "/images/nx-dhc-main.jpg"
  "/images/powerbug-logo.png"
  "/videos/desktop.mp4"
  "/sitemap.xml"
  "/robots.txt"
)
for res in "${RESOURCES[@]}"; do
  TOTAL=$((TOTAL + 1))
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "${BASE}${res}")
  if [ "$STATUS" = "200" ]; then
    echo "  OK  $STATUS  $res"
  else
    echo "  FAIL $STATUS  $res"
    ERRORS=$((ERRORS + 1))
  fi
done

echo ""
echo "4. STRIPE WEBHOOK (POST test)"
echo "-----------------------------------"
TOTAL=$((TOTAL + 1))
STRIPE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST --max-time 10 "${BASE}/api/webhook")
if [ "$STRIPE_STATUS" = "400" ] || [ "$STRIPE_STATUS" = "401" ]; then
  echo "  OK  $STRIPE_STATUS  /api/webhook (rejette requete sans signature, normal)"
else
  echo "  WARN $STRIPE_STATUS  /api/webhook (reponse inattendue)"
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "5. HTTPS & REDIRECTS"
echo "-----------------------------------"
TOTAL=$((TOTAL + 1))
# Verifie que http redirige vers https
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://www.powerbug.fr")
if [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "308" ]; then
  echo "  OK  $HTTP_STATUS  http -> https redirect"
else
  echo "  WARN $HTTP_STATUS  http://www.powerbug.fr (redirect attendu)"
  ERRORS=$((ERRORS + 1))
fi

TOTAL=$((TOTAL + 1))
# Verifie que powerbug.fr redirige vers www.powerbug.fr
APEX_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://powerbug.fr")
if [ "$APEX_STATUS" = "301" ] || [ "$APEX_STATUS" = "308" ] || [ "$APEX_STATUS" = "200" ]; then
  echo "  OK  $APEX_STATUS  powerbug.fr -> www.powerbug.fr"
else
  echo "  WARN $APEX_STATUS  https://powerbug.fr"
  ERRORS=$((ERRORS + 1))
fi

# Resume
echo ""
echo "====================================="
if [ $ERRORS -eq 0 ]; then
  echo " RESULTAT: OK — $TOTAL/$TOTAL checks passes"
else
  echo " RESULTAT: $ERRORS ERREUR(S) sur $TOTAL checks"
fi
echo "====================================="
