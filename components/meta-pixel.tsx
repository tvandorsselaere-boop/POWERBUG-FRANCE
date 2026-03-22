"use client";

import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Meta Pixel (Facebook Pixel) with CNIL-compliant consent.
 * - Loads fbevents.js but with consent REVOKED by default
 * - CookieConsent component calls fbq("consent", "grant") when user accepts
 * - If user refuses or hasn't consented, no tracking cookies are set
 * - If NEXT_PUBLIC_META_PIXEL_ID is not set, renders nothing (graceful skip)
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          // Consent revoked by default (CNIL-compliant)
          fbq('consent', 'revoke');
          fbq('init', '${PIXEL_ID}');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
