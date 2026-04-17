import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import {
  Edit, Trophy, Calendar, Users, Globe, Wifi, WifiOff,
  Rocket, ExternalLink, LayoutGrid, Plus, Loader2, Trash2, FolderCode,
  Tag, Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import './Profile.css';

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';
}

function SkeletonCard() {
  return (
    <div className="pf-skeleton-card">
      <div className="pf-skeleton-banner" />
      <div className="pf-skeleton-body">
        <div className="pf-skeleton-line short" />
        <div className="pf-skeleton-line" />
        <div className="pf-skeleton-line" />
        <div className="pf-skeleton-footer">
          <div className="pf-skeleton-btn" />
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [hackathons, setHackathons] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingHack, setLoadingHack] = useState(true);
  const [loadingProj, setLoadingProj] = useState(true);
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
    const qHack = query(
      collection(db, 'hackathons'),
      where('creatorId', '==', id),
      orderBy('createdAt', 'desc')
    );
    const unsubHack = onSnapshot(qHack,
      snap => { setHackathons(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoadingHack(false); },
      err  => { console.error(err); setLoadingHack(false); }
    );

    const qProj = query(
      collection(db, 'projects'),
      where('creatorId', '==', id),
      orderBy('createdAt', 'desc')
    );
    const unsubProj = onSnapshot(qProj,
      snap => { setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoadingProj(false); },
      err  => { console.error(err); setLoadingProj(false); }
    );

    return () => { unsubHack(); unsubProj(); };
  }, [id]);

  const handleDeleteHackathon = async (hackId) => {
    if (!window.confirm('Are you sure you want to delete this hackathon? This action cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'hackathons', hackId));
      toast.success('Hackathon deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete hackathon');
    }
  };

  const handleDeleteProject = async (projId) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'projects', projId));
      toast.success('Project deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete project');
    }
  };

  const handleToggleHackathonMode = async (hackId, currentMode) => {
    if (!isOwner) return;
    
    const isCurrentlyOnline = currentMode?.toLowerCase() === 'online';
    const newMode = isCurrentlyOnline ? 'Offline' : 'Online';
    
    // Optimistic UI Update: update state immediately for "instant" feel
    setHackathons(prev => prev.map(h => h.id === hackId ? { ...h, mode: newMode } : h));
    
    try {
      await updateDoc(doc(db, 'hackathons', hackId), { mode: newMode });
      toast.success(`Hackathon is now ${newMode}`);
    } catch (err) {
      // Revert if the database update fails
      setHackathons(prev => prev.map(h => h.id === hackId ? { ...h, mode: currentMode } : h));
      console.error('[Profile] Toggle mode error:', err);
      toast.error('Failed to change mode. Check connection.');
    }
  };

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
          <button
            className={`pf-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderCode size={15} />
            My Projects
            <span className="pf-tab-count">{projects.length}</span>
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
              <div className="pf-hack-grid">
                {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
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
                      
                      {isOwner ? (
                        <div className="pf-mode-toggle-wrap" onClick={(e) => e.stopPropagation()}>
                          <span className={`pf-mode-label ${h.mode?.toLowerCase() === 'online' ? 'online' : 'offline'}`}>
                            {h.mode?.toLowerCase() === 'online' ? <Wifi size={12} /> : <WifiOff size={12} />} {h.mode}
                          </span>
                          <label className="pf-switch" title={`Set to ${h.mode?.toLowerCase() === 'online' ? 'Offline' : 'Online'}`}>
                            <input 
                              type="checkbox" 
                              checked={h.mode?.toLowerCase() === 'online'} 
                              onChange={(e) => {
                                // We use the current h.mode to determine the next state
                                handleToggleHackathonMode(h.id, h.mode);
                              }}
                            />
                            <span className="pf-slider round"></span>
                          </label>
                        </div>
                      ) : (
                        <span className={`pf-mode-pill ${h.mode?.toLowerCase() === 'online' ? 'online' : 'offline'}`}>
                          {h.mode?.toLowerCase() === 'online' ? <Wifi size={10} /> : <WifiOff size={10} />} {h.mode}
                        </span>
                      )}
                      
                      <h3 className="pf-hack-title">{h.title}</h3>
                    </div>

                    {/* body */}
                    <div className="pf-hack-body">
                      <p className="pf-hack-desc">{h.description}</p>

                      <div className="pf-hack-meta">
                        {h.prizePool && (
                          <div className="pf-meta-chip prize">
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

                        {isOwner && (
                          <div className="pf-hack-actions">
                            <Link to={`/edit-hackathon/${h.id}`} className="pf-edit-hack-btn">
                              <Edit size={13} /> Edit
                            </Link>
                            <button 
                              onClick={() => handleDeleteHackathon(h.id)} 
                              className="pf-delete-hack-btn"
                              title="Delete Hackathon"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'projects' && (
          <>
            <div className="pf-section-header">
              <h2 className="pf-section-title">Team Projects</h2>
              {isOwner && (
                <Link to="/create-project" className="pf-new-btn">
                  <Plus size={14} /> New Project
                </Link>
              )}
            </div>

            {loadingProj ? (
              <div className="pf-hack-grid">
                {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : projects.length === 0 ? (
              <div className="pf-empty">
                <div className="pf-empty-icon"><FolderCode size={32} /></div>
                <h3>No projects yet</h3>
                <p>
                  {isOwner
                    ? 'You haven\'t posted any team projects yet.'
                    : 'This user hasn\'t posted any projects yet.'}
                </p>
                {isOwner && (
                  <Link to="/create-project" className="pf-create-btn" style={{ marginTop: 16 }}>
                    <Plus size={14} /> Post Project
                  </Link>
                )}
              </div>
            ) : (
              <div className="pf-hack-grid">
                {projects.map(p => (
                  <div key={p.id} className="pf-hack-card pf-project-card">
                    <div className="pf-hack-banner pf-project-banner">
                      <div className="pf-hack-banner-glass" />
                      <div className="pf-project-tag-float">Team Project</div>
                      <h3 className="pf-hack-title">{p.title}</h3>
                    </div>
                    <div className="pf-hack-body">
                      {p.tags?.length > 0 && (
                        <div className="pf-project-tags">
                          {p.tags.map(tag => (
                            <span key={tag} className="pf-project-tag">
                              <Tag size={10} /> {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="pf-hack-desc">{p.description}</p>
                      
                      {p.rolesNeeded?.length > 0 && (
                        <div className="pf-project-roles">
                          <span className="pf-roles-label">Recruiting:</span>
                          <div className="pf-roles-list">
                            {p.rolesNeeded.slice(0, 3).map(role => (
                              <span key={role} className="pf-role-badge pf-project-role">{role}</span>
                            ))}
                            {p.rolesNeeded.length > 3 && (
                              <span className="pf-role-badge pf-role-more">+{p.rolesNeeded.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="pf-hack-footer">
                        <div className="pf-project-meta">
                          <span className="pf-project-slots">
                             {p.rolesNeeded?.length || 0} Open Roles
                          </span>
                          {p.createdAt?.toDate && (
                            <span className="pf-project-date">
                               <Clock size={11} /> {new Date(p.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                        {isOwner && (
                          <div className="pf-hack-actions">
                            <button 
                              onClick={() => handleDeleteProject(p.id)} 
                              className="pf-delete-hack-btn"
                              title="Delete Project"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
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