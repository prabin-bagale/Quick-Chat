const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');


// Get user details
router.get('/get-user-info', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })
    res.send({
      message: "User details fetched successfully",
        success: true,
      user: user
    });
  } catch (error) {
    res.send({
      message: error.message,
        success: false
    });
  }
});
module.exports = router;