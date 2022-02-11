import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Gender } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class CreateNurseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   Nurse_id: "",
      Nurse_Name: "",
      Nurse_Email: "",
      Nurse_Age: 0,
      Nurse_Gender: Gender,
      Nurse_Address: "",
      Nurse_Phoneno: "",
      Nurse_Addhaar: "",
      Nurse_Room: "",
      Nurse_salary: "",

      NurseBody: [],
      columnHeaders: [],
      message: "",
      errors: {},
      ////////
      GenderCall: "",
      //////
      RoomDetails: [],
      RoomCall: [],
      RoomDrop: "",
    };
    this.serv = new SecureCallService();
  }

  componentDidMount = () => {
    this.getRoomValues();
  };

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
          this.setState({ RoomDetails: resp.data.message });
          this.setState({ message: `Data Received Successfully` });
          this.setState(
            { columnHeaders: Object.keys(this.state.RoomDetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
          this.setState({
            RoomCall: this.state.RoomDetails.map(
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
          console.log(this.state.RoomCall);
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  GenderDropdownSelected = (gender) => {
    if (gender === "Select-Gender") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(gender);
      this.setState({ GenderCall: gender });
    }
  };

  RoomDropdownSelected = (Room) => {
    if (Room === "Select-Room") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Room);
      this.setState({ RoomDrop: Room });
    }
  };

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
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
    }
    if (this.state.Nurse_Name === "" || this.state.Nurse_Name === undefined) {
      errors.Nurse_Name = "Please Enter a valid Nurse Name";
    }

    if (this.state.Nurse_Age === "" || this.state.Nurse_Age === 0) {
      errors.Nurse_Age = "Please Enter a valid Nurse Age";
    }
    if (
      this.state.Nurse_Address === "" ||
      this.state.Nurse_Address === undefined
    ) {
      errors.Nurse_Address = "Please Enter a valid Nurse Address";
    }
    if (this.state.Nurse_Phoneno === "" || this.state.Nurse_Phoneno === 0) {
      errors.Nurse_Phoneno = "Please Enter a valid Nurse Phone number";
    }

    if (this.state.Nurse_salary === "" || this.state.Nurse_salary === 0) {
      errors.Nurse_salary = "Please Enter a valid Nurse Salary";
    } else {
      console.log(`this is NurseData change in save- ${this.state.Nurse_Name}`);
      console.log(`this is NurseData change in save- ${this.state.Nurse_Age}`);

      let NurseData = {
        Nurse_Name: this.state.Nurse_Name,
        Nurse_Email: this.state.Nurse_Email,
        Nurse_Age: this.state.Nurse_Age,
        Nurse_Gender: this.state.GenderCall,
        Nurse_Address: this.state.Nurse_Address,
        Nurse_Phoneno: this.state.Nurse_Phoneno,
        Nurse_Addhaar: this.state.Nurse_Addhaar,
        Nurse_Room: this.state.RoomDrop,
        Nurse_salary: this.state.Nurse_salary,
      };
      console.log(`this is NurseData change- ${JSON.stringify(NurseData)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddNurseData(NurseData)
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
        <h4>Add New NurseData</h4>
        <form>
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
          </div>

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

          <div className="form-group">
            <label>Nurse Gender</label>
            <DropDownComponent
              dataSource={this.state.Nurse_Gender}
              stateProperty={this.state.GenderCall}
              selectedValue={this.GenderDropdownSelected.bind(this)}
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
              dataSource={this.state.RoomCall}
              stateProperty={this.state.RoomDrop}
              selectedValue={this.RoomDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_Room}
          </strong>

          <div className="form-group">
            <label htmlFor="Nurse_salary">Nurse Salary</label>
            <input
              type="text"
              name="Nurse_salary"
              className="form-control"
              value={this.state.Nurse_salary}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Nurse_salary}
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

export default CreateNurseComponent;
