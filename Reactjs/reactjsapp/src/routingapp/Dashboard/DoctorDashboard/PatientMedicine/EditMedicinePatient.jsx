import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Disease, Gender, Ward } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class EditPatientmedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
        PatientMedicine_id:"",
      Patient_id: "",
      Patient_Name: "",
      Patient_Email: "",
      Patient_Age: 0,
      // Patient_Gender: "",
      Patient_Address: "",
      Patient_Phoneno: "",
      Patient_Addhaar: "",
      // Patient_Disease: "",
      Patient_Ward_type: "",
      Patient_Room_no: 0,
      Doctor_id: "",
      Medicine_Details: "",
      Medicine_price:"",

      ///////
      hiddendocid: true,
      //////////

      columnHeaders: [],
      message: "",
      errors: {},
      /////////
      GenderRecall: "",
      DropGender: Gender,
      ///////////
      DiseaseRecall: "",
      DropDisease: Disease,
      ///////////
      WardRecall: "",
      DropWard: Ward,
      ///////////
      RoomDetails: [],
      RoomRecall: "",
      DropRoom: [],
      ////////////
      Doctordetails: [],
      DoctorRecall: "",
      DropDoctor: [],
      ///////////
      MedicineDetails: [],
      MedicineRecall: "",
      DropMedicine: [],      
    };
    this.serv = new SecureCallService();
  }

  getPatientValues() {
    // read the Route Parameter
    let pid = this.props.match.params.id;
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getpatientmedicineDatabyID(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let Patient = resp.data.rows;
          console.log(Patient);
          this.setState({PatientMedicine_id: Patient.PatientMedicine_id});
          this.setState({ Patient_id: Patient.Patient_id });
          this.setState({ Patient_Name: Patient.Patient_Name });
          this.setState({ Patient_Email: Patient.Patient_Email });
          this.setState({ Patient_Age: Patient.Patient_Age });
          this.setState({ GenderRecall: Patient.Patient_Gender });
          this.setState({ Patient_Address: Patient.Patient_Address });
          this.setState({ Patient_Phoneno: Patient.Patient_Phoneno });
          this.setState({ Patient_Addhaar: Patient.Patient_Addhaar });
          this.setState({ DiseaseRecall: Patient.Patient_Disease });
          this.setState({ WardRecall: Patient.Patient_Ward_type });
          this.setState({ RoomRecall: Patient.Patient_Room_no });
          this.setState({ DoctorRecall: Patient.Doctor_id });
          this.setState({ MedicineRecall: Patient.Medicine_Details });
          this.setState({ Medicine_price: Patient.Medicine_price });

        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
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
          this.setState({ message: `Data Fetched!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.Doctordetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
          this.setState({
            DropDoctor: this.state.Doctordetails.map(
              (item) =>
                // "Name: " +
                item.Doctor_id
              // +
              // ", " +
              // "Specialization: " +
              // item.Doctor_Specialization
            ),
          });
          console.log(this.state.DropDoctor);
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
          this.setState({ message: `Data fetched!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.RoomDetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
          this.setState({
            DropRoom: this.state.RoomDetails.map(
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
          console.log(this.state.DropRoom);
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  getMedicineValues() {
    // read the token
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getMedicineData(token)
        .then((resp) => {
          this.setState({ MedicineDetails: resp.data.message });
          this.setState({ message: `Data fetched!!` });
          this.setState(
            { columnHeaders: Object.keys(this.state.MedicineDetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
          this.setState({
            DropMedicine: this.state.MedicineDetails.map(
              (item) =>
              //   "Medicine_id.: " +
              //   item.Medicine_id
              // +
              // ", " +
              "Medicine_Name: " +
              item.Medicine_Name +
              ", " +
              "Medicine_price: " +
              item.Medicine_price
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
    this.getPatientValues();
    this.getDoctorValues();
    this.getRoomValues();
    this.getMedicineValues();
  };

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  getselectedgender = (gender) => {
    this.setState({ GenderRecall: gender });
  };
  getselecteddisease = (disease) => {
    this.setState({ DiseaseRecall: disease });
  };

  WardDropdownSelected = (Ward) => {
    if (Ward === "Select-Ward") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Ward);
      this.setState({ WardRecall: Ward });
    }
  };

  RoomDropdownSelected = (Room) => {
    if (Room === "Select-Room") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Room);
      this.setState({ RoomRecall: Room });
    }
  };

  DoctorDropDownSelected = (doctor) => {
    this.setState({ DoctorRecall: doctor });
  };

  MedicineDropdownSelected =(medicine) => {
    console.log(medicine);
    this.setState({MedicineRecall: medicine});
    let Medicineprice =  medicine.split(",")[1];
    console.log(Medicineprice);
    let priceofmedicine = Medicineprice.split(":")[1];
    console.log(priceofmedicine);
    this.setState({Medicine_price: priceofmedicine});
  }

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
    this.setState({ Patient_Room_no: 0 });
    this.props.history.push("/DoctorDashboard");
  };

  save = () => {
    let errors = {};
    if (
      this.state.Patient_Name === "" ||
      this.state.Patient_Name === undefined
    ) {
      errors.Patient_Name = "Please Enter a valid Patient Name";
    } else if (this.state.Patient_Age === "" || this.state.Patient_Age === 0) {
      errors.Patient_Age = "Please Enter a valid Patient Age";
    } else if (
      this.state.Patient_Phoneno === "" ||
      this.state.Patient_Phoneno === 0
    ) {
      errors.Patient_Phoneno = "Please Enter a valid Patient Phoneno";
    } else if (
      this.state.Patient_Address === "" ||
      this.state.Patient_Address === undefined
    ) {
      errors.Patient_Address = "Please Enter a valid Patient Address";
    } else {
      console.log(`this is Patient change in save- ${this.state.Patient_id}`);
      console.log(`this is Patient change in save- ${this.state.Patient_Name}`);
      console.log(`this is Patient change in save- ${this.state.Patient_Age}`);
      console.log(
        `this is Patient change in save- ${this.state.Patient_Room_no}`
      );

      let Patient = {
        PatientMedicine_id:this.state.PatientMedicine_id,
        Patient_id: this.state.Patient_id,
        Patient_Name: this.state.Patient_Name,
        Patient_Email: this.state.Patient_Email,
        Patient_Age: this.state.Patient_Age,
        Patient_Gender: this.state.GenderRecall,
        Patient_Address: this.state.Patient_Address,
        Patient_Phoneno: this.state.Patient_Phoneno,
        Patient_Addhaar: this.state.Patient_Addhaar,
        Patient_Disease: this.state.DiseaseRecall,
        Patient_Ward_type: this.state.WardRecall,
        Patient_Room_no: this.state.RoomRecall,
        Doctor_id: this.state.DoctorRecall,
        Medicine_Details: this.state.MedicineRecall,
        Medicine_price:this.state.Medicine_price,


      };
      console.log(`this is Patient change- ${JSON.stringify(Patient)}`);
      console.log("Inside double Save!!");
      this.serv
        .putpatientmedicineData(Patient.PatientMedicine_id, Patient)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          alert(`Data updated!!`);

          this.props.history.push("/PatientDoctorDashboard");
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
        <h4>Edit Patient Details</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Patient_id">Patient id</label>
            <input
              type="number"
              name="Patient_id"
              className="form-control"
              value={this.state.Patient_id}
              readOnly={true}
              //   onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Patient_Name">Patient Name</label>
            <input
              type="text"
              name="Patient_Name"
              className="form-control"
              value={this.state.Patient_Name}
              // onChange={this.handleAllChanges.bind(this)}
              readOnly={true}
            />
          </div>
          <div className="text-danger">{this.state.errors.Patient_Name}</div>

          <div className="form-group">
            <label hidden={true} htmlFor="Patient_Email">
              Patient Email
            </label>
            <input
              hidden={true}
              type="email"
              name="Patient_Email"
              className="form-control"
              value={this.state.Patient_Email}
              onChange={this.handleAllChanges.bind(this)}
            />
            <div className="form-group">
              <label htmlFor="Patient_Age">Patient Age</label>
              <input
                type="number"
                name="Patient_Age"
                className="form-control"
                value={this.state.Patient_Age}
                // onChange={this.handleAllChanges.bind(this)}
                readOnly={true}
                min={0}
              />
            </div>
            <div className="text-danger">{this.state.errors.Patient_Age}</div>

            <div className>
              <label hidden={true}>Gender</label>
              <DropDownComponent
                hidden={this.state.hiddendocid}
                dataSource={this.state.DropGender}
                stateProperty={this.state.GenderRecall}
                selectedValue={this.getselectedgender.bind(this)}
              ></DropDownComponent>
            </div>
            <div className="text-danger">
              {this.state.errors.Patient_Gender}
            </div>

            <div className="form-group">
              <label hidden={true} htmlFor="Patient_Address">
                Patient Address
              </label>
              <input
                hidden={true}
                type="text"
                name="Patient_Address"
                className="form-control"
                value={this.state.Patient_Address}
                onChange={this.handleAllChanges.bind(this)}
              />
            </div>
            <div className="text-danger">
              {this.state.errors.Patient_Address}
            </div>

            <div className="form-group">
              <label htmlFor="Patient_Phoneno">Patient Phoneno</label>
              <input
                type="number"
                name="Patient_Phoneno"
                className="form-control"
                value={this.state.Patient_Phoneno}
                // onChange={this.handleAllChanges.bind(this)}
                readOnly={true}
                min={0}
              />
            </div>
            <div className="text-danger">
              {this.state.errors.Patient_Phoneno}
            </div>

            <div className="form-group">
              <label hidden={true} htmlFor="Patient_Addhaar">
                Patient Addhaar
              </label>
              <input
                hidden={true}
                type="number"
                name="Patient_Addhaar"
                className="form-control"
                value={this.state.Patient_Addhaar}
                onChange={this.handleAllChanges.bind(this)}
              />
            </div>

            <div className>
              <label>Disease</label>
              <DropDownComponent
                dataSource={this.state.DropDisease}
                stateProperty={this.state.DiseaseRecall}
                selectedValue={this.getselecteddisease.bind(this)}
              ></DropDownComponent>
            </div>
            <div className="text-danger">
              {this.state.errors.Patient_Disease}
            </div>

            <div className>
              <label>Patient Ward type*</label>
              <DropDownComponent
                dataSource={this.state.DropWard}
                stateProperty={this.state.WardRecall}
                selectedValue={this.WardDropdownSelected.bind(this)}
              ></DropDownComponent>
            </div>
            <div className="text-danger">
              {this.state.errors.Patient_Ward_type}
            </div>

            <div className>
              <label>Patient Room no*</label>
              <DropDownComponent
                dataSource={this.state.DropRoom}
                stateProperty={this.state.RoomRecall}
                selectedValue={this.RoomDropdownSelected.bind(this)}
              ></DropDownComponent>
            </div>
          </div>
          <div className="text-danger">{this.state.errors.Patient_Room_no}</div>
          <div className>
            <label hidden={this.state.hiddendocid}>Doctor Name</label>
            <DropDownComponent
              hidden={this.state.hiddendocid}
              dataSource={this.state.DropDoctor}
              stateProperty={this.state.DoctorRecall}
              selectedValue={this.DoctorDropDownSelected.bind(this)}
            ></DropDownComponent>
          </div>

          <div className>
            <label>Medicine Details *</label>
            <DropDownComponent
              dataSource={this.state.DropMedicine}
              stateProperty={this.state.MedicineRecall}
              selectedValue={this.MedicineDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="form-group">
              <label htmlFor="Medicine_price">
              Medicine Price
              </label>
              <input
                // hidden={true}
                type="text"
                name="Medicine_price"
                className="form-control"
                value={this.state.Medicine_price}
                onChange={this.handleAllChanges.bind(this)}
              />
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

export default EditPatientmedicine;
