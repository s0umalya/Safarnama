let userDbo = require("../dbo/userDbo");
let service = {};

service.addUser = async (userdata) => {
  let addedUser = await userDbo.addUser(userdata);
  if (addedUser) {
    return addedUser;
  } else {
    let err = new Error("User Registration Failed");
    err.status = 500;
    throw err;
  }
};

module.exports = service;
