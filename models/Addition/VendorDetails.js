
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorDetailsSchema = new Schema({
   VendorDetailsName:{
       type:String,
       required:true
   },
   logo:{
       type:String,
       required:true
   },
   description:{
       type:String,
       default:""
   },
   image:{
       type:String,
       default:""
   },
   date: {
    type: Date,
    default: Date.now
  },
   creationDate: {
    type: Date,
    required:true
  },

});

module.exports = VendorDetails = mongoose.model("myVendorDetails", VendorDetailsSchema);


// /VendorDetails