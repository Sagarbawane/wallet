import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import { connect } from "react-redux";
import { startLogoutUser } from "./client/Actions/userAction";

import Register from "./client/Components/auth/register";
import Login from "./client/Components/auth/login";
import Profile from "./client/Components/profile/profile";
import UpdateProfile from "./client/Components/profile/updateProfile";
import CreateProfile from "./client/Components/profile/createProfile";
import Dashboard from "./client/Components/dashboard/dashboard";


class App extends React.Component {
  constructor() {
    super();
  }
  handleLogout = () => {
    this.props.dispatch(startLogoutUser());
  };
  render() {
  
    return (
      <React.Fragment>
        <BrowserRouter>
          
                  {Object.keys(this.props.user).length === 0 && (

                    <Link  to="/register" exact={true} > Register </Link>

                   )}
                  {Object.keys(this.props.user).length === 0 && (
                   
                      <Link  to="/" exact={true} > Login </Link>
                   
                  )}
                 
          <switch>
         
            <Route path="/register" component={Register} exact={true}></Route>
            <Route path="/" component={Login} exact={true}></Route>
            <Route path="/dashboard" component={Dashboard} exact={true}></Route>
            <Route path="/profile" component={Profile} exact={true}></Route>
            <Route path="/createProfile" component={CreateProfile} exact={true}></Route>
            <Route path="/updateProfile/:id" component={UpdateProfile} exact={true}></Route>
            <Route path="/logout" exact={true}></Route>
           
          </switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
   
  };
};

export default connect(mapStateToProps)(App);
