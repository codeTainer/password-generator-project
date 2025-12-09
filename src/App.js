import React, { useState } from "react";
import "./App.css";
import logo from "./assets/NCS-LOGO.png";
import bg from "./assets/background.jpg";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const generatePasswordFromEmail = (email) => {
    const seed = Array.from(email).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const letters = upper + lower;
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{};':\",./<>?";
    const numbersSpecial = numbers + special;

    let pwdLetters = "";
    pwdLetters += upper[seed % upper.length];
    pwdLetters += lower[(seed + 1) % lower.length];
    for (let i = 2; i < 10; i++) {
      pwdLetters += letters[(seed + i) % letters.length];
    }

    let pwdNumbersSpecial = "";
    for (let i = 0; i < 7; i++) {
      pwdNumbersSpecial += numbersSpecial[(seed + i) % numbersSpecial.length];
    }

    const combined = pwdLetters + pwdNumbersSpecial;
    const combinedArr = combined.split("");
    const shuffled = combinedArr
      .map((char, index) => [char, (seed + index) % combinedArr.length])
      .sort((a, b) => a[1] - b[1])
      .map((item) => item[0])
      .join("");

    return shuffled;
  };

  const handleGenerate = () => {
    setCopied(false);
    if (!email) {
      setError("Email is required.");
      setPassword("");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setPassword("");
      return;
    }
    setError("");
    setPassword(generatePasswordFromEmail(email));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setCopied(false);
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <div className="text-center mb-4">
          <img src={logo} alt="NCS Logo" width="140" height="140" className="img-fluid" />
        </div>
         <h2 className="text-center mb-4">Password Generator</h2>

       

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter officer email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-success" onClick={handleGenerate}>
            Generate Password
          </button>
          {password && (
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          )}
        </div>

        {password && (
          <div className="d-flex justify-content-between align-items-center alert alert-success">
            <span className="me-2">{password}</span>
            <button className="btn btn-outline-dark btn-sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
