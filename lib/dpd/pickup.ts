// MyPudo SOAP client — DPD Pickup relay point search
// Public credentials (no secret needed)

const MYPUDO_URL = "https://mypudo.pickup-services.com/mypudo/mypudo.asmx";
const CARRIER = "EXA";
const KEY = "deecd7bc81b71fcc0e292b53e826c48f";

export interface RelayPoint {
  id: string;
  name: string;
  address: string;
  zipCode: string;
  city: string;
  latitude: number;
  longitude: number;
  distance: string; // e.g. "0.4 km"
  openingHours: string[];
}

export async function searchRelayPoints(zipCode: string, city?: string): Promise<RelayPoint[]> {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetPudoList xmlns="http://mypudo.pickup-services.com/v4/">
      <carrier>${CARRIER}</carrier>
      <key>${KEY}</key>
      <address></address>
      <zipCode>${escapeXml(zipCode)}</zipCode>
      <city>${escapeXml(city ?? "")}</city>
      <countrycode>FR</countrycode>
      <requestID>1</requestID>
      <date_from>${today}</date_from>
      <max_pudo_number>10</max_pudo_number>
      <max_distance_search>15000</max_distance_search>
      <weight>5000</weight>
    </GetPudoList>
  </soap:Body>
</soap:Envelope>`;

  const res = await fetch(MYPUDO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://mypudo.pickup-services.com/v4/GetPudoList",
    },
    body: soapBody,
  });

  if (!res.ok) {
    throw new Error(`MyPudo API error: ${res.status}`);
  }

  const xml = await res.text();
  return parseRelayPoints(xml);
}

// Simple XML tag extraction (no dependency needed for this structure)
function getTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i");
  const m = xml.match(re);
  return m ? m[1].trim() : "";
}

function getAllBlocks(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>[\\s\\S]*?</${tag}>`, "gi");
  return xml.match(re) ?? [];
}

function parseRelayPoints(xml: string): RelayPoint[] {
  const pudoBlocks = getAllBlocks(xml, "PUDO_ITEM");

  return pudoBlocks.map((block) => {
    const distanceM = parseFloat(getTag(block, "DISTANCE")) || 0;
    const distanceKm = (distanceM / 1000).toFixed(1);

    // Parse opening hours
    const dayBlocks = getAllBlocks(block, "OPENING_HOURS_ITEMS");
    const hours: string[] = [];
    for (const day of dayBlocks) {
      const dayName = getTag(day, "DAY_ID");
      const slots = getAllBlocks(day, "OPENING_HOURS_ITEM");
      const timeParts: string[] = [];
      for (const slot of slots) {
        const start = getTag(slot, "START_TM");
        const end = getTag(slot, "END_TM");
        if (start && end) timeParts.push(`${start}-${end}`);
      }
      if (timeParts.length > 0) {
        hours.push(`${dayLabel(dayName)}: ${timeParts.join(", ")}`);
      }
    }

    return {
      id: getTag(block, "PUDO_ID"),
      name: getTag(block, "NAME"),
      address: getTag(block, "ADDRESS1"),
      zipCode: getTag(block, "ZIPCODE"),
      city: getTag(block, "CITY"),
      latitude: parseFloat(getTag(block, "LATITUDE")) || 0,
      longitude: parseFloat(getTag(block, "LONGITUDE")) || 0,
      distance: `${distanceKm} km`,
      openingHours: hours,
    };
  });
}

function dayLabel(id: string): string {
  const days: Record<string, string> = {
    "1": "Lun", "2": "Mar", "3": "Mer", "4": "Jeu",
    "5": "Ven", "6": "Sam", "7": "Dim",
  };
  return days[id] ?? id;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
