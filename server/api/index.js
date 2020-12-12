const router = require('express').Router();
const User = require('../models/user');

router.post('/getuser', async(req,res)=>{
  const {email} = req.body
  try{
    const user = await User.findOne({email});
    if(user){
      res.json(user);
    }
    else res.status(404).json({error:"email not found"})
  }
  catch(e){
    res.status(404).json({error:e.message});
  }
});

router.post('/user',async(req,res)=>{
  const {name, email, hex} = req.body
  console.log(req.body);
  try{
    const user = await User.create({name, email, hex});
    res.json({message:"user successfully created",user});
  }
  catch(e){
    console.error(e);
    if(e.code === 11000){
      res.status(404).json({error:"user already exists"});
    }else{
      res.status(404).json({error:e.message});
    }
  }
}); 

module.exports = router;