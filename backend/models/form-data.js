const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    minlength: 10,
    trim: true,
  },
  isOk: {
    type: Boolean,
    Default: false,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
