import React from "react";
import "./MyAccount.css";
import { useDispatch } from "react-redux";
import { removeToken } from "../../states/userSlicer";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  document.title = "My Account | BookStore";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutuser = () => {
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <div className="container mt-2">
      <button
        className="btn btn-danger mt-2 mb-4"
        onClick={() => {
          logoutuser();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default MyAccount;
