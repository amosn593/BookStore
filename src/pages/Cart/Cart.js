import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartItem from "../../components/CartItem/CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [cartlength, setCartlength] = useState(0);

  const [TotalPrice, setTotalPrice] = useState(0);

  const continueShopping = () => {
    navigate(-2);
  };

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

  useEffect(() => {
    getcartTotalLength();
    getTotalPrice();
  }, [cart]);

  return (
    <div className="container mt-3 mb-4">
      <div className="row mb-4">
        <div className="col-lg-12 col-md-12">
          <h3>My Cart</h3>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-12 col-md-12">
          {cart.items.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => {
                  return (
                    <CartItem
                      get_absolute_url={item.book.get_absolute_url}
                      get_image={item.book.get_image}
                      price={item.book.price}
                      quantity={item.quantity}
                      item={item}
                      key={index}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>Your cart is empty!!</p>
          )}
        </div>
      </div>
      <div className="col-lg-12 col-md-12">
        <h5>Summary</h5>
        <strong>
          Total: KSH {TotalPrice}, {cartlength} books
        </strong>
        <hr />
        {cart.items.length && (
          <button className="btn btn-warning mx-2 my-1">
            Proceed To CheckOut
          </button>
        )}

        <button
          className="btn btn-secondary mx-2 my-1"
          onClick={() => {
            continueShopping();
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Cart;
