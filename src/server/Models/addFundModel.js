
const mongoose = require("mongoose");
const moment=require('moment')


const Schema = mongoose.Schema;
const addFundSchema = new Schema({

  emailAddress: {
    type: String,
    required: [true, "Email Is Required"],
    
  },
  
 addFund: {
        type: Number,
        required: [true, "Phone-Number Is Required"],
    
      },
 date_of_transaction: {
        type: String,
        default: () => moment().format("LLLL"),
      },
  
 userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
  
});




const AddFund = mongoose.model("add", addFundSchema);

module.exports = AddFund;
