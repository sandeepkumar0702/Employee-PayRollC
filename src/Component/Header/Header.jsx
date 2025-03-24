import React, { Component } from "react";
import logo from "../../assets/logo.jpeg";
import { FaUserCircle } from "react-icons/fa";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("googleUser")) || {},
      currentPath: window.location.pathname,
    };
  }
  render() {
    const { user, currentPath } = this.state;
    const isLoginPage = currentPath === "/login";
    const displayName = isLoginPage
      ? "Guest"
      : `${user.given_name || ""} ${user.family_name || ""}`.trim() || "User";
    return (
      <header className="w-full h-[13.25vh] bg-white relative">
        <div className="flex items-center justify-between px-[5%] mt-6">
          <div className="flex gap-1">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <a href="Dashboard.html" className="no-underline">
              <p className="font-bold text-[#82A70C]">EMPLOYEE</p>
              <p className="text-[#42515F]">PAYROLL</p>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-[#42515F] w-8 h-8" />
            <span className="text-[#42515F] font-medium">{displayName}</span>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
