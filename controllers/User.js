const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// register
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
      return `${newUser.firstName} ${newUser.lastName} is now registered`;
    }
  });
};

// user authentication
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

// set user as admin; admin only
module.exports.setAdmin = (reqParams, reqBody) => {
  return User.findByIdAndUpdate(reqParams.userId).then((result) => {
    result.isAdmin = reqBody.isAdmin;
    return result.save().then((newAdmin, err) => {
      if (err) {
        console.log(err);
      } else {
        return `${result.firstName} ${result.lastName} has been successfully set as an admin.`;
      }
    });
  });
};
