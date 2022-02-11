import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";

import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import ResuableTable from "../../ReusableComponent/ReusableTable";

class BillComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BillDetails: [],
      message: "",
      columnHeaders: [],
      temp: [],
      deletebutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.BillDetails[0]);
    this.serv = new SecureCallService();
  }

  getBillValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getBillData(token)
        .then((resp) => {
          this.setState({ BillDetails: resp.data.message });
          this.setState({ message: `Data fetched!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.BillDetails[0]) },
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
  handlecreatebill = () => {
    this.props.history.push("/CreateBill");
  };

  componentDidMount = () => {
    this.getBillValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Bill Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/CreateBill">Add New Bill</Link>
            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Ward">List of Ward</Link>

            <Link to="/Room">List of Room</Link>
          </div>

          <br />
          <div className="container">
            <center>
              <ResuableTable
                dataSource={this.state.BillDetails}
                Id={"bill_no"}
                showdata={this.state.deletebutton}
                route={"EditBill"}
                btnEdit={"Edit"}
                routeDischarge={"DeleteBill"}
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
                {this.state.BillDetails.map((dept, idx) => (
                  <tr key={idx}>
                    {this.state.columnHeaders.map((head, i) => (
                      <td key={i}>
                        <center>{dept[head]}</center>
                      </td>
                    ))}
                    <td>
                      <button className="btn btn-warning">
                        <Link to={`/EditBill/${dept.bill_no}`}>Edit</Link>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger">
                        <Link to={`/DeleteBill/${dept.bill_no}`}>Delete</Link>
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

export default BillComponent;
