import React, { useState, useEffect, useRef } from "react";
import "../Components/Styles/UserPage.css";
import auth from "../auth";
import { Chrono } from "react-chrono";
import HistoryModal from "../Components/HistoryModal";

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

  const [history, setHistory] = useState([]);
  const [historyLoad, setHistoryLoad] = useState(false);
  const [items, setItems] = useState([
    {
      title: "May 1940",
      contentTitle: "Dunkirk",
      contentText: "Men of the British.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleUser = () => {
    props.history.push("/user");
    console.log("auth   info");
    console.log(auth.info);
  };
  const handleAdmin = () => {
    props.history.push("/admin");
  };
  const handleForm = () => {
    props.history.push("/form");
  };

  // const items = [{}]
  const handleHistory = async () => {
    const isAuth = await auth.isAuthenticated();
    console.log("auth Done");
    console.log(isAuth);
    if (isAuth) {
      await auth.getHistory(() => {
        setHistory(auth.scannedData);
        setLoading(true);
      });
    }
  };

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
    handleHistory();
  }, []);

  const firstUpdate = useRef(true); //this is to make the history use effect not render at first load
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    async function setData() {
      let preItems = [];

      let historyData = history.map(function (key, index) {
        return {
          title: `${history[index].date} ${history[index].time}${history[index].period}`,
          cardTitle: `${history[index].name} `,
          cardSubtitle: `${history[index].name}`,
        };
      });
      console.log(historyData);
      setItems(historyData);
      setHistoryLoad(true);
    }
    setData();
  }, [history]);

  /////
  return (
    <div className="blockdiv">
      <div className="userpage-div">
        <button type="button" className="logout-btn" onClick={logoutHandler}>
          LOGOUT
        </button>
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
        <div
          className="qr-code"
          dangerouslySetInnerHTML={{ __html: info.qr }}
        />

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

        {/*  <div style={{width: "500px", height: "500px" }}>
            { historyLoad ? ( <Chrono items={items}  mode="VERTICAL"  hideControls cardHeight = {300}/> ) : 
            <> </>  //load only when historyLoad is true
            } 
            </div> */}
      </div>
      {historyModal}
    </div>
  );
};

export default UserPage;
