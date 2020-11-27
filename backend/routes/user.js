const express = require('express')
let router = express.Router()

router
    .route('/cars')
    .get((req,res) =>{
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
