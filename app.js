const express= require('express')
const app = express();
const authRouter= require('./controllers/authController')
const userRouter= require('./controllers/userController')


//middleware
app.use(express.json());
//routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

module.exports = app;