const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.registerUser = (reqBody) => {
  let newUser = new User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    email: reqBody.email,
    password: bcrypt.hashSync(reqBody.password, 11),
  });
  return newUser.save().then((user, err) => {
    if (err) {
      console.log(err);
    } else {
      return `${newUser.firstName} is now registered`;
    }
  });
};

module.exports.loginUser = (reqBody) => {
  return User.findOne({ email: reqBody.email }).then((result) => {
    if (result == null) {
      return "User not found";
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        reqBody.password,
        result.password
      );
      if (isPasswordCorrect) {
        return { access: auth.createAccessToken(result) };
      } else {
        return "Invalid Password";
      }
    }
  });
};
