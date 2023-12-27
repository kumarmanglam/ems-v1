import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          if (response != null) {
            setFormData(response.data);
          }
        })
        .catch((error) => {
          console.log("got error while fetching single employee");
          console.log(error);
        });
    }
  }, [id]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Emplyee</h2>;
    } else {
      return <h2 className="text-center">Add Emplyee</h2>;
    }
  }
  // function handleData(e, name){
  //   setFormData({...formData, name : e.target.value})
  // }
  function validate() {
    let valid = true;
    const errorsCopy = { ...errors };
    // if input is present then error is nothing
    if (formData.firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      valid = false;
      errorsCopy.firstName = "First name is required";
    }
    if (formData.lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      valid = false;
      errorsCopy.lastName = "Last name is required";
    }
    if (formData.email.trim()) {
      errorsCopy.email = "";
    } else {
      valid = false;
      errorsCopy.email = "Email is required";
    }
    setErrors(errorsCopy);
    return valid;
  }
  const navigator = useNavigate();

  function saveEmployee(e) {
    e.preventDefault();
    if (!id && validate()) {
      console.log("add employee ran");
      console.log(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });

      createEmployee(formData)
        .then((response) => {
          console.log(response.data);

          navigator("/employees");
        })
        .catch((error) => {
          console.log("error while submitted formData of Employee");
          console.log(error);
        });
    } else if (validate()) {
      console.log("Updating the Employee details");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });

      updateEmployee(id, formData)
        .then((response) => {
          console.log(response.data);
          navigator("/employees");
        })
        .catch((error) => {
          console.log("error while submitted formData of Employee");
          console.log(error);
        });
    }
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 ">
          {pageTitle()}
          <div className="card-body">
            <form action="" onSubmit={saveEmployee}>
              <div className="form-group mb-2">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={formData.firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                  }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  name="firstName"
                  value={formData.lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                  }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="eamil"
                  type="text"
                  placeholder="Enter Email"
                  name="firstName"
                  value={formData.email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button type="submit" className="btn btn-success mb-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
