const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

//Define the port
const port = process.env.PORT || 5000;

//Allow CORS
app.use(cors());

//Set Index
mongoose.set("useCreateIndex", true);

//Initialize Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Import Routes
const signupRoute = require("./routes/signup");
const transferRoute = require("./routes/transfer");

//Use Routes
app.use("/signup", signupRoute);
app.use("/transfer", transferRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Database Connection
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log("Server Started on port ", port);
});
