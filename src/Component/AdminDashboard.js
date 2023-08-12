import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function LeaveApplication({ loggedInStaffID }) {
  const [startDate, setStartDate] = useState("");
  const [username, setUserName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveCount, setLeaveCount] = useState(0);

  const [showLeaves, setShowLeaves] = useState("");

  const [leaveApplications, setLeaveApplications] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve leave applications from local storage
    const storedLeaveApplications =
      JSON.parse(localStorage.getItem("leaveApplications")) || [];
    setLeaveApplications(storedLeaveApplications);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.abs(end - start) / (1000 * 60 * 60 * 24) + 1;
    const leaves = leaveCount + duration;

    const newLeaveApplication = {
      id: uuidv4(),
      username,
      startDate,
      endDate,
      reason,
      status: "Pending",
      staffID: loggedInStaffID,
    };

    setLeaveCount(leaves);

    setShowLeaves(newLeaveApplication);

    const updatedLeaveApplications = [
      ...leaveApplications,
      newLeaveApplication,
    ];

    // Store updated leave applications in local storage
    localStorage.setItem(
      "leaveApplications",
      JSON.stringify(updatedLeaveApplications)
    );

    toast.success("Leave Successfully Submitted");

    resetForm();
  };

  const resetForm = () => {
    setUserName("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  const handleApprove = (id) => {
    const updatedLeaveApplications = leaveApplications.map((application) => {
      if (application.id === id) {
        return { ...application, status: "Approved" };
      }
      return application;
    });

    setLeaveApplications(updatedLeaveApplications);

    // Store updated leave applications in local storage
    localStorage.setItem(
      "leaveApplications",
      JSON.stringify(updatedLeaveApplications)
    );
  };

  const handleReject = (id) => {
    const updatedLeaveApplications = leaveApplications.map((application) => {
      if (application.id === id) {
        return { ...application, status: "Rejected" };
      }
      return application;
    });

    setLeaveApplications(updatedLeaveApplications);

    // Store updated leave applications in local storage
    localStorage.setItem(
      "leaveApplications",
      JSON.stringify(updatedLeaveApplications)
    );
  };

  return (
    <>
      {leaveApplications.length > 0 && (
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", margin: 20 }}>
            {leaveApplications.map((application) => (
              <div className="row">
                <div className="col-sm-6" style={{ marginTop: "100px" }}>
                  <div
                    className="card mt-5"
                    key={application.id}
                    style={{
                      background: "#F0FFFF",
                      height: 350,
                      width: 350,
                      marginBottom: 20,
                      marginRight: 30,
                      textAlign: "center",
                      boxShadow: "2px 2px  10px black",
                    }}
                  >
                    <div className="card-header">
                      <h4 className="mt-3 text-center">
                        Name: {application.username}
                      </h4>
                    </div>
                    <div className="card-body">
                      <div style={{ margin: "20px" }}>
                        <p>Start Date: {application.startDate}</p>
                        <p>End Date: {application.endDate}</p>
                        <p>Reason: {application.reason}</p>
                        <p>Status: {application.status}</p>

                        {/* Render approve and reject buttons if the status is pending */}
                        {application.status === "Pending" && (
                          <div>
                            <Button
                              style={{ marginRight: "20px" }}
                              variant="success"
                              onClick={() => handleApprove(application.id)}
                            >
                              Approve
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => handleReject(application.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LeaveApplication;

{
  /* <div>
        {leaveApplications.length > 0 && (
          <Card style={{ border: "1px solid red" }}>
            <Card.Body>
              {/* <Button onClick={handleLogout}>Logout</Button> */
}
{
  /* {leaveApplications.map((application) => (
                <div key={application.id}> */
}
{
  /* Display leave application details */
}
{
  /* <h6>Name:{application.username}</h6>
                  <p>Start Date: {application.startDate}</p>
                  <p>End Date: {application.endDate}</p>
                  <p>Reason: {application.reason}</p>
                  <p>Status: {application.status}</p> */
}

{
  /* Render approve and reject buttons if the status is pending */
}
{
  /* {application.status === "Pending" && (
                    <div>
                      <button onClick={() => handleApprove(application.id)}>
                        Approve
                      </button>
                      <button onClick={() => handleReject(application.id)}>
                        Reject
                      </button>
                    </div> */
}
{
  /* )} */
}
{
  /* </div>
              ))}
            </Card.Body>
          </Card>
      //   )}
      // </div> */
}
