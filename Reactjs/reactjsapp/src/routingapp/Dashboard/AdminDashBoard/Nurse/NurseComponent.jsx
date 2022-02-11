import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
// import CreateDepartmentComponent from "./createdepartment";
// import EditDepartmentComponent from "./editdepartment";
// import ListDepartmentsComponent from "../../SigninSignUp/listdepartmentscomponent";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import ResuableTable from "../../ReusableComponent/ReusableTable";

class NurseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NurseDetails: [],
      message: "",
      columnHeaders: [],
      deletebutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.NurseDetails[0]);
    this.serv = new SecureCallService();
  }

  getNurseValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getNurseData(token)
        .then((resp) => {
          this.setState({ NurseDetails: resp.data.message });
          this.setState({ message: `Data Fetched!!!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.NurseDetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
          if (CurrentRole === "Admin") {
            this.setState({ deletebutton: false });
          } else {
            console.log("You are not Authorised!!");
          }
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  componentDidMount = () => {
    this.getNurseValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Nurse Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/CreateNurse">New Nurse</Link>
            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Ward">List of Ward</Link>

            <Link to="/Room">List of Room</Link>
          </div>
          <br />

          <div className="container">
            <center>
              <ResuableTable
                dataSource={this.state.NurseDetails}
                Id={"Nurse_id"}
                showdata={this.state.deletebutton}
                route={"EditNurse"}
                btnEdit={"Edit"}
                routeDischarge={"DeleteNurse"}
                columnHeaders={this.state.columnHeaders}
                btnName={"Delete"}
              ></ResuableTable>
            </center>
            <strong style={{ color: "red", float: "left" }}>
              {this.state.message}
            </strong>
          </div>
          {/* <div className="container">
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
                        <Link to={`/EditNurse/${dept.Nurse_id}`}>Edit</Link>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger">
                        <Link to={`/DeleteNurse/${dept.Nurse_id}`}>Delete</Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </center>
      </div>
    );
  }
}

export default NurseComponent;
