import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { DoctorType, Gender } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class CreateDoctorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   Patient_id: "",
      Doctor_id: "",
      Doctor_Name: "",
      Doctor_Email: "",
      Doctor_Age: 0,
      Doctor_Gender: Gender,
      Doctor_Address: "",
      Doctor_Phoneno: "",
      Doctor_Addhaar: "",
      Doctor_type: DoctorType,
      Doctor_Specialization: "",
      Doctor_Charges: 0,

      Doctordetails: [],
      columnHeaders: [],
      message: "",
      errors: {},
      ////////
      DoctorTypeCall: "",
      ////////
      GenderCall: "",
    };
    this.serv = new SecureCallService();
  }

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  DoctorTypeDropdownSelected = (Type) => {
    if (Type === "Select-Type") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Type);
      this.setState({ DoctorTypeCall: Type });
    }
  };

  GenderDropdownSelected = (gender) => {
    if (gender === "Select-Gender") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(gender);
      this.setState({ GenderCall: gender });
    }
  };
  clear = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Doctor_Name: "" });
    this.setState({ Doctor_Email: "" });
    this.setState({ Doctor_Age: 0 });
    this.setState({ Doctor_Gender: "" });
    this.setState({ Doctor_Address: "" });
    this.setState({ Doctor_Phoneno: "" });
    this.setState({ Doctor_Addhaar: "" });
    this.setState({ Doctor_type: "" });
    this.setState({ Doctor_Specialization: "" });
    this.setState({ Doctor_Charges: 0 });
  };

  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Doctor_Name: "" });
    this.setState({ Doctor_Email: "" });
    this.setState({ Doctor_Age: 0 });
    this.setState({ Doctor_Gender: "" });
    this.setState({ Doctor_Address: "" });
    this.setState({ Doctor_Phoneno: "" });
    this.setState({ Doctor_Addhaar: "" });
    this.setState({ Doctor_type: "" });
    this.setState({ Doctor_Specialization: "" });
    this.setState({ Doctor_Charges: 0 });
    this.props.history.push("/Doctor");
  };

  save = () => {
    let errors = {};
    if (this.state.Doctor_Name === "" || this.state.Doctor_Name === undefined) {
      errors.Doctor_Name = "Please Enter a valid Doctor Name";
    }
    if (this.state.Doctor_Age === "" || this.state.Doctor_Age === 0) {
      errors.Doctor_Age = "Please Enter a valid Doctor Age";
    }
    if (
      this.state.Doctor_Email === "" ||
      this.state.Doctor_Email === undefined
    ) {
      errors.Doctor_Email = "Please Enter a valid Doctor Email";
    }

    if (this.state.Doctor_Phoneno === "" || this.state.Doctor_Phoneno === 0) {
      errors.Doctor_Phoneno = "Please Enter a valid Doctor Phoneno";
    }
    if (
      this.state.Doctor_Address === "" ||
      this.state.Doctor_Address === undefined
    ) {
      errors.Doctor_Address = "Please Enter a valid Doctor Address";
    }
    if (
      this.state.Doctor_Specialization === "" ||
      this.state.Doctor_Specialization === undefined
    ) {
      errors.Doctor_Specialization =
        "Please Enter a valid Doctor Specialization";
    }
    if (this.state.Doctor_Charges === "" || this.state.Doctor_Charges === 0) {
      errors.Doctor_Charges = "Please Enter a valid Doctor Charges";
    } else {
      console.log(`this is Doctor change in save- ${this.state.Doctor_Name}`);
      console.log(`this is Doctor change in save- ${this.state.Doctor_Age}`);
      console.log(
        `this is Doctor change in save- ${this.state.Doctor_Charges}`
      );

      let Doctor = {
        Doctor_Name: this.state.Doctor_Name,
        Doctor_Email: this.state.Doctor_Email,
        Doctor_Age: this.state.Doctor_Age,
        Doctor_Gender: this.state.GenderCall,
        Doctor_Address: this.state.Doctor_Address,
        Doctor_Phoneno: this.state.Doctor_Phoneno,
        Doctor_Addhaar: this.state.Doctor_Addhaar,
        Doctor_type: this.state.DoctorTypeCall,
        Doctor_Specialization: this.state.Doctor_Specialization,
        Doctor_Charges: this.state.Doctor_Charges,
      };
      console.log(`this is Doctor change- ${JSON.stringify(Doctor)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddDoctorData(Doctor)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/Doctor");
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
        <h4>Add New Doctor</h4>
        <form>
          {/* <div className="form-group">
            <label htmlFor="Patient_id">Patient_id</label>
            <input
              type="number"
              name="Patient_id"
              className="form-control"
              value={this.state.Patient_id}
              readOnly={true}
              //   onChange={this.handleAllChanges.bind(this)}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="Doctor_Name">Doctor_Name</label>
            <input
              type="text"
              name="Doctor_Name"
              className="form-control"
              value={this.state.Doctor_Name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Doctor_Name}</div>
          <div className="form-group">
            <label htmlFor="Doctor_Email">Doctor_Email</label>
            <input
              type="email"
              name="Doctor_Email"
              className="form-control"
              value={this.state.Doctor_Email}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Doctor_Email}</div>
          <div className="form-group">
            <label htmlFor="Doctor_Age">Doctor_Age</label>
            <input
              type="number"
              name="Doctor_Age"
              className="form-control"
              value={this.state.Doctor_Age}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Doctor_Age}</div>
          {/* <div className="form-group">
            <label htmlFor="Doctor_Gender">Doctor_Gender</label>
            <input
              type="text"
              name="Doctor_Gender"
              className="form-control"
              value={this.state.Doctor_Gender}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div> */}
          <div className="form-group">
            <label>Patient_Gender</label>
            <DropDownComponent
              dataSource={this.state.Doctor_Gender}
              stateProperty={this.state.GenderCall}
              selectedValue={this.GenderDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Doctor_Gender}</div>
          <div className="form-group">
            <label htmlFor="Doctor_Address">Doctor_Address</label>
            <input
              type="text"
              name="Doctor_Address"
              className="form-control"
              value={this.state.Doctor_Address}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Doctor_Address}</div>
          <div className="form-group">
            <label htmlFor="Doctor_Phoneno">Doctor_Phoneno</label>
            <input
              type="number"
              name="Doctor_Phoneno"
              className="form-control"
              value={this.state.Doctor_Phoneno}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Doctor_Phoneno}</div>

          <div className="form-group">
            <label htmlFor="Doctor_Addhaar">Doctor_Addhaar</label>
            <input
              type="number"
              name="Doctor_Addhaar"
              className="form-control"
              value={this.state.Doctor_Addhaar}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Doctor_Addhaar}</div>

          {/* <div className="form-group">
            <label htmlFor="Doctor_type">Doctor_type</label>
            <input
              type="text"
              name="Doctor_type"
              className="form-control"
              value={this.state.Doctor_type}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div> */}
          <div className="form-group">
            <label>Doctor_type *</label>
            <DropDownComponent
              dataSource={this.state.Doctor_type}
              stateProperty={this.state.DoctorTypeCall}
              selectedValue={this.DoctorTypeDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Doctor_type}</div>

          <div className="form-group">
            <label htmlFor="Doctor_Specialization">Doctor_Specialization</label>
            <input
              type="text"
              name="Doctor_Specialization"
              className="form-control"
              value={this.state.Doctor_Specialization}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">
            {this.state.errors.Doctor_Specialization}
          </div>
          <div className="form-group">
            <label htmlFor="Doctor_Charges">Doctor_Charges</label>
            <input
              type="number"
              name="Doctor_Charges"
              className="form-control"
              value={this.state.Doctor_Charges}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Doctor_Charges}</div>

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

export default CreateDoctorComponent;
