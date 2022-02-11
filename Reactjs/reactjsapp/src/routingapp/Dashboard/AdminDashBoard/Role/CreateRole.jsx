import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class CreateRoleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RoleId: "",
      RoleName: "",

      Role: [],
      columnHeaders: [],
      message: "",
      errors: {},
    };
    this.serv = new SecureCallService();
  }

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  clear = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ RoleName: "" });
  };

  CancelButton = () => {
    this.setState({ RoleName: "" });
    this.props.history.push("/Role");
  };

  save = () => {
    let errors = {};

    if (
      this.state.RoleName === "" ||
      this.state.RoleName === 0 ||
      this.state.RoleName === undefined
    ) {
      errors.RoleName = "Please Enter a valid Role Type";
    } else {
      console.log(`this is Roledetail change in save- ${this.state.RoleName}`);

      let Roledetail = {
        RoleName: this.state.RoleName,
      };
      console.log(`this is Roledetail change- ${JSON.stringify(Roledetail)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddRoleData(Roledetail)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/Role");
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error}` });
        });
    }
    this.setState({
      errors: errors,
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
      <div className="container">
        <h4>Add New Role</h4>
        <form>
          <div className="form-group">
            <label htmlFor="RoleName">Role Type</label>
            <input
              type="text"
              name="RoleName"
              className="form-control"
              value={this.state.RoleName}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.RoleName}
          </strong>
          <hr />
          <div className="btn-group">
            <input
              type="button"
              value="Clear"
              className="btn btn-primary"
              onClick={this.clear.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="button"
              value="Save"
              className="btn btn-success"
              onClick={this.save.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="button"
              value="Cancel"
              className="btn btn-warning"
              onClick={this.CancelButton.bind(this)}
            />
          </div>
        </form>
        <hr />
        <div className="container">
          <strong>{this.state.message}</strong>
        </div>
      </div>
    );
  }
}

export default CreateRoleComponent;
