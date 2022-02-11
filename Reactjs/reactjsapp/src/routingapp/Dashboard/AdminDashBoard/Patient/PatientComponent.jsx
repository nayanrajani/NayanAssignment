import React, { Component } from "react";
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import ResuableTable from "../../ReusableComponent/ReusableTable";

class PatientComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientDetails: [],
      message: "",
      columnHeaders: [],
      deletebutton: true,
      okay:[],
    };
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
    if (token == undefined || user == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getPatientData(token)
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

          var newObj = [];
          for (var i in this.state.columnHeaders) {
            newObj[i] = this.state.columnHeaders[i].replace('_',' ');
          }

          console.log(`this is the new OBJ- ${newObj}`);
          this.setState({okay: newObj});
          console.log(`this is the new OBJ- ${this.state.okay}`);

          if (CurrentRole === "Doctor") {
            this.setState({ deletebutton: false });
          } else {
            console.log("You are not authorised to Discharge!!!");
          }
        })
        .catch((error) => {
          this.setState({ message: ` ${user} don't have permission to view` });
        });
    }
  }
  handleDischarge = () => {
    let CurrentRole = sessionStorage.getItem("Role");
    if (CurrentRole === "Doctor") {
      this.setState({ deletebutton: false });
    } else {
      this.props.history.push("/Dashboard");
      console.log("You are not authorised to Discharge!!!");
    }
  };

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
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/CreatePatient">New Patient</Link>
            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Ward">List of Ward</Link>

            <Link to="/Room">List of Room</Link>
          </div>
        </center>

        <br />
        <div className="container">
          <center>
            <ResuableTable
              dataSource={this.state.PatientDetails}
              Id={"Patient_id"}
              showdata={this.state.deletebutton}
              route={"EditPatient"}
              btnEdit={"Edit"}
              routeDischarge={"DeletePatientData"}
              columnHeaders={this.state.columnHeaders}
              btnName={"Discharge"}
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
                  <td>
                    <th>Edit</th>
                  </td>
                  <td>
                    <th hidden={this.state.deletebutton}>Discharge</th>
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
                        <Link to={`/EditPatient/${dept.Patient_id}`}>Edit</Link>
                      </button>
                    </td>
                    <td>
                      <button
                        hidden={this.state.deletebutton}
                        className="btn btn-danger"
                        onClick={() => this.getSelectedDataFromTable(dept)}
                        // onClick={this.handleDeletebutton.bind(this)}
                      >
                        <Link to={`/DeletePatientData/${dept.Patient_id}`}>
                        Discharge
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
        </div> */}
      </div>
    );
  }
}

export default PatientComponent;
