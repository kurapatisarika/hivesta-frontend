import React, { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const full = reader.result || "";
        const base64 = String(full).split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a PDF plan.");
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

  const estimate = result?.mockEstimate;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "32px"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            marginBottom: "28px"
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#93c5fd",
              marginBottom: "10px",
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}
          >
            Hivesta Construction
          </div>

          <h1
            style={{
              fontSize: "40px",
              margin: "0 0 10px 0",
              fontWeight: "700"
            }}
          >
            Hivesta Takeoff Pro
          </h1>

          <p
            style={{
              margin: 0,
              color: "#cbd5e1",
              fontSize: "18px",
              lineHeight: "1.6"
            }}
          >
            Upload your construction plans and get an AI-ready estimate workflow.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "24px"
          }}
        >
          <div
            style={{
              background: "rgba(30, 41, 59, 0.95)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "18px",
                fontSize: "24px"
              }}
            >
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
              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "12px"
                }}
              >
                📄
              </div>

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "8px"
                }}
              >
                Select your construction plan
              </div>

              <div
                style={{
                  color: "#94a3b8",
                  marginBottom: "18px"
                }}
              >
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
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px 20px",
                background: loading ? "#475569" : "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "17px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 8px 20px rgba(37, 99, 235, 0.35)"
              }}
            >
              {loading ? "Analyzing PDF..." : "Analyze Plan"}
            </button>

            <div
              style={{
                marginTop: "22px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px"
              }}
            >
              <InfoMiniCard title="Input" value="PDF Plan" />
              <InfoMiniCard title="Mode" value="AI Workflow" />
              <InfoMiniCard title="Status" value={loading ? "Running" : "Ready"} />
            </div>
          </div>

          <div
            style={{
              background: "rgba(30, 41, 59, 0.95)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "18px",
                fontSize: "24px"
              }}
            >
              Output Preview
            </h2>

            {!result && !loading && (
              <div
                style={{
                  borderRadius: "14px",
                  background: "rgba(15, 23, 42, 0.65)",
                  padding: "28px",
                  color: "#94a3b8",
                  lineHeight: "1.7"
                }}
              >
                Upload a PDF plan and click <strong style={{ color: "#ffffff" }}>Analyze Plan</strong>.
                <br />
                Your estimate summary will appear here in a clean client-ready format.
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
                <div style={{ color: "#94a3b8" }}>
                  Reading PDF, preparing estimate structure, and generating summary.
                </div>
              </div>
            )}

            {result?.error && (
              <div
                style={{
                  borderRadius: "14px",
                  background: "rgba(127, 29, 29, 0.25)",
                  border: "1px solid rgba(248, 113, 113, 0.35)",
                  padding: "20px",
                  color: "#fecaca"
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
                    FILE
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "700" }}>
                    {result.fileName || "uploaded-plan.pdf"}
                  </div>
                  <div style={{ color: "#94a3b8", marginTop: "6px" }}>
                    {result.message || "Analysis completed"}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "14px"
                  }}
                >
                  <StatCard label="Estimated Cost" value={estimate?.totalEstimatedCost || "--"} />
                  <StatCard label="Estimated Area" value={estimate?.estimatedSqft || "--"} />
                  <StatCard label="Foundation" value={estimate?.foundation || "--"} />
                  <StatCard label="Framing" value={estimate?.framing || "--"} />
                  <StatCard label="Roofing" value={estimate?.roofing || "--"} />
                  <StatCard label="Finishes" value={estimate?.finishes || "--"} />
                </div>

                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.72)",
                    borderRadius: "14px",
                    padding: "18px"
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "14px"
                    }}
                  >
                    Cost Breakdown
                  </div>

                  <BreakdownRow label="Foundation" value={estimate?.foundation} />
                  <BreakdownRow label="Framing" value={estimate?.framing} />
                  <BreakdownRow label="Roofing" value={estimate?.roofing} />
                  <BreakdownRow label="Electrical" value={estimate?.electrical} />
                  <BreakdownRow label="Plumbing" value={estimate?.plumbing} />
                  <BreakdownRow label="HVAC" value={estimate?.hvac} />
                  <BreakdownRow label="Finishes" value={estimate?.finishes} />
                </div>

                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.72)",
                    borderRadius: "14px",
                    padding: "18px"
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}
                  >
                    Notes
                  </div>

                  <ul style={{ margin: 0, paddingLeft: "18px", color: "#cbd5e1", lineHeight: "1.8" }}>
                    {(estimate?.notes || []).map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoMiniCard({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.75)",
        borderRadius: "12px",
        padding: "14px"
      }}
    >
      <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>{title}</div>
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
      <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>{label}</div>
      <div style={{ fontSize: "24px", fontWeight: "700" }}>{value}</div>
    </div>
  );
}

function BreakdownRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid rgba(148, 163, 184, 0.12)"
      }}
    >
      <span style={{ color: "#cbd5e1" }}>{label}</span>
      <span style={{ fontWeight: "700" }}>{value || "--"}</span>
    </div>
  );
}
