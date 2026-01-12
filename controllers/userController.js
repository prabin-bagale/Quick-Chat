const router = require('express').Router();
const User = require('./../models/user')
const authmiddleware = require('./../middleware/authMiddleware')

//get user details of logged in user
router.get('/get-user-info', authmiddleware, async (req, res) => {
    try {
        // Use req.userId which was set in the middleware
        const user = await User.findOne({ _id: req.userId });

        if (!user) {
            return res.send({ message: "User not found", success: false });
        }

        res.send({
            message: "User details fetched successfully",
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        });
    }
});

router.get('/get-alluser-info', authmiddleware, async (req, res) => {
    try {
        // Use req.userId which was set in the middleware
        const userid = req.body.userId;
        const allUsers = await User.find({ _id: {$ne: userid} });

        if (!allUsers) {
            return res.send({ message: "User not found", success: false });
        }

        res.send({
            message: "ALLusers details fetched successfully",
            success: true,
            data: allUsers
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        });
    }
});


module.exports = router;