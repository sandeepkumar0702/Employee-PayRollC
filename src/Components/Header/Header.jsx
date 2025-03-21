import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header
        
        style={{
          padding: "10px",
          background: "#f8f9fa",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Employee Payroll Form
      </header>
    );
  }
}

export default Header;
