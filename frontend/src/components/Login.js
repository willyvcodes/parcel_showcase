import React, { useState } from "react";
import { getAccessToken } from "../helpers/requests";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleLogin = async (event) => {
    if (username !== '' && password !== '') {
      event.preventDefault()
    }

    const resp = await getAccessToken(username, password);
    if (resp.ok) {
      const data = await resp.json();
      setAccessToken(data.accessToken);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 mx-auto">
          <div className="card p-4 m-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="inputUsername" className="form-label">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="form-control border-secondary"
                  id="inputUsername"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control border-secondary"
                  id="inputPassword"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btm-sm"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mx-auto">
          {accessToken ? (
            <p className="text-break text-warning">
              <b>Access Token:</b> {accessToken}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Login;
