const express=require('express');
const router=express.Router();
const userById=require('../controller/user');
const { requireSignin,isAuth,isAdmin} = require('../controller/auth');
const {create,categoryById,read,update,remove,list}=require('../controller/category')


router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/categories', list);

router.param('userId',userById);
router.param('categoryId',categoryById);


module.exports=router