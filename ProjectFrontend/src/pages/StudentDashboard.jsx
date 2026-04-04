import { useState, useEffect } from "react";

export default function StudentDashboard() {

  const [workshops, setWorkshops] = useState([]);
  const [joined, setJoined] = useState([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // ✅ Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ✅ Fetch workshops
  useEffect(() => {
    fetch("http://localhost:8080/api/workshops")
      .then(res => res.json())
      .then(data => {
        const available = data.filter(w => !w.completed);
        setWorkshops(available);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // ✅ Join workshop
  const joinWorkshop = async (ws) => {

    // ❌ Email empty
    if (!email) {
      setError("Email is required");
      return;
    }

    // ❌ Invalid email
    if (!validateEmail(email)) {
      setError("Enter valid email");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          workshopId: ws.id,
          email: email
        })
      });

      const msg = await res.text();

      if (msg === "Already Joined") {
        alert("Already joined!");
      } else {
        alert("Joined! Check email");
        setJoined([...joined, ws.id]);
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div style={{background:"#05060a",minHeight:"100vh",color:"#fff",padding:30}}>

      <h1>Available Workshops</h1>

      {/* ✅ Email Input */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 10,
            width: "300px",
            borderRadius: 5,
            border: "none"
          }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {loading && <p>Loading...</p>}

      {!loading && workshops.length === 0 && (
        <p>No workshops available</p>
      )}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
        gap:20
      }}>
        {workshops.map(ws => (
          <div key={ws.id} style={{
            background:"#0d1829",
            padding:20,
            borderRadius:10
          }}>
            <h3>{ws.title}</h3>
            <p>{ws.description}</p>

            {joined.includes(ws.id) ? (
              <button disabled style={{padding:10}}>
                Already Joined
              </button>
            ) : (
              <button
                onClick={() => joinWorkshop(ws)}
                style={{padding:10, cursor:"pointer"}}
              >
                Join Workshop
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}