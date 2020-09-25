const express = require('express');
const router = express.Router();
const User = require('../models/UsersModel');

router.post('/', async(req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        balance: 0.00
    });
    try{
        const savedUser = await user.save();
        res.status(200);
        res.json({message: 'Success', data: {...savedUser._doc}});
    }
    catch(err){
        res.status(404);
        //Handle Duplicate Users
        if(err.code == 11000){
            res.json({message: "The user already exists"});
        }else{
            res.json({message: err});
        }
        
    }
})

module.exports = router;