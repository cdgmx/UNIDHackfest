import React, { useState } from "react";
import "../Components/Styles/SignUpPage.css";
import Axios from "axios";

const SignUpPage = () => {
  //setting state
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthmonth, setBirthMonth] = useState("");
  const [birthyear, SetBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactNo] = useState("");
  const [barangay, setBarangay] = useState("");
  const [zone, setZone] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = () => {
    console.log("Clicked!");
    Axios.post("http://localhost:3001/signuppage/submit", {
      fname: fname,
      mname: mname,
      lname: lname,
      age: age,
      birthday: birthday,
      birthmonth: birthmonth,
      birthyear: birthyear,
      gender: gender,
      email: email,
      contactno: contactno,
      barangay: barangay,
      zone: zone,
      town: town,
      province: province,
      city: city,
      region: region,
      username: username,
      password: password,
    });
    alert("Success");
    window.location.href = "/";
  };

  return (
    <form className="signup-form">
      <p>Sign Up</p>

      <div className="name">
        <label htmlFor="fname" className="signup-label">
          First Name :
        </label>
        <input
          type="text"
          name="fname"
          className="signup-input"
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />

        <label htmlFor="mname" className="signup-label">
          Middle Name :
        </label>
        <input
          type="text"
          name="mname"
          className="signup-input"
          onChange={(e) => {
            setMname(e.target.value);
          }}
        />

        <label htmlFor="lname" className="signup-label">
          Last Name :
        </label>
        <input
          type="text"
          name="lname"
          className="signup-input"
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
      </div>

      <div className="birthdate">
        <p className="birthp">Birthdate :</p>

        <label htmlFor="birthday" className="signup-label">
          Birth Day :
        </label>
        <input
          type="text"
          name="birthday"
          className="signup-input"
          onChange={(e) => {
            setBirthday(e.target.value);
          }}
        />

        <label htmlFor="birthmonth" className="signup-label">
          Birth Month
        </label>
        <input
          type="text"
          name="birthmonth"
          className="signup-input"
          onChange={(e) => {
            setBirthMonth(e.target.value);
          }}
        />

        <label htmlFor="birthyear" className="signup-label">
          Birth Year :
        </label>
        <input
          type="text"
          name="birthyear"
          className="signup-input"
          onChange={(e) => {
            SetBirthYear(e.target.value);
          }}
        />

        <label htmlFor="age" className="signup-label">
          Age :
        </label>
        <input
          type="text"
          name="age"
          className="signup-input"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>
      <label htmlFor="gender" className="signup-label" id="genderlabel">
        Gender :
      </label>
      <input
        type="text"
        name="gender"
        className="signup-input"
        id="genderinput"
        onChange={(e) => {
          setGender(e.target.value);
        }}
      />

      <label htmlFor="email" className="signup-label" id="emaillabel">
        Email:
      </label>
      <input
        type="email"
        name="email"
        className="signup-input"
        id="emailinput"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <label htmlFor="contactno" className="signup-label" id="contactlabel">
        Contact No.:
      </label>
      <input
        type="text"
        name="contactno"
        className="signup-input"
        id="contactinput"
        onChange={(e) => {
          setContactNo(e.target.value);
        }}
      />

      <div className="address">
        <label htmlFor="barangay" className="signup-label">
          Barangay :
        </label>
        <input
          type="text"
          name="barangay"
          className="signup-input"
          onChange={(e) => {
            setBarangay(e.target.value);
          }}
        />

        <label htmlFor="zone" className="signup-label">
          Zone :
        </label>
        <input
          type="text"
          name="zone"
          className="signup-input"
          onChange={(e) => {
            setZone(e.target.value);
          }}
        />

        <label htmlFor="town" className="signup-label">
          Town :
        </label>
        <input
          type="text"
          name="town"
          className="signup-input"
          onChange={(e) => {
            setTown(e.target.value);
          }}
        />
      </div>

      <div className="address2">
        <label htmlFor="province" className="signup-label">
          Province :
        </label>
        <input
          type="text"
          name="province"
          className="signup-input"
          onChange={(e) => {
            setProvince(e.target.value);
          }}
        />

        <label htmlFor="city" className="signup-label">
          City :
        </label>
        <input
          type="text"
          name="city"
          className="signup-input"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <label htmlFor="region" className="signup-label">
          Region :
        </label>
        <input
          type="text"
          name="region"
          className="signup-input"
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        />
      </div>

      <div className="info">
        <label htmlFor="username" className="signup-label">
          Username :
        </label>
        <input
          type="text"
          name="username"
          className="signup-input"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label htmlFor="password" className="signup-label">
          Password :
        </label>
        <input
          type="password"
          name="password"
          className="signup-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="button" className="signup-btn" onClick={signupHandler}>
          Sign Up
        </button>
      </div>
      <p className="link">
        Already Have an Account? <a href="/">Login</a>
      </p>
    </form>
  );
};

export default SignUpPage;
