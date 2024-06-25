const model = require("../models/trainergymmodel");
const encrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const gettrainers = (req, res) => {
  model
    .find({ GymId: req.val.data._id })
    .then((data) => {
      if (data) {
        res.send({ isSuccess: true, msg: "Get Trainer successfully", data });
      } else {
        res.send({ isSuccess: true, msg: "database is empty" });
      }
    })
    .catch((err) => {
      res.send({ msg: "error", err });
    });
};
const getcurrenttrainers = (req, res) => {
  model
    .find({ isDeleted: false, GymId: req.val.data._id })
    .then((data) => {
      if (data) {
        res.send({
          isSuccess: true,
          msg: "Get Current Trainer successfully",
          data,
        });
      } else {
        res.send({ isSuccess: true, msg: "database is empty" });
      }
    })
    .catch((err) => {
      res.send({ msg: "error", err });
    });
};

const addtrainer = (req, res) => {
  let {
    Trainername,
    Age,
    Email,
    PhoneNo,
    Description,
    Gender,
    Weight,
    Height,
    Qualification,
    Specialization,
    Password,
    State,
    City,
    Experience,
  } = req.body;
  model
    .findOne({ Email })
    .then((data) => {
      if (data) {
        res.send("trainer already exists");
      } else {
        let encryptedpass = encrypt.hashSync(Password, 10);
        const add = new model({
          GymId: req.val.data._id,
          Trainername,
          Age,
          Email,
          PhoneNo,
          Description,
          Gender,
          Weight,
          Height,
          isDeleted: false,
          Qualification,
          Specialization,
          Password: encryptedpass,
          State,
          City,
          Experience,
        });
        add
          .save()
          .then((data) => {
            res.send({
              isSuccess: true,
              msg: "trainer added successfully",
              data,
            });
          })
          .catch((err) => {
            res.send({
              msg: "error occurred",
              err,
            });
          });
      }
    })
    .catch((err) => {
      res.send({ msg: "error", err });
    });
};

const trainerLogin = (req, res) => {
  model
    .findOne({ Email: req.body.Email })
    .then((data) => {
      if (data) {
        const verify = encrypt.compareSync(req.body.Password, data.Password);
        if (verify && data.Email == req.body.Email) {
          const token = jwt.sign({ data }, "userlogin");
          res.send({ isSuccess: true, msg: "login successful", token });
        } else {
          res.send({
            isSuccess: false,
            msg: "username or password not correct",
          });
        }
      } else {
        res.send({
          isSuccess: false,
          msg: "user not found",
        });
      }
    })
    .catch((err) => {
      res.send({ isSuccess: false, msg: "internal server error", err });
    });
};

const updateTrainer = (req, res) => {
  try {
    model
      .updateOne({ _id: req.query.id }, req.body)
      .then((data) => {
        if (data) {
          res.send({ isSuccess: true, msg: "update success" });
        } else {
          res.send("data not found");
        }
      })
      .catch((err) => {
        res.send({ msg: "error", err });
      });
  } catch (error) {
    res.send({ msg: "error occurred", error });
  }
};

const deleteTrainer = (req, res) => {
  model
    .deleteOne({ _id: req.query.id })
    .then(() => {
      res.send({ isSuccess: true, msg: "deleted successfully" });
    })
    .catch((err) => {
      res.send({ msg: "error occurred", err });
    });
};

const softdeletetrainer = (req, res) => {
  model
    .findOne({ _id: req.query.id })
    .then((data) => {
      if (data) {
        data.isDeleted = true;
        model
          .updateOne({ _id: req.query.id }, data)
          .then(() => {
            res.send({ isSuccess: true, msg: "soft delete success" });
          })
          .catch((err) => res.send({ msg: "error occurred", err }));
      } else {
        res.send({ isSuccess: true, msg: "data not found" });
      }
    })
    .catch((err) => {
      res.send({ msg: "error occurred", err });
    });
};

module.exports = {
  gettrainers,
  getcurrenttrainers,
  addtrainer,
  updateTrainer,
  deleteTrainer,
  softdeletetrainer,
  trainerLogin,
};
