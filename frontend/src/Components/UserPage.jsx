import React, { useState, useEffect, useRef } from "react";
import "../Components/Styles/UserPage.css";
import auth from "../auth";
import { Chrono } from "react-chrono";
import HistoryModal from "../Components/HistoryModal";
import Media from "react-media";

const UserPage = (props) => {
  const [historyModal, setHistoryModal] = useState(null);
  const showHistoryModal = () => {
    setHistoryModal(<HistoryModal setHistoryModal={setHistoryModal} />);

  };
  const logoutHandler = () => {
    auth.logout(() => {
      window.location.href = "/";
    });
  };

  //////
  const [qr, setQR] = useState(auth.info.qr);
  const [info, setInfo] = useState({ ...auth.info });

  

  const handleReset = async () => {
    const isAuth = await auth.isAuthenticated();
    console.log("auth Done");
    console.log(isAuth);
    if (isAuth) {
      await auth.resetqr(() => {
        console.log("resetqr");
        setQR(auth.info.qr);
      });
    }
  };

  useEffect(() => {
    async function info() {
      await auth.getInfo(() => {});

      setInfo(auth.info);
    }
    info();
   
  }, []);

  const firstUpdate = useRef(true); //this is to make the history use effect not render at first load
  

  /////
  return (
    <div className="blockdiv">
      <div className="userpage-div">
        <div className="logoutbtn-div">
          <button type="button" className="logout-btn" onClick={logoutHandler}>
            LOGOUT
          </button>
        </div>
        <div className="users-name">
          {/* <p>Welcome: Tristan John Girao</p> */}

          <p>Name:{info.name}</p>
          <p>
            Address: {info.address} {info.town} {info.province}
          </p>
          <p>Contact: {info.contact}</p>
          <p>Birthday: {info.birthday}</p>
          {/*Change this to `Welcome : ${data.fullname}`*/}

          <p>Here's your QR CODE</p>
        </div>

        <div className="userpageqrcode-div">
          <div
            className="userpageqrcode"
            dangerouslySetInnerHTML={{ __html: info.qr }}
          />
        </div>

        <div className="userpage-btns">
          <button type="button" className="resetqr-btn" onClick={handleReset}>
            Reset QR
          </button>
          <button
            type="button"
            className="userhistory-btn"
            onClick={showHistoryModal}
          >
            History
          </button>
        </div>

        
      </div>
      {historyModal}
    </div>
  );
};

export default UserPage;
