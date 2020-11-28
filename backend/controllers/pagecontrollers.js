require("dotenv").config();

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require ("jsonwebtoken")

const authToken = require ('../authentication/authToken')
// router.use()

router.post('/authenticate',authToken, (req,res) =>{
  res.cookie('accessToken', req.accessToken,  //dont need to return fix this
  { httpOnly: true, withCredentials: true, credentials: 'include',  expires: new Date(Date.now() + 8 * 3600000)});
  res.send({ client_id: req.client_id, permission:req.permission})
})





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
