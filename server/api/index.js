const router = require('express').Router();
const User = require('../models/user');

router.get('/user', async(req,res)=>{
  const {email} = req.body
  try{
    const user = await User.findOne({email});
    if(user){
      res.send(user);
    }
    else res.status(404).json({error:"email not found"})
  }
  catch(e){
    // console.log(e.message);
    res.status(404).json({error:e.message});
  }
});

router.post('/user',async(req,res)=>{
  const {name, email, hex} = req.body
  try{
    const user = await User.create({name, email, hex});
    res.send(user);
  }
  catch(e){
    // console.error(e);
    res.status(404).json({error:e.message});
  }
}); 

module.exports = router;