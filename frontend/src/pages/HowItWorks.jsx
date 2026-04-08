import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './HowItWorks.css';

const STEPS = [
  {
    id: 'step-1',
    num: 1,
    numBg: '#2563eb',
    title: 'Discover Projects',
    desc: 'Browse and find exciting hackathons that match your skills and interests. From AI to Blockchain, there is something for everyone who wants to build the future.',
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
    id: 'step-2',
    num: 2,
    numBg: '#0d9488',
    title: 'Join or Create Teams',
    desc: 'Team up with like-minded innovators or create your own team. Collaborate, share ideas, and build the future together. Finding the right talent has never been easier.',
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
    id: 'step-3',
    num: 3,
    numBg: '#f97316',
    title: 'Compete & Win',
    desc: 'Collaborate on your project, submit it, and compete for amazing prizes and recognition from industry leaders. Turn your hackathon project into a real startup.',
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

const SECTIONS = ['hero', 'step-1', 'step-2', 'step-3', 'cta'];

export default function HowItWorks() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling) return;

      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      const index = Math.round(scrollTop / height);
      
      if (SECTIONS[index]) {
        setActiveSection(SECTIONS[index]);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  const scrollTo = (id) => {
    const index = SECTIONS.indexOf(id);
    if (index === -1) return;

    setIsScrolling(true);
    setActiveSection(id);
    
    containerRef.current.scrollTo({
      top: index * containerRef.current.clientHeight,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // Wait for scroll animation to complete
  };

  return (
    <div className="how-it-works-container" ref={containerRef}>
      {/* SIDE DOTS */}
      <div className="section-dots">
        {SECTIONS.map(id => (
          <div 
            key={id} 
            className={`dot ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollTo(id)}
          />
        ))}
      </div>

      {/* HERO SECTION */}
      <section className="snap-section how-hero" id="hero">
        <div className="how-hero-content">
          <span className="how-hero-tag">The Journey</span>
          <h1>How <span>It Works</span></h1>
          <p>
            Get started in just 3 simple steps to form your hackathon dream team and build something extraordinary.
          </p>
        </div>
      </section>

      {/* STEPS SECTIONS */}
      {STEPS.map(step => (
        <section key={step.id} className="snap-section step-section" id={step.id}>
          <div className="step-content">
            <div className="step-text">
              <div className="step-badge" style={{ background: step.numBg }}>
                {step.num}
              </div>
              <h2 className="step-title">{step.title}</h2>
              <p className="step-desc">{step.desc}</p>
              <Link to={step.btnLink} className="step-btn" style={{ background: step.btnBg }}>
                {step.btnLabel}
              </Link>
            </div>
            <div className="step-visual">
              <div className="step-illustration" style={{ background: step.illBg }}>
                {step.illustration}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA SECTION */}
      <section className="snap-section cta-banner" id="cta">
        <div className="cta-content">
          <h2>Ready to Build the Future with Your Dream Team?</h2>
          <Link to="/register" className="cta-btn">
            Join the Community
          </Link>
        </div>
      </section>
    </div>
  );
}