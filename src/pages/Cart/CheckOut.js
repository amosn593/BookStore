import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../states/userSlicer";
import { Link, useNavigate } from "react-router-dom";
import CheckOutItem from "./CheckOutItem";
import { BaseAxios } from "../../Data/Axios";

function CheckOut() {
  document.title = "CheckOut | BookStore";
  const { cart } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [cartlength, setCartlength] = useState(0);

  const [TotalPrice, setTotalPrice] = useState(0);

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState("");
  const [mpesa, setMpesa] = useState("");

  const [errors, setErrors] = useState([]);

  const [items, setItems] = useState([]);

  const getcartTotalLength = () => {
    const total = cart.items.reduce((acc, curval) => {
      return (acc += parseInt(curval.quantity));
    }, 0);
    setCartlength(total);
  };

  const getTotalPrice = () => {
    const total = cart.items.reduce((acc, curval) => {
      return (acc += parseInt(curval.quantity) * parseInt(curval.book.price));
    }, 0);
    setTotalPrice(total);
  };

  const checkout = (e) => {
    e.preventDefault();
    setErrors([]);
    if (first_name === "") {
      errors.push("First Name is Required field");
      setErrors(["First Name is Required field"]);
    }
    if (last_name === "") {
      errors.push("Last Name is Required field");
      setErrors(["Last Name is Required field"]);
    }
    if (phone === "") {
      errors.push("Phone number is Required field");
      setErrors(["Phone number is Required field"]);
    }
    if (email === "") {
      errors.push("Email is Required field");
      setErrors(["Email is Required field"]);
    }
    if (address === "") {
      errors.push("Address is Required field");
      setErrors(["Address is Required field"]);
    }

    if (place === "") {
      errors.push("Place is Required field");
      setErrors(["Place is Required field"]);
    }

    if (mpesa.length > 10 || mpesa.length < 9) {
      errors.push("Enter 10 digits valid mpesa number");
      setErrors(["Enter 10 digits valid mpesa number"]);
    }
    if (!parseInt(mpesa)) {
      errors.push("Enter 10 digits valid mpesa number");
      setErrors(["Enter 10 digits valid mpesa number"]);
    }

    if (!errors.length) {
      setItems([]);
      for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        const obj = {
          product: item.book.id,
          quantity: item.quantity,
          price: parseInt(item.book.price) * parseInt(item.quantity),
        };
        items.push(obj);
      }
      console.log(items);

      const data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        address: address,
        place: place,
        paid_amount: TotalPrice,
        mpesa_number: mpesa,
        items: items,
      };

      console.log(data);
      const checkout = async () => {
        const resp = await BaseAxios.post("/api/v1/checkout/", data);
        if (resp.status === 201) {
          dispatch(clearCart());
          localStorage.removeItem("cart");
          navigate("/");
        }
      };
      checkout();
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    getcartTotalLength();
    getTotalPrice();
  }, [cart]);

  return (
    <div className="container mb-5">
      <main>
        <div className="py-5 text-center">
          <h1>Checkout form</h1>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {cartlength}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {cart.items.map((item, index) => {
                return <CheckOutItem item={item} key={index} />;
              })}

              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">−$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (KSH)</span>
                <strong>KSH. {TotalPrice}</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing/Shipping address</h4>
            <form onSubmit={(e) => checkout(e)}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={first_name}
                    onChange={(e) => {
                      setFirst_name(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={last_name}
                    onChange={(e) => {
                      setLast_name(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="0700000000"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="place" className="form-label">
                    Place
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="place"
                    placeholder="Wote Town"
                    value={place}
                    onChange={(e) => {
                      setPlace(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Payment Method</h4>

              <div className="my-3">
                <div className="form-check">
                  <input
                    id="mpesa"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required
                  />
                  <label className="form-check-label" htmlFor="mpesa">
                    MPesa
                  </label>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Mpesa Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cc-name"
                    minLength={10}
                    maxLength={10}
                    value={mpesa}
                    onChange={(e) => {
                      setMpesa(e.target.value);
                    }}
                    required
                  />
                  <small className="text-muted">
                    Your mpesa number e.g 0700000000
                  </small>
                </div>
              </div>

              <hr className="my-4" />

              {errors.length > 0 ? (
                <p
                  className="text-white"
                  style={{
                    backgroundColor: "red",
                    padding: "15px",
                    color: "#fff",
                  }}
                >
                  {errors}
                </p>
              ) : (
                <p></p>
              )}

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckOut;
