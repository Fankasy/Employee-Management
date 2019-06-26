import { Link } from "react-router-dom";
import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  handleInput = e => {
    this.setState({ input: e.target.value });
    this.props.onSearch(e.target.value);
  };

  submit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.input);
    this.setState({ input: "" });
  };
  
  handleReset = () => {
      this.props.onToReset(true);// set reset to true
      this.props.setResultField("getEmployees");//set back resultField
      this.props.getEmployees(1);
  }
  
  render() {
    return (
      <div className="search">
        <nav className="navbar navbar-light bg-light justify-content-between">
          <form className="form-inline" onSubmit={this.submit}>
            <div className="form-group row">
              <input
                className="form-control mr-sm-2"
                type="search"
                id="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.input}
                onChange={this.handleInput}
              />
            </div>
          </form>
          <div className ="row">
          <button type="button" className="btn btn-success  btn-sm" onClick={this.handleReset}>Reset Filter</button>
          <Link to="/create">
            <button type="button" className="btn btn-primary btn-sm">
              Add New Employee
            </button>
          </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Search;
