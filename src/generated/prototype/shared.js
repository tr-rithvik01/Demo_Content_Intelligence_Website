(() => {
  var { useState, useEffect, useRef, useCallback } = React;
  const NICHES = [
    { id: "seo", slug: "seo", name: "SEO", abbr: "SE", color: "oklch(0.38 0.10 160)", bg: "oklch(0.93 0.04 160)", count: 48 },
    { id: "ppc", slug: "ppc", name: "PPC", abbr: "PP", color: "oklch(0.35 0.09 250)", bg: "oklch(0.92 0.03 250)", count: 36 },
    { id: "social", slug: "social-media", name: "Social Media", abbr: "SM", color: "oklch(0.40 0.12 290)", bg: "oklch(0.93 0.03 290)", count: 29 },
    { id: "local", slug: "local-seo", name: "Local SEO", abbr: "LS", color: "oklch(0.42 0.10 50)", bg: "oklch(0.94 0.03 50)", count: 22 },
    { id: "analytics", slug: "analytics", name: "Analytics", abbr: "AN", color: "oklch(0.40 0.12 220)", bg: "oklch(0.92 0.03 220)", count: 31 },
    { id: "content", slug: "content-marketing", name: "Content Marketing", abbr: "CM", color: "oklch(0.38 0.08 30)", bg: "oklch(0.94 0.02 30)", count: 44 },
    { id: "email", slug: "email-marketing", name: "Email Marketing", abbr: "EM", color: "oklch(0.40 0.10 195)", bg: "oklch(0.93 0.03 195)", count: 27 },
    { id: "cro", slug: "cro", name: "CRO", abbr: "CR", color: "oklch(0.42 0.12 55)", bg: "oklch(0.94 0.03 55)", count: 19 }
  ];
  const INDUSTRIES = [
    { id: "saas", slug: "saas", name: "SaaS", abbr: "SaaS", count: 38 },
    { id: "ecommerce", slug: "ecommerce", name: "E-commerce", abbr: "EC", count: 42 },
    { id: "realestate", slug: "real-estate", name: "Real Estate", abbr: "RE", count: 24 },
    { id: "healthcare", slug: "healthcare", name: "Healthcare", abbr: "HC", count: 21 },
    { id: "fintech", slug: "fintech", name: "Fintech", abbr: "FT", count: 18 },
    { id: "logistics", slug: "logistics", name: "Logistics", abbr: "LG", count: 15 },
    { id: "professional", slug: "professional-services", name: "Professional Services", abbr: "PS", count: 26 },
    { id: "hospitality", slug: "hospitality", name: "Hospitality", abbr: "HO", count: 14 }
  ];
  const ARTICLES = [
    {
      id: 1,
      slug: "technical-seo-checklist-2026",
      title: "The 2026 Technical SEO Checklist: 47 Checks That Actually Move the Needle",
      excerpt: "Most technical SEO checklists recycle the same 12 items. After auditing 400+ sites, we compiled the checks that correlate with measurable ranking gains ??? ranked by impact.",
      author: { name: "Maya Chen", initials: "MC", role: "Head of SEO" },
      date: "April 18, 2026",
      updated: "April 24, 2026",
      readTime: "14 min",
      niche: "SEO",
      industry: "All Industries",
      tags: ["technical-seo", "core-web-vitals", "crawlability"],
      featured: true,
      imageLabel: "Technical SEO audit\nchecklist diagram"
    },
    {
      id: 2,
      slug: "google-ads-quality-score-framework",
      title: "Google Ads Quality Score: The Framework That Cut Our Clients' CPC by 40%",
      excerpt: "Quality Score is a proxy metric, not a target. We reverse-engineered how it actually affects auction eligibility and built a prioritization system for fixing it.",
      author: { name: "Jordan Walsh", initials: "JW", role: "PPC Strategist" },
      date: "April 14, 2026",
      readTime: "11 min",
      niche: "PPC",
      industry: "SaaS",
      tags: ["google-ads", "quality-score", "cpc"],
      imageLabel: "Quality Score\ncomponent breakdown"
    },
    {
      id: 3,
      slug: "content-velocity-vs-depth",
      title: "Content Velocity vs. Content Depth: What 3 Years of Data Taught Us",
      excerpt: "Publish 5 articles a week or publish one exceptional guide per month? We tracked 6 content programs over 36 months to find out what actually compounds.",
      author: { name: "Sam Rivera", initials: "SR", role: "Content Strategist" },
      date: "April 10, 2026",
      readTime: "9 min",
      niche: "Content Marketing",
      industry: "All Industries",
      tags: ["content-strategy", "organic-growth", "editorial"],
      imageLabel: "Traffic compounding\ncurve chart"
    },
    {
      id: 4,
      slug: "local-seo-multi-location",
      title: "Local SEO for Multi-Location Businesses: A Playbook from 200+ Audits",
      excerpt: "Managing local SEO at scale is a different problem than single-location SEO. This is the system we use for franchises and multi-location operators.",
      author: { name: "Alex Park", initials: "AP", role: "Local SEO Lead" },
      date: "April 7, 2026",
      readTime: "16 min",
      niche: "Local SEO",
      industry: "Hospitality",
      tags: ["local-seo", "gbp", "multi-location"],
      imageLabel: "Multi-location\nGBP structure map"
    },
    {
      id: 5,
      slug: "email-deliverability-2026",
      title: "Email Deliverability in 2026: The Infrastructure Changes Most Senders Are Ignoring",
      excerpt: "Gmail and Yahoo's sender requirements changed the game. Here's how to audit your sending infrastructure and fix the gaps before they cost you inbox placement.",
      author: { name: "Priya Sharma", initials: "PS", role: "Email Marketing Lead" },
      date: "April 3, 2026",
      readTime: "12 min",
      niche: "Email Marketing",
      industry: "E-commerce",
      tags: ["deliverability", "dmarc", "inbox-placement"],
      imageLabel: "Email authentication\nDNS record diagram"
    },
    {
      id: 6,
      slug: "conversion-rate-optimization-saas",
      title: "SaaS Signup Flow Optimization: 18 Tests, 6 Winners, and What We Learned",
      excerpt: "We ran 18 A/B tests on SaaS trial signup flows over 8 months. These are the 6 changes that produced statistically significant lifts and the reasoning behind them.",
      author: { name: "Marcus Lee", initials: "ML", role: "CRO Specialist" },
      date: "March 28, 2026",
      readTime: "13 min",
      niche: "CRO",
      industry: "SaaS",
      tags: ["cro", "ab-testing", "signup-flow"],
      imageLabel: "A/B test results\nconversion funnel"
    },
    {
      id: 7,
      slug: "ga4-ecommerce-tracking",
      title: "GA4 E-commerce Tracking: The Complete Setup Guide for 2026",
      excerpt: "GA4's e-commerce implementation has quirks that can silently corrupt your data. This is the implementation guide we wish existed when Google forced the migration.",
      author: { name: "Maya Chen", initials: "MC", role: "Head of SEO" },
      date: "March 24, 2026",
      readTime: "18 min",
      niche: "Analytics",
      industry: "E-commerce",
      tags: ["ga4", "ecommerce-tracking", "gtm"],
      imageLabel: "GA4 event schema\ndata layer diagram"
    },
    {
      id: 8,
      slug: "linkedin-b2b-ads",
      title: "LinkedIn Ads for B2B SaaS: The Targeting Framework That Reduces CAC by 35%",
      excerpt: "LinkedIn's targeting is powerful and expensive. This is how we structure campaigns, bidding, and audience segmentation to make the unit economics work for B2B SaaS.",
      author: { name: "Jordan Walsh", initials: "JW", role: "PPC Strategist" },
      date: "March 20, 2026",
      readTime: "10 min",
      niche: "PPC",
      industry: "SaaS",
      tags: ["linkedin-ads", "b2b", "targeting"],
      imageLabel: "LinkedIn audience\ntargeting matrix"
    }
  ];
  const RESOURCES = [
    { id: 1, title: "Technical SEO Audit Template", type: "Template", desc: "A 47-point spreadsheet covering crawlability, Core Web Vitals, structured data, and indexation ??? with severity scoring built in.", teal: true },
    { id: 2, title: "Content Brief Framework", type: "Template", desc: "The brief structure we use for every article we produce. Includes SERP analysis prompts, entity extraction, and heading hierarchy guidance.", teal: false },
    { id: 3, title: "PPC Account Structure Checklist", type: "Checklist", desc: "Before launching any Google Ads campaign, run through these 34 structural checks to avoid the most expensive beginner mistakes.", teal: true },
    { id: 4, title: "Email Deliverability Audit Guide", type: "Guide", desc: "Step-by-step walkthrough of authenticating your sending domain, checking blacklist status, and diagnosing spam filter triggers.", teal: false },
    { id: 5, title: "GA4 E-commerce Tracking Spec", type: "Template", desc: "A complete Google Tag Manager container and data layer specification for GA4 e-commerce tracking. Import and configure in under an hour.", teal: true },
    { id: 6, title: "Local SEO Multi-Location Tracker", type: "Template", desc: "Track rankings, GBP health, citation consistency, and review velocity across unlimited locations. Built in Google Sheets.", teal: false }
  ];
  function Button({ variant = "primary", size = "", children, onClick, disabled, loading, className = "" }) {
    const cls = ["btn", `btn-${variant}`, size ? `btn-${size}` : "", className].filter(Boolean).join(" ");
    return /* @__PURE__ */ React.createElement("button", { className: cls, onClick, disabled: disabled || loading, "aria-busy": loading }, loading && /* @__PURE__ */ React.createElement("span", { className: "spinner", "aria-hidden": "true" }), children);
  }
  function TagBadge({ label, color = "neutral", onClick }) {
    return /* @__PURE__ */ React.createElement("span", { className: `tag tag-${color}`, onClick, role: onClick ? "button" : void 0 }, label);
  }
  function ImgPlaceholder({ label, height = 180, style = {} }) {
    return /* @__PURE__ */ React.createElement("div", { className: "article-card-img", style: { height, ...style } }, /* @__PURE__ */ React.createElement("div", { className: "article-card-stripe" }), /* @__PURE__ */ React.createElement("span", { className: "article-card-img-label font-mono" }, label));
  }
  function ArticleCard({ article }) {
    const nicheColors = { SEO: "green", PPC: "brand", "Social Media": "teal", Analytics: "teal", "Content Marketing": "neutral", "Email Marketing": "teal", "Local SEO": "accent", CRO: "accent" };
    const tagColor = nicheColors[article.niche] || "neutral";
    return /* @__PURE__ */ React.createElement("a", { href: `/blog/${article.slug}`, className: "article-card fade-in", "aria-label": article.title, style: { textDecoration: "none", color: "inherit", display: "flex" } }, /* @__PURE__ */ React.createElement(ImgPlaceholder, { label: article.imageLabel }), /* @__PURE__ */ React.createElement("div", { className: "article-card-body" }, /* @__PURE__ */ React.createElement("div", { className: "article-card-meta" }, /* @__PURE__ */ React.createElement(TagBadge, { label: article.niche, color: tagColor }), article.industry !== "All Industries" && /* @__PURE__ */ React.createElement(TagBadge, { label: article.industry, color: "neutral" })), /* @__PURE__ */ React.createElement("h3", { className: "article-card-title" }, article.title), /* @__PURE__ */ React.createElement("p", { className: "article-card-excerpt" }, article.excerpt), /* @__PURE__ */ React.createElement("div", { className: "article-card-footer" }, /* @__PURE__ */ React.createElement("div", { className: "article-author" }, /* @__PURE__ */ React.createElement("div", { className: "author-avatar" }, article.author.initials), /* @__PURE__ */ React.createElement("span", { className: "author-name" }, article.author.name)), /* @__PURE__ */ React.createElement("span", { className: "article-readtime" }, article.readTime, " read"))));
  }
  function ArticleCardFeatured({ article }) {
    return /* @__PURE__ */ React.createElement("a", { href: `/blog/${article.slug}`, className: "article-card-featured", style: { textDecoration: "none", color: "inherit" } }, /* @__PURE__ */ React.createElement("div", { className: "article-card-featured-body" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 4 } }, /* @__PURE__ */ React.createElement(TagBadge, { label: "Featured Guide", color: "accent" }), /* @__PURE__ */ React.createElement(TagBadge, { label: article.niche, color: "green" })), /* @__PURE__ */ React.createElement("h2", { className: "article-card-featured-title" }, article.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--text-2)", lineHeight: 1.6 } }, article.excerpt), /* @__PURE__ */ React.createElement("div", { className: "article-author", style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { className: "author-avatar" }, article.author.initials), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, article.author.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-3)" } }, article.date, " ?? ", article.readTime, " read"))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "btn btn-primary" }, "Read Guide"))), /* @__PURE__ */ React.createElement("div", { className: "article-card-featured-img" }, /* @__PURE__ */ React.createElement("div", { className: "article-card-stripe" }), /* @__PURE__ */ React.createElement("span", { className: "article-card-img-label font-mono", style: { position: "relative", zIndex: 1 } }, article.imageLabel)));
  }
  function ResourceCard({ resource }) {
    const typeColors = { Template: "var(--teal)", Checklist: "var(--green)", Guide: "var(--accent)", Tool: "var(--brand)" };
    return /* @__PURE__ */ React.createElement("a", { href: "/resources", className: "resource-card", style: { textDecoration: "none", color: "inherit" } }, /* @__PURE__ */ React.createElement("div", { className: "resource-card-type", style: { color: typeColors[resource.type] || "var(--teal)" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor", flexShrink: 0 } }), resource.type), /* @__PURE__ */ React.createElement("h3", { className: "resource-card-title" }, resource.title), /* @__PURE__ */ React.createElement("p", { className: "resource-card-desc" }, resource.desc), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "auto", paddingTop: 8 } }, /* @__PURE__ */ React.createElement("span", { className: "btn btn-secondary btn-sm" }, "Download Free")));
  }
  function NicheCard({ niche }) {
    return /* @__PURE__ */ React.createElement("a", { href: `/niches/${niche.slug || niche.id}`, className: "niche-card", style: { textDecoration: "none", color: "inherit" } }, /* @__PURE__ */ React.createElement("div", { className: "niche-card-icon", style: { background: niche.color, color: "white", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 800, letterSpacing: "0.02em" } }, niche.abbr), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "niche-card-name" }, niche.name), /* @__PURE__ */ React.createElement("div", { className: "niche-card-count" }, niche.count, " guides")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-3)", marginTop: 4 } }, "Explore ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--accent)" } }, "???")));
  }
  function CalloutBox({ type = "tip", title, children }) {
    const marks = { tip: "???", warning: "!", insight: "???", stat: "#" };
    return /* @__PURE__ */ React.createElement("div", { className: `callout callout-${type}`, role: "note" }, /* @__PURE__ */ React.createElement("span", { className: "callout-icon", "aria-hidden": "true", style: { fontFamily: "var(--font-mono)", fontWeight: 700 } }, marks[type]), /* @__PURE__ */ React.createElement("div", null, title && /* @__PURE__ */ React.createElement("div", { className: "callout-title" }, title), /* @__PURE__ */ React.createElement("div", { className: "callout-body" }, children)));
  }
  function NewsletterSignup() {
    const [mode, setMode] = useState("email");
    const [value, setValue] = useState("");
    const [state, setState] = useState("idle");
    const validate = () => {
      if (mode === "email") return value.includes("@") && value.length > 3;
      if (mode === "phone") return /^\+?[\d\s\-().]{7,}$/.test(value);
      return false;
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!value || !validate()) {
        setState("error");
        return;
      }
      setState("loading");
      setTimeout(() => setState("success"), 1400);
    };
    const handleModeSwitch = (m) => {
      setMode(m);
      setValue("");
      setState("idle");
    };
    if (state === "success") {
      return /* @__PURE__ */ React.createElement("div", { className: "newsletter-box", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: "var(--r-lg)", background: "var(--green-sub)", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M4 10l4.5 4.5 7.5-9", stroke: "var(--green)", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800 } }, "You're in."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "var(--text-2)", maxWidth: 340, textAlign: "center" } }, "Welcome to GTM Remixed. Expect the good stuff ??? no filler, no fluff. Just what's actually moving the needle in your industry, straight to you."));
    }
    return /* @__PURE__ */ React.createElement("div", { className: "newsletter-box" }, /* @__PURE__ */ React.createElement("div", { className: "newsletter-eyebrow" }, "Stay in the loop"), /* @__PURE__ */ React.createElement("h2", { className: "newsletter-title" }, "There's a lot happening out there.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-serif)" } }, "What matters is your work.")), /* @__PURE__ */ React.createElement("p", { className: "newsletter-sub" }, "Guides, tips, updates, and hacks ??? delivered straight to your inbox so you don't have to go looking for them. No noise. Just the stuff worth your time."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "center", marginBottom: 16 } }, [["email", "Email"], ["phone", "Phone"]].map(([m, label]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: m,
        type: "button",
        onClick: () => handleModeSwitch(m),
        className: `tag-filter${mode === m ? " active" : ""}`,
        style: { fontSize: 13, padding: "6px 18px" }
      },
      label
    ))), /* @__PURE__ */ React.createElement("form", { className: "newsletter-form", onSubmit: handleSubmit, noValidate: true }, mode === "email" ? /* @__PURE__ */ React.createElement(
      "input",
      {
        key: "email",
        type: "email",
        className: "newsletter-input",
        placeholder: "your@email.com",
        value,
        onChange: (e) => {
          setValue(e.target.value);
          setState("idle");
        },
        "aria-label": "Email address",
        style: state === "error" ? { borderColor: "var(--accent)" } : {}
      }
    ) : /* @__PURE__ */ React.createElement(
      "input",
      {
        key: "phone",
        type: "tel",
        className: "newsletter-input",
        placeholder: "+1 (555) 000-0000",
        value,
        onChange: (e) => {
          setValue(e.target.value);
          setState("idle");
        },
        "aria-label": "Phone number",
        style: state === "error" ? { borderColor: "var(--accent)" } : {}
      }
    ), /* @__PURE__ */ React.createElement(Button, { variant: "primary", loading: state === "loading" }, state === "loading" ? "" : "Subscribe")), state === "error" && /* @__PURE__ */ React.createElement("div", { className: "form-error", style: { marginTop: 8, textAlign: "center" } }, mode === "email" ? "Please enter a valid email address." : "Please enter a valid phone number."), /* @__PURE__ */ React.createElement("p", { className: "newsletter-proof" }, "14,200+ marketers. No spam. Unsubscribe anytime."));
  }
  function ReadingProgress() {
    useEffect(() => {
      const bar = document.getElementById("reading-progress");
      if (!bar) return;
      const update = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = h > 0 ? Math.min(100, window.scrollY / h * 100) : 0;
        bar.style.width = pct + "%";
      };
      window.addEventListener("scroll", update, { passive: true });
      return () => {
        window.removeEventListener("scroll", update);
        if (bar) bar.style.width = "0%";
      };
    }, []);
    return null;
  }
  function CodeBlock({ lang = "javascript", children }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(children).catch(() => {
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "code-block" }, /* @__PURE__ */ React.createElement("div", { className: "code-block-header" }, /* @__PURE__ */ React.createElement("span", null, lang), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: handleCopy, style: { fontSize: 12 } }, copied ? "??? Copied" : "Copy")), /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, children)));
  }
  function ShareBar() {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(window.location.href).catch(() => {
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "share-bar" }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "var(--text-3)" } }, "Share:"), /* @__PURE__ */ React.createElement("button", { className: "share-btn" }, "X / Twitter"), /* @__PURE__ */ React.createElement("button", { className: "share-btn" }, "LinkedIn"), /* @__PURE__ */ React.createElement("button", { className: "share-btn", onClick: handleCopy }, copied ? "Link copied" : "Copy link"));
  }
  function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return /* @__PURE__ */ React.createElement("div", { className: "faq-item" }, /* @__PURE__ */ React.createElement("div", { className: `faq-q${open ? " open" : ""}`, onClick: () => setOpen(!open), role: "button", tabIndex: 0, onKeyDown: (e) => e.key === "Enter" && setOpen(!open), "aria-expanded": open }, /* @__PURE__ */ React.createElement("span", null, question), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M8 3v10M3 8h10", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }))), open && /* @__PURE__ */ React.createElement("div", { className: "faq-a fade-in" }, answer));
  }
  function useScrollAppear(ref) {
    useEffect(() => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("visible");
          obs.disconnect();
        }
      }, { threshold: 0.1 });
      obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);
  }
  function AppearSection({ children, style }) {
    const ref = useRef(null);
    useScrollAppear(ref);
    return /* @__PURE__ */ React.createElement("div", { className: "appear", ref, style }, children);
  }
  Object.assign(window, {
    NICHES,
    INDUSTRIES,
    ARTICLES,
    RESOURCES,
    Button,
    TagBadge,
    ImgPlaceholder,
    ArticleCard,
    ArticleCardFeatured,
    ResourceCard,
    NicheCard,
    CalloutBox,
    NewsletterSignup,
    ReadingProgress,
    CodeBlock,
    ShareBar,
    FAQItem,
    AppearSection
  });
})();
