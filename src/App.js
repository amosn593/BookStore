import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeStore } from "./states/userSlicer";
import components from "./components";
import pages from "./pages/index";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeStore());
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <components.Navbar />
      <Routes>
        <Route path="/" element={<pages.Home />} />
        <Route
          path="/:category_slug/:product_slug/"
          element={<pages.Detailed />}
        />
        <Route path="/:category_slug/" element={<pages.Novel />} />
        <Route path="/my-cart" element={<pages.Cart />} />
      </Routes>
      <components.Footer />
    </Router>
  );
}

export default App;
