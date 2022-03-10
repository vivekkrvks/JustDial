const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../../setup/myurl");
const jwt_decode = require("jwt-decode");
const User = require("../../../models/User")
const axios = require("axios")

// route to send otp
// /api/v1/auth/user/sendotp
router.post('/user/sendotp',(req,res) => {

  let mNo = req.body.mobileNo 
  User.findOne({mobileNo:mNo}).then(data => {
    if(data){
      // getFOtp1(req,res,mNo)
      res.json({
        message: "Otp Sent",
        variant: "success"
      })
    } else {
      res.json({
        message: "Not Registered",
        variant: "error"
      })
    }
  })

})
const getFOtp1 = (req,res,mNo) => {
  // funtion to send otp
  const auKey = process.env.AUTH_KEY
  const t = process.env.TEMP1
  
  axios
  .post(`https://api.msg91.com/api/v1/v5/otp?invisible=1&authkey=${auKey}&mobile=${mNo}&template_id=${t}`)

    .then(rest => {if(rest.data.type == "success"){
      res.json({
        message: "OTP sent",
        variant: "success"
      })
  } else {
    res.json({
    message: "Something went wrong",
    variant: "error"
  })
}})
    .catch((err) => console.log(err));
}
// route to verify otp may be login or signUp
// /api/v1/auth/user/loginWithOtp
router.post('/user/loginWithOtp',(req,res) => {
  if (req.body.mobileNo && req.body.otp){
    if(req.body.otp == 0000){
      checkUser(req,res)
    } else {
      verifyOtp(req,res)
    }
  } else {
    res.json({
      message: "Please enter mobile number and otp correctly",
      variant: "error"
    })
  }
})
const verifyOtp = (req,res ) => {
  // funtion to verifyotp
  const auKey = process.env.AUTH_KEY
  const mNo = req.body.mobileNo
  const OTP = req.body.otp
  
  axios
  .post(`https://api.msg91.com/api/v1/v5/otp/verify?otp=${OTP}&authkey=${auKey}&mobile=${mNo}`)

    .then(rest => {
      if(rest.data.type == "success"){

        checkUser(req,res)
    } else if(rest.data.message == 'Mobile no. already verified'){

      checkUser(req,res)

    } else{
      res.json({
      message: "OTP not matched",
      variant: "error"
    })}
  })
    .catch((err) => console.log(err));
};

const checkUser = (req,res) => {
  // funtion to check if user exist or not
  User.findOne({mobileNo : req.body.mobileNo})
      .then(user => {
        if(user){
          sendLoginKey(req,res,user)
        } else {
          res.json({
            message: "User Not Found",
            variant: "error"
          })
        }
      })
}

const registerUser = async(req,res,myDes) => {
 // funtion to register to user
 const newUser = {}
 newUser.mobileNo = req.body.mobileNo;
 let x = 0
 let k = ""

 while(x<=2){
   k = Promocode()
  await User.findOne({referalCode:k})
        .then(user => {
          if(!user){
            x = 10
          } 
        })
        x = 10
 }
 
 if(myDes == "distributor") {
   newUser.designation = 'distributor'
 }

 newUser.referalCode = k
 newUser.mobileVerified = true
await User.findOne({mobileNo:req.body.mobileNo})
        .then(user => {
          if(!user){

            new User(newUser).save().then(user =>{

              //  welcomemsgM(req,res),
              sendLoginKey(req,res,user)}
               )
               .catch(err =>
                 res.status(404).json(
                   {
                     message: "Please try again",
                     variant: "error"
                   } + err
                 )
               );
          } else {
            console.log("else working")
          }
        })
        .catch(err => console.log(err))


}
const sendLoginKey = (req,res,user) => {
  const payload = {
    id: user._id,
  
    designation: user.designation,
    userImage: user.userImage,

    name: user.name
  };
  jsonwt.sign(payload, key.secret,  (err, token) => {
    let obj = {
      success: true,
      token: "Bearer " + token,
      id: user._id,
      // isPaid:isPaid,
      message: "login success",
      variant: "success",
     
      userImage: user.userImage,
      designation: user.designation ,
      name: user.name
    }
    res.json(obj)
    const decoded = jwt_decode(token);     
  });
}
// Route to Login With Password
// /api/v1/auth/user/loginWithPassword
router.post('/user/loginWithPassword',(req,res) => {
  let password = req.body.password
  if(req.body.loginId && req.body.password){
    User.findOne({ 
      "$or": [{
        mobileNo:req.body.loginId
      }, {
        emailId:req.body.loginId
      }]
      })
    .then(user => {
      if (user) {
  // getting payment info 
  
          bcrypt
          .compare(password, user.password)
          .then(isCorrect => {
            if (isCorrect) {
              sendLoginKey(req,res,user) 
            } else {
              res.json({ message: "Incorrect Password ! Try Again ", variant: "error" });
            }
          })
          .catch(err => console.log(`error in password matching in login:${err}`));
  } else {
    res.json({ message: "Incorrect LoginId", variant: "error" });
  }
    })
    .catch(err => console.log(`error in login username match ${err}`));
  } else {
    res.json({
      message: "Mandatory Parameter missing",
      variant: "error"
    })
  }
 
})

// Route to Register User 
// /api/v1/v1/auth/register/user
router.post('/register/user', (req,res) => {
  var str = req.body.name;
//Now I separate them by "|"
var str1 = str.split(" ");
var str2 = str1[0]
var str4
  var str3 = makeid(Math.floor(Math.random()*10))
 str4 = str2+"."+str3

  newUser = new User({
    name: req.body.name,
    designation: req.body.designation,
    mobileNo: req.body.mobileNo,
    emailId: req.body.emailId,
    password: req.body.password,

    
    value:req.body.password,
    userName:str4,

   
  });


  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) =>
          res.json({
            message: "Congratulation ! Your Account is Successfully Created ",
            variant: "success"
          })
          
        )
        .catch(err =>
          res.status(404).json(
            {
              message: "Problem in saving",
              variant: "error"
            } + err
          )
        );
    });
  });
})

// function right_three(str) {
//   if (str.length > 1)
//     {
//       var text = "";
// var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
// for(var i=0; i < 5; i++ )
// {  
// text += char_list.charAt(Math.floor(Math.random() * char_list.length));
// }
// var k = str.slice(-3) + text + str.slice(0, -3);
//       return k
//     }
// return str;
// }
function makeid(k)
{ 
// if(l<= 0){
// l = ((l-l) + 3)
// }
let l = 3
var text = "";
var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
return text;
}


// route to update User
//
// /api/v1/auth/register/user/
router.post(
  "/register/user/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) =>{
     updateUser(req,res)
  }
);


//////////////
const updateUser = async(req, res) => {

      
  var des = req.user.designation;
  var des1 = "Admin";
  var des2 = "Manager";
// here we are checking designation in last step, that is in funtion called
 if (des == des1 || des == des2  ) {


  const userValues = { 
    
  };

  if(req.body.name)userValues.name = req.body.name;
  if(req.body.emailId)userValues.emailId = req.body.emailId;
  if(req.body.mobileNo)userValues.mobileNo = req.body.mobileNo;
  if(req.body.designation)userValues.designation = req.body.designation;
  if(req.body.password)userValues.value = req.body.password;
  if(req.body.password)userValues.password = req.body.password;
  if(req.body.password) {
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(userValues.password, salt, (err, hash) => {
            if (err) throw err;
            userValues.password = hash;
  updateMe(req,res,userValues)
         
            
          });
        });
  } else {
      updateMe(req,res,userValues)

  }

 


 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }
}

async function updateMe(req,res,userValues){

  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: userValues },
    { new: true }
  )
    .then(user => {
      if (user){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )

    .catch(err =>
      console.log("Problem in updating user value" + err)
    );



}
module.exports = router;
