const express=require('express');
const router=express.Router();

const {sayController,signup,signin,signout,requireSignin}=require('../controller/auth')
const userSignupValidator=require('../validator/index')

// router.get('/',(req,res)=>{
//     res.send('hi routes')
// })

//router.get('/',sayController)
router.post('/signup',userSignupValidator,signup)
router.post('/signin',signin)
router.get("/signout", signout);
// router.get('/hello',requireSignin, (req,res)=>{
//     res.send('hi routes')
// })


module.exports=router