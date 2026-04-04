import { useState, useEffect } from "react";

const SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80",
    title: "Technical Workshops",
    desc: "Hands-on training in Web Development, AI, Cyber Security, Data Science and Cloud Computing.",
  },
  {
    bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    title: "Career Development",
    desc: "Resume building, interview preparation, leadership skills and personality development programs.",
  },
  {
    bg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    title: "Creative Workshops",
    desc: "Graphic Design, UI/UX, Content Creation and innovative problem-solving skills.",
  },
];

export default function OnlineWorkshopSessions() {
  const [active, setActive] = useState(0);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentBg = SLIDES[active].bg;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${currentBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      transition: "background-image 1.5s ease-in-out",
      color: "#ffffff",
      overflowX: "hidden",
      fontFamily: "'Times New Roman', Times, serif",
      position: "relative",
    }}>
      <style>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .nav-link:hover { color: #cccccc !important; }

        .login-btn:hover {
          background: #ffffff !important;
          box-shadow: 0 0 15px rgba(255,255,255,0.3) !important;
          transform: scale(1.05);
        }
        .login-btn:hover a { color: #000000 !important; }

        .dot:hover { background: #ffffff !important; }

        footer a:hover { color: #cccccc; text-decoration: underline; }

        @media (max-width: 768px) {
          .header-inner { flex-direction: column !important; height: auto !important; padding: 15px 20px !important; }
          .nav-area { margin-top: 10px; }
          .slider-box { height: 420px !important; }
          .slide-title { font-size: 24px !important; }
          .slide-desc  { font-size: 15px !important; }
        }
        @media (max-width: 480px) {
          .slider-box { height: 360px !important; }
          .slide-title { font-size: 20px !important; }
          .slide-desc  { font-size: 14px !important; }
        }
      `}</style>

      {/* Dark overlay */}
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.70)",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <header style={{
        position: "fixed", top: 0, width: "100%", height: 70,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 40px", zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }} className="header-inner">
        <h1 style={{ fontSize: 24, letterSpacing: 2, color: "#ffffff", textShadow: "0 0 6px rgba(255,255,255,0.2)" }}>
          Online Workshop Sessions
        </h1>

        <nav className="nav-area">
          {/* Login button */}
          <div className="login-btn" style={{
            width: 110, height: 50,
            display: "flex", justifyContent: "center", alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            border: "2px solid #ffffff",
            borderRadius: 10,
            cursor: "pointer",
            transition: "0.3s ease-in-out",
          }}>
            <a href="login.html" style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", display: "flex", alignItems: "center", gap: 8, transition: "0.3s" }}>
              <i className="fa-solid fa-user" />
              Login
            </a>
          </div>
        </nav>
      </header>

      {/* ── Slider Section ── */}
      <section style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh",
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: "100px 20px 40px",
      }}>
        <div className="slider-box" style={{
          width: "90%", maxWidth: 900, height: 500,
          position: "relative",
        }}>
          {SLIDES.map((slide, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              borderRadius: 25, overflow: "hidden",
              opacity: active === i ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              boxShadow: active === i ? "0 0 20px rgba(255,255,255,0.25)" : "none",
            }}>
              {/* Background image */}
              <img
                src={slide.bg}
                alt={slide.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }}
              />
              {/* Image overlay */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1 }} />

              {/* Text content */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                display: "flex", justifyContent: "center", alignItems: "center",
                flexDirection: "column", padding: 30, textAlign: "center",
              }}>
                <div style={{
                  backdropFilter: "blur(15px)",
                  background: "rgba(255,255,255,0.05)",
                  padding: "30px 40px", borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.2)",
                  animation: active === i ? "fadeIn 0.8s ease" : "none",
                }}>
                  <h2 className="slide-title" style={{ fontSize: 30, marginBottom: 15 }}>{slide.title}</h2>
                  <p className="slide-desc" style={{ fontSize: 17, maxWidth: 600, lineHeight: 1.6, color: "#dddddd" }}>{slide.desc}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Dot indicators */}
          <div style={{
            position: "absolute", bottom: 20, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: 10, zIndex: 10,
          }}>
            {SLIDES.map((_, i) => (
              <button key={i} className="dot"
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? 28 : 10,
                  height: 10, borderRadius: 99,
                  background: active === i ? "#ffffff" : "rgba(255,255,255,0.4)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        position: "relative", zIndex: 1,
        background: "#000",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        textAlign: "center",
        padding: "50px 20px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}>
        <h3 style={{ marginBottom: 15, fontSize: 22, color: "#ffffff" }}>Contact Us</h3>

        <p style={{ margin: "5px 0", fontSize: 15, color: "#cccccc" }}>
          Email:{" "}
          <a href="mailto:yagnapriya2006@email.com" style={{ color: "#ffffff" }}>
            yagnapriya2006@email.com
          </a>
        </p>
        <p style={{ margin: "5px 0", fontSize: 15, color: "#cccccc" }}>
          Phone:{" "}
          <a href="tel:+917730924829" style={{ color: "#ffffff" }}>
            +91 7730924829
          </a>
        </p>
        <p style={{ margin: "5px 0", fontSize: 15, color: "#cccccc" }}>
          LinkedIn:{" "}
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={{ color: "#ffffff" }}>
            Profile
          </a>
        </p>
        <p style={{ margin: "5px 0", fontSize: 15, color: "#cccccc" }}>
          GitHub:{" "}
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "#ffffff" }}>
            Profile
          </a>
        </p>

        <div style={{ marginTop: 15, display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {["Home", "About", "Workshops", "Login"].map(link => (
            <a key={link} href="#"
              style={{ margin: "8px 15px", color: "#ffffff", fontSize: 15 }}
              className="nav-link">
              {link}
            </a>
          ))}
        </div>

        <p style={{ marginTop: 20, fontSize: 14, color: "#888" }}>© 2026 Online Workshop Sessions</p>
      </footer>
    </div>
  );
}