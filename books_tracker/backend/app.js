const express = require('express');
const cors = require('cors');
const passport = require("passport");
const connectDB = require('./connection');

const dotenv = require('dotenv');
dotenv.config({ path: './.env.example' });
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const ejs = require('ejs');
const path=require('path');
// const {WorkOS} = require('@workos-inc/node');
// const workos = new WorkOS(process.env.WORKOS_API_KEY);
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');


const app = express();
const PORT = 5000; // Set your desired port number
connectDB()
  .then(() => {
    // Set up your middleware, routes, and other server configurations here
    const bookRouter = require('./routes/bookRouter');
    const userRouter = require('./routes/userRouter');


const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require( "./models/userModel");

const MongoStore = require('connect-mongo')(session);

/*--------------------app usage and set------------------ */
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.json({message:"Something went Wrong"});
// }

app.use(cors()); 


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      maxAge: 8600000, 
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  
  done(null, user._id); // Store user ID in session
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user); // User found, pass it to the done callback
    })
    .catch(err => {
      done(err, null); // Error occurred, pass it to the done callback
    });

});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback:true,
      scope:["profile","email"],
      
    },
    async function(_req, _accessToken, _refreshToken, profile, done){
     
      try {
        let user = await User.findOne({ googleId: profile.id });
    
        if (user) {
          // User already exists, return the user
          return done(null, user);
        }
    
        // User doesn't exist, create a new user
        user = new User({
          fullName: profile.displayName,
          email: profile.emails[0].value, // Assuming the user has at least one email
          googleId: profile.id,
          picture: profile.photos[0].value, // Assuming the user has at least one photo
        });
        
        await user.save();
       
        _req.login(user, function (err) {
          if (err) {
            return done(err, null);
          }
        return done(null, user);
      });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);



app.get("/auth/google", passport.authenticate("google", ["profile","email"]));


// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureMessage: "Cannot login to Google, please try again later!",
//     failureRedirect: "/failed",
//     successRedirect: "/dashboard",
//   }),

// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google"),(req,res)=>{
//     console.log(req.user);
   
//     res.redirect("/dashboard");
//     // res.send(req.user);
//   }),

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    req.session.user = req.user;
    
    next();
  },
  (req, res) => {
    console.log(req.user);

    res.redirect("/dashboard");
    
  }
);

app.get('/failed',  (req, res) => {
  res.redirect("http://localhost:3000/login");
 
});

// app.use((req, res, next) => {
//   console.log('Authentication status:', req.isAuthenticated());
//   next();
// });

// Protect a route that requires authentication
app.get('/dashboard',  (req, res) => {
  console.log(req.user);
  res.redirect("http://localhost:3000/dashboard");
  // res.json({ message: 'Authenticated', user: req.user });
  // res.send("You are logged in " + req.user);
});

app.get("/logout",(req,res)=>{
  // Perform any additional cleanup or logging out logic if needed
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    // Redirect to the home page or any other desired page after logout
    // res.json({ message: 'Logged out' });
    res.redirect('http://localhost:3000');
  });
    
});



const limit = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 60,
  message: 'Too many request with this IP Address..Try again in 1 hour'
});
// const api = require('./api');

// app.use('/dwt', limit);
// app.use('/api/v1',api);
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


