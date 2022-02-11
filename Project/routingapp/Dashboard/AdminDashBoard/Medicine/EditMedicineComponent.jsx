import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";

class EditMedicineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Order_id: "",
      Medicine_id: "",
      Medicine_Name: "",
      Medicine_Type: "",
      Medicine_Manufacturer: "",
      Medicine_manufac_date: "",
      Medicine_expiry_date: "",
      Medicine_Inward_date: "",
      Medicine_price: 0,
      //   DeptNo: 0,
      //   Medicine_id: "",
      //   Medicine_Name: "",
      //   Doctor_Age: 0,
      Medicinedetails: [],
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
        .getMedicineDatabyID(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let Medicine = resp.data.rows;
          console.log(Medicine);
          this.setState({ Order_id: Medicine.Order_id });
          this.setState({ Medicine_id: Medicine.Medicine_id });
          this.setState({ Medicine_Name: Medicine.Medicine_Name });
          this.setState({ Medicine_Type: Medicine.Medicine_Type });
          this.setState({
            Medicine_Manufacturer: Medicine.Medicine_Manufacturer,
          });
          this.setState({
            Medicine_manufac_date: Medicine.Medicine_manufac_date,
          });
          this.setState({
            Medicine_expiry_date: Medicine.Medicine_expiry_date,
          });
          this.setState({
            Medicine_Inward_date: Medicine.Medicine_Inward_date,
          });
          this.setState({ Medicine_price: Medicine.Medicine_price });
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
    this.props.history.push("/Medicine");
  };

  save = () => {
    let errors = {};
    if (this.state.Medicine_id === "" || this.state.Medicine_id === 0) {
      errors.Medicine_id = "Please Enter a valid Medicine Id";
    } else if (
      this.state.Medicine_Name === "" ||
      this.state.Medicine_Name === undefined
    ) {
      errors.Medicine_Name = "Please Enter a valid Medicine Name";
    } else if (
      this.state.Medicine_Type === "" ||
      this.state.Medicine_Type === undefined
    ) {
      errors.Medicine_Type = "Please Enter a valid Medicine Type";
    } else if (
      this.state.Medicine_manufac_date === "" ||
      this.state.Medicine_manufac_date === 0
    ) {
      errors.Medicine_manufac_date =
        "Please Enter a valid Medicine Manufacturing Date";
    } else if (
      this.state.Medicine_Manufacturer === "" ||
      this.state.Medicine_Manufacturer === undefined ||
      this.state.Medicine_Manufacturer === 0
    ) {
      errors.Medicine_Manufacturer =
        "Please Enter a valid Medicine Manufacturer name";
    } else if (
      this.state.Medicine_expiry_date === "" ||
      this.state.Medicine_expiry_date === 0
    ) {
      errors.Medicine_expiry_date = "Please Enter a valid Medicine Expiry Date";
    } else if (
      this.state.Medicine_Inward_date === "" ||
      this.state.Medicine_Inward_date === 0
    ) {
      errors.Medicine_Inward_date = "Please Enter a valid Medicine Inward date";
    } else if (
      this.state.Medicine_price === "" ||
      this.state.Medicine_price === 0
    ) {
      errors.Medicine_price = "Please Enter a valid Medicine Price";
    } else {
      let Medicine = {
        Order_id: this.state.Order_id,
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
        .putMedicineData(Medicine.Order_id, Medicine)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/Medicine");
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
        <h4>Edit Medicine Details</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Order_id">Order_id</label>
            <input
              type="number"
              name="Order_id"
              className="form-control"
              value={this.state.Order_id}
              readOnly={true}
              //   onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Medicine_id">Medicine_id</label>
            <input
              type="text"
              name="Medicine_id"
              className="form-control"
              value={this.state.Medicine_id}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Medicine_id}</div>

          <div className="form-group">
            <label htmlFor="Medicine_Name">Medicine_Name</label>
            <input
              type="text"
              name="Medicine_Name"
              className="form-control"
              value={this.state.Medicine_Name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Medicine_Name}</div>

          <div className="form-group">
            <label htmlFor="Medicine_Type">Medicine_Type</label>
            <input
              type="text"
              name="Medicine_Type"
              className="form-control"
              value={this.state.Medicine_Type}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Medicine_Type}</div>

          <div className="form-group">
            <label htmlFor="Medicine_Manufacturer">Medicine_Manufacturer</label>
            <input
              type="text"
              name="Medicine_Manufacturer"
              className="form-control"
              value={this.state.Medicine_Manufacturer}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">
            {this.state.errors.Medicine_Manufacturer}
          </div>
          <div className="form-group">
            <label htmlFor="Medicine_manufac_date">Medicine_manufac_date</label>
            <input
              type="date"
              name="Medicine_manufac_date"
              className="form-control"
              value={this.state.Medicine_manufac_date}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">
            {this.state.errors.Medicine_manufac_date}
          </div>
          <div className="form-group">
            <label htmlFor="Medicine_expiry_date">Medicine_expiry_date</label>
            <input
              type="date"
              name="Medicine_expiry_date"
              className="form-control"
              value={this.state.Medicine_expiry_date}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">
            {this.state.errors.Medicine_expiry_date}
          </div>
          <div className="form-group">
            <label htmlFor="Medicine_Inward_date">Medicine_Inward_date</label>
            <input
              type="date"
              name="Medicine_Inward_date"
              className="form-control"
              value={this.state.Medicine_Inward_date}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">
            {this.state.errors.Medicine_Inward_date}
          </div>
          <div className="form-group">
            <label htmlFor="Medicine_price">Medicine_price</label>
            <input
              type="number"
              name="Medicine_price"
              className="form-control"
              value={this.state.Medicine_price}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Medicine_price}</div>

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

export default EditMedicineComponent;
