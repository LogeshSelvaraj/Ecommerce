require("dotenv").config()
const express=require("express")
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs =require("fs")

const app=express()

// connecting  database
mongoose
  .connect(process.env.MONGODB_LOCAL_HOST, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())



// importing all routes
fs.readdirSync("./routes").map((r)=> app.use("/api",require("./routes/"+r)))


app.listen(process.env.PORT || 8000,()=>{
        console.log("server started running")
})


