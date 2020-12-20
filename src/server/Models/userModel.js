const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");


const isEmail = require("validator/lib/isEmail");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  
 
  emailAddress: {
    type: String,
    required: [true, "Email Is Required"],
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "invalide Email Address";
      },
    },
  },
  
  
  password: {
    type: String,
    required: [true, "Password Is Required"],
    minlength: 8,
    maxlength: 120,
   
  },
 
 
});



userSchema.pre("save", function (next) {
  const user = this;
  bcryptjs.genSalt().then((salt) => {
    bcryptjs.hash(user.password, salt).then((encryptpassword) => {
      user.password = encryptpassword;
     
      next();
    });
  });
});
const User = mongoose.model("user", userSchema);

module.exports = User;
