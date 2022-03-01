import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { BaseAxios } from "../../Data/Axios";
import { toast } from "bulma-toast";
import { useSelector } from "react-redux";

function Register() {
  document.title = "Register | BookStore";
  const { isAuthenticated } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate(-1);
  }

  const register = (e) => {
    e.preventDefault();
    setErrors([]);

    if (username === "") {
      errors.push("Username is required");
    }
    if (password === "") {
      errors.push("password is required");
    }
    if (password !== re_password) {
      errors.push("Passwords doesn't match");
    }

    if (!errors.length) {
      const formData = {
        username: username,
        email: email,
        password: password,
        re_password: re_password,
      };

      const registeruser = async () => {
        try {
          const resp = await BaseAxios.post("/api/v1/users/", formData);
          if (resp.status === 201) {
            toast({
              message: "Account created successfully, please login.",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: "bottom-right",
            });
            navigate("/login");
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

      registeruser();
    }
  };

  return (
    <main className="form-signin mb-5">
      <form
        onSubmit={(e) => {
          register(e);
        }}
      >
        {/* <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
        <h1 className="h3 mb-3 fw-normal">Please sign Up</h1>
        <div className="form-floating mb-4">
          <input
            type="text"
            required
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="username">User Name</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="email"
            required
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            required
            className="form-control"
            id="Password"
            placeholder="Password"
            minLength={8}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="Password">Password</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            required
            className="form-control"
            id="re_Password"
            placeholder="Confirm Password"
            value={re_password}
            onChange={(e) => {
              setRe_password(e.target.value);
            }}
          />
          <label htmlFor="re_Password">Confirm Password</label>
        </div>
        {errors.length ? <p> errors</p> : <p> no errors</p>}

        <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </main>
  );
}

export default Register;
