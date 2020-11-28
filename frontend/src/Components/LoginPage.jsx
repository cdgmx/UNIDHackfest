import React, { useState } from "react";
import "./Styles/LandingPage.css";
// import Axios from "axios";

const LoginPage = () => {
  const [check, setCheck] = useState(false);

  // const client = "";
  // const key = "";
  // const value = "";

  const handleCheck = () => {
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  // const loginHandler = () => {
  //   //login button handler
  //   if (check === false) {
  //     //if in user mode
  //   //   client = "users";
  //   //   key = "username";
  //   //   value = document.getElementById("usernameInput").textContent;
  //   // } else {
  //   //   //if in admin mode
  //   //   client = "admins";
  //   //   key = "username";
  //   //   value = document.getElementById("usernameInput").textContent;
  //   // }
  //   // Axios.post("http://localhost:3001/api/logindata", {
  //   //   client: client,
  //   //   key: key,
  //   //   value: value,
  //   });
  // };
  const gotoAdmin = () => {
    check === false
      ? (window.location.href = "/userpage")
      : (window.location.href = "/adminpage");
  };
  return (
    <form className="landingpage-form">
      <label className="switch">
        <input type="checkbox" onChange={handleCheck} defaultChecked={check} />
        <span className="slider round"></span>
      </label>
      {check === false ? (
        <p className="clientType">Logging In as User</p>
      ) : (
        <p className="clientType">Logging In as Admin</p>
      )}

      <label className="username-label login-label" htmlFor="username">
        Username
      </label>
      <input
        className="username-input login-input"
        type="text"
        name="username"
        id="usernameInput"
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

      <button className="login-btn" type="button" onClick={gotoAdmin}>
        Login
      </button>
      <p className="gotosignup">
        Not yet have an account? <a href="/signuppage">Click here</a>
      </p>
    </form>
  );
};
export default LoginPage;
