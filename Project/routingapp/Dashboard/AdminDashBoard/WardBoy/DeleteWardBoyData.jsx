import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
// import CreateDepartmentComponent from "./createdepartment";
// import EditDepartmentComponent from "./editdepartment";
// import ListDepartmentsComponent from "./listdepartmentscomponent";

class DeleteWardBoy extends Component {
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
        .DeleteWardBoyData(pid)
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
          <h2>Wardboy deleting</h2>
        </center>
        <div className="topnav">
          <Link to="/Dashboard">Dashboard</Link>
          <Link to="/CreateBill">Add New Bill</Link>
          <Link to="/Patient">List of Patients</Link>

          <Link to="/WardBoy">List of WardBoy</Link>

          <Link to="/Ward">List of Ward</Link>

          <Link to="/Room">List of Room</Link>
        </div>
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <td>
                <center>
                  {/* By Default the  LIstDepartmentsComponent will be loaded*/}
                  <Link to="/Dashboard">Dashboard</Link>
                </center>
              </td>
              <td>
                <center>
                  <Link to="/Patient">List of Patients</Link>
                </center>
              </td>
              {/* <td>
                <Link to="/Nurse">List of Nurse</Link>
              </td> */}
              <td>
                <Link to="/WardBoy">List of WardBoy</Link>
              </td>
              <td>
                <Link to="/Ward">List of Ward</Link>
              </td>
              <td>
                <Link to="/Room">List of Room</Link>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3>Data Deleted Successfully!!</h3>
      </div>
    );
  }
}

export default DeleteWardBoy;
