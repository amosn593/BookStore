import React from "react";
import "./MyAccount.css";
import { useDispatch } from "react-redux";
import { removeToken } from "../../states/userSlicer";
import { useNavigate } from "react-router-dom";
import { BaseAxios } from "../../Data/Axios";

function MyAccount() {
  document.title = "My Account | BookStore";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutuser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    BaseAxios.defaults.headers.common["Authorization"] = "";
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
