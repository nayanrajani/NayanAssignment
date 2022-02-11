import React, { Component } from "react";
import { EmployeeLogic } from "../models/employeelogic";

class DataTableSearch extends Component {
  constructor() {
    super();
    this.state = {
      isHiddenTable: true,
      isHiddenDelete: true,
      isHiddenSort: true,
      isHiddenPages: true,
      No_of_data: 0,
      Start: 0,
      deleteButton: "Show Delete Option",
      sortButton: "Show Sort Option",
      pageShow: "Show Pages Option",
      EmpNo: 0,
      EmpName: "",
      Designation: "",
      No_of_pages: 0,
      Salary: 0,
      DeptName: "",
      temp: [],
      columnHeaders: [],
      filter: "",
      data: [],
    };

    this.state.data = new EmployeeLogic().getdata();
    this.state.columnHeaders = Object.keys(this.state.data[0]);
    this.state.No_of_data = this.state.data.length;
    this.state.No_of_pages = this.state.data.length;
  }

  searchTxt(e) {
    this.setState({ filter: e.target.value });
  }

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

  //show sort options
  handleShowSort = (evt) => {
    if (evt.target.value === "Show Sort Option") {
      this.state.isHiddenSort = false;
      this.state.sortButton = "Hide Sort Option";
    } else {
      this.state.isHiddenSort = true;
      this.state.sortButton = "Show Sort Option";
    }
    this.setState({ isHiddenSort: this.state.isHiddenSort });
  };

  //logic for sort according to key
  sortProduct = (key) => {
    const types = {
      EmpNo: "EmpNo",
      EmpName: "EmpName",
      Designation: "Designation",
      Salary: "Salary",
    };
    const p = types[key];
    if (key === "Salary" || key === "EmpNo") {
      this.state.data.sort((a, b) => a[p] - b[p]);
    } else {
      this.state.data.sort((a, b) => {
        let fa = a[p].toLowerCase(),
          fb = b[p].toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({ data: this.state.data });
  };

  //call sort logic on click on key
  handleSort = (evt) => {
    this.sortProduct(evt.target.value);
  };

  //show pagination
  handlePagination = (evt) => {
    if (evt.target.value === "Show Pages Option") {
      this.state.isHiddenPages = false;
      this.state.pageShow = "Hide Pages Option";
    } else {
      this.state.isHiddenPages = true;
      this.state.pageShow = "Show Pages Option";
    }
    this.setState({ isHiddenPages: this.state.isHiddenPages });
  };

  //take input from text box for how many rows will show
  handlePageInput = (evt) => {
    this.setState({ No_of_pages: evt.target.value });
  };

  //logic for showing table
  showTable = (s, p) => {
    let clone = this.state.data.slice(0);
    let new_arr = clone.splice(s, p);
    console.log(new_arr);
    let arr = [];
    arr.push(
      new_arr.map((emp, idx) => (
        <tr key={idx} onClick={() => this.getSelectedEmployeeFromTable(emp)}>
          {this.state.columnHeaders.map((head, i) => (
            <td key={i}>{emp[head]}</td>
          ))}
          <td>
            <button
              value={emp["EmpNo"]}
              className="btn btn-danger"
              onClick={this.deleteEle}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    );

    return arr;
  };

  //set starting value for every page
  handleRoutePages = (evt) => {
    this.state.Start = (evt.target.id - 1) * this.state.No_of_pages;
    this.setState({ Start: this.state.Start });
  };

  //code for pagination
  paginationCode = () => {
    let arr = [];
    let p = parseInt(this.state.No_of_data / this.state.No_of_pages);
    if (this.state.No_of_data % this.state.No_of_pages !== 0) p += 1;
    for (let i = 1; i <= p; i++) {
      arr.push(
        <li class="page-item">
          <a
            onClick={this.handleRoutePages.bind(this)}
            class="page-link"
            href="#"
            key={i}
            id={i}
          >
            {i}
          </a>
        </li>
      );
    }
    return arr;
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
      <div>
        <center>
          <h1>Table sorting</h1>
          <hr />
          {/* Search:{" "}
          <input
            type="search"
            value={filter}
            onChange={this.searchTxt.bind(this)}
            name="Search"
            placeholder="Search.."
          />
          <hr /> */}
          <div>
            {/* <strong>Sorting Table</strong> */}
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {this.state.columnHeaders.map((rec, idx) => (
                    <td key={idx}>
                      <input
                        type="radio"
                        onChange={this.handleSort.bind(this)}
                        id={idx}
                        value={rec}
                        name="check"
                      />
                      <th>{rec}</th>
                    </td>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          {/* <Dropdown dataSource={this.state.columnHeaders}></Dropdown>  */}
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {this.state.columnHeaders.map((head, idx) => (
                  <th key={idx}>{head}</th>
                ))}
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {/* Call a method and pass data to it */}
              {this.showTable(this.state.Start, this.state.No_of_pages)}
              {/* Datasearch.map((emp, idx) => (
              <tr
                key={idx}
                onClick={() => this.getSelectedEmployeeFromTable(emp)}
              >
                {this.state.columnHeaders.map((head, i) => (
                  <td key={i}>{emp[head]}</td>
                ))}
                <td>
                  <button
                    value={emp["EmpNo"]}
                    className="btn btn-danger"
                    onClick={this.deleteEle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              ) */}
            </tbody>
          </table>
          <strong>EmpNo from Selected Row</strong>
          <h6>EmpNo: {this.state.temp}</h6>
          <br />
          <center>
            <div>
              <br />
              <strong>Number of Rows</strong> &nbsp;
              <input type="number" onChange={this.handlePageInput.bind(this)} />
              <ul class="pagination">{this.paginationCode()}</ul>
            </div>
          </center>
        </center>
      </div>
    );
  }
}

export default DataTableSearch;
