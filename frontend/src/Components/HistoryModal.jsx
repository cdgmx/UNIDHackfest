import React, { useState, useEffect, useRef } from "react";
import "../Components/Styles/HistoryModal.css";
import auth from "../auth";
import { Chrono } from "react-chrono";
const HistoryModal = ({ setHistoryModal }) => {
  const [history, setHistory] = useState([]);
  const [items, setItems] = useState([
    {
      title: "May 1940",
      contentTitle: "Dunkirk",
      contentText: "Men of the British.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // const items = [{}]

  const handleHistory = async () => {
    const isAuth = await auth.isAuthenticated();
    console.log("auth Done");
    console.log(isAuth);
    if (isAuth) {
      await auth.getHistory(() => {
        console.log(auth.scannedData);
        if (auth.scannedData) {
          setHistory(auth.scannedData);
          setLoading(true);
        }
      });
    }
  };

  useEffect(() => {
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

      setItems(historyData);
      setLoading(true);
    }
    setData();
  }, [history]);

  return (
    <div className="historymodal-div">
      <div className="historyModalClosebtn-div">
        <button
          className="historyModalClosebtn"
          type="button"
          onClick={() => {
            setHistoryModal(null);
          }}
        >
          &times;
        </button>
      </div>
      <div className="history-div">
        {loading ? (
          <div
            className="history-main "
            style={{ width: "100%", height: "520px" }}
          >
            <Chrono items={items} mode="VERTICAL" hideControls /> )
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
