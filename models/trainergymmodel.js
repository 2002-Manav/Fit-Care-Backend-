//trainer name /email/  age / phine no / descripton/ qualification/ password/ address/city/ state / gender/
const mon = require("mongoose");
const trainergym = mon.Schema({
  GymId: {
    type: mon.Schema.Types.ObjectId,
  },
  Trainername: {
    type: String,
    required: true,
    unique: true,
  },
  Age: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  PhoneNo: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Weight: {
    type: Number,
    required: true,
  },
  Height: {
    type: Number,
    required: true,
  },
  Qualification: {
    type: String,
    required: true,
  },
  Specialization: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Experience: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
});

module.exports = mon.model("gymtrainerside", trainergym);
