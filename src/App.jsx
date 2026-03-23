import React, { useState } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!address) {
      alert("Please enter a property address");
      return;
    }

    setLoading(true);
    setResult("");

    setTimeout(() => {
      setResult(`Property: ${address}
Estimated Cost: $220,000
Status: Success`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Hivesta Takeoff Pro
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        AI Construction Estimator
      </p>

      <input
        type="text"
        placeholder="Enter property address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          padding: "12px",
          width: "320px",
          marginRight: "10px",
          borderRadius: "6px",
          border: "none",
          fontSize: "16px"
        }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <pre
          style={{
            marginTop: "30px",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
            fontSize: "16px",
            lineHeight: "1.6"
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
