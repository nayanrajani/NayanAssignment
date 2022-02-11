import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";

import { SecureCallService } from "../../../HTTPandSERVICE/services/secureservice";
import ResuableTable from "../ReusableComponent/ReusableTable";

class UserdataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Userdata: [],
      message: "",
      columnHeaders: [],
    };

    this.serv = new SecureCallService();
  }

  getUserValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getUsersData(token)
        .then((resp) => {
          this.setState({ Userdata: resp.data.message });
          this.setState({ message: `Data fetched!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.Userdata[0]) },
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
    this.getUserValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Userdata Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Userdata">List of Userdata</Link>

            <Link to="/Room">List of Room</Link>
          </div>

          <br />

          <div className="container">
            <table className="table table-bordered table-striped table-dark">
              <thead>
                <tr>
                  {this.state.columnHeaders.map((head, idx) => (
                    <th key={idx}>
                      <center>{head}</center>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {this.state.Userdata.map((dept, idx) => (
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

export default UserdataComponent;
