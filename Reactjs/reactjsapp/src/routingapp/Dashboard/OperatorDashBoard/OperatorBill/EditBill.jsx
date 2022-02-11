import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class OperatorEditBillComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill_no: "",
      Patient_id: "",
      Patient_Name: "",
      Doctor_id: "",
      Doctor_Name: "",
      Doctor_Charges: "",
      Medicine_price: "",
      Room_charges: 0,
      Item_Total: 0,
      no_of_days: 0,
      otherlabcharge: 0,
      Bill_Total: 0,
      //   DeptNo: 0,
      //   Medicine_id: "",
      //   Patient_Name: "",
      //   Doctor_Age: 0,
      EditBill: [],
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
        .getBillDatabyID(pid, token)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let Bill = resp.data.rows;
          console.log(Bill);
          this.setState({ bill_no: Bill.bill_no });
          this.setState({ Patient_id: Bill.Patient_id });
          this.setState({ Patient_Name: Bill.Patient_Name });
          this.setState({ Doctor_id: Bill.Doctor_id });
          this.setState({
            Doctor_Name: Bill.Doctor_Name,
          });
          this.setState({
            Doctor_Charges: Bill.Doctor_Charges,
          });
          this.setState({
            Medicine_price: Bill.Medicine_price,
          });
          this.setState({
            Room_charges: Bill.Room_charges,
          });
          this.setState({ Item_Total: Bill.Item_Total });
          this.setState({ no_of_days: Bill.no_of_days });
          this.setState({ otherlabcharge: Bill.otherlabcharge });
          this.setState({ Bill_Total: Bill.Bill_Total });
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
    // this.setState({ Order_id: 0 });
    this.setState({ bill_no: "" });
    this.setState({ Patient_id: "" });
    this.setState({ Patient_Name: "" });
    this.setState({ Doctor_id: "" });
    this.setState({ Doctor_Name: "" });
    this.setState({ Doctor_Charges: "" });
    this.setState({ Medicine_price: "" });
    this.setState({ Room_charges: 0 });
    this.setState({ Item_Total: 0 });
    this.setState({ no_of_days: 0 });
    this.setState({ otherlabcharge: 0 });
    this.setState({ Bill_Total: 0 });
  };

  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ bill_no: "" });
    this.setState({ Patient_id: "" });
    this.setState({ Patient_Name: "" });
    this.setState({ Doctor_id: "" });
    this.setState({ Doctor_Name: "" });
    this.setState({ Doctor_Charges: "" });
    this.setState({ Medicine_price: "" });
    this.setState({ Room_charges: 0 });
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
    } else if (this.state.Patient_id === "" || this.state.Patient_id === 0) {
      errors.Patient_id = "Please Enter a valid patient id";
    } else if (
      this.state.Patient_Name === "" ||
      this.state.Patient_Name === undefined
    ) {
      errors.Patient_Name = "Please Enter a valid Patient name";
    } else if (
      this.state.Doctor_Name === "" ||
      this.state.Doctor_Name === undefined
    ) {
      errors.Doctor_Name = "Please Enter a valid Doctor Name";
    } else if (this.state.Doctor_id === "" || this.state.Doctor_id === 0) {
      errors.Doctor_id = "Please Enter a valid Doctor Id";
    } else if (
      this.state.Doctor_Charges === "" ||
      this.state.Doctor_Charges === 0
    ) {
      errors.Doctor_Charges = "Please Enter a valid Charges";
    } else if (
      this.state.Medicine_price === "" ||
      this.state.Medicine_price === 0
    ) {
      errors.Medicine_price = "Please Enter a valid price";
    } else if (
      this.state.Room_charges === "" ||
      this.state.Room_charges === 0
    ) {
      errors.Room_charges = "Please Enter a valid Room Charges";
    } else if (this.state.Item_Total === "" || this.state.Item_Total === 0) {
      errors.Item_Total = "Please Enter a valid Item total";
    } else if (this.state.no_of_days === "" || this.state.no_of_days === 0) {
      errors.no_of_days = "Please Enter a valid No of days";
    } else if (
      this.state.otherlabcharge === "" ||
      this.state.otherlabcharge === 0
    ) {
      errors.otherlabcharge = "Please Enter a valid lab charges";
    } else if (this.state.Bill_Total === "" || this.state.Bill_Total === 0) {
      errors.Bill_Total = "Please Enter a valid Bill Total";
    } else {
      console.log(`this is Bill change in save- ${this.state.Medicine_price}`);

      let Bill = {
        bill_no: this.state.bill_no,
        Patient_id: this.state.Patient_id,
        Patient_Name: this.state.Patient_Name,
        Doctor_id: this.state.Doctor_id,
        Doctor_Name: this.state.Doctor_Name,
        Doctor_Charges: this.state.Doctor_Charges,
        Medicine_price: this.state.Medicine_price,
        Room_charges: this.state.Room_charges,
        Item_Total: this.state.Item_Total,
        no_of_days: this.state.no_of_days,
        otherlabcharge: this.state.otherlabcharge,
        Bill_Total: this.state.Bill_Total,
      };
      console.log(`this is Bill change- ${JSON.stringify(Bill)}`);
      console.log("Inside double Save!!");
      this.serv
        .putBillData(Bill.bill_no, Bill)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/OperatorAllbills");
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
        <h4>Edit Bill Details</h4>
        <form>
          <div className="form-group">
            <label htmlFor="bill_no">Bill No.</label>
            <input
              type="number"
              name="bill_no"
              className="form-control"
              value={this.state.bill_no}
              readOnly={true}
              // onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.bill_no}</div>
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
          </strong>{" "}
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
          </strong>{" "}
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
          </strong>{" "}
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
          </strong>{" "}
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
          </strong>{" "}
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
          </strong>{" "}
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
          </strong>{" "}
          <div className="form-group">
            <label htmlFor="Item_Total">Item Total</label>
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
          </strong>{" "}
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
          </strong>{" "}
          <div className="form-group">
            <label htmlFor="otherlabcharge">Other Labcharge</label>
            <input
              type="number"
              name="otherlabcharge"
              className="form-control"
              value={this.state.otherlabcharge}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.otherlabcharge}
          </strong>{" "}
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
          </strong>{" "}
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

export default OperatorEditBillComponent;
