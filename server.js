const express = require('express');
const app = express();

require('dotenv').config()
app.use(express.json())

// ConnectDB
const connectDB= require("./config/connectDB");
connectDB()

// Create Routes
app.use("/api/fastfood" , require('./routes/fastfood'));
app.use("/api/restaurent" , require('./routes/restaurent'));
app.use("/api/nightLife" , require('./routes/nightLife'));
app.use("/api/user" , require("./routes/user"))


app.use((req,res)=>{
    res.send("API is running")
})

// Port
const Port = process.env.PORT || 2221


// Create server
app.listen(Port,error => {
    error? console.log(`Failed to run , ${error}`):
    console.log(`Server is running on ${Port}`)
})



