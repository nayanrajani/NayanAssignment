import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
// import CreateDepartmentComponent from "./createdepartment";
// import EditDepartmentComponent from "./editdepartment";
// import ListDepartmentsComponent from "./listdepartmentscomponent";

class DeleteNurse extends Component {
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
        .DeleteNurseData(pid)
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
          <h2>Nurse Deletion</h2>
        </center>
        <div className="topnav">
          <Link to="/Dashboard">Dashboard</Link>
          <Link to="/CreateNurse">New Nurse</Link>
          <Link to="/Patient">List of Patients</Link>

          <Link to="/WardBoy">List of WardBoy</Link>

          <Link to="/Ward">List of Ward</Link>

          <Link to="/Room">List of Room</Link>
        </div>
        <br />
        <h3>Data Deleted Successfully!!</h3>
      </div>
    );
  }
}

export default DeleteNurse;
