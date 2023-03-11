const express = require('express');
const connectToDB = require('./config/connectToDB.js');
require('dotenv').config()
//connect to database
connectToDB()


// init the app 
const app = express();

// middlewares
app.use(express.json())

//running the server 
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server runing in ${process.env.NODE_ENV} mode on port ${PORT}`);
})