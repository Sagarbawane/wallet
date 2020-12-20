const TransferFund = require("../Models/transferFundModel");

const transferFundController= {};
transferFundController.list = (req, res) => {
    TransferFund.find()
    .then((fund) => {
      res.json(fund);
    })
    .catch((err) => {
      res.json(err);
    });
};

transferFundController.create = (req, res) => {
  const body = req.body;

  const transferFund = new TransferFund(body);
  transferFund.userId = req.userId;
  // assigning the user id to the message

  transferFund
    .save()
    .then((fund) => {
      res.json(fund);
    })
    .catch((err) => {
      res.json(err);
    });
};




module.exports = transferFundController;
