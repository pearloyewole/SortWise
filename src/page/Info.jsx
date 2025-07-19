import React from "react";
import { Link } from "react-router-dom";

export default function Info() {
  return (
 <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f9f9f9",
    padding: "2rem",
  }}
>
  <div
    style={{
      maxWidth: "700px",
      width: "100%",              
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    }}
  >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Recycling 101</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        Recycling is the process of converting waste materials into new products, which conserves resources,
        reduces landfill, and cuts down on energy and greenhouse gas emissions.
      </p>

      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>How to Sort Your Waste</h2>
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
        <li><strong>Paper & Cardboard:</strong> Keep dry & flatten boxes.</li>
        <li><strong>Plastics:</strong> Rinse bottles & containers; check the resin code.</li>
        <li><strong>Glass:</strong> Rinse and separate by color if your program requires.</li>
        <li><strong>Metals:</strong> Rinse cans; remove labels if possible.</li>
      </ul>

      <p style={{ fontStyle: "italic" }}>
        Always check your local recycling guidelines for any special rules or drop-off locations.
      </p>

      <Link to="/">
        <button className="dark-btn" style={{ marginTop: "1.5rem" }}>
          Back to Home
        </button>
      </Link>
    </div>
  </div>
);
} 