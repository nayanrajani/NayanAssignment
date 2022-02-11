import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class PatientMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientMedicineDetails: [],
      message: "",
      columnHeaders: [],
      deletebutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.PatientMedicineDetails[0]);
    this.serv = new SecureCallService();
  }

  getPatientMedicineValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getpatientmedicineData(token)
        .then((resp) => {
          console.log(resp.data.message);
          this.setState({ PatientMedicineDetails: resp.data.message });
          console.log(this.state.PatientMedicineDetails);
          this.setState({ message: ` Data Fetched!!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.PatientMedicineDetails[0]) },
            () => {
              console.log(` Columns ${this.state.columnHeaders}`);
            }
          );
          if (CurrentRole === "Doctor") {
            this.setState({ deletebutton: false });
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
    this.getPatientMedicineValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Patient Medicine Details</h2>
          <br />
          <div className="topnav">
            <Link to="/DoctorDashboard">DashBoard</Link>
          </div>
        </center>

        <br />

        <div className="container" style={{overflowX: "scroll"}}>
          <center>
            <table className="table table-bordered table-striped table-dark">
              <thead>
                <tr>
                  {this.state.columnHeaders.map((head, idx) => (
                    <th key={idx}>{head}</th>
                  ))}
                  <td>
                    <th>Edit</th>
                  </td>

                </tr>
              </thead>

              <tbody>
                {this.state.PatientMedicineDetails.map((dept, idx) => (
                  <tr key={idx}>
                    {this.state.columnHeaders.map((head, i) => (
                      <td key={i}>
                        <center>{dept[head]}</center>
                      </td>
                    ))}
                    <td>
                      <button className="btn btn-warning">
                        <Link to={`/EditPatientMedicine/${dept.PatientMedicine_id}`}>
                          Edit
                        </Link>
                      </button>
                    </td>

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

export default PatientMedicine;
