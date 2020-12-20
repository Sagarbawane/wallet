const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
 

sgMail.setApiKey('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');

const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err,"something went wrong");
    });
};

userController.login = (req, res) => {
  const body = req.body;

  User.findOne({ emailAddress: body.emailAddress })

    .then((user) => {
      console.log(user);
      if (user) {
        console.log(body.password);
        console.log(user.password);
        bcryptjs.compare(body.password, user.password).then((result) => {
          console.log(result);
          if (result) {
            const tokenData = {
              id: user._id,
            };
            const token = jwt.sign(tokenData, "app", {
              expiresIn: "1d",
            });
            res.json({
              token: token,
            });
            console.log(token);
          } else {
            res.json({ errors: "Invalid UserName Or Password" });
          }
        });
      } else {
        res.json({ errors: "Invali UserName Or Password" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
userController.account = (req, res) => {
  const id = req.userId;
  User.findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};
userController.logout = (req, res) => {
  console.log(req);
  const { user, token } = req;
  User.findByIdAndUpdate(req.userId, { $pull: { tokens: { token: token } } })
    .then(function () {
      res.send({ notice: "successfully logged out" });
    })
    .catch(function (err) {
      res.send(err);
    });
};
userController.update = (req, res) => {
    const id = req.params.id;
    const body=req.body
    User.findByIdAndUpdate(id,body,{new:true,runValidators:true})
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  };
userController.delete = (req, res) => {
  const id = req.params.id;
    User.findByIdAndDelete(id)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  };
  userController.sms=( function (req, res) {
    const { recipient,text } = req.body; 
    console.log(recipient)

    //Sendgrid Data Requirements
    const msg = {
        to: recipient, 
        cc:"sagarbawane720@gmail.com",
        from: 'sagarbawane720@gmail.com',
        subject: "regarding money transactions",
        text: text,
    }

    //Send Email
    sgMail.send(msg)
    .then((msg) => res.send(msg.body));

  });
module.exports = userController;
