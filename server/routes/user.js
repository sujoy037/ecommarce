const express=require('express');
const router=express.Router();

const userById=require('../controller/user');
const { requireSignin,isAuth,isAdmin} = require('../controller/auth');



router.get('/secret/:userId', requireSignin,isAuth,isAdmin,(req, res) => {
    console.log('User ID:', req.params.userId);
    res.json({
        user: req.profile
    });
   // res.send('hii')
});
router.param('userId',userById);

// router.get('/secret/:userId',userById,requireSignin,(req, res) => {
//         console.log('User ID:', req.params.userId);
//         res.json({
//             user: req.profile
//         });
// });





module.exports=router