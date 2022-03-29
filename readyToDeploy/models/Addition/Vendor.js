
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
    link:{
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
   contactNo:{
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
    categoryName:{
        type:String,
     //    required:true
    },
    link:{
         type:String,
         // required:true
    }
 
 },
subCategory:{
 subCategoryName:{
        type:String,
     //    required:true
    },
    link:{
         type:String,
         // required:true
    }
 
 },
 myServices:{
    serviceName:{
        type:String,
     //    required:true
    },
    link:{
         type:String,
         // required:true
    }
   },
   yearEstablished:{
    type:String,
    default:""
},
   modesofPayment:{
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

module.exports = Vendor = mongoose.model("myVendor", VendorSchema);


// /Vendor