import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Register = () => {
  const [id, setID] = useState("");
  const [role, setRole] = useState("Staff");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();
  const IsValidate = () => {
    let isproceed = true;
    let errmgs = "Please enter the value in ";
    if (id === null || id === "") {
      isproceed = false;
      errmgs += " username";
    }
    if (password === null || password === "") {
      isproceed = false;
      errmgs += " password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errmgs += " email";
    }
    if (firstName === null || firstName === "") {
      isproceed = false;
      errmgs += " firstName";
    }
    if (lastName === null || lastName === "") {
      isproceed = false;
      errmgs += " lastName";
    }
    if (!isproceed) {
      toast.warning(errmgs);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (IsValidate()) {
      let regobj = {
        id,
        role,
        firstName,
        lastName,
        email,
        contact,
        password,
        department,
      };
      console.log(regobj);
      console.log(`Registering as ${role}`);

      // Retrieve existing user data from local storage
      let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Add the new user data to the array
      existingUsers.push(regobj);

      // Store the updated array back into local storage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      toast.success("Registered Successfully");
      navigate("/login");
    }
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-md-3 mt-5">
            <div className="card">
              <div
                className="card-header text-center  mb-3"
                style={{ backgroundColor: "rgb(169,169,169)" }}
              >
                <h4 className="mt-4 mb-3">User Registration</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label controlId="HOD" style={{ marginRight: "10px" }}>
                        HOD
                      </label>
                      <input
                        type="radio"
                        value="HOD"
                        id="HOD"
                        checked={role === "HOD"}
                        onChange={handleRoleChange}
                        className="app-check"
                      ></input>
                      <label
                        className="mb-3"
                        controlId="staff"
                        style={{ marginRight: "10px", marginLeft: "10px" }}
                      >
                        Staff
                      </label>
                      <input
                        type="radio"
                        id="staff"
                        value="Staff"
                        checked={role === "Staff"}
                        onChange={handleRoleChange}
                        className="app-check"
                      ></input>
                    </div>
                  </div>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridfname">
                      <Form.Label>
                        First Name <span className="errmsg">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={firstName}
                        id="formGridfname"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridlname">
                      <Form.Label>
                        Last Name <span className="errmsg">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="formGridlname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        id="formGridEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridcontact">
                      <Form.Label>Contact</Form.Label>
                      <Form.Control
                        type="text"
                        id="formGridcontact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGriddepartment">
                      <Form.Label>Department</Form.Label>
                      <Form.Select defaultValue="Choose...">
                        <option value="None">None</option>
                        <option value="Electronics & Communication">
                          Electronics & Communication
                        </option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Civil Engineering">
                          Civil Engineering
                        </option>
                        <option value="Electrical Engineering">
                          Electrical Engineering
                        </option>
                        <option value=" Computer Science">
                          Computer Science
                        </option>
                        <option value="Food Technology">Food Technology</option>
                        <option value="Mechanical Engineering">
                          Mechanical Engineering
                        </option>
                        <option value="Bioinformatics">Bioinformatics</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlID="formGridusername">
                      <Form.Label>
                        Username <span className="errmsg">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="formGridusername"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3 col-sm-6">
                    <Form.Group as={Col} controlID="formGridpassword">
                      <Form.Label>
                        Password <span className="errmsg">*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        id="formGridpassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Row>
                </form>
              </div>
              <div
                className="card-footer"
                style={{ backgroundColor: "rgb(169,169,169)" }}
              >
                <Button
                  variant="dark"
                  style={{ margin: "10px" }}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
                Already Registered ?
                <Link to={"/login"} style={{ marginLeft: "10px" }}>
                  <Button variant="secondary">LogIn</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
