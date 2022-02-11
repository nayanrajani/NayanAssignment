import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
// import CreateDepartmentComponent from "./createdepartment";
// import EditDepartmentComponent from "./editdepartment";
// import ListDepartmentsComponent from "../../SigninSignUp/listdepartmentscomponent";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class WardboyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NurseDetails: [],
      message: "",
      columnHeaders: [],
    };
    // this.state.columnHeaders = Object.keys(this.state.NurseDetails[0]);
    this.serv = new SecureCallService();
  }

  getWardBoyValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getWardBoyData(token)
        .then((resp) => {
          this.setState({ NurseDetails: resp.data.message });
          this.setState({ message: `Data Received Successfully` });
          this.setState(
            { columnHeaders: Object.keys(this.state.NurseDetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  componentDidMount = () => {
    this.getWardBoyValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Patient Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/CreateWardBoy">New Ward Boy</Link>
            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Ward">List of Ward</Link>

            <Link to="/Room">List of Room</Link>
          </div>

          <br />

          <div className="container">
            <table className="table table-bordered table-striped table-dark">
              <thead>
                <tr>
                  {this.state.columnHeaders.map((head, idx) => (
                    <th key={idx}>{head}</th>
                  ))}
                  <td>
                    <th>Edit</th>
                  </td>
                  <td>
                    <th>Delete</th>
                  </td>
                </tr>
              </thead>

              <tbody>
                {this.state.NurseDetails.map((dept, idx) => (
                  <tr key={idx}>
                    {this.state.columnHeaders.map((head, i) => (
                      <td key={i}>
                        <center>{dept[head]}</center>
                      </td>
                    ))}
                    <td>
                      <button className="btn btn-warning">
                        <Link to={`/EditWardBoy/${dept.Wardboy_id}`}>Edit</Link>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger">
                        <Link to={`/DeleteWardBoyData/${dept.Wardboy_id}`}>
                          Delete
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* </tr> */}
        </center>
      </div>
    );
  }
}

export default WardboyComponent;
