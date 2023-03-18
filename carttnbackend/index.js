const express = require('express');
const connectToDB = require('./config/connectToDB.js');
require('dotenv').config()
//connect to database
connectToDB()


// init the app 
const app = express();

// middlewares
app.use(express.json())

//route
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/carposts", require("./routes/carPostRoute"));
app.use("/api/car", require("./routes/modelCarRoute"));
app.use("/api", require("./routes/vehicleRoute"));


//running the server 
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server runing in ${process.env.NODE_ENV} mode on port ${PORT}`);
})