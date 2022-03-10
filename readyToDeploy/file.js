// Requiring the module
const reader = require('xlsx')

var express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
// const file = reader.readFile('./../../myLocation.csv')
// const file1 = require('./../../myLocation.csv')

// Reading our test file
// const file = reader.readFile('./test.xlsx')
// /api/file/upload
// app.post("/upload", function(req, res, next) {
    // const file = req.files.photo;
    const file = reader.readFile('./myLocation.csv')
    let data = []

    const sheets = file.SheetNames
    // const sheets = file.tempFilePath
    
    for(let i = 0; i < sheets.length; i++)
    {
    const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
        data.push(res)
    })
    }
    
    // Printing data
    console.log(data)


//   });


// const file = req.files.photo;

// let data = []

// const sheets = file.SheetNames

// for(let i = 0; i < sheets.length; i++)
// {
// const temp = reader.utils.sheet_to_json(
// 		file.Sheets[file.SheetNames[i]])
// temp.forEach((res) => {
// 	data.push(res)
// })
// }

// // Printing data
// console.log(data)

// module.exports = app;