import React, { Component } from "react";
import { SecureCallService } from "../../HTTPandSERVICE/services/secureservice";
import DropDownComponent from "../Dashboard/ReusableComponent/dropdown";
import "./../../22Sep/validate/validate.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: 0,

      AuthUserName: "",
      AuthPassword: "",
      AuthRole: "",
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
    let Getrole = sessionStorage.getItem("Role");
    if (Getrole == "Admin") {
      this.props.history.push("/Dashboard");
    }
    if (Getrole == "Doctor") {
      this.props.history.push("/DoctorDashboard");
    }
    if (Getrole == "Operator") {
      this.props.history.push("/operatorDashboard");
    } if (Getrole == "CanteenUser") {
      this.props.history.push("/CanteenUserDashboard");
    }if (Getrole == "PharmacyUser") {
      this.props.history.push("/PharmacyUserDashboard");
    }else {
      this.serv
        .getRoleData()
        .then((resp) => {
          this.setState({ RoleDetails: resp.data.message });
          // this.setState({ message: `Role Data Fetched!!` });
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
    }
  };

  RoleDropdownSelected = (Role) => {
    console.log(Role);
    this.setState({ RoleDrop: Role });
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
        Roles: this.state.RoleDrop,
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
          } else if (user.Roles === "CanteenUser") {
            this.setState({ message: resp.data.message });
            alert("Login Successful!! You will be redirected to Main Page");
            this.props.history.push("/CanteenUserDashboard");
          }else if (user.Roles === "PharmacyUser") {
            this.setState({ message: resp.data.message });
            alert("Login Successful!! You will be redirected to Main Page");
            this.props.history.push("/PharmacyUserDashboard");
          }else {
            this.setState({ message: resp.data.message });

            alert("Login Successful!! You will be redirected to Main Page");
            this.props.history.push("/operatorDashboard");
          }
        })
        .catch((error) => {
          this.setState({
            message: alert(`We Got an error!! Please Enter Valid Details!`),
          });
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

          <div className="form-group">
            <label htmlFor="AuthRole">Role*</label>
            <DropDownComponent
              dataSource={this.state.RoleCalll}
              stateProperty={this.state.RoleDrop}
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
