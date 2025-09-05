const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment"); // require
const methodOverride = require("method-override");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true })); //
app.set("view engine", "ejs");
app.use(express.static("public")); // to use css file
app.use(methodOverride("_method")); // delete items

const customer = require("./models/customerSchema");

var country = require("country-list-js");
var country_names = country.names();

// get the pages in get requset
app.get("/", (req, res) => {
  customer
    .find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/user/add.html", (req, res) => {
  res.render("user/add", { country: country_names });
});
app.get("/edit/:id", (req, res) => {
  customer
    .findById(req.params.id)
    .then((result) => {
      res.render("user/edit", {
        element: result,
        moment: moment,
        country: country_names,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/view/:id", (req, res) => {
  customer
    .findById(req.params.id)
    .then((result) => {
      res.render("user/view", { arr1: result, moment: moment }); // user name is folder
    })
    .catch((err) => {
      console.log(err);
    });
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

app.post("/search", (req, res) => {
  customer
    .find({ $or: [{ firstName: "berkdar" }, { lastName: "berkdar" }] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.post("/search", (req, res) => {
//   customer
//     .find({ age: { $gt: 20 } })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// ===============
// DELETE REQUST
app.delete("/edit/:id", (req, res) => {
  customer
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
// =============
// put requst
app.put("/edit/:id", (req, res) => {
  customer
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// ==========
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
