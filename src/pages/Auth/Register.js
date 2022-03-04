import React, { useState } from "react";
import "./Auth.css";
import images from "../../assets/index";
import { Link, useNavigate, Navigate } from "react-router-dom";
import useAxios from "../../Data/useAxios";
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const api = useAxios();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const register = (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    if (username === "") {
      setErrors(["Username is required"]);
      setLoading(false);
    }
    if (password === "") {
      setErrors(["password is required"]);
      setLoading(false);
    }
    if (password.length < 8) {
      setErrors(["password must be 8 characters and above"]);
      setLoading(false);
    }
    if (password !== re_password) {
      setErrors(["Passwords doesn't match"]);
      setLoading(false);
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
          const resp = await api.post("/api/v1/users/", formData);
          if (resp.status === 201) {
            toast({
              message: "Account created successfully, please login.",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: "bottom-right",
            });
            setLoading(false);
            navigate("/login");
          }
        } catch (err) {
          if (err.response) {
            const server_errors = [];
            for (const label in err.response.data) {
              server_errors.push(`${err.response.data[label]}`);
            }
            setErrors(server_errors);
            setLoading(false);
          } else if (err.message) {
            setErrors(["something went wrong, please try again!!!"]);
            setLoading(false);
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
        <img className="mb-4 rounded" src={images.logo} alt="Logo" />
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
        {errors.length ? (
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

        <button
          className="w-100 btn btn-lg btn-primary mt-2"
          type="submit"
          disabled={loading}
        >
          Sign Up
        </button>
      </form>
      <p className="mb-5">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </main>
  );
}

export default Register;
