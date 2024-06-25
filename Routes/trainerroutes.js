const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const {
  gettrainers,
  addtrainer,
  updateTrainer,
  deleteTrainer,
  softdeletetrainer,
  getcurrenttrainers,
  trainerLogin,
} = require("../Controller/trainergymcontroller");
const isAuth = (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log("mcksdcsdcjds", token);
  try {
    let val = jwt.decode(token);
    if (token && val) {
      let val = jwt.decode(token);
console.log(val)
      req.val = val;

      next();
    } else {
      res.send("Jwt not verify");
    }
  } catch (err) {
    console.log("in err", err);
    res.send(err);
  }
};
routes.get("/getalltrainers", isAuth, gettrainers);
routes.get("/getcurrenttrainers", isAuth, getcurrenttrainers);
routes.post("/addtrainer", isAuth, addtrainer);
routes.post("/updatetrainer", isAuth, updateTrainer);
routes.delete("/deletetrainer", isAuth, deleteTrainer);
routes.delete("/softdeletetrainer", isAuth, softdeletetrainer);
routes.post("/logintrainer", isAuth, trainerLogin);
module.exports = routes;
