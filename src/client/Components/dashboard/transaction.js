import React from "react";
import { connect } from "react-redux";





class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
     
    
    };
  }
 
 
  render() {
    return (
      <React.Fragment>
        <div className="container">
            <h1>Amount Added</h1>
        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User's Email ID</th>
      <th scope="col">Time Of Transaction</th>
      <th scope="col">Amount Add</th>
    </tr>
  </thead>
  <tbody>
  {this.props.addFund.map((ele,i)=>{
  return(
       <tr>
        <td>{i}</td>
        <td>{ele.emailAddress}</td>
        <td>{ele.date_of_transaction}</td>
        <td>{ele.addFund}</td>
      </tr>  
        )
})}
  </tbody>
</table>
<h1>Amount Transfer</h1>
        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User's Emai Id</th>
      <th scope="col">Time Of Transaction</th>
      <th scope="col">Amount Transfer</th>
    </tr>
  </thead>
  <tbody>
  {this.props.transferFund.map((ele,i)=>{
  return(
       <tr>
        <td>{i}</td>
        <td>{ele.emailAddress}</td>
        <td>{ele.date_of_transaction}</td>
        <td>{ele.transferFund}</td>
         </tr>  
        )
})}
  </tbody>
</table>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile:state.profile,
    addFund:state.addFund,
    transferFund:state.transferFund

  };
};
export default connect(mapStateToProps)(Transaction);
