import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, disposalInfo } = location.state || {};

  const [cooldown, setCooldown] = useState(90);

  useEffect(() => {
    if (!prediction) {
      navigate("/");
    }

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [prediction, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Classification Result</h2>
      <p style={{ fontSize: "1.25rem" }}>
        🔍 Predicted Category: <strong>{prediction}</strong>
      </p>
      <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>{disposalInfo}</p>

      {cooldown > 0 ? (
        <p style={{ marginTop: "2rem", color: "gray" }}>
          Please wait {cooldown} seconds before classifying another image.
        </p>
      ) : (
        <button className="light-btn" onClick={() => navigate("/")}>
          Try Another Image
        </button>
      )}
    </div>
  );
}
