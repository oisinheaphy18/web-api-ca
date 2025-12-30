import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await signup(username, password);
      navigate("/login");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Signup</h2>

      {msg ? <p style={{ color: "crimson" }}>{msg}</p> : null}

      <form onSubmit={submit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Username</label><br />
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default SignupPage;
