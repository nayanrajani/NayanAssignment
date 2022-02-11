import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class EditRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Room_Id: "",
      Room_no: "",
      Room_type: "",
      Room_floor: "",
      Room_bed: "",
      Room_charges: "",

      Roomdetails: [],
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
        .getRoomDatabyID(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let RoomBody = resp.data.rows;
          console.log(RoomBody);
          this.setState({ Room_Id: RoomBody.Room_Id });
          this.setState({ Room_no: RoomBody.Room_no });
          this.setState({ Room_type: RoomBody.Room_type });
          this.setState({ Room_floor: RoomBody.Room_floor });
          this.setState({ Room_bed: RoomBody.Room_bed });
          this.setState({ Room_charges: RoomBody.Room_charges });
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
    } else if (
      this.state.Room_type === "" ||
      this.state.Room_type === undefined
    ) {
      errors.Room_type = "Please Enter a valid Room Type";
    } else if (
      this.state.Room_floor === "" ||
      this.state.Room_floor === 0 ||
      this.state.Room_floor === undefined
    ) {
      errors.Room_floor = "Please Enter a valid Room Floor";
    } else if (
      this.state.Room_bed === "" ||
      this.state.Room_bed === undefined
    ) {
      errors.Room_bed = "Please Enter a valid Room Bed";
    } else if (
      this.state.Room_charges === "" ||
      this.state.Room_charges === 0
    ) {
      errors.Room_charges = "Please Enter a valid Room Charges";
    } else {
      console.log(`this is RoomBody change in save- ${this.state.Room_no}`);
      console.log(`this is RoomBody change in save- ${this.state.Room_type}`);

      let RoomBody = {
        Room_Id: this.state.Room_Id,
        Room_no: this.state.Room_no,
        Room_type: this.state.Room_type,
        Room_floor: this.state.Room_floor,
        Room_bed: this.state.Room_bed,
        Room_charges: this.state.Room_charges,
      };
      console.log(`this is RoomBody change- ${JSON.stringify(RoomBody)}`);
      console.log("Inside double Save!!");
      this.serv
        .putRoomData(RoomBody.Room_Id, RoomBody)
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
    return (
      <div className="container">
        <h4>Edit Roomdetails Details</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Room_Id">Room_Id</label>
            <input
              type="text"
              name="Room_Id"
              className="form-control"
              value={this.state.Room_Id}
              readOnly={true}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Room_no">Room_no</label>
            <input
              type="text"
              name="Room_no"
              className="form-control"
              value={this.state.Room_no}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Room_no}</div>

          <div className="form-group">
            <label htmlFor="Room_type">Room_type</label>
            <input
              type="text"
              name="Room_type"
              className="form-control"
              value={this.state.Room_type}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Room_type}</div>

          <div className="form-group">
            <label htmlFor="Room_floor">Room_floor</label>
            <input
              type="text"
              name="Room_floor"
              className="form-control"
              value={this.state.Room_floor}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Room_floor}</div>

          <div className="form-group">
            <label htmlFor="Room_bed">Room_bed</label>
            <input
              type="text"
              name="Room_bed"
              className="form-control"
              value={this.state.Room_bed}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Room_bed}</div>

          <div className="form-group">
            <label htmlFor="Room_charges">Room_charges</label>
            <input
              type="number"
              name="Room_charges"
              className="form-control"
              value={this.state.Room_charges}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Room_charges}</div>

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

export default EditRoomComponent;
