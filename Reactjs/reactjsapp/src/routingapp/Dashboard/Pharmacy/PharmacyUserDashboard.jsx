import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";


class PharmacyUserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlesignout = () => {
    sessionStorage.clear("token");

    sessionStorage.clear("Username");

    sessionStorage.clear("Isloggedin");
    sessionStorage.clear("Role");
    alert("LogOut Successful!! You will be redirected to Login Page");

    this.props.history.push("/");
    window.addEventListener("popstate", () => {
      this.props.history.go(1);
    });
  };

  componentDidMount = () => {
    window.addEventListener("popstate", () => {
      this.props.history.go(1);
    });
  };

  render() {
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    }
    console.log(`${user}`);
    return (
      <div>
        <input
          type="button"
          style={{ float: "right", fontSize: "11px" }}
          value="Sign Out"
          onClick={this.handlesignout.bind(this)}
          className="btn btn-danger"
        />
        <h5 style={{ float: "right", fontSize: "15px", marginRight: "5px" }}>
          {`Welcome, ${user}!! Your Role: ${CurrentRole}`}&nbsp;&nbsp;
          {/* {`Role: ${CurrentRole}!!`}
          &nbsp;&nbsp; */}
        </h5>
        <br />
        <br />
        <center>
          <h3>Welcome to the PharmacyUser Panel </h3>
        </center>

        <div className="topnav">
          <Link to="/PharmacyUser"> Home</Link>
          <Link to="/CreatePharmacyUser"> New Medicine</Link>
          <Link to="/PharmacyMedprovide"> Allot Medicine</Link>
        </div>
      </div>
    ); 
  }
}

export default PharmacyUserDashboard;
