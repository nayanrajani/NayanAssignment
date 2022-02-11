import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import "./dashboardcss.css";

class AdminDashboardComponent extends Component {
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
          {`Welcome, ${user}!!`}&nbsp;&nbsp;
        </h5>
        <br />
        <br />
        <center>
          <h3>Welcome to the Admin Panel </h3>
        </center>

        <div className="topnav">
          <Link to="/Patient"> Patients</Link>
          <Link to="/Nurse"> Nurse</Link>
          <Link to="/Doctor"> Doctors</Link>
          <Link to="/Canteen"> Canteen</Link>
          <Link to="/WardBoy"> WardBoy</Link>
          <Link to="/Ward"> Ward</Link>
          <Link to="/Room"> Room</Link>
          <Link to="/Medicine"> Medicine</Link>
          <Link to="/Bill"> Bills</Link>
          <Link to="/Staff"> Staff</Link>
          <Link to="/AllDischarge"> Discharged</Link>
          <Link to="/SignUp"> Register user</Link>
        </div>
      </div>
    );
  }
}

export default AdminDashboardComponent;
