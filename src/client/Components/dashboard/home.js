import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom"

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props.addFund)
    return (
      
      <div className="container">

      <div class="card" >
      <div class="card-body">
    <Link type="button" class="addfund" role="button" to="/addFund">Add Money</Link>
    <Link type="button" class="transferfund " role="button" to="/transferFund">Transfer Money</Link>
    </div>
    </div>
    <h1>Added Amount</h1>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User's Email ID </th>
      <th scope="col">Time Of Transaction</th>
      <th scope="col">Amount Added</th>
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
<h1>Transfer Amount</h1>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User's Email ID </th>
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

    );
  }
}
const mapStateToProps = (state) => {
  return {
   profile:state.profile,
   addFund:state.addFund,
   transferFund:state.transferFund
  };
};

export default connect(mapStateToProps)(Home);
