require('dotenv').config()

const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const app = express()
const jwt = require ("jsonwebtoken")
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const dboperations = require ('./database/dboperations')
const routeUser = require(`./routes/user.js`)

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.urlencoded({extend: true}));
app.use(express.json())
app.use(cookieParser())


app.post("/resetQR", authToken, async(req, res)=>{
  let client_id = req.client_id
  let permission = req.permission
  let client = null
  var qrkey = Math.floor((Math.random() * 1000) + 1);
  console.log("get info")
  if(permission != 1){
      client = "users"
  }
  else client = "admins"
  
  
  try{
      console.log("qr here")
  let data = await dbopertions.updateClient(client,'qrkey',qrkey,'client_id',client_id)
      if(data){
         
          let qr = await QRCode.toString(`${qrkey}`,{type:'svg'})
          res.send({qr:qr})
      }
      else{
          throw "error in updateClient"
      }

  }
  catch (error){
      console.log(error)
      res.status(401).send({message:"Something is wrong in your token verify"});
  }
})

app.post("/getScanned", authToken, async(req, res)=>{

  let client_id = req.client_id
  let permission = req.permission
  let key = null //key is waht we are trying to find
  let info_id = null
  let client = null
  if(permission != 1) {
      info_id ="admin_id"
      key = "user_id"
      client = "users"
  }
  
  else {
      info_id ="user_id"
      key = "admin_id"
      client = "admins"
  }
  try{
  let dataGetScanned = await dbopertions.getScanned(client_id,key,info_id,client)
      if(dataGetScanned!=null){

          res.send({scannedData:dataGetScanned })
          // let dataProcessInfo = await processInfo('scanned',key,client_id)
          // if(dataProcessInfo){
          //     res.send({info:dataProcessInfo})
          // }
      }
      else{
          console.log("NONE")
          res.status(401).send({message:"No data received"});
      }

  }
  catch (error){
      console.log(error)
      res.status(401).send({message:"Something is wrong in dboperation"});
  }
})

app.post("/getInfo", authToken, async(req, res)=>{
  let client_id = req.client_id
  let permission = req.permission
  let client = null
  console.log("get info")
  if(permission != 1){
      client = "users"
  }
  else client = "admins"
  console.log(client)
  console.log(client_id)
  try{
  let data = await dbopertions.getClientInfo(client,'client_id', client_id)
      if(data!=null){
          res.send({info:data})
      }
      else{
          res.status(401).send({message:"No data received"});
      }

  }
  catch (error){
      console.log(error)
      res.status(401).send({message:"Something is wrong in your token verify"});
  }
})


app.post("/refreshToken",async(req, res)=>{
  const refreshToken = req.cookies.refreshToken
  console.log("refresh")
  console.log(refreshToken)

  try{
      if(!refreshToken){  
          // res.status(401).send({message:"No Token"});
          throw "No Refresh Token"
      }
      else{
          
          let data = jwtVerify(refreshToken, 'REFRESH_TOKEN_SECRET')
          if(data!=null){
              let resultToken = await dbopertions.checkTokens(refreshToken)
              if(resultToken!=null){
                  let client_id = resultToken.client_id
                  const accessToken = generateAccessToken({client_id:client_id})
                  console.log("id")
                  res.cookie('accessToken', accessToken, 
                  {httpOnly: true, withCredentials: true, credentials: 'include',  expires: new Date(Date.now() + 8 * 3600000)});  
                  console.log("id2")
                  res.send({ client_id: client_id})
                  console.log("id3")
              }
              else{
                  // res.status(401).send({message:"Token is not in DB"});
                  throw "Token is not in DB"
              }
  
          }
          else{
              //  res.status(401).send({message:"Token  DIdntVerify"});
              throw "Token  Didnt Verify"
          }
      }

  }
  catch (error){
      console.log(error)
      res.status(401).send({message:error});

  }


 
})


app.post('/authenticate',authToken, (req,res) =>{
  res.cookie('accessToken', req.accessToken,  //dont need to return fix this
  { httpOnly: true, withCredentials: true, credentials: 'include',  expires: new Date(Date.now() + 8 * 3600000)});
  console.log("req.client_id}")
  console.log(req.client_id)
  
  res.send({ client_id: req.client_id, permission:req.permission})
})




app.post('/login', async (req,res) =>{
  const email = req.body.email
  const password = req.body.password 
  var accountType = req.body.accountType
  var client //change later for admin
  if(accountType == "User") client = "users"
  else client = "admins"
  
  try{
      let dataGetClientInfo = await dbopertions.getClientInfo(client,'email', email)
          if(dataGetClientInfo){
              const client_id = dataGetClientInfo.client_id
              const accessToken = generateAccessToken({client_id:client_id})
              const refreshToken = jwt.sign(client_id,process.env.REFRESH_TOKEN_SECRET)
              let dataUpdateTokens = await dbopertions.updateTokens(refreshToken, client_id)
                  if(dataUpdateTokens){
                      res.cookie('refreshToken', refreshToken, 
                      { httpOnly: true, withCredentials: true, credentials: 'include',  expires: new Date(Date.now() + 8 * 3600000)});
                      res.cookie('accessToken', accessToken, 
                      { httpOnly: true, withCredentials: true, credentials: 'include',  expires: new Date(Date.now() + 8 * 3600000)});
                      res.send({info:dataUpdateTokens})
                  }
                  else{
                      throw "Error updating token in DB"
                  }      
          }
          else{
              throw "no data received"
          }
      }
  catch (error){
      console.log(error)
      res.status(401).send({message:error});
  }
})

app.post('/register', async (req,res)=>{
  try{
      console.log("register")
      console.log(req.body.regInfo)
      if(!req.body.adminAcc){  //if not admin
          const email = req.body.regInfo.email
          const name = req.body.regInfo.name
          const address = req.body.regInfo.address
          const town = req.body.regInfo.town
          const province = req.body.regInfo.province
          const contact = req.body.regInfo.contact
          const birthday = req.body.regInfo.birthday
          const password = req.body.regInfo.password
          const info = {email,name,address,town,province,contact,birthday,password}
          let response = await dbopertions.regClient("users", info)
          if(response){
              console.log(response)
              res.send({message:"done"})
          }
          else{
              throw "error in regClient"
          }
      }
      else{
          const email = req.body.regInfo.email
          const name = req.body.regInfo.name
          const address = req.body.regInfo.address
          const town = req.body.regInfo.town
          const province = req.body.regInfo.province
          const contact = req.body.regInfo.contact
          const password = req.body.regInfo.password
          const info = {email,name,address,town,province,contact,password}
          let response = await dbopertions.regClient("admins", info)
          if(response){
              console.log(response)
              res.send({message:"done"})
          }
          else{
              throw "error in regClient"
          }
      }
  }
  catch(error){
      console.log(error)
      res.status(401).send({message:error});
  }
})


app.delete('/logout', async (req,res) =>{
  const refreshToken = req.cookies.refreshToken // get the refresh token
  
  try{
      if(refreshToken){
          let response = await dbopertions.deleteTokens(refreshToken) //execute dboperations deleting refersh token on db
          if(response!=null){
              res.send({message:"test"})
          }
          else{
              throw "Error in deleteTokens DB"
          }
      }
      else{
          throw "No refresh Token"
      }
  }
  catch(error){
      console.log(error)
      res.status(401).send({message:error});
  }
})


app.post('/submitScan', authToken, async(req,res) =>{
  const qrkey = req.body.qrkey
  const admin_id = 'zcasf'
  console.log("submitScan here")
  //find in db
  try{
      let dataClientInfo = await dbopertions.getClientInfo("users",'qrkey',qrkey)
      if(dataClientInfo!=null){
          const user_id = dataClientInfo.client_id
          let dataPostScanInfo = await dbopertions.postScanInfo(admin_id,user_id)
          if(dataPostScanInfo){
              res.send({message:"Success Submission", })
          }
          else{
              res.status(401).send({message:"Error in posting Scan"});
          }
      }
      else{
          res.status(401).send({message:"No dataClientInfo Found in users with that qrkey"});
      }

      let data
  }
  catch(error){
      res.status(401).send({message:"something is wrong in getClientInfo"});
  }

})



async function authToken(req,res,next) {
  console.log("Authenticating")
  var accessToken = req.cookies.accessToken

  try{

      if(!accessToken){  
          throw "No access Token"
      }
      
      console.log("1")
      let data = jwtVerify(accessToken, 'ACCESS_TOKEN_SECRET')
      console.log("2")
      if(data!=null){
          console.log("3")
          let dataPermission = await dbopertions.getPermission(data.client_id)
         
          if(dataPermission){
              req.permission  = dataPermission.permission
          }
          else{
              // res.status(401).send({message:"Client id cannot be found in clients db"});
              throw "Client id cannot be found in clients db"
          }

          req.client_id   = data.client_id
          req.accessToken  = accessToken
          next()
      }
      else{
          console.log("4")
          throw "Error in verifying Token"
          // res.status(401).json({error: new Error('Invalid request!')})
      }
  }
  catch(error){
      console.log(error) 
      res.status(401).send({message:error});
      // next()
      // res.status(401).send({message:"Something is wrong in your token verify"});
      // res.status(401).send({message:"Token is not present in DB"});
  }
}


function jwtVerify(token, secret){
  //ACCESS_TOKEN_SECRET
  //REFRESH_TOKEN_SECRET
  var data
  try{
      {secret == 'ACCESS_TOKEN_SECRET' ?
          data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
          :
          data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
      }
      
      return data
  }
  catch (error)
  {
      console.log("error in jwt verify")   
      return null
      
  }

}


function generateAccessToken(user){
  var token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5s'})
  return token
}

async function processInfo(client,key,value){
  try{
      let data = await dbopertions.getClientInfo(client,key,value)
      if(data){
          //no password or other sensitive data
          return data
      }
      else{
          return null
      }
  }
  catch{
      return null
  }

}


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
