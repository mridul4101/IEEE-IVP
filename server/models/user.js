const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String,
    lowercase:true,
    required:[true,"email is required"],
    unique:true
  },
  hex:{
    type:String,
    required:[true, 'hex value is required'],
    unique:true
  }
});
// 0x229a563023CECee85a55DA14162c8300388C5D70
const hexValidator = (hex) =>{
  if(hex[0] === '0' && hex[1] === 'x') return true;
  return false;
}
userSchema.pre('save',function (next){
  const {email, hex} = this;
  if(!validator.isEmail(email)){
    throw Error("The email must be valid.")
  }
  if(!hexValidator(hex)){
    throw Error("hex value should start with 0x")
  }
  next();
});

module.exports = new mongoose.model('User', userSchema)

