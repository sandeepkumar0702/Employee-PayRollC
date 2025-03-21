import React, { Component } from "react";
import Header from "../Header/Header"; // Importing Header Component
class PayrollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      department: [],
      salary: "",
      startDate: { day: "", month: "", year: "" },
      notes: "",
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      this.setState((prevState) => ({
        department: checked
          ? [...prevState.department, value]
          : prevState.department.filter((dept) => dept !== value),
      }));
    } else {
      this.setState({ [name]: value });
    }
  };

  handleDateChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      startDate: { ...prevState.startDate, [name]: value },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", this.state);
  };

  handleReset = () => {
    this.setState({
      name: "",
      gender: "",
      department: [],
      salary: "",
      startDate: { day: "", month: "", year: "" },
      notes: "",
    });
  };

  render() {
    return (
      <div id="header-div"
        style={{
          width: "50%",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <Header  /> {/* Rendering Header as a child component */}
        <form onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />

          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={this.handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={this.handleChange}
          />{" "}
          Female
          <br />

          <label>Department:</label>
          {["HR", "Sales", "Finance", "Engineer", "Others"].map((dept) => (
            <label key={dept}>
              <input type="checkbox" value={dept} onChange={this.handleChange} /> {dept}
            </label>
          ))}
          <br />

          <label>Salary:</label>
          <select name="salary" value={this.state.salary} onChange={this.handleChange}>
            <option value="">Select Salary</option>
            <option value="5000">$5000</option>
            <option value="10000">$10000</option>
          </select>
          <br />

          <label>Start Date:</label>
          <select name="day" value={this.state.startDate.day} onChange={this.handleDateChange}>
            <option value="">Day</option>
            {[...Array(31).keys()].map((d) => (
              <option key={d + 1}>{d + 1}</option>
            ))}
          </select>
          <select name="month" value={this.state.startDate.month} onChange={this.handleDateChange}>
            <option value="">Month</option>
            {["Jan", "Feb", "Mar", "Apr", "May"].map((m, i) => (
              <option key={i}>{m}</option>
            ))}
          </select>
          <select name="year" value={this.state.startDate.year} onChange={this.handleDateChange}>
            <option value="">Year</option>
            {[2023, 2024, 2025].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
          <br />

          <label>Notes:</label>
          <textarea name="notes" value={this.state.notes} onChange={this.handleChange}></textarea>
          <br />

          <button type="submit">Submit</button>
          <button type="button" onClick={this.handleReset}>
            Reset
          </button>
        </form>
      </div>
    );
  }
}

export default PayrollForm;
