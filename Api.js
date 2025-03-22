import axios from "axios";

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await axios.get("http://localhost:3001/employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};