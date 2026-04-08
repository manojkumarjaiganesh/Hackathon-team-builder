import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Globe, Zap, Clock, Search } from 'lucide-react';
import './Projects.css';

const HACKATHONS = [
  {
    id: 1,
    title: 'AI Innovators Hack',
    category: 'Ongoing',
    type: 'Online',
    description: 'Build the next generation of AI-powered applications that solve real-world problems.',
    prize: '$10,000',
    daysLeft: '3 Days',
    gradient: 'linear-gradient(135deg, #1e3a8a, #2563eb)'
  },
  {
    id: 2,
    title: 'Sustainability Challenge',
    category: 'Upcoming',
    type: 'Online',
    description: 'Design sustainable solutions for a greener future. Focus on energy, waste, or water.',
    prize: '$5,000',
    daysLeft: '12 Days',
    gradient: 'linear-gradient(135deg, #064e3b, #059669)'
  },
  {
    id: 3,
    title: 'Web3 Global Summit',
    category: 'Ongoing',
    type: 'Offline',
    description: 'The premier event for Web3 developers to build decentralized protocols for the new internet.',
    prize: '$25,000',
    daysLeft: '5 Days',
    gradient: 'linear-gradient(135deg, #4c1d95, #7c3aed)'
  },
  {
    id: 4,
    title: 'Cyber Security Shield',
    category: 'Upcoming',
    type: 'Online',
    description: 'Protect the digital frontier. Build tools for encryption, threat detection, and privacy.',
    prize: '$15,000',
    daysLeft: '8 Days',
    gradient: 'linear-gradient(135deg, #991b1b, #dc2626)'
  },
  {
    id: 5,
    title: 'FinTech Revolution',
    category: 'Ongoing',
    type: 'Offline',
    description: 'Reimagine financial services. Build banking, payment, and investment tools for everyone.',
    prize: '$20,000',
    daysLeft: '2 Days',
    gradient: 'linear-gradient(135deg, #0f172a, #334155)'
  },
  {
    id: 6,
    title: 'HealthTech Sprint',
    category: 'Upcoming',
    type: 'Online',
    description: 'Modernize healthcare. Develop solutions for patient care, diagnostics, and wellness.',
    prize: '$12,000',
    daysLeft: '15 Days',
    gradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
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
  }, [filter, search]);

  const filteredHackathons = HACKATHONS.filter(hack => {
    const matchesFilter = filter === 'All' || hack.category === filter || hack.type === filter;
    const matchesSearch = hack.title.toLowerCase().includes(search.toLowerCase()) || 
                          hack.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="projects-page">
      {/* FILTER BAR */}
      <div className="projects-filters">
        <button 
          className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          <Filter size={16} /> All
        </button>
        <button 
          className={`filter-btn ${filter === 'Ongoing' ? 'active' : ''}`}
          onClick={() => setFilter('Ongoing')}
        >
          <Zap size={16} /> Ongoing
        </button>
        <button 
          className={`filter-btn ${filter === 'Online' ? 'active' : ''}`}
          onClick={() => setFilter('Online')}
        >
          <Globe size={16} /> Online
        </button>
        <button 
          className={`filter-btn ${filter === 'Offline' ? 'active' : ''}`}
          onClick={() => setFilter('Offline')}
        >
          <Clock size={16} /> Offline
        </button>
        
        <div style={{ marginLeft: 'auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
          <input 
            type="text" 
            placeholder="Search hackathons..." 
            className="filter-btn"
            style={{ paddingLeft: '36px', width: '240px', cursor: 'text' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="projects-container">
        {filteredHackathons.length > 0 ? (
          <div className="projects-grid">
            {filteredHackathons.map((hack, index) => (
              <div 
                key={hack.id} 
                className="hack-card reveal" 
                ref={addToRefs}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="hack-card-header" style={{ background: hack.gradient }}>
                  <span className="card-badge">{hack.type}</span>
                  <h2 className="hack-card-title">{hack.title}</h2>
                </div>
                <div className="hack-card-body">
                  <p className="hack-card-desc">{hack.description}</p>
                  <div className="hack-card-meta">
                    <div className="hack-prize">
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: '600' }}>PRIZE POOL</span>
                      {hack.prize}
                    </div>
                    <div className="hack-days">
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: '600', textAlign: 'right' }}>ENDS IN</span>
                      {hack.daysLeft}
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="card-btn card-btn-primary">Apply Now</button>
                    <Link to={`/projects/${hack.id}`} className="card-btn card-btn-secondary">Learn More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results reveal active">
            <Search size={48} style={{ color: '#1e293b', marginBottom: '24px' }} />
            <h3>No hackathons found</h3>
            <p>We couldn't find any hackathons matching your search or filters. Try adjusting your criteria.</p>
            <button 
              className="card-btn card-btn-secondary" 
              style={{ marginTop: '24px' }}
              onClick={() => {setFilter('All'); setSearch('');}}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}