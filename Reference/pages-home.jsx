// pages-home.jsx — HomePage with animated hero canvas

const { useState, useEffect, useRef } = React;

function HomePage({ onNavigate }) {
  return (
    <main id="main-content" className="page-enter">
      <HeroSection onNavigate={onNavigate} />
      <ProofStrip />
      <NichesSection onNavigate={onNavigate} />
      <IndustriesSection onNavigate={onNavigate} />
      <FeaturedSection onNavigate={onNavigate} />
      <RecentArticlesSection onNavigate={onNavigate} />
      <ResourceHighlightsSection onNavigate={onNavigate} />
      <div className="section"><div className="container"><NewsletterSignup /></div></div>
    </main>
  );
}

// ── HERO CANVAS ───────────────────────────────────────────────────────────────

function HeroCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = { x: -1, y: -1 }; };
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);

    // ── Sigmoid ──────────────────────────────────────────────────────────────
    // Returns y in canvas coords for normalized x in [0,1]
    function sigmoid(x, center, steepness) {
      return 1 / (1 + Math.exp(-steepness * (x - center)));
    }

    // Build polyline points for a curve
    function buildCurve(w, h, center, steepness, yScale, yOffset, mouseInfluence) {
      const pts = [];
      const steps = 120;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasM = mx >= 0;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        let s = sigmoid(t, center, steepness);
        // Map sigmoid [0,1] → canvas y: bottom to top
        let y = h - (s * h * yScale + h * yOffset);

        // Mouse deformation: gaussian bump around mouse x
        if (hasM) {
          const tx = t * w;
          const dist = (tx - mx) / w;
          const bump = Math.exp(-(dist * dist) / 0.006) * mouseInfluence;
          // Pull curve toward mouse y
          const targetY = my;
          y = y + (targetY - y) * bump * 0.35;
        }

        pts.push({ x: t * w, y });
      }
      return pts;
    }

    // Draw smooth curve through points
    function drawCurve(pts, color, lineWidth, glowColor, glowBlur, alpha) {
      if (pts.length < 2) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (glowBlur > 0) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowBlur;
      }
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const cx = (pts[i].x + pts[i + 1].x) / 2;
        const cy = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, cx, cy);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
      ctx.restore();
    }

    // ── Particles ─────────────────────────────────────────────────────────────
    const NUM_PARTICLES = 18;
    const particles = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      t: i / NUM_PARTICLES,          // position along curve [0,1]
      speed: 0.0008 + Math.random() * 0.0006,
      size: 2 + Math.random() * 2,
      alpha: 0.4 + Math.random() * 0.5,
      trail: [],
    }));

    // ── Grid ──────────────────────────────────────────────────────────────────
    function drawGrid(w, h) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x <= w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.restore();
    }

    // ── Main loop ─────────────────────────────────────────────────────────────
    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) { animRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);
      const t = timeRef.current;

      drawGrid(w, h);

      // Animated center: slow drift
      const center1 = 0.42 + Math.sin(t * 0.4) * 0.03;
      const center2 = 0.48 + Math.sin(t * 0.3 + 1) * 0.025;
      const center3 = 0.38 + Math.sin(t * 0.25 + 2) * 0.02;

      // Build curves
      const pts1 = buildCurve(w, h, center1, 9, 0.80, 0.08, 1.2);   // coral — primary
      const pts2 = buildCurve(w, h, center2, 7, 0.70, 0.12, 0.6);   // teal — secondary
      const pts3 = buildCurve(w, h, center3, 11, 0.65, 0.16, 0.3);  // white — tertiary

      // Draw back-to-front
      drawCurve(pts3, 'rgba(255,255,255,0.9)', 1.2, '', 0, 0.10);
      drawCurve(pts2, '#2aaa8a', 1.8, '#2aaa8a', 10, 0.35);
      drawCurve(pts1, '#e05a35', 2.5, '#e05a35', 20, 0.90);          // glow pass
      drawCurve(pts1, '#ff8060', 1.2, '', 0, 0.40);                  // bright highlight on top

      // Particles along primary curve
      particles.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        // Find closest point on curve
        const idx = Math.min(Math.floor(p.t * (pts1.length - 1)), pts1.length - 2);
        const frac = p.t * (pts1.length - 1) - idx;
        const px = pts1[idx].x + (pts1[idx + 1].x - pts1[idx].x) * frac;
        const py = pts1[idx].y + (pts1[idx + 1].y - pts1[idx].y) * frac;

        // Trail
        p.trail.push({ x: px, y: py });
        if (p.trail.length > 12) p.trail.shift();

        // Draw trail
        ctx.save();
        for (let j = 1; j < p.trail.length; j++) {
          const a = (j / p.trail.length) * p.alpha * 0.5;
          ctx.globalAlpha = a;
          ctx.strokeStyle = '#e05a35';
          ctx.lineWidth = p.size * (j / p.trail.length);
          ctx.shadowColor = '#e05a35';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.moveTo(p.trail[j - 1].x, p.trail[j - 1].y);
          ctx.lineTo(p.trail[j].x, p.trail[j].y);
          ctx.stroke();
        }
        ctx.restore();

        // Draw dot
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#ff8060';
        ctx.shadowColor = '#e05a35';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Axis labels — subtle
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.font = '500 10px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.textAlign = 'left';
      ['Revenue', 'Pipeline', 'Velocity'].forEach((label, i) => {
        ctx.globalAlpha = 0.18 + i * 0.04;
        ctx.fillText(label, 8, 18 + i * 16);
      });
      ctx.restore();

      timeRef.current += 0.012;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }}
      aria-hidden="true"
    />
  );
}

// ── HERO EMAIL FORM ───────────────────────────────────────────────────────────

function HeroEmailForm() {
  const [email, setEmail] = React.useState('');
  const [state, setState] = React.useState('idle'); // idle | loading | done
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('loading');
    setTimeout(() => setState('done'), 1400);
  };
  if (state === 'done') return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'oklch(0.52 0.14 155)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'oklch(0.85 0.04 90)' }}>You're in! First issue lands Tuesday.</span>
    </div>
  );
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{ flex: 1, padding: '10px 14px', borderRadius: 'var(--r)', border: '1px solid oklch(0.32 0.06 258)', background: 'oklch(0.165 0.010 258)', color: 'oklch(0.92 0.005 90)', fontSize: 14, outline: 'none', transition: 'border-color var(--tr)' }}
        onFocus={e => e.target.style.borderColor = 'oklch(0.565 0.175 32)'}
        onBlur={e => e.target.style.borderColor = 'oklch(0.32 0.06 258)'}
        aria-label="Email address"
      />
      <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap', padding: '10px 18px' }} disabled={state === 'loading'}>
        {state === 'loading' ? <span className="spinner"></span> : 'Subscribe free'}
      </button>
    </form>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function HeroSection({ onNavigate }) {
  return (
    <section className="hero hero-dark" style={{ borderBottom: '1px solid oklch(0.22 0.05 258)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
          alignItems: 'stretch',
          minHeight: 420,
        }}>
          {/* Left: text */}
          <div style={{ paddingRight: 48, paddingBottom: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="hero-eyebrow">Growth Marketing Intelligence</div>
            <h1 className="hero-title">
              Marketing intelligence<br />
              for people who <em>measure everything.</em>
            </h1>
            <p className="hero-sub">
              Actionable guides, frameworks, and data across 8 growth channels and 8 industries. Written by practitioners. Validated by results.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => onNavigate('blog')}>
                Explore all guides
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('resources')}>
                Free resources
              </button>
            </div>

            {/* Email subscription */}
            <div style={{ marginTop: 32, padding: '20px 24px', background: 'oklch(0.20 0.055 258)', borderRadius: 'var(--r-lg)', border: '1px solid oklch(0.28 0.06 258)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'oklch(0.65 0.08 90)', marginBottom: 6 }}>Weekly GTM Intelligence</div>
              <p style={{ fontSize: 14, color: 'oklch(0.68 0.04 258)', lineHeight: 1.5, marginBottom: 14 }}>
                Join <strong style={{ color: 'oklch(0.85 0.04 90)' }}>14,200+ marketers</strong> who get actionable channel insights, data breakdowns, and practitioner playbooks every Tuesday. No fluff.
              </p>
              <HeroEmailForm />
            </div>
          </div>

          {/* Right: canvas */}
          <div style={{
            position: 'relative',
            borderLeft: '1px solid oklch(0.22 0.05 258)',
            height: 480,
            overflow: 'hidden',
          }}>
            <HeroCanvas />
          </div>
        </div>

        {/* Stats strip */}
        <div className="hero-stats" style={{ borderTopColor: 'oklch(0.24 0.05 258)' }}>
          {[
            ['400+', 'In-depth guides published'],
            ['14,200+', 'Marketers read us weekly'],
            ['8', 'Growth channels covered'],
            ['200+', 'Site audits behind our advice'],
          ].map(([val, label]) => (
            <div key={label} className="hero-stat">
              <div className="hero-stat-val">{val}</div>
              <div className="hero-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROOF STRIP ───────────────────────────────────────────────────────────────

function ProofStrip() {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)', padding: '18px 0' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 28, overflow: 'hidden' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-3)', whiteSpace: 'nowrap', flexShrink: 0 }}>Referenced by</span>
        <div style={{ display: 'flex', gap: 28, overflow: 'hidden' }}>
          {['Search Engine Journal', 'Marketing Land', 'HubSpot Blog', 'Moz', 'Search Engine Roundtable', 'Content Marketing Institute'].map(name => (
            <div key={name} style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>{name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CHANNEL TAGLINES ──────────────────────────────────────────────────────────
const CHANNEL_TAGLINES = {
  seo:       'Rank, crawl, convert. The full technical stack.',
  ppc:       'Spend less. Win more auctions. Prove ROI.',
  social:    'Algorithms, audiences, and engagement loops.',
  local:     'Own the map. Win the neighbourhood.',
  analytics: 'Turn data into decisions that move numbers.',
  content:   'Build the content engine that compounds.',
  email:     'Deliverability, copy, and automation at scale.',
  cro:       'Test everything. Keep what wins.',
};

// ── NICHES SECTION ────────────────────────────────────────────────────────────

function NichesSection({ onNavigate }) {
  // Layout: 4-col grid, asymmetric spans
  // Row 1: SEO(2) PPC(1) Social(1)
  // Row 2: Local(1) Analytics(1) Content(2)
  // Row 3: Email(2) CRO(2)
  const layout = [
    { ...NICHES[0], colSpan: 2 }, // SEO
    { ...NICHES[1], colSpan: 1 }, // PPC
    { ...NICHES[2], colSpan: 1 }, // Social
    { ...NICHES[3], colSpan: 1 }, // Local
    { ...NICHES[4], colSpan: 1 }, // Analytics
    { ...NICHES[5], colSpan: 2 }, // Content
    { ...NICHES[6], colSpan: 2 }, // Email
    { ...NICHES[7], colSpan: 2 }, // CRO
  ];

  return (
    <section style={{ padding: '88px 0 96px', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <AppearSection>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
            <div style={{ maxWidth: 520 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--accent-sub)', color: 'var(--accent)', padding: '4px 12px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 16 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M5 3v2l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Browse by Channel
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-0.038em', lineHeight: 1.08, marginBottom: 16 }}>
                Every growth channel,<br/><em style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>covered in depth.</em>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6 }}>8 channels. 250+ guides. Written by practitioners who've done the work.</p>
            </div>
            <button className="btn btn-secondary" onClick={() => onNavigate('blog')} style={{ flexShrink: 0 }}>
              View all guides
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {layout.map(n => (
              <ChannelTile key={n.id} niche={n} colSpan={n.colSpan} onNavigate={onNavigate} />
            ))}
          </div>
        </AppearSection>
      </div>
    </section>
  );
}

function ChannelTile({ niche, colSpan, onNavigate }) {
  const [hovered, setHovered] = React.useState(false);
  const isFeatured = colSpan === 2;
  const tagline = CHANNEL_TAGLINES[niche.id] || '';

  return (
    <div
      onClick={() => onNavigate('niche', niche)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${colSpan}`,
        borderRadius: 'var(--r-lg)',
        border: `1px solid ${hovered ? 'var(--border-s)' : 'var(--border)'}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 200ms ease-out',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--sh-md)' : 'none',
        background: 'var(--bg)',
      }}
      role="button" tabIndex={0}
    >
      {/* Illustration area */}
      <div style={{ height: isFeatured ? 160 : 120, overflow: 'hidden', position: 'relative' }}>
        <ChannelImage niche={niche.id} />
        {/* Overlay gradient at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: `linear-gradient(to bottom, transparent, ${niche.bg})`, pointerEvents: 'none' }}></div>
      </div>

      {/* Info footer */}
      <div style={{ padding: isFeatured ? '16px 20px 18px' : '12px 16px 14px', background: niche.bg, borderTop: `1px solid ${niche.bg}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: isFeatured ? 22 : 18, height: isFeatured ? 22 : 18, borderRadius: 5, background: niche.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: isFeatured ? 8 : 7, fontWeight: 800, color: 'white', letterSpacing: '0.02em' }}>{niche.abbr}</span>
              </div>
              <span style={{ fontSize: isFeatured ? 16 : 14, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>{niche.name}</span>
            </div>
            {isFeatured && <p style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 0, maxWidth: 320 }}>{tagline}</p>}
            {!isFeatured && <p style={{ fontSize: 11.5, color: 'var(--text-3)', lineHeight: 1.4, marginBottom: 0 }}>{tagline}</p>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)' }}>{niche.count}</span>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: hovered ? niche.color : 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 200ms' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke={hovered ? 'white' : 'var(--text-3)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── INDUSTRIES SECTION ────────────────────────────────────────────────────────

const IND_META = {
  saas:         { tagline: 'Pipeline velocity for recurring revenue',   color: 'oklch(0.35 0.09 250)', bg: 'oklch(0.92 0.03 250)' },
  ecommerce:    { tagline: 'Acquisition, retention, and cart recovery', color: 'oklch(0.38 0.10 160)', bg: 'oklch(0.93 0.04 160)' },
  realestate:   { tagline: 'Local intent and listing authority',        color: 'oklch(0.42 0.10 50)',  bg: 'oklch(0.94 0.03 50)'  },
  healthcare:   { tagline: 'Compliant growth for regulated verticals',  color: 'oklch(0.40 0.10 195)', bg: 'oklch(0.93 0.03 195)' },
  fintech:      { tagline: 'Trust, conversion, and CAC discipline',     color: 'oklch(0.40 0.12 220)', bg: 'oklch(0.92 0.03 220)' },
  logistics:    { tagline: 'B2B demand generation that moves freight',  color: 'oklch(0.38 0.08 30)',  bg: 'oklch(0.94 0.02 30)'  },
  professional: { tagline: 'Reputation-led growth and referral loops',  color: 'oklch(0.40 0.12 290)', bg: 'oklch(0.93 0.03 290)' },
  hospitality:  { tagline: 'Direct bookings over OTA dependency',       color: 'oklch(0.42 0.12 55)',  bg: 'oklch(0.94 0.03 55)'  },
};

function IndustriesSection({ onNavigate }) {
  return (
    <section style={{ padding: '88px 0 96px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <AppearSection>
          <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 64, alignItems: 'center' }}>
            {/* Left: editorial column */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'oklch(0.90 0.04 250)', color: 'oklch(0.35 0.09 250)', padding: '4px 12px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 20 }}>
                Browse by Industry
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.036em', lineHeight: 1.10, marginBottom: 16 }}>
                Tactics built<br/>for <em style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>your</em> vertical.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 32 }}>
                Generic marketing advice ignores the constraints of your industry — regulatory, seasonal, competitive. We don't.
              </p>
              {/* Mini stat strip */}
              <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)', paddingTop: 24, marginBottom: 32 }}>
                {[['8', 'Industries'], ['200+', 'Vertical guides'], ['12', 'Practitioners']].map(([val, lbl], i) => (
                  <div key={lbl} style={{ flex: 1, paddingRight: i < 2 ? 16 : 0, paddingLeft: i > 0 ? 16 : 0, borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-1)', marginBottom: 2 }}>{val}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{lbl}</div>
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary" onClick={() => onNavigate('blog')} style={{ width: '100%', justifyContent: 'center' }}>
                Browse all industries →
              </button>
            </div>

            {/* Right: industry cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {INDUSTRIES.map(ind => {
                const meta = IND_META[ind.id] || { tagline: '', color: 'var(--text-2)', bg: 'var(--bg-2)' };
                return (
                  <IndustryCard key={ind.id} ind={ind} meta={meta} onNavigate={onNavigate} />
                );
              })}
            </div>
          </div>
        </AppearSection>
      </div>
    </section>
  );
}

function IndustryCard({ ind, meta, onNavigate }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={() => onNavigate('niche', ind)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '18px 20px',
        borderRadius: 'var(--r-lg)',
        border: `1px solid ${hovered ? 'var(--border-s)' : 'var(--border)'}`,
        background: hovered ? meta.bg : 'var(--bg)',
        cursor: 'pointer',
        transition: 'all 180ms ease-out',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? 'var(--sh-sm)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 'var(--r)', background: meta.bg, border: `1px solid ${meta.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, transition: 'transform 180ms' }}>
          {INDUSTRY_ICONS[ind.id] || '🏢'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>{ind.name}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: hovered ? meta.color : 'var(--text-3)', transition: 'color 180ms' }}>{ind.count}</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.45, margin: 0 }}>{meta.tagline}</p>
        </div>
      </div>
      {hovered && (
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${meta.color}22`, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: meta.color }}>
          View {ind.count} guides
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}
    </div>
  );
}

// ── FEATURED ARTICLE ──────────────────────────────────────────────────────────

function FeaturedSection({ onNavigate }) {
  return (
    <section className="section">
      <div className="container">
        <AppearSection>
          <div className="section-header">
            <div className="section-eyebrow">Cornerstone Content</div>
            <h2 className="section-title">Start with the fundamentals.</h2>
          </div>
          <ArticleCardFeatured article={ARTICLES[0]} onClick={a => onNavigate('article', a)} />
        </AppearSection>
      </div>
    </section>
  );
}

// ── RECENT ARTICLES ───────────────────────────────────────────────────────────

function RecentArticlesSection({ onNavigate }) {
  return (
    <section className="section section-alt">
      <div className="container">
        <AppearSection>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div className="section-eyebrow">Latest Guides</div>
              <h2 className="section-title">What we published this month.</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => onNavigate('blog')}>See all articles →</button>
          </div>
          <div className="grid-3">
            {ARTICLES.slice(1, 7).map(a => (
              <ArticleCard key={a.id} article={a} onClick={art => onNavigate('article', art)} />
            ))}
          </div>
        </AppearSection>
      </div>
    </section>
  );
}

// ── RESOURCE HIGHLIGHTS ───────────────────────────────────────────────────────

function ResourceHighlightsSection({ onNavigate }) {
  return (
    <section className="section">
      <div className="container">
        <AppearSection>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div className="section-eyebrow">Free Resources</div>
              <h2 className="section-title">Templates and tools, no email required.</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => onNavigate('resources')}>View all resources →</button>
          </div>
          <div className="grid-3">
            {RESOURCES.slice(0, 3).map(r => <ResourceCard key={r.id} resource={r} />)}
          </div>
        </AppearSection>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage });
