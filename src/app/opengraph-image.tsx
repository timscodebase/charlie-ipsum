import { ImageResponse } from "next/og";

export const alt = "Charlie Ipsum - The Conservative Lorem Ipsum & Debate Copy Engine";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#060a14",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(37,99,235,0.3) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(239,68,68,0.3) 0%, transparent 45%)",
          color: "#ffffff",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Patriotic Tricolor Accent Bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #dc2626 0%, #ffffff 50%, #2563eb 100%)",
          }}
        />

        {/* Brand Shield Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            borderRadius: "30px",
            padding: "8px 24px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#60a5fa">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#93c5fd",
            }}
          >
            Turning Point USA Edition
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "76px",
            fontWeight: 900,
            letterSpacing: "-2px",
            marginBottom: "16px",
          }}
        >
          <span>CHARLIE</span>
          <span
            style={{
              color: "#ef4444",
            }}
          >
            IPSUM
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "24px",
            color: "#cbd5e1",
            textAlign: "center",
            maxWidth: "860px",
            lineHeight: 1.4,
            marginBottom: "36px",
          }}
        >
          The Debate-Ready Lorem Ipsum & Conservative Rhetoric Generator for Developers, Designers, and Patriots
        </p>

        {/* Feature Pills */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {["Campus Clash", "Constitutional", "Free Enterprise", "TPUSA Rally"].map((lens) => (
            <div
              key={lens}
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.7)",
                border: "1px solid rgba(71, 85, 105, 0.6)",
                borderRadius: "10px",
                padding: "8px 18px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              {lens}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
