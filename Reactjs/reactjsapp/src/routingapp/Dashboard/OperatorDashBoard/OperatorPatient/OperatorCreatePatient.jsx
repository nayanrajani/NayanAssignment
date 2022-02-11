import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Disease, Gender, Ward } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class OperatorCreatePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   Patient_id: "",
      Patient_Name: "",
      Patient_Email: "",
      Patient_Age: 0,
      Patient_Gender: Gender,
      Patient_Address: "",
      Patient_Phoneno: "",
      Patient_Addhaar: "",
      Patient_Disease: Disease,
      Patient_Ward_type: Ward,
      Patient_Room_no: "",
      Doctor_id: "",

      Patientdetails: [],
      columnHeaders: [],
      message: "",
      errors: {},
      ////////
      GenderCall: "",
      DiseaseCall: "",
      ////
      WardCall: "",
      /////
      Doctordetails: [],
      DoctorCall: [],
      DoctorDrop: "",
      //////
      RoomDetails: [],
      RoomCall: [],
      RoomDrop: "",
    };
    this.serv = new SecureCallService();
  }

  getDoctorValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getDoctorData(token)
        .then((resp) => {
          this.setState({ Doctordetails: resp.data.message });
          this.setState({ message: `Data Received Successfully` });
          this.setState(
            { columnHeaders: Object.keys(this.state.Doctordetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
          this.setState({
            DoctorCall: this.state.Doctordetails.map(
              (item) =>
                // "Name: " +
                item.Doctor_id + " " + item.Doctor_Name
              // "Specialization: " +
              // item.Doctor_Specialization
            ),
          });
          console.log(this.state.DoctorCall);
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
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
            RoomCall: this.state.RoomDetails.map(
              (item) =>
                // "RoomNo.: " +
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

  componentDidMount = () => {
    this.getDoctorValues();
    this.getRoomValues();
  };

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
  DiseaseDropdownSelected = (disease) => {
    if (disease === "Select-Disease") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(disease);
      this.setState({ DiseaseCall: disease });
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

  WardDropdownSelected = (Ward) => {
    if (Ward === "Select-Ward") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Ward);
      this.setState({ WardCall: Ward });
    }
  };

  DoctorDropDownSelected = (doctor) => {
    console.log(doctor);
    let docid = doctor.split(" ")[0];
    console.log(docid);
    // this.setState({ DoctorDrop: docid });
    this.setState({Doctor_id: docid});
    this.setState({ DoctorDrop: doctor });
  };

  clear = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Patient_Name: "" });
    this.setState({ Patient_Email: "" });
    this.setState({ Patient_Age: 0 });
    // this.setState({ Patient_Gender: "" });
    this.setState({ Patient_Address: "" });
    this.setState({ Patient_Phoneno: "" });
    this.setState({ Patient_Addhaar: "" });
    // this.setState({ Patient_Disease: "" });
    // this.setState({ Patient_Ward_type: "" });
    // this.setState({ Patient_Room_no: "" });
  };

  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Patient_Name: "" });
    this.setState({ Patient_Email: "" });
    this.setState({ Patient_Age: 0 });
    this.setState({ Patient_Gender: "" });
    this.setState({ Patient_Address: "" });
    this.setState({ Patient_Phoneno: "" });
    this.setState({ Patient_Addhaar: "" });
    this.setState({ Patient_Disease: "" });
    this.setState({ Patient_Ward_type: "" });
    this.setState({ Patient_Room_no: "" });
    this.props.history.push("/operatorDashboard");
  };

  save = () => {
    let errors = {};
    if (
      this.state.Patient_Name === "" ||
      this.state.Patient_Name === undefined
    ) {
      errors.Patient_Name = "Please Enter a valid Patient Name";
    }
    if (this.state.Patient_Age === "" || this.state.Patient_Age === 0) {
      errors.Patient_Age = "Please Enter a valid Patient Age";
    }
    if (this.state.Patient_Phoneno === "" || this.state.Patient_Phoneno === 0) {
      errors.Patient_Phoneno = "Please Enter a valid Patient Phoneno";
    }
    if (
      this.state.Patient_Address === "" ||
      this.state.Patient_Address === undefined
    ) {
      errors.Patient_Address = "Please Enter a valid Patient Address";
    } else {
      console.log(`this is Patient change in save- ${this.state.Patient_Name}`);
      console.log(`this is Patient change in save- ${this.state.Patient_Age}`);
      console.log(
        `this is Patient change in save- ${this.state.Patient_Room_no}`
      );

      let Patient = {
        Patient_Name: this.state.Patient_Name,
        Patient_Email: this.state.Patient_Email,
        Patient_Age: this.state.Patient_Age,
        Patient_Gender: this.state.GenderCall,
        Patient_Address: this.state.Patient_Address,
        Patient_Phoneno: this.state.Patient_Phoneno,
        Patient_Addhaar: this.state.Patient_Addhaar,
        Patient_Disease: this.state.DiseaseCall,
        Patient_Ward_type: this.state.WardCall,
        Patient_Room_no: this.state.RoomDrop,
        Doctor_id: this.state.Doctor_id,
      };
      console.log(`this is Patient change- ${JSON.stringify(Patient)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddPatientData(Patient)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          let CurrentRole = sessionStorage.getItem("Role");
          console.log(
            `You have this role - ${CurrentRole}, we will redirect you to ${CurrentRole} panel`
          );
          // alert(
          //   `You have this role - ${CurrentRole}, we will redirect you to ${CurrentRole} panel`
          // );
          if (CurrentRole === "Admin") {
            this.props.history.push("/Dashboard");
          }
          if (CurrentRole === "Doctor") {
            this.props.history.push("/DoctorDashboard");
          }
          if (CurrentRole === "Operator") {
            this.props.history.push("/operatorDashboard");
          }
          // this.props.history.push("/Patient");
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error}` });
        });
    }
    this.setState({
      errors: errors,
    });
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
        <center>
          <h4>Add New Patient</h4>
        </center>
        <hr />
        <h6>Fields with * are mandatory</h6>
        <form>
          <div className="form-group">
            <label htmlFor="Patient_Name">Patient Name *</label>
            <input
              type="text"
              name="Patient_Name"
              className="form-control"
              value={this.Capitalize(this.state.Patient_Name)}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Patient_Name}</div>
          <div className="form-group">
            <label htmlFor="Patient_Email">Patient Email</label>
            <input
              type="email"
              name="Patient_Email"
              className="form-control"
              value={this.state.Patient_Email}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Patient_Age">Patient Age *</label>
            <input
              type="number"
              name="Patient_Age"
              className="form-control"
              value={this.state.Patient_Age}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <div className="text-danger">{this.state.errors.Patient_Age}</div>

          <div className="form-group">
            <label>Patient Gender</label>
            <DropDownComponent
              dataSource={this.state.Patient_Gender}
              stateProperty={this.state.GenderCall}
              selectedValue={this.GenderDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Patient_Gender}</div>
          <div className="form-group">
            <label htmlFor="Patient_Address">Patient Address *</label>
            <input
              type="text"
              name="Patient_Address"
              className="form-control"
              value={this.state.Patient_Address}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Patient_Address}</div>
          <div className="form-group">
            <label htmlFor="Patient_Phoneno">Patient Phoneno *</label>
            <input
              type="number"
              name="Patient_Phoneno"
              className="form-control"
              value={this.state.Patient_Phoneno}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Patient_Phoneno}</div>
          <div className="form-group">
            <label htmlFor="Patient_Addhaar">Patient Addhaar</label>
            <input
              type="number"
              name="Patient_Addhaar"
              className="form-control"
              value={this.state.Patient_Addhaar}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>

          <div>
            <label for="Disease">Patient Disease</label>
            <DropDownComponent
              dataSource={this.state.Patient_Disease}
              stateProperty={this.state.DiseaseCall}
              selectedValue={this.DiseaseDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Patient_Disease}</div>

          <div className="form-group">
            <label>Patient Ward type</label>
            <DropDownComponent
              dataSource={this.state.Patient_Ward_type}
              stateProperty={this.state.WardCall}
              selectedValue={this.WardDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">
            {this.state.errors.Patient_Ward_type}
          </div>

          <div className>
            <label>Patient Room no*</label>
            <DropDownComponent
              dataSource={this.state.RoomCall}
              stateProperty={this.state.RoomDrop}
              selectedValue={this.RoomDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Patient_Room_no}</div>
          <div className>
            <label>DoctorName</label>
            <DropDownComponent
              dataSource={this.state.DoctorCall}
              stateProperty={this.state.DoctorDrop}
              selectedValue={this.DoctorDropDownSelected.bind(this)}
            ></DropDownComponent>
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

export default OperatorCreatePatient;
