import React from "react";
import { Link } from "react-router-dom";

export default function Info() {
  return (
    <div className="info-page">
      <h2>Recycling 101</h2>
      <p>
        Recycling is the process of converting waste materials into new
        products, which conserves resources, reduces landfill, and cuts down
        on energy and greenhouse gas emissions.
      </p>
      <h3>How to Sort Your Waste</h3>
      <ul>
        <li>
          <strong>Paper & Cardboard:</strong> Keep dry & flatten boxes.
        </li>
        <li>
          <strong>Plastics:</strong> Rinse bottles & containers; check the
          resin code.
        </li>
        <li>
          <strong>Glass:</strong> Rinse and separate by color if your program
          requires.
        </li>
        <li>
          <strong>Metals:</strong> Rinse cans; remove labels if possible.
        </li>
      </ul>
      <p>
        Always check your local recycling guidelines for any special rules or
        drop‑off locations.
      </p>
      <Link to="/">
        <button className="dark-btn">Back to Home</button>
      </Link>
    </div>
  );
}
