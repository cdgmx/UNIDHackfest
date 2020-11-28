const express = require('express')
let router = express.Router()

//custom module
const dboperations = require ('../database/dboperations')
const authToken = require ('../authentication/authToken')
//
router.use(authToken)


//for client info
router
    .route('/info')
    .get(async (req,res) =>{
        try{
            //needed client_id of admin
            let client_id = req.client_id
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

//for scanned data
router
    .route('/scanned')
    .get(async (req,res) =>{
        try{
            //needed client_id, it will select all data from  scanned table where admin_id = client_id
            //it will only collect its own scanned data
            let client_id = req.client_id
            console.log(client_id)
            let data = await dboperations.getScanned(client_id,'admin_id','user_id','users')
            if(data){
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
            let admin_id =  req.client_id
            let qrkey = req.body.qrkey
            //find the user with matching qrkey
            let response = await dboperations.getClientInfo("users",'qrkey',qrkey)
            if(response){
                let user_id =  response.client_id
                let data = await dboperations.postScanned(admin_id, user_id)
                if(data){
                    res.send(response)
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
