import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Appheader = () => {
  const [displayusername, displayusernameupdate] = useState("");
  const [showmenu, showmenuupdateupdate] = useState(false);
  const usenavigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      showmenuupdateupdate(false);
    } else {
      showmenuupdateupdate(true);
      let username = sessionStorage.getItem("username");
      if (username === "" || username === null) {
        usenavigate("/login");
      } else {
        displayusernameupdate(username);
      }
    }
  }, [location]);
  const navstyle = {
    backgroundColor: "rgb(47,79,79)",
  };
  return (
    <div>
      {showmenu && (
        <Navbar fixed="top" data-bs-theme="dark" style={navstyle}>
          <Container>
            <Navbar.Brand href="/">Bright Future Academy</Navbar.Brand>
            <span style={{ fontSize: "20px", marginLeft: 800 }}>
              <b>
                Welcome {""} {displayusername}
              </b>
            </span>
            <Nav className="me-auto">
              <Nav.Link href="/login">
                <Button variant="dark">Logout</Button>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
      {/* {showmenu && (
        <div
          className="navbar"
          style={{
            background: "lightblue",
            padding: "20px",
            paddingRight: "100px",
          }}
        >
          <Link
            style={{
              textDecoration: "none",

              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            to={"/dashboard"}
          >
            DashBoard
          </Link>

          <span style={{ fontSize: "20px", marginLeft: 800 }}>
            Welcome <b>{displayusername}</b>
          </span>
          <Link
            style={{
              float: "right",
              textDecoration: "none",
              marginRight: "20px",
              border: "1px solid black",
              width: 100,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              borderRadius: 10,
            }}
            to={"/login"}
          >
            Logout
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default Appheader;
