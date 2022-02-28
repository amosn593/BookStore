import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { BaseAxios } from "../../Data/Axios";
import { toast } from "bulma-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../../states/userSlicer";

function Login() {
  document.title = "Log In | BookStore";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const loginuser = (e) => {
    e.preventDefault();
    setErrors([]);
    if (username === "") {
      errors.push("Username is required");
    }
    if (password === "") {
      errors.push("password is required");
    }
    if (!errors.length) {
      const formData = {
        username: username,

        password: password,
      };

      const loginuser = async () => {
        try {
          const resp = await BaseAxios.post("/api/v1/token/login/", formData);
          if (resp.status === 200) {
            const token = resp.data.auth_token;
            dispatch(setToken, token);
            BaseAxios.defaults.headers.common["Authorization"] =
              "Token " + token;

            localStorage.setItem("token", token);
            toast({
              message: "Logged In successfully!!!",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: "bottom-right",
            });
            navigate("/");
          }
        } catch (err) {
          if (err.response) {
            for (const label in err.response.data) {
              errors.push(`${label}:${err.response.data[label]}`);
            }
            console.log(errors);
          } else if (err.message) {
            errors.push("something went wrong, please try again!!!");
            console.log(errors);
          }
        }
      };

      loginuser();
    }
  };
  return (
    <main className="form-signin">
      <form
        onSubmit={(e) => {
          loginuser(e);
        }}
      >
        {/* <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-4">
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="User Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <label htmlFor="email">User Name</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label htmlFor="Password">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">
          Sign in
        </button>
      </form>
      <p>
        Don't have an account?
        <Link to="/register"> Sign Up</Link>
      </p>
    </main>
  );
}

export default Login;
