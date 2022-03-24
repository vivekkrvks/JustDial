const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load Category.js Model
const Category = require("../../../../models/Addition/Category");
const SubCategory = require("../../../../models/Addition/SubCategory");

// @type    get
//@route    /api/v1/other/primaryDdd/get/namelink
// @desc    route to get single category by id
// @access  PRIVATE
router.get(
  "/get/namelink",
//   passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   
    let allCategory = await Category.aggregate([
     
        {$project: { categoryName: 1,link:1}  }
    
        ]).exec()

        res.json(allCategory)

  }
);

// @type    get
//@route    /api/v1/other/primaryDdd/get/:link
// @desc    route to get single category by id
// @access  PRIVATE
router.get(
  "/get/:link",
//   passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let link = req.params.link;

    let allSubCategory = await SubCategory.aggregate([
        {$match: {"category.link": link} },     
        {$project: { subCategoryName: 1,link:1 }  }
    
        ]).exec()

        res.json(allSubCategory)

  }
);
// @type    get
//@route    /api/v1/other/primaryDdd/getServices/:link
// @desc    route to get single category by id
// @access  PRIVATE
router.get(
  "/getServices/:link",
//   passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let link = req.params.link;

    let allservices = await MyServices.aggregate([
        {$match: {"subCategory.link": link} },     
        {$project: { serviceName: 1,link:1 }  }
    
        ]).exec()

        res.json(allservices)

  }
);




module.exports = router;
