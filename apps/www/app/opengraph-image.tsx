import { ImageResponse } from "next/og";

export const alt = "Paubha — Open-source components for React & Tailwind";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
          backgroundColor: "#1A2150",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(68,105,229,0.4), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#4469E5",
            }}
          />
          <span
            style={{
              fontSize: "40px",
              fontWeight: 600,
              color: "#F9FAFB",
              letterSpacing: "-0.02em",
            }}
          >
            Paubha
          </span>
        </div>
        <span
          style={{
            fontSize: "34px",
            fontWeight: 400,
            color: "#C2D1F9",
            textAlign: "center",
            maxWidth: "760px",
          }}
        >
          Open-source components for React &amp; Tailwind
        </span>
      </div>
    ),
    { ...size },
  );
}
