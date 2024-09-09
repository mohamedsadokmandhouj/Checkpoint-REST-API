const express = require("express");
const mongoose = require("mongoose");
const User = require("./user.schema");
const app = express();
app.use(express.json());
require("dotenv").config();
// const User=require('./model/user.schema')
const port = process.env.Port || 5000;

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Database connected !"))
  .catch((err) => console.log("err", err));

// add new user
app.post("/add-user", (req, res) => {
  // console.log('req.body',req)
  const { firstName, lastName, email, age } = req.body;

  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("email", email);
  console.log("age", age);

  const newUser = new User(req.body);
  newUser
    .save()
    .then(() => res.status(200).json("user created success!"))
    .catch((err) => console.log("err", err));
  
});

//add get-user

app.get('/get-users',(req,res) => {
    User.find()
    .then(users=> res.status(200).json("user created success!"))
    .catch((err) => console.log("err", err));
})


//add update-user

app.put("/update-user/:id"),
  (req, res) => {
    const userobj = req.params.id;
    const { firstName, lastName, email, age } = req.body;
    User.updateOne(
      { _id: userobj },
      { firstName: "dali", lastName: "ikbel", email: "gmc2", age: 70 }
    )
      .then(() => console.log("user update !"))
      .catch((err) => console.log("err", err));
    res.status(500).json("Error update ");
  };

//add delete-user

app.delete("/delete-user/:less", (req, res) => {
  // const userId = req.params.id;
  User.deleteOne({ firstName: req.params.less })
    .then(() => console.log("user delete !"))
    .catch((err) => console.log("err", err));
});

// console.log('port',port)
// const Port = 3000;

app.listen(port, (err) => {
  err ? console.log("err", err) : console.log(`server running on ${port}`);
});
