import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class StaffPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StaffDetails: [],
      message: "",
      columnHeaders: [],
    };
    this.serv = new SecureCallService();
  }

  getStaffValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getStaffData(token)
        .then((resp) => {
          this.setState({ StaffDetails: resp.data.message });
          this.setState({ message: `Data Received Successfully` });
          this.setState(
            { columnHeaders: Object.keys(this.state.StaffDetails[0]) },
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
    this.getStaffValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Staff Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/CreatePatient">New Patient</Link>
            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Ward">List of Ward</Link>

            <Link to="/Room">List of Room</Link>
          </div>
          <br />
          <Link to="/CreateStaffDoctor">
            <input
              type="button"
              value="Add Doctor"
              className="btn btn-primary"
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/CreateStaffWardBoy">
            <input
              type="button"
              value="Add WardBoy"
              className="btn btn-warning"
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/CreateStaffNurse">
            <input
              type="button"
              value="Add Nurse"
              className="btn btn-success"
            />
          </Link>
          <br />
          <br />
          <div className="container">
            <table className="table table-bordered table-striped table-dark">
              <thead>
                <tr>
                  {this.state.columnHeaders.map((head, idx) => (
                    <th key={idx}>{head}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {this.state.StaffDetails.map((dept, idx) => (
                  <tr key={idx}>
                    {this.state.columnHeaders.map((head, i) => (
                      <td key={i}>
                        <center>{dept[head]}</center>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </center>
      </div>
    );
  }
}
export default StaffPageComponent;
