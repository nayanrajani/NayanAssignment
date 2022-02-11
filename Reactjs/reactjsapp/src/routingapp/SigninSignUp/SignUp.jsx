import React, { Component } from "react";
import { Link } from "react-router-dom";

import { SecureCallService } from "../../HTTPandSERVICE/services/secureservice";
import DropDownComponent from "../Dashboard/ReusableComponent/dropdown";

class SecureHttpCallComponentSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: 0,
      RegUserName: "",
      RegPassword: "",
      ConfirmRegPassword: "",
      RegRole: "",

      message: "",
      Users: [],

      errors: {},
      RoleCall: "",
      //////
      RoleDetails: [],
      RoleCalll: [],
      RoleDrop: "",
    };
    this.serv = new SecureCallService();
  }

  componentDidMount = () => {
    this.serv
      .getRoleData()
      .then((resp) => {
        this.setState({ RoleDetails: resp.data.message });
        this.setState({ message: `Role Data Fetched!!` });
        this.setState(
          { columnHeaders: Object.keys(this.state.RoleDetails[0]) },
          () => {
            console.log(`Columns ${this.state.columnHeaders}`);
          }
        );
        this.setState({
          RoleCalll: this.state.RoleDetails.map(
            (item) =>
              // "RoomNo.: " +
              item.RoleName
            // +
            // ", " +
            // "Type: " +
            // item.Room_type +
            // ", " +
            // "Charges: " +
            // item.Room_charges
          ),
        });
        console.log(this.state.RoleCalll);
      })
      .catch((error) => {
        this.setState({ message: `Error Occured ${error.message}` });
      });
  };

  RoleDropdownSelected = (Role) => {
    console.log(Role);
    this.setState({ RoleDrop: Role });
  };

  clearReg = () => {
    this.setState({ UserId: 0 });
    this.setState({ RegUserName: "" });
    this.setState({ RegPassword: "" });
    this.setState({ ConfirmRegPassword: "" });
  };

  register() {
    console.log("before error");
    let errors = {};
    console.log("after error");
    if (this.state.UserId === "" || this.state.UserId === 0) {
      errors.UserId = "Enter a valid UserId";
      console.log(errors.UserId);
      console.log("inside empty userid error");
    } else if (this.state.RegUserName === "" || this.state.RegPassword === "") {
      errors.RegUserName = "Enter Username or Password";
      console.log("inside RegUserName error");
    } else if (this.state.RegUserName.length < 6) {
      errors.RegUserName = "Enter a valid Username";
      console.log("inside length error");
    } else if (this.state.RegPassword.length < 6) {
      errors.RegPassword =
        "Please add Atleast 6 character in username and Password";
      console.log("inside username and Password error");
    } else if (this.state.ConfirmRegPassword !== this.state.RegPassword) {
      errors.ConfirmRegPassword = "Password Not Match!!";
      console.log("Password Not Match!!");
    } else {
      console.log("inside user error");
      let user = {
        UserId: this.state.UserId,
        UserName: this.state.RegUserName,
        Password: this.state.RegPassword,
        Roles: this.state.RoleDrop,
      };
      this.serv
        .registerUser(user)
        .then((resp) => {
          this.setState({ message: resp.data.message });
          alert(
            "Register Successful!! You will be redirected to Dashboard Page"
          );
          this.props.history.push("/Users");
        })
        .catch((error) => {
          this.setState({ message: `We met with an error!!` });
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
              min={0}
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
          <div className="form-group">
            <label htmlFor="ConfirmRegPassword">Confirm Password*</label>
            <input
              type="Password"
              name="ConfirmRegPassword"
              value={this.state.ConfirmRegPassword}
              onChange={this.handleInPutChanges.bind(this)}
              className="form-control"
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="RegRole">Role*</label>
            <DropDownComponent
              dataSource={this.state.RoleCalll}
              stateProperty={this.state.RoleDrop}
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
              <input type="button" value="Cancel" className="btn btn-warning" />
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
        <div className="text-danger">
          {this.state.errors.ConfirmRegPassword}
        </div>
        <div className="text-danger">{this.state.errors.RegRole}</div>

        <div className="container">
          <strong>{this.state.message}</strong>
        </div>
      </div>
    );
  }
}

export default SecureHttpCallComponentSignup;
