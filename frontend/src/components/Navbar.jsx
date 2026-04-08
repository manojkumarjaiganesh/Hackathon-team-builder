import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Plus, Layers, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; }

  .ht-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    width: 100%;
    z-index: 1000;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    justify-content: space-between;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    border-bottom: 1px solid transparent;
  }

  .ht-nav.scrolled {
    background: rgba(8, 12, 28, 0.82);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom-color: rgba(56, 189, 248, 0.08);
    box-shadow: 0 4px 40px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.03);
  }

  .ht-nav:not(.scrolled) {
    background: linear-gradient(180deg, rgba(8,12,28,0.95) 0%, rgba(8,12,28,0.6) 100%);
  }

  /* Logo */
  .ht-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none;
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 18px; letter-spacing: -0.3px;
    color: #f0f6ff;
    transition: opacity 0.2s;
    position: relative; z-index: 2;
  }
  .ht-logo:hover { opacity: 0.85; }

  .ht-logo-icon {
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px;
    background: linear-gradient(135deg, #38bdf8 0%, #6366f1 100%);
    border-radius: 8px;
    box-shadow: 0 0 16px rgba(56,189,248,0.35);
    flex-shrink: 0;
  }

  .ht-logo span {
    background: linear-gradient(90deg, #e0f2fe, #c7d2fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Desktop nav */
  .ht-links { display: flex; align-items: center; gap: 6px; }

  .ht-link {
    color: #94a3b8; font-size: 13.5px; font-weight: 500;
    text-decoration: none; padding: 6px 12px; border-radius: 8px;
    letter-spacing: 0.01em;
    transition: color 0.2s, background 0.2s;
  }
  .ht-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.05); }

  .ht-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.08); margin: 0 4px; }

  /* User chip */
  .ht-user {
    display: flex; align-items: center; gap: 6px;
    color: #cbd5e1; font-size: 13.5px; font-weight: 500;
    text-decoration: none;
    padding: 5px 10px 5px 6px; border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.04);
    transition: all 0.2s;
  }
  .ht-user:hover { border-color: rgba(56,189,248,0.25); background: rgba(56,189,248,0.07); color: #e2e8f0; }

  .ht-user-avatar {
    width: 24px; height: 24px; border-radius: 50%;
    background: linear-gradient(135deg, #38bdf8, #6366f1);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-family: 'Syne', sans-serif; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }

  /* Logout */
  .ht-logout {
    background: none; border: none; color: #64748b; cursor: pointer;
    padding: 7px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.2s, background 0.2s;
  }
  .ht-logout:hover { color: #f87171; background: rgba(248,113,113,0.08); }

  /* CTA buttons */
  .ht-btn-primary {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
    color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    padding: 7px 16px; border-radius: 9px;
    text-decoration: none; letter-spacing: 0.01em;
    box-shadow: 0 0 0 0 rgba(14,165,233,0);
    transition: opacity 0.2s, box-shadow 0.2s, transform 0.15s;
    position: relative; overflow: hidden;
  }
  .ht-btn-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .ht-btn-primary:hover { box-shadow: 0 0 20px rgba(14,165,233,0.4); transform: translateY(-1px); }
  .ht-btn-primary:hover::before { opacity: 1; }

  .ht-btn-outline {
    display: inline-flex; align-items: center;
    color: #94a3b8; font-size: 13.5px; font-weight: 500;
    text-decoration: none; padding: 6px 12px; border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .ht-btn-outline:hover { color: #e2e8f0; background: rgba(255,255,255,0.05); }

  /* Hamburger */
  .ht-hamburger {
    display: none;
    background: none; border: 1px solid rgba(255,255,255,0.08);
    color: #94a3b8; cursor: pointer;
    padding: 7px; border-radius: 9px;
    align-items: center; justify-content: center;
    transition: color 0.2s, background 0.2s, border-color 0.2s;
    z-index: 1001;
  }
  .ht-hamburger:hover { color: #e2e8f0; background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.14); }

  /* Mobile drawer */
  .ht-drawer {
    display: none;
    position: fixed;
    top: 64px; left: 0; right: 0;
    background: rgba(8, 12, 28, 0.97);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(56,189,248,0.08);
    padding: 20px 24px 28px;
    flex-direction: column; gap: 4px;
    transform: translateY(-8px); opacity: 0; pointer-events: none;
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
    box-shadow: 0 24px 48px rgba(0,0,0,0.6);
  }
  .ht-drawer.open { transform: translateY(0); opacity: 1; pointer-events: all; }

  .ht-drawer-link {
    display: flex; align-items: center; gap: 10px;
    color: #94a3b8; font-size: 15px; font-weight: 500;
    text-decoration: none; padding: 11px 14px; border-radius: 10px;
    transition: color 0.2s, background 0.2s;
  }
  .ht-drawer-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.05); }

  .ht-drawer-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 10px 0; }

  .ht-drawer-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
    color: #fff; font-size: 14px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    padding: 12px 20px; border-radius: 10px;
    text-decoration: none; margin-top: 6px;
    box-shadow: 0 4px 16px rgba(14,165,233,0.3);
    transition: opacity 0.2s, transform 0.15s;
  }
  .ht-drawer-btn:hover { opacity: 0.9; transform: translateY(-1px); }

  .ht-drawer-logout {
    display: flex; align-items: center; gap: 10px;
    background: none; border: none;
    color: #64748b; font-size: 15px; font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer; padding: 11px 14px; border-radius: 10px;
    width: 100%; text-align: left;
    transition: color 0.2s, background 0.2s;
  }
  .ht-drawer-logout:hover { color: #f87171; background: rgba(248,113,113,0.07); }

  /* Responsive */
  @media (max-width: 768px) {
    .ht-nav { padding: 0 20px; }
    .ht-links { display: none; }
    .ht-hamburger { display: flex; }
    .ht-drawer { display: flex; }
  }

  @media (max-width: 400px) {
    .ht-nav { padding: 0 16px; }
  }
`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    close();
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <>
      <style>{styles}</style>

      <nav className={`ht-nav${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <Link to="/" className="ht-logo" onClick={close}>
          <span className="ht-logo-icon">
            <Layers size={16} color="#fff" />
          </span>
          <span>HackTeam</span>
        </Link>

        {/* Desktop Links */}
        <div className="ht-links">
          <Link to="/projects" className="ht-link">
            Browse Projects
          </Link>
          <Link to="/how-it-works" className="ht-link">
            How It Works
          </Link>
          <div className="ht-divider" />
          {user ? (
            <>
              <Link to="/create-project" className="ht-btn-primary">
                <Plus size={14} /> New Project
              </Link>
              <Link to={`/profile/${user._id}`} className="ht-user">
                <span className="ht-user-avatar">{initials}</span>
                {user?.name?.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="ht-logout"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ht-btn-outline">
                Login
              </Link>
              <Link to="/register" className="ht-btn-primary">
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="ht-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`ht-drawer${menuOpen ? " open" : ""}`}>
        <Link to="/projects" className="ht-drawer-link" onClick={close}>
          Browse Projects
        </Link>
        <Link to="/how-it-works" className="ht-drawer-link" onClick={close}>
          How It Works
        </Link>
        <div className="ht-drawer-divider" />
        {user ? (
          <>
            <Link
              to={`/profile/${user._id}`}
              className="ht-drawer-link"
              onClick={close}
            >
              <span
                className="ht-user-avatar"
                style={{ width: 28, height: 28, fontSize: 11 }}
              >
                {initials}
              </span>
              {user?.name}
            </Link>
            <Link
              to="/create-project"
              className="ht-drawer-btn"
              onClick={close}
            >
              <Plus size={16} /> New Project
            </Link>
            <button onClick={handleLogout} className="ht-drawer-logout">
              <LogOut size={16} /> Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="ht-drawer-link" onClick={close}>
              <User size={16} /> Login
            </Link>
            <Link to="/register" className="ht-drawer-btn" onClick={close}>
              Join HackTeam →
            </Link>
          </>
        )}
      </div>
    </>
  );
}
