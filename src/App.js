import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './pages/Auth/RequireAuth';
import { useDispatch } from 'react-redux';
import { initializeCart, initializeAuth } from './states/userSlicer';
import { useSelector } from 'react-redux';
import components from './components';
import pages from './pages/index';

function App() {
  // const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(initializeCart());
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
        <Route path="/:category_slug/" element={<pages.Category />} />

        <Route element={<RequireAuth />}>
          <Route path="/my-cart" element={<pages.Cart />} />
          <Route path="/my-cart/checkout" element={<pages.CheckOut />} />
          <Route
            path="/my-cart/make-mpesa-payment"
            element={<pages.Success />}
          />
          <Route path="/my-account" element={<pages.MyAccount />} />
        </Route>

        <Route path="/login" element={<pages.Login />} />
        <Route path="/register" element={<pages.Register />} />
        <Route path="*" element={<components.Errors />} />
      </Routes>
      <components.Footer />
    </Router>
  );
}

export default App;
