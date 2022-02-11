import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Itemname } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class EditCanteenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Order_id: "",
      Item_id: "",
      // Item_name: "",
      // Item_Buyer: "",
      Item_Total: "",

      Canteendetails: [],
      columnHeaders: [],
      message: "",
      errors: {},
      //////
      ItemReCall: "",
      DropItem: Itemname,
      ////////
      PatientDetails: [],
      PatientReCall: "",
      DropPatient: [],
    };
    this.serv = new SecureCallService();
  }

  getCanteendata() {
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
        .getCanteenDatabyID(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let CanteenBody = resp.data.rows;
          console.log(CanteenBody);
          this.setState({ Order_id: CanteenBody.Order_id });
          this.setState({ Item_id: CanteenBody.Item_id });
          this.setState({ ItemReCall: CanteenBody.Item_name });
          this.setState({ PatientReCall: CanteenBody.Item_Buyer });

          this.setState({ Item_Total: CanteenBody.Item_Total });
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
  }

  getPatientdata() {
    // read the token
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
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
            DropPatient: this.state.PatientDetails.map(
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
          console.log(this.state.DropPatient);
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  componentDidMount = () => {
    this.getCanteendata();
    this.getPatientdata();
  };

  PatientDropdownSelected = (Patient) => {
    if (Patient === "Select-Room") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Patient);
      this.setState({ PatientReCall: Patient });
    }
  };

  ItemDropdownSelected = (Item) => {
    if (Item === "Select-Item") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Item);
      this.setState({ ItemReCall: Item });
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

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  clear = () => {
    this.setState({ Item_id: "" });
    this.setState({ Item_name: "" });
    this.setState({ Item_Buyer: "" });

    this.setState({ Item_Total: "" });
  };

  save = () => {
    let errors = {};
    if (this.state.Item_id === "" || this.state.Item_id === 0) {
      errors.Item_id = "Please Enter a valid Item no";
    } else if (this.state.Item_Total === "" || this.state.Item_Total === 0) {
      errors.Item_Total = "Please Enter a valid Item Total";
    } else {
      console.log(`this is CanteenBody change in save- ${this.state.Item_id}`);
      console.log(
        `this is CanteenBody change in save- ${this.state.Item_name}`
      );

      let CanteenBody = {
        Order_id: this.state.Order_id,
        Item_id: this.state.Item_id,
        Item_name: this.state.ItemReCall,
        Item_Buyer: this.state.PatientReCall,

        Item_Total: this.state.Item_Total,
      };
      console.log(`this is CanteenBody change- ${JSON.stringify(CanteenBody)}`);
      console.log("Inside double Save!!");
      this.serv
        .putCanteenData(CanteenBody.Order_id, CanteenBody)
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
        <h4>Edit Canteendetails Details</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Order_id">Order_id</label>
            <input
              type="text"
              name="Order_id"
              className="form-control"
              value={this.state.Order_id}
              readOnly={true}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
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
          <div className>
            <label>Item_name</label>
            <DropDownComponent
              dataSource={this.state.DropItem}
              stateProperty={this.state.ItemReCall}
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
            <label>Item_Buyer</label>
            <DropDownComponent
              dataSource={this.state.DropPatient}
              stateProperty={this.state.PatientReCall}
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

export default EditCanteenComponent;
