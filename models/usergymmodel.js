const { default: mongoose } = require("mongoose");
const mon = require("mongoose");
const usergym = mon.Schema({
  GymId: {
      type:mon.Schema.Types.ObjectId
  },
  Name: {
    type: String,
    required: true,
    // unique: true,
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
  Address: {
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
  }, //height medical issue target password state city
  Height: {
    type: Number,
    required: true,
  },
  MedicalIssue: {
    type: String,
    required: true,
  },
  Target: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  // AssignExercise: {
  //   type: String,
  //   required: true,
  // },
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
  Exercise:{
    type:Object,
    default: {}
  }
});

module.exports = mon.model("gymusersside", usergym);
