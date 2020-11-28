import React from "react";
import LoginPage from "./LoginPage";

const LandingPage = () => {
  const gotoAdmin = () => {
    document.getElementById("usernameInput").value.includes("admin")
      ? (window.location.href = "/adminpage")
      : (window.location.href = "/userpage");
  };

  return <LoginPage gotoAdmin={gotoAdmin} />;
};

export default LandingPage;
