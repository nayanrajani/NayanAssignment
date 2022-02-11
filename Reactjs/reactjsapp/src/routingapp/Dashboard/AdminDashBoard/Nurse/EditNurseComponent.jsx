import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Gender } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class EditNurseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Nurse_id: "",
      Nurse_Name: "",
      Nurse_Email: "",
      Nurse_Age: 0,
      // Nurse_Gender: "",
      Nurse_Address: "",
      Nurse_Phoneno: "",
      Nurse_Addhaar: "",
      // Nurse_Room: "",
      Nurse_salary: "",

      NurseDetails: [],
      columnHeaders: [],
      message: "",
      errors: {},
      /////////
      GenderRecall: "",
      DropGender: Gender,
      ///////////
      RoomDetails: [],
      RoomRecall: "",
      DropRoom: [],
    };
    this.serv = new SecureCallService();
  }

  getNurseValues() {
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
        .getNurseDatabyID(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let NurseData = resp.data.rows;
          console.log(NurseData);
          this.setState({ Nurse_id: NurseData.Nurse_id });
          this.setState({ Nurse_Name: NurseData.Nurse_Name });
          this.setState({ Nurse_Email: NurseData.Nurse_Email });
          this.setState({ Nurse_Age: NurseData.Nurse_Age });
          this.setState({ GenderRecall: NurseData.Nurse_Gender });
          this.setState({ Nurse_Address: NurseData.Nurse_Address });
          this.setState({ Nurse_Phoneno: NurseData.Nurse_Phoneno });
          this.setState({ Nurse_Addhaar: NurseData.Nurse_Addhaar });
          this.setState({ RoomRecall: NurseData.Nurse_Room });
          this.setState({ Nurse_salary: NurseData.Nurse_salary });
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
  }
  getRoomValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getRoomData(token)
        .then((resp) => {
          this.setState({ RoomDetails: resp.data.message });
          this.setState({ message: `Data Received Successfully` });
          this.setState(
            { columnHeaders: Object.keys(this.state.RoomDetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
          this.setState({
            DropRoom: this.state.RoomDetails.map(
              (item) =>
                //"RoomNo.: " +
                item.Room_no
              // +
              // ", " +
              // "Type: " +
              // item.Room_type +
              // ", " +
              // "Charges: " +
              // item.Room_charges
            ),
          });
          console.log(this.state.DropRoom);
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  componentDidMount = () => {
    this.getNurseValues();
    this.getRoomValues();
  };

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  getselectedgender = (gender) => {
    this.setState({ GenderRecall: gender });
  };

  RoomDropdownSelected = (Room) => {
    if (Room === "Select-Room") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Room);
      this.setState({ RoomRecall: Room });
    }
  };
  clear = () => {
    // this.setState({ Nurse_id: 0 });
    this.setState({ Nurse_Name: "" });
    this.setState({ Nurse_Email: "" });
    this.setState({ Nurse_Age: 0 });
    this.setState({ Nurse_Gender: "" });
    this.setState({ Nurse_Address: "" });
    this.setState({ Nurse_Phoneno: "" });
    this.setState({ Nurse_Addhaar: "" });
    this.setState({ Nurse_Room: "" });
    this.setState({ Nurse_salary: "" });
  };
  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Nurse_Name: "" });
    this.setState({ Nurse_Email: "" });
    this.setState({ Nurse_Age: 0 });
    this.setState({ Nurse_Gender: "" });
    this.setState({ Nurse_Address: "" });
    this.setState({ Nurse_Phoneno: "" });
    this.setState({ Nurse_Addhaar: "" });
    this.setState({ Nurse_Room: "" });
    this.setState({ Nurse_salary: "" });
    this.props.history.push("/Nurse");
  };

  save = () => {
    let errors = {};
    if (this.state.Nurse_id === "" || this.state.Nurse_id === 0) {
      errors.Nurse_id = "Please Enter a valid Nurse Id";
    } else if (
      this.state.Nurse_Name === "" ||
      this.state.Nurse_Name === undefined
    ) {
      errors.Nurse_Name = "Please Enter a valid Nurse Name";
    } else if (this.state.Nurse_Age === "" || this.state.Nurse_Age === 0) {
      errors.Nurse_Age = "Please Enter a valid Nurse Age";
    } else if (
      this.state.Nurse_Address === "" ||
      this.state.Nurse_Address === undefined
    ) {
      errors.Nurse_Address = "Please Enter a valid Nurse Address";
    } else if (
      this.state.Nurse_Phoneno === "" ||
      this.state.Nurse_Phoneno === 0
    ) {
      errors.Nurse_Phoneno = "Please Enter a valid Nurse Phone number";
    } else if (
      this.state.Nurse_salary === "" ||
      this.state.Nurse_salary === 0
    ) {
      errors.Nurse_salary = "Please Enter a valid Nurse Salary";
    } else {
      console.log(`this is NurseData change in save- ${this.state.Nurse_id}`);
      console.log(`this is NurseData change in save- ${this.state.Nurse_Name}`);
      console.log(`this is NurseData change in save- ${this.state.Nurse_Age}`);

      let NurseData = {
        Nurse_id: this.state.Nurse_id,
        Nurse_Name: this.state.Nurse_Name,
        Nurse_Email: this.state.Nurse_Email,
        Nurse_Age: this.state.Nurse_Age,
        Nurse_Gender: this.state.GenderRecall,
        Nurse_Address: this.state.Nurse_Address,
        Nurse_Phoneno: this.state.Nurse_Phoneno,
        Nurse_Addhaar: this.state.Nurse_Addhaar,
        Nurse_Room: this.state.RoomRecall,
        Nurse_salary: this.state.Nurse_salary,
      };
      console.log(`this is NurseData change- ${JSON.stringify(NurseData)}`);
      console.log("Inside double Save!!");
      this.serv
        .putNurseData(NurseData.Nurse_id, NurseData)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/Nurse");
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
        <h4>Edit Nurse Details</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Nurse_id">Nurse Id</label>
            <input
              type="number"
              name="Nurse_id"
              className="form-control"
              value={this.state.Nurse_id}
              readOnly={true}
              //   onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Nurse_Name">Nurse Name</label>
            <input
              type="text"
              name="Nurse_Name"
              className="form-control"
              value={this.state.Nurse_Name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_Name}
          </strong>

          <div className="form-group">
            <label htmlFor="Nurse_Email">Nurse Email</label>
            <input
              type="email"
              name="Nurse_Email"
              className="form-control"
              value={this.state.Nurse_Email}
              onChange={this.handleAllChanges.bind(this)}
            />
            <div className="form-group">
              <label htmlFor="Nurse_Age">Nurse Age</label>
              <input
                type="number"
                name="Nurse_Age"
                className="form-control"
                value={this.state.Nurse_Age}
                onChange={this.handleAllChanges.bind(this)}
                min={0}
              />
            </div>
            <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_Age}
          </strong>

            <div className>
              <label>Gender</label>
              <DropDownComponent
                dataSource={this.state.DropGender}
                stateProperty={this.state.GenderRecall}
                selectedValue={this.getselectedgender.bind(this)}
              ></DropDownComponent>
            </div>
            <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_Gender}
          </strong>

            <div className="form-group">
              <label htmlFor="Nurse_Address">Nurse Address</label>
              <input
                type="text"
                name="Nurse_Address"
                className="form-control"
                value={this.state.Nurse_Address}
                onChange={this.handleAllChanges.bind(this)}
              />
            </div>
            <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_Address}
          </strong>

            <div className="form-group">
              <label htmlFor="Nurse_Phoneno">Nurse Phoneno</label>
              <input
                type="number"
                name="Nurse_Phoneno"
                className="form-control"
                value={this.state.Nurse_Phoneno}
                onChange={this.handleAllChanges.bind(this)}
                min={0}
              />
            </div>
            <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_Phoneno}
          </strong>

            <div className="form-group">
              <label htmlFor="Nurse_Addhaar">Nurse Addhaar</label>
              <input
                type="number"
                name="Nurse_Addhaar"
                className="form-control"
                value={this.state.Nurse_Addhaar}
                onChange={this.handleAllChanges.bind(this)}
                min={0}
              />
            </div>

            <div className>
              <label>Nurse Room</label>
              <DropDownComponent
                dataSource={this.state.DropRoom}
                stateProperty={this.state.RoomRecall}
                selectedValue={this.RoomDropdownSelected.bind(this)}
              ></DropDownComponent>
            </div>
            <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_Room}
          </strong>

            <div className="form-group">
              <label htmlFor="Nurse_salary">Nurse Salary</label>
              <input
                type="number"
                name="Nurse_salary"
                className="form-control"
                value={this.state.Nurse_salary}
                onChange={this.handleAllChanges.bind(this)}
              />
            </div>
            <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_salary}
          </strong>
          </div>
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default EditNurseComponent;
