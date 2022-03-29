//
const express = require("express");
const router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');


const Location = require("../../../models/Location/Location");

// /api/location/editLocation/replaceScheme

router.get('/replaceScheme',
 async(req,res) => {
    console.log("Started")
 let U1 = await Location.aggregate([
        {$match: {schemeName:" PMFBY "}},
        {$project:{schemeName:1}}
    ]).exec()

let x = 0 
let myValue = {
    schemeName: "PMFBY"
}
console.log(U1.length)
while(x<U1.length){

   await Location.findOneAndUpdate(
        {schemeName:" PMFBY "},
        { $set: myValue },
        { new: true }
      ).then(console.log("updated one " + x))
      .catch(err => console.log(err))
      x++
}

res.json('done')

}
)

router.get('/deleteAField',(req,res) => {


})
module.exports = router;