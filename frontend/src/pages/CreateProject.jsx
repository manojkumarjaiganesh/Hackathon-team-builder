import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Rocket, Tag, Users, Type } from 'lucide-react';
import './CreateProject.css';

const TAG_OPTIONS     = ['AI/ML','HealthTech','FinTech','EdTech','GreenTech','Web3','Gaming','Social'];
const ROLE_OPTIONS    = ['Frontend Dev','Backend Dev','Full-Stack','UI/UX Designer','Data Scientist','DevOps','Mobile Dev','Product Manager'];

export default function CreateProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });
  const [tags, setTags] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  const toggle = (list, setList, item) =>
    setList(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/projects', { ...form, tags, rolesNeeded: roles });
      toast.success('Project created successfully!');
      navigate(`/projects/${res.data._id}`);
    } catch (error) {
      toast.error('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project-page">
      <div className="form-container reveal" ref={addToRefs}>
        <div className="form-header">
          <h1>Ignite Your <span>Idea</span></h1>
          <p>Bring your vision to life and build your elite hackathon squad.</p>
        </div>

        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <label className="form-label"><Type size={14} style={{ marginRight: 8 }} /> Project Title</label>
            <input 
              required 
              className="premium-input"
              placeholder="e.g. Quantum Analytics Dashboard"
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label className="form-label"><Tag size={14} style={{ marginRight: 8 }} /> Description</label>
            <textarea 
              required
              className="premium-textarea"
              placeholder="Explain your mission, the tech stack, and why people should join you..."
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Domain / Tech Stack</label>
            <div className="pills-container">
              {TAG_OPTIONS.map(tag => (
                <button 
                  type="button" 
                  key={tag} 
                  onClick={() => toggle(tags, setTags, tag)}
                  className={`pill-btn ${tags.includes(tag) ? 'tag-active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label"><Users size={14} style={{ marginRight: 8 }} /> Roles Needed</label>
            <div className="pills-container">
              {ROLE_OPTIONS.map(role => (
                <button 
                  type="button" 
                  key={role} 
                  onClick={() => toggle(roles, setRoles, role)}
                  className={`pill-btn ${roles.includes(role) ? 'role-active' : ''}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn-ultra">
            {loading ? 'Processing...' : (
              <>
                Launch Project <Rocket size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}