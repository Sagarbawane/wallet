
const mongoose = require("mongoose");
const moment=require('moment')




const Schema = mongoose.Schema;
const transferFundSchema = new Schema({

  emailAddress: {
    type: String,
    required: [true, "Email Is Required"],
    
  },
  
    transferFund: {
        type: Number,
        required: [true, "Amount is Required"],
    
      },
      phoneNumber: {
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




const TransferFund = mongoose.model("transfer", transferFundSchema);

module.exports = TransferFund;