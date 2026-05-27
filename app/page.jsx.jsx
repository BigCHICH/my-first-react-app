// 🎓 ByteBuilders — School Coding Club Website
// Upgraded: editorial typography, refined palette, fluid animations

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DATA — edit to customise your club
// ─────────────────────────────────────────────
const CLUB = {
  name: "ByteBuilders",
  tagline: "Where students become creators.",
  school: "Westfield Academy",
  room: "Room 14",
  day: "Thursdays",
  time: "3:30 – 5:00 pm",
};

const STATS = [
  { value: "40+", label: "Members" },
  { value: "3×", label: "Trophy Winners" },
  { value: "2yrs", label: "Running Strong" },
];

const FEATURES = [
  { icon: "⬡", accent: "#34d399", title: "Real Projects", desc: "Build apps, games, and websites that people actually use — no boring tutorials." },
  { icon: "◈", accent: "#60a5fa", title: "Any Level Welcome", desc: "Complete beginner or already coding — we have tracks for every skill level." },
  { icon: "◎", accent: "#f472b6", title: "Compete & Win", desc: "Enter regional hackathons and competitions. We've brought home three trophies." },
  { icon: "⬟", accent: "#a78bfa", title: "Learn Together", desc: "Pair programming, code reviews, and team projects. You're never stuck alone." },
  { icon: "◆", accent: "#fb923c", title: "Web, Apps & More", desc: "HTML, Python, JavaScript, game dev — explore the full world of software." },
  { icon: "◉", accent: "#34d399", title: "Weekly Sessions", desc: `Every ${CLUB.day}, ${CLUB.time} in ${CLUB.room}. Bring your laptop and curiosity.` },
];

const YEAR_GROUPS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Sixth Form"];

// ─────────────────────────────────────────────
// HOOK — detects when an element enters the viewport
// This lets us trigger animations when you scroll to them
// ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// ─────────────────────────────────────────────
// COMPONENT: Navbar
// ─────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      background: scrolled ? "rgba(9, 11, 14, 0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #34d399, #059669)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⌨️</div>
          <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.02em" }}>{CLUB.name}</span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="desktop-nav">
          {["About", "Features", "Join"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: 500, padding: "6px 14px", borderRadius: 8, textDecoration: "none", transition: "all 0.2s", letterSpacing: "-0.01em" }}
               onMouseEnter={e => { e.target.style.color = "#fff"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
               onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.55)"; e.target.style.background = "transparent"; }}>
              {l}
            </a>
          ))}
          <a href="#join" style={{ marginLeft: 8, background: "#34d399", color: "#052e16", fontSize: 14, fontWeight: 700, padding: "8px 18px", borderRadius: 10, textDecoration: "none", letterSpacing: "-0.01em", transition: "all 0.2s" }}
             onMouseEnter={e => { e.target.style.background = "#6ee7b7"; e.target.style.transform = "scale(1.03)"; }}
             onMouseLeave={e => { e.target.style.background = "#34d399"; e.target.style.transform = "scale(1)"; }}>
            Join Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: Hero
// ─────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  const floaters = [
    { text: 'print("Hello, World!")', top: "18%", left: "3%" },
    { text: "const future = await learn()", top: "28%", right: "4%" },
    { text: "for idea in your_brain:", top: "55%", left: "2%" },
    { text: "function buildDreams() {", top: "68%", right: "3%" },
    { text: "<h1>I built this!</h1>", top: "42%", left: "5%" },
    { text: "git commit -m 'changed everything'", top: "78%", right: "5%" },
  ];

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#090b0e" }}>

      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", left: "20%", width: 500, height: 500, background: "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 400, height: 400, background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />

        {/* Subtle grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }} />

        {/* Floating code */}
        {floaters.map((f, i) => (
          <div key={i} style={{ position: "absolute", ...f, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(52,211,153,0.18)", whiteSpace: "nowrap", animation: `heroFloat ${7 + i}s ease-in-out infinite`, animationDelay: `${i * 0.9}s`, userSelect: "none" }}>
            {f.text}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 860, padding: "0 2rem" }}>

        {/* Eyebrow badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 100, padding: "6px 16px", marginBottom: 36,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <span style={{ width: 6, height: 6, background: "#34d399", borderRadius: "50%", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#34d399", letterSpacing: "0.06em" }}>{CLUB.school} · Coding Club</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.04em", color: "#fff", marginBottom: 28,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s" }}>
          <span style={{ display: "block" }}>{CLUB.name}</span>
          <span style={{ display: "block", color: "rgba(255,255,255,0.28)", fontWeight: 300, fontSize: "0.65em", letterSpacing: "-0.02em", marginTop: 4 }}>Coding Club</span>
        </h1>

        {/* Tagline */}
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.48)", lineHeight: 1.6, maxWidth: 480, margin: "0 auto 44px", fontWeight: 400,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}>
          {CLUB.tagline} Join students building the future — one line of code at a time.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 72,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}>
          <a href="#join" style={{ background: "#34d399", color: "#052e16", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 14, textDecoration: "none", letterSpacing: "-0.02em", transition: "all 0.25s", display: "inline-flex", alignItems: "center", gap: 8 }}
             onMouseEnter={e => { e.currentTarget.style.background = "#6ee7b7"; e.currentTarget.style.transform = "scale(1.04) translateY(-1px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(52,211,153,0.3)"; }}
             onMouseLeave={e => { e.currentTarget.style.background = "#34d399"; e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            Join the Club <span style={{ fontSize: 18 }}>→</span>
          </a>
          <a href="#about" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.75)", fontWeight: 600, fontSize: 16, padding: "14px 32px", borderRadius: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", letterSpacing: "-0.02em", transition: "all 0.25s" }}
             onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
             onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}>
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, justifyContent: "center",
          opacity: mounted ? 1 : 0, transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s" }}>
          {STATS.map(({ value, label }, i) => (
            <div key={label} style={{ textAlign: "center", padding: "0 32px", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "bounce 2s ease-in-out infinite" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(52,211,153,0.4), transparent)" }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: About
// ─────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" ref={ref} style={{ background: "#090b0e", padding: "140px 2rem", position: "relative", overflow: "hidden" }}>
      {/* Divider line */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1, height: 80, background: "linear-gradient(to bottom, transparent, rgba(52,211,153,0.4))" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
        {/* Text */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-32px)", transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#34d399", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>// about_us</p>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2.25rem, 4vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 28 }}>
            We Turn Students<br />Into <span style={{ color: "#34d399" }}>Builders</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              "ByteBuilders started in 2022 with 6 students and a shared laptop. Today we're 40+ members strong — shipping apps, games, and websites used by real people.",
              "We believe coding is a superpower, and every student deserves access to it. Whether you want to build software, understand technology, or just explore — we'll help you get there.",
              "No boring lectures. No gatekeeping. Just curious people building cool things together.",
            ].map((p, i) => (
              <p key={i} style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontSize: 16, margin: 0 }}>{p}</p>
            ))}
          </div>
        </div>

        {/* Terminal card */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(32px)", transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}>
          <div style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
            {/* Terminal header */}
            <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8, background: "#0a0d12" }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
              <span style={{ marginLeft: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>~/bytebuilders/welcome.js</span>
            </div>

            {/* Code */}
            <div style={{ padding: "28px 32px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 2 }}>
              {[
                { tokens: [{ c: "#7c8fad", t: "// Welcome to ByteBuilders" }] },
                { tokens: [] },
                { tokens: [{ c: "#cf83e3", t: "const " }, { c: "#7dd8f7", t: "you" }, { c: "#e6edf3", t: " = {" }] },
                { tokens: [{ c: "#e6edf3", t: "  " }, { c: "#79c0ff", t: "experience" }, { c: "#e6edf3", t: ": " }, { c: "#a5d6ff", t: '"none needed"' }, { c: "#e6edf3", t: "," }] },
                { tokens: [{ c: "#e6edf3", t: "  " }, { c: "#79c0ff", t: "curiosity" }, { c: "#e6edf3", t: ": " }, { c: "#a5d6ff", t: '"required"' }, { c: "#e6edf3", t: "," }] },
                { tokens: [{ c: "#e6edf3", t: "  " }, { c: "#79c0ff", t: "future" }, { c: "#e6edf3", t: ": " }, { c: "#a5d6ff", t: '"unlimited"' }, { c: "#e6edf3", t: "," }] },
                { tokens: [{ c: "#e6edf3", t: "};" }] },
                { tokens: [] },
                { tokens: [{ c: "#34d399", t: "// Ready to join us?" }] },
                { tokens: [{ c: "#7dd8f7", t: "bytebuilders" }, { c: "#e6edf3", t: "." }, { c: "#d2a8ff", t: "join" }, { c: "#e6edf3", t: "(you);" }] },
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", minHeight: "1.4rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.12)", width: 24, flexShrink: 0, fontSize: 11, lineHeight: "inherit", userSelect: "none" }}>{i + 1}</span>
                  <span>{line.tokens.map((tok, j) => <span key={j} style={{ color: tok.c }}>{tok.t}</span>)}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#34d399", marginTop: 4 }}>
                <span style={{ color: "rgba(255,255,255,0.12)", width: 24, fontSize: 11 }}>11</span>
                <span style={{ opacity: 0.7 }}>$</span>
                <span style={{ width: 7, height: 14, background: "#34d399", animation: "cursorBlink 1.1s step-start infinite", opacity: 0.85, borderRadius: 1 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: FeatureCard
// ─────────────────────────────────────────────
function FeatureCard({ icon, accent, title, desc, delay }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`, borderRadius: 20, padding: "32px 28px", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", transform: hovered ? "translateY(-4px)" : "translateY(0)",
        opacity: inView ? 1 : 0, transitionProperty: "opacity, transform, background, border-color", transitionDuration: `0.7s, 0.3s, 0.3s, 0.3s`, transitionDelay: `${delay}s, 0s, 0s, 0s`, transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
      {/* Icon */}
      <div style={{ width: 44, height: 44, background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: accent, marginBottom: 22, fontFamily: "monospace", transition: "all 0.3s", boxShadow: hovered ? `0 0 20px ${accent}20` : "none" }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em", transition: "color 0.2s", color: hovered ? accent : "#fff" }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: Features
// ─────────────────────────────────────────────
function Features() {
  const [headRef, headInView] = useInView();

  return (
    <section id="features" style={{ background: "#090b0e", padding: "120px 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: 72, opacity: headInView ? 1 : 0, transform: headInView ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#34d399", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>// what_we_do</p>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>
            Everything You Need to <span style={{ color: "#34d399" }}>Level Up</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            Designed to be genuinely useful, not just a line on your CV.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: JoinSection
// ─────────────────────────────────────────────
function JoinSection() {
  const [ref, inView] = useInView();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleJoin() {
    if (!name.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  }

  return (
    <section id="join" style={{ background: "#090b0e", padding: "140px 2rem", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, height: 600, background: "radial-gradient(ellipse, rgba(52,211,153,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1, height: 80, background: "linear-gradient(to bottom, transparent, rgba(52,211,153,0.3))" }} />

      <div ref={ref} style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        {submitted ? (
          <div>
            <div style={{ fontSize: 64, marginBottom: 24, animation: "popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>🎉</div>
            <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>
              Welcome, {name}!
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
              See you {CLUB.day} at {CLUB.time} in {CLUB.room}. Get ready to build something awesome.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 100, padding: "8px 18px" }}>
              <span style={{ width: 6, height: 6, background: "#34d399", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#34d399" }}>status: enrolled ✓</span>
            </div>
          </div>
        ) : (
          <>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#34d399", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>// join_us</p>
            <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>
              Ready to Start<br /><span style={{ color: "#34d399" }}>Building?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 16, lineHeight: 1.7, marginBottom: 44 }}>
              Drop your name below and we'll save you a seat. No commitment — just come and see what we're about.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
              <input type="text" placeholder="Your name" value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleJoin()}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 20px", color: "#fff", fontSize: 16, outline: "none", transition: "border-color 0.2s", fontFamily: "inherit" }}
                onFocus={e => { e.target.style.borderColor = "rgba(52,211,153,0.5)"; e.target.style.background = "rgba(52,211,153,0.04)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
              />
              <select value={year} onChange={e => setYear(e.target.value)}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 20px", color: year ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 16, outline: "none", appearance: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                onFocus={e => { e.target.style.borderColor = "rgba(52,211,153,0.5)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <option value="" disabled style={{ color: "#666" }}>Your year group</option>
                {YEAR_GROUPS.map(y => <option key={y} value={y} style={{ color: "#000" }}>{y}</option>)}
              </select>
            </div>

            <button onClick={handleJoin} disabled={!name.trim() || loading}
              style={{ width: "100%", background: name.trim() ? "#34d399" : "rgba(255,255,255,0.05)", color: name.trim() ? "#052e16" : "rgba(255,255,255,0.2)", fontWeight: 700, fontSize: 17, padding: "17px 0", borderRadius: 14, border: "none", cursor: name.trim() ? "pointer" : "not-allowed", transition: "all 0.25s", fontFamily: "'Clash Display', sans-serif", letterSpacing: "-0.02em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseEnter={e => { if (name.trim()) { e.currentTarget.style.background = "#6ee7b7"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(52,211,153,0.3)"; }}}
              onMouseLeave={e => { e.currentTarget.style.background = name.trim() ? "#34d399" : "rgba(255,255,255,0.05)"; e.currentTarget.style.boxShadow = "none"; }}>
              {loading ? (
                <span style={{ width: 18, height: 18, border: "2px solid #052e16", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
              ) : "Join ByteBuilders →"}
            </button>

            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, marginTop: 18, fontFamily: "'JetBrains Mono', monospace" }}>
              {CLUB.day} · {CLUB.time} · {CLUB.room}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: Footer
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#060809", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #34d399, #059669)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⌨️</div>
          <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.6)", fontSize: 15 }}>{CLUB.name}</span>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 14 }}>·</span>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>{CLUB.school}</span>
        </div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.15)" }}>
          made with 💚 by students, for students · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #090b0e; }

        ::placeholder { color: rgba(255,255,255,0.25) !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #090b0e; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); opacity: 0.18; }
          50% { transform: translateY(-18px); opacity: 0.35; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.85; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#090b0e", color: "#fff" }}>
        <Navbar />
        <Hero />
        <About />
        <Features />
        <JoinSection />
        <Footer />
      </div>
    </>
  );
}
