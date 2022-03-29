// THis is eith One

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
    state: {
        type: String,
        required: true
    },    
    districtName: {
    type: String,
    required: true
},    
tahsilBlock: {
    type: String,
    required: true
}, 
village: {
    type: String,
    required: true
},
designation: {
    type:String,
    required:true
}

});

module.exports = Location = mongoose.model("myLocation", LocationSchema);


// /cscLocator