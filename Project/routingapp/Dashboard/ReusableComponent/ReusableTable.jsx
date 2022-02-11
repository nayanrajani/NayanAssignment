import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResuableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   delete = (evt) => {
  //     this.props.hidden(evt.target.value);
  //   };

  render() {
    return (
      <div className="container">
        <table className="table table-bordered table-striped table-dark">
          <thead>
            <tr className="table-dark">
              {this.props.columnHeaders.map((head, idx) => (
                <th key={idx}>{head}</th>
              ))}
              <th>{this.props.btnEdit}</th>
              <th>{this.props.btnName}</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((d, idx) => (
              <tr key={idx}>
                {this.props.columnHeaders.map((head, i) => (
                  <td key={i}>{d[head]}</td>
                ))}
                <td key="e">
                  <button className="btn btn-primary">
                    <Link
                      style={{ color: "white" }}
                      to={`/${this.props.route}/${d[this.props.Id]}`}
                    >
                      {this.props.btnEdit}
                    </Link>
                  </button>
                </td>
                <td key="d">
                  <button className="btn btn-danger">
                    <Link
                      style={{ color: "white" }}
                      to={`/${this.props.routeDischarge}/${d[this.props.Id]}`}
                    >
                      {this.props.btnName}
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ResuableTable;
