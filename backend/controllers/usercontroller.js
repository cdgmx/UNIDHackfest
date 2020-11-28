const express = require('express')
const dboperations = require ('../database/dboperations')
const { v4: uuidv4 } = require('uuid')





let router = express.Router()
//future purposes, not being used


var client = "users"
var client_id = "qwerqwe"
// var qrkey = "135"
var QRCode = require('qrcode');

const authToken = require ('../authentication/authToken')
router.use(authToken)

router //for gettin and updating
    .route('/qr')
    .post(async (req,res) =>{
        try{
            //needed qrkey
            let qrkey = req.body.qrkey
            

            let data = await dboperations.getClientInfo("users",'qrkey',qrkey)
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
                //updating the qrkey to resetqr
                //needed the new qrkey
                var qrkey = uuidv4() //convert to hash
                let client_id = req.client_id
                console.log(qrkey)
                console.log(client_id)
                
                await dboperations.putClientInfo('users','qrkey',qrkey,'client_id',client_id)

                let qr = await QRCode.toString(`${qrkey}`,{type:'svg'})
                res.send(qr) //to be change later
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
            console.log("user/info")
            //needed client id
            let client_id =  req.client_id
            
            let data = await dboperations.getClientInfo("users",'client_id',client_id)

            if(data){
                console.log(data)
                res.send(data)
            }
            else{
                console.log("info sent")
                throw "error in getClientInfo Diretso"
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
            let client_id = req.client_id
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
