import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import ResuableTable from "../../ReusableComponent/ReusableTable";

class PatientBillDischarge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientDetails: [],
      message: "",
      columnHeaders: [],
      deletebutton: true,
      // editbutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.PatientDetails[0]);
    this.serv = new SecureCallService();
  }

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
          this.setState({ message: `Data fetched!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.PatientDetails[0]) },
            () => {
              console.log(` Columns ${this.state.columnHeaders}`);
            }
          );

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
        <center>
          <h2>Discharged Patient</h2>
          <br />
          <div className="topnav">
            <Link to="/operatorDashboard">DashBoard</Link>
          </div>
        </center>

        <br />

        <div className="container">
          <center>
            <ResuableTable
              dataSource={this.state.PatientDetails}
              Id={"Patient_id"}
              showdata={this.state.deletebutton}
              // showdata1={this.state.editbutton}
              route={"OperatorPatientCreateBill"}
              btnEdit={"Create Bill"}
              routeDischarge={""}
              columnHeaders={this.state.columnHeaders}
              btnName={"Delete"}
            ></ResuableTable>
          </center>
          <strong style={{ color: "red", float: "left" }}>
            {this.state.message}
          </strong>
        </div>

        {/* <div className="container">
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
        </div> */}
      </div>
    );
  }
}

export default PatientBillDischarge;
