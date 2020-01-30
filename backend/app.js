const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postRoutes = require("./routes/posts");

//Creating express app
const app = express();

//Connecting to MongoDB
// mongoose.connect('mongodb+srv://nico:9l68ELZvaWm4jqnc@cluster0-7auiq.mongodb.net/node-angular?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to database!');
//     })
//     .catch(() => {
//         console.log('Connection failed!');
//     });
mongoose
  .connect("mongodb://10.0.0.73:27017/node-angular", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//Parsing request's body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

//CORS Configuration middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);

//Exporting the express app
module.exports = app;
