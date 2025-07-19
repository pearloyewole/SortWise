import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Info from "./page/Info";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
}
