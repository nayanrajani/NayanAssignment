import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class OperatorPatientComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientDetails: [],
      message: "",
      columnHeaders: [],
      okay:[],
      // deletebutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.PatientDetails[0]);
    this.serv = new SecureCallService();
  }

  getSelectedDataFromTable = (emp) => {
    alert(`Selected Employee ${JSON.stringify(emp)} `);
  };

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
        .getPatientData(token)
        .then((resp) => {
          console.log(resp.data.message);
          this.setState({ PatientDetails: resp.data.message });
          console.log(this.state.PatientDetails);
          this.setState({ message: ` Data fetched!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.PatientDetails[0]) },
            () => {
              console.log(` Columns ${this.state.columnHeaders}`);
            }
          );
          var newObj = [];
          for (var i in this.state.columnHeaders) {
            newObj[i] = this.state.columnHeaders[i].replace('_',' ');
          }

          console.log(newObj);
          this.setState({okay: newObj});
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
    this.getPatientValues();
  };
  render() {
    return (
      <div>
        <center>
          <h2>Patient Details</h2>
          <br />
          <div className="topnav">
            <Link to="/operatorDashboard">DashBoard</Link>
          </div>
        </center>

        <br />

        <div className="container" style={{overflowX: "scroll"}}>
          <center>
            <table className="table table-bordered table-striped table-dark">
              <thead>
                <tr>
                  {this.state.okay.map((head, idx) => (
                    <th key={idx}>{head}</th>
                  ))}
                  <td>
                    <th>Edit</th>
                  </td>
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
                    <td>
                      <button className="btn btn-warning">
                        <Link to={`/OperatorEditPatient/${dept.Patient_id}`}>
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

export default OperatorPatientComponent;
