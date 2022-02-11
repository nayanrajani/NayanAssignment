import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class EditWardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Ward_no: "",
      Ward_Type: "",
      Ward_Contact: "",

      Ward: [],
      columnHeaders: [],
      message: "",
      errors: {},
    };
    this.serv = new SecureCallService();
  }

  componentDidMount = () => {
    // read the Route Parameter
    let pid = this.props.match.params.id;
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getWardDatabyID(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let WardBody = resp.data.rows;
          console.log(WardBody);
          this.setState({ Ward_no: WardBody.Ward_no });
          this.setState({ Ward_Type: WardBody.Ward_Type });
          this.setState({ Ward_Contact: WardBody.Ward_Contact });
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
  };

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  clear = () => {
    // this.setState({ Ward_no: 0 });
    this.setState({ Ward_Type: "" });
    this.setState({ Ward_Contact: "" });
  };

  CancelButton = () => {
    this.setState({ Ward_Type: "" });
    this.setState({ Ward_Contact: "" });
    this.props.history.push("/Ward");
  };

  save = () => {
    let errors = {};

    if (
      this.state.Ward_Type === "" ||
      this.state.Ward_Type === 0 ||
      this.state.Ward_Type === undefined
    ) {
      errors.Ward_Type = "Please Enter a valid Ward Type";
    } else if (
      this.state.Ward_Contact === "" ||
      this.state.Ward_Contact === 0
    ) {
      errors.Ward_Contact = "Please Enter a valid Ward Contact";
    } else {
      console.log(`this is WardBody change in save- ${this.state.Ward_no}`);
      console.log(`this is WardBody change in save- ${this.state.Ward_Type}`);

      let WardBody = {
        Ward_no: this.state.Ward_no,
        Ward_Type: this.state.Ward_Type,
        Ward_Contact: this.state.Ward_Contact,
      };
      console.log(`this is WardBody change- ${JSON.stringify(WardBody)}`);
      console.log("Inside double Save!!");
      this.serv
        .putWardData(WardBody.Ward_no, WardBody)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/Ward");
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error}` });
        });
    }
    this.setState({
      errors: errors,
    });
  };

  render() {
    return (
      <div className="container">
        <h4>Edit Ward Details</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Ward_no">Ward no</label>
            <input
              type="number"
              name="Ward_no"
              className="form-control"
              value={this.state.Ward_no}
              readOnly={true}
              //   onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Ward_Type">Ward Type</label>
            <input
              type="text"
              name="Ward_Type"
              className="form-control"
              value={this.state.Ward_Type}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Ward_Type}
          </strong>
          <div className="form-group">
            <label htmlFor="Ward_Contact">Ward Contact</label>
            <input
              type="email"
              name="Ward_Contact"
              className="form-control"
              value={this.state.Ward_Contact}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Ward_Contact}
          </strong>
          <hr />
          <div className="btn-group">
            <input
              type="button"
              value="Clear"
              className="btn btn-primary"
              onClick={this.clear.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="button"
              value="Save"
              className="btn btn-success"
              onClick={this.save.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="button"
              value="Cancel"
              className="btn btn-warning"
              onClick={this.CancelButton.bind(this)}
            />
          </div>
        </form>
        <hr />
        <div className="container">
          <strong>{this.state.message}</strong>
        </div>
      </div>
    );
  }
}

export default EditWardComponent;
