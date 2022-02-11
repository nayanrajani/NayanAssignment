import React, { Component } from "react";
import "./dropdown.css";
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: [],
    };
  }

  handleChanged = (evt) => {
    let value = Array.from(
      evt.target.selectedOptions,
      (option) => option.value
    );
    this.setState({ temp: [value] });
  };

  render() {
    if (this.props.dataSource === undefined) {
      return (
        <div className="container">
          <strong>No Data Passed</strong>
        </div>
      );
    } else {
      return (
        <div id="ok" class="body">
          <select
            multiple
            className="form-control"
            value={this.props.stateProperty}
            onChange={this.handleChanged.bind(this)}
          >
            {this.props.dataSource.map((rec, idx) => (
              <option key={idx} value={rec}>
                {rec}
              </option>
            ))}
          </select>
          <strong>Selected :- {this.state.temp + ","}</strong>
        </div>
      );
    }
  }
}

export default Dropdown;
