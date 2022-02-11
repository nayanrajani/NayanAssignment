import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";

import { SecureCallService } from "../../HTTPandSERVICE/services/secureservice";
import { Roles } from "../Dashboard/ReusableComponent/constants";
import DropDownComponent from "../Dashboard/ReusableComponent/dropdown";
import SecureHttpCallComponentSignin from "./SignIn";

class SecureHttpCallComponentSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: 0,
      RegUserName: "",
      RegPassword: "",
      RegRole: Roles,

      message: "",
      Users: [],

      errors: {},
      RoleCall: "",
    };
    this.serv = new SecureCallService();
  }
  RoleDropdownSelected = (Role) => {
    if (Role === "Select-Roles") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Role);
      this.setState({ RoleCall: Role });
    }
  };

  clearReg = () => {
    this.setState({ UserId: 0 });
    this.setState({ RegUserName: "" });
    this.setState({ RegPassword: "" });
    this.setState({ RegRole: Roles });
  };

  register() {
    console.log("before error");
    let errors = {};
    console.log("after error");
    if (this.state.UserId === "" || this.state.UserId === 0) {
      errors.UserId = "Enter a valid UserId";
      console.log(errors.UserId);
      console.log("inside empty userid error");
    }
    if (this.state.RegUserName === "" || this.state.RegPassword === "") {
      errors.RegUserName = "Enter Username or Password";
      console.log("inside RegUserName error");
    }
    if (this.state.RegUserName.length < 6) {
      errors.RegUserName = "Enter a valid Username";
      console.log("inside length error");
    }
    if (this.state.RegPassword.length < 6) {
      errors.RegPassword =
        "Please add Atleast 6 character in username and Password";
      console.log("inside username and Password error");
    } else {
      console.log("inside user error");
      let user = {
        UserId: this.state.UserId,
        UserName: this.state.RegUserName,
        Password: this.state.RegPassword,
        Roles: this.state.RoleCall,
      };
      this.serv
        .registerUser(user)
        .then((resp) => {
          this.setState({ message: resp.data.message });
          alert(
            "Register Successful!! You will be redirected to Dashboard Page"
          );
          this.props.history.push("/Dashboard");
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
    this.setState({
      errors: errors,
    });
  }

  handleInPutChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
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
      <div className="container-lg">
        <center>
          <h3> Register A new User</h3>
        </center>
        <br />
        <h6>The * Fields are Required</h6>
        <form>
          <div className="form-group">
            <label htmlFor="UserId">UserId*</label>
            <input
              type="text"
              name="UserId"
              onChange={this.handleInPutChanges.bind(this)}
              className="form-control"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="RegUserName">User Name*</label>
            <input
              type="text"
              name="RegUserName"
              value={this.state.RegUserName}
              onChange={this.handleInPutChanges.bind(this)}
              className="form-control"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="RegPassword">Password*</label>
            <input
              type="Password"
              className="form-control"
              name="RegPassword"
              value={this.state.RegPassword}
              onChange={this.handleInPutChanges.bind(this)}
            />
          </div>
          <br />
          {/* <div className="form-group">
            <label htmlFor="RegRole">Role*</label>
            <input
              type="text"
              className="form-control"
              name="RegRole"
              value={this.state.RegRole}
              onChange={this.handleInPutChanges.bind(this)}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="RegRole">Role*</label>
            <DropDownComponent
              dataSource={this.state.RegRole}
              stateProperty={this.state.RoleCall}
              selectedValue={this.RoleDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <br />
          <div>
            <input
              type="button"
              value="Clear"
              onClick={this.clearReg.bind(this)}
              className="btn btn-primary"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="button"
              value="Register"
              onClick={this.register.bind(this)}
              className="btn btn-success"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/Dashboard">
              <input
                type="button"
                value="Go to DashBoard"
                className="btn btn-danger"
              />
            </Link>
          </div>
        </form>
        <br />
        <div className="text-danger">{this.state.errors.UserId}</div>
        <br />
        <div className="text-danger">{this.state.errors.RegUserName}</div>
        <br />
        <div className="text-danger">{this.state.errors.RegPassword}</div>
        <br />
        <div className="container">
          <strong>{this.state.message}</strong>
        </div>
        {/* <Switch>
          <Route
            exact
            path="/signin"
            component={SecureHttpCallComponentSignin}
          ></Route>
        </Switch> */}
      </div>
    );
  }
}

export default SecureHttpCallComponentSignup;
