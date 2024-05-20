const User = require('../model/user');

// const userById = (req, res, next, id) => {
//     try {
//         User.findById(id).exec((err, user) => {
//             if (err || !user) {
//                 return res.status(404).json({
//                     error: 'User not found'
//                 });
//             }
//             req.profile = user;
//             next();
//         });
//     } catch (error) {
//         console.error('Error in userById middleware:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };
const userById = async (req, res, next,id) => {
    try {
        //const user = await User.findById(req.params.userId).exec();
        const user = await User.findById(id).exec();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.profile = user;
        //res.json(user);
        
        next()
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
};
module.exports = userById;
