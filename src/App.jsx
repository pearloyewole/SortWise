import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Info from "./page/Info";
import Classifier from "./page/Classifier"; 
import Result from "./page/Result";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/classify" element={<Classifier />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
