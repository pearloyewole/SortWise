
import React from "react";
import "./index.css";
import bins from "./assets/recycling_bins.png";

export default function App() {
  return (
    <div
      className="hero"
      style={{
        width: "100vw",
        height: "80vh",
        position: "relative",
        backgroundIgimage: `url(${bins})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,            
        }}
      />

      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,            
        }}
      >
        <h1 className="title">SortWise</h1>
        <p className="tagline">Snap it. Sort it. Save the planet.</p>
        <div className="button-group">
          <button className="light-btn">Learn More</button>
          <button className="dark-btn">Try it out</button>
        </div>
      </div>
    </div>
  );
}


