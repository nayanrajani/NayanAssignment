import React, { Component } from "react";
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import ResuableTable from "../../ReusableComponent/ReusableTable";

class PharmacyMedicineprovide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PharmacyMedprovide: [],
      message: "",
      columnHeaders: [],
      temp: [],
      deletebutton: true,
    };
    // this.state.columnHeaders = Object.keys(this.state.PharmacyMedprovide[0]);
    this.serv = new SecureCallService();
  }

  getMedicineValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getpharmacymedicineprovidedetailsData(token)
        .then((resp) => {
          this.setState({ PharmacyMedprovide: resp.data.message });
          this.setState({ message: `Data Fetched!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.PharmacyMedprovide[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
        //   if (CurrentRole === "Admin") {
        //     this.setState({ deletebutton: false });
        //   } else {
        //     console.log("You are not authorised to Discharge!!!");
        //   }
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  componentDidMount = () => {
    this.getMedicineValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Medicine Allotment</h2>
          <br />
          <div className="topnav">
            <Link to="/PharmacyUserDashboard">Dashboard</Link>
            <Link to="/CreatePharmacyUser"> New Medicine</Link>

          </div>
          <br />
          <div className="container">
            <center>
              <ResuableTable
                dataSource={this.state.PharmacyMedprovide}
                Id={"Patient_id"}
                showdata={this.state.deletebutton}
                route={"AddPharmacyBill"}
                btnEdit={"Edit"}
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
                {this.state.PharmacyMedprovide.map((dept, idx) => (
                  <tr key={idx}>
                    {this.state.columnHeaders.map((head, i) => (
                      <td key={i}>
                        <center>{dept[head]}</center>
                      </td>
                    ))}
                    <td>
                      <button className="btn btn-warning">
                        <Link to={`/EditMedicine/${dept.Order_id}`}>Edit</Link>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger">
                        <Link to={`/DeleteMedicine/${dept.Order_id}`}>
                          Delete
                        </Link>
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

export default PharmacyMedicineprovide;
