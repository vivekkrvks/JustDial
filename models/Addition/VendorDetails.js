
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorDetailsSchema = new Schema({
    house:{
       type:String,
       default:""
   },
    state:{
       type:String,
       default:""
   },
    district:{
       type:String,
       default:""
   },
    city:{
       type:String,
       default:""
   },
    area:{
       type:String,
       default:""
   },
    pincode:{
       type:String,
       default:""
   },
    landmark:{
       type:String,
       default:""
   },
   registrationNo:{
       type:String,
       default:""
   },
   receiptNo:{
       type:String,
       default:""
   },
   contactPersonName:{
       type:String,
       default:""
   },
   ContactNo:{
       type:String,
       default:""
   },
   businessName:{
       type:String,
       default:""
   },
   emailId:{
       type:String,
       default:""
   },
   website:{
       type:String,
       default:""
   },
   category:{
       type:String,
       default:""
   },
   subcategory:{
       type:String,
       default:""
   },
   services:{
       type:String,
       default:""
   },
   description:{
       type:String,
       default:""
   },
   modsofPayment:{
       type:String,
       default:""
   },
   yearEstablished:{
       type:String,
       default:""
   },
   // to be auto detucted
   latitude:{
       type:String,
       default:""
   },
   longitude:{
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