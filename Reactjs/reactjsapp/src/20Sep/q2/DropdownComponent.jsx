import React, { Component } from "react";
import Dropdown from "./DropdownMultiSelect";
class ReuseDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: ["IT", "HR", "SALES", "ACCOUNTS", "TRAINING", "ADMIN"],
      cities: ["Manager", "Engineer", "Operator", "Lead", "Sr. Manager"],
    };
  }
  render() {
    return (
      <center>
        <br />
        <div className="container">
          <strong>Department</strong>
          <Dropdown dataSource={this.state.states}></Dropdown>
          <hr />
          <strong>Designation</strong>
          <Dropdown dataSource={this.state.cities}></Dropdown>
        </div>
      </center>
    );
  }
}

export default ReuseDropdown;
