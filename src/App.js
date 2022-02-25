import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import components from "./components";
import pages from "./pages/index";

function App() {
  return (
    <Router>
      <components.Navbar />
      <Routes>
        <Route path="/" element={<pages.Home />} />
        <Route
          path="/:category_slug/:product_slug/"
          element={<pages.Detailed />}
        />
      </Routes>
      <components.Footer />
    </Router>
  );
}

export default App;
