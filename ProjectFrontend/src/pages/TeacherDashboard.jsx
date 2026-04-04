import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const [workshops, setWorkshops] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacherEmail, setTeacherEmail] = useState(""); // teacher email state

  // ✅ Fetch workshops
  const fetchWorkshops = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/workshops");
      const data = await res.json();
      setWorkshops(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // You can prefill teacher email if saved in localStorage or session
    const savedTeacher = localStorage.getItem("user");
    if (savedTeacher) {
      const user = JSON.parse(savedTeacher);
      if (user.role === "teacher") setTeacherEmail(user.email);
    }
    fetchWorkshops();
  }, []);

  // ✅ Create workshop
  const createWorkshop = async () => {
    if (!title || !description) return alert("Please fill all fields");
    if (!teacherEmail) return alert("Teacher email not found");

    try {
      const res = await fetch("http://localhost:8080/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          createdBy: teacherEmail, // ✅ assign teacher email here
        }),
      });

      if (res.ok) {
        alert("Workshop created!");
        setTitle("");
        setDescription("");
        fetchWorkshops();
      } else {
        alert("Failed to create workshop");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // ✅ Delete workshop
  const deleteWorkshop = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/workshops/${id}`, { method: "DELETE" });
      if (res.ok) fetchWorkshops();
      else alert("Failed to delete workshop");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ background: "#05060a", minHeight: "100vh", color: "#fff", padding: 30 }}>
      <h1>Teacher Dashboard</h1>

      <h3>Create Workshop</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />
      <button onClick={createWorkshop} style={{ padding: 10 }}>Create</button>

      <h3>Existing Workshops</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20 }}>
        {workshops.map(ws => (
          <div key={ws.id} style={{ background: "#0d1829", padding: 20, borderRadius: 10 }}>
            <h3>{ws.title}</h3>
            <p>{ws.description}</p>
            <p style={{ fontSize: 12, color: "#888" }}>Created By: {ws.createdBy || "N/A"}</p>
            <button onClick={() => deleteWorkshop(ws.id)} style={{ padding: 10, cursor: "pointer" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}