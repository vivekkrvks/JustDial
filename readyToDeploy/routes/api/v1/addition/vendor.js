const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load Vendor.js Model
const Vendor = require("../../../../models/Addition/Vendor");

// @type    POST
//@route    /api/v1/addition/vendor/
// @desc    route for SAVING data for service
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const serviceValues = {
   
      category:{},
      subCategory:{},
      myServices:{},
    };
    serviceValues.user = req.user.id;
    serviceValues.creationDate = new Date();
    
//link start

    var strs = req.body.link;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    serviceValues.link = rests;
//link end
    // serviceValues.state = req.body.state;
    // serviceValues.district = req.body.district;
    // serviceValues.city = req.body.city;
    // serviceValues.area = req.body.area;
    serviceValues.pincode = req.body.pincode;
    serviceValues.landmark = req.body.landmark;
    serviceValues.registrationNo = req.body.registrationNo;
    serviceValues.receiptNo = req.body.receiptNo;
    serviceValues.contactPersonName = req.body.contactPersonName;
    serviceValues.contactNo = req.body.contactNo;
    serviceValues.businessName = req.body.businessName;
    serviceValues.emailId = req.body.emailId;
    serviceValues.website = req.body.website;
    serviceValues.latitude = req.body.latitude;
    serviceValues.longitude = req.body.longitude;

    serviceValues.category.categoryName = req.body.category.categoryName;
    serviceValues.category.link = req.body.category.link;
    serviceValues.subCategory.subCategoryName = req.body.subCategory.subCategoryName;
    serviceValues.subCategory.link = req.body.subCategory.link;
    serviceValues.myServices.serviceName = req.body.myServices.serviceName;
    serviceValues.myServices.link = req.body.myServices.link;


if (req.body.description == ""){
  serviceValues.description = "";

} else {
  serviceValues.description = req.body.description;
  
}
    //getting last voucher number and making new one 

    //Do database stuff
if(
  serviceValues.businessName == undefined || serviceValues.businessName == "" ||
  serviceValues.link == undefined || serviceValues.link == ""
){

  res.json({
    message: "businessName, link are Required field",
    variant: "error"
})

  
    } else {
    
          Vendor.findOne({
            emailId: serviceValues.emailId
          })
            .then(service => {
              //Username already exists
              if (service) {
                res.json({
                  message: "emailId Already exist ",
                  variant: "error"
                });
              } else {
                Vendor.findOne({
                    contactNo: serviceValues.contactNo
                })
                  .then(service => {
                    //Username already exists
                    if (service) {
                      res.json({
                        message: "contactNo Already exist ",
                        variant: "error"
                      });
                    } else {

                       Vendor.findOne({
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
                        
                      new Vendor(serviceValues)
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
    Vendor.find({})
      .sort({ date: -1 })
      .then(Vendor => res.json(Vendor))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No Vendor Found", variant: "error" })
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
    Vendor.findOne({
      _id: req.params.id
    }).then(Vendor => res.json(Vendor)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/myService/:id
// @desc    route to update/edit service
// @access  PRIVATE
async function updateMe(req,res,serviceValues){

  Vendor.findOneAndUpdate(
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
    Vendor.findOne({serviceName: serviceValues.serviceName})
          .then(service => {
            if(service){
              caId = service._id;
              if (caId == req.params.id) {
                Vendor.findOne({link:serviceValues.link || "df#$@g#*&"})     
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

              Vendor.findOne({link:serviceValues.link || "df#$@g#*&"})     
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
    Vendor.findOne({ _id: id }).then(catData => {
      if (catData) {
        Vendor.findOneAndDelete({ _id: id })
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
      Vendor.find({
        serviceName: new RegExp(search, "i")
      }).then(Vendor => res.json(Vendor)).catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }

  }
);


module.exports = router;
