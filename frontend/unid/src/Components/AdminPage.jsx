import React, { useState, useEffect } from "react";
import "../Components/Styles/AdminPage.css";
import NewScan from "../Components/NewScan";
import ViewLog from "../Components/ViewLog";

const AdminPage = () => {
  // states
  const [display, setDisplay] = useState(null);
  // this will change to 'Scanning QR' if Scanning QR function is running

  const newScanHandler = () => {
    setDisplay(<NewScan />); //scanHandler button to click to scan
  };

  //handlers

  const viewLogHandler = () => {
    setDisplay(<ViewLog />);
  };

  const adminProfileHandler = () => {
    alert("Wait For the Next Update!");
  };

  const adminLogoutHandler = () => {
    window.location.href = "/";
  };

  //return
  return (
    <React.Fragment>
      <div className="admin-div">
        <div className="topnav">
          <button
            type="button"
            className="topnav-btn"
            id="newscan-btn"
            onClick={newScanHandler}
          >
            New Scan
          </button>
          <button
            type="button"
            className="topnav-btn"
            id="viewlog-btn"
            onClick={viewLogHandler}
          >
            View Log
          </button>
          <button
            type="button"
            className="topnav-btn"
            id="adminprofile-btn"
            onClick={adminProfileHandler}
          >
            Admin Profile
          </button>
          <button
            type="button"
            className="topnav-btn"
            id="adminlogout-btn"
            onClick={adminLogoutHandler}
          >
            Logout
          </button>
        </div>
        <div className="main-div">
          {display === null ? <NewScan /> : display}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminPage;
