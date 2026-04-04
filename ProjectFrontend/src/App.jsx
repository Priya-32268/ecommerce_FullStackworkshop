import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  SHARED DATA & HELPERS
// ═══════════════════════════════════════════════════════════════
const MAX_MB = 50;
function bytesToMB(b) { return Math.round((b / 1024 / 1024) * 100) / 100; }

const SLIDES = [
  { bg: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80", title: "Technical Workshops",  desc: "Hands-on training in Web Development, AI, Cyber Security, Data Science and Cloud Computing." },
  { bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80", title: "Career Development",   desc: "Resume building, interview preparation, leadership skills and personality development programs." },
  { bg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80", title: "Creative Workshops",  desc: "Graphic Design, UI/UX, Content Creation and innovative problem-solving skills." },
];

const SAMPLE_WORKSHOPS = [
  { _id: "1", title: "Python Crash Course",      availableSeats: 6,  date: new Date(Date.now() + 3600000 * 5).toISOString()  },
  { _id: "2", title: "React Fundamentals",       availableSeats: 0,  date: new Date(Date.now() + 3600000 * 12).toISOString() },
  { _id: "3", title: "Data Science with Pandas", availableSeats: 4,  date: new Date(Date.now() + 3600000 * 24).toISOString() },
  { _id: "4", title: "Git & Version Control",    availableSeats: 10, date: new Date(Date.now() + 3600000 * 48).toISOString() },
  { _id: "5", title: "Cyber Security Basics",    availableSeats: 2,  date: new Date(Date.now() + 3600000 * 72).toISOString() },
];

// ═══════════════════════════════════════════════════════════════
//  SHARED FOOTER
// ═══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ background: "#000", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "50px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <h3 style={{ marginBottom: 15, fontSize: 22, color: "#fff" }}>Contact Us</h3>
      {[["Email","mailto:yagnapriya2006@email.com","yagnapriya2006@email.com"],["Phone","tel:+917730924829","+91 7730924829"],["LinkedIn","https://www.linkedin.com","Profile"],["GitHub","https://github.com","Profile"]].map(([l,h,t])=>(
        <p key={l} style={{ margin:"5px 0", fontSize:15, color:"#ccc" }}>{l}: <a href={h} target={h.startsWith("http")?"_blank":undefined} rel="noreferrer" style={{ color:"#fff" }}>{t}</a></p>
      ))}
      <div style={{ marginTop:15, display:"flex", flexWrap:"wrap", justifyContent:"center" }}>
        {["Home","About","Workshops","Login"].map(l=>(
          <a key={l} href="#" style={{ margin:"8px 15px", color:"#fff", textDecoration:"none", fontSize:15 }}>{l}</a>
        ))}
      </div>
      <p style={{ marginTop:20, fontSize:14, color:"#888" }}>© 2026 Online Workshop Sessions</p>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PAGE 1 — INTRO / HOME
// ═══════════════════════════════════════════════════════════════
function HomePage({ navigate }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight:"100vh", backgroundImage:`url(${SLIDES[active].bg})`, backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed", transition:"background-image 1.5s ease-in-out", color:"#fff", overflowX:"hidden", fontFamily:"'Times New Roman',Times,serif", position:"relative" }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
        .nav-link:hover{color:#ccc !important;}
        .login-btn:hover{background:#fff !important;box-shadow:0 0 15px rgba(255,255,255,0.3) !important;}
        .login-btn:hover span{color:#000 !important;}
        .dot-btn:hover{background:#fff !important;}
        footer a:hover{color:#ccc;text-decoration:underline;}
      `}</style>

      {/* Dark overlay */}
      <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.70)", zIndex:0, pointerEvents:"none" }} />

      {/* Header */}
      <header style={{ position:"fixed", top:0, width:"100%", height:70, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 40px", zIndex:1000, borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <h1 style={{ fontSize:24, letterSpacing:2, color:"#fff", textShadow:"0 0 6px rgba(255,255,255,0.2)" }}>Online Workshop Sessions</h1>
        <div className="login-btn" onClick={() => navigate("login")} style={{ width:110, height:50, display:"flex", justifyContent:"center", alignItems:"center", background:"rgba(255,255,255,0.05)", border:"2px solid #fff", borderRadius:10, cursor:"pointer", transition:"0.3s" }}>
          <span style={{ color:"#fff", fontSize:16, fontWeight:"bold", display:"flex", alignItems:"center", gap:8, transition:"0.3s" }}>👤 Login</span>
        </div>
      </header>

      {/* Slider */}
      <section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", padding:"100px 20px 40px" }}>
        <div style={{ width:"90%", maxWidth:900, height:500, position:"relative" }}>
          {SLIDES.map((slide, i) => (
            <div key={i} style={{ position:"absolute", inset:0, borderRadius:25, overflow:"hidden", opacity:active===i?1:0, transition:"opacity 1.5s ease-in-out", boxShadow:active===i?"0 0 20px rgba(255,255,255,0.25)":"none" }}>
              <img src={slide.bg} alt={slide.title} style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute" }} />
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)", zIndex:1 }} />
              <div style={{ position:"absolute", inset:0, zIndex:2, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", padding:30, textAlign:"center" }}>
                <div style={{ backdropFilter:"blur(15px)", background:"rgba(255,255,255,0.05)", padding:"30px 40px", borderRadius:20, border:"1px solid rgba(255,255,255,0.2)", animation:active===i?"fadeIn 0.8s ease":"none" }}>
                  <h2 style={{ fontSize:30, marginBottom:15 }}>{slide.title}</h2>
                  <p style={{ fontSize:17, maxWidth:600, lineHeight:1.6, color:"#ddd" }}>{slide.desc}</p>
                  <button onClick={() => navigate("login")} style={{ marginTop:20, padding:"10px 28px", borderRadius:10, background:"#0b63ff", color:"#fff", border:"none", fontSize:15, cursor:"pointer", fontFamily:"inherit" }}>Get Started →</button>
                </div>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div style={{ position:"absolute", bottom:20, left:"50%", transform:"translateX(-50%)", display:"flex", gap:10, zIndex:10 }}>
            {SLIDES.map((_,i) => (
              <button key={i} className="dot-btn" onClick={() => setActive(i)} style={{ width:active===i?28:10, height:10, borderRadius:99, background:active===i?"#fff":"rgba(255,255,255,0.4)", border:"none", cursor:"pointer", transition:"all 0.3s", padding:0 }} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PAGE 2 — LOGIN / SIGNUP
// ═══════════════════════════════════════════════════════════════
function LoginPage({ navigate }) {
  const [tab, setTab]                     = useState("login");
  const [role, setRole]                   = useState("");
  const [username, setUsername]           = useState("");
  const [loginPass, setLoginPass]         = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe]       = useState(false);
  const [signupName, setSignupName]       = useState("");
  const [signupEmail, setSignupEmail]     = useState("");
  const [signupPass, setSignupPass]       = useState("");
  const [showSignupPass, setShowSignupPass] = useState(false);

  const inputStyle = { width:"100%", background:"#111", border:"1px solid #2196f3", padding:"14px", borderRadius:8, color:"white", fontSize:16, fontFamily:"Poppins,sans-serif", outline:"none" };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) { alert("Please select a role"); return; }
    if (role === "teacher") { localStorage.setItem("teacher_name", username); navigate("teacher"); }
    else { localStorage.setItem("studentName", username); navigate("student"); }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Account created for ${signupName}!`);
    setTab("login");
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:"linear-gradient(135deg,#000,#0d47a1)", fontFamily:"Poppins,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        .input-focus:focus{border-color:#64b5f6 !important;box-shadow:0 0 8px #2196f3 !important;}
        .submit-btn:hover{background:#64b5f6 !important;box-shadow:0 0 10px #2196f3;}
        .back-btn-l:hover{background:#64b5f6 !important;}
        .switch-link{color:#2196f3;cursor:pointer;} .switch-link:hover{text-decoration:underline;}
        footer a:hover{color:#ccc;text-decoration:underline;}
        @media(max-width:600px){.login-card{width:95% !important;} .login-form{padding:30px 22px !important;}}
      `}</style>

      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:20, position:"relative" }}>
        <button className="back-btn-l" onClick={() => navigate("home")} style={{ position:"absolute", top:10, left:10, padding:"8px 14px", background:"#2196f3", color:"white", border:"none", borderRadius:6, cursor:"pointer", fontSize:14, transition:"0.3s" }}>← Back</button>

        <div className="login-card" style={{ background:"#111", width:550, borderRadius:16, boxShadow:"0 0 30px rgba(0,0,255,0.5)", overflow:"hidden" }}>
          {/* Tabs */}
          <div style={{ display:"flex", background:"#0d47a1" }}>
            {["login","signup"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:18, border:"none", cursor:"pointer", background:tab===t?"#000":"transparent", borderBottom:tab===t?"3px solid #2196f3":"3px solid transparent", color:"white", fontSize:18, fontFamily:"Poppins,sans-serif", textTransform:"capitalize", transition:"0.2s" }}>
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Login form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="login-form" style={{ display:"flex", flexDirection:"column", padding:"45px", background:"#000", gap:0 }}>
              <h2 style={{ color:"#2196f3", textAlign:"center", marginBottom:25, fontSize:24 }}>Welcome Back</h2>
              <div style={{ position:"relative", margin:"12px 0" }}>
                <select className="input-focus" value={role} onChange={e => setRole(e.target.value)} required style={{ ...inputStyle, cursor:"pointer" }}>
                  <option value="">-- Choose Role --</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div style={{ position:"relative", margin:"12px 0" }}>
                <input className="input-focus" type="text" placeholder="Username or Email" value={username} onChange={e => setUsername(e.target.value)} required style={inputStyle} />
              </div>
              <div style={{ position:"relative", margin:"12px 0" }}>
                <input className="input-focus" type={showLoginPass?"text":"password"} placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} required style={{ ...inputStyle, paddingRight:44 }} />
                <span onClick={() => setShowLoginPass(p=>!p)} style={{ position:"absolute", right:15, top:"50%", transform:"translateY(-50%)", cursor:"pointer", fontSize:18, color:"#64b5f6" }}>{showLoginPass?"🙈":"👁"}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8, color:"#bbb", fontSize:14 }}>
                <input type="checkbox" id="rm" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                <label htmlFor="rm" style={{ cursor:"pointer" }}>Remember Me</label>
              </div>
              <button type="submit" className="submit-btn" style={{ background:"#2196f3", color:"white", border:"none", padding:14, borderRadius:8, fontSize:17, cursor:"pointer", marginTop:15, transition:"0.3s", fontFamily:"Poppins,sans-serif" }}>Login</button>
              <p style={{ color:"#bbb", textAlign:"center", fontSize:14, marginTop:15 }}>
                Don't have an account? <span className="switch-link" onClick={() => setTab("signup")}>Sign Up</span>
              </p>
            </form>
          )}

          {/* Signup form */}
          {tab === "signup" && (
            <form onSubmit={handleSignup} className="login-form" style={{ display:"flex", flexDirection:"column", padding:"45px", background:"#000" }}>
              <h2 style={{ color:"#2196f3", textAlign:"center", marginBottom:25, fontSize:24 }}>Create Account</h2>
              {[["text","Username",signupName,setSignupName],["email","Email",signupEmail,setSignupEmail]].map(([type,ph,val,set]) => (
                <div key={ph} style={{ position:"relative", margin:"12px 0" }}>
                  <input className="input-focus" type={type} placeholder={ph} value={val} onChange={e => set(e.target.value)} required style={inputStyle} />
                </div>
              ))}
              <div style={{ position:"relative", margin:"12px 0" }}>
                <input className="input-focus" type={showSignupPass?"text":"password"} placeholder="Password" value={signupPass} onChange={e => setSignupPass(e.target.value)} required style={{ ...inputStyle, paddingRight:44 }} />
                <span onClick={() => setShowSignupPass(p=>!p)} style={{ position:"absolute", right:15, top:"50%", transform:"translateY(-50%)", cursor:"pointer", fontSize:18, color:"#64b5f6" }}>{showSignupPass?"🙈":"👁"}</span>
              </div>
              <button type="submit" className="submit-btn" style={{ background:"#2196f3", color:"white", border:"none", padding:14, borderRadius:8, fontSize:17, cursor:"pointer", marginTop:15, transition:"0.3s", fontFamily:"Poppins,sans-serif" }}>Sign Up</button>
              <p style={{ color:"#bbb", textAlign:"center", fontSize:14, marginTop:15 }}>
                Already have an account? <span className="switch-link" onClick={() => setTab("login")}>Login</span>
              </p>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PAGE 3 — STUDENT DASHBOARD
// ═══════════════════════════════════════════════════════════════
function useCountdown(dateStr) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const tick = () => {
      const diff = new Date(dateStr) - new Date();
      if (diff <= 0) { setDisplay("Workshop Started"); return; }
      const hrs  = Math.floor(diff / 1000 / 60 / 60);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setDisplay(`Starts in ${hrs}h ${mins}m ${secs}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dateStr]);
  return display;
}

function WorkshopCard({ ws, onRegister }) {
  const countdown = useCountdown(ws.date);
  const full      = ws.availableSeats <= 0;
  return (
    <div style={{ background:"#0f1724", padding:20, borderRadius:12, boxShadow:"0 8px 20px rgba(0,0,0,0.5)", display:"flex", flexDirection:"column", gap:6, border:"1px solid rgba(11,99,255,0.15)", transition:"transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform="translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
      <h3 style={{ color:"#0b63ff", marginBottom:10 }}>{ws.title}</h3>
      <p style={{ fontSize:14, color:"#a6b0c8" }}>🪑 Seats: <strong style={{ color:full?"#ff3b3b":"#17c964" }}>{ws.availableSeats}</strong></p>
      <p style={{ fontSize:14, color:"#a6b0c8" }}>🕐 {new Date(ws.date).toLocaleString()}</p>
      <div style={{ fontSize:13, color:"#17c964", marginTop:4 }}>{countdown}</div>
      <button disabled={full} onClick={() => !full && onRegister(ws)} style={{ marginTop:10, padding:"8px 14px", border:"none", borderRadius:8, background:full?"#555":"#0b63ff", color:"white", cursor:full?"not-allowed":"pointer", fontSize:14, transition:"opacity 0.2s", fontFamily:"Segoe UI,Arial,sans-serif" }}
        onMouseEnter={e => { if(!full) e.currentTarget.style.opacity="0.8"; }}
        onMouseLeave={e => e.currentTarget.style.opacity="1"}>
        {full ? "Seats Full" : "Register"}
      </button>
    </div>
  );
}

function RegisterPopup({ workshop, onClose, onSuccess }) {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [success, setSuccess] = useState("");
  const overlayRef = useRef();

  const handleSubmit = () => {
    if (!name || !email) { alert("Please fill all fields"); return; }
    setSuccess("🎉 Congratulations! Meeting link has been sent to your email.");
    setTimeout(() => { onSuccess(); onClose(); }, 2500);
  };

  const inp = { width:"100%", padding:8, margin:"10px 0", borderRadius:6, border:"1px solid #0b63ff", background:"#0f1724", color:"white", fontSize:14, outline:"none" };
  return (
    <div ref={overlayRef} onClick={e => { if(e.target===overlayRef.current) onClose(); }} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:999 }}>
      <div style={{ background:"#111827", padding:25, borderRadius:12, width:320, position:"relative", boxShadow:"0 0 30px rgba(11,99,255,0.3)" }}>
        <span onClick={onClose} style={{ position:"absolute", top:10, right:15, cursor:"pointer", fontSize:18, color:"#aaa" }} onMouseEnter={e=>e.currentTarget.style.color="white"} onMouseLeave={e=>e.currentTarget.style.color="#aaa"}>✖</span>
        <h3 style={{ color:"#0b63ff", marginBottom:6 }}>{workshop.title}</h3>
        <p style={{ fontSize:13, color:"#a6b0c8", marginBottom:8 }}>{new Date(workshop.date).toLocaleString()}</p>
        <input style={inp} type="text"  placeholder="Your Name"  value={name}  onChange={e=>setName(e.target.value)} />
        <input style={inp} type="email" placeholder="Your Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={handleSubmit} style={{ width:"100%", padding:10, border:"none", borderRadius:8, background:"#0b63ff", color:"white", fontSize:15, cursor:"pointer", marginTop:6, fontFamily:"Segoe UI,Arial,sans-serif" }}>Submit</button>
        {success && <div style={{ textAlign:"center", color:"#17c964", marginTop:15, fontSize:14, lineHeight:1.5 }}>{success}</div>}
      </div>
    </div>
  );
}

function StudentPage({ navigate }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [popup, setPopup]         = useState(null);

  const studentName  = localStorage.getItem("studentName")  || "John Doe";
  const studentEmail = localStorage.getItem("studentEmail") || "johndoe@email.com";

  useEffect(() => {
    setTimeout(() => { setWorkshops(SAMPLE_WORKSHOPS); setLoading(false); }, 500);
  }, []);

  const handleLogout = () => { localStorage.removeItem("studentName"); navigate("login"); };

  const handleSuccess = () => {
    setWorkshops(prev => prev.map(w => w._id===popup._id ? { ...w, availableSeats:Math.max(0,w.availableSeats-1) } : w));
  };

  return (
    <div style={{ background:"linear-gradient(180deg,#05060a,#071026 120%)", color:"white", minHeight:"100vh", fontFamily:"Segoe UI,Arial,sans-serif" }}>
      <style>{`*{box-sizing:border-box;} footer a:hover{color:#ccc;text-decoration:underline;}`}</style>
      <div style={{ maxWidth:1100, margin:"40px auto", padding:20, position:"relative" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
          <button onClick={() => navigate("login")} style={{ background:"transparent", border:"1px solid #0b63ff", color:"#0b63ff", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:14, transition:"0.3s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background="#0b63ff"; e.currentTarget.style.color="white"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#0b63ff"; }}>← Back</button>
          <button onClick={handleLogout} style={{ background:"#ff3b3b", border:"none", color:"white", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:14 }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Logout</button>
        </div>

        {/* Profile */}
        <div style={{ display:"flex", alignItems:"center", gap:15, marginBottom:25, padding:15, background:"#0f1724", borderRadius:12, border:"1px solid rgba(11,99,255,0.2)" }}>
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=0b63ff&color=fff&size=60`} alt="Avatar" style={{ width:60, height:60, borderRadius:"50%", border:"2px solid #0b63ff" }} />
          <div>
            <h3 style={{ color:"#0b63ff", margin:0 }}>{studentName}</h3>
            <p style={{ color:"#a6b0c8", fontSize:14, margin:"2px 0" }}>{studentEmail}</p>
            <p style={{ color:"#a6b0c8", fontSize:12 }}>Student</p>
          </div>
        </div>

        <h1 style={{ color:"#0b63ff", marginBottom:25, fontSize:26 }}>Available Workshops</h1>

        {loading
          ? <div style={{ textAlign:"center", color:"#a6b0c8", padding:60 }}>Loading workshops…</div>
          : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
              {workshops.map(ws => <WorkshopCard key={ws._id} ws={ws} onRegister={setPopup} />)}
            </div>
        }
      </div>
      {popup && <RegisterPopup workshop={popup} onClose={() => setPopup(null)} onSuccess={handleSuccess} />}
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PAGE 4 — TEACHER DASHBOARD
// ═══════════════════════════════════════════════════════════════
function TeacherPage({ navigate }) {
  const teacherName = localStorage.getItem("teacher_name") || "Ms. Smith";

  const [resourceLink, setResourceLink] = useState("");
  const [linkNotes, setLinkNotes]       = useState("");
  const [linkStatus, setLinkStatus]     = useState("");
  const fileRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileMsg, setFileMsg]           = useState("");
  const [usedMB, setUsedMB]             = useState(0);
  const [title, setTitle]               = useState("");
  const [datetime, setDatetime]         = useState("");
  const [duration, setDuration]         = useState("2");
  const [seats, setSeats]               = useState("30");
  const [quick, setQuick]               = useState({ title:"-", when:"-", seats:"-", duration:"-" });
  const [logs, setLogs]                 = useState([]);

  useEffect(() => {
    const saved = parseFloat(localStorage.getItem("teacher_storage_used_mb")) || 0;
    setUsedMB(saved);
    const savedLink = localStorage.getItem("teacher_resource_link");
    if (savedLink) { setResourceLink(savedLink); setLinkStatus("Link loaded from session."); }
  }, []);

  const addLog   = (txt) => { const time = new Date().toLocaleTimeString(); setLogs(prev => [`[${time}] ${txt}`, ...prev]); };
  const storagePct  = Math.min(100, (usedMB / MAX_MB) * 100);
  const availableMB = Math.max(0, MAX_MB - usedMB).toFixed(2);

  const saveLink = () => {
    if (!resourceLink.trim()) { setLinkStatus("Please enter a valid URL."); return; }
    localStorage.setItem("teacher_resource_link", resourceLink.trim());
    addLog("Saved resource link: " + resourceLink.trim());
    setLinkStatus("✓ Link saved.");
  };
  const handleFileChange = (e) => { const f=e.target.files[0]||null; setSelectedFile(f); setFileMsg(f?`${f.name} (${bytesToMB(f.size)} MB)`:""); };
  const uploadFile = () => {
    if (!selectedFile) { setFileMsg("No file selected."); return; }
    const sizeMB = bytesToMB(selectedFile.size);
    if (sizeMB > MAX_MB) { setFileMsg("File exceeds 50 MB limit."); return; }
    localStorage.setItem("teacher_storage_used_mb", sizeMB);
    setUsedMB(sizeMB);
    addLog(`Uploaded: ${selectedFile.name} (${sizeMB} MB)`);
    setFileMsg("✓ Upload simulated — saved to session.");
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };
  const saveWorkshop = () => { setQuick({ title:title||"-", when:datetime?new Date(datetime).toLocaleString():"-", seats, duration:duration+" hrs" }); addLog("Saved workshop details."); };
  const previewWorkshop = () => { alert(`${title||"Untitled"}\nWhen: ${datetime?new Date(datetime).toLocaleString():"TBD"}\nDuration: ${duration} hrs\nSeats: ${seats}`); };
  const handleLogout = () => { if(window.confirm("Log out?")) { addLog("Teacher logged out"); navigate("login"); } };

  const inputSt = { width:"100%", padding:"10px", borderRadius:8, border:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,255,255,0.03)", color:"#eef2ff", fontSize:14, outline:"none" };

  const TCard = ({ children, style }) => <div style={{ background:"#0f1724", borderRadius:14, padding:20, marginTop:18, boxShadow:"0 8px 30px rgba(2,6,23,0.6)", ...style }}>{children}</div>;
  const TTitle = ({ children }) => <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}><h2 style={{ margin:0, fontSize:16, color:"#0b63ff" }}>{children}</h2></div>;
  const IPair = ({ left, right }) => <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:12, borderRadius:10, background:"linear-gradient(180deg,rgba(255,255,255,0.02),transparent)", border:"1px solid rgba(255,255,255,0.02)", marginBottom:8 }}><div style={{ fontSize:13, color:"#eef2ff" }}>{left}</div><div style={{ fontSize:13, color:"#a6b0c8" }}>{right}</div></div>;

  return (
    <div style={{ background:"linear-gradient(180deg,#05060a,#071026 120%)", color:"#eef2ff", minHeight:"100vh", fontFamily:"Inter,Segoe UI,Arial,sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;} input,textarea,select{color:#eef2ff !important;}
        input:focus,textarea:focus,select:focus{border-color:#0b63ff !important;outline:none;}
        ::placeholder{color:#4a5568;} ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:#0b63ff44;border-radius:99px;}
        input[type=datetime-local]::-webkit-calendar-picker-indicator{filter:invert(0.6);}
        footer a:hover{color:#ccc;text-decoration:underline;}
        @media(max-width:920px){.t-grid{grid-template-columns:1fr !important;}}
      `}</style>

      <div style={{ maxWidth:1100, margin:"36px auto", padding:28 }}>
        {/* Header */}
        <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:56, height:56, borderRadius:10, background:"linear-gradient(135deg,#0b63ff,#00204a)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"white", fontSize:20, boxShadow:"0 6px 18px rgba(11,99,255,0.18)" }}>WS</div>
            <div>
              <h1 style={{ margin:0, fontSize:20, color:"#0b63ff" }}>Workshop Manager — Teacher</h1>
              <div style={{ fontSize:13, color:"#a6b0c8" }}>Logged in as <strong style={{ color:"#eef2ff" }}>{teacherName}</strong></div>
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => navigate("home")} style={{ padding:"10px 14px", borderRadius:10, background:"transparent", color:"white", border:"1px solid rgba(255,255,255,0.1)", cursor:"pointer", fontSize:14 }}>🏠 Home</button>
            <button onClick={handleLogout} style={{ padding:"10px 14px", borderRadius:10, background:"#0b63ff", color:"white", border:"none", cursor:"pointer", fontWeight:600, fontSize:14 }}>Logout</button>
          </div>
        </header>

        <div className="t-grid" style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:18 }}>
          {/* Left */}
          <div>
            <TCard>
              <TTitle>Upload Resource Link</TTitle>
              <p style={{ fontSize:13, color:"#a6b0c8", marginBottom:14 }}>Paste a link to the workshop resource (video, slide, repository, etc.).</p>
              <div style={{ marginBottom:12 }}>
                <label style={{ display:"block", fontSize:13, color:"#a6b0c8", marginBottom:6 }}>Resource URL</label>
                <input type="url" placeholder="https://…" value={resourceLink} onChange={e=>setResourceLink(e.target.value)} style={inputSt} />
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ display:"block", fontSize:13, color:"#a6b0c8", marginBottom:6 }}>Notes (optional)</label>
                <textarea placeholder="Brief description or instructions" value={linkNotes} onChange={e=>setLinkNotes(e.target.value)} style={{ ...inputSt, minHeight:110, resize:"vertical" }} />
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <button onClick={saveLink} style={{ padding:"10px 14px", borderRadius:10, background:"#0b63ff", color:"white", border:"none", cursor:"pointer", fontWeight:600, fontSize:14 }}>Save Link</button>
                <span style={{ fontSize:13, color:linkStatus.includes("✓")?"#17c964":"#a6b0c8" }}>{linkStatus}</span>
              </div>
            </TCard>

            <TCard>
              <TTitle>Resource File Upload (50 MB limit)</TTitle>
              <p style={{ fontSize:13, color:"#a6b0c8", marginBottom:14 }}>Upload a single file (max 50 MB). Storage usage is tracked locally.</p>
              <div style={{ marginBottom:12 }}>
                <label style={{ display:"block", fontSize:13, color:"#a6b0c8", marginBottom:6 }}>Choose file</label>
                <input ref={fileRef} type="file" onChange={handleFileChange} style={{ ...inputSt, cursor:"pointer", padding:8 }} />
              </div>
              <div style={{ display:"flex", gap:12, alignItems:"center", marginTop:8 }}>
                <button onClick={uploadFile} style={{ padding:"10px 14px", borderRadius:10, background:"#0b63ff", color:"white", border:"none", cursor:"pointer", fontWeight:600, fontSize:14 }}>Upload</button>
                <span style={{ fontSize:13, color:fileMsg.includes("✓")?"#17c964":"#a6b0c8" }}>{fileMsg}</span>
              </div>
              <div style={{ marginTop:14 }}>
                <div style={{ fontSize:13, color:"#a6b0c8", marginBottom:8 }}>Storage used</div>
                <div style={{ height:12, background:"rgba(255,255,255,0.04)", borderRadius:8, overflow:"hidden", marginBottom:10 }}>
                  <div style={{ height:"100%", width:`${storagePct}%`, background:storagePct>85?"linear-gradient(90deg,#ff3b3b,#ff6b6b)":"linear-gradient(90deg,#0b63ff,#00b3ff)", transition:"width 0.5s ease", borderRadius:8 }} />
                </div>
                <IPair left={<>Used: <strong>{usedMB} MB</strong></>} right={<>Available: <strong>{availableMB} MB</strong></>} />
              </div>
            </TCard>
          </div>

          {/* Sidebar */}
          <aside>
            <TCard style={{ marginTop:0 }}>
              <TTitle>Workshop Details</TTitle>
              {[["Workshop Title","text","e.g. Intro to Data Science",title,setTitle,{}],["Start Time","datetime-local","",datetime,setDatetime,{}],["Duration (hours)","number","",duration,setDuration,{min:"0.5",step:"0.5"}],["Total Seats","number","",seats,setSeats,{min:"1"}]].map(([label,type,ph,val,set,extra])=>(
                <div key={label} style={{ marginBottom:12 }}>
                  <label style={{ display:"block", fontSize:13, color:"#a6b0c8", marginBottom:6 }}>{label}</label>
                  <input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)} style={inputSt} {...extra} />
                </div>
              ))}
              <div style={{ display:"flex", gap:8, marginTop:8 }}>
                <button onClick={saveWorkshop}   style={{ padding:"10px 14px", borderRadius:10, background:"#0b63ff", color:"white", border:"none", cursor:"pointer", fontWeight:600, fontSize:14 }}>Save Details</button>
                <button onClick={previewWorkshop} style={{ padding:"10px 14px", borderRadius:10, background:"transparent", color:"white", border:"1px solid rgba(255,255,255,0.1)", cursor:"pointer", fontSize:14 }}>Preview</button>
              </div>
              <hr style={{ margin:"14px 0", border:"none", borderTop:"1px solid rgba(255,255,255,0.04)" }} />
              <div style={{ fontSize:13, color:"#a6b0c8", marginBottom:10 }}>Quick Info</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <IPair left={<strong>{quick.title}</strong>} right={quick.when} />
                <IPair left="Seats"    right={<strong>{quick.seats}</strong>} />
                <IPair left="Duration" right={<strong>{quick.duration}</strong>} />
              </div>
            </TCard>

            <TCard>
              <TTitle>Actions &amp; Logs</TTitle>
              <div style={{ fontSize:13, color:"#a6b0c8", marginBottom:10 }}>Recent actions (local session)</div>
              <div style={{ maxHeight:180, overflowY:"auto", display:"flex", flexDirection:"column", gap:4 }}>
                {logs.length===0 ? <div style={{ fontSize:13, color:"#a6b0c8" }}>No actions yet.</div> : logs.map((l,i)=><div key={i} style={{ fontSize:13, color:"#a6b0c8", lineHeight:1.5 }}>{l}</div>)}
              </div>
            </TCard>
          </aside>
        </div>

        <TCard style={{ textAlign:"center", fontSize:13, color:"#a6b0c8", marginTop:18 }}>
          Teacher-only dashboard. Connect to your backend for persistence and authentication.
        </TCard>
      </div>
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ROOT APP — ROUTER
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (target) => setPage(target);

  return (
    <>
      {page === "home"    && <HomePage    navigate={navigate} />}
      {page === "login"   && <LoginPage   navigate={navigate} />}
      {page === "student" && <StudentPage navigate={navigate} />}
      {page === "teacher" && <TeacherPage navigate={navigate} />}
    </>
  );
}