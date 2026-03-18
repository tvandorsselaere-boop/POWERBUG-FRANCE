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
  const now = new Date();
  const today = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetPudoList xmlns="http://MyPudo.pickup-services.com/">
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
      SOAPAction: "http://MyPudo.pickup-services.com/GetPudoList",
    },
    body: soapBody,
  });

  const xml = await res.text();

  if (!res.ok) {
    throw new Error(`MyPudo API error: ${res.status}`);
  }

  // Check for SOAP-level errors
  const errorMatch = xml.match(/<ERROR[^>]*>([^<]*)<\/ERROR>/i);
  if (errorMatch) {
    throw new Error(`MyPudo error: ${errorMatch[1]}`);
  }

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

    // Parse opening hours — each OPENING_HOURS_ITEM is flat with DAY_ID/START_TM/END_TM
    const slots = getAllBlocks(block, "OPENING_HOURS_ITEM");
    const byDay: Record<string, string[]> = {};
    for (const slot of slots) {
      const dayId = getTag(slot, "DAY_ID");
      const start = getTag(slot, "START_TM");
      const end = getTag(slot, "END_TM");
      if (dayId && start && end) {
        if (!byDay[dayId]) byDay[dayId] = [];
        byDay[dayId].push(`${start}-${end}`);
      }
    }
    const hours: string[] = [];
    for (const [dayId, times] of Object.entries(byDay)) {
      hours.push(`${dayLabel(dayId)}: ${times.join(", ")}`);
    }

    // Lat/long use comma as decimal separator in French locale
    const parseFrench = (s: string) => parseFloat(s.replace(",", ".")) || 0;

    return {
      id: getTag(block, "PUDO_ID"),
      name: getTag(block, "NAME"),
      address: getTag(block, "ADDRESS1"),
      zipCode: getTag(block, "ZIPCODE"),
      city: getTag(block, "CITY"),
      latitude: parseFrench(getTag(block, "LATITUDE")),
      longitude: parseFrench(getTag(block, "LONGITUDE")),
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
