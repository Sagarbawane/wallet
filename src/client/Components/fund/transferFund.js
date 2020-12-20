import React from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";

import { StartTransferFund } from "../../Actions/transferFundAction";


class TransferFund extends React.Component {
  constructor() {
    super();
    this.state = {
      transferFund:"",
      phoneNumber:""
    
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
       transferFund: this.state.transferFund,
       phoneNumber:this.state.phoneNumber

      };
      console.log(formData);
      const redirect = () => {
        this.props.history.push("/dashboard");
      };
      {this.props.profile.map((ele)=>{
          if(ele.phoneNumber===formData.phoneNumber){
            console.log(ele.phoneNumber===formData.phoneNumber)
            console.log(formData.phoneNumber)
            this.props.dispatch(StartTransferFund(formData, redirect));
          }
          else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Phone Number Does Not Exit",
              });
          }
      })}
      
      
    } 
  
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="login-page">
          <div className="form">
            <form onSubmit={this.handleSubmit}>
             
              <div class="form-group">
                <div className="transferFund" >

                  <input
                    type="text"
                    name="transferFund"
                    class="form-control"

                    placeholder="Transfer Fund"
                    value={this.state.transferFund}
                    onChange={this.handleChange}
                   
                  />
                 
                </div>
              </div>
              <div class="form-group">
                     
                     <div className="phoneNumber" >
                      
                       <input
                         type="text"
                         name="phoneNumber"
                         class="form-control"

                         placeholder="Phone Number"
                         value={this.state.phoneNumber}
                         onChange={this.handleChange}
                                                 
                       />

                     </div>
                   </div>
             

              <button type="submit" class="btn btn-primary ">
               Transfer Fund
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
export default connect(mapStateToProps)(TransferFund);
