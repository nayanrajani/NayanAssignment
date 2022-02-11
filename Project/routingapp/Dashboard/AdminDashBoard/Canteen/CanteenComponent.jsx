import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class CanteenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Canteendetails: [],
      message: "",
      columnHeaders: [],
    };
    // this.state.columnHeaders = Object.keys(this.state.Canteendetails[0]);
    this.serv = new SecureCallService();
  }

  getCanteenValues() {
    // read the token
    // let token = sessionStorage.getItem("token");
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getCanteenData(token)
        .then((resp) => {
          this.setState({ Canteendetails: resp.data.message });
          this.setState({ message: `Data Received Successfully` });
          this.setState(
            { columnHeaders: Object.keys(this.state.Canteendetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  componentDidMount = () => {
    this.getCanteenValues();
  };

  render() {
    return (
      <div>
        <center>
          <h2>Canteen Details</h2>
          <br />
          <div className="topnav">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/CreateCanteen">Add Canteendetails</Link>

            <Link to="/Patient">List of Patients</Link>

            <Link to="/WardBoy">List of WardBoy</Link>

            <Link to="/Ward">List of Ward</Link>

            <Link to="/Room">List of Room</Link>
          </div>

          <br />

          <div className="container">
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
                {this.state.Canteendetails.map((dept, idx) => (
                  <tr key={idx}>
                    {this.state.columnHeaders.map((head, i) => (
                      <td key={i}>
                        <center>{dept[head]}</center>
                      </td>
                    ))}
                    <td>
                      <center>
                        <button className="btn btn-warning">
                          <Link to={`/EditCanteen/${dept.Order_id}`}>Edit</Link>
                        </button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button className="btn btn-danger">
                          <Link to={`/DeleteCanteen/${dept.Order_id}`}>
                            Delete
                          </Link>
                        </button>
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* </tr> */}
        </center>
      </div>
    );
  }
}

export default CanteenComponent;
