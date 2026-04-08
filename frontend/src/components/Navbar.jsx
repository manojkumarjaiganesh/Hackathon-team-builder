import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Plus, Layers, Menu, X, Settings, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

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
  .ht-links { display: flex; align-items: center; gap: 8px; }

  .ht-link {
    color: #94a3b8; font-size: 14px; font-weight: 500;
    text-decoration: none; padding: 6px 14px; border-radius: 9px;
    letter-spacing: 0.01em;
    transition: color 0.2s, background 0.2s;
  }
  .ht-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.05); }

  .ht-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.08); margin: 0 4px; }

  /* New User Container & Dropdown */
  .ht-user-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .ht-user-trigger {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 4px 10px 4px 4px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s;
    color: #cbd5e1;
  }

  .ht-user-trigger:hover {
    border-color: rgba(56,189,248,0.3);
    background: rgba(255,255,255,0.06);
  }

  .ht-user-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, #38bdf8, #6366f1);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-family: 'Syne', sans-serif; font-weight: 800; color: #fff;
    flex-shrink: 0;
    box-shadow: 0 0 12px rgba(56,189,248,0.2);
  }

  .ht-dropdown-menu {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 220px;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 8px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 4px;
    transform: translateY(10px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1001;
  }

  .ht-dropdown-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .ht-dropdown-header {
    padding: 12px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    margin-bottom: 4px;
  }

  .ht-dropdown-name {
    display: block;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }

  .ht-dropdown-email {
    display: block;
    color: #64748b;
    font-size: 12px;
    margin-top: 2px;
  }

  .ht-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    color: #94a3b8;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 10px;
    transition: all 0.2s;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .ht-dropdown-item:hover {
    background: rgba(255,255,255,0.05);
    color: #fff;
  }

  .ht-dropdown-item.logout:hover {
    background: rgba(248, 113, 113, 0.08);
    color: #f87171;
  }

  /* CTA buttons */
  .ht-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff;
    color: #030711; font-size: 14px; font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    padding: 8px 18px; border-radius: 10px;
    text-decoration: none; letter-spacing: 0.01em;
    transition: all 0.2s;
  }
  .ht-btn-primary:hover { 
    background: #f1f5f9;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }

  .ht-btn-outline {
    display: inline-flex; align-items: center;
    color: #94a3b8; font-size: 14px; font-weight: 500;
    text-decoration: none; padding: 7px 16px; border-radius: 10px;
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Close dropdown on click outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const close = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    close();
  };

  const displayName = user?.displayName || user?.name || "Member";
  const email = user?.email || "";
  
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

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
              <Link to="/create-project" className="ht-link" style={{ marginRight: 8 }}>
                <Plus size={16} /> New Project
              </Link>
              
              <div className="ht-user-container" ref={dropdownRef}>
                <button 
                  className="ht-user-trigger" 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="ht-user-avatar">{initials}</span>
                  <ChevronDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                <div className={`ht-dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                  <div className="ht-dropdown-header">
                    <span className="ht-dropdown-name">{displayName}</span>
                    <span className="ht-dropdown-email">{email}</span>
                  </div>
                  <Link to={`/profile/${user.uid || user._id}`} className="ht-dropdown-item" onClick={close}>
                    <User size={16} /> Account settings
                  </Link>
                  <Link to="/settings" className="ht-dropdown-item" onClick={close}>
                    <Settings size={16} /> Preferences
                  </Link>
                  <button onClick={handleLogout} className="ht-dropdown-item logout">
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              </div>
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
              to={`/profile/${user.uid || user._id}`}
              className="ht-drawer-link"
              onClick={close}
            >
              <span
                className="ht-user-avatar"
                style={{ width: 28, height: 28, fontSize: 11 }}
              >
                {initials}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{displayName}</span>
                <span style={{ fontSize: 11, color: '#64748b' }}>View profile</span>
              </div>
            </Link>
            <Link
              to="/create-project"
              className="ht-drawer-btn"
              onClick={close}
              style={{ marginTop: 12 }}
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
