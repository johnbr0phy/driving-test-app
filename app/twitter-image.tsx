import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "TigerTest - Free DMV Practice Tests for All 50 States";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public", "hero-logo.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

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
          backgroundColor: "#1e293b",
          padding: "40px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          width={800}
          height={533}
          alt="TigerTest"
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#94a3b8",
            marginTop: 10,
          }}
        >
          Free DMV Practice Tests for All 50 States
        </div>
      </div>
    ),
    { ...size }
  );
}
