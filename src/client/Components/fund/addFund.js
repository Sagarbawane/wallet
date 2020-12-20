import React from "react";
import { connect } from "react-redux";


import { startAddFund } from "../../Actions/addFundAction";
import { startSendEmail } from "../../Actions/userAction";


class AddFund extends React.Component {
  constructor() {
    super();
    this.state = {
      addFund:""
    
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCancle=()=>{
    this.props.history.push(`/home`);
  }
  handleSubmit = (e) => {
    e.preventDefault();
   
      const formData = {
        emailAddress:this.props.user.emailAddress,
       addFund: this.state.addFund,

      };
      const Data={
        recipient:this.props.user.emailAddress, text:`Amount ${this.state.addFund } has been Added To Account `
      } 
      console.log(Data)

      console.log(formData);
      const redirect = () => {
        this.props.history.push("/home");
      };
      console.log(formData)
      this.props.dispatch(startAddFund(formData, redirect));
      this.props.dispatch(startSendEmail(Data))
    } 
  
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="login-page">
          <div className="form">
            <form onSubmit={this.handleSubmit}>
             
              <div class="form-group">
                <div className="addFund" >

                  <input
                    type="text"
                    name="addFund"
                    class="form-control"

                    placeholder="Add Fund"
                    value={this.state.addFund}
                    onChange={this.handleChange}
                   
                  />
                 
                </div>
              </div>
             

              <button type="submit" class="btn btn-primary ">
               Add
              </button>
              
              <button type="submit" class="btn btn-primary " onClick={this.handleCancle}>
               Cancle
              </button>
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
    profile:state.profile
  };
};
export default connect(mapStateToProps)(AddFund);
