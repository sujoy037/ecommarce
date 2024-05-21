const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

require('dotenv').config();

//imnport routes
const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')

// app
const app = express();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//app.use(useRoute)
app.use('/api',authRoute)
app.use('/api',userRoute)



//routes
// app.get('/',(req,res)=>{
//     res.send('hii');
// })

const port = process.env.PORT || 3203;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});