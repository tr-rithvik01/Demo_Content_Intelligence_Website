// app.jsx — App shell: routing, dark mode, theme persistence

const { useState, useEffect } = React;

function App() {
  // ── THEME ────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gs-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gs-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  // ── ROUTING ───────────────────────────────────────────────────────────────
  // Stack: each entry is { page, data }
  const [navStack, setNavStack] = useState([{ page: 'home', data: null }]);
  const current = navStack[navStack.length - 1];

  const navigate = (page, data = null) => {
    setNavStack(s => [...s, { page, data }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── TWEAKS ────────────────────────────────────────────────────────────────
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accentColor": "coral",
    "fontStyle": "sans",
    "cardRadius": "md",
    "showSocialProof": true
  }/*EDITMODE-END*/;

  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = useState(false);

  useEffect(() => {
    // Register tweaks availability
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (key, value) => {
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  };

  // Apply tweaks to CSS
  useEffect(() => {
    const root = document.documentElement;
    const accentMap = {
      coral:  ['oklch(0.565 0.175 32)',  'oklch(0.500 0.175 32)',  'oklch(0.945 0.038 32)'],
      teal:   ['oklch(0.505 0.135 190)', 'oklch(0.440 0.135 190)', 'oklch(0.935 0.030 190)'],
      violet: ['oklch(0.520 0.165 290)', 'oklch(0.455 0.165 290)', 'oklch(0.940 0.035 290)'],
      amber:  ['oklch(0.650 0.155 60)',  'oklch(0.585 0.155 60)',  'oklch(0.945 0.040 60)'],
    };
    const colors = accentMap[tweaks.accentColor] || accentMap.coral;
    root.style.setProperty('--accent',     colors[0]);
    root.style.setProperty('--accent-h',   colors[1]);
    root.style.setProperty('--accent-sub', colors[2]);

    const radMap = { sm: '6px', md: '8px', lg: '14px' };
    root.style.setProperty('--r', radMap[tweaks.cardRadius] || '8px');

    root.style.setProperty('--font-sans',
      tweaks.fontStyle === 'geometric'
        ? "'DM Sans', system-ui, sans-serif"
        : tweaks.fontStyle === 'humanist'
          ? "'Nunito Sans', system-ui, sans-serif"
          : "'Plus Jakarta Sans', system-ui, sans-serif"
    );
  }, [tweaks]);

  // ── RENDER ────────────────────────────────────────────────────────────────
  const renderPage = () => {
    const { page, data } = current;
    switch (page) {
      case 'home':      return <HomePage onNavigate={navigate} />;
      case 'blog':      return <BlogIndexPage onNavigate={navigate} />;
      case 'article':   return <ArticlePage article={data} onNavigate={navigate} />;
      case 'niche':     return <NicheHubPage niche={data} onNavigate={navigate} />;
      case 'resources': return <ResourcesPage onNavigate={navigate} />;
      case 'about':     return <AboutPage onNavigate={navigate} />;
      case 'contact':   return <ContactPage onNavigate={navigate} />;
      default:          return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div>
      <NavBar currentPage={current.page} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      {renderPage()}
      <Footer onNavigate={navigate} />

      {/* Back button (when not on home) */}
      {navStack.length > 1 && (
        <button
          onClick={() => { setNavStack(s => s.slice(0, -1)); window.scrollTo({ top: 0 }); }}
          style={{
            position: 'fixed', bottom: 24, left: 24, zIndex: 500,
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)', padding: '10px 18px',
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--text-2)',
            boxShadow: 'var(--sh-md)', cursor: 'pointer',
            transition: 'all var(--tr)',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.borderColor = 'var(--border-s)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          aria-label="Go back"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>
      )}

      {/* Tweaks panel */}
      {tweaksVisible && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-xl)', padding: '20px', width: 260,
          boxShadow: 'var(--sh-lg)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Tweaks</span>
            <button className="icon-btn" onClick={() => { setTweaksVisible(false); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }} aria-label="Close tweaks">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Accent color */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>Accent Color</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'coral',  bg: 'oklch(0.565 0.175 32)',  label: 'Coral' },
                { key: 'teal',   bg: 'oklch(0.505 0.135 190)', label: 'Teal' },
                { key: 'violet', bg: 'oklch(0.520 0.165 290)', label: 'Violet' },
                { key: 'amber',  bg: 'oklch(0.650 0.155 60)',  label: 'Amber' },
              ].map(c => (
                <button key={c.key} title={c.label} onClick={() => setTweak('accentColor', c.key)} style={{ width: 28, height: 28, borderRadius: '50%', background: c.bg, border: tweaks.accentColor === c.key ? '3px solid var(--text-1)' : '3px solid transparent', cursor: 'pointer', transition: 'border var(--tr)' }} aria-label={`Accent: ${c.label}`} aria-pressed={tweaks.accentColor === c.key}></button>
              ))}
            </div>
          </div>

          {/* Font style */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>Font Style</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['sans', 'Jakarta'], ['geometric', 'DM Sans'], ['humanist', 'Nunito']].map(([key, label]) => (
                <button key={key} onClick={() => setTweak('fontStyle', key)} className={`tag-filter${tweaks.fontStyle === key ? ' active' : ''}`} style={{ fontSize: 12, padding: '5px 10px' }}>{label}</button>
              ))}
            </div>
          </div>

          {/* Card radius */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>Card Radius</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['sm', 'Sharp'], ['md', 'Default'], ['lg', 'Rounded']].map(([key, label]) => (
                <button key={key} onClick={() => setTweak('cardRadius', key)} className={`tag-filter${tweaks.cardRadius === key ? ' active' : ''}`} style={{ fontSize: 12, padding: '5px 10px' }}>{label}</button>
              ))}
            </div>
          </div>

          {/* Dark mode toggle */}
          <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Dark mode</span>
            <button
              onClick={toggleTheme}
              style={{
                width: 44, height: 24, borderRadius: 12,
                background: theme === 'dark' ? 'var(--accent)' : 'var(--border)',
                border: 'none', cursor: 'pointer', position: 'relative',
                transition: 'background var(--tr)',
              }}
              role="switch" aria-checked={theme === 'dark'} aria-label="Toggle dark mode"
            >
              <div style={{
                width: 18, height: 18, borderRadius: '50%', background: 'white',
                position: 'absolute', top: 3,
                left: theme === 'dark' ? 23 : 3,
                transition: 'left var(--tr)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}></div>
            </button>
          </div>

          {/* Quick nav */}
          <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)', marginTop: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>Quick Navigate</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {[['home','Home'],['blog','Blog'],['article','Article'],['resources','Resources'],['about','About'],['contact','Contact'],['niche','Niche Hub']].map(([pg, label]) => (
                <button key={pg} onClick={() => { navigate(pg, pg === 'article' ? ARTICLES[0] : pg === 'niche' ? NICHES[0] : null); }} className="tag-filter" style={{ fontSize: 11, padding: '4px 9px' }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
