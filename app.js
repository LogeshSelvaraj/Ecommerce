require("dotenv").config()
const express=require("express")
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs =require("fs")
const path = require("path")

const app=express()

// connecting  database
mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_URL, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())
app.use(express.static(`client/build`))


// importing all routes
fs.readdirSync("./routes").map((r)=> app.use("/api",require("./routes/"+r)))


app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})



app.listen(process.env.PORT || 8000,()=>{
        console.log("server started running")
})


