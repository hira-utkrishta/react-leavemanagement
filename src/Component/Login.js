import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    localStorage.removeItem("loggedInUser"); // Remove the previously logged-in user data (if any)
  }, []);

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      console.log(users);
      const user = users.find((user) => user.id === username);

      if (user) {
        if (user.password === password) {
          toast.success("Success");
          const role = user.role;
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("userrole", role);

          // Store the logged-in user data separately in local storage
          localStorage.setItem("loggedInUser", JSON.stringify(user));

          navigate("/");
        } else {
          toast.error("Please enter valid credentials");
        }
      } else {
        toast.error("Please enter a valid username");
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-sm-12" style={{ marginTop: "150px" }}>
          <div className="offset-lg-3 col-lg-6 ">
            <form onSubmit={handleLogin} className="cntainer">
              <div
                className="card"
                style={{
                  height: "300px",
                }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "rgb(169,169,169)" }}
                >
                  <h2>User Login</h2>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>
                      <b>Username</b> <span className="errmgs">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>
                      <b>Password</b> <span className="errmgs">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div
                  className="card-footer"
                  style={{ backgroundColor: "rgb(169,169,169)" }}
                >
                  <button
                    style={{ marginRight: "10px" }}
                    type="submit"
                    className="btn btn-dark"
                  >
                    Login
                  </button>
                  <b>not Registerd ?</b>
                  <Link
                    style={{ marginLeft: "10px" }}
                    className="btn btn-secondary"
                    to={"/register"}
                  >
                    new user
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
