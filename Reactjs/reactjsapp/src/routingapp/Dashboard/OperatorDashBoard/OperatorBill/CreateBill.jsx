import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class OperatorCreateBillComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Patient_id: "",
      Patient_Name:"",
      Patient_Disease: "",
      Doctor_id : "",
      Doctor_Name  : "",
      Doctor_Charges: "",
      Doctor_Visit: "",
      Patient_Room_no : "",
      Room_charges: "",
      Patient_Medicine_id : "",
      Medicine_price: "",
      Order_id : "",
      Item_Total : "",
      no_of_days: "",
      Bill_Total: "",
      GST: 18,

      //////////
      DoctorallCharges: "",
      RoomallChargers:"",

      BillDetails: [],
      columnHeaders: [],
      message: "",
      errors: {},
    };
    this.serv = new SecureCallService();
  }

  getPatientvalues=()=>{
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
            .getPatientDatabyID(pid)
            .then((resp) => {
              console.log(pid);
              console.log(resp.data.rows);
              let PatientBillDetails = resp.data.rows;
              console.log(`this is patient data - ${JSON.stringify(PatientBillDetails)}`);
              // this.setState({ bill_no: Bill.bill_no });
              this.setState({ Patient_id: PatientBillDetails.Patient_id });
              this.setState({ Patient_Name: PatientBillDetails.Patient_Name });
              this.setState({Patient_Disease:PatientBillDetails.Patient_Disease});
              this.setState({ Doctor_id: PatientBillDetails.Doctor_id });
              this.setState({ Patient_Room_no: PatientBillDetails.Patient_Room_no });
            })
            .catch((error) => {
              this.setState({ message: error.message });
            });
        }
  }
  getDoctorvalues=()=>{
    // read the Route Parameter
    let pid = this.props.match.params.id;
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      //console.log(`this is the doctor id from patient - ${d}`)
      this.serv
        .getDoctorDatabyID(this.state.Doctor_id)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let DoctorBillDetails = resp.data.rows;
          console.log(DoctorBillDetails);
          // this.setState({ bill_no: Bill.bill_no });
          this.setState({Doctor_Name: DoctorBillDetails.Doctor_Name});
          this.setState({Doctor_Charges: DoctorBillDetails.Doctor_Charges});
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
  }
  getPatientMedicinevalues=()=>{
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
        .getpatientmedicineDatabyPatientID(pid)
        .then((resp) => {
          console.log(`this is ID for PatientMedicineBill - ${pid}`);
          console.log(resp.data.rows);
          let PatientMedicineBill = resp.data.rows;
          console.log(`this is PatientMedicineBill- ${JSON.stringify(PatientMedicineBill)}`);
          this.setState({ Patient_Medicine_id: PatientMedicineBill.PatientMedicine_id });
          this.setState({ Medicine_price: PatientMedicineBill.Medicine_price });
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
}

getRoomvalues=()=>{
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
      .getRoomDatabyID(this.state.Patient_Room_no)
      .then((resp) => {
        console.log(pid);
        console.log(resp.data.rows);
        let RoomBillCharges = resp.data.rows;
        console.log(RoomBillCharges);
        this.setState({ Room_charges: RoomBillCharges.Room_charges });

      })
      .catch((error) => {
        this.setState({ message: error.message });
      });
  }
}
  
getCanteenvalues=()=>{
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
      .getPatientCanteenDatabyID(pid)
      .then((resp) => {
        console.log(pid);
        console.log(resp.data.rows);
        let PatientCanteenBill = resp.data.rows;
        console.log(`this is PatientCanteenBill ${JSON.stringify(PatientCanteenBill)}`);
        this.setState({ Order_id: PatientCanteenBill.Order_id });
        this.setState({ Item_Total: PatientCanteenBill.Item_Total });

      })
      .catch((error) => {
        this.setState({ message: error.message });
      });
  }
}
  componentDidMount=()=>{
    this.getPatientvalues();
    this.getPatientMedicinevalues();
    this.getCanteenvalues();
    // this.final();

  }
  // componentWillUpdate=()=>{
  //   this.getDoctorvalues();
  //   this.getRoomvalues();
  // }

  // final=()=>{
  //   let billamountfinal = 7800 * (this.state.GST)%
  //   console.log(`this is billamountfinal- ${billamountfinal}`);
  // }
  handleGenerateBill = () =>{

    // this.getCanteenvalues();
    this.getDoctorvalues();
    this.getRoomvalues();
    // setTimeout(this.getDoctorvalues(), 1000);
    // setTimeout(this.getRoomvalues(), 1000);
  }

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  clear = () => {

    // this.setState({ Patient_id: 0 });
    this.setState({ Patient_id: "" });
    this.setState({ Patient_Name: "" });
    this.setState({ Patient_Disease: "" });
    this.setState({ Doctor_id: "" });
    this.setState({ Doctor_Name: "" });
    this.setState({ Doctor_Charges: "" });
    this.setState({ Doctor_Visit: "" });
    this.setState({ Patient_Room_no: "" });
    this.setState({ Room_charges: "" });
    this.setState({ Patient_Medicine_id: "" });
    this.setState({ Medicine_price: "" });
    this.setState({ Order_id: 0 });
    this.setState({ Item_Total: 0 });
    this.setState({ no_of_days: 0 });
    this.setState({ otherlabcharge: 0 });
    this.setState({ Bill_Total: 0 });
  };

  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Patient_id: "" });
    this.setState({ Patient_Name: "" });
    this.setState({ Patient_Disease: "" });
    this.setState({ Doctor_id: "" });
    this.setState({ Doctor_Name: "" });
    this.setState({ Doctor_Charges: "" });
    this.setState({ Doctor_Visit: "" });
    this.setState({ Patient_Room_no: "" });
    this.setState({ Room_charges: "" });
    this.setState({ Patient_Medicine_id: "" });
    this.setState({ Medicine_price: "" });
    this.setState({ Order_id: 0 });
    this.setState({ Item_Total: 0 });
    this.setState({ no_of_days: 0 });
    this.setState({ otherlabcharge: 0 });
    this.setState({ Bill_Total: 0 });
    this.props.history.push("/OperatorAllbills");
  };

  save = () => {
    let errors = {};
    if (this.state.bill_no === "" || this.state.bill_no === 0) {
      errors.bill_no = "Please Enter a valid Bill no";
    }
    if (this.state.Patient_id === "" || this.state.Patient_id === 0) {
      errors.Patient_id = "Please Enter a valid patient id";
    }
    if (
      this.state.Patient_Name === "" ||
      this.state.Patient_Name === undefined
    ) {
      errors.Patient_Name = "Please Enter a valid Patient name";
    }
    if (this.state.Doctor_Name === "" || this.state.Doctor_Name === undefined) {
      errors.Doctor_Name = "Please Enter a valid Doctor Name";
    }
    if (this.state.Doctor_id === "" || this.state.Doctor_id === 0) {
      errors.Doctor_id = "Please Enter a valid Doctor Id";
    }
    if (this.state.Doctor_Charges === "" || this.state.Doctor_Charges === 0) {
      errors.Doctor_Charges = "Please Enter a valid Charges";
    }
    if (this.state.Medicine_price === "" || this.state.Medicine_price === 0) {
      errors.Medicine_price = "Please Enter a valid price";
    }
    if (this.state.Room_charges === "" || this.state.Room_charges === 0) {
      errors.Room_charges = "Please Enter a valid Room Charges";
    }
    if (this.state.Item_Total === "" || this.state.Item_Total === 0) {
      errors.Item_Total = "Please Enter a valid Item total";
    }
    if (this.state.no_of_days === "" || this.state.no_of_days === 0) {
      errors.no_of_days = "Please Enter a valid No of days";
    }
    if (this.state.otherlabcharge === "" || this.state.otherlabcharge === 0) {
      errors.otherlabcharge = "Please Enter a valid lab charges";
    }
    if (this.state.Bill_Total === "" || this.state.Bill_Total === 0) {
      errors.Bill_Total = "Please Enter a valid Bill Total";
    } else {
      console.log(`this is Bill change in save- ${this.state.bill_no}`);
      console.log(`this is Bill change in save- ${this.state.Medicine_price}`);

      let Bill = {

        Patient_id: this.state.Patient_id,
        Patient_Name: this.state.Patient_Name,
        Patient_Disease: this.state.Patient_Disease,
        Doctor_id: this.state.Doctor_id,
        Doctor_Name: this.state.Doctor_Name,
        Doctor_Charges: this.state.Doctor_Charges,
        Doctor_Visit: this.state.Doctor_Visit,
        Patient_Room_no: this.state.Patient_Room_no,
        Room_charges: this.state.Room_charges,
        Patient_Medicine_id: this.state.Patient_Medicine_id,
        Medicine_price: this.state.Medicine_price,
        Order_id: this.state.Order_id,
        Item_Total: this.state.Item_Total,
        no_of_days: this.state.no_of_days,
        Bill_Total: this.state.Bill_Total,
      };
      console.log(`this is Bill change- ${JSON.stringify(Bill)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddBillData(Bill)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/OperatorAllbills");
          this.serv.DeletePatientData(Bill.Patient_id);
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error}` });
        });
    }
    this.setState({
      errors: errors,
    });
  };

  handleTotalAmountofBill=()=>{
    let DoctorTotalAmount = this.state.Doctor_Charges * this.state.Doctor_Visit;
    let RoomTotalAmount = this.state.no_of_days * this.state.Room_charges;
    let MedicineCanteenTotal = this.state.Medicine_price + this.state.Item_Total;

    console.log(`this is DoctorTotalAmount- ${DoctorTotalAmount}`);
    console.log(`this is RoomTotalAmount- ${RoomTotalAmount}`);
    console.log(`this is MedicineCanteenTotal- ${MedicineCanteenTotal}`);
    let FinalBillAmount = DoctorTotalAmount + RoomTotalAmount + MedicineCanteenTotal; 
    console.log(`this is FinalBillAmount- ${FinalBillAmount}`);


  this.setState({Bill_Total: FinalBillAmount});
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
        <h4>Add New Bill</h4>
        <form>
          {/* <div className="form-group">
            <label htmlFor="bill_no">Bill No.</label>
            <input
              type="number"
              name="bill_no"
              className="form-control"
              value={this.state.bill_no}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div> */}
          <strong style={{ color: "red" }}>{this.state.errors.bill_no}</strong>
          <div className="form-group">
            <label htmlFor="Patient_id">Patient Id</label>
            <input
              type="number"
              name="Patient_id"
              className="form-control"
              value={this.state.Patient_id}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Patient_id}
          </strong>

          <div className="form-group">
            <label htmlFor="Patient_Name">Patient Name</label>
            <input
              type="text"
              name="Patient_Name"
              className="form-control"
              value={this.state.Patient_Name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Patient_Name}
          </strong>
          <div className="form-group">
            <label htmlFor="Patient_Disease">Patient Disease</label>
            <input
              type="text"
              name="Patient_Disease"
              className="form-control"
              value={this.state.Patient_Disease}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          {/* <strong style={{ color: "red" }}>
            {this.state.errors.Patient_Name}
          </strong> */}
          <div className="form-group">
            <label htmlFor="Doctor_id">Doctor Id</label>
            <input
              type="number"
              name="Doctor_id"
              className="form-control"
              value={this.state.Doctor_id}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Doctor_id}
          </strong>
          <div className="form-group">
            <label htmlFor="Doctor_Name">Doctor Name</label>
            <input
              type="text"
              name="Doctor_Name"
              className="form-control"
              value={this.state.Doctor_Name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Doctor_Name}
          </strong>

          <div className="form-group">
            <label htmlFor="Doctor_Charges">Doctor Charges</label>
            <input
              type="number"
              name="Doctor_Charges"
              className="form-control"
              value={this.state.Doctor_Charges}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Doctor_Charges}
          </strong>

          <div className="form-group">
            <label htmlFor="Doctor_Visit">Doctor Visit</label>
            <input
              type="number"
              name="Doctor_Visit"
              className="form-control"
              value={this.state.Doctor_Visit}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Doctor_Charges}
          </strong>

          <div className="form-group">
            <label htmlFor="Patient_Room_no">Patient Room no</label>
            <input
              type="text"
              name="Patient_Room_no"
              className="form-control"
              value={this.state.Patient_Room_no}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Doctor_Charges}
          </strong>

          <div className="form-group">
            <label htmlFor="Room_charges">Room Charges</label>
            <input
              type="number"
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

          <div className="form-group">
            <label htmlFor="Patient_Medicine_id">Patient Medicine id</label>
            <input
              type="number"
              name="Patient_Medicine_id"
              className="form-control"
              value={this.state.Patient_Medicine_id}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Room_charges}
          </strong>

          <div className="form-group">
            <label htmlFor="Medicine_price">Medicine Price</label>
            <input
              type="number"
              name="Medicine_price"
              className="form-control"
              value={this.state.Medicine_price}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Medicine_price}
          </strong>

          <div className="form-group">
            <label htmlFor="Order_id">Canteen Order id</label>
            <input
              type="number"
              name="Order_id"
              className="form-control"
              value={this.state.Order_id}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Item_Total}
          </strong>

          <div className="form-group">
            <label htmlFor="Item_Total">Canteen Item Total</label>
            <input
              type="number"
              name="Item_Total"
              className="form-control"
              value={this.state.Item_Total}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Item_Total}
          </strong>
          <div className="form-group">
            <label htmlFor="no_of_days">Total Days</label>
            <input
              type="number"
              name="no_of_days"
              className="form-control"
              value={this.state.no_of_days}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.no_of_days}
          </strong>
          <div className="form-group">
            <label htmlFor="Bill_Total">Bill Total</label>
            <input
              type="number"
              name="Bill_Total"
              className="form-control"
              value={this.state.Bill_Total}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Bill_Total}
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="button"
              value="get Data"
              className="btn btn-danger"
              onClick={this.handleGenerateBill.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="button"
              value="get Total"
              className="btn btn-danger"
              onClick={this.handleTotalAmountofBill.bind(this)}
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

export default OperatorCreateBillComponent;
