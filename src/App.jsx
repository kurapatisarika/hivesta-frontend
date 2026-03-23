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

    try {
      const response = await fetch("https://hivesta-backend.onrender.com/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address })
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
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
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Hivesta Takeoff Pro</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>AI Construction Estimator</p>

      <input
        type="text"
        placeholder="Enter property address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          padding: "12px",
          width: "300px",
          marginRight: "10px",
          borderRadius: "6px",
          border: "none"
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
          cursor: "pointer"
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
            whiteSpace: "pre-wrap"
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
