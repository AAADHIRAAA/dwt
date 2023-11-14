const express = require("express");
const passport = require("passport");


const router = express.Router();


router.get("/auth/google", passport.authenticate("google", ["profile","email"]));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000/dashboard",
  }),

);

router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;