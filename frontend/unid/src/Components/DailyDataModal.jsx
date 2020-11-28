import React, { Component } from "react";
import "../Components/Styles/DailyDataModal.css";

class DailyDataModal extends Component {
  render() {
    const { setModal /*data*/ } = this.props;
    return (
      <div className="modal-div">
        <button
          type="button"
          className="closemodal-btn"
          // onClick={() => console.log(data)}
          onClick={() => {
            setModal(null);
          }}
        >
          &times;
        </button>
        <div className="modaldetails-div">
          <input type="text" name="" value="Name" readOnly />
          <input
            type="text"
            name=""
            value={/*data.gender*/ "Gender"}
            readOnly
          />
          <input
            type="text"
            name=""
            value={
              /*${data.birthmonth} ${data.birthday} ${data.birthyear}*/ "Birthday"
            }
            readOnly
          />
          <input type="text" name="" value={/*data.age*/ "Age"} readOnly />
          <input type="text" name="" value={/*data.email*/ "email"} readOnly />
          <input
            type="text"
            name=""
            value={/*data.contactno*/ "contactno"}
            readOnly
          />
          <input
            type="text"
            name=""
            value={/*data.barangay*/ "barangay"}
            readOnly
          />
          <input type="text" name="" value={/*data.zone*/ "zone"} readOnly />
          <input type="text" name="" value={/*data.town*/ "town"} readOnly />
          <input
            type="text"
            name=""
            value={/*data.province*/ "province"}
            readOnly
          />
          <input type="text" name="" value={/*data.city*/ "city"} readOnly />
          <input
            type="text"
            name=""
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
