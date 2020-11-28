if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cookieParser = require('cookie-parser')
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require ("jsonwebtoken")

const authToken = require ('./authentication/authToken')

app.use(cors({ origin: true, credentials: true }));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

// app.use(authToken)
//routing
const dboperations = require ('./database/dboperations')
var controller = require("./controllers/pagecontrollers");
var usercontroller = require("./controllers/usercontroller");
var admincontroller = require("./controllers/admincontroller");
var formController = require("./controllers/formController");



app.use("/form", formController);

app.use("/", controller);

app.use("/user", usercontroller);

app.use("/admin", admincontroller);



app.delete('/logout', async (req,res) =>{
  const refreshToken = req.cookies.refreshToken // get the refresh token
  
  try{
      if(refreshToken){
          let response = await dboperations.deleteTokens(refreshToken) //execute dboperations deleting refersh token on db
          if(response){
              res.cookie('accessToken', " ", 
              {httpOnly: true, withCredentials: true, credentials: 'include',  expires: new Date(Date.now() + 8 * 3600000)});  
             
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




app.get("/refreshToken",async(req, res)=>{
  const refreshToken = req.cookies.refreshToken
  
  console.log("Trying To Refresh Token")
  try{
      if(!refreshToken) throw "No Refresh Token Passed"
      else{
          let data = jwtVerify(refreshToken, 'REFRESH_TOKEN_SECRET')
          if(data){
              let resultToken = await dboperations.checkTokens(refreshToken)
              if(resultToken){
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
              throw "refreshToken  Didnt Verify"
          }
      }
  }
  
  catch (error){
      console.log(error)
      res.status(401).send({message:error});

  }

})


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
      console.log(error)   
      return null  
  }
}

function generateAccessToken(user){
  var token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5s'})
  return token
}


app.listen(process.env.PORT || 3001, (err) => {
  if (
    (err) => {
      console.log("error occured");
    }
  )
    console.log("running at port 3001");
});