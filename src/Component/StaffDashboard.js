import React, { useEffect, useState } from "react";
// import { Box, Button, Modal } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};

const StaffDashboard = () => {
  const [username, setUserName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveCount, setLeaveCount] = useState(0);
  const [totalLeaves, setTotalLeaves] = useState(30);
  const [showLeaves, setShowLeaves] = useState("");
  const [leave, setLeave] = useState([]);

  const [leaveApplications, setLeaveApplications] = useState([]);
  // const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validation = (leavedata) => {
    console.log(data.firstName, data.id);

    if (data.firstName === data.id) {
      const existingApplications =
        JSON.parse(localStorage.getItem("leaveApplications")) || [];

      existingApplications.push(leavedata);

      localStorage.setItem(
        "leaveApplications",
        JSON.stringify(existingApplications)
      );
      setToggle(!toggle);
      toast.success("Leave Successfully Submitted");
      resetForm();
    } else {
      toast.error("Not Authorised");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      toast.error("End date cannot be earlier than start date");
      return;
    }

    const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const leaves = leaveCount + duration;

    const newleaveapplication = {
      id: uuidv4(),
      username,
      startDate,
      endDate,
      reason,
      status: "Pending",
    };

    setLeaveCount(leaves);
    setTotalLeaves(totalLeaves - leaves);
    setLeave([...leave, newleaveapplication]);
    setShowLeaves(newleaveapplication);
    validation(newleaveapplication);
    handleClose();
  };

  useEffect(() => {
    const memberdata = JSON.parse(localStorage.getItem("loggedInUser"));
    setData(memberdata);
    console.log(memberdata);
    const logdata = JSON.parse(localStorage.getItem("leaveApplications"));
    const filterdata = logdata
      ? logdata.filter((i) => memberdata.firstName === i.username)
      : [];
    setLeaveApplications(filterdata);
    console.log(filterdata);
  }, [toggle]);

  console.log(leaveApplications);

  const getLeaveCount = (status) => {
    return leaveApplications.filter(
      (application) => application.status.toLowerCase() === status.toLowerCase()
    ).length;
  };

  const resetForm = () => {
    setUserName("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };
  const containerstyle = {
    backgroundColor: "rgba(180, 164, 184, 0.3)",
  };
  const cardstyle = {
    backgroundColor: "rgba(250, 228, 194, 0.56)",
  };
  const displaycardstyle = {
    backgroundColor: "rgba(177, 225, 255, 0.47)",
  };
  const displaycardbodystyle = {
    backgroundColor: "rgba(104, 156, 255, 0.08)",
  };
  return (
    <>
      <div className="conatiner-fluid " style={containerstyle}>
        <div className="container">
          <div className="row">
            <div className="col-sm-3 ">
              <Button
                variant="dark"
                style={{ marginTop: "100px" }}
                onClick={handleShow}
              >
                Apply for Leave
              </Button>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Leave Application From</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    class="form-control"
                    id="formGridName"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    class="form-control"
                    id="formGridStartDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    class="form-control"
                    id="formGridEndDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Text>Reason</InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 offset-md-4 shadow-lg p-3 mb-5 bg-white rounded">
              <div className="card text-center" style={cardstyle}>
                <div className="card-header">
                  <h3>Leave Statistics</h3>
                </div>
                <div className="card-body">
                  <Row>
                    <h6>Applied Leaves: {getLeaveCount("pending")}</h6>
                  </Row>
                  <Row>
                    <h6>Approved Leaves: {getLeaveCount("approved")}</h6>
                  </Row>
                  <Row>
                    <h6>Rejected Leaves: {getLeaveCount("rejected")}</h6>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>

        {leaveApplications.length > 0 && (
          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {leaveApplications.map((application) => (
                <div className="row">
                  <div className="col-sm-6 ">
                    <div
                      className="card mt-5 "
                      style={{
                        height: 300,
                        width: "18rem",

                        marginBottom: 20,
                        marginRight: 20,
                      }}
                      key={application.id}
                    >
                      <div className="card-header" style={displaycardstyle}>
                        <h4 className="mt-3 text-center">Leave Application</h4>
                      </div>
                      <div className="card-body" style={displaycardbodystyle}>
                        <h6>Name: {application.username}</h6>
                        <p>Start Date: {application.startDate}</p>
                        <p>End Date: {application.endDate}</p>
                        <p>Reason: {application.reason}</p>
                        <p>Status: {application.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StaffDashboard;
