import React, { Component } from "react";

// imporing the constants
import { Designations, Departments } from "./../models/constants";
import { EmployeeLogic } from "./../models/employeelogic";

class EmployeeFormComponentReusable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: [],
      filter: "",
      data: {
        EmpNo: 0,
        EmpName: "",
        Salary: 0,
        Designation: "",
        DeptName: "",
        departments: Departments,
        designations: Designations,
        employees: [],
        columnHeaders: [],
      },
    };

    // define an instance of the external class i.e. EmployeeLogic
    // Please do not dclare or initialize anything before the state property for optimization reason
    this.logic = new EmployeeLogic();
    // read default employees (Logically illigal)
    this.state.employees = this.logic.getEmployees();
    this.state.columnHeaders = Object.keys(this.state.data[0]);
  }

  searchTxt(e) {
    this.setState({ filter: e.target.value });
  }

  // writing the chnage event onece-For-All editable elements

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(
        `Designation = ${this.state.Designation} and DeptName = ${this.state.DeptName}`
      );
    });
  };

  getSelectedEmployeeFromTable = (emp) => {
    // alert(`Selected Employee ${JSON.stringify(emp)} `);
    this.setState({ temp: [emp.EmpNo] });
    //   this.setState({ temp: [emp.EmpName] });
    //   this.setState({ temp: [emp.Designation] });
    //   this.setState({ temp: [emp.Salary] });
    //   this.setState({ temp: [emp.DeptName] });
  };

  getSelectedEmployeeFromTabledeleteid = (emp) => {
    alert(`Selected Employee ${JSON.stringify(emp)} `);
    this.setState({ EmpNo: emp.EmpNo });
    this.setState({ EmpName: [emp.EmpName] });
    this.setState({ Designation: emp.Designation });
    this.setState({ Salary: emp.Salary });
    this.setState({ DeptName: emp.DeptName });
  };

  deleteEle = (evt) => {
    let temp = this.state.data.findIndex(
      (item) => item.EmpNo == evt.target.value
    );
    this.state.data.splice(temp, 1);
    this.setState((prevState, prevProp) => {
      console.log(prevState.data);
      return { data: prevState.data };
    });
  };

  render() {
    let { filter, data } = this.state;

    let Datasearch = data.filter((item) => {
      return Object.keys(item).some(
        (key) =>
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(filter.toLowerCase())
      );
    });

    return (
      <div className="container">
        <center>
          <h1>Type to sort and search in table</h1>
          <hr />
          Search:{" "}
          <input
            type="text"
            value={filter}
            onChange={this.searchTxt.bind(this)}
            name="Search"
            placeholder="Search.."
          />
          <hr />
          <h3>List of Employees</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {this.state.columnHeaders.map((head, idx) => (
                  <th key={idx}>{head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Call a method and pass data to it */}
              {Datasearch.map((emp, idx) => (
                <tr
                  key={idx}
                  onClick={() => this.getSelectedEmployeeFromTable(emp)}
                >
                  {this.state.columnHeaders.map((head, i) => (
                    <td key={i}>{emp[head]}</td>
                  ))}
                  <button value={emp["EmpNo"]} onClick={this.deleteEle}>
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
          <strong>EmpNo from Selected Row</strong>
          <h6>EmpNo: {this.state.temp}</h6>
        </center>
      </div>
    );
  }
}

export default EmployeeFormComponentReusable;
