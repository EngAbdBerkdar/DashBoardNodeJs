const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const TheUserName = require("./models/MyDataSchema");

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});
app.get("/index.html", (req, res) => {
  res.send("<h1>The Data Saved in DataBase</h1>");
});

mongoose
  .connect(
    "mongodb+srv://abomohammad:abomohammad1234@clusterbero.uej4sxw.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Connected to MongoDB`);
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
  });

app.post("/", (req, res) => {
  console.log(req.body);
  const theUserName = new TheUserName(req.body);
  theUserName.save().then(() => {
    res.redirect("./index.html");
  }).catch((err)=>{
    console.log(err)
  })
});
