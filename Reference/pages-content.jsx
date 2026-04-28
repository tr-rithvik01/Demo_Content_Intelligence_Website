// pages-content.jsx — BlogIndexPage + ArticlePage

const { useState, useEffect, useRef } = React;

// ── BLOG INDEX ────────────────────────────────────────────────────────────────

function BlogIndexPage({ onNavigate }) {
  const allNiches = ['All', ...NICHES.map(n => n.name)];
  const allIndustries = ['All Industries', ...INDUSTRIES.map(i => i.name)];
  const [activeNiche, setActiveNiche] = useState('All');
  const [activeIndustry, setActiveIndustry] = useState('All Industries');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = ARTICLES.filter(a => {
    const matchNiche = activeNiche === 'All' || a.niche === activeNiche;
    const matchInd = activeIndustry === 'All Industries' || a.industry === activeIndustry;
    return matchNiche && matchInd;
  }).sort((a, b) => sort === 'newest' ? b.id - a.id : a.id - b.id);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilterChange = (setter, value) => { setter(value); setPage(1); };

  return (
    <main id="main-content" className="page-enter">
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)', padding: '48px 0 32px' }}>
        <div className="container">
          <div className="section-eyebrow">All Guides</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10 }}>
            Growth marketing, from first principle.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 520 }}>
            {ARTICLES.length} guides covering SEO, PPC, content, email, CRO, and more. Sorted by recency, filtered by what you need.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 40, alignItems: 'flex-start' }}>
          {/* Main content */}
          <div>
            {/* Filters */}
            <div style={{ marginBottom: 24 }}>
              <div className="filter-row" style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginRight: 4 }}>Channel</span>
                {allNiches.map(n => (
                  <button key={n} className={`tag-filter${activeNiche === n ? ' active' : ''}`} onClick={() => handleFilterChange(setActiveNiche, n)}>{n}</button>
                ))}
              </div>
              <div className="filter-row">
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginRight: 4 }}>Industry</span>
                {allIndustries.map(i => (
                  <button key={i} className={`tag-filter${activeIndustry === i ? ' active' : ''}`} onClick={() => handleFilterChange(setActiveIndustry, i)}>{i}</button>
                ))}
                <div className="filter-sort">
                  <label htmlFor="sort-select" className="sr-only">Sort by</label>
                  <select id="sort-select" className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 20 }}>
              {filtered.length === 0 ? 'No guides found.' : `${filtered.length} guide${filtered.length !== 1 ? 's' : ''} found`}
              {(activeNiche !== 'All' || activeIndustry !== 'All Industries') && (
                <button className="btn btn-ghost btn-sm" style={{ marginLeft: 8 }} onClick={() => { setActiveNiche('All'); setActiveIndustry('All Industries'); setPage(1); }}>
                  Clear filters ×
                </button>
              )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-3)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--r-lg)', background: 'var(--bg-3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.5" cy="7.5" r="5" stroke="var(--border-s)" strokeWidth="1.6"/><path d="M12 12l4 4" stroke="var(--border-s)" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-2)' }}>No guides match these filters.</div>
                <div style={{ fontSize: 14, marginTop: 6 }}>Try removing a filter or browsing all channels.</div>
              </div>
            ) : (
              <div className="grid-2" style={{ marginBottom: 32 }}>
                {paginated.map(a => <ArticleCard key={a.id} article={a} onClick={art => onNavigate('article', art)} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className="btn btn-secondary btn-sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next →</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 'calc(var(--nav-h) + 20px)' }}>
            <div style={{ marginBottom: 28 }}>
              <div className="footer-col-title">Popular Guides</div>
              {ARTICLES.slice(0, 4).map((a, i) => (
                <div key={a.id} style={{ display: 'flex', gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: i < 3 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }} onClick={() => onNavigate('article', a)}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--border-s)', lineHeight: 1, marginTop: 2 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35, color: 'var(--text-1)', marginBottom: 4 }}>{a.title}</div>
                    <TagBadge label={a.niche} color="neutral" />
                  </div>
                </div>
              ))}
            </div>
            <NewsletterSignup compact />
            <div style={{ marginTop: 24 }}>
              <div className="footer-col-title">Popular Tags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['technical-seo', 'google-ads', 'content-strategy', 'ga4', 'email-deliverability', 'cro', 'local-seo', 'b2b', 'ab-testing', 'core-web-vitals'].map(t => (
                  <span key={t} className="tag tag-neutral" style={{ cursor: 'pointer' }}>#{t}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// ── ARTICLE PAGE ──────────────────────────────────────────────────────────────

const ARTICLE_SECTIONS = [
  { id: 'why-it-matters',      level: 2, title: 'Why Most Checklists Fail' },
  { id: 'crawlability',        level: 2, title: 'Section 1: Crawlability' },
  { id: 'robots-txt',          level: 3, title: 'Robots.txt and crawl directives' },
  { id: 'internal-linking',    level: 3, title: 'Internal linking architecture' },
  { id: 'core-web-vitals',     level: 2, title: 'Section 2: Core Web Vitals' },
  { id: 'lcp',                 level: 3, title: 'Largest Contentful Paint' },
  { id: 'cls',                 level: 3, title: 'Cumulative Layout Shift' },
  { id: 'indexation',          level: 2, title: 'Section 3: Indexation' },
  { id: 'structured-data',     level: 2, title: 'Section 4: Structured Data' },
  { id: 'implementation',      level: 2, title: 'Implementation Priority Order' },
];

function TableOfContents({ activeSection, onSectionClick }) {
  return (
    <div className="toc-wrapper">
      <div className="toc-title">On this page</div>
      {ARTICLE_SECTIONS.map(s => (
        <div key={s.id} className={`toc-item${s.level === 3 ? ' toc-item-h3' : ''}${activeSection === s.id ? ' active' : ''}`} onClick={() => onSectionClick(s.id)} role="button" tabIndex={0}>
          {s.title}
        </div>
      ))}
    </div>
  );
}

function ArticlePage({ article, onNavigate }) {
  const art = article || ARTICLES[0];
  const [activeSection, setActiveSection] = useState(ARTICLE_SECTIONS[0].id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [art.id]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
    ARTICLE_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const related = ARTICLES.filter(a => a.id !== art.id && (a.niche === art.niche || a.industry === art.industry)).slice(0, 3);

  return (
    <main id="main-content" className="page-enter">
      <ReadingProgress />

      {/* Article header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '36px 0 32px', background: 'var(--bg)' }}>
        <div className="container-art">
          <div className="breadcrumb" style={{ marginBottom: 16 }}>
            <span className="breadcrumb-item" onClick={() => onNavigate('home')}>Home</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item" onClick={() => onNavigate('blog')}>Blog</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item" onClick={() => onNavigate('niche', NICHES.find(n => n.name === art.niche))}>{art.niche}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <TagBadge label={art.niche} color="accent" />
            {art.industry !== 'All Industries' && <TagBadge label={art.industry} color="teal" />}
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 16 }}>{art.title}</h1>
          <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 20 }}>{art.excerpt}</p>
          <div className="article-hero-meta">
            <div className="article-author">
              <div className="author-avatar" style={{ width: 36, height: 36, fontSize: 13 }}>{art.author.initials}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{art.author.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{art.author.role}</div>
              </div>
            </div>
            <div className="dot-sep"></div>
            <div className="article-meta-item">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/><path d="M6.5 4v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              {art.readTime} read
            </div>
            <div className="article-meta-item">Published {art.date}</div>
            {art.updated && <div className="article-meta-item" style={{ color: 'var(--teal)' }}>Updated {art.updated}</div>}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="container" style={{ padding: '40px 24px 80px' }}>
        <div className="article-layout">
          {/* TOC */}
          <div className="article-toc-col">
            <TableOfContents activeSection={activeSection} onSectionClick={scrollToSection} />
          </div>

          {/* Body */}
          <div style={{ minWidth: 0 }}>
            <div className="article-body">
              <p>This isn't another checklist recycled from a 2019 blog post. After running technical SEO audits on 400+ sites — from bootstrapped indie products to enterprise platforms — we've identified which checks actually correlate with ranking changes and which are hygiene theater.</p>
              <p>We've organized this into five sections, ranked within each section by impact. Run them in order. Fix the highest-impact items first.</p>

              <h2 id="why-it-matters">Why Most Checklists Fail</h2>
              <p>The average technical SEO checklist has three problems: it doesn't distinguish between critical issues and minor optimizations, it doesn't account for site architecture, and it was written by someone who hasn't audited a site under real competitive pressure.</p>

              <CalloutBox type="insight" title="Key Principle">
                Not all technical issues have equal weight. A crawl budget problem on a 100-page site is irrelevant. The same problem on a 500,000-page e-commerce site is an emergency.
              </CalloutBox>

              <h2 id="crawlability">Section 1: Crawlability</h2>
              <p>Google can't rank what it can't find. Before anything else, verify that the pages you want indexed are actually reachable by crawlers.</p>

              <h3 id="robots-txt">Robots.txt and crawl directives</h3>
              <p>Fetch your robots.txt directly and audit every disallow rule. We've seen production sites accidentally blocking <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-3)', padding: '1px 5px', borderRadius: 4, fontSize: '0.85em' }}>/wp-admin/</code> when they meant to block <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-3)', padding: '1px 5px', borderRadius: 4, fontSize: '0.85em' }}>/admin/</code> — a single character difference that deindexed the entire site.</p>

              <CalloutBox type="warning" title="Common Mistake">
                Never disallow CSS or JavaScript files used in rendering your key content. Google renders pages and needs access to these resources to evaluate them correctly.
              </CalloutBox>

              <h3 id="internal-linking">Internal linking architecture</h3>
              <p>Internal links are how PageRank flows through your site. A flat architecture — where every page is reachable within 3 clicks from the homepage — is the goal. Use Screaming Frog or Sitebulb to map link depth across your site.</p>

              <CodeBlock lang="python">{`# Check crawl depth distribution with Screaming Frog export
import pandas as pd

df = pd.read_csv('crawl_export.csv')
depth_dist = df['Crawl Depth'].value_counts().sort_index()
print(depth_dist)

# Flag anything deeper than 4 clicks
deep_pages = df[df['Crawl Depth'] > 4]
print(f"Pages deeper than 4 clicks: {len(deep_pages)}")`}</CodeBlock>

              <div className="pull-quote">"A technical audit without a prioritization framework is just a list of things to argue about in meetings."</div>

              <h2 id="core-web-vitals">Section 2: Core Web Vitals</h2>
              <p>Core Web Vitals are a confirmed ranking factor. More importantly, they correlate with conversion rate. A 1-second improvement in LCP improves conversion rates by 3–8% across most categories we've measured.</p>

              <h3 id="lcp">Largest Contentful Paint</h3>
              <p>LCP should be under 2.5 seconds. The most common culprits: unoptimized hero images, render-blocking third-party scripts, and slow Time to First Byte from the origin server.</p>

              <div className="stats-row" style={{ marginBottom: 24 }}>
                {[['2.5s', 'Good LCP threshold'], ['4.0s', 'Poor LCP threshold'], ['75th', 'Percentile measured'], ['3–8%', 'Avg CVR improvement per 1s']].map(([val, label]) => (
                  <div key={label} className="stat-cell">
                    <div className="stat-cell-val" style={{ fontSize: 24 }}>{val}</div>
                    <div className="stat-cell-label">{label}</div>
                  </div>
                ))}
              </div>

              <h3 id="cls">Cumulative Layout Shift</h3>
              <p>CLS is often the easiest Core Web Vital to fix. Reserve space for images with explicit width and height attributes. Avoid inserting content above the fold after the page loads.</p>

              <CalloutBox type="tip" title="Quick Win">
                Add <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>aspect-ratio: attr(width) / attr(height)</code> to your CSS image reset. This single rule eliminates most CLS issues from images that haven't been given explicit dimensions.
              </CalloutBox>

              <h2 id="indexation">Section 3: Indexation</h2>
              <p>Use Google Search Console's URL Inspection tool to verify your key pages are indexed. Then run a site: query to get a rough index count and compare it to your actual page count. A large discrepancy suggests a crawling or indexation issue worth investigating.</p>

              <h2 id="structured-data">Section 4: Structured Data</h2>
              <p>Structured data doesn't directly improve rankings, but it unlocks rich results that increase click-through rates by 20–30% in most verticals. Prioritize Article, BreadcrumbList, FAQPage, and HowTo schemas depending on your content type.</p>

              <CodeBlock lang="json">{`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The 2026 Technical SEO Checklist",
  "author": {
    "@type": "Person",
    "name": "Maya Chen",
    "jobTitle": "Head of SEO"
  },
  "datePublished": "2026-04-18",
  "dateModified": "2026-04-24",
  "publisher": {
    "@type": "Organization",
    "name": "The AI GTM Engineer"
  }
}`}</CodeBlock>

              <h2 id="implementation">Implementation Priority Order</h2>
              <p>Not all technical issues are equal. Here's how we triage when there are more issues than time to fix them:</p>
              <ol>
                <li><strong>Crawlability blockers</strong> — Anything preventing Googlebot from reaching pages you want ranked. Fix these immediately.</li>
                <li><strong>Indexation issues</strong> — noindex tags, canonical conflicts, duplicate content. Fix within a week.</li>
                <li><strong>Core Web Vitals</strong> — LCP, CLS, INP. Fix within a sprint cycle.</li>
                <li><strong>Structured data</strong> — Implement iteratively, starting with article and breadcrumb schemas.</li>
                <li><strong>Everything else</strong> — Fix in maintenance cycles, not emergency sprints.</li>
              </ol>
            </div>

            {/* Tags */}
            <div className="divider"></div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {art.tags.map(t => <span key={t} className="tag tag-neutral">#{t}</span>)}
            </div>

            {/* Share */}
            <ShareBar title={art.title} />

            {/* Author bio */}
            <div style={{ marginTop: 32 }}>
              <div className="author-bio">
                <div className="author-bio-avatar">{art.author.initials}</div>
                <div>
                  <div className="author-bio-name">{art.author.name}</div>
                  <div className="author-bio-role">{art.author.role} at The AI GTM Engineer</div>
                  <div className="author-bio-text">
                    {art.author.name} has run technical SEO and content strategy for over 60 companies across SaaS, e-commerce, and media. Previously led SEO at two Series B startups. Has personally audited 200+ sites since 2019.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
            <div className="section-eyebrow">Continue Reading</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Related guides in {art.niche}</h2>
            <div className="grid-3">
              {related.map(a => <ArticleCard key={a.id} article={a} onClick={art => onNavigate('article', art)} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

Object.assign(window, { BlogIndexPage, ArticlePage });
