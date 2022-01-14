// 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
   subCategoryName:{
       type:String,
       required:true
   },
   categoryName:{
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

module.exports = SubCategory = mongoose.model("mySubCategory", SubCategorySchema);


// /SubCategory