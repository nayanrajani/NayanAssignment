import React from "react";
import "./validate.css";

class ValidationComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
    };

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

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["username"]) {
      isValid = false;
      errors["username"] = "Please enter your username.";
    }

    if (typeof input["username"] !== "undefined") {
      const re = /^\S*$/;
      if (input["username"].length < 6 || !re.test(input["username"])) {
        isValid = false;
        errors["username"] = "Please enter valid username.";
      }
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (typeof input["password"] !== "undefined") {
      if (input["password"].length < 6) {
        isValid = false;
        errors["password"] = "Please add at least 6 charachter.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
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
            </div>
            <br />

            <input type="submit" value="Submit" class="btn btn-success" />
            <br />
            <br />
            <div className="text-danger">{this.state.errors.username}</div>
            <br />
            <div className="text-danger">{this.state.errors.email}</div>
            <br />
            <div className="text-danger">{this.state.errors.password}</div>
          </form>
        </div>
      </center>
    );
  }
}

export default ValidationComponent;
