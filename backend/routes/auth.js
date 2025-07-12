const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWTsec = 'hello';

//ROUTE-1: Create a User using: POST "/api/auth/createuser" . Doesnt req auth
router.post('/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 1 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password should contain more than 4 chars').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check whether same email exists
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry user with same email exists" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWTsec);
            res.json({ authtoken })
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some err occured");
        }

    })

//ROUTE-2: Authenticate a User using: POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cant be blank').exists()
], async (req, res) => {
    //If there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Give correct credentials" })
        }
        const pwcmp = bcrypt.compare(password, user.password);
        if (!pwcmp) {
            return res.status(400).json({ error: "Give correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWTsec);
        res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}
)

//ROUTE-3: Get logged in user details using: "/api/auth/getuser". Login
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId=req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router