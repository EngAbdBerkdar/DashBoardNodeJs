const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true })); //
app.set("view engine", "ejs");
app.use(express.static("public")); // to use css file
const customer = require("./models/customerSchema");

// get the pages in get requset
app.get("/", (req, res) => {
  customer
    .find()
    .then((result) => {
      res.render("index", {arr:result});
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});
app.get("/user/view.html", (req, res) => {
  res.render("user/view");
});
app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});
// ===========================
// Post requst
app.post("/user/add.html", (req, res) => {
  const user = new customer(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// ===============
// conect in data base
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
// ===========================
