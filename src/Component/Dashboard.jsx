import React, { Component, createRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Search, Plus, Trash2, Pencil } from "lucide-react";
import PropTypes from "prop-types";

const withNavigate = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      employees: [],
      loading: false,
      error: null,
      isModalOpen: false,
      employeeIdToDelete: null,
      showSearch: false,
    };
    this.searchRef = createRef();
  }

  componentDidMount() {
    this.fetchEmployees();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  fetchEmployees = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`);
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      this.setState({ employees: data.reverse(), loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleDelete = (id) => {
    this.setState({ isModalOpen: true, employeeIdToDelete: id });
  };

  confirmDelete = async () => {
    const { employeeIdToDelete } = this.state;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${employeeIdToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
      this.setState((prevState) => ({
        employees: prevState.employees.filter((emp) => emp.id !== employeeIdToDelete),
        isModalOpen: false,
      }));
    } catch (error) {
      this.setState({ error: "Failed to delete employee" });
    }
  };

  handleEdit = (employee) => {
    this.props.navigate("/registration", { state: { employee, isEdit: true } });
  };

  handleAddUser = () => {
    this.props.navigate("/registration");
  };

  toggleSearch = () => {
    this.setState((prevState) => ({ showSearch: !prevState.showSearch }));
  };

  handleClickOutside = (event) => {
    if (this.searchRef.current && !this.searchRef.current.contains(event.target)) {
      this.setState({ showSearch: false });
    }
  };

  render() {
    const { searchTerm, employees, loading, error, showSearch } = this.state;
    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header />

        <div className="max-w-6xl mx-auto my-5 p-5 bg-white border border-gray-100 shadow-md rounded-lg">
        
          <div className="flex flex-col md:flex-row justify-between items-center mb-5 space-y-4 md:space-y-0">
            <h1 className="text-2xl font-normal text-gray-700">Employee Details</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative flex items-center" ref={this.searchRef}>
                {showSearch && (
                  <input
                    type="text"
                    id="searchInput"
                    value={searchTerm}
                    placeholder="Enter name.."
                    onChange={this.handleSearch}
                    className="p-2 border border-gray-300 rounded w-full md:w-[250px] text-sm focus:outline-none focus:border-[#82A70C] focus:ring-1 focus:ring-[#82A70C] pr-10 transition-all"
                  />
                )}
                <button className="absolute right-3 cursor-pointer" onClick={this.toggleSearch} data-testid="toggle-search">
                  <Search className="text-gray-400 w-5 h-5" />
                </button>
              </div>
              <button
                onClick={this.handleAddUser}
                className="flex items-center gap-2 bg-[#82A70C] text-white border-none rounded px-5 py-2.5 text-base hover:bg-[#7CB342] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add User
              </button>
            </div>
          </div>

          <div className="mt-2.5 overflow-x-auto">
            <div className="min-w-[768px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="p-4"></th>
                    <th className="text-left p-3">NAME</th>
                    <th className="p-3 text-left">GENDER</th>
                    <th className="p-3 text-left">DEPARTMENT</th>
                    <th className="p-3 text-left">SALARY</th>
                    <th className="p-3 text-left">START DATE</th>
                    <th className="p-3 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="6" className="p-3 text-center text-gray-500">
                        Loading employees...
                      </td>
                    </tr>
                  )}
                  {!loading && error && (
                    <tr>
                      <td colSpan="6" className="p-3 text-center text-red-500">
                        Error: {error}
                      </td>
                    </tr>
                  )}
                  {!loading && !error && filteredEmployees.length > 0 &&
                    filteredEmployees.map((employee, index) => (
                      <tr key={employee.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                        <td className="p-3">
                          <img
                            src={`../../public${employee.profileImage}`}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover mr-2.5"
                            onError={(e) => (e.target.src = "https://via.placeholder.com/40")}
                          />
                        </td>
                        <td className="p-3">{employee.name}</td>
                        <td className="p-3">{employee.gender}</td>
                        <td className="p-3">
                          {employee.departments.map((dept) => (
                            <span key={dept} className="inline-block bg-[#E9FEA5] text-black rounded-[13px] px-2.5 py-1 text-xs mr-1.5">
                              {dept}
                            </span>
                          ))}
                        </td>
                        <td className="p-3">{employee.salary}</td>
                        <td className="p-3">{employee.startDate}</td>
                        <td className="p-3">
                          <div className="flex gap-2.5">
                            <button  aria-label="Edit employee"
  data-testid={`edit-button-${employee.id}`} className="text-[#9CA3AF] hover:text-[#7CB342] cursor-pointer" onClick={() => this.handleEdit(employee)}>
                              <Pencil />
                            </button>
                            <button  aria-label="Delete employee"
  data-testid={`delete-button-${employee.id}`} className="text-[#9CA3AF] hover:text-red-600 cursor-pointer" onClick={() => this.handleDelete(employee.id)}>
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {
                    !loading && !error && filteredEmployees.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-3 text-center text-gray-500">
                          No employees found
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
          {this.state.isModalOpen && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
            <div className="fixed p-8 top-1/2 left-1/2 rounded-md transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 ">
              <h2 className="text-xl font-bold text-[#42515F]">Are you sure you want to delete the employee?</h2>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => this.setState({ isModalOpen: false, employeeIdToDelete: null })}
                  className="py-2 px-4 border border-[#969696] rounded cursor-pointer bg-[#82A70C] hover:bg-[#707070] text-white hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={this.confirmDelete}
                  className="py-2 px-4 border border-[#969696] rounded cursor-pointer bg-[red] hover:bg-[#707070] text-white hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default withNavigate(Dashboard);
