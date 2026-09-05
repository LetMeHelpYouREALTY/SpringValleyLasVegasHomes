import { ImageResponse } from "next/og";

/** Edge avoids Windows Node path quirks in `@vercel/og` when prerendering OG routes. */
export const runtime = "edge";

export const alt = "Spring Valley Las Vegas — Homes By Dr. Jan Duffy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tagline =
  "Spring Valley Las Vegas homes and west valley real estate with Dr. Jan Duffy, REALTOR® at Berkshire Hathaway HomeServices Nevada Properties.";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0f172a 100%)",
          padding: 56,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          Spring Valley Las Vegas
        </div>
        <div style={{ fontSize: 28, color: "#93c5fd", marginTop: 16 }}>
          Homes By Dr. Jan Duffy
        </div>
        <div style={{ fontSize: 22, color: "#cbd5e1", marginTop: 28, maxWidth: 920, lineHeight: 1.4 }}>
          {tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
