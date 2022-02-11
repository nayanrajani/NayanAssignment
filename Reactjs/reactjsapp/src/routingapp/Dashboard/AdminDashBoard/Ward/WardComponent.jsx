import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
// import CreateDepartmentComponent from "./createdepartment";
// import EditDepartmentComponent from "./editdepartment";
// import ListDepartmentsComponent from "../../SigninSignUp/listdepartmentscomponent";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import ResuableTable from "../../ReusableComponent/ReusableTable";

class WardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Ward: [],
      message: "",
      columnHeaders: [],
      deletebutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.Ward[0]);
    this.serv = new SecureCallService();
  }

  getWardValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getWardData(token)
        .then((resp) => {
          this.setState({ Ward: resp.data.message });
          this.setState({ message: `Data fetched!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.Ward[0]) },
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
    this.getWardValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Ward Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/CreateWard">Add New Ward</Link>
            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Ward">List of Ward</Link>

            <Link to="/Room">List of Room</Link>
          </div>

          <br />
          <div className="container">
            <center>
              <ResuableTable
                dataSource={this.state.Ward}
                Id={"Ward_no"}
                showdata={this.state.deletebutton}
                route={"EditWard"}
                btnEdit={"Edit"}
                routeDischarge={"DeleteWardData"}
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
                    <th key={idx}>
                      <center>{head}</center>
                    </th>
                  ))}
                  <td>
                    <center>
                      <th>Edit</th>
                    </center>
                  </td>
                  <td>
                    <center>
                      <th>Delete</th>
                    </center>
                  </td>
                </tr>
              </thead>

              <tbody>
                {this.state.Ward.map((dept, idx) => (
                  <tr key={idx}>
                    {this.state.columnHeaders.map((head, i) => (
                      <td key={i}>
                        <center>{dept[head]}</center>
                      </td>
                    ))}
                    <td>
                      <center>
                        <button className="btn btn-warning">
                          <Link to={`/EditWard/${dept.Ward_no}`}>Edit</Link>
                        </button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button className="btn btn-danger">
                          <Link to={`/DeleteWardData/${dept.Ward_no}`}>
                            Delete
                          </Link>
                        </button>
                      </center>
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

export default WardComponent;
