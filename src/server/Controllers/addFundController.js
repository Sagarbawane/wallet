const AddFund = require("../Models/addFundModel");

 


const addFundController = {};
addFundController.list = (req, res) => {
    AddFund.find()
    .then((fund) => {
      res.json(fund);
    })
    .catch((err) => {
      res.json(err);
    });
};

addFundController.create = (req, res) => {
  const body = req.body;

  const addFund = new AddFund(body);
  addFund.userId = req.userId;
  // assigning the user id to the message

  addFund
    .save()
  .then((fund) => {
      res.json(fund);
    })
    .catch((err) => {
      res.json(err);
    });
};





module.exports = addFundController;
