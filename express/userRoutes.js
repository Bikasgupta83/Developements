const express = require('express');
const router = express.Router();

router.get("/profile",(req,res)=>{
    res.send("User Profile Dashboard");
})

router.get("/setting",(req,res)=>{
    res.send("User Account Settings");
})

module.exports = router;