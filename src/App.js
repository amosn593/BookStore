import "./App.css";
import React, { useEffect } from "react";
import { BaseAxios } from "./Data/Axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeStore } from "./states/userSlicer";
import { useSelector } from "react-redux";
import components from "./components";
import pages from "./pages/index";

function App() {
  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeStore());
    if (token) {
      BaseAxios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      BaseAxios.defaults.headers.common["Authorization"] = "";
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <components.Navbar />
      <Routes>
        <Route path="/" element={<pages.Home />} />
        <Route path="/search" element={<pages.Search />} />
        <Route
          path="/:category_slug/:product_slug/"
          element={<pages.Detailed />}
        />
        <Route path="/:category_slug/" element={<pages.Novel />} />
        <Route path="/my-cart" element={<pages.Cart />} />
        <Route path="/my-cart/checkout" element={<pages.CheckOut />} />
        <Route path="/login" element={<pages.Login />} />
        <Route path="/register" element={<pages.Register />} />
        <Route path="/my-account" element={<pages.MyAccount />} />
      </Routes>
      <components.Footer />
    </Router>
  );
}

export default App;
