import React, { useState } from "react";
import userLoginImg from "../../assets/userLogin.png"; // Adjust the path according to your project

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ username, password, userType });
    // Add login logic here
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setUserType("");
  };

  const handleClose = () => {
    console.log("Modal closed");
    // Add close modal logic if needed
  };

  return (
    <div>
  <div className="row top-menu">
        <h2 style={{ textAlign: "center" }}>Company Name</h2>
      </div>

      <div className="row page-menu">
        <h2 style={{ textAlign: "center" }}>USER LOGIN</h2>
      </div>

      <div className="modal-login">
        <div className="modal-content grid place-items-center min-h-[80vh]">
          <div className="flex justify-around">
            <div className="card row border flex justify-center items-center gap-2 w-[40%]">

              <div className="w-[30%] flex justify-end">
                <img src={userLoginImg} alt="User Login" className="
				w-[100%] h-[80%] p-3"/>
              </div>

              <div className="w-[80%]">
                <form onSubmit={handleLogin}>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <label htmlFor="userType">User Type</label>
                  <select
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  >
                    <option value="">Select User Type</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                  </select>

                  <div className="flex justify-center gap-2 m-2">
                    <button type="button" onClick={handleClose}>
                      Close
                    </button>
                    <button type="button" onClick={handleClear}>
                      Clear
                    </button>
                    <button type="submit">Login</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

