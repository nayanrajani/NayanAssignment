import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class PatientDischarge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientDetails: [],
      message: "",
      columnHeaders: [],
      deletebutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.PatientDetails[0]);
    this.serv = new SecureCallService();
  }

  //   getSelectedDataFromTable = (emp) => {
  //     alert(`Selected Employee ${JSON.stringify(emp)} `);
  //     this.serv.AddDischargeData(emp);
  //   };

  getPatientValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getDischargeData(token)
        .then((resp) => {
          console.log(resp.data.message);
          this.setState({ PatientDetails: resp.data.message });
          console.log(this.state.PatientDetails);
          this.setState({ message: ` Data Received Successfully!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.PatientDetails[0]) },
            () => {
              console.log(` Columns ${this.state.columnHeaders}`);
            }
          );
          if (CurrentRole === "Doctor") {
            this.setState({ deletebutton: true });
          } else {
            console.log("You are not authorised to Discharge!!!");
          }
          // this.setState({ deletebutton: false });
        })
        .catch((error) => {
          this.setState({ message: ` ${user} don't have permission to view` });
        });
    }
  }

  componentDidMount = () => {
    this.getPatientValues();
  };

  render() {
    return (
      <div>
        {/* <input
          type="button"
          style={{ float: "left", fontSize: "11px" }}
          value="My DashBoard"
          onClick={this.handleDashBoard.bind(this)}
          className="btn btn-danger"
        />
        <br />
        <br /> */}
        <center>
          <h2>Patient Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">DashBoard</Link>
          </div>
        </center>

        <br />

        <div className="container">
          <center>
            <table className="table table-bordered table-striped table-dark">
              <thead>
                <tr>
                  {this.state.columnHeaders.map((head, idx) => (
                    <th key={idx}>{head}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {this.state.PatientDetails.map((dept, idx) => (
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
            <strong style={{ color: "red", float: "left" }}>
              {this.state.message}
            </strong>
          </center>
        </div>
      </div>
    );
  }
}

export default PatientDischarge;
