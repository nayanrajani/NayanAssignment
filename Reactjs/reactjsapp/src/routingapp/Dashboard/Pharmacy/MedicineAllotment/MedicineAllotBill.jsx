import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Disease, Gender, Ward } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class AddPharmacyMedBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Medicineprovide_id:"",
      Patient_id: "",
      Patient_Name: "",
      Patient_Age: 0,
      Patient_Phoneno: "",
      Doctor_id: "",
      Prescription:"",
      MedicineDetails: "",
      MedicinePrice:"",


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
      ////////////
      Doctordetails: [],
      DoctorRecall: "",
      DropDoctor: [],
      ///////////
      MedicineDetails: [],
      Medicinecall: [],
      DropMedicine: "",      
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
        .getpharmacymedicineprovidedetailsDatabyID(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let Patient = resp.data.rows;
          console.log(Patient);
          this.setState({Medicineprovide_id: Patient.Medicineprovide_id});
          this.setState({ Patient_id: Patient.Patient_id });
          this.setState({ Patient_Name: Patient.Patient_Name });
          this.setState({ Patient_Age: Patient.Patient_Age });
          this.setState({ Patient_Phoneno: Patient.Patient_Phoneno });
          this.setState({ DiseaseRecall: Patient.Patient_Disease });
          this.setState({ DoctorRecall: Patient.Doctor_id });
          this.setState({Prescription: Patient.Prescription});

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

//   getMedicineValues() {
//     // read the token
//     let token = sessionStorage.getItem("token");
//     if (token === undefined) {
//       this.setState({ message: `Please send the Auth Header` });
//     } else {
//       this.serv
//         .getMedicineData(token)
//         .then((resp) => {
//           this.setState({ MedicineDetails: resp.data.message });
//           this.setState({ message: `Data fetched!!` });
//           this.setState(
//             { columnHeaders: Object.keys(this.state.MedicineDetails[0]) },
//             () => {
//               console.log(`Columns ${this.state.columnHeaders}`);
//             }
//           );
//           this.setState({
//             Medicinecall: this.state.MedicineDetails.map(
//               (item) =>
//               //   "Medicine_id.: " +
//               //   item.Medicine_id
//               // +
//               // ", " +
//               "Medicine_Name: " +
//               item.Medicine_Name 
//               +
//               ", " +
//               "Medicine_price: " +
//               item.Medicine_price
//             ),
//           });
//           console.log(this.state.Medicinecall);
//         })
//         .catch((error) => {
//           this.setState({ message: `Error Occured ${error.message}` });
//         });
//     }
//   }

  componentDidMount = () => {
    this.getPatientValues();
    this.getDoctorValues();
    // this.getMedicineValues();
  };

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  getselecteddisease = (disease) => {
    this.setState({ DiseaseRecall: disease });
  };

  DoctorDropDownSelected = (doctor) => {
    this.setState({ DoctorRecall: doctor });
  };

//   MedicineDropdownSelected =(medicine) => {
//     console.log(medicine);
//     this.setState({DropMedicine: medicine});
//     let Medicineprice =  medicine.split(",")[1];
//     console.log(Medicineprice);
//     let priceofmedicine = Medicineprice.split(":")[1];
//     console.log(priceofmedicine);
//     this.setState({Medicine_price: priceofmedicine});
//   }

  clear = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Patient_Name: "" });
    this.setState({ Patient_Age: 0 });
    this.setState({ Patient_Phoneno: "" });
    this.setState({ Patient_Addhaar: "" });
    // this.setState({ Patient_Disease: "" });

  };
  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Patient_Name: "" });
    this.setState({ Patient_Age: 0 });
    this.setState({ Patient_Phoneno: "" });
    this.setState({ Patient_Addhaar: "" });
    this.setState({ Patient_Disease: "" });
    this.props.history.push("/PharmacyUserDashboard");
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
    } else {
      console.log(`this is Patient change in save- ${this.state.Patient_id}`);
      console.log(`this is Patient change in save- ${this.state.Patient_Name}`);
      console.log(`this is Patient change in save- ${this.state.Patient_Age}`);
      console.log(`this is MedicineDetails- ${this.state.MedicineDetails}`);
      console.log(`this is MedicinePrice- ${this.state.MedicinePrice}`)

      let Patient = {
        Medicineprovide_id:this.state.Medicineprovide_id,
        Patient_id: this.state.Patient_id,
        Patient_Name: this.state.Patient_Name,
        Patient_Age: this.state.Patient_Age,
        Patient_Phoneno: this.state.Patient_Phoneno,
        Patient_Disease: this.state.DiseaseRecall,
        Doctor_id: this.state.DoctorRecall,
        Prescription: this.state.Prescription,
        // Medicine_Details: this.state.DropMedicine,
        MedicineDetails:this.state.MedicineDetails,
        MedicinePrice:this.state.MedicinePrice,


      };
      console.log(`this is Patient change- ${JSON.stringify(Patient)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddmedicineissuedetailsData(Patient)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          alert(`Data updated!!`);

          this.props.history.push("/PharmacyUserDashboard");
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error}` });
        });
        this.serv.DeletepharmacymedicineprovidedetailsData(this.state.Medicineprovide_id);
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
        <h4>Allot Medicine to Patient</h4>
        <form>
        <div className="form-group" hidden={true}>
            <label htmlFor="Medicineprovide_id">Medicineprovide_id</label>
            <input
              type="number"
              name="Medicineprovide_id"
              className="form-control"
              value={this.state.Medicineprovide_id}
              readOnly={true}
              //   onChange={this.handleAllChanges.bind(this)}
            />
          </div>
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


            <div className hidden={true}>
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
          <div className hidden={true}>
            <label >Doctor id</label>
            <DropDownComponent
              dataSource={this.state.DropDoctor}
              stateProperty={this.state.DoctorRecall}
              selectedValue={this.DoctorDropDownSelected.bind(this)}
            ></DropDownComponent>
          </div> 
          <div className="form-group">
            <label htmlFor="Prescription">Doctor Prescription</label>
            <textarea
            readOnly={true}
              type="text"
              name="Prescription"
              className="form-control"
              value={this.state.Prescription}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="MedicineDetails">Medicine Details * (Add price and Quantity)</label>
            <textarea
              type="text"
              name="MedicineDetails"
              className="form-control"
              value={this.state.MedicineDetails}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
            <div className="form-group">
            <label htmlFor="MedicinePrice">Medicine Price</label>
            <input
              type="number"
              name="MedicinePrice"
              className="form-control"
              value={this.state.MedicinePrice}
              
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

export default AddPharmacyMedBill;
