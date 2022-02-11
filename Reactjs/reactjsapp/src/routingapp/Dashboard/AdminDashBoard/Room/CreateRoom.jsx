import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class CreateRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Room_Id: "",
      Room_no: "",
      Room_type: "",
      Room_floor: "",
      Room_bed: "",
      Room_charges: "",

      Room: [],
      columnHeaders: [],
      message: "",
      errors: {},
    };
    this.serv = new SecureCallService();
  }

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  clear = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Room_no: "" });
    this.setState({ Room_type: "" });
    this.setState({ Room_floor: "" });
    this.setState({ Room_bed: "" });
    this.setState({ Room_charges: "" });
  };

  CancelButton = () => {
    this.setState({ Room_no: "" });
    this.setState({ Room_type: "" });
    this.setState({ Room_floor: "" });
    this.setState({ Room_bed: "" });
    this.setState({ Room_charges: "" });
    this.props.history.push("/Room");
  };

  save = () => {
    let errors = {};

    if (
      this.state.Room_no === "" ||
      this.state.Room_no === 0 ||
      this.state.Room_no === undefined
    ) {
      errors.Room_no = "Please Enter a valid Room";
    }
    if (this.state.Room_type === "" || this.state.Room_type === undefined) {
      errors.Room_type = "Please Enter a valid Room Type";
    }
    if (
      this.state.Room_floor === "" ||
      this.state.Room_floor === 0 ||
      this.state.Room_floor === undefined
    ) {
      errors.Room_floor = "Please Enter a valid Room Floor";
    }
    if (this.state.Room_bed === "" || this.state.Room_bed === undefined) {
      errors.Room_bed = "Please Enter a valid Room Bed";
    }
    if (this.state.Room_charges === "" || this.state.Room_charges === 0) {
      errors.Room_charges = "Please Enter a valid Room Charges";
    } else {
      // console.log(`this is RoomBody change in save- ${this.state.Ward_Type}`);
      // console.log(`this is RoomBody change in save- ${this.state.Ward_Contact}`);

      let RoomBody = {
        Room_no: this.state.Room_no,
        Room_type: this.state.Room_type,
        Room_floor: this.state.Room_floor,
        Room_bed: this.state.Room_bed,
        Room_charges: this.state.Room_charges,
      };
      console.log(`this is RoomBody change- ${JSON.stringify(RoomBody)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddRoomData(RoomBody)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/Room");
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
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    }
    return (
      <div className="container">
        <h4>Add New Room</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Room_no">Room no</label>
            <input
              type="text"
              name="Room_no"
              className="form-control"
              value={this.state.Room_no}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Room_no}
          </strong>

          <div className="form-group">
            <label htmlFor="Room_type">Room type</label>
            <input
              type="text"
              name="Room_type"
              className="form-control"
              value={this.state.Room_type}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Room_type}
          </strong>

          <div className="form-group">
            <label htmlFor="Room_floor">Room floor</label>
            <input
              type="text"
              name="Room_floor"
              className="form-control"
              value={this.state.Room_floor}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Room_floor}
          </strong>

          <div className="form-group">
            <label htmlFor="Room_bed">Room bed</label>
            <input
              type="text"
              name="Room_bed"
              className="form-control"
              value={this.state.Room_bed}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Room_bed}
          </strong>

          <div className="form-group">
            <label htmlFor="Room_charges">Room charges</label>
            <input
              type="text"
              name="Room_charges"
              className="form-control"
              value={this.state.Room_charges}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Room_charges}
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

export default CreateRoomComponent;
