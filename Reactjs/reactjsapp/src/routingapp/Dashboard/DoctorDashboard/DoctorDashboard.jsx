import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";

class DoctorDashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlesignout = () => {
    sessionStorage.clear("token");

    sessionStorage.clear("Username");

    sessionStorage.clear("Isloggedin");
    alert("LogOut Successful!! You will be redirected to Login Page");

    this.props.history.push("/SignIn");
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

    return (
      <div>
        <input
          type="button"
          style={{ float: "right", fontSize: "10px" }}
          value="Sign Out"
          onClick={this.handlesignout.bind(this)}
          className="btn btn-danger"
        />
        <h5 style={{ float: "right", fontSize: "15px", marginRight: "5px" }}>
          {`Welcome, ${user}!! Your Role: ${CurrentRole}`}&nbsp;&nbsp;
        </h5>
        <br />
        <br />
        <center>
          <h3>Welcome to the Doctor Panel </h3>
        </center>

        <div className="topnav">
          <Link to="/PatientDoctorDashboard"> Patients</Link>
          <Link to="/DischargeData"> Discharge Data</Link>
          <Link to="/PatientMedicine"> Patient Medicine</Link>
          
        </div>
      </div>
    );
  }
}

export default DoctorDashboardComponent;
