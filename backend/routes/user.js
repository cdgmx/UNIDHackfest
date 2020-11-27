const express = require('express')
const dboperations = require ('./database/dboperations')
let router = express.Router()
//future purposes, not being used
router
    .route('/qr')
    .get(async (req,res) =>{

        try{
            dboperations.getQr()
        }
        catch(error)
        {

        }
        res.send("get operations")
    })
    .post((req,res) =>{
        res.send("get operations")
    })
    .put((req,res) =>{
        res.send("get operations")
    })
    .delete((req,res) =>{
        res.send("get operations")
    })

module.exports = router
