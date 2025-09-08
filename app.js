const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true })); //
app.set("view engine", "ejs");
app.use(express.static("public")); // to use css file
app.use(methodOverride("_method")); // delete items
const allRoutes = require("./routes/allRoutes");
const addUserRoutes = require("./routes/addUser");
const editUserRoutes = require("./routes/editUser");


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
  
  app.use(allRoutes);
  app.use("/user",addUserRoutes);
  app.use(editUserRoutes)