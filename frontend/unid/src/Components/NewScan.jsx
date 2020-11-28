import React, { useState } from "react";
import "../Components/Styles/NewScan.css";

const NewScan = () => {
  const [title, setTitle] = useState("SCAN QR");
  const scanHandler = () => {
    setTitle("SCANNING QR"); //change ang title sa muni if nag scan then mabalik man sa una after sang scan
    setInterval(() => {
      setTitle("SCAN QR");
    }, 5000); //simulate sang progress sang scan. //delete lang ni
  };
  return (
    <React.Fragment>
      <div className="newScan-container">
        <p className="newscan-title">{title}</p>
        {/* //this title changes to 'Scanning QR' when scan button is clicked  */}
        <div className="qr-screen">qr scanner div here</div>
        {/**Put Scanner Screen or Camera View*/}
        <div className="qrbtn-div">
          <button type="button" className="scan-btn" onClick={scanHandler}>
            SCAN
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewScan;
