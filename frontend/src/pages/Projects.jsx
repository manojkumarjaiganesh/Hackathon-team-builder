import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const HACKATHONS = [
  {
    id: 1, title: 'AI Challenge', prize: 5000,
    desc: 'Tackle real-world AI problems and innovate to create the next breakthrough.',
    dates: 'Apr 17 – May 3', tab: 'ongoing',
    grad: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
    btn2: { label: 'Learn More', style: 'secondary' },
    icon: '🧠'
  },
  {
    id: 2, title: 'Cyber Security Fest', prize: 8000,
    desc: 'Build robust security solutions against emerging cyber threats.',
    dates: 'May 3 – May 8', tab: 'online',
    grad: 'linear-gradient(135deg,#0c4a6e,#0284c7)',
    btn2: { label: 'Learn More', style: 'secondary' },
    icon: '🛡️'
  },
  {
    id: 3, title: 'Startup Sprint', prize: 10000,
    desc: 'Pitch and develop your innovative startup ideas in just 48 hours!',
    dates: 'May 7 – May 9', tab: 'online',
    grad: 'linear-gradient(135deg,#1e3a5f,#0ea5e9)',
    btn2: { label: 'Learn More', style: 'secondary' },
    icon: '🚀'
  },
  {
    id: 4, title: 'Web Development Jam', prize: 4500,
    desc: 'Create innovative web applications and stunning user interfaces.',
    dates: 'May 12 – May 16', tab: 'offline',
    grad: 'linear-gradient(135deg,#1e40af,#3b82f6)',
    btn2: { label: 'Learn More', style: 'secondary' },
    icon: '💻'
  },
  {
    id: 5, title: 'Blockchain Summit', prize: 12000,
    desc: 'Explore cutting-edge decentralized solutions and innovations.',
    dates: 'May 20 – May 25', tab: 'ongoing',
    grad: 'linear-gradient(135deg,#0f3460,#1e40af)',
    btn2: { label: 'Learn More', style: 'secondary' },
    icon: '⛓️'
  },
  {
    id: 6, title: 'Data Science Hack', prize: 7000,
    desc: 'Solve complex data challenges and derive actionable insights.',
    dates: 'May 27 – May 30', tab: 'online',
    grad: 'linear-gradient(135deg,#164e63,#06b6d4)',
    btn2: { label: 'Learn More', style: 'secondary' },
    icon: '📊'
  },
];

const TABS = ['all', 'ongoing', 'online', 'offline'];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('All Categories');

  const filtered = HACKATHONS.filter(h => {
    const matchTab      = activeTab === 'all' || h.tab === activeTab;
    const matchSearch   = h.title.toLowerCase().includes(search.toLowerCase()) ||
                          h.desc.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="projects-container">
      {/* FILTER TABS + SEARCH BAR */}
      <div className="projects-filters">
        <div className="filter-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="filter-controls">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="filter-select"
          >
            <option>All Categories</option>
            <option>AI / ML</option>
            <option>Cyber Security</option>
            <option>Web Dev</option>
            <option>Blockchain</option>
            <option>Data Science</option>
          </select>

          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search hackathons..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="projects-grid">
        {filtered.map(h => (
          <div key={h.id} className="project-card">
            {/* Card Header */}
            <div className="card-header" style={{ background: h.grad }}>
              <div className="card-icon">{h.icon}</div>
              <span className="card-title">{h.title}</span>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <p className="card-desc">{h.desc}</p>
              
              <div className="card-stats">
                <div className="prize-box">
                  <span className="prize-label">Prize Pool</span>
                  <span className="prize-amount">${h.prize.toLocaleString()}</span>
                </div>
                <div className="date-badge">{h.dates}</div>
              </div>

              <div className="card-actions">
                <Link to={`/projects/${h.id}`} className="btn-primary">
                  Apply Now
                </Link>
                <button className={`btn-${h.btn2.style}`}>
                  {h.btn2.label}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🏜️</div>
            <div className="empty-state-text">No hackathons found matching your search.</div>
          </div>
        )}
      </div>
    </div>
  );
}