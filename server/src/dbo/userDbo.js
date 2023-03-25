const fs = require("fs");
let conn = require("../utilities/connection");
let userDbo = {};
let bcrypt = require("bcryptjs");

userDbo.addUser = async (userdata) => {
  let userModel = await conn.getUserCollection();
  let addedUser = await userModel.create(userdata);
  if (addedUser) {
    return addedUser;
  } else {
    return null;
  }
};

module.exports = userDbo;
