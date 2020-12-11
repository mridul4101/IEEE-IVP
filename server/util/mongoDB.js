const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://admin:lWSHUddhG8mNe4DA@cluster0.dec8o.mongodb.net/blockchain?retryWrites=true&w=majority";

module.exports =  mongoose.connect(MONGO_URL,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("database connected");
}).catch(e => console.log(e.message));

