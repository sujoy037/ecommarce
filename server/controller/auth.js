const User = require('../model/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const sayController = (req, res) => {
    res.json({ message: 'hii controller' });
};

const signup = async (req, res) => {
    try {
        console.log(req.body);
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(200).json({ user: savedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signin=async(req,res)=>{
    try {
        const { email, password } = req.body;
        // User.findOne({ email }, (err, user) => {
        //     if (err || !user) {
        //         return res.status(400).json({
        //             error: 'User with that email does not exist. Please signup'
        //         });
        //     }
        //     // if user is found make sure the email and password match
        //     // create authenticate method in user model
        //     if (!user.authenticate(password)) {
        //         return res.status(401).json({
        //             error: 'Email and password dont match'
        //         });
        //     }

        //     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //     // persist the token as 't' in cookie with expiry date
        //     res.cookie('t', token, { expire: new Date() + 9999 });
        //     // return response with user and token to frontend client
        //     const { _id, name, email, role } = user;
        //     return res.json({ token, user: { _id, email, name, role } });
        // })
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please sign up'
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password don\'t match'
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const userId = user._id;
        const userName = user.name;
        const userEmail = user.email;
        const userRole = user.role;
        return res.json({ token, user: { _id: userId, email: userEmail, name: userName, role: userRole } });
    
        
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }


   
    
}


const signout= async(req,res)=>{
    try {
        res.clearCookie('t');
        res.json({ message: 'Signout success' });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signout:', error);
        // Send an internal server error response
        res.status(500).json({ error: 'Internal server error' });
    }
}

// const requireSignin = async (req, res, next) => {
//     try {
//         await expressJwt({
//             secret: process.env.JWT_SECRET,
//             userProperty: 'auth'
//         })(req, res, next);
//     } catch (error) {
//         return res.status(401).json({ error: 'Unauthorized access' });
//     }
// };

// const isAuth = async(req, res, next) => {
//     try {
//         let user = req.profile && req.auth && req.profile._id == req.auth._id;
//         if (!user) {
//             return res.status(403).json({
//                 error: 'Access denied'
//             });
//         }
//         next();
//     } catch (error) {
//         console.error('Error in isAuth middleware:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


// const isAdmin = async(req, res, next) => {
//     try {
//         if (req.profile.role === 0) {
//             return res.status(403).json({
//                 error: 'Admin resource! Access denied'
//             });
//         }
//         next();
//     } catch (error) {
//         console.error('Error in isAdmin middleware:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

const isAuth = (req, res, next) => {
    if (!(req.profile && req.auth && req.profile._id == req.auth._id)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ error: 'Admin resource! Access denied' });
    }
    next();
};



module.exports = { sayController, signup,signin ,requireSignin,signout,isAdmin,isAuth};
