//
const express = require("express");
const router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');

const Location = require("../../../models/Location/Location");

// /api/location/getLocation/schemeName

router.get('/schemeName',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    let U1 = await Location.aggregate([
        {$match: {} },
        { $group : { _id : "$schemeName" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  
        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)
// /api/location/getLocation/seasonName

router.post('/seasonName',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    let schemeName = req.body.schemeName


    let U1 = await Location.aggregate([
        {$match: {schemeName:schemeName} },
        { $group : { _id : "$seasonName" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)

// state
// /api/location/getLocation/state
router.post('/state',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
        let seasonName = req.body.seasonName
        let schemeName = req.body.schemeName

    let U1 = await Location.aggregate([
        {$match: {seasonName:seasonName,schemeName:schemeName} },
        { $group : { _id : "$state" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)
// districtName
// /api/location/getLocation/districtName
router.post('/districtName',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
        let seasonName = req.body.seasonName
        let state = req.body.state
        let schemeName = req.body.schemeName

    let U1 = await Location.aggregate([
        {$match: {seasonName:seasonName,state:state,schemeName:schemeName} },
        { $group : { _id : "$districtName" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)
// tahsilBlock
// /api/location/getLocation/tahsilBlock
router.post('/tahsilBlock',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    let seasonName = req.body.seasonName
    let state = req.body.state
    let districtName = req.body.districtName
    let schemeName = req.body.schemeName

    let U1 = await Location.aggregate([
        {$match: {seasonName:seasonName,state:state,districtName:districtName,schemeName:schemeName} },
        { $group : { _id : "$tahsilBlock" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)

// gramPanchayat
// /api/location/getLocation/gramPanchayat
router.post('/gramPanchayat',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    let seasonName = req.body.seasonName
    let state = req.body.state
    let districtName = req.body.districtName
    let tahsilBlock = req.body.tahsilBlock
    let schemeName = req.body.schemeName

    let U1 = await Location.aggregate([
        {$match: {
            seasonName:seasonName,
            state:state,
            districtName:districtName,
            tahsilBlock:tahsilBlock,schemeName:schemeName
        } },
        { $group : { _id : "$gramPanchayat" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)
// village
// /api/location/getLocation/village
router.post('/village',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    let seasonName = req.body.seasonName
    let state = req.body.state
    let districtName = req.body.districtName
    let tahsilBlock = req.body.tahsilBlock
    let schemeName = req.body.schemeName
    let gramPanchayat = req.body.gramPanchayat

    let U1 = await Location.aggregate([
        {$match: {
            seasonName:seasonName,
            state:state,
            districtName:districtName,
            tahsilBlock:tahsilBlock,schemeName:schemeName,
            gramPanchayat:gramPanchayat,
            
        } },
        { $group : { _id : "$village" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)

// nayaPanchayat
// /api/location/getLocation/nayaPanchayat
router.post('/nayaPanchayat',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    let seasonName = req.body.seasonName
    let state = req.body.state
    let districtName = req.body.districtName
    let tahsilBlock = req.body.tahsilBlock
    let gramPanchayat = req.body.gramPanchayat
    let village = req.body.village
    let schemeName = req.body.schemeName

    let U1 = await Location.aggregate([
        {$match: {
            seasonName:seasonName,
            state:state,
            districtName:districtName,
            tahsilBlock:tahsilBlock,
            gramPanchayat:gramPanchayat,
            village:village,schemeName:schemeName
        } },
        { $group : { _id : "$nayaPanchayat" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = ""
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data = U2
            x++
        }
        res.json(data)

}
)
// cropName
// /api/location/getLocation/cropName
router.post('/cropName',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    let seasonName = req.body.seasonName
    let state = req.body.state
    let districtName = req.body.districtName
    let tahsilBlock = req.body.tahsilBlock
    let gramPanchayat = req.body.gramPanchayat
    let village = req.body.village
    let schemeName = req.body.schemeName

    let U1 = await Location.aggregate([
        {$match: {
            seasonName:seasonName,
            state:state,
            districtName:districtName,
            tahsilBlock:tahsilBlock,
            gramPanchayat:gramPanchayat,
            village:village,schemeName:schemeName
        } },
        { $group : { _id : "$cropName" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)
module.exports = router;