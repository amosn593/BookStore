import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const [cartsize, setCartsize] = useState(0);
  const { cart } = useSelector((state) => state.user);

  const cartlength = () => {
    let totalLength = 0;

    for (let i = 0; i < cart.items.length; i++) {
      totalLength += parseInt(cart.items[i].quantity);
    }

    setCartsize(totalLength);
  };

  useEffect(() => {
    cartlength();
  }, [cart]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {/* <img
            src={  }
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          /> */}
          BookStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/novel">
                Novel
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/christian">
                Christian
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          width={40}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="d-flex">
        <button className="btn btn-light mx-1">Login</button>
        <Link className="btn btn-success mx-1 d-flex" to="/my-cart">
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
          {cartsize}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
