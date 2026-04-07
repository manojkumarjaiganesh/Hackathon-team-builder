import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Plus, Layers } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      background: '#1a2a6c', borderBottom: '1px solid #1e3a8a',
      padding: '0 32px', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      {/* Logo */}
      <Link to="/" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        color: '#38bdf8', fontWeight: 700, fontSize: 16, textDecoration: 'none'
      }}>
        <Layers size={20} /> HackTeam
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>

        {/* ✅ This is the key line — must be Link to="/projects" */}
        <Link to="/projects" style={{
          color: '#cbd5e1', fontSize: 13, textDecoration: 'none'
        }}>
          Browse Projects
        </Link>
<Link to="/how-it-works" style={{ color: '#cbd5e1', fontSize: 13, textDecoration: 'none' }}>
  How It Works
</Link>
        {user ? (
          <>
            <Link to="/create-project" style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: '#0ea5e9', color: '#fff',
              fontSize: 13, fontWeight: 600,
              padding: '6px 14px', borderRadius: 7, textDecoration: 'none'
            }}>
              <Plus size={15} /> New Project
            </Link>

            <Link to={`/profile/${user._id}`} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              color: '#cbd5e1', fontSize: 13, textDecoration: 'none'
            }}>
              <User size={15} /> {user.name.split(' ')[0]}
            </Link>

            <button onClick={handleLogout} style={{
              background: 'none', border: 'none',
              color: '#94a3b8', cursor: 'pointer'
            }}>
              <LogOut size={17} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: '#cbd5e1', fontSize: 13, textDecoration: 'none'
            }}>Login</Link>

            <Link to="/register" style={{
              background: '#0ea5e9', color: '#fff',
              fontSize: 13, fontWeight: 600,
              padding: '6px 14px', borderRadius: 7, textDecoration: 'none'
            }}>Join Now</Link>
          </>
        )}
      </div>
    </nav>
  );
}