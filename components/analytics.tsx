"use client";

import Script from "next/script";

const GA_ID = "G-VEKW0YYE2L";

/**
 * Google Analytics with Consent Mode v2 (CNIL-compliant).
 * - Loads gtag.js immediately but with analytics_storage denied by default
 * - CookieConsent component calls gtag("consent", "update", { analytics_storage: "granted" })
 *   when user accepts, which activates tracking
 * - If user refuses or hasn't consented, no analytics cookies are set
 */
export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-consent-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;

          // Consent Mode v2: denied by default (CNIL-compliant)
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });

          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
