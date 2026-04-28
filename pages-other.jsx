// pages-other.jsx — NicheHub, Resources, About, Contact

var { useState, useRef } = React;

// —— NICHE HUB PAGE ———————————————————————————————————————————————————————————

function NicheHubPage({ niche, onNavigate }) {
  const hub = niche || NICHES[0];
  const nicheArticles = ARTICLES.filter(a => a.niche === hub.name || a.industry === hub.name);
  const allArticles = nicheArticles.length > 0 ? nicheArticles : ARTICLES.slice(0, 4);
  const faqs = [
    { q: `What is ${hub.name} and why does it matter for business growth?`, a: `${hub.name} is one of the highest-leverage growth channels for businesses that want sustainable, compounding returns. Unlike paid channels that stop working when you stop spending, ${hub.name} builds durable assets that generate traffic, leads, and revenue over time.` },
    { q: `How long does it take to see results from ${hub.name}?`, a: 'Results depend on your starting point, competition, and execution consistency. Most businesses see meaningful movement within 3–6 months with consistent, high-quality work. Measuring leading indicators (rankings, CTR, engagement) is more useful than waiting for revenue attribution.' },
    { q: `What budget should I allocate to ${hub.name}?`, a: 'Budget varies wildly by industry and goal. The more useful question is: what does success look like in 12 months, and what would it be worth? Work backwards from there to set a realistic investment level that can actually produce those outcomes.' },
    { q: `Should I hire in-house or use an agency for ${hub.name}?`, a: 'In-house works best when you have a clear strategy and need consistent execution. Agencies work best when you need specialized expertise on demand or want to scale execution faster than hiring allows. Most mature marketing orgs use both.' },
  ];

  const resources = RESOURCES.slice(0, 3);

  return (
    <main id="main-content" className="page-enter">
      {/* Hero */}
      <div style={{ borderBottom: '1px solid var(--border)', background: hub.bg || 'var(--bg-2)', padding: '56px 0 48px' }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: 16 }}>
            <span className="breadcrumb-item" onClick={() => onNavigate('home')}>Home</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item">Channels</span>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: 'var(--text-1)' }}>{hub.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <div style={{ width: 60, height: 60, borderRadius: 14, background: hub.color || 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 16, letterSpacing: '0.02em' }}>{hub.abbr || hub.name.slice(0,2).toUpperCase()}</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: hub.color || 'var(--accent)', marginBottom: 4 }}>Marketing Channel</div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>{hub.name}</h1>
            </div>
          </div>
          <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: 640, lineHeight: 1.65, marginBottom: 24 }}>
            {hub.name} is one of the most impactful growth channels available to modern businesses. These guides cover everything from foundational tactics to advanced frameworks — all validated against real campaigns and real data.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[['Guides', `${hub.count || allArticles.length}`], ['Level', 'All levels'], ['Updated', '2026']].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: hub.color || 'var(--accent)' }}></div>
                <span style={{ color: 'var(--text-1)' }}>{val}</span> {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cornerstone guides */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Start Here</div>
            <h2 className="section-title">Pillar content for {hub.name}</h2>
            <p className="section-sub">These are the guides we recommend reading first. They establish the frameworks everything else builds on.</p>
          </div>
          {allArticles.length > 0 ? (
            <div className="grid-3">
              {allArticles.slice(0, 3).map(a => <ArticleCard key={a.id} article={a} onClick={art => onNavigate('article', art)} />)}
            </div>
          ) : (
            <div className="grid-3">
              {ARTICLES.slice(0, 3).map(a => <ArticleCard key={a.id} article={a} onClick={art => onNavigate('article', art)} />)}
            </div>
          )}
        </div>
      </section>

      {/* Sub-topic navigation */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Sub-topics</div>
            <h2 className="section-title">Navigate by focus area</h2>
          </div>
          <div className="grid-4">
            {['Getting Started', 'Strategy & Planning', 'Technical Implementation', 'Measurement & Analytics', 'Advanced Tactics', 'Case Studies', 'Tools & Software', 'Industry Applications'].map((topic, i) => (
              <div key={topic} className="niche-card" style={{ padding: '18px 16px' }}>
                <div style={{ width: 28, height: 28, borderRadius: 5, background: 'var(--bg-3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" fill="var(--text-3)"/><rect x="7" y="1" width="4" height="4" rx="1" fill="var(--text-3)"/><rect x="1" y="7" width="4" height="4" rx="1" fill="var(--text-3)"/><rect x="7" y="7" width="4" height="4" rx="1" fill="var(--border-s)"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{topic}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{3 + (i * 3 % 8)} articles</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div className="section-eyebrow">Latest</div>
              <h2 className="section-title">Recent {hub.name} guides</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => onNavigate('blog')}>View all →</button>
          </div>
          <div className="grid-3">
            {ARTICLES.slice(0, 6).map(a => <ArticleCard key={a.id} article={a} onClick={art => onNavigate('article', art)} />)}
          </div>
        </div>
      </section>

      {/* Tools & resources */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Free Resources</div>
            <h2 className="section-title">Tools and templates for {hub.name}</h2>
          </div>
          <div className="grid-3">
            {resources.map(r => <ResourceCard key={r.id} resource={r} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-sm">
          <div className="section-header">
            <div className="section-eyebrow">FAQ</div>
            <h2 className="section-title">Common questions about {hub.name}</h2>
          </div>
          <div>
            {faqs.map((f, i) => <FAQItem key={i} question={f.q} answer={f.a} />)}
          </div>
        </div>
      </section>

      <div className="section"><div className="container"><NewsletterSignup /></div></div>
    </main>
  );
}

// —— RESOURCES PAGE ———————————————————————————————————————————————————————————

function ResourcesPage() {
  const types = ['All', 'Template', 'Checklist', 'Guide'];
  const [activeType, setActiveType] = useState('All');

  const filtered = activeType === 'All' ? RESOURCES : RESOURCES.filter(r => r.type === activeType);

  return (
    <main id="main-content" className="page-enter">
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)', padding: '48px 0 36px' }}>
        <div className="container">
          <div className="section-eyebrow">Free Resources</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Templates and tools. No fluff, no gate.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 540, lineHeight: 1.6 }}>
            Every resource here is free to download. We believe in earning your trust with value before asking for anything in return.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px 80px' }}>
        {/* Filter */}
        <div className="filter-row" style={{ marginBottom: 28 }}>
          {types.map(t => (
            <button key={t} className={`tag-filter${activeType === t ? ' active' : ''}`} onClick={() => setActiveType(t)}>{t}</button>
          ))}
          <span style={{ fontSize: 13, color: 'var(--text-3)', marginLeft: 8 }}>{filtered.length} resources</span>
        </div>

        <div className="grid-3" style={{ marginBottom: 48 }}>
          {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>

        {/* Lead magnet banner */}
        <div style={{ background: 'var(--brand)', borderRadius: 'var(--r-xl)', padding: '36px 40px', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'oklch(0.70 0.06 90)', marginBottom: 8 }}>New Resource Pack</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 8, letterSpacing: '-0.03em' }}>The Complete Growth Marketing Audit Bundle</h2>
            <p style={{ fontSize: 14, color: 'oklch(0.80 0.04 90)', lineHeight: 1.6 }}>7 templates covering every major channel. SEO, PPC, email, content, CRO, analytics, and local search — in one download.</p>
          </div>
          <div>
            <button className="btn btn-lg" style={{ background: 'white', color: 'var(--brand)', fontWeight: 700 }}>Download Bundle Free</button>
          </div>
        </div>
      </div>
    </main>
  );
}

// —— ABOUT PAGE ———————————————————————————————————————————————————————————————

const TEAM = [
  { name: 'Maya Chen', role: 'Head of SEO & Co-founder', initials: 'MC', bio: 'Led SEO at two Series B startups. Ran 200+ technical audits. Formerly Search Analyst at Google.', expertise: ['Technical SEO', 'Content Strategy', 'Analytics'] },
  { name: 'Jordan Walsh', role: 'PPC Lead & Co-founder', initials: 'JW', bio: 'Managed $24M+ in Google and Meta ad spend. Ex-agency director. Obsessed with Quality Score mechanics and bidding strategy.', expertise: ['Google Ads', 'Meta Ads', 'LinkedIn Ads'] },
  { name: 'Sam Rivera', role: 'Content Strategist', initials: 'SR', bio: 'Former editor at a top 50 marketing publication. Built content programs from zero to 200k monthly sessions at three companies.', expertise: ['Content Strategy', 'Editorial', 'Distribution'] },
  { name: 'Priya Sharma', role: 'Email & CRM Lead', initials: 'PS', bio: 'Managed email programs for 8 e-commerce brands. Expert in deliverability, segmentation, and lifecycle automation.', expertise: ['Email Marketing', 'CRM', 'Automation'] },
];

function AboutPage() {
  return (
    <main id="main-content" className="page-enter">
      {/* Mission */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '64px 0 56px' }}>
        <div className="container-sm">
          <div className="section-eyebrow">Our Mission</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: 20 }}>
            We think most marketing content is<br />
            <span style={{ color: 'var(--accent)' }}>a waste of your time.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 16 }}>
            GTM Remixed exists because the internet is full of marketing content that teaches you marketing content exists, not how to actually grow a business. After running dozens of audits and campaigns, we started writing the resource we wished we'd had when we started.
          </p>
          <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.7 }}>
            Every guide we publish has to pass one test: would we have found this useful when we were doing the work? If not, we don't publish it.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="section section-alt">
        <div className="container">
          <div className="stats-row">
            {[['400+', 'Guides published'], ['14,200+', 'Weekly readers'], ['200+', 'Site audits completed'], ['$24M+', 'Ad spend managed']].map(([val, label]) => (
              <div key={label} className="stat-cell">
                <div className="stat-cell-val">{val}</div>
                <div className="stat-cell-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">The Team</div>
            <h2 className="section-title">Written by practitioners, not generalists.</h2>
            <p className="section-sub">Everyone who writes for GTM Remixed has run the plays they write about. We don't publish theory.</p>
          </div>
          <div className="grid-2" style={{ gap: 20 }}>
            {TEAM.map(member => (
              <div key={member.name} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '28px' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div className="author-bio-avatar" style={{ width: 52, height: 52, fontSize: 18 }}>{member.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{member.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{member.role}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 14 }}>{member.bio}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {member.expertise.map(e => <TagBadge key={e} label={e} color="neutral" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial standards */}
      <section className="section section-alt">
        <div className="container-sm">
          <div className="section-header">
            <div className="section-eyebrow">Editorial Standards</div>
            <h2 className="section-title">How we decide what to publish.</h2>
          </div>
          {[
            ['Experience-first', 'Every tactic we cover has been executed by someone on our team or a vetted contributor. We don\'t synthesize other people\'s advice and repackage it.'],
            ['Data over opinion', 'When we make a claim, we support it with data — our own or publicly verifiable. We cite our sources and note when evidence is limited.'],
            ['Annual review', 'Every guide older than 12 months is reviewed and updated or flagged as outdated. Publication dates and update dates are always visible.'],
            ['No undisclosed sponsorship', 'Tool mentions and recommendations are editorial. When we have a commercial relationship with a tool, we disclose it.'],
          ].map(([title, body]) => (
            <div key={title} style={{ display: 'flex', gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 8 }}></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container-sm">
          <div className="section-header">
            <div className="section-eyebrow">Origin Story</div>
            <h2 className="section-title">How we got here.</h2>
          </div>
          <div className="timeline">
            {[
              ['2021', 'Started as an internal wiki', 'Maya and Jordan began documenting the processes they used with clients — not for publishing, just to stop answering the same questions twice.'],
              ['2022', 'First 10 public guides', 'After sharing internal docs with peers at a conference, we decided to reformat them as proper guides and make them public. Nothing was monetized.'],
              ['2023', 'Newsletter launched', 'The weekly email digest started with 200 subscribers from our networks. By end of year it had grown to 4,000 with zero paid acquisition.'],
              ['2024', 'Team expanded to 4', 'Sam and Priya joined to cover content strategy and email marketing — channels where Maya and Jordan had gaps.'],
              ['2025', 'Crossed 10,000 weekly readers', 'Purely organic. Every reader came from referrals, search, or social sharing. We\'ve never run a paid acquisition campaign for GTM Remixed itself.'],
              ['2026', '400+ guides, 14,200 subscribers', 'The site you\'re reading now. Still independent, still practitioner-written, still no fluff.'],
            ].map(([year, title, desc]) => (
              <div key={year} className="timeline-item">
                <div className="timeline-spine"><div className="timeline-dot"></div><div className="timeline-line"></div></div>
                <div>
                  <div className="timeline-year">{year}</div>
                  <div className="timeline-title">{title}</div>
                  <div className="timeline-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section"><div className="container"><NewsletterSignup /></div></div>
    </main>
  );
}

// —— CONTACT PAGE —————————————————————————————————————————————————————————————

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [state, setState] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required.';
    if (!formData.email || !formData.email.includes('@')) e.email = 'Valid email is required.';
    if (!formData.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setState('loading');
    setTimeout(() => setState('success'), 1600);
  };

  const methods = [
    { mark: '→', title: 'General inquiries', detail: 'hello@gtmremixed.com', note: 'Response within 2 business days' },
    { mark: '+', title: 'Partnerships', detail: 'partnerships@gtmremixed.com', note: 'Tool integrations and co-marketing' },
    { mark: '/', title: 'Guest contributions', detail: 'editorial@gtmremixed.com', note: 'Pitch guidelines on our About page' },
    { mark: '*', title: 'Press', detail: 'press@gtmremixed.com', note: 'Media kit available on request' },
  ];

  if (state === 'success') {
    return (
      <main id="main-content" className="page-enter">
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--r-lg)', background: 'var(--green-sub)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Message sent.</h1>
          <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 380 }}>We'll get back to you within 2 business days. Typically much faster.</p>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="page-enter">
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)', padding: '48px 0 36px' }}>
        <div className="container">
          <div className="section-eyebrow">Contact</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10 }}>Get in touch.</h1>
          <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 480 }}>We read every message. Use the right channel below to get to the right person faster.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'flex-start' }}>
          {/* Form */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Send us a message</h2>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input id="name" className="form-input" type="text" placeholder="Your name" value={formData.name} onChange={e => { setFormData(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }} aria-describedby={errors.name ? 'name-error' : undefined} />
                  {errors.name && <span className="form-error" id="name-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input id="email" className="form-input" type="email" placeholder="your@email.com" value={formData.email} onChange={e => { setFormData(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }} aria-describedby={errors.email ? 'email-error' : undefined} />
                  {errors.email && <span className="form-error" id="email-error">{errors.email}</span>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <select id="subject" className="form-input form-select" value={formData.subject} onChange={e => setFormData(f => ({ ...f, subject: e.target.value }))}>
                  <option value="general">General inquiry</option>
                  <option value="partnership">Partnership proposal</option>
                  <option value="guest">Guest contribution pitch</option>
                  <option value="press">Press / media request</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" className="form-input form-textarea" placeholder="Tell us what you have in mind..." value={formData.message} onChange={e => { setFormData(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })); }} aria-describedby={errors.message ? 'msg-error' : undefined}></textarea>
                {errors.message && <span className="form-error" id="msg-error">{errors.message}</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Button variant="primary" loading={state === 'loading'}>{state === 'loading' ? '' : 'Send Message'}</Button>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Typically responds in under 48 hours.</span>
              </div>
            </form>
          </div>

          {/* Contact methods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Direct contact</h2>
            {methods.map(m => (
              <div key={m.title} className="contact-method">
                <div className="contact-method-icon" style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700 }}>{m.mark}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{m.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, marginBottom: 3 }}>{m.detail}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{m.note}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: '16px', background: 'var(--bg-2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>Spam protection</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>This form is protected by Cloudflare Turnstile. No CAPTCHA puzzles required.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { NicheHubPage, ResourcesPage, AboutPage, ContactPage });
