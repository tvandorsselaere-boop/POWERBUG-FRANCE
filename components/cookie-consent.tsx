"use client";

import { useState, useEffect } from "react";

const COOKIE_NAME = "cookie_consent";
const CONSENT_DURATION_DAYS = 390; // CNIL recommande max 13 mois

type ConsentValue = "accepted" | "refused";

function setConsentCookie(value: ConsentValue) {
  const expires = new Date();
  expires.setDate(expires.getDate() + CONSENT_DURATION_DAYS);
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
}

function getConsentCookie(): ConsentValue | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (match && (match[1] === "accepted" || match[1] === "refused")) {
    return match[1] as ConsentValue;
  }
  return null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsentCookie();
    if (!consent) {
      setVisible(true);
    } else if (consent === "accepted") {
      enableGA4();
      enableMetaPixel();
    }
  }, []);

  function enableGA4() {
    // Google Consent Mode v2: update to granted
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }

  function enableMetaPixel() {
    // Meta Pixel: grant consent and fire PageView
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("consent", "grant");
      window.fbq("track", "PageView");
    }
  }

  function handleAccept() {
    setConsentCookie("accepted");
    setVisible(false);
    enableGA4();
    enableMetaPixel();
  }

  function handleRefuse() {
    setConsentCookie("refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-[#DBDBDB] bg-white px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[#6B7280]">
          Ce site utilise Google Analytics et Meta Pixel pour mesurer son audience.
          Ces cookies ne sont déposés qu&apos;avec votre consentement.{" "}
          <a href="/politique-confidentialite" className="text-[#356B0D] underline">
            En savoir plus
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleRefuse}
            className="rounded-[10px] border border-[#DBDBDB] bg-white px-5 py-2 text-sm font-medium text-[#0F0F10] transition-colors hover:bg-[#F5F5F5]"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="rounded-[10px] bg-[#356B0D] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2a5609]"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
