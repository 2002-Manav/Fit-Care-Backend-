const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const {
  getusers,
  adduser,
  updateuser,
  deleteUser,
  softdeleteUser,
  getcurrentusers,
  userlogin,
  assignexercisetouser,
  getdataofuser,
  getcurrenttrainers,
} = require("../Controller/usergymcontroller");

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

routes.get("/getalluser", isAuth, getusers);
routes.get("/getcurrentusers", isAuth, getcurrentusers);
routes.post("/adduser", isAuth, adduser);
routes.post("/updateuser", isAuth, updateuser);
routes.delete("/deleteuser", isAuth, deleteUser);
routes.delete("/softdeleteuser", softdeleteUser);
routes.post("/assignexercise", assignexercisetouser);
routes.post("/userlogin", userlogin);
routes.get("/getdataofuser", getdataofuser);
routes.get("/gettrainerdata", isAuth, getcurrenttrainers);
module.exports = routes;
