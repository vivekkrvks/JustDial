const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");


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
      
    };
    subCategoryValues.user = req.user.id;
    subCategoryValues.creationDate = new Date();
    subCategoryValues.subCategoryName = req.body.subCategoryName;
    subCategoryValues.categoryName = req.body.categoryName;
//link start

    var strs = req.body.link;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    subCategoryValues.link = rests.toLowerCase()
// link end
if (req.body.image == ""){
  subCategoryValues.image = img.defaultPoster;

} else {
  subCategoryValues.image = req.body.image;
}
if (req.body.logo == "" ){
  subCategoryValues.logo = img.defaultLogo;

} else {
  subCategoryValues.logo = req.body.logo;
}

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
    message: "Title, logo, link are Required field",
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
//@route    /api/v1/addition/subCategory/allsubcategory
// @desc    route for getting all data from  subCategory
// @access  PRIVATE

router.get(
  "/allsubcategory",
 
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
    SubCategory.find({
      _id: req.params.id
    }).then(SubCategory => res.json(SubCategory)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/subCategory/:id
// @desc    route to update/edit subCategory
// @access  PRIVATE
async function updateMe(req,res,subCategoryValues){
  var des = req.user.designation;
 if (des == "Admin" ) {
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
else {

  res.json({ message: "Don't have permission", variant: "error" })
}



}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    let Cat1 = await SubCategory.findOne({ _id: req.params.id}).catch(err =>console.log(err))

let Cour1 = await SubCategory.find({'subCategory.link':Cat1.link}).catch(err => console.log(err))
if (Cour1.length >= 1){
  res.json({ message: "Child Exist", variant: "error" })
}else{
    var des = req.user.designation;
    var des1 = "Admin";
    var des2 = "Manager";
// here we are checking designation in last step, that is in funtion called
   if (des == des1 || des == des2  ) {
    const subCategoryValues = { };

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
    if(req.body.logo)subCategoryValues.logo = req.body.logo;
    if(req.body.description)subCategoryValues.description = req.body.description;
    if(req.body.image)subCategoryValues.image = req.body.image;

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


   

    } else {
      res.json({ message: "You are not Authorised", variant: "error" })
    }
  }}
);


// @type    GET
//@route    /api/v1/addition/subCategory/allsubcategory/:searchcategory
// @desc    route for searching of subCategory from searchbox using any text
// @access  PRIVATE
router.get(
  "/allsubcategory/:searchsubcategory",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var des = req.user.designation;
    var des1 = "Admin";
    const search = req.params.searchsubcategory;

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
