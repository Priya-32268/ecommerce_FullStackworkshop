import { useState } from "react";

export default function Login() {
  const [tab, setTab] = useState("login");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [showSignupPass, setShowSignupPass] = useState(false);

  /* ── Login submit ── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }
    if (role === "teacher") {
      localStorage.setItem("teacher_name", username);
      window.location.href = "/teacher"; // your route
    } else if (role === "student") {
      localStorage.setItem("studentName", username);
      window.location.href = "/student"; // your route
    }
  };

  /* ── Signup submit ── */
  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Validate Gmail only
    const emailRegex = /^[a-zA-Z0-9+_.-]+@gmail\.com$/;
    if (!emailRegex.test(signupEmail)) {
      alert("Only valid Gmail addresses are allowed!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupEmail, workshopId: 1 }), // example ID
      });

      const data = await res.text();
      alert(data);
      setTab("login"); // switch to login after signup
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#111",
    border: "1px solid #2196f3",
    padding: "14px",
    borderRadius: 8,
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins, sans-serif",
    outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg,#000000,#0d47a1)", fontFamily: "Poppins, sans-serif" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div className="card" style={{ background: "#111", width: 550, borderRadius: 16, boxShadow: "0 0 30px rgba(0,0,255,0.5)", overflow: "hidden" }}>

          {/* Tabs */}
          <div style={{ display: "flex", background: "#0d47a1" }}>
            {["login", "signup"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: 18, border: "none", cursor: "pointer",
                  background: tab === t ? "#000" : "transparent",
                  borderBottom: tab === t ? "3px solid #2196f3" : "3px solid transparent",
                  color: "white", fontSize: 18, fontFamily: "Poppins, sans-serif",
                  textTransform: "capitalize",
                }}
              >
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* ── LOGIN FORM ── */}
          {tab === "login" && (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", padding: 45, gap: 15, background: "#000" }}>
              <h2 style={{ color: "#2196f3", textAlign: "center" }}>Welcome Back</h2>

              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                required
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">-- Choose Role --</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>

              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                style={inputStyle}
              />

              <div style={{ position: "relative" }}>
                <input
                  type={showLoginPass ? "text" : "password"}
                  placeholder="Password"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  required
                  style={{ ...inputStyle, paddingRight: 44 }}
                />
                <span onClick={() => setShowLoginPass(p => !p)} style={{ position: "absolute", right: 15, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 18, color: "#64b5f6" }}>
                  {showLoginPass ? "🙈" : "👁"}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#bbb", fontSize: 14 }}>
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                <label style={{ cursor: "pointer" }}>Remember Me</label>
              </div>

              <button type="submit" style={{ background: "#2196f3", color: "white", border: "none", padding: 14, borderRadius: 8, cursor: "pointer" }}>Login</button>

              <p style={{ color: "#bbb", textAlign: "center", fontSize: 14 }}>
                Don't have an account? <span style={{ color: "#2196f3", cursor: "pointer" }} onClick={() => setTab("signup")}>Sign Up</span>
              </p>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {tab === "signup" && (
            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", padding: 45, gap: 15, background: "#000" }}>
              <h2 style={{ color: "#2196f3", textAlign: "center" }}>Create Account</h2>

              <input
                type="text"
                placeholder="Username"
                value={signupName}
                onChange={e => setSignupName(e.target.value)}
                required
                style={inputStyle}
              />

              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                required
                style={inputStyle}
              />

              <div style={{ position: "relative" }}>
                <input
                  type={showSignupPass ? "text" : "password"}
                  placeholder="Password"
                  value={signupPass}
                  onChange={e => setSignupPass(e.target.value)}
                  required
                  style={{ ...inputStyle, paddingRight: 44 }}
                />
                <span onClick={() => setShowSignupPass(p => !p)} style={{ position: "absolute", right: 15, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 18, color: "#64b5f6" }}>
                  {showSignupPass ? "🙈" : "👁"}
                </span>
              </div>

              <button type="submit" style={{ background: "#2196f3", color: "white", border: "none", padding: 14, borderRadius: 8, cursor: "pointer" }}>Sign Up</button>

              <p style={{ color: "#bbb", textAlign: "center", fontSize: 14 }}>
                Already have an account? <span style={{ color: "#2196f3", cursor: "pointer" }} onClick={() => setTab("login")}>Login</span>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}