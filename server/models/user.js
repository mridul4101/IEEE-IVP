const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String,
    required:[true,"email is required"]
  },
  hex:{
    type:String,
    required:[true, 'hex value is required']
  }
});

module.exports = new mongoose.model('User', userSchema)

