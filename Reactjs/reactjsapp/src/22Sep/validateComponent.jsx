import React from "react";
import "./validate.css";
import validate from "./validatesummary";

class validatesummary extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
    };

    this.logic = new validate();

    this.state.errors = this.logic.validate();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log(this.state);

      let input = {};
      input["username"] = "";
      input["email"] = "";
      input["password"] = "";

      this.setState({ input: input });

      alert("Form is submitted");
    }
  }

  render() {
    return (
      <center>
        <div id="okay">
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label for="username">Username:</label>
              <input
                type="text"
                name="username"
                value={this.state.input.username}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Enter username"
                id="username"
              />
            </div>

            <div class="form-group">
              <label for="email">Email Address:</label>
              <input
                type="text"
                name="email"
                value={this.state.input.email}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Enter email"
                id="email"
              />

              <div className="text-danger">{this.state.errors.email}</div>
            </div>

            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                name="password"
                value={this.state.input.password}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Enter password"
                id="password"
              />

              <div className="text-danger">{this.state.errors.password}</div>
            </div>

            <input type="submit" value="Submit" class="btn btn-success" />
          </form>
        </div>
      </center>
    );
  }
}

export default validatesummary;
