const jwt = require("jsonwebtoken");



const authenticateUser = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.auth;
  console.log(token);
  if (token) {
    let tokenData;
    try {
      tokenData = jwt.verify(token, "app");
      req.userId = tokenData.id;
      next();
    } catch (e) {
      res.status("401").json("YOU SHOULD DO lOGIN fIRST");
    }
  } else {
    res.status("401").json({ error: "token not provided" });
  }
};

module.exports = {
  authenticateUser,
};
