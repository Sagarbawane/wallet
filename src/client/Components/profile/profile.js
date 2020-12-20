import React from "react";

import { connect } from "react-redux";
import {Link} from "react-router-dom"
import {startDeleteProfile } from "../../Actions/profileAction";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    
  }
  handleDeleteAccount=(id)=>{
    this.props.dispatch(startDeleteProfile(id));
  }
  handleUpdate=(id)=>{
    this.props.history.push(`/updateProfile/${id}`)
  }
 
  render() {
    let userProfile = this.props.profile;
    let value =  userProfile.filter((ele) => {
      if (ele.userId === this.props.user._id) {
        return ele;
      }
    });
    
   
    return (
      <div>
     { value===0  ? (
        <div className="container">
          <div class="card" >
        <div class="card-body">
          <h5 class="card-title">You Need To Create Profile First</h5>
          <Link class="card-link" to="/createProfile">Create Profile</Link>
          <Link class="card-link" to="/dashboard">Back To Dashboard</Link>
      </div>
      </div>
      </div>
      ):(

        <div className="container">

        <div class="card" >
        <div class="card-body">
          <h5 class="card-title">Profile</h5>
         {value.map((ele)=>{
           return (
             <div>
            <h6 class="card-text">Name-{ele.firstName}</h6>
            <h6 class="card-text">LastName-{ele.lastName}</h6>
            <h6 class="card-text">Email-{ele.emailAddress}</h6>
            <h6 class="card-text">Phone-{ele.phoneNumber}</h6>

           
            </div>
           )
         })}
          {value.map((ele)=>{
           return (
             <div>
          

            <Link class="card-link"  onClick={() => {this.handleUpdate(ele._id) }} >Update Account</Link>
            <Link class="card-link" onClick={()=>this.handleDeleteAccount(ele._id)} to="/register">Delete Account</Link>
            <Link class="card-link" to="/dashboard">Back To Dashboard</Link>
            </div>
           )
         })}
      </div>
      </div>
      </div>
      )
  }
       </div>
    )

}
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile:state.profile

  };
};
export default connect(mapStateToProps)(Profile);
