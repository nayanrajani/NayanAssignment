import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Gender, Ward } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class CreateStaffWardBoy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Staff_Designation: "WardBoy",
      //   Wardboy_id: "",
      Wardboy_Name: "",
      Wardboy_Email: "",
      Wardboy_Age: 0,
      Wardboy_Gender: Gender,
      Wardboy_Address: "",
      Wardboy_Phoneno: "",
      Wardboy_Addhaar: "",
      Wardboy_Ward: Ward,
      Wardboy_salary: "",

      Wardboybody: [],
      columnHeaders: [],
      message: "",
      errors: {},
      //////
      GenderCall: "",
      WardCall: "",
    };
    this.serv = new SecureCallService();
  }

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  GenderDropdownSelected = (gender) => {
    if (gender === "Select-Gender") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(gender);
      this.setState({ GenderCall: gender });
    }
  };

  WardDropdownSelected = (Ward) => {
    if (Ward === "Select-Ward") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Ward);
      this.setState({ WardCall: Ward });
    }
  };

  clear = () => {
    // this.setState({ Wardboy_id: 0 });
    this.setState({ Wardboy_Name: "" });
    this.setState({ Wardboy_Email: "" });
    this.setState({ Wardboy_Age: 0 });
    this.setState({ Wardboy_Gender: "" });
    this.setState({ Wardboy_Address: "" });
    this.setState({ Wardboy_Phoneno: "" });
    this.setState({ Wardboy_Addhaar: "" });
    this.setState({ Wardboy_Ward: "" });
    this.setState({ Wardboy_salary: "" });
  };

  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Wardboy_Name: "" });
    this.setState({ Wardboy_Email: "" });
    this.setState({ Wardboy_Age: 0 });
    this.setState({ Wardboy_Gender: "" });
    this.setState({ Wardboy_Address: "" });
    this.setState({ Wardboy_Phoneno: "" });
    this.setState({ Wardboy_Addhaar: "" });
    this.setState({ Wardboy_Ward: "" });
    this.setState({ Wardboy_salary: "" });
    this.props.history.push("/Staff");
  };
  save = () => {
    let errors = {};
    if (
      this.state.Wardboy_Name === "" ||
      this.state.Wardboy_Name === undefined
    ) {
      errors.Wardboy_Name = "Please Enter a valid Patient Name";
    }
    if (this.state.Wardboy_Age === "" || this.state.Wardboy_Age === 0) {
      errors.Wardboy_Age = "Please Enter a valid Patient Age";
    }

    if (this.state.Wardboy_Phoneno === "" || this.state.Wardboy_Phoneno === 0) {
      errors.Wardboy_Phoneno = "Please Enter a valid Patient Phoneno";
    }
    if (
      this.state.Wardboy_Address === "" ||
      this.state.Wardboy_Address === undefined
    ) {
      errors.Wardboy_Address = "Please Enter a valid Patient Address";
    }

    if (this.state.Wardboy_salary === "" || this.state.Wardboy_salary === 0) {
      errors.Wardboy_salary = "Please Enter a valid Patient Room Number";
    } else {
      console.log(
        `this is WardBoyDeta change in save- ${this.state.Wardboy_Name}`
      );
      console.log(
        `this is WardBoyDeta change in save- ${this.state.Wardboy_Age}`
      );
      console.log(
        `this is WardBoyDeta change in save- ${this.state.Wardboy_salary}`
      );

      let staffWardBoy = {
        Staff_Designation: this.state.Staff_Designation,
        Staff_Name: this.state.Wardboy_Name,
        Staff_Email: this.state.Wardboy_Email,
        Staff_Age: this.state.Wardboy_Age,
        Staff_Gender: this.state.GenderCall,
        Staff_Address: this.state.Wardboy_Address,
        Staff_Phoneno: this.state.Wardboy_Phoneno,
        Staff_Addhaar: this.state.Wardboy_Addhaar,
        Staff_Salary: this.state.Wardboy_salary,
      };
      console.log(
        `this is WardBoyDeta change- ${JSON.stringify(staffWardBoy)}`
      );
      this.serv
        .AddStaffData(staffWardBoy)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          // this.props.history.push("/Staff");
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error}` });
        });

      let WardBoyDeta = {
        Wardboy_Name: this.state.Wardboy_Name,
        Wardboy_Email: this.state.Wardboy_Email,
        Wardboy_Age: this.state.Wardboy_Age,
        Wardboy_Gender: this.state.GenderCall,
        Wardboy_Address: this.state.Wardboy_Address,
        Wardboy_Phoneno: this.state.Wardboy_Phoneno,
        Wardboy_Addhaar: this.state.Wardboy_Addhaar,
        Wardboy_Ward: this.state.WardCall,
        Wardboy_salary: this.state.Wardboy_salary,
      };
      console.log(`this is WardBoyDeta change- ${JSON.stringify(WardBoyDeta)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddWardBoyData(WardBoyDeta)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/Staff");
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
        <h4>Add New WardBoyDeta</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Wardboy_Name">Wardboy Name</label>
            <input
              type="text"
              name="Wardboy_Name"
              className="form-control"
              value={this.state.Wardboy_Name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Wardboy_Name}
          </strong>

          <div className="form-group">
            <label htmlFor="Wardboy_Email">Wardboy Email</label>
            <input
              type="email"
              name="Wardboy_Email"
              className="form-control"
              value={this.state.Wardboy_Email}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Wardboy_Age">Wardboy Age</label>
            <input
              type="number"
              name="Wardboy_Age"
              className="form-control"
              value={this.state.Wardboy_Age}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Wardboy_Age}
          </strong>

          <div className="form-group">
            <label>Wardboy Gender</label>
            <DropDownComponent
              dataSource={this.state.Wardboy_Gender}
              stateProperty={this.state.GenderCall}
              selectedValue={this.GenderDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Wardboy_Gender}
          </strong>

          <div className="form-group">
            <label htmlFor="Wardboy_Address">Wardboy Address</label>
            <input
              type="text"
              name="Wardboy_Address"
              className="form-control"
              value={this.state.Wardboy_Address}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Wardboy_Address}
          </strong>

          <div className="form-group">
            <label htmlFor="Wardboy_Phoneno">Wardboy Phoneno</label>
            <input
              type="number"
              name="Wardboy_Phoneno"
              className="form-control"
              value={this.state.Wardboy_Phoneno}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Wardboy_Phoneno}
          </strong>

          <div className="form-group">
            <label htmlFor="Wardboy_Addhaar">Wardboy Addhaar</label>
            <input
              type="number"
              name="Wardboy_Addhaar"
              className="form-control"
              value={this.state.Wardboy_Addhaar}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>

          <div className="form-group">
            <label>Wardboy Ward</label>
            <DropDownComponent
              dataSource={this.state.Wardboy_Ward}
              stateProperty={this.state.WardCall}
              selectedValue={this.WardDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Wardboy_Ward}
          </strong>

          <div className="form-group">
            <label htmlFor="Wardboy_salary">Wardboy salary</label>
            <input
              type="text"
              name="Wardboy_salary"
              className="form-control"
              value={this.state.Wardboy_salary}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Wardboy_salary}
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

export default CreateStaffWardBoy;
