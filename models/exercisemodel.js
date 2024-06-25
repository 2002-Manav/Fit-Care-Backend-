const mon = require("mongoose");
const exercisegym = mon.Schema({
  GymId: {
    type: mon.Schema.Types.ObjectId,
  },

  Exercise: {
    type: String,
    required: true,
    unique: true,
  },
  ImpactArea: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
});

module.exports = mon.model("gymexerciseside", exercisegym);
