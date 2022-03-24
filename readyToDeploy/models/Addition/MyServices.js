// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyServicesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
      serviceName:{
       type:String,
       required:true
   },
   link:{
    type:String,
    required:true
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

  
  
   description:{
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

module.exports = MyServices = mongoose.model("myMyServices", MyServicesSchema);


// /category