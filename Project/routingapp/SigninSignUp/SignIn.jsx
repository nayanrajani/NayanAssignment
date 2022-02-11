import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../HTTPandSERVICE/services/secureservice";
import { Roles } from "../Dashboard/ReusableComponent/constants";
import DropDownComponent from "../Dashboard/ReusableComponent/dropdown";
import "./../../22Sep/validate/validate.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: 0,

      AuthUserName: "",
      AuthPassword: "",
      AuthRole: Roles,
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

  clearAuth = () => {
    this.setState({ AuthUserName: "" });
    this.setState({ AuthPassword: "" });
  };

  auth() {
    let errors = {};
    const re = /^\S*$/;
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (this.state.AuthUserName === "") {
      errors.AuthUserName = "Enter Username";
      //alert("Login Failed!! You are passing an empty username and Password!");
      console.log(`this is User name- ${this.state.AuthUserName}`);
      console.log(`this is User name- ${this.state.AuthPassword}`);
      //this.props.history.push("/");
    }
    if (this.state.AuthPassword === "") {
      errors.AuthUserName = "Enter Password";
      //alert("Login Failed!! You are passing an empty username and Password!");
      console.log(`this is User name- ${this.state.AuthUserName}`);
      console.log(`this is User name- ${this.state.AuthPassword}`);
      //this.props.history.push("/");
    }
    if (
      this.state.AuthUserName.length < 6 ||
      !re.test(this.state.AuthUserName) ||
      !pattern.test(this.state.AuthUserName)
    ) {
      errors.AuthUserName = "Enter a valid Username";
    }
    if (this.state.AuthPassword.length < 6) {
      errors.AuthPassword = "Please Add Atleast 6 character in Password";
    } else {
      console.log(`this is User name- ${this.state.AuthUserName}`);
      console.log(`this is User name- ${this.state.AuthPassword}`);
      let user = {
        UserName: this.state.AuthUserName,
        Password: this.state.AuthPassword,
        Roles: this.state.RoleCall,
      };
      console.log(`this is User name- ${JSON.stringify(user)}`);
      // console.log(`this is Password name- ${Password}`);
      // if (UserName === undefined || Password === undefined)
      this.serv
        .authUser(user)
        .then((resp) => {
          this.setState({ message: resp.data.message });
          console.log(`this is the username- ${user.UserName}`);
          console.log("redirect to login");
          // save token in the session storage
          sessionStorage.setItem("token", resp.data.token);
          sessionStorage.setItem("Role", user.Roles);
          sessionStorage.setItem("Username", user.UserName);
          sessionStorage.setItem("Isloggedin", true);

          if (user.Roles === "Admin") {
            this.setState({ message: resp.data.message });
            alert("Login Successful!! You will be redirected to Main Page");
            this.props.history.push("/Dashboard");
          } else if (user.Roles === "Doctor") {
            this.setState({ message: resp.data.message });
            alert("Login Successful!! You will be redirected to Main Page");
            this.props.history.push("/DoctorDashboard");
          } else {
            this.setState({ message: resp.data.message });

            alert("Login Successful!! You will be redirected to Main Page");
            this.props.history.push("/operatorDashboard");
          }
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
    return (
      <div className="container-lg">
        <center>
          <h3> Login </h3>
        </center>
        <br />
        <h6>The * Fields are Required</h6>
        {/* <center> */}
        <form>
          <div className="form-group">
            <label htmlFor="AuthUserName">User Name*</label>
            <input
              type="text"
              name="AuthUserName"
              className="form-control"
              value={this.state.AuthUserName}
              onChange={this.handleInPutChanges.bind(this)}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="Password">Password*</label>
            <input
              type="password"
              name="AuthPassword"
              className="form-control"
              value={this.state.AuthPassword}
              onChange={this.handleInPutChanges.bind(this)}
            />
          </div>
          <br />
          {/* <div className="form-group">
            <label htmlFor="AuthRole"></label>
            <input
              type="text"
              name="AuthRole"
              className="form-control"
              value={this.state.AuthRole}
              onChange={this.handleInPutChanges.bind(this)}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="AuthRole">Role*</label>
            <DropDownComponent
              dataSource={this.state.AuthRole}
              stateProperty={this.state.RoleCall}
              selectedValue={this.RoleDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <br />
          <center>
            <div>
              <input
                type="button"
                value="Clear"
                onClick={this.clearAuth.bind(this)}
                className="btn btn-primary"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="button"
                value="Login"
                onClick={this.auth.bind(this)}
                className="btn btn-success"
              />
              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/SignUp">
                <input
                  type="button"
                  value="New User? SignUp"
                  className="btn btn-danger"
                />
              </Link> */}
            </div>
          </center>
        </form>
        <br />
        <div className="text-danger">{this.state.errors.AuthUserName}</div>
        <br />
        <div className="text-danger">{this.state.errors.AuthPassword}</div>

        <div className="container">
          <strong>{this.state.message}</strong>
        </div>
      </div>
    );
  }
}

export default SignIn;
