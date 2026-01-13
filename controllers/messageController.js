const router = require('express').Router();
const authMiddleware = require('./../middleware/authMiddleware');
const Chat = require('./../models/chat');
const Message = require('./../models/message');

router.post('/new-message', authMiddleware, async(req, res) => {
    try {
        //store message in database
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        //update chat's latest message
        const  currentChat = await Chat.findOneAndUpdate({
            _id: req.body.chatId
        },{
            latestMessage: savedMessage._id,
            $inc: {messageCount: 1}
        })
        res.status(201).send({
            message: "Message sent successfully",
            success: true,
            data: savedMessage
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
              success: false
        });
    }
});   
router.get('/get-all-messages/:chatId', authMiddleware, async(req, res) => {
    try {
       const allMessages = await Message.find({chatId: req.params.chatId}).sort({createdAt: 1});
        res.status(201).send({
            message: "Message fetch successfully",
            success: true,
            data: allMessages
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
              success: false
        });
    }
});   
module.exports = router;