import React, { useState } from "react";
import "./Styles/LandingPage.css";
// import Axios from "axios";
import auth from "../auth";

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
      console.log("push");
      window.location.href = "/";
    });
  };

  // const gotoAdmin = () => {
  //   check === false
  //     ? (window.location.href = "/userpage")
  //     : (window.location.href = "/adminpage");
  // };
  return (
    <div className="loginpagediv">
      <form className="landingpage-form">
        <div className="switcher-div">
          {check === false ? (
            <p className="loginclientType">Logging In as User</p>
          ) : (
            <p className="loginclientType">Logging In as Admin</p>
          )}
          <label className="switch">
            <input
              type="checkbox"
              onChange={handleCheck}
              defaultChecked={check}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="loginpageelement-div">
          <label className="loginpageelement" htmlFor="username">
            Email
          </label>
          <input
            className="loginpageelement"
            type="text"
            name="username"
            id="usernameInput"
          />

          <label className="loginpageelement" htmlFor="password">
            Password
          </label>
          <input
            id="passwordinput"
            className="loginpageelement"
            type="password"
            name="password"
          />

          <button
            className="loginpageelement"
            type="button"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
        <div className="bottom-element">
          <p className="gotosignup">
            Not yet have an account? <a href="/signuppage">Click here</a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
