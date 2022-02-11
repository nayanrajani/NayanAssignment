import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import ResuableTable from "../../ReusableComponent/ReusableTable";

class RoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Roomdetails: [],
      message: "",
      columnHeaders: [],
      deletebutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.Roomdetails[0]);
    this.serv = new SecureCallService();
  }

  getRoomValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getRoomData(token)
        .then((resp) => {
          this.setState({ Roomdetails: resp.data.message });
          this.setState({ message: `Data fetched!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.Roomdetails[0]) },
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
    this.getRoomValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Room Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/CreateRoom">Add New Roomdetails</Link>
            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Ward">List of Ward</Link>

            <Link to="/Room">List of Room</Link>
          </div>

          <br />
          <div className="container">
            <center>
              <ResuableTable
                dataSource={this.state.Roomdetails}
                Id={"Room_no"}
                showdata={this.state.deletebutton}
                route={"EditRoom"}
                btnEdit={"Edit"}
                routeDischarge={"DeleteRoomData"}
                columnHeaders={this.state.columnHeaders}
                btnName={"Delete"}
              ></ResuableTable>
            </center>
            <strong style={{ color: "red", float: "left" }}>
              {this.state.message}
            </strong>
          </div>

          {/* <div className="container">
            <table className="table table-bordered table-striped  table-dark">
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
                {this.state.Roomdetails.map((dept, idx) => (
                  <tr key={idx}>
                    {this.state.columnHeaders.map((head, i) => (
                      <td key={i}>
                        <center>{dept[head]}</center>
                      </td>
                    ))}
                    <td>
                      <center>
                        <button className="btn btn-warning">
                          <Link to={`/EditRoom/${dept.Room_Id}`}>Edit</Link>
                        </button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button className="btn btn-danger">
                          <Link to={`/DeleteRoomData/${dept.Room_Id}`}>
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

export default RoomComponent;
