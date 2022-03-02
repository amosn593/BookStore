import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { BaseAxios } from "../../Data/Axios";
import { toast } from "bulma-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../../states/userSlicer";

function Login() {
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  document.title = "Log In | BookStore";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(null);

  if (isAuthenticated) {
    navigate("/");
  }

  const loginuser = (e) => {
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
    if (!errors.length) {
      const formData = {
        username: username,

        password: password,
      };

      const login = async () => {
        try {
          const resp = await BaseAxios.post("/api/v1/token/login/", formData);
          if (resp.status === 200) {
            const token = resp.data.auth_token;
            dispatch(setToken(token));
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
            setLoading(false);
            navigate("/", { replace: true });
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
            errors.push("something went wrong, please try again!!!");
            setErrors(errors);
            setLoading(false);
          }
        }
      };

      login();
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
