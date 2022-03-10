// const passport = require("passport");
// const GooleStrategy = require("passport-google-oauth20").Strategy;
// const keys = require('../setup/myurl');
// const mongoose = require('mongoose')
// const jsonwt = require("jsonwebtoken");
// const User = require("../models/User")
// var emailKeys = require('./../routes/api/other/Email/emailKeys')
// var welcomeEmail = require('./../routes/api/other/Email/welcomeEmailTemp')

// async function WelcomeEmailfun(user) {

//   const rEmail = user.emailId
//   const name = user.name
//   const username = user.userName

//   const email = (rEmail);
//   filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//   if (filter.test(email)) {
//     // Yay! valid
//     const mailOptions = {
//       from: `"Qualifier.co.in✅" <info@qualifier.co.in>`,
//       "reply-to": "info@qualifier.co.in",
//       to: rEmail,
//       subject: `Thanks for Joining Us With Google😍`,
//       html: `${welcomeEmail.wEmail(name,rEmail,username)}`
//     };
//     emailKeys.ekeys(mailOptions)
    
    
//   }
//   else
//     {   
//      console.log("no email found")
//     } 
// }

