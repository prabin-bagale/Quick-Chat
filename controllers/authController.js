const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/user')

router.post('/signup', async(req, res) => {
  try {
    //if the user already exists
        const user = await User.findOne({email: req.body.email})
    //if user exists, send error response
    if(user){
         return res.send({
          message: "User already exists",
          success: false
        })
    }
    //encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

    //create a new user and save to database
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
          message: "User created successfully",
          success: true
        });

  } catch (error) {
    res.send({
        message: error.message,
        success: false
    })
  }
});
router.post('/login', async(req, res) => {
    try {
        //check if user exists
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.send({
                message: "User does not exist",
                success: false
            })
        }
        //check if password matches
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.send({
                message: "Password does not match",
                success: false
            })
        }
        //if the user exists and password matches,assign jwt token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.send({
            message: "Login successful",
            success: true,
            token: token
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
})
module.exports = router;
