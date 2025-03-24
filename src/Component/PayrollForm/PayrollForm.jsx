import React, { Component } from 'react';
import person1 from '../../assets/person1.jpeg';
import person2 from '../../assets/person2.jpeg';
import person3 from '../../assets/person3.jpeg';
import person4 from '../../assets/person4.jpeg';
import Header from '../Header/Header';
import axios from 'axios';

class PayrollForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      profileImage: '',
      gender: '',
      department: [],
      salary: '',
      day: '',
      month: '',
      year: '',
      notes: ''
    };
    const editUserData = localStorage.getItem('editUserData');
    if (editUserData) {
      const employeeData = JSON.parse(editUserData);
      this.state = {
        ...this.state,
        name: employeeData.name,
        profileImage:employeeData.profileImage,
        gender: employeeData.gender,
        departments: employeeData.departments,
        salary: employeeData.salary,
        startDate: employeeData.startDate,
        notes:employeeData.notes,
        day:employeeData.day,
        month:employeeData.month,
        year:employeeData.year

      };
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, profileImage, gender, department, salary, day, month, year, notes } = this.state;
    
    // Validation
    if (!name || !profileImage || !gender || department.length === 0 || !salary || !day || !month || !year) {
      alert("Please fill in all required fields.");
      return;
    }
  
    // Combine date
    const startDate = `${day}-${month}-${year}`;
  
    // Prepare data object
    const employeeData = {
      name,
      profileImage,
      gender,
      departments: department, // Match the field name expected by JSON Server
      salary,
      startDate,
      notes
    };
  
    try {
      // Check if we're editing an existing employee
      const editUserData = localStorage.getItem('editUserData');
      
      if (editUserData) {
        // We're updating an existing employee
        const employeeToEdit = JSON.parse(editUserData);
        const employeeId = employeeToEdit.id;
        
        // PUT request to update the employee
        const response = await axios.put(`http://localhost:5001/employees/${employeeId}`, employeeData);
        
        if (response.status === 200) {
          alert("Employee updated successfully!");
          localStorage.removeItem('editUserData'); // Clear the stored edit data
          window.location.href = "/Pages/dashboard.html"; // Redirect
        } else {
          throw new Error("Failed to update data");
        }
      } else {
        // We're creating a new employee
        const response = await axios.post("http://localhost:5001/employees", employeeData);
        
        if (response.status === 201) {
          alert("Employee added successfully!");
          this.handleReset();
          window.location.href = "/Pages/dashboard.html"; // Redirect
        } else {
          throw new Error("Failed to store data");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while saving employee data.");
    }
  };
  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   localStorage.removeItem('editUserData');
  //   console.log(this.state);
  //   const { name, profileImage, gender, department, salary, day, month, year, notes } = this.state;
  //   console.log(name+profileImage+gender+department+salary);

  //   // Validation
  //   if (!name || !profileImage || !gender || department.length === 0 || !salary || !day || !month || !year) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   // Combine date
  //   const startDate = `${day}-${month}-${year}`;

  //   // Prepare data object
  //   const employeeData = {
  //     name,
  //     profileImage,
  //     gender,
  //     departments: department, // Match the field name expected by JSON Server
  //     salary,
  //     startDate,
  //     notes
  //   };

  //   try {
  //     // POST to JSON Server
  //     const response = await axios.post("http://localhost:5001/employees", employeeData);
  //     if (response.status === 201) {
  //       alert("Employee added successfully!");
  //       this.handleReset();
  //       window.location.href = "/Pages/dashboard.html"; // Redirect (adjust if using React Router)
  //     } else {
  //       throw new Error("Failed to store data");
  //     }
  //   } catch (error) {
  //     console.error("Submission error:", error);
  //     alert("Something went wrong while saving employee data.");
  //   }
  // };

  handleReset = () => {
    this.setState({
      name: '',
      profileImage: '',
      gender: '',
      department: [],
      salary: '',
      day: '',
      month: '',
      year: '',
      notes: ''
    });
  };

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      this.setState(prevState => {
        const department = checked
          ? [...prevState.department, value]
          : prevState.department.filter(dep => dep !== value);
        return { department };
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    const { name, profileImage, gender, department, salary, day, month, year, notes } = this.state;

    return (
      <main >
        <Header />
        
        <div className="w-full bg-gray-100 p-8 flex-1 mt-4">
          <form 
            className="max-w-4xl mx-auto bg-white p-4 flex flex-col gap-6 text-[#42515F]"
            id="employeeForm" 
            onSubmit={this.handleSubmit}
          >
            <h2 className="text-3xl font-bold text-[#42515F] capitalize">Employee Payroll Form</h2>
            <div className="flex flex-col gap-7">
              <div className="flex items-center gap-4 md:flex-row flex-col">
                <label htmlFor="name" className="w-1/3">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                  required
                  pattern="[A-Za-z\s]+"
                  title="Only letters are allowed"
                  className="w-full md:w-2/3 h-10 p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center gap-2 md:flex-row flex-col">
                <label className="w-1/3">Profile image</label>
                <div className="flex gap-8 md:w-2/3 flex-col md:flex-row">
                  {[
                    { value: "/Assets/person1.jpeg", src: person2 },
                    { value: "/Assets/person2.jpeg", src: person1 },
                    { value: "/Assets/person3.jpeg", src: person4 },
                    { value: "/Assets/person4.jpeg", src: person3 }
                  ].map((img, index) => (
                    <label key={index} className="flex gap-5 items-center">
                      <input
                        type="radio"
                        name="profileImage"
                        value={img.value}
                        checked={profileImage === img.value}
                        onChange={this.handleInputChange}
                        className="w-5 h-5"
                      />
                      <img src={img.src} alt={`Profile ${index + 1}`} className="w-8 h-8 rounded-full" />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 md:flex-row flex-col">
                <div className="w-1/3">
                  <label>Gender</label>
                </div>
                <div className="flex gap-6 md:w-2/3 flex-col md:flex-row">
                  {['male', 'female'].map(genderOption => (
                    <label key={genderOption} className="flex gap-3 items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={genderOption}
                        checked={gender === genderOption}
                        onChange={this.handleInputChange}
                        className="w-5 h-5"
                      />
                      <p>{genderOption.charAt(0).toUpperCase() + genderOption.slice(1)}</p>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 md:flex-row flex-col">
                <label className="w-1/3">Department</label>
                <div className="flex gap-4 md:w-2/3 flex-col md:flex-row">
                  {['HR', 'sales', 'finance', 'enginer', 'others'].map(dept => (
                    <label key={dept} className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        name="department"
                        value={dept}
                        checked={department.includes(dept)}
                        onChange={this.handleInputChange}
                        className="w-5 h-5 border border-gray-300 rounded"
                      />
                      <p>{dept.charAt(0).toUpperCase() + dept.slice(1)}</p>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 md:flex-row flex-col">
                <label htmlFor="salary" className="w-1/3">Select Salary</label>
                <div className="md:w-2/3 w-full">
                  <select
                    id="salary"
                    name="salary"
                    value={salary}
                    onChange={this.handleInputChange}
                    required
                    className="w-full md:w-1/2 h-10 p-2 border border-gray-300 rounded text-[#42515F]"
                  >
                    <option value="" disabled>Select Salary</option>
                    {['₹10,000', '₹20,000', '₹30,000'].map(sal => (
                      <option key={sal} value={sal}>{sal}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 md:flex-row flex-col">
                <label className="w-1/3">Start Date</label>
                <div className="flex gap-4 md:w-2/3 flex-col md:flex-row">
                  <select
                    id="day"
                    name="day"
                    value={day}
                    onChange={this.handleInputChange}
                    required
                    className="w-full md:w-1/4 h-10 p-2 border border-gray-300 rounded text-[#42515F]"
                  >
                    <option value="" disabled>Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    id="month"
                    name="month"
                    value={month}
                    onChange={this.handleInputChange}
                    required
                    className="w-full md:w-1/4 h-10 p-2 border border-gray-300 rounded text-[#42515F]"
                  >
                    <option value="" disabled>Month</option>
                    {[
                      'January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'
                    ].map((month, index) => (
                      <option key={month} value={String(index + 1).padStart(2, '0')}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    id="year"
                    name="year"
                    value={year}
                    onChange={this.handleInputChange}
                    required
                    className="w-full md:w-1/4 h-10 p-2 border border-gray-300 rounded text-[#42515F]"
                  >
                    <option value="" disabled>Year</option>
                    {[2021, 2022, 2023, 2024, 2025].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 md:flex-row flex-col">
                <label className="w-1/3" htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={notes}
                  onChange={this.handleInputChange}
                  className="w-full md:w-2/3 h-18 p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-between items-center flex-col md:flex-row gap-4">
                <div>
                  <a href="Dashboard.html" className="no-underline text-black">
                    <button type="button" className="w-full px-12 py-3 border border-gray-400 rounded bg-gray-200 hover:bg-gray-500 hover:text-white">
                      Cancel
                    </button>
                  </a>
                </div>
                <div className="flex gap-4 flex-col md:flex-row w-full md:w-auto">
                  <button 
                    type="submit" 
                    className="px-12 py-3 border border-gray-400 rounded bg-gray-200 hover:bg-[#82A70C] hover:text-white"
                  >
                    Submit
                  </button>
                  <button 
                    type="button" 
                    onClick={this.handleReset}
                    className="px-12 py-3 border border-gray-400 rounded bg-gray-200 hover:bg-gray-500 hover:text-white"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
export default PayrollForm;
