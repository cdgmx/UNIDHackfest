require("dotenv").config();

const express = require("express");
const router = express.Router();

const mysql = require("mysql");


router.get("/api/get", (req, res) => {
  const sqlSELECT = "SELECT * FROM user_tbl";
  db.query(sqlSELECT, (err, result) => {
    res.send(result);
  });
});




router.post("/signuppage/submit", (req, res) => {
  const fname = req.body.fname;
  const mname = req.body.mname;
  const lname = req.body.lname;
  const age = req.body.age;
  const birthday = req.body.birthday;
  const birthmonth = req.body.birthmonth;
  const birthyear = req.body.birthyear;
  const gender = req.body.gender;
  const email = req.body.email;
  const contactno = req.body.contactno;
  const barangay = req.body.barangay;
  const zone = req.body.zone;
  const town = req.body.town;
  const province = req.body.province;
  const city = req.body.city;
  const region = req.body.region;
  const username = req.body.username;
  const password = req.body.password;
  const sqlInsert =
    "INSERT INTO user_tbl (fname,mname,lname,age,birthday,birthmonth,birthyear,gender,email,contactno,barangay,zone,town,province,city,region,username,password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      fname,
      mname,
      lname,
      age,
      birthday,
      birthmonth,
      birthyear,
      gender,
      email,
      contactno,
      barangay,
      zone,
      town,
      province,
      city,
      region,
      username,
      password,
    ],
    (error, result) => {
      console.log(error);
    }
  );
});

module.exports = router;
