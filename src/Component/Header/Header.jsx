import React from 'react';
import logo from '../../assets/logo.jpeg'; 

const Header = () => {
  return (
    <header className="w-full h-[13.25vh] bg-white relative">
      <div className="flex gap-1 ml-[5%] mt-6">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <a href="Dashboard.html" className="no-underline">
          <p className="font-bold text-[#82A70C]">EMPLOYEE</p>
          <p className="text-[#42515F]">PAYROLL</p>
        </a>
      </div>
    </header>
  );
};

export default Header;