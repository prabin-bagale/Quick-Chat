const router = require('express').Router();
const authMiddleware = require('./../middleware/authMiddleware');
const Chat = require('./../models/chat');
//create a new chat
router.post('/create-chat', authMiddleware, async(req, res) => {
    try {
        const chat = new Chat(req.body);
        const savedChat = await chat.save();
        res.status(201).send({
            message: "Chat created successfully",
            success: true,
            chat: savedChat
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
           success: false
        });
    }
});
router.get('/get-all-chats', authMiddleware, async(req, res) => {
    try {
        const allchats = await Chat.find({members: {$in: req.body}})
        res.status(200).send({
            message: "Chat fetched successfully",
            success: true,
            chat: allchats
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
           success: false
        });
    }
});
module.exports = router;