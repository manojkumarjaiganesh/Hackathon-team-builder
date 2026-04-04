import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SKILL_OPTIONS = ['React','Vue','Angular','Node.js','Python','Django','FastAPI',
  'PostgreSQL','MongoDB','AWS','Docker','Figma','Flutter','Swift','Kotlin','ML/AI'];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]         = useState({ name:'', email:'', password:'', role:'', bio:'' });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading]   = useState(false);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ ...form, skills: selectedSkills });
      toast.success('Account created!');
      navigate('/projects');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-1">Join HackTeam</h1>
        <p className="text-gray-400 text-sm mb-6">Create your builder profile</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Role Title</label>
              <input placeholder="e.g. Frontend Dev" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input type="email" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input type="password" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Bio</label>
            <textarea rows={3} placeholder="Tell others what you're about..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 resize-none"
              value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Your Skills</label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map(skill => (
                <button type="button" key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${
                    selectedSkills.includes(skill)
                      ? 'bg-cyan-500 border-cyan-500 text-black font-semibold'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-cyan-600'
                  }`}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg transition">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Have an account? <Link to="/login" className="text-cyan-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}