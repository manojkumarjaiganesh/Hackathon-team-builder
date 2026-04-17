import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import {
  Edit, Trophy, Calendar, Users, Globe, Wifi, WifiOff,
  Rocket, ExternalLink, LayoutGrid, Plus, Loader2
} from 'lucide-react';
import './Profile.css';

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';
}

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [hackathons, setHackathons] = useState([]);
  const [loadingHack, setLoadingHack] = useState(true);
  const [modeFilter, setModeFilter] = useState('All'); // 'All' | 'Online' | 'Offline'
  const [activeTab, setActiveTab] = useState('hackathons');

  const isOwner = currentUser?.uid === id;
  const displayName = isOwner
    ? (currentUser?.displayName || currentUser?.email || 'Member')
    : 'User';
  const email = isOwner ? (currentUser?.email || '') : '';
  const initials = getInitials(displayName);

  // Fetch this user's hackathons from Firestore
  useEffect(() => {
    if (!id) return;
    const q = query(
      collection(db, 'hackathons'),
      where('creatorId', '==', id),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q,
      snap => { setHackathons(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoadingHack(false); },
      err  => { console.error(err); setLoadingHack(false); }
    );
    return () => unsub();
  }, [id]);

  const filteredHackathons = hackathons.filter(h =>
    modeFilter === 'All' || h.mode === modeFilter
  );

  return (
    <div className="pf-page">

      {/* ── PROFILE HERO ── */}
      <div className="pf-hero">
        <div className="pf-hero-bg" />
        <div className="pf-hero-inner">
          <div className="pf-avatar">{initials}</div>
          <div className="pf-hero-info">
            <h1 className="pf-name">{displayName}</h1>
            {email && <p className="pf-email">{email}</p>}
            <div className="pf-badges">
              <span className="pf-badge pf-badge-host">Hackathon Host</span>
              <span className="pf-badge pf-badge-builder">Builder</span>
            </div>
          </div>
          {isOwner && (
            <div className="pf-hero-actions">
              <Link to="/profile/edit" className="pf-edit-btn">
                <Edit size={15} /> Edit Profile
              </Link>
              <Link to="/create-hackathon" className="pf-create-btn">
                <Plus size={15} /> Host Hackathon
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="pf-tabs-bar">
        <div className="pf-tabs-inner">
          <button
            className={`pf-tab ${activeTab === 'hackathons' ? 'active' : ''}`}
            onClick={() => setActiveTab('hackathons')}
          >
            <LayoutGrid size={15} />
            My Hackathons
            <span className="pf-tab-count">{hackathons.length}</span>
          </button>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="pf-content">

        {activeTab === 'hackathons' && (
          <>
            {/* Subheader: filters + post btn */}
            <div className="pf-section-header">
              <div className="pf-mode-toggle">
                {['All', 'Online', 'Offline'].map(m => (
                  <button
                    key={m}
                    className={`pf-mode-btn ${modeFilter === m ? 'active' : ''}`}
                    onClick={() => setModeFilter(m)}
                  >
                    {m === 'Online'  && <Wifi size={13} />}
                    {m === 'Offline' && <WifiOff size={13} />}
                    {m}
                  </button>
                ))}
              </div>
              {isOwner && (
                <Link to="/create-hackathon" className="pf-new-btn">
                  <Plus size={14} /> New Hackathon
                </Link>
              )}
            </div>

            {/* Grid */}
            {loadingHack ? (
              <div className="pf-loading">
                <Loader2 size={26} className="pf-spinner" /> Loading hackathons…
              </div>
            ) : filteredHackathons.length === 0 ? (
              <div className="pf-empty">
                <div className="pf-empty-icon"><Rocket size={32} /></div>
                <h3>No hackathons {modeFilter !== 'All' ? `(${modeFilter})` : ''} yet</h3>
                <p>
                  {isOwner
                    ? 'You haven\'t hosted any hackathons. Create your first one!'
                    : 'This user hasn\'t posted any hackathons yet.'}
                </p>
                {isOwner && (
                  <Link to="/create-hackathon" className="pf-create-btn" style={{ marginTop: 16 }}>
                    <Plus size={14} /> Host Now
                  </Link>
                )}
              </div>
            ) : (
              <div className="pf-hack-grid">
                {filteredHackathons.map(h => (
                  <div key={h.id} className="pf-hack-card">
                    {/* banner */}
                    <div
                      className="pf-hack-banner"
                      style={{ background: h.bgColor || '#1e3a8a' }}
                    >
                      {h.imageUrl && <img src={h.imageUrl} className="pf-hack-banner-img" alt="banner" />}
                      <div className="pf-hack-banner-overlay" />
                      <span className={`pf-mode-pill ${h.mode === 'Online' ? 'online' : 'offline'}`}>
                        {h.mode === 'Online' ? <Wifi size={10} /> : <WifiOff size={10} />} {h.mode}
                      </span>
                      <h3 className="pf-hack-title">{h.title}</h3>
                    </div>

                    {/* body */}
                    <div className="pf-hack-body">
                      <p className="pf-hack-desc">{h.description}</p>

                      <div className="pf-hack-meta">
                        {h.prizePool && (
                          <div className="pf-meta-chip">
                            <Trophy size={12} />
                            <span>{h.prizePool}</span>
                          </div>
                        )}
                        {h.deadline && (
                          <div className="pf-meta-chip">
                            <Calendar size={12} />
                            <span>{new Date(h.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        )}
                        {h.maxTeamSize && (
                          <div className="pf-meta-chip">
                            <Users size={12} />
                            <span>Max {h.maxTeamSize}</span>
                          </div>
                        )}
                      </div>

                      {h.roles?.length > 0 && (
                        <div className="pf-hack-roles">
                          {h.roles.slice(0, 4).map(r => (
                            <span key={r} className="pf-role-badge">{r}</span>
                          ))}
                          {h.roles.length > 4 && (
                            <span className="pf-role-badge pf-role-more">+{h.roles.length - 4} more</span>
                          )}
                        </div>
                      )}

                      <div className="pf-hack-footer">
                        {h.websiteUrl && (
                          <a href={h.websiteUrl} target="_blank" rel="noreferrer" className="pf-link-btn">
                            <Globe size={13} /> Website <ExternalLink size={11} />
                          </a>
                        )}
                        {isOwner && (
                          <Link to={`/edit-hackathon/${h.id}`} className="pf-edit-hack-btn">
                            <Edit size={13} /> Edit
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}