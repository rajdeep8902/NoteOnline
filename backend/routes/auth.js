const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/" . Doesnt req auth
router.post('/',
    [
        body('name','Enter a valid name').isLength({min:1}),
        body('email','Enter a valid email').isEmail(),
        body('password','Password should contain more than 4 chars').isLength({min:5})
    ],
    (req, res) => {
    // console.log(req.body);
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user=>res.json(user))
    .catch(err=>{
        console.log(err);
        res.json({error:'Please enter unique email',
            msg:err.message
        })
    });
})

module.exports = router