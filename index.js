const express = require("express");

const app = express();
const Gymroutes = require("./Routes/Gymroutes");
const gymuserside = require("./Routes/userroutes");
const gymtrainerside = require("./Routes/trainerroutes");
const gymexercise = require("./Routes/exerciseroutes");
const cors = require("cors");

app.use(express.json()); // Add this line to parse JSON requests
app.use(cors());
require("./dbconfig");
app.use("/Gym", Gymroutes);
app.use("/gymuser", gymuserside);
app.use("/gymtrainer", gymtrainerside);
app.use("/gymexercisemaster", gymexercise);



app.listen(5000, () => {
  console.log("port started");
});
