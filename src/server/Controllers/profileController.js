const Profile = require("../Models/profileModel");


const profileController = {};

profileController.create = (req, res) => {
  const body = req.body;
 
  const profile = new Profile(body);
  profile.userId = req.userId;
  console.log(req.profileId)
 profile
    .save()
    .then((profile) => {
      res.json(profile);
      console.log(profile)
    })
    .catch((err) => {
      res.json(err,"something went wrong");
    });
};


profileController.list = (req, res) => {
   
 Profile.find()
    .then((profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.json(err);
    });
};

profileController.update = (req, res) => {
    const id = req.params.id;
    const body=req.body
   Profile.findByIdAndUpdate(id,body,{new:true,runValidators:true})
      .then((profile) => {
        res.json(profile);
      })
      .catch((err) => {
        res.json(err);
      });
  };
profileController.delete = (req, res) => {
    const id = req.params.id;
   Profile.findByIdAndDelete(id)
      .then((profile) => {
        res.json(profile);
      })
      .catch((err) => {
        res.json(err);
      });
  };
module.exports = profileController;
