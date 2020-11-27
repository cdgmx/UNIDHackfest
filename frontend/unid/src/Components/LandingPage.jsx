import React from "react";
import LoginPage from "./LoginPage";

const LandingPage = () => {
  const gotoUserPage = () => {
    document.getElementById("passwordinput").value.includes("admin")
      ? (window.location.href = "/adminpage")
      : (window.location.href = "/userpage");
  };
  return <LoginPage gotoUserPage={gotoUserPage} />;
};

export default LandingPage;
