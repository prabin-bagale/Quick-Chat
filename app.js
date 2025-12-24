const express= require('express')
const app = express();
const authRouter= require('./controllers/authController')

//middleware
app.use(express.json());
//routes
app.use('/api/auth', authRouter);

module.exports = app;