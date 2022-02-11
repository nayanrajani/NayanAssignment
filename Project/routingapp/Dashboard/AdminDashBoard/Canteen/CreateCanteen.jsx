import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Itemname } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class CreateCanteenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Order_id: "",
      Item_id: "",
      Item_name: Itemname,
      Item_Buyer: "",

      Item_Total: "",

      Canteen: [],
      columnHeaders: [],
      message: "",
      errors: {},
      ItemCall: "",
      PatientDetails: [],
      PatientCall: [],
      PatientDrop: "",
    };
    this.serv = new SecureCallService();
  }

  componentDidMount = () => {
    // read the token
    let token = sessionStorage.getItem("token");
    let user = sessionStorage.getItem("Username");
    let CurrentRole = sessionStorage.getItem("Role");
    if (token == undefined || user == undefined || CurrentRole == undefined) {
      this.props.history.push("/");
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getPatientData(token)
        .then((resp) => {
          this.setState({ PatientDetails: resp.data.message });
          this.setState({ message: `Data Received Successfully` });
          this.setState(
            { columnHeaders: Object.keys(this.state.PatientDetails[0]) },
            () => {
              console.log(`Columns ${this.state.columnHeaders}`);
            }
          );
          this.setState({
            PatientCall: this.state.PatientDetails.map(
              (item) =>
                "Patient_id.: " +
                item.Patient_id +
                ", " +
                "Patient_Name: " +
                item.Patient_Name +
                ", " +
                "Patient_Room_no: " +
                item.Patient_Room_no
            ),
          });
          console.log(this.state.PatientCall);
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  };

  PatientDropdownSelected = (Patient) => {
    if (Patient === "Select-Room") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Patient);
      this.setState({ PatientDrop: Patient });
    }
  };

  ItemDropdownSelected = (Item) => {
    if (Item === "Select-Item") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Item);
      this.setState({ ItemCall: Item });
    }
  };
  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  CancelButton = () => {
    this.setState({ Item_id: "" });
    this.setState({ Item_name: "" });
    this.setState({ Item_Buyer: "" });

    this.setState({ Item_Total: "" });
    this.props.history.push("/Canteen");
  };

  clear = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Item_id: "" });
    this.setState({ Item_name: "" });
    this.setState({ Item_Buyer: "" });
    this.setState({ Item_Total: "" });
  };

  save = () => {
    let errors = {};
    if (this.state.Item_id === "" || this.state.Item_id === 0) {
      errors.Item_id = "Please Enter a valid Item no";
    }

    if (this.state.Item_name === "" || this.state.Item_name === undefined) {
      errors.Item_name = "Please Enter a valid Item name";
    }
    if (this.state.Item_Total === "" || this.state.Item_Total === 0) {
      errors.Item_Total = "Please Enter a valid Item Total";
    } else {
      let CanteenBody = {
        Item_id: this.state.Item_id,
        Item_name: this.state.ItemCall,
        Item_Buyer: this.state.PatientDrop,
        Item_Total: this.state.Item_Total,
      };
      console.log(`this is CanteenBody change- ${JSON.stringify(CanteenBody)}`);
      console.log("Inside double Save!!");
      this.serv
        .AddCanteenData(CanteenBody)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/Canteen");
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
        <h4>Add New Canteen</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Item_id">Item_id</label>
            <input
              type="number"
              name="Item_id"
              className="form-control"
              value={this.state.Item_id}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Item_id}</div>
          {/* <div className="form-group">
            <label htmlFor="Item_name">Item_name</label>
            <input
              type="text"
              name="Item_name"
              className="form-control"
              value={this.state.Item_name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div> */}
          <div className="form-group">
            <label>Item_name</label>
            <DropDownComponent
              dataSource={this.state.Item_name}
              stateProperty={this.state.ItemCall}
              selectedValue={this.ItemDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Item_name}</div>
          {/* <div className="form-group">
            <label htmlFor="Item_Buyer">Item_Buyer</label>
            <input
              type="number"
              name="Item_Buyer"
              className="form-control"
              value={this.state.Item_Buyer}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div> */}
          <div className>
            <label>Item_Buyer*</label>
            <DropDownComponent
              dataSource={this.state.PatientCall}
              stateProperty={this.state.PatientDrop}
              selectedValue={this.PatientDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Item_Buyer}</div>
          <div className="form-group">
            <label htmlFor="Item_Total">Item_Total</label>
            <input
              type="number"
              name="Item_Total"
              className="form-control"
              value={this.state.Item_Total}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Item_Total}</div>
          <hr />
          <div className="btn-group">
            <input
              type="button"
              value="Clear"
              className="btn btn-primary"
              onClick={this.clear.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default CreateCanteenComponent;
