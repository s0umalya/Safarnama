const express = require("express");
const routing = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userObj = require("../models/user");
const userService = require("../services/userService");
//Register User Route
routing.post("/registerUser", async (req, res, next) => {
  try {
    let userData = new userObj(req.body);

    //To hash a password
    const salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(userData.password, salt);
    userData.password = hash;

    console.log(userData);

    let addedUser = await userService.addUser(userData);
    if (addedUser) {
      let user = {};
      user.firstName = addedUser.firstName;
      user.lastName = addedUser.lastName;
      user.email = addedUser.email;
      user.gender = addedUser.gender;
      user.contactNo = addedUser.contactNo;
      user.dob = addedUser.dob;
      jwt.sign({ user }, "secretkey", { expiresIn: "1d" }, (err, token) => {
        res.status(201).json({
          token,
          user,
        });
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = routing;
