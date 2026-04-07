import { Link } from "react-router-dom";

<>
  <Link
    to="/register"
    style={{
      background: "#ea580c",
      color: "#fff",
      padding: "10px 22px",
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 600,
      textDecoration: "none",
      display: "inline-block",
    }}
  >
    Join Now for Free
  </Link>

  <Link
    to="/projects"
    style={{
      border: "1.5px solid #fff",
      color: "#fff",
      padding: "10px 22px",
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 600,
      textDecoration: "none",
      display: "inline-block",
    }}
  >
    Find Teams & Projects
  </Link>
</>;

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .htb-wrap { background: #fff; color: #1a1a2e; font-family: sans-serif; }
  .htb-nav { background: #1a2a6c; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 56px; }
  .htb-logo { display: flex; align-items: center; gap: 8px; color: #fff; font-size: 15px; font-weight: 500; }
  .htb-logo-icon { width: 28px; height: 28px; background: #e8f0fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .htb-nav-links { display: flex; align-items: center; gap: 24px; }
  .htb-nav-links a { color: #cbd5e1; font-size: 13px; text-decoration: none; cursor: pointer; }
  .htb-nav-links a:hover { color: #fff; }
  .htb-btn-primary { background: #2563eb; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
  .htb-hero { background: linear-gradient(135deg, #1a2a6c 0%, #1e3a8a 60%, #1e40af 100%); display: flex; align-items: center; justify-content: space-between; padding: 48px 40px 40px; gap: 24px; min-height: 280px; position: relative; overflow: hidden; }
  .htb-hero::before { content: ''; position: absolute; right: 0; top: 0; width: 55%; height: 100%; background: #1e3a8a; clip-path: ellipse(80% 120% at 90% 50%); opacity: 0.5; }
  .htb-hero-text { flex: 1; z-index: 1; }
  .htb-hero-text h1 { font-size: 32px; font-weight: 700; color: #fff; line-height: 1.25; margin-bottom: 12px; }
  .htb-hero-text p { color: #bfdbfe; font-size: 13px; line-height: 1.6; max-width: 320px; margin-bottom: 20px; }
  .htb-hero-btns { display: flex; gap: 10px; flex-wrap: wrap; }
  .htb-btn-orange { background: #ea580c; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
  .htb-btn-outline { background: transparent; color: #fff; border: 1.5px solid #fff; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
  .htb-features { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #e5e7eb; }
  .htb-feature { padding: 20px 24px; border-right: 1px solid #e5e7eb; display: flex; align-items: flex-start; gap: 14px; background: #fff; }
  .htb-feature:last-child { border-right: none; }
  .htb-feature-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .htb-feature h3 { font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
  .htb-feature p { font-size: 12px; color: #64748b; line-height: 1.5; }
  .htb-featured { padding: 28px 32px; background: #f8fafc; }
  .htb-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .htb-section-header h2 { font-size: 18px; font-weight: 700; color: #0f172a; }
  .htb-section-header span { font-size: 12px; color: #64748b; border-left: 1.5px solid #cbd5e1; padding-left: 12px; }
  .htb-hackathon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .htb-hack-card { border-radius: 10px; overflow: hidden; }
  .htb-hack-card-bg { height: 120px; display: flex; align-items: flex-end; padding: 12px; position: relative; }
  .htb-hack-card-title { color: #fff; font-size: 14px; font-weight: 600; z-index: 1; }
  .htb-hack-card-footer { background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; border-radius: 0 0 10px 10px; }
  .htb-btn-sm { padding: 6px 14px; border-radius: 5px; font-size: 11px; font-weight: 600; border: none; cursor: pointer; color: #fff; }
  .htb-days { font-size: 11px; color: #64748b; font-weight: 500; }
  .htb-icon-circle { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; }
  .bg-ai { background: linear-gradient(135deg, #1e3a8a, #1d4ed8); }
  .bg-startup { background: linear-gradient(135deg, #1e3a8a, #0369a1); }
  .bg-cyber { background: linear-gradient(135deg, #1e3a8a, #4338ca); }
`;

const NavLogoIcon = () => (
  <div className="htb-logo-icon">
    <svg viewBox="0 0 16 16" fill="none" width={16} height={16}>
      <path d="M8 2L14 13H2L8 2Z" fill="#2563eb" />
      <circle cx={12} cy={11} r={3} fill="#fb923c" />
    </svg>
  </div>
);

const SearchIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <circle cx={8} cy={8} r={5} stroke="#2563eb" strokeWidth={1.8} />
    <path
      d="M12 12l4 4"
      stroke="#2563eb"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </svg>
);

const TeamIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <circle cx={7} cy={7} r={3} stroke="#16a34a" strokeWidth={1.8} />
    <circle cx={13} cy={7} r={3} stroke="#16a34a" strokeWidth={1.8} />
    <path
      d="M2 17c0-3 2-5 5-5h6c3 0 5 2 5 5"
      stroke="#16a34a"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </svg>
);

const StarIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2l2.4 4.8 5.3.8-3.8 3.7.9 5.2L10 14l-4.8 2.5.9-5.2L2.3 7.6l5.3-.8L10 2z"
      stroke="#d97706"
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  </svg>
);

const HeroIllustration = () => (
  <svg
    width={340}
    height={200}
    viewBox="0 0 340 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx={300} cy={30} r={40} fill="#3b82f6" opacity={0.15} />
    <circle cx={40} cy={160} r={30} fill="#60a5fa" opacity={0.1} />
    <rect x={155} y={55} width={44} height={44} rx={8} fill="#dbeafe" />
    <text x={162} y={85} fontSize={20} fill="#2563eb">
      {"</>"}
    </text>
    <rect x={252} y={30} width={56} height={56} rx={8} fill="#fef3c7" />
    <text x={267} y={70} fontSize={28}>
      🏆
    </text>
    <rect
      x={242}
      y={100}
      width={80}
      height={28}
      rx={6}
      fill="#fff"
      opacity={0.9}
    />
    <text x={250} y={119} fontSize={13} fill="#f59e0b">
      ★★★
    </text>
    {/* Person 1 */}
    <ellipse cx={120} cy={195} rx={18} ry={6} fill="#1e3a8a" opacity={0.3} />
    <circle cx={120} cy={120} r={16} fill="#fde68a" />
    <rect x={106} y={136} width={28} height={38} rx={6} fill="#f97316" />
    <rect x={100} y={150} width={12} height={28} rx={5} fill="#f97316" />
    <rect x={120} y={150} width={12} height={28} rx={5} fill="#f97316" />
    <rect
      x={112}
      y={118}
      width={8}
      height={6}
      rx={2}
      fill="none"
      stroke="#92400e"
      strokeWidth={1.2}
    />
    <rect
      x={122}
      y={118}
      width={8}
      height={6}
      rx={2}
      fill="none"
      stroke="#92400e"
      strokeWidth={1.2}
    />
    <line
      x1={120}
      y1={121}
      x2={122}
      y2={121}
      stroke="#92400e"
      strokeWidth={1}
    />
    <line
      x1={106}
      y1={148}
      x2={92}
      y2={128}
      stroke="#f97316"
      strokeWidth={8}
      strokeLinecap="round"
    />
    <circle cx={90} cy={122} r={10} fill="#fbbf24" />
    <rect x={86} y={130} width={8} height={5} rx={1} fill="#d97706" />
    {/* Person 2 */}
    <ellipse cx={185} cy={195} rx={22} ry={6} fill="#1e3a8a" opacity={0.3} />
    <circle cx={185} cy={112} r={16} fill="#fcd34d" />
    <rect x={170} y={128} width={30} height={40} rx={6} fill="#93c5fd" />
    <rect x={158} y={162} width={48} height={28} rx={4} fill="#94a3b8" />
    <rect x={161} y={165} width={42} height={22} rx={2} fill="#1e293b" />
    <rect x={153} y={190} width={58} height={4} rx={2} fill="#64748b" />
    <rect
      x={164}
      y={168}
      width={20}
      height={2}
      rx={1}
      fill="#60a5fa"
      opacity={0.8}
    />
    <rect
      x={164}
      y={173}
      width={30}
      height={2}
      rx={1}
      fill="#60a5fa"
      opacity={0.6}
    />
    <rect
      x={164}
      y={178}
      width={24}
      height={2}
      rx={1}
      fill="#60a5fa"
      opacity={0.4}
    />
    {/* Person 3 */}
    <ellipse cx={245} cy={195} rx={18} ry={6} fill="#1e3a8a" opacity={0.3} />
    <circle cx={245} cy={120} r={16} fill="#c4b5fd" />
    <rect x={231} y={136} width={28} height={38} rx={6} fill="#4f46e5" />
    <path
      d="M232 120 Q232 104 245 104 Q258 104 258 120"
      fill="none"
      stroke="#312e81"
      strokeWidth={3}
    />
    <rect x={229} y={117} width={6} height={10} rx={3} fill="#312e81" />
    <rect x={255} y={117} width={6} height={10} rx={3} fill="#312e81" />
  </svg>
);

const hackathons = [
  {
    bgClass: "bg-ai",
    title: "AI Challenge 2026",
    btnColor: "#2563eb",
    btnLabel: "Join Now",
    days: "3 Days Left",
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <rect x={3} y={3} width={6} height={6} rx={1.5} fill="#93c5fd" />
        <rect x={11} y={3} width={6} height={6} rx={1.5} fill="#93c5fd" />
        <rect x={3} y={11} width={6} height={6} rx={1.5} fill="#93c5fd" />
        <circle cx={14} cy={14} r={3} fill="#60a5fa" />
      </svg>
    ),
  },
  {
    bgClass: "bg-startup",
    title: "Startup Sprint",
    btnColor: "#0284c7",
    btnLabel: "Apply Now",
    days: "5 Days Left",
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2C10 2 14 6 14 11a4 4 0 01-8 0C6 6 10 2 10 2z"
          fill="#93c5fd"
        />
        <circle cx={10} cy={11} r={1.5} fill="#1e3a8a" />
      </svg>
    ),
  },
  {
    bgClass: "bg-cyber",
    title: "Cyber Security Fest",
    btnColor: "#4338ca",
    btnLabel: "Register Now",
    days: "7 Days Left",
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2l6 3v5c0 4-3 7-6 8C7 17 4 14 4 10V5l6-3z"
          fill="#a5b4fc"
        />
        <path
          d="M8 10l2 2 3-3"
          stroke="#4338ca"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HackathonTeamBuilder() {
  const handleNav = (message) => {
    alert(`Navigate to: ${message}`);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="htb-wrap">
        {/* Navbar */}
        <nav className="htb-nav">
          <div className="htb-logo">
            <NavLogoIcon />
            <span>
              <span style={{ color: "#fff" }}>Hackathon</span>{" "}
              <span style={{ color: "#60a5fa" }}>Team</span>{" "}
              <span style={{ color: "#fb923c" }}>Builder</span>
            </span>
          </div>
          <div className="htb-nav-links">
            <a>Browse Projects ▾</a>
            <a>How It Works</a>
            <a>Login</a>
            <button
              className="htb-btn-primary"
              onClick={() => handleNav("Register page")}
            >
              Join Now
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="htb-hero">
          <div className="htb-hero-text">
            <h1>
              Find Your <span style={{ color: "#fb923c" }}>Perfect</span>
              <br />
              <span style={{ color: "#2dd4bf" }}>Hackathon</span> Team!
            </h1>
            <p>
              Connect with innovators, collaborate on exciting projects, and
              compete to win big.
            </p>
            <div className="htb-hero-btns">
              <button
                className="htb-btn-orange"
                onClick={() => handleNav("Register page")}
              >
                Join Now for Free
              </button>
              <button
                className="htb-btn-outline"
                onClick={() => handleNav("Projects browse page")}
              >
                Find Teams &amp; Projects
              </button>
            </div>
          </div>
          <div style={{ zIndex: 1, flexShrink: 0 }}>
            <div
              style={{
                width: 340,
                height: 200,
                background: "#1e40af",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <div className="htb-features">
          <div className="htb-feature">
            <div className="htb-feature-icon" style={{ background: "#eff6ff" }}>
              <SearchIcon />
            </div>
            <div>
              <h3>Discover Projects</h3>
              <p>Explore hackathons and join exciting challenges.</p>
            </div>
          </div>
          <div className="htb-feature">
            <div className="htb-feature-icon" style={{ background: "#f0fdf4" }}>
              <TeamIcon />
            </div>
            <div>
              <h3>Find Teammates</h3>
              <p>Connect with skilled and passionate innovators.</p>
            </div>
          </div>
          <div className="htb-feature">
            <div className="htb-feature-icon" style={{ background: "#fffbeb" }}>
              <StarIcon />
            </div>
            <div>
              <h3>Compete &amp; Win</h3>
              <p>Build your team and aim for victory.</p>
            </div>
          </div>
        </div>

        {/* Featured Hackathons */}
        <section className="htb-featured">
          <div className="htb-section-header">
            <h2>Featured Hackathons</h2>
            <span>Join the latest competitions.</span>
          </div>
          <div className="htb-hackathon-grid">
            {hackathons.map((hack, i) => (
              <div key={i} className="htb-hack-card">
                <div className={`htb-hack-card-bg ${hack.bgClass}`}>
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <div className="htb-icon-circle">{hack.icon}</div>
                  </div>
                  <div className="htb-hack-card-title">{hack.title}</div>
                </div>
                <div className="htb-hack-card-footer">
                  <button
                    className="htb-btn-sm"
                    style={{ background: hack.btnColor }}
                    onClick={() => handleNav("Project Detail page")}
                  >
                    {hack.btnLabel}
                  </button>
                  <span className="htb-days">{hack.days}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
