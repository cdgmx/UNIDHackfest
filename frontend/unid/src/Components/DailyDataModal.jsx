import React, { Component } from "react";
import "../Components/Styles/DailyDataModal.css";

class DailyDataModal extends Component {
  render() {
    const { setModal, data } = this.props;
    return (
      <div className="modal-div">
        <button
          type="button"
          className="closemodal-btn"
          onClick={() => console.log(data)}
        >
          &times;
        </button>
        <input type="text" name="" readOnly />
        <input type="text" name="" value={data.gender} readOnly />
        <input
          type="text"
          name=""
          value={`${data.birthmonth} ${data.birthday} ${data.birthyear}`}
          readOnly
        />
        <input type="text" name="" value={data.age} readOnly />
        <input type="text" name="" value={data.email} readOnly />
        <input type="text" name="" value={data.contactno} readOnly />
        <input type="text" name="" value={data.barangay} readOnly />
        <input type="text" name="" value={data.zone} readOnly />
        <input type="text" name="" value={data.town} readOnly />
        <input type="text" name="" value={data.province} readOnly />
        <input type="text" name="" value={data.city} readOnly />
        <input type="text" name="" value={data.region} readOnly />

        <img src="" alt="valid_id1" />
        <img src="" alt="valid_id2" />
      </div>
    );
  }
}

export default DailyDataModal;
