const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const auth = require("../auth");

// register
router.post("/register", (req, res) => {
  userController
    .registerUser(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

// user authentication
router.post("/login", (req, res) => {
  userController
    .loginUser(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

// set user as admin; admin only
router.put("/:userId/setAsAdmin", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin) {
    userController
      .setAdmin(req.params, req.body)
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("Not authorized to set admin");
  }
});

module.exports = router;
