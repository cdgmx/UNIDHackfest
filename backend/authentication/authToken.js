
const jwt = require ("jsonwebtoken")
const express = require("express");
const dboperations = require ('../database/dboperations')

async function authToken(req,res,next) {
    var accessToken = req.cookies.accessToken
    try{
        console.log("Authenticating Access Token..")
        if(!accessToken) throw "No Access Token Passed"
        let data = jwtVerify(accessToken, 'ACCESS_TOKEN_SECRET')
        if(data){
            // console.log(data)
            let dataPermission = await dboperations.getPermission(data.client_id)
            if(dataPermission){
                req.permission  = dataPermission.permission
            }
            else throw "getPermission error DB"

            req.client_id   = data.client_id
            req.accessToken  = accessToken
            //always returns client id, access token and permission
            next()
        }
        else throw "Access Token  Isnt Verified"
        
    }
    catch(error){
        console.log(error) 
        res.status(401).send({message:error});
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
  
module.exports = authToken