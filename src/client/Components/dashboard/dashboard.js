import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";


import Login from "../auth/login";
import Register from "../auth/register";
import Profile from "../profile/profile";
import CreateProfile from "../profile/createProfile";
import UpdateProfile from "../profile/updateProfile";
import Home from "./home";
import Transaction from "./transaction"
import AddFund from "../fund/addFund";
import TransferFund from "../fund/transferFund";



import { startLogoutUser } from "../../Actions/userAction";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogout = () => {
    this.props.dispatch(startLogoutUser());
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className=" navbar navbar-expand-md navbar-dark bg-dark">
           
              <div>
                <a className="navbar-brand" href="">
                  {" "}
                  <h3 className="name">Hello, {this.props.user.firstName}</h3>
                </a>
              </div>
            

            <div className="navbar-nav ml-auto">
             
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/home">
                      <i class="fa fa-home" aria-hidden="true"></i>
                      &nbsp; Home
                    </Link>
                  </li>
                  
                  <li className="nav-item active">
                    <Link className="nav-link" to="/transaction">
                    <i class="fa fa-exchange" aria-hidden="true"></i>

                      &nbsp; Transaction
                    </Link>
                  </li>              
                <li class="nav-item dropdown">
                     <Link class=" navbar-brand nav-link dropdown-toggle" data-toggle="dropdown" > <i class="fa fa-user-circle" aria-hidden="true"></i> Profile</Link>
                <div class="dropdown-menu">
                    <Link   class="dropdown-item" to="/profile"> Profile</Link>
                     <Link class="dropdown-item" onClick={this.handleLogout}to="/logout" > <i class="fa fa-sign-out" aria-hidden="true"></i>
                        &nbsp; Logout
                      </Link>
                    </div>
                   </li>
                   </ul>
                 </div>
                 </div>


          <Switch>
           
            <Route path="/" component={Login} exact={true}></Route>
            <Route path="/logout" exact={true}></Route>
            <Route path="/home" component={Home}exact={true}></Route>
            <Route path="/createProfile" component={CreateProfile}exact={true}></Route>
            <Route path="/register" component={Register} exact={true}></Route>
            <Route path="/profile" component={Profile} exact={true} ></Route>
            <Route path="/transaction" component={Transaction} exact={true} ></Route>
            <Route path="/addFund" component={AddFund} exact={true} ></Route>
            <Route path="/updateProfile/:id" component={UpdateProfile} exact={true}></Route>
            <Route path="/transferFund" component={TransferFund} exact={true} ></Route>
          
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile:state.profile
  };
};

export default connect(mapStateToProps)(Dashboard);
