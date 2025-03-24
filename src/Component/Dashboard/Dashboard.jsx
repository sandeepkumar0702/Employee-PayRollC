import React, { Component } from "react";
import Header from "../Header/Header";
import { deleteEmployee, fetchEmployees } from "../../../Api";
import { useNavigate } from "react-router-dom";
function DashboardWrapper(props) {
  const navigate = useNavigate();
  return <Dashboard {...props} navigate={navigate} />;
}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      searchTerm: "",
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = async () => {
    try {
      const employees = await fetchEmployees();
      console.log("Fetched employees:", employees);
      this.setState({ employees, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        this.setState((prevState) => ({
          employees: prevState.employees.filter(
            (employee) => employee.id !== id
          ),
        }));
        console.log(`Employee with ID ${id} deleted`);
      } catch (error) {
        alert("Failed to delete employee");
      }
    }
  };

  handleAddUser = () => {
    const isLoggedIn = !!localStorage.getItem("googleUser"); // Check if user is logged in
    if (isLoggedIn) {
      this.props.navigate("/payroll-form"); // Navigate to the correct route
    } else {
      this.props.navigate("/"); // Redirect to login page
    }
  };

  render() {
    const { employees, searchTerm, loading, error } = this.state;
    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 font-sans">
          <div className="max-w-6xl mx-auto my-5 p-5 bg-white border border-gray-100 shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-2xl font-normal text-gray-700">
                Employee Details
              </h1>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={this.handleSearch}
                  className="p-2 border border-gray-300 rounded w-[250px] text-sm focus:outline-none focus:border-[#82A70C] focus:ring-1 focus:ring-[#82A70C]"
                />
                <button
                  onClick={this.handleAddUser}
                  className="bg-[#8BC34A] text-white border-none rounded px-5 py-2.5 text-base hover:bg-[#7CB342]"
                >
                  Add User
                </button>
              </div>
            </div>

            <div className="mt-2.5 overflow-x-auto">
              {loading ? (
                <p>Loading employees...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : filteredEmployees.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="p-3 text-left">NAME</th>
                      <th className="p-3 text-left">GENDER</th>
                      <th className="p-3 text-left">DEPARTMENT</th>
                      <th className="p-3 text-left">SALARY</th>
                      <th className="p-3 text-left">START DATE</th>
                      <th className="p-3 text-left">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr
                        key={employee.id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="p-3">
                          <div className="flex items-center">
                            <img
                              src={employee.profileImage}
                              alt={employee.name}
                              className="w-10 h-10 rounded-full object-cover mr-2.5"
                              onError={(e) =>
                                (e.target.src =
                                  "https://via.placeholder.com/40")
                              }
                            />
                            {employee.name}
                          </div>
                        </td>
                        <td className="p-3">{employee.gender}</td>
                        <td className="p-3">
                          {employee.departments.map((dept, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-green-100 text-green-600 rounded-full px-2.5 py-1 text-xs mr-1.5"
                            >
                              {dept}
                            </span>
                          ))}
                        </td>
                        <td className="p-3">{employee.salary}</td>
                        <td className="p-3">{employee.startDate}</td>
                        <td className="p-3">
                          <div className="flex gap-2.5">
                            <span className="text-blue-600 cursor-pointer">
                              Edit
                            </span>
                            <span
                              className="text-red-600 cursor-pointer"
                              onClick={() => this.handleDelete(employee.id)}
                            >
                              Delete
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="p-3 text-center text-gray-500">
                  No employees found
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DashboardWrapper;
