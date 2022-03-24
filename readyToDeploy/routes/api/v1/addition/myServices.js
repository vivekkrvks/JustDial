const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load MyServices.js Model
const MyServices = require("../../../../models/Addition/MyServices");

// @type    POST
//@route    /api/v1/addition/myServices/
// @desc    route for SAVING data for service
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
 
    const serviceValues = {
   
      category:{},
      subCategory:{}
    };
    serviceValues.user = req.user.id;
    serviceValues.creationDate = new Date();
    serviceValues.serviceName = req.body.serviceName;
//link start

    var strs = req.body.link;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    serviceValues.link = rests;

    serviceValues.category.categoryName = req.body.category.categoryName;
    serviceValues.category.link = req.body.category.link;
    serviceValues.subCategory.subCategoryName = req.body.subCategory.subCategoryName;
    serviceValues.subCategory.link = req.body.subCategory.link;


if (req.body.description == ""){
  serviceValues.description = "";

} else {
  serviceValues.description = req.body.description;
  
}
    //getting last voucher number and making new one 

    //Do database stuff
if(
  serviceValues.serviceName == undefined || serviceValues.serviceName == "" ||
  serviceValues.link == undefined || serviceValues.link == ""
){

  res.json({
    message: "Title, link are Required field",
    variant: "error"
})

  
    } else {
    
          MyServices.findOne({
            serviceName: serviceValues.serviceName
          })
            .then(service => {
              //Username already exists
              if (service) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                MyServices.findOne({
                  link: serviceValues.link
                })
                  .then(service => {
                    //Username already exists
                    if (service) {
                      res.json({
                        message: "link Already exist ",
                        variant: "error"
                      });
                    } else {
                      new MyServices(serviceValues)
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
//@route    /api/v1/addition/myService/allservice
// @desc    route for getting all data from  service
// @access  PRIVATE

router.get(
  "/allservice",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    MyServices.find({})
      .sort({ date: -1 })
      .then(MyServices => res.json(MyServices))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No MyServices Found", variant: "error" })
      );
  }
);

// @type    get
//@route    /api/v1/addition/myService/get/:id
// @desc    route to get single service by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    MyServices.findOne({
      _id: req.params.id
    }).then(MyServices => res.json(MyServices)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/myService/:id
// @desc    route to update/edit service
// @access  PRIVATE
async function updateMe(req,res,serviceValues){

  MyServices.findOneAndUpdate(
    { _id: req.params.id },
    { $set: serviceValues },
    { new: true }
  )
    .then(service => {
      if (service){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating service value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const serviceValues = {   
      category:{},
      subCategory:{}
   };
    serviceValues.user = req.user.id;
    if(req.body.serviceName)serviceValues.serviceName = req.body.serviceName;
   //link start
    if(req.body.link){
      var stru = req.body.link;
      var restu = stru.replace(/  | |   |    |      /gi, function (x) {
        return  "";
      });
      serviceValues.link = restu.toLowerCase()
    };

//link end
if( req.body.category.categoryName)serviceValues.category.categoryName = req.body.category.categoryName;
if(req.body.category.link)serviceValues.category.link = req.body.category.link;
if(req.body.subCategory.subCategoryName)serviceValues.subCategory.subCategoryName = req.body.subCategory.subCategoryName;
if(req.body.subCategory.link)serviceValues.subCategory.link = req.body.subCategory.link;  
if(req.body.description)serviceValues.description = req.body.description;
    MyServices.findOne({serviceName: serviceValues.serviceName})
          .then(service => {
            if(service){
              caId = service._id;
              if (caId == req.params.id) {
                MyServices.findOne({link:serviceValues.link || "df#$@g#*&"})     
          .then(service => {
            if(service) {
              const catId = service._id;
              if (catId == req.params.id){
                updateMe(req,res,serviceValues)
              } else {
res.json({message: "This Link Already Exist", variant: "error"})

              }

            }else{
              updateMe(req,res,serviceValues)

            }
          })
          .catch(err => console.log( `error in link matching ${err}`))

              }else {
                  res.json ({message: "This title already exist", variant : "error"})

              }
            } else {

              MyServices.findOne({link:serviceValues.link || "df#$@g#*&"})     
              .then(service => {
                if(service) {
                  const catId = service._id;
                  if (catId == req.params.id){
                    updateMe(req,res,serviceValues)
                  } else {
    res.json({message: "This Link Already Exist", variant: "error"})
    
                  }
    
                }else{
                 updateMe(req,res,serviceValues)
    
                }
              })
              .catch(err => console.log( `error in link matching ${err}`))

            }
          })
          .catch(err => console.log(`Error in title matching ${err}`))

}
);

///////
// /api/v1/addition/myService/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    MyServices.findOne({ _id: id }).then(catData => {
      if (catData) {
        MyServices.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "service Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/myService/allservice/:searchservice
// @desc    route for searching of service from searchbox using any text
// @access  PRIVATE
router.get(
  "/allservice/:searchservice",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var des = req.user.designation;
    var des1 = "Admin";
    const search = req.params.searchservice;

    if (des == des1   ) {
    if (isNaN(search)) {
      MyServices.find({
        serviceName: new RegExp(search, "i")
      }).then(MyServices => res.json(MyServices)).catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }

  }
);


module.exports = router;
