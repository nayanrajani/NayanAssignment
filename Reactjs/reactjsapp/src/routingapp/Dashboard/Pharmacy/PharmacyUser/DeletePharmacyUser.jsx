import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
// import CreateDepartmentComponent from "./createdepartment";
// import EditDepartmentComponent from "./editdepartment";
// import ListDepartmentsComponent from "./listdepartmentscomponent";

class DeletePharmacyUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.serv = new SecureCallService();
  }

  componentDidMount = () => {
    let pid = this.props.match.params.id;
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .DeleteMedicineData(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
  };
  render() {
    return (
      <div className="container-lg">
        <center>
          <h2>Medicine Deleted</h2>
        </center>
        <div className="topnav">
          <Link to="/PharmacyUser">Dashboard</Link>

        </div>

        <br />
        <h3>Data Deleted Successfully!!</h3>
      </div>
    );
  }
}

export default DeletePharmacyUser;