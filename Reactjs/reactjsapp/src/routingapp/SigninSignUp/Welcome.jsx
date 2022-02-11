import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
// import CreateDepartmentComponent from "./createdepartment";
// import EditDepartmentComponent from "./editdepartment";
// import ListDepartmentsComponent from "./listdepartmentscomponent";

class WelcomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   handlesignout = () => {
  //     sessionStorage.clear("token");

  //     sessionStorage.clear("Username");
  //     sessionStorage.clear("Isloggedin");
  //     alert("LogOut Successful!! You will be redirected to Login Page");

  //     this.props.history.push("/");
  //     window.addEventListener("popstate", () => {
  //       this.props.history.go(1);
  //     });
  //   };

  //   componentDidMount = () => {
  //     window.addEventListener("popstate", () => {
  //       this.props.history.go(1);
  //     });
  //   };

  render() {
    return (
      <div
      // className="container-lg"
      // style={{
      //   backgroundImage:
      //     'url("https://s19499.pcdn.co/wp-content/uploads/2020/01/facebook-suburban-hospital.jpg")',
      //   height: "1000px",
      //   backgroundRepeat: "no-repeat",
      // }}
      >
        <center>
          <h2>Welcome to the Hospital System</h2>
          {/* <center>
            <h4>Please Sign In</h4>
          </center> */}
          <br />
          <Link to="/SignIn">
            <input
              type="button"
              value="Admin Login"
              className="btn btn-primary"
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/SignIn">
            <input
              type="button"
              value="Doctor Login"
              className="btn btn-warning"
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/SignIn">
            <input
              type="button"
              value="Operator Login"
              className="btn btn-success"
            />
          </Link>
          <br />
          <br />
          <h5>OR</h5>
          <br />
          <Link to="/SignUp">
            <input
              type="button"
              value="Register here"
              className="btn btn-danger"
            />
          </Link>
        </center>
      </div>
    );
  }
}
export default WelcomePageComponent;
