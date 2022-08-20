require("dotenv").config({path:"./config.env"});
const path = require('path');
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'))


if(process.env.NODE_ENV = 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  })
}else{
  app.get("/",(req,res)=>{
    res.send("Api running")
  })
}

const PORT = process.env.PORT || 3001;
async function start() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log("Hello");
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}
start();

