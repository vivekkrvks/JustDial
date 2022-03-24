var express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
// var fileupload = require("express-fileupload");

var cloudinary = require("cloudinary").v2;

///////////////////////////////////////////////////////////
// Adding photot to specefic folder

// // @type    POST
// //@route    /api/v1/other/fileupload/mainfolder/:folderName
// // @desc    route for SAVING data for chapter
// // @access  PRIVATE
app.post("/mainfolder/:folderName", function(req, res, next) {
  // console.log(req.files.photo);
  const file = req.files.photo;
 const folderName = req.params.folderName;
  cloudinary.uploader.upload(file.tempFilePath,{ public_id: `${folderName}/${file.md5}`,
  overwrite: false},  function(err, result) {
    if(err){console.log(err)}
    res.json({ result });
  });
});
 // /api/v1/other/fileupload/delete
app.post("/delete", function(req, res, next) {
  console.log(req.body)
  const id = req.body.id;
  // console.log(id)
 
  cloudinary.uploader.destroy(id, function(error,result)  { 
    console.log({error,result})
    if(result){
      if(result.result== "ok" || result.result== "not found"){
        res.json({ message: "Deleted Succesfully ",
        variant: "success" });
      } else {
        res.json({ message: "Deleted Failed ",
        variant: "error" });
      }
    } else {
      res.json({ message: "Deleted Failed no reason",
      variant: "error" });
    }

       

  });

});


module.exports = app;
