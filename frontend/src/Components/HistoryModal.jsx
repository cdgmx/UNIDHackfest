import React from "react";
import "../Components/Styles/HistoryModal.css";
const HistoryModal = ({ setHistoryModal }) => {
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
      <div className="history-div">{/*DIRI IBUTANG ANG HISTORY MO BRO.*/}</div>
    </div>
  );
};

export default HistoryModal;
