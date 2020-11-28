import React, { useState } from "react";
import "./Styles/LandingPage.css";
// import Axios from "axios";
import auth from '../auth'

const LoginPage = () => {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const loginHandler = (props) => {
    //login button handler
    if (check === false) {
      //if in user mode
      auth.accountType = "user";
      auth.email = document.getElementById("usernameInput").value;
   
    } else {
      //if in admin mode
      auth.accountType = "admin";
      auth.email = document.getElementById("usernameInput").value;
     
    }
    auth.signIn(() => { 
      console.log("push")
      window.location.href = "/"
    })

  };

  // const gotoAdmin = () => {
  //   check === false
  //     ? (window.location.href = "/userpage")
  //     : (window.location.href = "/adminpage");
  // };
  return (
    <form className="landingpage-form">
      <label className="switch">
        <input type="checkbox" onChange={handleCheck} defaultChecked={check} />
        <span className="slider round"></span>
      </label>
      {check === false ? (
        <p className="clientType">Logging In as User</p>
      ) :(
        <p className="clientType">Logging In as Admin</p>
      )}

      <label className="username-label login-label" htmlFor="username">
        Email
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

      <button className="login-btn" type="button" onClick={loginHandler}>
        Login
      </button>
      <p className="gotosignup">
        Not yet have an account? <a href="/signuppage">Click here</a>
      </p>
    </form>
  );
};
export default LoginPage;
