import React from "react";
import "./App.css";
import View from "./View";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <li>
        <Link to="/app">APP START CLICK</Link>
      </li>
      <h1>Nasa Photos Viewer</h1>
      <Routes>
        <Route path="/app" element={<View />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
