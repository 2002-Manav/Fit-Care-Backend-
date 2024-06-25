const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const {
  getexercises,
  addexercises,
  updateexercise,
  deleteexercise,
  softdeleteexercise,
  getcurrentexercises,
} = require("../Controller/exercisemastercontroller");
const isAuth = (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  try {
    let val = jwt.decode(token);
    if (token && val) {
      let val = jwt.decode(token);

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

routes.get("/getallexercise", isAuth, getexercises);
routes.get("/getcurrentexercises", isAuth, getcurrentexercises);
routes.post("/addexercise", isAuth, addexercises);
routes.post("/updateexercise", isAuth, updateexercise);
routes.delete("/deleteexercise", isAuth, deleteexercise);
routes.delete("/softdeleteexercise", isAuth, softdeleteexercise);
module.exports = routes;
