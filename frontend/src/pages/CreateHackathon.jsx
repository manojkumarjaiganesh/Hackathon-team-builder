import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Rocket, Trophy, Calendar, Users, Globe, Wifi, WifiOff,
  Image as ImageIcon, Link, Upload, X, Check, Palette,
  Hash, Briefcase, Loader2
} from 'lucide-react';
import './CreateHackathon.css';

const ROLE_OPTIONS = [
  'Frontend Dev', 'Backend Dev', 'Full-Stack', 'UI/UX Designer',
  'Data Scientist', 'DevOps', 'Mobile Dev', 'Product Manager',
  'ML Engineer', 'Blockchain Dev', 'QA Engineer', 'Security Analyst',
  'Cloud Architect', 'Technical Writer',
];

const PRESET_COLORS = [
  '#1e3a8a', '#064e3b', '#4c1d95', '#991b1b',
  '#0369a1', '#0f172a', '#713f12', '#1e1b4b',
];

export default function CreateHackathon() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const fileRef = useRef(null);

  console.log('[CreateHackathon] Render. User:', user?.uid, 'AuthLoading:', authLoading);

  const [form, setForm] = useState({
    title: '',
    description: '',
    prizePool: '',
    deadline: '',
    websiteUrl: '',
    maxTeamSize: '',
    bgColor: '#1e3a8a',
  });
  const [mode, setMode] = useState('Online');
  const [roles, setRoles] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleRole = (role) =>
    setRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5 MB'); return; }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };


const uploadImage = () => new Promise((resolve, reject) => {
  const auth = getAuth();

  console.log("🔥 Firebase user:", auth.currentUser);

  if (!auth.currentUser) {
    reject(new Error("User not authenticated"));
    return;
  }

  if (!imageFile) return resolve(null);

  const storageRef = ref(storage, `hackathons/${Date.now()}_${imageFile.name}`);
  const task = uploadBytesResumable(storageRef, imageFile);

  task.on(
    'state_changed',
    snap => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
    (error) => {
      console.error("❌ Upload error FULL:", error);
      reject(error);
    },
    async () => {
      const url = await getDownloadURL(task.snapshot.ref);
      resolve(url);
    }
  );
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('--- Submission Started ---');
    if (!user) {
      toast.error('You must be logged in to host a hackathon');
      console.error('Submission aborted: No user found');
      return;
    }
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setLoading(true);
    try {
      console.log('Form Data:', form);
      console.log('Roles:', roles);
      
      let imageUrl = null;
      if (imageFile) {
        console.log('Attempting image upload...');
        try {
          imageUrl = await uploadImage();
          console.log('Image uploaded successfully:', imageUrl);
        } catch (uploadErr) {
          console.error('Image upload failed (likely CORS):', uploadErr);
          toast.error('Image upload failed. Storing hackathon without image.');
          // Continue without image
        }
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        prizePool: form.prizePool.trim(),
        deadline: form.deadline,
        websiteUrl: form.websiteUrl.trim(),
        maxTeamSize: form.maxTeamSize ? Number(form.maxTeamSize) : null,
        bgColor: form.bgColor,
        mode,
        roles,
        imageUrl,
        creatorId: user?.uid,
        creatorName: user?.displayName || user?.email || 'Anonymous',
        createdAt: serverTimestamp(),
      };
      
      console.log('Saving to Firestore (hackathons)...', payload);
      const docRef = await addDoc(collection(db, 'hackathons'), payload);
      console.log('Document saved with ID:', docRef.id);

      toast.success('Hackathon posted! 🎉');
      navigate(`/profile/${user.uid}`);
    } catch (err) {
      console.error('Submission ERROR:', err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
      console.log('--- Submission Ended ---');
    }
  };

  if (authLoading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#030711', color: '#64748b', gap: 12 }}>
      <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} /> Initializing session...
    </div>
  );

  // Live card preview colour
  const previewBg = form.bgColor || '#1e3a8a';

  return (
    <div className="ch-page">
      <div className="ch-layout">

        {/* ── LEFT: FORM ── */}
        <div className="ch-form-col">
          <div className="ch-header">
            <div className="ch-header-icon"><Rocket size={20} /></div>
            <div>
              <h1 className="ch-title">Host a Hackathon</h1>
              <p className="ch-subtitle">Fill in the details to publish your event and attract top talent.</p>
            </div>
          </div>

          <form className="ch-form" onSubmit={handleSubmit}>

            {/* Title */}
            <div className="ch-group">
              <label className="ch-label"><Hash size={13} /> Event Title</label>
              <input
                required
                className="ch-input"
                placeholder="e.g. AI for Good Hackathon 2025"
                value={form.title}
                onChange={e => set('title', e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="ch-group">
              <label className="ch-label"><Briefcase size={13} /> Description</label>
              <textarea
                required
                className="ch-textarea"
                placeholder="What is this hackathon about? Goals, themes, judging criteria…"
                rows={4}
                value={form.description}
                onChange={e => set('description', e.target.value)}
              />
            </div>

            {/* Prize + Deadline row */}
            <div className="ch-row">
              <div className="ch-group">
                <label className="ch-label"><Trophy size={13} /> Prize Pool</label>
                <input
                  className="ch-input"
                  placeholder="e.g. $10,000"
                  value={form.prizePool}
                  onChange={e => set('prizePool', e.target.value)}
                />
              </div>
              <div className="ch-group">
                <label className="ch-label"><Calendar size={13} /> Deadline</label>
                <input
                  type="date"
                  className="ch-input ch-date"
                  value={form.deadline}
                  onChange={e => set('deadline', e.target.value)}
                />
              </div>
            </div>

            {/* Team size + Website row */}
            <div className="ch-row">
              <div className="ch-group">
                <label className="ch-label"><Users size={13} /> Max Team Size</label>
                <input
                  type="number"
                  min="1" max="20"
                  className="ch-input"
                  placeholder="e.g. 4"
                  value={form.maxTeamSize}
                  onChange={e => set('maxTeamSize', e.target.value)}
                />
              </div>
              <div className="ch-group">
                <label className="ch-label"><Link size={13} /> Website / Register URL</label>
                <input
                  className="ch-input"
                  placeholder="https://…"
                  value={form.websiteUrl}
                  onChange={e => set('websiteUrl', e.target.value)}
                />
              </div>
            </div>

            {/* Mode toggle */}
            <div className="ch-group">
              <label className="ch-label"><Globe size={13} /> Mode</label>
              <div className="ch-mode-toggle">
                <button
                  type="button"
                  className={`ch-mode-btn ${mode === 'Online' ? 'active' : ''}`}
                  onClick={() => setMode('Online')}
                >
                  <Wifi size={15} /> Online
                </button>
                <button
                  type="button"
                  className={`ch-mode-btn ${mode === 'Offline' ? 'active' : ''}`}
                  onClick={() => setMode('Offline')}
                >
                  <WifiOff size={15} /> Offline
                </button>
              </div>
            </div>

            {/* Background colour */}
            <div className="ch-group">
              <label className="ch-label"><Palette size={13} /> Card Background Colour</label>
              <div className="ch-color-row">
                <div className="ch-color-presets">
                  {PRESET_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`ch-color-swatch ${form.bgColor === c ? 'selected' : ''}`}
                      style={{ background: c }}
                      onClick={() => set('bgColor', c)}
                    >
                      {form.bgColor === c && <Check size={12} />}
                    </button>
                  ))}
                </div>
                <label className="ch-color-picker-wrap" title="Pick custom colour">
                  <input
                    type="color"
                    className="ch-color-picker"
                    value={form.bgColor}
                    onChange={e => set('bgColor', e.target.value)}
                  />
                  <span className="ch-color-value">{form.bgColor}</span>
                </label>
              </div>
            </div>

            {/* Roles */}
            <div className="ch-group">
              <label className="ch-label"><Users size={13} /> Roles / Designations Needed</label>
              <div className="ch-pills">
                {ROLE_OPTIONS.map(role => (
                  <button
                    key={role}
                    type="button"
                    className={`ch-pill ${roles.includes(role) ? 'active' : ''}`}
                    onClick={() => toggleRole(role)}
                  >
                    {roles.includes(role) && <Check size={11} />} {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Image upload */}
            <div className="ch-group">
              <label className="ch-label"><ImageIcon size={13} /> Invitation / Banner Image</label>
              {imagePreview ? (
                <div className="ch-image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button type="button" className="ch-image-remove" onClick={removeImage}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="ch-upload-zone">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImage}
                  />
                  <Upload size={28} className="ch-upload-icon" />
                  <span className="ch-upload-text">Click to upload or drag & drop</span>
                  <span className="ch-upload-hint">PNG, JPG, WEBP — max 5 MB</span>
                </label>
              )}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="ch-progress-wrap">
                  <div className="ch-progress-bar" style={{ width: `${uploadProgress}%` }} />
                  <span>{uploadProgress}%</span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="ch-submit">
              {loading
                ? <><span className="ch-spinner" /> Publishing…</>
                : <><Rocket size={17} /> Publish Hackathon</>
              }
            </button>
          </form>
        </div>

        {/* ── RIGHT: LIVE PREVIEW ── */}
        <div className="ch-preview-col">
          <p className="ch-preview-label">Live Card Preview</p>
          <div className="ch-card-preview">
            <div className="ch-card-banner" style={{ background: previewBg }}>
              <div className="ch-card-shine" />
              <span className={`ch-mode-pill ${mode === 'Online' ? 'online' : 'offline'}`}>
                {mode === 'Online' ? <Wifi size={11} /> : <WifiOff size={11} />} {mode}
              </span>
              {imagePreview && <img src={imagePreview} className="ch-banner-img" alt="banner" />}
              <h3 className="ch-card-title">{form.title || 'Your Hackathon Title'}</h3>
            </div>
            <div className="ch-card-body">
              <p className="ch-card-desc">
                {form.description || 'Your description will appear here…'}
              </p>
              <div className="ch-card-meta-row">
                {form.prizePool && (
                  <div className="ch-card-meta-block">
                    <span className="ch-meta-label">PRIZE</span>
                    <span className="ch-meta-val prize">{form.prizePool}</span>
                  </div>
                )}
                {form.deadline && (
                  <div className="ch-card-meta-block">
                    <span className="ch-meta-label">DEADLINE</span>
                    <span className="ch-meta-val">
                      {new Date(form.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>
              {roles.length > 0 && (
                <div className="ch-card-roles">
                  {roles.slice(0, 4).map(r => <span key={r} className="ch-card-role">{r}</span>)}
                  {roles.length > 4 && <span className="ch-card-role">+{roles.length - 4}</span>}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
