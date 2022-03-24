const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load SubCategory.js Model
const SubCategory = require("../../../../models/Addition/SubCategory");

// @type    POST
//@route    /api/v1/addition/subCategory/
// @desc    route for SAVING data for subCategory
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    
    const subCategoryValues = {
      image:{},
      logo:{},
      category:{}
    };
    subCategoryValues.user = req.user.id;
    subCategoryValues.creationDate = new Date();
    subCategoryValues.subCategoryName = req.body.subCategoryName;
//link start

    var strs = req.body.link;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    subCategoryValues.category.categoryName = req.body.category.categoryName;
    subCategoryValues.category.link = req.body.category.link;

    subCategoryValues.link = rests.toLowerCase()
    subCategoryValues.image.url = req.body.imageUrl;
    subCategoryValues.image.publicId = req.body.imageId;
    subCategoryValues.logo.url = req.body.logoUrl;
    subCategoryValues.logo.publicId = req.body.logoId;


if (req.body.description == ""){
  subCategoryValues.description = "";

} else {
  subCategoryValues.description = req.body.description;
  
}
    //getting last voucher number and making new one 

    //Do database stuff
if(
  req.body.subCategoryName == undefined || req.body.subCategoryName == "" ||
  req.body.link == undefined || req.body.link == ""
){

  res.json({
    message: "Title, link are Required field",
    variant: "error"
})

  
    } else {
    
          SubCategory.findOne({
            subCategoryName: subCategoryValues.subCategoryName
          })
            .then(subCategory => {
              //Username already exists
              if (subCategory) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                SubCategory.findOne({
                  link: subCategoryValues.link
                })
                  .then(subCategory => {
                    //Username already exists
                    if (subCategory) {
                      res.json({
                        message: "link Already exist ",
                        variant: "error"
                      });
                    } else {
                      new SubCategory(subCategoryValues)
                      .save()
                      .then(
                        res.json({
                          message: "Successfully saved",
                          variant: "success"
                        })
                      )
                      .catch(err => console.log(err));
                      
                    }})
                    .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));   

    }
    }
);

// @type    GET
//@route    /api/v1/addition/subCategory/allsubCategory
// @desc    route for getting all data from  subCategory
// @access  PRIVATE

router.get(
  "/allsubCategory",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    SubCategory.find({})
      .sort({ date: -1 })
      .then(SubCategory => res.json(SubCategory))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No SubCategory Found", variant: "error" })
      );
  }
);

// @type    get
//@route    /api/v1/addition/subCategory/get/:id
// @desc    route to get single subCategory by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    SubCategory.findOne({
      _id: req.params.id
    }).then(SubCategory => res.json(SubCategory)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/subCategory/:id
// @desc    route to update/edit subCategory
// @access  PRIVATE
async function updateMe(req,res,subCategoryValues){

  SubCategory.findOneAndUpdate(
    { _id: req.params.id },
    { $set: subCategoryValues },
    { new: true }
  )
    .then(subCategory => {
      if (subCategory){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating subCategory value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const subCategoryValues = {    image:{},
    logo:{},
    category:{}
   };
    subCategoryValues.user = req.user.id;
    if(req.body.subCategoryName)subCategoryValues.subCategoryName = req.body.subCategoryName;
   //link start
    if(req.body.link){
      var stru = req.body.link;
      var restu = stru.replace(/  | |   |    |      /gi, function (x) {
        return  "";
      });
      subCategoryValues.link = restu.toLowerCase()
    };

//link end
if( req.body.category.categoryName)subCategoryValues.category.categoryName = req.body.category.categoryName;
if(req.body.category.link)subCategoryValues.category.link = req.body.category.link;
if(req.body.imageUrl)subCategoryValues.image.url = req.body.imageUrl;
if(req.body.imageId)subCategoryValues.image.publicId = req.body.imageId;
if(req.body.logoUrl)subCategoryValues.logo.url = req.body.logoUrl;
if(req.body.logoId)subCategoryValues.logo.publicId = req.body.logoId;
if(req.body.description)subCategoryValues.description = req.body.description;
    SubCategory.findOne({subCategoryName: subCategoryValues.subCategoryName})
          .then(subCategory => {
            if(subCategory){
              caId = subCategory._id;
              if (caId == req.params.id) {
                SubCategory.findOne({link:subCategoryValues.link || "df#$@g#*&"})     
          .then(subCategory => {
            if(subCategory) {
              const catId = subCategory._id;
              if (catId == req.params.id){
                updateMe(req,res,subCategoryValues)
              } else {
res.json({message: "This Link Already Exist", variant: "error"})

              }

            }else{
              updateMe(req,res,subCategoryValues)

            }
          })
          .catch(err => console.log( `error in link matching ${err}`))

              }else {
                  res.json ({message: "This title already exist", variant : "error"})

              }
            } else {

              SubCategory.findOne({link:subCategoryValues.link || "df#$@g#*&"})     
              .then(subCategory => {
                if(subCategory) {
                  const catId = subCategory._id;
                  if (catId == req.params.id){
                    updateMe(req,res,subCategoryValues)
                  } else {
    res.json({message: "This Link Already Exist", variant: "error"})
    
                  }
    
                }else{
                 updateMe(req,res,subCategoryValues)
    
                }
              })
              .catch(err => console.log( `error in link matching ${err}`))

            }
          })
          .catch(err => console.log(`Error in title matching ${err}`))

}
);

///////
// /api/v1/addition/subCategory/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    SubCategory.findOne({ _id: id }).then(catData => {
      if (catData) {
        SubCategory.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "subCategory Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/subCategory/allsubCategory/:searchsubCategory
// @desc    route for searching of subCategory from searchbox using any text
// @access  PRIVATE
router.get(
  "/allsubCategory/:searchsubCategory",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var des = req.user.designation;
    var des1 = "Admin";
    const search = req.params.searchsubCategory;

    if (des == des1   ) {
    if (isNaN(search)) {
      SubCategory.find({
        subCategoryName: new RegExp(search, "i")
      }).then(SubCategory => res.json(SubCategory)).catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }

  }
);


module.exports = router;
