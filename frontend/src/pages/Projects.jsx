import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Globe, Zap, Clock, Search, Users, Tag, Rocket, Loader2, Calendar } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
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
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)'
  },
  {
    id: 2,
    title: 'Sustainability Challenge',
    category: 'Upcoming',
    type: 'Online',
    description: 'Design sustainable solutions for a greener future. Focus on energy, waste, or water.',
    prize: '$5,000',
    daysLeft: '12 Days',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)'
  },
  {
    id: 3,
    title: 'Web3 Global Summit',
    category: 'Ongoing',
    type: 'Offline',
    description: 'The premier event for Web3 developers to build decentralized protocols for the new internet.',
    prize: '$25,000',
    daysLeft: '5 Days',
    gradient: 'linear-gradient(135deg, #3b0764 0%, #6d28d9 50%, #7c3aed 100%)'
  },
  {
    id: 4,
    title: 'Cyber Security Shield',
    category: 'Upcoming',
    type: 'Online',
    description: 'Protect the digital frontier. Build tools for encryption, threat detection, and privacy.',
    prize: '$15,000',
    daysLeft: '8 Days',
    gradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)'
  },
  {
    id: 5,
    title: 'FinTech Revolution',
    category: 'Ongoing',
    type: 'Offline',
    description: 'Reimagine financial services. Build banking, payment, and investment tools for everyone.',
    prize: '$20,000',
    daysLeft: '2 Days',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
  },
  {
    id: 6,
    title: 'HealthTech Sprint',
    category: 'Upcoming',
    type: 'Online',
    description: 'Modernize healthcare. Develop solutions for patient care, diagnostics, and wellness.',
    prize: '$12,000',
    daysLeft: '15 Days',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)'
  }
];

const TAG_COLORS = {
  'AI/ML':       { bg: '#6366f122', text: '#818cf8', border: '#6366f144' },
  'HealthTech':  { bg: '#10b98122', text: '#34d399', border: '#10b98144' },
  'FinTech':     { bg: '#f59e0b22', text: '#fbbf24', border: '#f59e0b44' },
  'EdTech':      { bg: '#3b82f622', text: '#60a5fa', border: '#3b82f644' },
  'GreenTech':   { bg: '#22c55e22', text: '#4ade80', border: '#22c55e44' },
  'Web3':        { bg: '#8b5cf622', text: '#a78bfa', border: '#8b5cf644' },
  'Gaming':      { bg: '#ef444422', text: '#f87171', border: '#ef444444' },
  'Social':      { bg: '#ec489922', text: '#f472b6', border: '#ec489944' },
};

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';
}

function getAvatarGradient(name = '') {
  const gradients = [
    'linear-gradient(135deg,#6366f1,#8b5cf6)',
    'linear-gradient(135deg,#ec4899,#f43f5e)',
    'linear-gradient(135deg,#10b981,#06b6d4)',
    'linear-gradient(135deg,#f59e0b,#ef4444)',
    'linear-gradient(135deg,#3b82f6,#6366f1)',
    'linear-gradient(135deg,#8b5cf6,#ec4899)',
  ];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return gradients[Math.abs(hash) % gradients.length];
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [communityProjects, setCommunityProjects] = useState([]);
  const [dbHackathons, setDbHackathons] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingHacks, setLoadingHacks] = useState(true);
  const { user } = useAuth();
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    // 1. Listen for Team Projects
    const qProjects = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubProjects = onSnapshot(qProjects,
      (snapshot) => {
        setCommunityProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoadingProjects(false);
      },
      (err) => { console.error(err); setLoadingProjects(false); }
    );

    // 2. Listen for Hosted Hackathons
    const qHacks = query(collection(db, 'hackathons'), orderBy('createdAt', 'desc'));
    console.log('[Projects] Subscribing to hackathons collection');
    const unsubHacks = onSnapshot(qHacks,
      (snapshot) => {
        console.log('[Projects] Received hackathons update. Count:', snapshot.docs.length);
        setDbHackathons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoadingHacks(false);
      },
      (err) => { 
        console.error('[Projects] Firestore Error (hackathons):', err); 
        setLoadingHacks(false); 
      }
    );

    return () => { unsubProjects(); unsubHacks(); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.08 }
    );
    revealRefs.current.forEach(r => observer.observe(r));
    return () => observer.disconnect();
  }, [filter, search, communityProjects, dbHackathons]);

  // Combine hardcoded and Firestore hackathons
  const allHackathons = [
    ...dbHackathons.map(h => ({
      ...h,
      prize: h.prizePool,
      category: h.mode === 'Online' ? 'Ongoing' : 'Upcoming', // temporary logic
      daysLeft: h.deadline ? (Math.ceil((new Date(h.deadline) - new Date()) / (1000 * 60 * 60 * 24)) + ' Days') : 'TBD',
      gradient: h.bgColor || 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
      isDynamic: true
    })),
    ...HACKATHONS
  ];

  const filteredHackathons = allHackathons.filter(h => {
    const matchFilter = filter === 'All' || h.category === filter || h.type === filter || h.mode === filter;
    const matchSearch = (h.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
                        (h.description?.toLowerCase() || '').includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const filteredCommunity = communityProjects.filter(p =>
    (p.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (p.description?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div className="projects-page">

      {/* ── STICKY FILTER BAR ── */}
      <div className="projects-filters">
        <div className="filters-inner">
          <div className="filter-group">
            {[
              { label: 'All',     icon: <Filter size={15} />,  val: 'All' },
              { label: 'Ongoing', icon: <Zap size={15} />,     val: 'Ongoing' },
              { label: 'Online',  icon: <Globe size={15} />,   val: 'Online' },
              { label: 'Offline', icon: <Clock size={15} />,   val: 'Offline' },
            ].map(({ label, icon, val }) => (
              <button
                key={val}
                className={`filter-btn ${filter === val ? 'active' : ''}`}
                onClick={() => setFilter(val)}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          <div className="search-wrapper">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search projects…"
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="section-label reveal" ref={addToRefs}>
        <span className="section-label-dot" />
        Featured Hackathons
      </div>

      {/* ── HACKATHON GRID ── */}
      <div className="projects-container">
        {filteredHackathons.length > 0 ? (
          <div className="projects-grid">
            {filteredHackathons.map((hack, i) => (
              <div
                key={hack.id}
                className="hack-card reveal"
                ref={addToRefs}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {/* coloured banner */}
                <div className="hack-card-header" style={{ background: hack.gradient }}>
                  <div className="hack-card-header-shine" />
                  <span className={`status-pill ${hack.category === 'Ongoing' ? 'status-live' : 'status-soon'}`}>
                    {hack.category === 'Ongoing' ? '🔴 Live' : '🟡 Soon'}
                  </span>
                  <span className="type-pill">{hack.mode || hack.type}</span>
                  <h2 className="hack-card-title">{hack.title}</h2>
                </div>

                <div className="hack-card-body">
                  <p className="hack-card-desc">{hack.description}</p>

                  <div className="hack-card-meta">
                    <div className="meta-block">
                      <span className="meta-label">PRIZE POOL</span>
                      <span className="meta-value prize-value">{hack.prize}</span>
                    </div>
                    <div className="meta-divider" />
                    <div className="meta-block meta-right">
                      <span className="meta-label">ENDS IN</span>
                      <span className="meta-value ends-value">{hack.daysLeft}</span>
                    </div>
                  </div>

                  {hack.roles?.length > 0 && (
                    <div className="cc-roles-list" style={{ marginTop: -4 }}>
                      {hack.roles.slice(0, 3).map(role => (
                        <span key={role} className="cc-role-badge" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>{role}</span>
                      ))}
                      {hack.roles.length > 3 && <span className="cc-role-badge" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>+{hack.roles.length - 3}</span>}
                    </div>
                  )}

                  <div className="card-actions">
                    <button className="btn-primary-solid">{hack.isDynamic ? 'Apply Now' : 'Join Hackathon'}</button>
                    <Link to={hack.isDynamic ? (hack.websiteUrl || '#') : `/projects/${hack.id}`} target={hack.isDynamic && hack.websiteUrl ? "_blank" : "_self"} className="btn-ghost">
                      {hack.isDynamic && hack.websiteUrl ? 'Website ↗' : 'Details →'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state reveal active">
            <div className="empty-icon"><Search size={36} /></div>
            <h3>No hackathons found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className="btn-ghost" onClick={() => { setFilter('All'); setSearch(''); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* ── COMMUNITY SECTION ── */}
      <div className="community-section">

        {/* section header */}
        <div className="community-header reveal" ref={addToRefs}>
          <div className="community-title-row">
            <div className="community-title-left">
              <span className="community-icon-wrap"><Users size={18} /></span>
              <div>
                <h2 className="community-title">Community Team Projects</h2>
                <p className="community-subtitle">Browse open roles posted by hackers. Find your squad or recruit yours.</p>
              </div>
            </div>
            {user && (
              <Link to="/create-project" className="post-project-btn">
                <Rocket size={13} /> Post a Project
              </Link>
            )}
          </div>
        </div>

        {/* content */}
        {loadingProjects ? (
          <div className="community-loading">
            <Loader2 size={28} className="spin-icon" />
            <span>Loading projects…</span>
          </div>
        ) : filteredCommunity.length === 0 ? (
          <div className="community-empty reveal active">
            <div className="empty-icon"><Rocket size={34} /></div>
            <h3>No projects yet</h3>
            <p>Be the first to post a project and build your dream team!</p>
            {user
              ? <Link to="/create-project" className="btn-primary-solid" style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8 }}><Rocket size={14}/> Create First Project</Link>
              : <Link to="/login" className="btn-ghost" style={{ marginTop: 20 }}>Login to Post</Link>
            }
          </div>
        ) : (
          <div className="community-grid">
            {filteredCommunity.map((project, i) => {
              const initials = getInitials(project.creatorName);
              const avatarBg  = getAvatarGradient(project.creatorName || '');
              return (
                <div
                  key={project.id}
                  className="community-card reveal"
                  ref={addToRefs}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  {/* glow blob */}
                  <div className="card-glow-blob" />

                  {/* header row */}
                  <div className="cc-header">
                    <div className="cc-avatar" style={{ background: avatarBg }}>{initials}</div>
                    <div className="cc-meta">
                      <h3 className="cc-title">{project.title}</h3>
                      <span className="cc-creator">by {project.creatorName}</span>
                    </div>
                    {project.createdAt?.toDate && (
                      <span className="cc-date">
                        <Calendar size={11} />
                        {new Date(project.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>

                  {/* description */}
                  <p className="cc-desc">{project.description}</p>

                  {/* tags */}
                  {project.tags?.length > 0 && (
                    <div className="cc-tags">
                      {project.tags.map(tag => {
                        const c = TAG_COLORS[tag] || { bg: '#33415522', text: '#94a3b8', border: '#33415544' };
                        return (
                          <span key={tag} className="cc-tag" style={{ background: c.bg, color: c.text, borderColor: c.border }}>
                            <Tag size={9} /> {tag}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* roles */}
                  {project.rolesNeeded?.length > 0 && (
                    <div className="cc-roles-section">
                      <span className="cc-roles-label"><Users size={11} /> Roles Needed</span>
                      <div className="cc-roles-list">
                        {project.rolesNeeded.map(role => (
                          <span key={role} className="cc-role-badge">{role}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* footer */}
                  <div className="cc-footer">
                    <span className="cc-spots">
                      {project.rolesNeeded?.length ?? 0} open slot{project.rolesNeeded?.length !== 1 ? 's' : ''}
                    </span>
                    <button className="join-btn">
                      Join Team <span className="join-arrow">→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}