import React from "react";
import "../Login.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Components/Styles/AdminRegister.css";

const AdminRegister = (props) => {
  const {
    setMyInfo,
    myInfo,

    changeSign,
    signState,
    handleAccType,
    accType,
    handleValidation,
    isFormError,
    handleRegister,
  } = props;

  const changInfo = (e) => {
    const { value, name } = e.target;
    setMyInfo({ ...myInfo, [name]: value });
    // console.log("this is change");
    // console.log("id: " + initInformation.Id);
    // console.log("email: " + initInformation.email);
  };

  return (
    <div className="adminloginbox">
      <div className="adminform-div">
        <form
          className="adminform"
          autoComplete="none"
          onSubmit={handleRegister}
        >
          <div className="adminsignup-title">
            <h1>
              {signState.signData} as {accType.currentAccName}
            </h1>
          </div>

          <div className="admin-inputs">
            <p>Email or ID Number</p>
            <input
              type="text"
              name="storename"
              className="admininput"
              placeholder="Store Name"
              autoComplete="true"
              required
              onChange={(e) => {
                changInfo(e);
              }}
            ></input>

            <input
              type="text"
              name="address"
              className="admininput"
              placeholder="Address"
              required
              onChange={(e) => {
                changInfo(e);
              }}
            ></input>

            <input
              type="text"
              name="town"
              className="admininput"
              placeholder="Town/City"
              required
              onChange={(e) => {
                changInfo(e);
              }}
            ></input>

            <input
              type="text"
              name="province"
              className="admininput"
              placeholder="Province"
              required
              onChange={(e) => {
                changInfo(e);
              }}
            ></input>

            <input
              type="text"
              name="contact"
              className="admininput"
              placeholder="Contact"
              required
              onChange={(e) => {
                changInfo(e);
              }}
              onBlur={handleValidation}
            ></input>
            {isFormError.contact ? <p>Contact is invalid</p> : null}

            <input
              type="text"
              name="email"
              className="admininput"
              placeholder="Enter Email"
              required
              onBlur={handleValidation}
              onChange={(e) => {
                changInfo(e);
              }}
            ></input>
            {isFormError.email ? <p>Email is invalid</p> : null}

            <input
              type="password"
              name="password"
              className="admininput"
              placeholder="Create Password"
              required
              onChange={(e) => {
                changInfo(e);
              }}
            ></input>

            <input
              type="password"
              name="password2"
              className="admininput"
              placeholder="Enter Password again"
              required
              onChange={(e) => {
                changInfo(e);
              }}
              onBlur={handleValidation}
            ></input>
            {isFormError.password ? <p>Password does not Match</p> : null}
          </div>
          <div className="bottom-elements">
            <input className="submit-btn" type="submit" value="Submit"></input>
            <a href="#" onClick={changeSign}>
              {signState.prevSignData}
            </a>
            <br></br>
            <a href="#" onClick={handleAccType}>
              Change into {accType.prevAccName} Mode
            </a>
          </div>
          <br></br>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
