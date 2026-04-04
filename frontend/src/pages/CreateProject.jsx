import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';

const TAG_OPTIONS     = ['AI/ML','HealthTech','FinTech','EdTech','GreenTech','Web3','Gaming','Social'];
const ROLE_OPTIONS    = ['Frontend Dev','Backend Dev','Full-Stack','UI/UX Designer','Data Scientist','DevOps','Mobile Dev','Product Manager'];

export default function CreateProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });
  const [tags, setTags] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggle = (list, setList, item) =>
    setList(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/projects', { ...form, tags, rolesNeeded: roles });
      toast.success('Project created!');
      navigate(`/projects/${res.data._id}`);
    } catch {
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1">Start a Project</h1>
      <p className="text-gray-400 mb-8">Describe your hackathon idea and find your dream team</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Project Title</label>
          <input required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
            placeholder="e.g. AI-powered health tracker"
            value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <textarea rows={5} required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 resize-none"
            placeholder="Explain your idea, the problem it solves, and what makes it exciting..."
            value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Tags / Domain</label>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map(tag => (
              <button type="button" key={tag} onClick={() => toggle(tags, setTags, tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  tags.includes(tag) ? 'bg-cyan-500 border-cyan-500 text-black font-semibold' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-cyan-600'
                }`}>{tag}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Roles Needed</label>
          <div className="flex flex-wrap gap-2">
            {ROLE_OPTIONS.map(role => (
              <button type="button" key={role} onClick={() => toggle(roles, setRoles, role)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  roles.includes(role) ? 'bg-violet-500 border-violet-500 text-white font-semibold' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-violet-600'
                }`}>{role}</button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold py-3 rounded-xl transition text-base">
          {loading ? 'Posting...' : 'Post Project'}
        </button>
      </form>
    </div>
  );
}