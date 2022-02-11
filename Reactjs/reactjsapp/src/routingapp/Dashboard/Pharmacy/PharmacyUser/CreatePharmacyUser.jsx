import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class CreatePharmacyUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Order_id: "",
      Medicine_id: "",
      Medicine_Name: "",
      Medicine_Type: "",
      Medicine_Manufacturer: "",
      Medicine_manufac_date: "",
      Medicine_expiry_date: "",
      Medicine_Inward_date: "",
      Medicine_price: 0,

      Medicinedetails: [],
      columnHeaders: [],
      message: "",
      errors: {},
    };
    this.serv = new SecureCallService();
  }

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  clear = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Medicine_id: "" });
    this.setState({ Medicine_Name: "" });
    this.setState({ Medicine_Type: "" });
    this.setState({ Medicine_Manufacturer: "" });
    this.setState({ Medicine_manufac_date: "" });
    this.setState({ Medicine_expiry_date: "" });
    this.setState({ Medicine_Inward_date: "" });
    this.setState({ Medicine_price: 0 });
  };

  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Medicine_id: "" });
    this.setState({ Medicine_Name: "" });
    this.setState({ Medicine_Type: "" });
    this.setState({ Medicine_Manufacturer: "" });
    this.setState({ Medicine_manufac_date: "" });
    this.setState({ Medicine_expiry_date: "" });
    this.setState({ Medicine_Inward_date: "" });
    this.setState({ Doctor_Specialization: "" });
    this.props.history.push("/PharmacyUser");
  };

  save = () => {
    let errors = {};
    if (this.state.Medicine_id === "" || this.state.Medicine_id === 0) {
      errors.Medicine_id = "Please Enter a valid Medicine Id";
    }
    if (
      this.state.Medicine_Name === "" ||
      this.state.Medicine_Name === undefined
    ) {
      errors.Medicine_Name = "Please Enter a valid Medicine Name";
    }
    if (
      this.state.Medicine_Type === "" ||
      this.state.Medicine_Type === undefined
    ) {
      errors.Medicine_Type = "Please Enter a valid Medicine Type";
    }
    if (
      this.state.Medicine_manufac_date === "" ||
      this.state.Medicine_manufac_date === 0
    ) {
      errors.Medicine_manufac_date =
        "Please Enter a valid Medicine Manufacturing Date";
    }
    if (
      this.state.Medicine_Manufacturer === "" ||
      this.state.Medicine_Manufacturer === undefined
    ) {
      errors.Medicine_Manufacturer =
        "Please Enter a valid Medicine Manufacturer name";
    }
    if (
      this.state.Medicine_expiry_date === "" ||
      this.state.Medicine_expiry_date === undefined
    ) {
      errors.Medicine_expiry_date = "Please Enter a valid Medicine Expiry Date";
    }
    if (
      this.state.Medicine_Inward_date === "" ||
      this.state.Medicine_Inward_date === undefined
    ) {
      errors.Medicine_Inward_date = "Please Enter a valid Medicine Inward date";
    }
    if (this.state.Medicine_price === "" || this.state.Medicine_price === 0) {
      errors.Medicine_price = "Please Enter a valid Medicine Price";
    } else {
      console.log(`this is Medicine change in save- ${this.state.Medicine_id}`);
      console.log(
        `this is Medicine change in save- ${this.state.Medicine_price}`
      );

      let Medicine = {
        Medicine_id: this.state.Medicine_id,
        Medicine_Name: this.state.Medicine_Name,
        Medicine_Type: this.state.Medicine_Type,
        Medicine_Manufacturer: this.state.Medicine_Manufacturer,
        Medicine_manufac_date: this.state.Medicine_manufac_date,
        Medicine_expiry_date: this.state.Medicine_expiry_date,
        Medicine_Inward_date: this.state.Medicine_Inward_date,
        Medicine_price: this.state.Medicine_price,
      };
      console.log(`this is Medicine change- ${JSON.stringify(Medicine)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddMedicineData(Medicine)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/PharmacyUser");
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
        <h4>Add New Medicine</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Medicine_id">Medicine Id</label>
            <input
              type="number"
              name="Medicine_id"
              className="form-control"
              value={this.state.Medicine_id}
              onChange={this.handleAllChanges.bind(this)}
              min={0}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Medicine_id}
          </strong>
          <div className="form-group">
            <label htmlFor="Medicine_Name">Medicine Name</label>
            <input
              type="text"
              name="Medicine_Name"
              className="form-control"
              value={this.state.Medicine_Name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Medicine_Name}
          </strong>
          <div className="text-danger">{this.state.errors.Medicine_Name}</div>
          <div className="form-group">
            <label htmlFor="Medicine_Type">Medicine Type</label>
            <input
              type="text"
              name="Medicine_Type"
              className="form-control"
              value={this.state.Medicine_Type}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Medicine_Type}
          </strong>
          <div className="form-group">
            <label htmlFor="Medicine_Manufacturer">Medicine Manufacturer</label>
            <input
              type="text"
              name="Medicine_Manufacturer"
              className="form-control"
              value={this.state.Medicine_Manufacturer}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Medicine_Manufacturer}
          </strong>

          <div className="form-group">
            <label htmlFor="Medicine_manufac_date">Medicine Manufac.Date</label>
            <input
              type="date"
              name="Medicine_manufac_date"
              className="form-control"
              value={this.state.Medicine_manufac_date}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Medicine_manufac_date}
          </strong>


          <div className="form-group">
            <label htmlFor="Medicine_expiry_date">Medicine ExpiryDate</label>
            <input
              type="date"
              name="Medicine_expiry_date"
              className="form-control"
              value={this.state.Medicine_expiry_date}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Medicine_expiry_date}
          </strong>

          <div className="form-group">
            <label htmlFor="Medicine_Inward_date">Medicine InwardDate</label>
            <input
              type="date"
              name="Medicine_Inward_date"
              className="form-control"
              value={this.state.Medicine_Inward_date}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <strong style={{ color: "red" }}>
            {this.state.errors.Medicine_Inward_date}
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

export default CreatePharmacyUser;
