

const express = require("express");
const router = express.Router();
var client = "users"
var client_id = "qwerqwe"
// var qrkey = "135"
var QRCode = require('qrcode');
const dboperations = require("../database/dboperations");

router
    .route('/info') //geting the info of admin like name and address to display
    .get(async (req,res) =>{
        try{
            //needed qrkey 
            let qrkey = req.body.qrkey
            let data = await dboperations.getClientInfo("users",'qrkey',qrkey,'client_id','admins')
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






module.exports = router;