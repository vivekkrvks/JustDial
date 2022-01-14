const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  name: {
    type: String,
    default:""
  },
  emailId: {
    type: String,
    default:""
  },
  emailVerified:{
    type:Boolean,
    default: false
  },

  password: {
    type: String,
    default:"createYourPassword"
  },
  
  mobileNo: {
    type: String,
    required:true
  },
  mobileVerified:{
    type:Boolean,
    default:false
  },
  userName: {
    type: String,
    default:""
  },
  // distributor
  designation: {
    type: String,
    default: "user"
  },
  userImage: {
    type: String,
    default:""
  },

language:{
  type:String,
  default:"english"
},
////

gender: {
  type: String,
  default:""
},

  date: {
    type: Date,
    default: Date.now
  },
  value: {
    type: String,
    default:"createYourPassword"
  },
});

module.exports = User = mongoose.model("myUser", UserSchema);




