import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "PowerBug France — Chariots Électriques de Golf Premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Load Poppins fonts (TTF format required by Satori)
  const poppinsSemiBold = readFileSync(
    join(process.cwd(), "app", "fonts", "Poppins-SemiBold.ttf")
  );
  const poppinsRegular = readFileSync(
    join(process.cwd(), "app", "fonts", "Poppins-Regular.ttf")
  );

  // Load logo from filesystem
  let logoSrc: string | null = null;
  try {
    const logoPath = join(process.cwd(), "public", "images", "powerbug-logo.png");
    const logoData = readFileSync(logoPath);
    logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  } catch {
    // Fallback to text-only if logo not found
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFFF",
          fontFamily: "Poppins",
          position: "relative",
        }}
      >
        {/* Green accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: "#356B0D",
            display: "flex",
          }}
        />

        {/* Logo or fallback text */}
        {logoSrc ? (
          <img
            src={logoSrc}
            width={500}
            height={91}
            style={{ marginBottom: 32 }}
          />
        ) : (
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: "#0F0F10",
              marginBottom: 32,
              letterSpacing: 4,
              display: "flex",
            }}
          >
            POWERBUG
          </div>
        )}

        {/* Green separator line */}
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: "#8DC63F",
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#0F0F10",
            marginBottom: 16,
            display: "flex",
          }}
        >
          Chariots Électriques de Golf Premium
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: "#666666",
            marginBottom: 20,
            fontWeight: 400,
            display: "flex",
          }}
        >
          Distributeur exclusif France · Depuis 2003
        </div>

        {/* Trust signal */}
        <div
          style={{
            fontSize: 18,
            color: "#356B0D",
            fontWeight: 600,
            display: "flex",
          }}
        >
          8 300+ avis — Note 4.9/5
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            fontSize: 16,
            color: "#999999",
            fontWeight: 400,
            display: "flex",
          }}
        >
          powerbug.fr
        </div>

        {/* Green accent bar bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: "#356B0D",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: poppinsSemiBold, style: "normal" as const, weight: 600 as const },
        { name: "Poppins", data: poppinsRegular, style: "normal" as const, weight: 400 as const },
      ],
    }
  );
}
