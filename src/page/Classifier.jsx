import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../index.css";

const API_URL = "https://fastapi-classification.onrender.com/predict/";

export default function Classifier() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  };

  const handleClassify = async () => {
    if (!file) return;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const { predicted_category, disposal_info } = await res.json();

      navigate("/result", {
        state: { prediction: predicted_category, disposalInfo: disposal_info },
      });
    } catch (err) {
      console.error(err);
      setError("Failed to classify image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="title">Trash Classifier</h1>

        <p className="subtitle">Upload an image to find out how to dispose of your item properly.</p>

        <label className="upload-label">
          <input type="file" accept="image/*" onChange={handleFileChange} hidden />
          <span className="upload-btn">Choose Image</span>
        </label>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="preview" className="preview-img" />
          </div>
        )}

        <button
          onClick={handleClassify}
          disabled={!file || loading}
          className={`action-btn ${loading ? "disabled" : ""}`}
        >
          {loading ? "Classifying…" : "Classify"}
        </button>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}
