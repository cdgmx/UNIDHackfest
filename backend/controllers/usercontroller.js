const express = require('express')
const dboperations = require ('./database/dboperations')
let router = express.Router()
//future purposes, not being used
router //for gettin and updating
    .route('/qr')
    .get(async (req,res) =>{
        try{
            let data = await dboperations.getClientInfo(client,'qrkey',qrkey,'client_id',client_id)
            if(data){
                let qr = await QRCode.toString(`${qrkey}`,{type:'svg'})
                res.send({qr:qr})
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
    .put((req,res) =>{
        try{
            dboperations.putClientInfo('users','qrkey',qrkey, 'client_id',client_id)
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
            let data = await dboperations.getClientInfo(client,'qrkey',qrkey,'client_id','admins')
            if(data){
                data.qr = await QRCode.toString(`${qrkey}`,{type:'svg'})
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
router
    .route('/history')
    .get(async (req,res) =>{
        try{
            let data = await dboperations.getScanned(client_id,'user_id','admin_id','admins')
            if(data){
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
