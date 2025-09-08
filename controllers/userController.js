const moment = require("moment"); // require
const customer = require("../models/customerSchema");
var country = require("country-list-js");
var country_names = country.names();

// get functions

const user_index_get = (req, res) => {
  customer
    .find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
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
};

const user_view_get = (req, res) => {
  customer
    .findById(req.params.id)
    .then((result) => {
      res.render("user/view", { arr1: result, moment: moment }); // user name is folder
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add", { country: country_names });
};

// ===================================================

// post functions
const user_post = (req, res) => {
  const user = new customer(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
const user_search_post = (req, res) => {
  let input = req.body.textSearch.trim();
  customer
    .find({ $or: [{ firstName: input }, { lastName: input }] })
    .then((result) => {
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

// ===================================================

// delete functions

const user_delete = (req, res) => {
  customer
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
// ===================================================

// put functions
const user_put = (req, res) => {
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
};

// ===================================================

// export all functions
module.exports = {
  user_add_get,
  user_edit_get,
  user_index_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_put,
  user_post
};
