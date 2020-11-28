import React, { Component } from "react";
import "../Components/Styles/DailyDataModal.css";

class DailyDataModal extends Component {
  render() {
    const { setModal, datalist } = this.props;
    return (
      <div className="modal-div">
        <div className="closemodalbtn-div">
          <button
            type="button"
            className="closemodal-btn"
            // onClick={() => console.log(data)}
            onClick={() => {
              setModal(null);
              console.log("THIS IS DATA!!!!");
              console.log(JSON.stringify(datalist));
            }}
          >
            &times;
          </button>
        </div>
        <div className="modaldetails-div">
          <input
            type="text"
            name=""
            value={datalist.admin_id}
            className="dailymodal-input"
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={/*data.gender*/ "Gender"}
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={
              /*${data.birthmonth} ${data.birthday} ${data.birthyear}*/ "Birthday"
            }
            readOnly
          />
          <input
            type="text"
            name=""
            value={/*data.age*/ "Age"}
            className="dailymodal-input"
            readOnly
          />
          <input
            type="text"
            name=""
            value={/*data.email*/ "email"}
            className="dailymodal-input"
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={/*data.contactno*/ "contactno"}
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={/*data.barangay*/ "barangay"}
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={/*data.zone*/ "zone"}
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={/*data.town*/ "town"}
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={/*data.province*/ "province"}
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={/*data.city*/ "city"}
            readOnly
          />
          <input
            type="text"
            name=""
            className="dailymodal-input"
            value={/*data.region*/ "region"}
            readOnly
          />
        </div>

        {/* <img src="" alt="valid_id1" />
        <img src="" alt="valid_id2" /> */}
      </div>
    );
  }
}

export default DailyDataModal;
