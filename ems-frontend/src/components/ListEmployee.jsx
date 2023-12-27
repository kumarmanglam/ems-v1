import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function ListEmployee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);
  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const navigator = useNavigate();
  function addNewEmployee() {
    navigator("/add-employee");
  }
  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }
  function deleteHandler(id) {
    deleteEmployee(id)
      .then((response) => {
        console.log(response.data);
        getAllEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="container mt-5">
      <h2>List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateEmployee(item.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm mx-2"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployee;
