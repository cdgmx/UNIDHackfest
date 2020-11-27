

const express = require("express");
const router = express.Router();
var client = "users"
var client_id = "qwerqwe"
// var qrkey = "135"
var QRCode = require('qrcode');
const dboperations = require("../database/dboperations");



router //for gettin and updating
    .route('/qr')
    .get(async (req,res) =>{
        try{
            //needed client_id
            let client_id = req.body.client_id
            let data = await dboperations.getClientInfo("users",'client_id',client_id)
            if(data){
                console.log("data sent")
                // let qr = await QRCode.toString(`${data.qrkey}`,{type:'svg'})
                res.send(data.qr)
            }
            else{
                throw "error in getClientInfo"
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).send({message:error});
        }
    })
        .put(async(req,res) =>{
            try{
                //needed qrkey
                let qrkey = req.body.qrkey
                let client_id = req.body.client_id
                console.log(req.body)
                if(data){
                    res.send("success") //change later
                }
                else{
                    throw "error in putClientInfo qr"
                }
               
            }
            catch(error) {
                console.log(error)
                res.status(401).send({message:error});
            }
        })
router
    .route('/info')
    .get(async (req,res) =>{
        try{
            //needed client_id 
            //retrieve the info of user in db using the clinet_id provided
            let client_id = req.body.client_id
            let data = await dboperations.getClientInfo("users",'client_id',client_id)
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
            res.status(401).send({message:error});
        }
    })
router
    .route('/history')
    .get(async (req,res) =>{
        try{
             //needed client_id of user
            let client_id = req.body.client_id
            let data = await dboperations.getScanned(client_id,'user_id','admin_id','admins')
            if(data){
                console.log("history sent")
                res.send(data)
            }
            else{
                throw "error in getClientInfo"
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).send({message:error});
        }
    })

module.exports = router



