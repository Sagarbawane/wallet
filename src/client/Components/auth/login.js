import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom"

import { startLoginUser } from "../../Actions/userAction";
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
        emailAddress: "",
      password: "",
      errors: {
        emailAddress: "",
        password: "",
      },
    };
  }
  handleBack = () => {
    this.props.history.push(`/`);
  };
  registerPage = () => {
    this.props.history.push(`/register`);
  };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "emailAddress":
        errors.emailAddress = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(this.state.errors)) {
      const formData = {
        emailAddress: this.state.emailAddress,
        password: this.state.password,
      };
      console.log(formData);
      const redirect = () => {
        this.props.history.push("/dashboard");
      };
      this.props.dispatch(startLoginUser(formData, redirect));
    } else {
      console.error("Invalid Form");
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="login-page">
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <div class="form-group">
                <div className="emailAddress" noValidate>

                  <input
                    type="email"
                    name="emailAddress"
                    class="form-control"

                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    value={this.state.emailAddress}
                    onChange={this.handleChange}
                    noValidate
                  />
                  {this.state.errors.emailAddress.length > 0 && (
                    <span className="error">{this.state.errors.emailAddress}</span>
                  )}
                 
                </div>
              </div>
              <div class="form-group">
                <div className="password" noValidate>

                  <input
                    type="text"
                    name="password"
                    class="form-control"

                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    noValidate
                  />
                  {this.state.errors.password.length > 0 && (
                    <span className="error">{this.state.errors.password}</span>
                  )}
                </div>
              </div>
             

              <button type="submit" class="btn btn-primary ">
                Login In
              </button>
              <p class="message">Not registered? <Link to="/register">Create an account</Link></p>
            </form>
      
           
          
          </div>
          <br />

         
        </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Login);
