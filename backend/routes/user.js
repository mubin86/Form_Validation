const router = require("express").Router();
const User = require("../models/form-data");

router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const image = req.body.image;
  const password = req.body.password;
  const gender = req.body.gender;
  const text = req.body.text;
  const isOk = Boolean(req.body.isOk);

  const newUser = new User({
    firstName,
    lastName,
    image,
    password,
    gender,
    text,
    isOk,
  });

  newUser
    .save()
    .then(() => {
      res.json("Üser Added!");
    })
    .catch((err) => {
      res.status(400).json("Error:" + err);
      console.log("backend error");
    });
});

module.exports = router;
