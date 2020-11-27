const express = require('express')
const dboperations = require ('../database/dboperations')
let router = express.Router()
//future purposes, not being used

var client = "users"
var client_id = "qwerqwe"
// var qrkey = "135"
var QRCode = require('qrcode');

router //for gettin and updating
 
router
    .route('/info')
    .get(async (req,res) =>{
        try{
            //needed client_id of admin
            let client_id = req.body.client_id
            let data = await dboperations.getClientInfo("admins",'client_id',client_id)
            if(data){
                res.send(data)
            }
            else{
                console.log("info sent")
                throw "error in getClientInfo"
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).send(error);
        }
    })
router
    .route('/scanned')
    .get(async (req,res) =>{
        try{
            //needed client_id, it will select all data from  scanned table where admin_id = client_id
            //it will only get its own scanned data
            let client_id = req.body.client_id
            let data = await dboperations.getScanned(client_id,'admin_id','user_id','users')
            if(data){
                console.log("history sent")
                res.send(data)
            }
            else{
                throw "error in getScanned"
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).send(error);
        }
    })
    .post(async (req,res) =>{
        try{
            //needed client_id and qr_key
            //it will only get its own scanned data
            console.log(req.body)
            if(!req.body) throw "no data in body"
            let admin_id =  req.body.client_id
            let qrkey = req.body.qrkey
            let response = await dboperations.getClientInfo("users",'qrkey',qrkey)
            if(response){
                let user_id =  response.client_id
                let data = await dboperations.postScanned(admin_id, user_id)
                if(data){
                    res.send("success")
                }
                else{
                    throw "error in postScanned"
                }
            }
            else{
                throw "user is not in DB"
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).send(error);
        }
    })
module.exports = router
