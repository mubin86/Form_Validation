import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  state = {
    firstName: null,
    lastName: null,
    image: null,
    password: null,
    isOk: false,
    gender: "male",
    text: "Say something about you",
    isSubmit: false,
    formErrors: {
      firstName: "",
      lastName: "",
      image: "",
      password: "",
      text: "",
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log("successfully submitted!!");
      this.setState({
        isSubmit: true,
      });

      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        image: this.state.image,
        password: this.state.password,
        gender: this.state.gender,
        text: this.state.text,
        isOk: this.state.isOk,
      };
      console.log(user);
      axios
        .post("http://localhost:5000/users/add", user)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log("error occured");
        });
    } else {
      console.error("Invalid Submit");
    }
  };

  handleFile = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      image: e.target.files[0].name,
    });
  };

  handleChange = (e) => {
    //e.preventDefault();
    const { name, value, type, checked } = e.target;

    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "text":
        formErrors.text =
          value.length < 10 ? "Sorry minimum 10 characters required" : "";
        break;
      default:
        break;
    }
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          {this.state.isSubmit ? (
            <h2>Successfully Submit</h2>
          ) : (
            <h3 style={{ textAlign: "center", color: "salmon" }}>
              Not yet complete!!
            </h3>
          )}
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="image">
              <label htmlFor="image">Image Upload</label>
              <input
                //className={formErrors.image.size < 0 ? "error" : null}
                placeholder="Please Upload Your image"
                type="file"
                name="image"
                noValidate
                onChange={(e) => {
                  this.handleFile(e);
                }}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="text">
              <textarea
                value={this.state.text}
                name="text"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </div>
            {formErrors.text.length > 0 && (
              <span className="errorMessage">{formErrors.text}</span>
            )}
            <div className="gender">
              <select
                value={this.state.gender}
                onChange={(e) => {
                  this.handleChange(e);
                }}
                name="gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="check">
              <label>
                <input
                  type="checkbox"
                  name="isOk"
                  checked={this.state.isOk}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                Ready to Go?
              </label>
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
