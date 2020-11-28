const express = require('express')
const dboperations = require ('../database/dboperations')
let router = express.Router()
const jwt = require ("jsonwebtoken")

//future purposes, not being used

var client = "users"
var client_id = "qwerqwe"
// var qrkey = "135"
var QRCode = require('qrcode');


router
    .route('/signUp')
    .post(async (req,res) =>{
        try{
            //needed accountType and regInfo
            var response = null
            let accountType = req.body.accountType
            console.log(req.body.regInfo)

            if(accountType == "user"){
                const regInfo = {...req.body.regInfo}
                response = await dboperations.postClientInfo("user", regInfo)
            }
            else{
                const regInfo = {...req.body.regInfo}
                 response = await dboperations.postClientInfo("admin", regInfo)
            }

            if (response){
                res.send("Success")
            }
            else{
                throw "no response from postClientInfo"
            }

        }
        catch(error) {
            console.log(error)
            res.status(401).send(error);
        }
    })
router
    .route('/signIn')
    .post(async (req,res) =>{
        try{
            const email = req.body.email
            const password = req.body.password
            const accountType = req.body.accountType
            var client = null
            
            if(accountType == 'user') client = "users"
            else client = "admins"

            let dataGetClientInfo = await dboperations.getClientInfo(client,'email', email)
            if(dataGetClientInfo){
                const client_id = dataGetClientInfo.client_id
                const accessToken = generateAccessToken({client_id:client_id})
                const refreshToken = jwt.sign(client_id,process.env.REFRESH_TOKEN_SECRET)
                
                let dataUpdateTokens = await dboperations.updateTokens(refreshToken, client_id)
                    if(dataUpdateTokens){
                        res.cookie('refreshToken', refreshToken, 
                        { httpOnly: true, withCredentials: true, credentials: 'include',  expires: new Date(Date.now() + 8 * 3600000)});
                        res.cookie('accessToken', accessToken, 
                        { httpOnly: true, withCredentials: true, credentials: 'include',  expires: new Date(Date.now() + 8 * 3600000)});
                        res.send({info:dataUpdateTokens})
                    }
                    else{
                        throw "Error updating  refreshToken token in DB"
                    }      
            }
            else{
                throw "no data received in getClientInfo"
            }
        
        }
        catch(error) {
            console.log(error)
            res.status(401).send(error);
        }
    })

function generateAccessToken(user){
    var token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5s'})
    return token
}
module.exports = router
