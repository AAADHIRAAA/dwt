const express = require('express');
const cors = require('cors');

const connectDB = require('./connection');

const dotenv = require('dotenv');
dotenv.config({ path: './.env.example' });
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const ejs = require('ejs');
const path=require('path');

const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');


const app = express();
const PORT = 5200; // Set your desired port number
connectDB()
  .then(() => {
    // Set up your middleware, routes, and other server configurations here
    const bookRouter = require('./routes/bookRouter');
    const userRouter = require('./routes/userRouter');




/*--------------------app usage and set------------------ */


app.use(cors()); 


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());



const limit = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 60,
  message: 'Too many request with this IP Address..Try again in 1 hour'
});

app.use('/api/v1/users',userRouter);
app.use('/api/v1/books',bookRouter);


/*---------------------------routing-------------------------- */


  // Start the server
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


