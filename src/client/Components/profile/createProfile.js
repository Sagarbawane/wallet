import React from "react";
import { connect } from "react-redux";
import { startGetAddProfile } from "../../Actions/profileAction";


const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName:"",
      emailAddress: "",
     phoneNumber:"",
      state:"",
      city:"",
      country:"",
      pincode:"",
      
     
      errors: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        state:"",
        city:"",
        country:"",
        pincode:"",

      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 5 ? "First Name must be 5 characters long!" : "";
        break;
      case "lastName":
        errors.lastName =
          value.length < 5 ? "Last Name must be 5 characters long!" : "";
        break;
      case "emailAddress":
        errors.emailAddress = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      
      case "phoneNumber":
        errors.phoneNumber =
          value.length < 10 ? "Phone Number must have 10 digit!" : "";
        break;
     
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  cancleUpdate=()=>{
    this.props.history.push("/profile");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("password does not match with confirm password");
    } else {
      if (validateForm(this.state.errors)) {
        const formData = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,

          emailAddress: this.state.emailAddress,
          city:this.state.city,
          country:this.state.country,
          state:this.state.state,
          pincode:this.state.pincode,
          phoneNumber: this.state.phoneNumber,
        
        
        };
        const redirect = () => {
          this.props.history.push("/profile");
        };
        console.log(formData);
        this.props.dispatch(startGetAddProfile(formData, redirect));
      } else {
        console.error("Invalid Form");
      }
    }
  };
  render() {
    return (
      <React.Fragment>
         <div className="container">
          <div className="login-page">
          <div className="form">
         
                
                  <form onSubmit={this.handleSubmit}>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <div className="fullName" noValidate>

                          <input
                            type="text"
                            name="firstName"
                            class="form-control"                            
                            placeholder="First Name"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            noValidate
                          />
                          {this.state.errors.firstName.length > 0 && (
                            <span className="error">
                              {this.state.errors.firstName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <div className="lastName" noValidate>

                          <input
                            type="text"
                            name="lastName"
                            class="form-control"
                            placeholder="Last Name"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            noValidate
                          />
                          {this.state.errors.lastName.length > 0 && (
                            <span className="error">
                              {this.state.errors.lastName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
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
                     
                     <div className="phoneNumber" noValidate>
                      
                       <input
                         type="text"
                         name="phoneNumber"
                         class="form-control"
                         placeholder="Phone Number"
                         value={this.state.phoneNumber}
                         onChange={this.handleChange}
                         noValidate
                       />
                       {this.state.errors.phoneNumber.length > 0 && (
                         <span className="error">
                           {this.state.errors.phoneNumber}
                         </span>
                       )}
                     </div>
                   </div>
                  
                      <div class="form-group ">
                        <div className="city" noValidate>

                          <input
                            type="text"
                            name="city"
                            class="form-control"
                             placeholder="City"
                            value={this.state.city}
                            onChange={this.handleChange}
                            noValidate
                          />
                          
                        </div>
                      </div>
                    
                      <div class="form-group ">
                        <div className="state" noValidate>
                        
                          <input
                            type="text"
                            name="state"
                            class="form-control"
                            placeholder="State"
                            value={this.state.state}
                            onChange={this.handleChange}
                            noValidate
                          />
                        
                        </div>
                      </div>
                      <div class="form-group ">
                        <div className="country" noValidate>

                          <input
                            type="text"
                            name="country"
                            class="form-control"
                             placeholder="country"
                            value={this.state.country}
                            onChange={this.handleChange}
                            noValidate
                          />
                         
                        </div>
                      </div>
                      <div class="form-group ">
                        <div className="pincode" noValidate>
                         
                          <input
                            type="text"
                            name="pincode"
                            class="form-control"
                             placeholder="Pincode"
                            value={this.state.pincode}
                            onChange={this.handleChange}
                            noValidate
                          />
                          
                        </div>
                      </div>
                  
                    <div class="d-grid gap-2 d-md-block">
                   <button type="submit" class="btn btn-primary custom-btn">
                     create profile
                    </button>
                    <button type="button" onClick={this.cancleUpdate} class="btn btn-primary custom-btn">
                     cancle 
                    </button>
                    </div>
                  
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
export default connect(mapStateToProps)(CreateProfile);
