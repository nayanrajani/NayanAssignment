import React, { Component } from "react";
import { SecureCallService } from "../../../HTTPandSERVICE/services/secureservice";
import Tablereusable from "./ReusableTable";

class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      message: "",
      columnHeaders: [],
    };
    this.serv = new SecureCallService();
  }
  componentDidMount = () => {
    let token = sessionStorage.getItem("token");
    this.serv.getPatientData(token).then((resp) => {
      this.setState({ body: resp.data.message });
      this.setState({ message: `Data Received Successfully` });
      this.setState({ columnHeaders: Object.keys(this.state.body[0]) }, () => {
        console.log(`Columns ${this.state.columnHeaders}`);
      });
    });
  };
  render() {
    return (
      <div>
        {this.state.body.length > 0 ? (
          <Tablereusable
            body={this.state.body}
            headers={this.state.columnHeaders}
            pkid="Patient_id"
          ></Tablereusable>
        ) : null}
      </div>
    );
  }
}

export default Temp;
