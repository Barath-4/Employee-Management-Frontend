import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../Services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstname(response.data.firstName);
          setLastname(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (valideteForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if(id){
        updateEmployee(id,employee).then((response)=>{
        console.log(response.data);
        navigator('/employees')
        }).catch(error =>{
            console.error(error);
        })
      }else{

        createEmployee(employee).then((response) => {
            console.log(response.data);
            navigator("/employees");
          }).catch(error =>{
            console.error(error);
          })
      }
      
    }
  }

  function valideteForm() {
    let vaild = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is resquired";
      vaild = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is resquired";
      vaild = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is resquired";
      vaild = false;
    }

    setErrors(errorsCopy);
    return vaild;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div>
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 ">
            {pageTitle()}
            <div className="card-body">
              <form onSubmit={saveOrUpdateEmployee}>
                <div className="form-group mb-3">
                  <label className="form-label">First Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Employee First Name"
                    name="firstName"
                    value={firstName}
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName} </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Last Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Employee Last Name"
                    name="lastName"
                    value={lastName}
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName} </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Email :</label>
                  <input
                    type="email"
                    placeholder="Enter Employee Email Id"
                    name="email"
                    value={email}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email} </div>
                  )}
                </div>

                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
