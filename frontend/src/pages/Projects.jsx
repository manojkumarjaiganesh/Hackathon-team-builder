import { useState } from 'react';
import { Link } from 'react-router-dom';

const HACKATHONS = [
  {
    id: 1, title: 'AI Challenge', prize: 5000,
    desc: 'Tackle real-world AI problems and innovate',
    dates: 'Apr 17 – May 3', tab: 'ongoing',
    grad: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
    btn2: { label: 'Your Now', style: 'secondary' },
  },
  {
    id: 2, title: 'Cyber Security Fest', prize: 8000,
    desc: 'Build security solutions against cyber threats!',
    dates: 'May 3 – May 8', tab: 'online',
    grad: 'linear-gradient(135deg,#0c4a6e,#0284c7)',
    btn2: { label: 'Register Now', style: 'orange' },
  },
  {
    id: 3, title: 'Startup Sprint', prize: 10000,
    desc: 'Pitch and develop startup ideas in 48 hours!',
    dates: 'May 7 – May 9', tab: 'online',
    grad: 'linear-gradient(135deg,#1e3a5f,#0ea5e9)',
    btn2: { label: 'Apply Now', style: 'orange' },
  },
  {
    id: 4, title: 'Web Development Jam', prize: 4500,
    desc: 'Create innovative web apps and interfaces',
    dates: 'May 12 – May 16', tab: 'offline',
    grad: 'linear-gradient(135deg,#1e40af,#3b82f6)',
    btn2: { label: 'Apply Now', style: 'secondary' },
  },
  {
    id: 5, title: 'Blockchain Summit 2024', prize: 12000,
    desc: 'Explore blockchain solutions and innovations',
    dates: 'May 20 – May 25', tab: 'ongoing',
    grad: 'linear-gradient(135deg,#0f3460,#1e40af)',
    btn2: { label: 'Apply Now', style: 'secondary' },
  },
  {
    id: 6, title: 'Data Science Hack', prize: 7000,
    desc: 'Solve complex data challenges',
    dates: 'May 27 – May 30', tab: 'online',
    grad: 'linear-gradient(135deg,#164e63,#06b6d4)',
    btn2: { label: 'Apply Now', style: 'secondary' },
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
    <div style={{ background: '#eef2f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #1a2a6c 0%, #1e40af 100%)',
        padding: '36px 40px 32px'
      }}>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Hackathons
        </h1>
        <p style={{ color: '#bfdbfe', fontSize: 13, maxWidth: 1000 }}>
          Explore upcoming and ongoing hackathons to join exciting projects and compete to win big
        </p>
      </section>

      {/* FILTER TABS + SEARCH BAR */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '0 40px', display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap'
      }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '14px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            background: 'none', border: 'none',
            borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
            color: activeTab === tab ? '#2563eb' : '#64748b',
            textTransform: 'capitalize'
          }}>{tab}</button>
        ))}

        <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 12px' }} />

        {/* Category select */}
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            border: '1px solid #e2e8f0', borderRadius: 7, padding: '7px 12px',
            fontSize: 12, color: '#374151', background: '#fff', cursor: 'pointer',
            outline: 'none', marginRight: 8
          }}>
          <option>All Categories</option>
          <option>AI / ML</option>
          <option>Cyber Security</option>
          <option>Web Dev</option>
          <option>Blockchain</option>
          <option>Data Science</option>
        </select>

        {/* Search */}
        <div style={{ position: 'relative', marginRight: 8 }}>
          <span style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            color: '#9ca3af', fontSize: 14
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '1px solid #e2e8f0', borderRadius: 7,
              padding: '7px 12px 7px 30px', fontSize: 12,
              color: '#374151', background: '#fff', outline: 'none', width: 200
            }} />
        </div>

        <button style={{
          background: '#2563eb', color: '#fff', border: 'none',
          borderRadius: 7, padding: '7px 14px', fontSize: 12,
          fontWeight: 600, cursor: 'pointer'
        }}>All Locations</button>
      </div>

      {/* CARDS GRID */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        gap: 16, padding: '24px 40px 40px'
      }}>
        {filtered.map(h => (
          <div key={h.id} style={{
            background: '#fff', borderRadius: 12,
            overflow: 'hidden', border: '1px solid #e2e8f0'
          }}>
            {/* Card Header */}
            <div style={{
              background: h.grad, padding: '18px 18px 14px',
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 8,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18, flexShrink: 0
              }}>🚀</div>
              <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>{h.title}</span>
            </div>

            {/* Card Body */}
            <div style={{ padding: '14px 18px 16px' }}>
              <p style={{ fontSize: 12, color: '#475569', marginBottom: 12, lineHeight: 1.5 }}>
                {h.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>
                  ${h.prize.toLocaleString()}
                </span>
                <span style={{ fontSize: 11, color: '#60a5fa', fontWeight: 500 }}>{h.dates}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Link to={`/projects/${h.id}`} style={{
                  flex: 1, background: '#2563eb', color: '#fff', border: 'none',
                  borderRadius: 6, padding: '8px 0', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', textAlign: 'center', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>Apply Now</Link>
                <button style={{
                  flex: 1, borderRadius: 6, padding: '8px 0', fontSize: 12,
                  fontWeight: 500, cursor: 'pointer', border: '1px solid',
                  ...(h.btn2.style === 'orange'
                    ? { background: '#f97316', color: '#fff', borderColor: '#f97316' }
                    : { background: '#fff', color: '#374151', borderColor: '#d1d5db' })
                }}>{h.btn2.label}</button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
            No hackathons found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}