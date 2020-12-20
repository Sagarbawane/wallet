
const mongoose = require("mongoose");
const validator = require("validator");

const isAlpha = require("validator/lib/isAlpha");
const isAlphanumeric = require("validator/lib/isAlphanumeric");
const isEmail = require("validator/lib/isEmail");

const Schema = mongoose.Schema;
const profileSchema = new Schema({
  firstName: {
    type: String,

    validate: {
      validator: function (value) {
        return validator.isAlpha(value, ["en-US"]);
      },
      message: function () {
        return "invalide First Name";
      },
    },
  },
  lastName: {
    type: String,
  
    validate: {
      validator: function (value) {
        return validator.isAlpha(value, ["en-US"]);
      },
      message: function () {
        return "invalide Last Name";
      },
    },
  },
  emailAddress: {
    type: String,
  
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "invalide Emai Address";
      },
    },
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone-Number Is Required"],

  },
  state:{
    type: String,
    required: [true, "State Is Required"],
   
  },
  city:{
    type: String,
    required: [true, "city Is Required"],
    
  },
  country:{
    type: String,
    required: [true, "country Is Required"],
   
  },
  pincode:{
    type: Number,
    required: [true, "Pincode Is Required"],
   
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  
 
 
});



const Profile= mongoose.model("profile", profileSchema);

module.exports = Profile;
