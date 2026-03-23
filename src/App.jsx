import React, { useState } from "react";

const T = {
  bg: "#0b1220",
  panel: "#1e293b",
  panelDark: "#0f172a",
  border: "rgba(148,163,184,0.18)",
  blue: "#2563eb",
  text: "#ffffff",
  textDim: "#cbd5e1",
  textMuted: "#94a3b8",
  dangerBg: "rgba(127,29,29,0.25)",
  dangerBorder: "rgba(248,113,113,0.35)",
  dangerText: "#fecaca"
};

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toBase64 = (pdfFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(pdfFile);
      reader.onload = () => {
        const full = reader.result || "";
        const pdfBase64 = String(full).split(",")[1];
        resolve(pdfBase64);
      };
      reader.onerror = reject;
    });

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a PDF plan.");
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      alert("Please upload a PDF smaller than 30 MB.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const pdfBase64 = await toBase64(file);

      const response = await fetch("https://hivesta-backend-1.onrender.com/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fileName: file.name,
          pdfBase64
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: "Failed to upload or analyze PDF."
      });
    } finally {
      setLoading(false);
    }
  };

  const area = result?.area_tabulation || {};
  const rooms = Array.isArray(result?.rooms) ? result.rooms : [];
  const windowsDoors = Array.isArray(result?.windows_doors) ? result.windows_doors : [];
  const garageDoors = Array.isArray(result?.garage_doors) ? result.garage_doors : [];
  const plumbing = Array.isArray(result?.plumbing) ? result.plumbing : [];
  const electrical = Array.isArray(result?.electrical) ? result.electrical : [];
  const flooring = result?.flooring || {};
  const foundation = result?.foundation || {};
  const foundationStages = Array.isArray(foundation?.stages) ? foundation.stages : [];

  const totalWindows = windowsDoors
    .filter((x) => x.type === "window")
    .reduce((sum, x) => sum + (Number(x.qty) || 0), 0);

  const totalDoors = windowsDoors
    .filter((x) => x.type !== "window")
    .reduce((sum, x) => sum + (Number(x.qty) || 0), 0);

  const totalGarageDoors = garageDoors.reduce((sum, x) => sum + (Number(x.qty) || 0), 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
        color: T.text,
        fontFamily: "Arial, sans-serif",
        padding: "24px"
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "14px",
              color: "#93c5fd",
              marginBottom: "10px",
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}
          >
            HIVESTA CONSTRUCTION
          </div>

          <h1 style={{ fontSize: "40px", margin: "0 0 10px 0", fontWeight: "700" }}>
            Hivesta Takeoff Pro
          </h1>

          <p style={{ margin: 0, color: T.textDim, fontSize: "18px", lineHeight: "1.6" }}>
            Upload your construction plans and get an AI-ready takeoff workflow.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: "24px",
            alignItems: "start"
          }}
        >
          <div
            style={{
              background: "rgba(30, 41, 59, 0.95)",
              border: `1px solid ${T.border}`,
              borderRadius: "18px",
              padding: "28px"
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "18px", fontSize: "24px" }}>
              Upload Plan PDF
            </h2>

            <div
              style={{
                border: "2px dashed #3b82f6",
                borderRadius: "16px",
                padding: "30px",
                background: "rgba(15, 23, 42, 0.75)",
                textAlign: "center",
                marginBottom: "20px"
              }}
            >
              <div style={{ fontSize: "42px", marginBottom: "12px" }}>📄</div>

              <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
                Select your construction plan
              </div>

              <div style={{ color: T.textMuted, marginBottom: "18px" }}>
                Upload floor plan, elevation, or blueprint PDF
              </div>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{
                  background: "#ffffff",
                  color: "#111827",
                  padding: "12px",
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: "360px"
                }}
              />
            </div>

            {file && (
              <div
                style={{
                  background: "rgba(37, 99, 235, 0.15)",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "20px"
                }}
              >
                <div style={{ fontSize: "14px", color: "#93c5fd", marginBottom: "6px" }}>
                  Selected File
                </div>
                <div style={{ fontWeight: "600", fontSize: "16px" }}>{file.name}</div>
                <div style={{ color: T.textMuted, marginTop: "6px", fontSize: "14px" }}>
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px 20px",
                background: loading ? "#475569" : T.blue,
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "17px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Analyzing Plan..." : "Analyze Plan"}
            </button>

            <div
              style={{
                marginTop: "22px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px"
              }}
            >
              <MiniCard title="Input" value="PDF Plan" />
              <MiniCard title="Mode" value="AI Takeoff" />
              <MiniCard title="Status" value={loading ? "Running" : "Ready"} />
            </div>
          </div>

          <div
            style={{
              background: "rgba(30, 41, 59, 0.95)",
              border: `1px solid ${T.border}`,
              borderRadius: "18px",
              padding: "28px"
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "18px", fontSize: "24px" }}>
              Output Preview
            </h2>

            {!result && !loading && (
              <div
                style={{
                  borderRadius: "14px",
                  background: "rgba(15, 23, 42, 0.65)",
                  padding: "28px",
                  color: T.textMuted,
                  lineHeight: "1.7"
                }}
              >
                Upload a PDF plan and click <strong style={{ color: "#ffffff" }}>Analyze Plan</strong>.
              </div>
            )}

            {loading && (
              <div
                style={{
                  borderRadius: "14px",
                  background: "rgba(15, 23, 42, 0.65)",
                  padding: "28px"
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
                  Processing your plan...
                </div>
                <div style={{ color: T.textMuted }}>
                  Reading PDF, extracting rooms, openings, flooring, and foundation data.
                </div>
              </div>
            )}

            {result?.error && (
              <div
                style={{
                  borderRadius: "14px",
                  background: T.dangerBg,
                  border: `1px solid ${T.dangerBorder}`,
                  padding: "20px",
                  color: T.dangerText
                }}
              >
                {result.error}
              </div>
            )}

            {result && !result.error && (
              <div style={{ display: "grid", gap: "16px" }}>
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.72)",
                    borderRadius: "14px",
                    padding: "18px"
                  }}
                >
                  <div style={{ color: "#93c5fd", fontSize: "13px", marginBottom: "6px" }}>
                    PROJECT
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "700" }}>
                    {result.plan_name || file?.name || "Uploaded Plan"}
                  </div>
                  <div style={{ color: T.textDim, marginTop: "6px" }}>
                    {result.address || "Address not extracted"}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "14px"
                  }}
                >
                  <StatCard label="Living SF" value={fmt(area.living)} />
                  <StatCard label="Garage SF" value={fmt(area.garage)} />
                  <StatCard label="Lanai SF" value={fmt(area.lanai)} />
                  <StatCard label="Total Under Roof" value={fmt(area.total_under_roof)} />
                  <StatCard label="Rooms" value={fmt(rooms.length)} />
                  <StatCard label="Ceiling Height" value={result.ceiling_height_ft ? `${result.ceiling_height_ft} ft` : "--"} />
                </div>

                <Section title="Openings Summary">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
                    <StatCard label="Windows" value={fmt(totalWindows)} />
                    <StatCard label="Doors / Sliders" value={fmt(totalDoors)} />
                    <StatCard label="Garage Doors" value={fmt(totalGarageDoors)} />
                  </div>
                </Section>

                <Section title="Flooring Summary">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
                    <StatCard label="Interior Floor SF" value={fmt(flooring.interior_floor_sf)} />
                    <StatCard label="Bath Floor SF" value={fmt(flooring.bath_floor_sf)} />
                    <StatCard label="Bath Wall Tile SF" value={fmt(flooring.bath_wall_tile_sf)} />
                    <StatCard label="Shower Floor SF" value={fmt(flooring.shower_floor_sf)} />
                  </div>
                </Section>

                <Section title="Foundation Summary">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
                    <StatCard label="Perimeter LF" value={fmt(foundation.perimeter_lf)} />
                    <StatCard label="Slab SF" value={fmt(foundation.slab_sf)} />
                    <StatCard label="Wall SF" value={fmt(foundation.wall_sf)} />
                  </div>
                </Section>
              </div>
            )}
          </div>
        </div>

        {result && !result.error && (
          <div style={{ marginTop: "24px", display: "grid", gap: "18px" }}>
            <Section title="Rooms">
              <SimpleTable
                columns={["Room", "Length", "Width", "Interior SF", "SF Source", "Category", "Ref"]}
                rows={rooms.map((r) => [
                  r.name || "--",
                  r.length || "--",
                  r.width || "--",
                  fmt(r.sqft_interior),
                  r.sqft_source || "--",
                  r.category || "--",
                  r.ref || "--"
                ])}
              />
            </Section>

            <Section title="Windows & Doors">
              <SimpleTable
                columns={["Item", "Size", "Location", "Qty", "Type", "Ref"]}
                rows={windowsDoors.map((r) => [
                  r.item || "--",
                  r.size || "--",
                  r.location || "--",
                  fmt(r.qty),
                  r.type || "--",
                  r.ref || "--"
                ])}
              />
            </Section>

            <Section title="Garage Doors">
              <SimpleTable
                columns={["Item", "Size", "Location", "Qty", "Ref"]}
                rows={garageDoors.map((r) => [
                  r.item || "--",
                  r.size || "--",
                  r.location || "--",
                  fmt(r.qty),
                  r.ref || "--"
                ])}
              />
            </Section>

            <Section title="Plumbing">
              <SimpleTable
                columns={["Item", "Location", "Qty", "Ref"]}
                rows={plumbing.map((r) => [
                  r.item || "--",
                  r.location || "--",
                  fmt(r.qty),
                  r.ref || "--"
                ])}
              />
            </Section>

            <Section title="Electrical">
              <SimpleTable
                columns={["Item", "Location", "Qty", "Ref"]}
                rows={electrical.map((r) => [
                  r.item || "--",
                  r.location || "--",
                  fmt(r.qty),
                  r.ref || "--"
                ])}
              />
            </Section>

            <Section title="Flooring Details">
              <SimpleTable
                columns={["Area", "Type", "SF", "Source", "Ref"]}
                rows={(Array.isArray(flooring.details) ? flooring.details : []).map((r) => [
                  r.area || "--",
                  r.type || "--",
                  fmt(r.sqft),
                  r.source || "--",
                  r.ref || "--"
                ])}
              />
            </Section>

            <Section title="Foundation Stages">
              {foundationStages.length === 0 ? (
                <div style={{ color: T.textMuted }}>No foundation stage data found.</div>
              ) : (
                foundationStages.map((stage, idx) => (
                  <div key={idx} style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>
                      {stage.stage || `Stage ${idx + 1}`}
                    </div>
                    <SimpleTable
                      columns={["Activity", "Qty", "Unit", "Ref", "Note"]}
                      rows={(Array.isArray(stage.items) ? stage.items : []).map((r) => [
                        r.activity || "--",
                        fmt(r.qty),
                        r.unit || "--",
                        r.ref || "--",
                        r.note || "--"
                      ])}
                    />
                  </div>
                ))
              )}
            </Section>

            <Section title="Raw JSON">
              <pre
                style={{
                  margin: 0,
                  background: T.panelDark,
                  padding: "16px",
                  borderRadius: "10px",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  color: T.textDim,
                  fontSize: "13px",
                  lineHeight: "1.6"
                }}
              >
                {JSON.stringify(result, null, 2)}
              </pre>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function fmt(v) {
  if (v === null || v === undefined || v === "") return "--";
  const n = Number(v);
  if (!Number.isNaN(n)) return n.toLocaleString("en-US");
  return String(v);
}

function MiniCard({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.75)",
        borderRadius: "12px",
        padding: "14px"
      }}
    >
      <div style={{ fontSize: "12px", color: T.textMuted, marginBottom: "6px" }}>{title}</div>
      <div style={{ fontWeight: "700", fontSize: "15px" }}>{value}</div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.72)",
        borderRadius: "14px",
        padding: "18px"
      }}
    >
      <div style={{ fontSize: "13px", color: T.textMuted, marginBottom: "8px" }}>{label}</div>
      <div style={{ fontSize: "22px", fontWeight: "700" }}>{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div
      style={{
        background: "rgba(30, 41, 59, 0.95)",
        border: `1px solid ${T.border}`,
        borderRadius: "18px",
        padding: "22px"
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "14px", fontSize: "22px" }}>{title}</h3>
      {children}
    </div>
  );
}

function SimpleTable({ columns, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  fontSize: "12px",
                  color: "#93c5fd",
                  borderBottom: `1px solid ${T.border}`,
                  whiteSpace: "nowrap"
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: `1px solid ${T.border}` }}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "10px 12px",
                    fontSize: "13px",
                    color: T.textDim,
                    verticalAlign: "top",
                    whiteSpace: ci === row.length - 1 ? "normal" : "nowrap"
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
