import { ImageResponse } from "next/og";

import { profile } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated at build time. Styling is limited to what Satori
 * supports — flexbox, solid fills and linear gradients — so no fancy CSS here.
 */
export default async function OpenGraphImage() {
  const highlights = ["Solidity", "Smart Contracts", "React", "Node.js", "TypeScript"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #05070f 0%, #0d1226 55%, #131a3a 100%)",
          color: "#e9eefb",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #4f46e5, #7c3aed 50%, #06b6d4)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #4f46e5, #7c3aed 55%, #06b6d4)",
              fontSize: 26,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            PT
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#96a3bd",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 34,
              fontWeight: 600,
              color: "#8b93fb",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 25,
              lineHeight: 1.45,
              color: "#96a3bd",
              maxWidth: 900,
            }}
          >
            Ethereum smart contracts, decentralized applications and full-stack web
            platforms.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {highlights.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: 21,
                  color: "#c7d2e8",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 21, color: "#6d7b95" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
