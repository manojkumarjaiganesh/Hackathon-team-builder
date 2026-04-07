import { Link } from 'react-router-dom';

const STEPS = [
  {
    num: 1,
    numBg: '#2563eb',
    title: 'Discover Projects',
    desc: 'Browse and find exciting hackathons that match your skills and interests.',
    btnLabel: 'Browse Hackathons',
    btnBg: '#2563eb',
    btnLink: '/projects',
    illBg: '#eff6ff',
    illustration: (
      <svg width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="90" height="70" rx="8" fill="#bfdbfe"/>
        <rect x="25" y="26" width="80" height="50" rx="4" fill="#1e3a8a"/>
        <rect x="30" y="32" width="50" height="4" rx="2" fill="#60a5fa"/>
        <rect x="30" y="40" width="40" height="3" rx="2" fill="#93c5fd" opacity="0.7"/>
        <rect x="30" y="47" width="45" height="3" rx="2" fill="#93c5fd" opacity="0.7"/>
        <rect x="30" y="54" width="35" height="3" rx="2" fill="#93c5fd" opacity="0.5"/>
        <rect x="80" y="34" width="20" height="16" rx="3" fill="#f97316" opacity="0.8"/>
        <text x="86" y="45" fontSize="9" fill="#fff" fontWeight="bold">AI</text>
        <ellipse cx="150" cy="55" rx="22" ry="28" fill="#fde68a"/>
        <circle cx="150" cy="42" r="10" fill="#f59e0b"/>
        <rect x="138" y="58" width="24" height="30" rx="5" fill="#7c3aed"/>
        <rect x="130" y="68" width="12" height="24" rx="5" fill="#7c3aed"/>
        <rect x="150" y="68" width="12" height="24" rx="5" fill="#7c3aed"/>
        <rect x="40" y="88" width="16" height="20" rx="3" fill="#93c5fd"/>
        <rect x="60" y="82" width="16" height="26" rx="3" fill="#60a5fa"/>
        <rect x="80" y="78" width="16" height="30" rx="3" fill="#3b82f6"/>
      </svg>
    ),
  },
  {
    num: 2,
    numBg: '#0d9488',
    title: 'Join or Create Teams',
    desc: 'Team up with like-minded innovators or create your own team.',
    btnLabel: 'Find Teammates',
    btnBg: '#0d9488',
    btnLink: '/register',
    illBg: '#f0fdf4',
    illustration: (
      <svg width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="45" r="14" fill="#fcd34d"/>
        <rect x="58" y="58" width="24" height="30" rx="5" fill="#f97316"/>
        <circle cx="100" cy="38" r="14" fill="#c4b5fd"/>
        <rect x="88" y="51" width="24" height="30" rx="5" fill="#7c3aed"/>
        <circle cx="130" cy="45" r="14" fill="#86efac"/>
        <rect x="118" y="58" width="24" height="30" rx="5" fill="#16a34a"/>
        <line x1="84" y1="45" x2="96" y2="42" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3,2"/>
        <line x1="114" y1="42" x2="126" y2="45" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3,2"/>
        <rect x="148" y="30" width="28" height="28" rx="6" fill="#d1fae5"/>
        <path d="M156 44l4 4 8-8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <rect x="148" y="64" width="28" height="20" rx="5" fill="#ecfdf5"/>
        <rect x="152" y="68" width="20" height="2.5" rx="1.5" fill="#34d399"/>
        <rect x="152" y="73" width="14" height="2.5" rx="1.5" fill="#6ee7b7"/>
      </svg>
    ),
  },
  {
    num: 3,
    numBg: '#f97316',
    title: 'Compete & Win',
    desc: 'Collaborate on your project, submit it, and compete for prizes.',
    btnLabel: 'Start Competing',
    btnBg: '#f97316',
    btnLink: '/create-project',
    illBg: '#fff7ed',
    illustration: (
      <svg width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="50" r="16" fill="#fde68a"/>
        <rect x="62" y="64" width="26" height="32" rx="5" fill="#3b82f6"/>
        <circle cx="125" cy="48" r="16" fill="#fca5a5"/>
        <rect x="112" y="62" width="26" height="32" rx="5" fill="#f97316"/>
        <path d="M91 56 Q100 46 109 56" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <rect x="148" y="22" width="26" height="32" rx="4" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1"/>
        <text x="155" y="42" fontSize="16">💡</text>
        <rect x="30" y="35" width="18" height="24" rx="3" fill="#e0e7ff"/>
        <rect x="32" y="38" width="14" height="3" rx="1" fill="#818cf8"/>
        <rect x="32" y="44" width="10" height="3" rx="1" fill="#a5b4fc"/>
        <rect x="32" y="50" width="12" height="3" rx="1" fill="#a5b4fc"/>
        <circle cx="155" cy="82" r="8" fill="#fbbf24"/>
        <path d="M151 82l3 3 6-6" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <div style={{ background: '#eef2f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #1a2a6c 0%, #1e40af 100%)',
        padding: '52px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', right: 60, top: 20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', right: 20, top: 60, width: 60,  height: 60,  borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 700, marginBottom: 12, position: 'relative' }}>
          How It Works
        </h1>
        <p style={{ color: '#bfdbfe', fontSize: 14, maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          Get started in just 3 simple steps to form your hackathon team and compete.
        </p>
      </section>

      {/* BODY */}
      <div style={{ padding: '40px 40px 20px' }}>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#374151', fontWeight: 500, marginBottom: 28 }}>
          Ready to join exciting hackathons and form the perfect team? Just follow these steps:
        </p>

        {/* STEP CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20, marginBottom: 36 }}>
          {STEPS.map(step => (
            <div key={step.num} style={{
              background: '#fff', borderRadius: 14,
              border: '1px solid #e2e8f0', padding: '24px 22px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: step.numBg, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0
                }}>{step.num}</div>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{step.title}</span>
              </div>

              {/* Top desc */}
              <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>
                {step.desc}
              </p>

              {/* Illustration */}
              <div style={{
                width: '100%', height: 130, borderRadius: 10,
                background: step.illBg, marginBottom: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
              }}>
                {step.illustration}
              </div>

              {/* Bottom desc */}
              <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, marginBottom: 18 }}>
                {step.desc}
              </p>

              {/* Button */}
              <Link to={step.btnLink} style={{
                display: 'block', width: '100%', background: step.btnBg,
                color: '#fff', border: 'none', borderRadius: 7,
                padding: '10px 0', fontSize: 13, fontWeight: 600,
                textAlign: 'center', textDecoration: 'none', cursor: 'pointer'
              }}>
                {step.btnLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, #1a2a6c, #1e40af)',
          borderRadius: 14, padding: '36px 40px',
          textAlign: 'center', marginBottom: 40
        }}>
          <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
            Join Now and start building your hackathon dream team today!
          </h2>
          <Link to="/register" style={{
            display: 'inline-block', background: '#f97316',
            color: '#fff', border: 'none', borderRadius: 8,
            padding: '12px 40px', fontSize: 14, fontWeight: 700,
            textDecoration: 'none', cursor: 'pointer'
          }}>
            Join Now
          </Link>
        </div>
      </div>

    </div>
  );
}