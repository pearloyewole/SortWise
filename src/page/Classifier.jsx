import React, { useState } from "react";
import "./../index.css";

const API_URL = "https://fastapi-classification.onrender.com/predict/"; // Update if your backend URL changes

export default function Classifier() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [disposalInfo, setDisposalInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // When the user picks a file, save it and generate a preview URL
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setPrediction("");
    setDisposalInfo("");
    setError("");
  };

  // Send the image to the backend and handle the JSON response
  const handleClassify = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setPrediction("");
    setDisposalInfo("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server responded ${res.status}`);
      }

      const { predicted_category, disposal_info } = await res.json();

      setPrediction(predicted_category);
      setDisposalInfo(disposal_info);
    } catch (err) {
      console.error(err);
      setError("Failed to classify image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="classifier-page" style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Trash Classifier</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ margin: "1rem 0" }}
      />

      {preview && (
        <div style={{ marginBottom: "1rem" }}>
          <img
            src={preview}
            alt="preview"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
          />
        </div>
      )}

      <button
        onClick={handleClassify}
        disabled={!file || loading}
        className="light-btn"
      >
        {loading ? "Classifying…" : "Classify"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
      )}

      {prediction && (
        <p style={{ marginTop: "1rem", fontSize: "1.25rem" }}>
          🔍 Predicted Category: <strong>{prediction}</strong>
        </p>
      )}

      {disposalInfo && (
        <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
          {disposalInfo}
        </p>
      )}
    </div>
  );
}
