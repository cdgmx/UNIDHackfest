import React from "react";
import "./Styles/LandingPage.css";

const LoginPage = ({ gotoUserPage }) => {
  return (
    <form className="landingpage-form">
      <label className="username-label login-label" htmlFor="username">
        Username
      </label>
      <input
        className="username-input login-input"
        type="text"
        name="username"
      />

      <label className="password-label login-label" htmlFor="password">
        Password
      </label>
      <input
        id="passwordinput"
        className="password-input  login-input"
        type="password"
        name="password"
      />

      <button className="login-btn" type="button" onClick={gotoUserPage}>
        Login
      </button>
      <p className="gotosignup">
        Not yet have an account? <a href="/signuppage">Click here</a>
      </p>
    </form>
  );
};
export default LoginPage;
