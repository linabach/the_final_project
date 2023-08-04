const express = require('express');
const { register, login} = require('../controllers/user');
const isAuth = require("../Middlewares/isAuth");
const { registerValidator, validation, loginValidator } = require('../Middlewares/validator');


const router = express.Router();

router.get("/test", (req,res)=> {
    res.send("api is running")
})


router.post("/register",registerValidator(),validation, register)

router.post("/login",loginValidator(),validation, login)

router.get("/current" , isAuth , (req,res)=>{
    res.send(req.user)
})



module.exports = router 