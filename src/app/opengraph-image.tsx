import { ImageResponse } from "next/og";

export const alt = "Yosua Elbetellus: Information Systems student, Business Intelligence. Data models, dashboards, and decisions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link preview card in the site's blueprint style. */
export default function OpengraphImage() {
  const grid = "rgba(108,134,180,0.14)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#08111f",
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          color: "#e7edf7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, letterSpacing: 4, color: "#93a4c3" }}>
          <div
            style={{
              display: "flex",
              width: 54,
              height: 54,
              border: "2px solid #6c86b4",
              alignItems: "center",
              justifyContent: "center",
              color: "#e7edf7",
              fontSize: 22,
              letterSpacing: 0,
              fontWeight: 700,
            }}
          >
            YE
          </div>
          PORTFOLIO · DATA · BI · SYSTEMS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>Yosua Elbetellus</div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#c3d0e6", maxWidth: 900, lineHeight: 1.25 }}>
            I turn business processes into data models, dashboards, and decisions.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#93a4c3" }}>
          <span>Information Systems · BINUS University · GPA 3.92</span>
          <span style={{ color: "#f5b544" }}>yosuaelbetellus.vercel.app</span>
        </div>
      </div>
    ),
    size,
  );
}
