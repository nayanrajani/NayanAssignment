import React, { Component } from "react";
import { SecureCallService } from "../../../../HTTPandSERVICE/services/secureservice";
import { Gender, Ward } from "../../ReusableComponent/constants";
import DropDownComponent from "../../ReusableComponent/dropdown";

class EditWardBoyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wardboy_id: "",
      Wardboy_Name: "",
      Wardboy_Email: "",
      Wardboy_Age: 0,
      // Wardboy_Gender: "",
      Wardboy_Address: "",
      Wardboy_Phoneno: "",
      Wardboy_Addhaar: "",
      // Wardboy_Ward: "",
      Wardboy_salary: "",

      WardBoyDetails: [],
      columnHeaders: [],
      message: "",
      errors: {},
      //////
      GenderRecall: "",
      DropGender: Gender,
      ///////
      WardRecall: "",
      DropWard: Ward,
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
        .getWardBoyDatabyID(pid)
        .then((resp) => {
          console.log(pid);
          console.log(resp.data.rows);
          let WardBoyData = resp.data.rows;
          console.log(WardBoyData);
          this.setState({ Wardboy_id: WardBoyData.Wardboy_id });
          this.setState({ Wardboy_Name: WardBoyData.Wardboy_Name });
          this.setState({ Wardboy_Email: WardBoyData.Wardboy_Email });
          this.setState({ Wardboy_Age: WardBoyData.Wardboy_Age });
          this.setState({ GenderRecall: WardBoyData.Wardboy_Gender });
          this.setState({ Wardboy_Address: WardBoyData.Wardboy_Address });
          this.setState({ Wardboy_Phoneno: WardBoyData.Wardboy_Phoneno });
          this.setState({ Wardboy_Addhaar: WardBoyData.Wardboy_Addhaar });
          this.setState({ WardRecall: WardBoyData.Wardboy_Ward });
          this.setState({ Wardboy_salary: WardBoyData.Wardboy_salary });
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
    }
  };

  getselectedgender = (gender) => {
    this.setState({ GenderRecall: gender });
  };

  WardDropdownSelected = (Ward) => {
    if (Ward === "Select-Ward") {
      alert("wrong input! Please Select from other options!");
    } else {
      console.log(Ward);
      this.setState({ WardRecall: Ward });
    }
  };

  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  clear = () => {
    // this.setState({ Wardboy_id: 0 });
    this.setState({ Wardboy_Name: "" });
    this.setState({ Wardboy_Email: "" });
    this.setState({ Wardboy_Age: 0 });
    this.setState({ Wardboy_Gender: "" });
    this.setState({ Wardboy_Address: "" });
    this.setState({ Wardboy_Phoneno: "" });
    this.setState({ Wardboy_Addhaar: "" });
    this.setState({ Wardboy_Ward: "" });
    this.setState({ Wardboy_salary: "" });
  };
  CancelButton = () => {
    // this.setState({ Patient_id: 0 });
    this.setState({ Wardboy_Name: "" });
    this.setState({ Wardboy_Email: "" });
    this.setState({ Wardboy_Age: 0 });
    this.setState({ Wardboy_Gender: "" });
    this.setState({ Wardboy_Address: "" });
    this.setState({ Wardboy_Phoneno: "" });
    this.setState({ Wardboy_Addhaar: "" });
    this.setState({ Wardboy_Ward: "" });
    this.setState({ Wardboy_salary: "" });
    this.props.history.push("/WardBoy");
  };

  save = () => {
    let errors = {};
    if (
      this.state.Wardboy_Name === "" ||
      this.state.Wardboy_Name === undefined
    ) {
      errors.Wardboy_Name = "Please Enter a valid Patient Name";
    } else if (this.state.Wardboy_Age === "" || this.state.Wardboy_Age === 0) {
      errors.Wardboy_Age = "Please Enter a valid Patient Age";
    } else if (
      this.state.Wardboy_Phoneno === "" ||
      this.state.Wardboy_Phoneno === 0
    ) {
      errors.Wardboy_Phoneno = "Please Enter a valid Patient Phoneno";
    } else if (
      this.state.Wardboy_Address === "" ||
      this.state.Wardboy_Address === undefined
    ) {
      errors.Wardboy_Address = "Please Enter a valid Patient Address";
    } else if (
      this.state.Wardboy_salary === "" ||
      this.state.Wardboy_salary === 0
    ) {
      errors.Wardboy_salary = "Please Enter a valid Patient Room Number";
    } else {
      console.log(
        `this is WardBoyData change in save- ${this.state.Wardboy_id}`
      );
      console.log(
        `this is WardBoyData change in save- ${this.state.Wardboy_Name}`
      );
      console.log(
        `this is WardBoyData change in save- ${this.state.Wardboy_Age}`
      );
      console.log(
        `this is WardBoyData change in save- ${this.state.Patient_Room_no}`
      );

      let WardBoyData = {
        Wardboy_id: this.state.Wardboy_id,
        Wardboy_Name: this.state.Wardboy_Name,
        Wardboy_Email: this.state.Wardboy_Email,
        Wardboy_Age: this.state.Wardboy_Age,
        Wardboy_Gender: this.state.GenderRecall,
        Wardboy_Address: this.state.Wardboy_Address,
        Wardboy_Phoneno: this.state.Wardboy_Phoneno,
        Wardboy_Addhaar: this.state.Wardboy_Addhaar,
        Wardboy_Ward: this.state.WardRecall,
        Wardboy_salary: this.state.Wardboy_salary,
      };
      console.log(`this is WardBoyData change- ${JSON.stringify(WardBoyData)}`);
      console.log("Inside double Save!!");
      this.serv
        .putWardBoyData(WardBoyData.Wardboy_id, WardBoyData)
        .then((resp) => {
          console.log("Inside triple Save!!");
          this.setState({ message: `Data Updated Successfully` });
          console.log("Inside triple Save!!");
          this.props.history.push("/WardBoy");
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
        <h4>Edit WardBoy Details</h4>
        <form>
          <div className="form-group">
            <label htmlFor="Wardboy_id">Wardboy_id</label>
            <input
              type="number"
              name="Wardboy_id"
              className="form-control"
              value={this.state.Wardboy_id}
              readOnly={true}
              //   onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Wardboy_Name">Wardboy_Name</label>
            <input
              type="text"
              name="Wardboy_Name"
              className="form-control"
              value={this.state.Wardboy_Name}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Wardboy_Name}</div>

          <div className="form-group">
            <label htmlFor="Wardboy_Email">Wardboy_Email</label>
            <input
              type="email"
              name="Wardboy_Email"
              className="form-control"
              value={this.state.Wardboy_Email}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Wardboy_Age">Wardboy_Age</label>
            <input
              type="number"
              name="Wardboy_Age"
              className="form-control"
              value={this.state.Wardboy_Age}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Wardboy_Age}</div>

          {/* <div className="form-group">
            <label htmlFor="Wardboy_Gender">Wardboy_Gender</label>
            <input
              type="text"
              name="Wardboy_Gender"
              className="form-control"
              value={this.state.Wardboy_Gender}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div> */}
          <div className>
            <label>Wardboy_Gender</label>
            <DropDownComponent
              dataSource={this.state.DropGender}
              stateProperty={this.state.GenderRecall}
              selectedValue={this.getselectedgender.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Wardboy_Gender}</div>

          <div className="form-group">
            <label htmlFor="Wardboy_Address">Wardboy_Address</label>
            <input
              type="text"
              name="Wardboy_Address"
              className="form-control"
              value={this.state.Wardboy_Address}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Wardboy_Address}</div>

          <div className="form-group">
            <label htmlFor="Wardboy_Phoneno">Wardboy_Phoneno</label>
            <input
              type="number"
              name="Wardboy_Phoneno"
              className="form-control"
              value={this.state.Wardboy_Phoneno}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Wardboy_Phoneno}</div>

          <div className="form-group">
            <label htmlFor="Wardboy_Addhaar">Wardboy_Addhaar</label>
            <input
              type="number"
              name="Wardboy_Addhaar"
              className="form-control"
              value={this.state.Wardboy_Addhaar}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="Wardboy_Ward">Wardboy_Ward</label>
            <input
              type="text"
              name="Wardboy_Ward"
              className="form-control"
              value={this.state.Wardboy_Ward}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div> */}
          <div className>
            <label>Wardboy_Ward*</label>
            <DropDownComponent
              dataSource={this.state.DropWard}
              stateProperty={this.state.WardRecall}
              selectedValue={this.WardDropdownSelected.bind(this)}
            ></DropDownComponent>
          </div>
          <div className="text-danger">{this.state.errors.Wardboy_Ward}</div>

          <div className="form-group">
            <label htmlFor="Wardboy_salary">Wardboy_salary</label>
            <input
              type="number"
              name="Wardboy_salary"
              className="form-control"
              value={this.state.Wardboy_salary}
              onChange={this.handleAllChanges.bind(this)}
            />
          </div>
          <div className="text-danger">{this.state.errors.Wardboy_salary}</div>

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

export default EditWardBoyComponent;
