import React from "react";
import { connect } from "react-redux";
import { startRegisterUser } from "../../Actions/userAction";
import {Link} from "react-router-dom"

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      password: "",
    
     
      errors: {
       emailAddress: "",
      password: "",

      },
    };
  }

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
        const redirect = () => {
          this.props.history.push("/");
        };
        console.log(formData);
        this.props.dispatch(startRegisterUser(formData, redirect));
      } else {
        console.error("Invalid Form");
      }
    }
  render() {
    return (
      <React.Fragment>
         <div className="container">
          <div className="login-page">
          <div className="form">
         
                
                  <form onSubmit={this.handleSubmit}>
                 
                    <div class="form-group ">
                      <div class="form-group ">
                        <div className="emailAddress" noValidate>

                          <input
                            type="email"
                            name="emailAddress"
                            class="form-control"

                            placeholder="Email"
                            value={this.state.emailAddress}
                            onChange={this.handleChange}
                            noValidate
                          />
                          {this.state.errors.emailAddress.length > 0 && (
                            <span className="error">
                              {this.state.errors.emailAddress}
                            </span>
                          )}
                        </div>
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
                            <span className="error">
                              {this.state.errors.password}
                            </span>
                          )}
                        </div>
                      </div>

                    
                
                 
                  
                    <button type="submit" class="btn btn-primary custom-btn">
                      Create Account
                    </button>
                    
                  
                    <p class="message">Already Have A Account? <Link to="/">Log In</Link></p>
                  </form>
              
                </div>
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
export default connect(mapStateToProps)(Register);
