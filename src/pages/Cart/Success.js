import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="container mt-2 mb-5">
      <h3 className="text-center text-danger mt-5">
        Complete the payment by entering your Mpesa pin in Mpesa payment Prompt
        in Your phone
      </h3>
      <div className="container text-center mt-3">
        <p className="mt-2 mb-4">
          Click Complete button below, after entering your mpesa pin
        </p>
        <Link className="btn btn-primary" to="/">
          Complete Payment
        </Link>
      </div>
    </div>
  );
}

export default Success;
