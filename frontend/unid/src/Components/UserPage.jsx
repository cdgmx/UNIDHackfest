import React from "react";
import "../Components/Styles/UserPage.css";

const UserPage = () => {
  const logoutHandler = () => {
    window.location.href = "/";
  };

  return (
    <div className="userpage-div">
      <button type="button" className="logout-btn" onClick={logoutHandler}>
        LOGOUT
      </button>
      <div className="users-name">
        <p>Welcome: //User's Fullname</p>
        <p>Here's your QR CODE</p>
      </div>
      <img src="" alt="QR Code Here" className="qr-code" />
    </div>
  );
};

export default UserPage;
