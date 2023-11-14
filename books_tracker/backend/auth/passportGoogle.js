// const passport = require("passport");
// const dotenv = require('dotenv');
// dotenv.config({ path: '../.env.example' });
// const express = require("express");
// const router = express.Router();
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require( "../models/userModel");
// const middleware = require("../middleware/auth");
// const mongoose = require('mongoose');



// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/callback",
      
//       scope:["profile","email"],
      
//     },
//     async function(_req, _accessToken, _refreshToken, profile, done){
     
//       console.log(profile);
//       const defaultUser = {
//         fullName: `${profile.name.givenName} ${profile.name.familyName}`,
//         email: profile.emails[0].value,
//         picture: profile.photos[0].value,
//         googleId: profile.id,
//       };
//       console.log(defaultUser.email, defaultUser.fullName);
//       try {
//         // Find or create user using Mongoose
//         const user = await User.findOneAndUpdate(
//           { googleId: profile.id },
//           { $setOnInsert: defaultUser },
//           { new: true, upsert: true }
//         );

//         done(null, user);
//       } catch (err) {
//         console.log("Error signing up", err);
//         done(err, null);
//       }
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user._id); // Store user ID in session
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user); // Retrieve user from MongoDB using the stored ID
//   });

// });




// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureMessage: "Cannot login to Google, please try again later!",
//     failureRedirect: "http://localhost:3000/login",
//     successRedirect: "http://localhost:3000/dashboard",
//   }),
//   // (req, res) => {
//   //   console.log("User: ", req.user);
//   //   res.send("Thank you for signing in!");
//   // }
// );

// router.get("/logout",(req,res)=>{
//   req.logout();
//   res.redirect('/');
// });

// module.exports = router;

