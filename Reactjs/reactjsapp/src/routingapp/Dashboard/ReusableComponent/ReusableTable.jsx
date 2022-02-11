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

  handleSort = (evt) => {
    this.props.dataSource.sort((a, b) => {
        if (a[evt.target.name] < b[evt.target.name]) {
            return -1;
        }
        if (a[evt.target.name] > b[evt.target.name]) {
            return 1;
        }
        return 0;
    });
    this.setState({ dataSource: this.props.dataSource });
}
// for Sort Buttton className="btn btn-info btn-sm"
  render() {
    return (
      <div className="container" style={{overflowX: "scroll"}}>
        <table className="table table-bordered table-striped table-dark" >
          <thead>
            <tr className="table-dark">
              {this.props.columnHeaders.map((head, idx) => (
                <th key={idx}>{head}&nbsp;<button className="btn btn-warning" name={head} style={{fontSize: "13px"}} onClick={this.handleSort.bind(this)}>↑↓</button></th>
              ))}
              <th hidden={this.props.showdata1}>{this.props.btnEdit}</th>
              <th hidden={this.props.showdata}>{this.props.btnName}</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((d, idx) => (
              <tr key={idx}>
                {this.props.columnHeaders.map((head, i) => (
                  <td key={i}>{d[head]}</td>
                ))}
                <td key="e" hidden={this.props.showdata1}>
                  <button
                    className="btn btn-primary"
                    hidden={this.props.showdata1}
                  >
                    <Link
                      style={{ color: "white" }}
                      to={`/${this.props.route}/${d[this.props.Id]}`}
                    >
                      {this.props.btnEdit}
                    </Link>
                  </button>
                </td>
                <td key="d" hidden={this.props.showdata}>
                  <button
                    className="btn btn-danger"
                    hidden={this.props.showdata}
                  >
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
