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
    <nav className="fixed top-0 w-full z-50 bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-cyan-400 flex items-center gap-2">
        <Layers size={22} /> HackTeam
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/projects" className="text-sm text-gray-300 hover:text-white transition">Browse Teams</Link>

        {user ? (
          <>
            <Link to="/create-project"
              className="flex items-center gap-1 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-3 py-1.5 rounded-lg transition">
              <Plus size={16} /> New Project
            </Link>
            <Link to={`/profile/${user._id}`}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
              <User size={16} /> {user.name.split(' ')[0]}
            </Link>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    className="text-sm text-gray-300 hover:text-white">Login</Link>
            <Link to="/register" className="text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-3 py-1.5 rounded-lg">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}