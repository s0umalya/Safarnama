const mongoose = require("mongoose");
const { Schema } = require("mongoose");
mongoose.Promise = global.Promise;

const db_url = "mongodb://127.0.0.1:27017/safarnama";

const UserSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email Id is required"],
      unique: [true, "Email Id should be unique"],
    },
    gender: {
      type: String,
      //enum is used to specify the set of values which the field can have
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender can be either male or female or other",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    contactNo: {
      type: Number,
      required: [true, "Contact number is required"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

let connection = {};

connection.getUserCollection = async () => {
  //establish connection and return model as Promise
  try {
    let conn = await mongoose.connect(db_url);
    return conn.model("users", UserSchema);
  } catch (err) {
    throw new Error("Connection to User database could not be established");
  }
};

module.exports = connection;
