// 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServicesSchema = new Schema({
    serviceName:{
        type:String,
        required:true
    },
     categoryName:{
        type:String,
        required:true
    },
    subCategoryName:{
       type:String,
       required:true
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

module.exports = Services = mongoose.model("myServices", ServicesSchema);


// /Services