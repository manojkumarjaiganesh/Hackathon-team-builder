import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Home.css";
import heroImage from "../assets/hero_illustration.png";

export default function Home() {
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
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-wrap">
      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="ticker-item">
              <span>🚀 10,000+ Hackers</span>
              <span>🏆 $2.5M Prize Pools</span>
              <span>🌎 Global Community</span>
              <span>💻 500+ Projects Built</span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-text">
          <div className="home-hero-tag reveal" ref={addToRefs}>
            <span className="dot"></span>
            Next-Gen Hackathon Platform
          </div>
          <h1 className="reveal" ref={addToRefs}>
            The Operating System for <span className="glow-text">Innovation.</span>
          </h1>
          <p className="reveal" ref={addToRefs}>
            Connect with the world's most elite developers, designers, and visionaries. Build projects that matter. Move at the speed of thought.
          </p>
          <div className="home-hero-btns reveal" ref={addToRefs}>
            <Link to="/register" className="btn-ultra btn-primary-ultra">
              Get Started for Free
            </Link>
            <Link to="/projects" className="btn-ultra btn-secondary-ultra">
              View Hackathons
            </Link>
          </div>
        </div>

        <div className="hero-mockup-container reveal" ref={addToRefs}>
          <img src={heroImage} alt="Hackathon Hero" className="hero-image" />
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item reveal" ref={addToRefs}>
          <span className="stat-value">50k+</span>
          <span className="stat-label">Active Users</span>
        </div>
        <div className="stat-item reveal" ref={addToRefs} style={{ transitionDelay: '0.1s' }}>
          <span className="stat-value">120+</span>
          <span className="stat-label">Countries</span>
        </div>
        <div className="stat-item reveal" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
          <span className="stat-value">$10M+</span>
          <span className="stat-label">Total Prizes</span>
        </div>
        <div className="stat-item reveal" ref={addToRefs} style={{ transitionDelay: '0.3s' }}>
          <span className="stat-value">95%</span>
          <span className="stat-label">Satisfaction</span>
        </div>
      </div>

      {/* BENTO GRID FEATURES */}
      <section className="features-section">
        <div className="section-header reveal" ref={addToRefs}>
          <h2>Engineered for Teams.</h2>
          <p>The total toolset for conquering any hackathon, from team formation to project submission.</p>
        </div>

        <div className="bento-grid">
          <div className="bento-item large reveal" ref={addToRefs}>
            <div className="bento-icon">🔍</div>
            <h3>Intelligent Team Matching</h3>
            <p>Our AI analyzes your skills, experience, and interests to find the perfect teammates for your next big idea.</p>
          </div>
          <div className="bento-item reveal" ref={addToRefs} style={{ transitionDelay: '0.1s' }}>
            <div className="bento-icon">🛡️</div>
            <h3>Verified Profiles</h3>
            <p>Connect with trust. Every developer and designer on our platform is verified for authenticity.</p>
          </div>
          <div className="bento-item tall reveal" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
            <div className="bento-icon">⚡</div>
            <h3>Real-time Collaboration</h3>
            <p>Built-in tools to share code, designs, and feedback seamlessly within your hackathon workspace.</p>
          </div>
          <div className="bento-item reveal" ref={addToRefs} style={{ transitionDelay: '0.3s' }}>
            <div className="bento-icon">🏆</div>
            <h3>Leaderboard Glory</h3>
            <p>Compete for the top spot. Track your project's progress relative to teams across the globe.</p>
          </div>
          <div className="bento-item reveal" ref={addToRefs} style={{ transitionDelay: '0.4s' }}>
            <div className="bento-icon">🚀</div>
            <h3>Project Launchpad</h3>
            <p>Submit your hack with one click and get visibility from global industry leaders and VC partners.</p>
          </div>
        </div>
      </section>

      {/* FEATURED HACKATHONS */}
      <section className="hackathon-section">
        <div className="section-header reveal" ref={addToRefs}>
          <h2>Opportunity Awaits.</h2>
          <p>Join world-class hackathons and turn your weekend project into the next unicorn.</p>
        </div>

        <div className="hackathon-grid">
          {[
            { title: "AI Forge 2026", prize: "$50,000", diff: "hard", grad: "linear-gradient(135deg, #1e3a8a, #2563eb)" },
            { title: "FinTech Sprint", prize: "$100,000", diff: "medium", grad: "linear-gradient(135deg, #064e3b, #059669)" },
            { title: "Quantum Hack", prize: "$12,000", diff: "insane", grad: "linear-gradient(135deg, #4c1d95, #7c3aed)" }
          ].map((hack, i) => (
            <div key={i} className="hack-card-ultra reveal" ref={addToRefs} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="hack-card-header" style={{ background: hack.grad }}>
                <span className="difficulty">{hack.diff}</span>
                <h3 className="hack-card-title">{hack.title}</h3>
              </div>
              <div className="hack-card-body">
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '24px' }}>
                  The premier competition for high-stakes innovation. Build the future in 48 hours.
                </p>
                <div className="hack-card-meta">
                  <div className="hack-prize">
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: '500' }}>PRIZE POOL</span>
                    {hack.prize}
                  </div>
                  <Link to="/projects" className="btn-apply-sm" style={{ textDecoration: 'none' }}>
                    View Challenge
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="home-hero" style={{ minHeight: '60vh', background: '#000' }}>
        <div className="home-hero-text">
          <h2 className="reveal" ref={addToRefs} style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '24px' }}>
            Built for those who <span className="glow-text">dare to create.</span>
          </h2>
          <div className="home-hero-btns reveal" ref={addToRefs}>
            <Link to="/register" className="btn-ultra btn-primary-ultra">
              Join the Elite
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
