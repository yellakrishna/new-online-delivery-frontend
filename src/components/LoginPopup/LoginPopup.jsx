import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Handles login/signup submit
  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        currState === "Login"
          ? `${url}/api/user/login`
          : `${url}/api/user/register`;

      const response = await axios.post(endpoint, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        loadCartData({ token: response.data.token });
        toast.success(
          currState === "Login"
            ? "Welcome back! 🎉"
            : "Account created successfully! 🎉"
        );

        handleClose(); // ✅ Close after success
        navigate("/"); // ✅ Redirect to home
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Close popup or navigate home
  const handleClose = () => {
    if (setShowLogin) {
      setShowLogin(false); // Popup mode
    } else {
      navigate("/"); // Route mode
    }
  };

  return (
    <div
      className="login-popup"
      onClick={handleClose} // Close when clicking outside
    >
      <form
        className="login-popup-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        onSubmit={onLogin}
      >
        {/* Header */}
        <div className="login-popup-header">
          <h2>{currState === "Login" ? "Welcome Back" : "Create Account"}</h2>
          <button
            type="button"
            className="close-btn"
            onClick={handleClose} // ✅ Works in both cases
          >
            ✖
          </button>
        </div>

        {/* Inputs */}
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Full Name"
              required
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Button */}
        <button className="login-btn" disabled={loading}>
          {loading
            ? "Please wait..."
            : currState === "Login"
            ? "Login"
            : "Sign Up"}
        </button>

        {/* Terms */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            I agree to the <b>Terms</b> & <b>Privacy Policy</b>.
          </p>
        </div>

        {/* Switch Mode */}
        <p className="switch-auth">
          {currState === "Login" ? (
            <>
              New here?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Sign up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
