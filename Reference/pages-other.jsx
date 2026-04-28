// pages-other.jsx — NicheHub, Resources, About, Contact, ComponentShowcase

const { useState, useRef } = React;

// ── ANIMAL DATA ───────────────────────────────────────────────────────────────

const NICHE_ANIMALS = {
  seo:       { name: 'Eagle',       tagline: 'Precision vision. Built to rank.',            desc: 'Like an eagle commanding vast terrain, SEO demands altitude — combining technical precision with content depth to claim positions that compound long after the work is done.' },
  ppc:       { name: 'Cheetah',     tagline: 'Speed. Efficiency. Maximum ROI.',             desc: 'PPC is the cheetah of marketing: explosive acceleration when executed correctly, completely inefficient when not. The difference between 3× ROAS and burning budget is precision.' },
  social:    { name: 'Dolphin',     tagline: 'Intelligent. Connected. Always in motion.',   desc: 'Social media rewards the curious and connected. Like dolphins, the best social strategies navigate complex waters with intelligence, adaptability, and a genuine instinct for community.' },
  local:     { name: 'Bear',        tagline: 'Own your territory. Defend your ground.',     desc: 'Local SEO is about territorial dominance. Know your turf, make yourself impossible to ignore in your market, and protect that ground from competitors who want your customers.' },
  analytics: { name: 'Owl',         tagline: 'See patterns others miss.',                   desc: "Analytics is the owl's gift: clarity in the dark, signal found in noise, and the discipline to act on data when everyone else is guessing. The difference between decisions and hunches." },
  content:   { name: 'Elephant',    tagline: 'Never forgotten. Built to last.',             desc: 'Great content marketing has an elephant\'s memory and patience — building assets that compound for years, creating trust that no ad spend can replicate, outlasting every short-term tactic.' },
  email:     { name: 'Hummingbird', tagline: 'Precise. Direct. Always delivered.',          desc: 'Email at its best is like a hummingbird: pinpoint accurate, impossibly efficient, delivering exactly what the recipient needs with zero wasted motion and a 42:1 return on investment.' },
  cro:       { name: 'Chameleon',   tagline: 'Test. Adapt. Convert.',                      desc: "CRO is the chameleon's practice — constant adaptation based on what the environment tells you. The best conversion programs never stop changing in response to data, because the data never lies." },
};

const NICHE_HUE = { seo: 160, ppc: 250, social: 290, local: 50, analytics: 220, content: 30, email: 195, cro: 55 };

// ── ANIMAL ILLUSTRATIONS ──────────────────────────────────────────────────────

function AnimalIllustration({ nicheId }) {
  const W = 'rgba(255,255,255,0.92)';
  const F = 'rgba(255,255,255,0.28)';
  const s = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  switch (nicheId) {
    case 'seo': return ( // EAGLE — top-down spread wings
      <svg viewBox="0 0 320 260" style={{ width: '100%', height: '100%' }} fill="none">
        <path d="M160 128 C128 102 72 82 18 98" stroke={W} strokeWidth="3" strokeLinecap="round"/>
        <path d="M160 128 C192 102 248 82 302 98" stroke={W} strokeWidth="3" strokeLinecap="round"/>
        <path d="M18 98 C48 118 100 128 152 136" stroke={W} strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
        <path d="M302 98 C272 118 220 128 168 136" stroke={W} strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
        {[22,52,86].map((x,i)=><path key={i} d={`M${x} ${96+i*3} C${x-6} ${108+i*2} ${x-4} ${118+i*2} ${x+8} ${120+i*2}`} stroke={W} strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/>)}
        {[298,268,234].map((x,i)=><path key={i} d={`M${x} ${96+i*3} C${x+6} ${108+i*2} ${x+4} ${118+i*2} ${x-8} ${120+i*2}`} stroke={W} strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/>)}
        <ellipse cx="160" cy="140" rx="14" ry="34" stroke={W} strokeWidth="2.5"/>
        <circle cx="160" cy="100" r="17" fill={F} stroke={W} strokeWidth="2.5"/>
        <path d="M169 96 L182 91 L178 100 Z" fill={W}/>
        <circle cx="166" cy="96" r="3.5" fill={W}/>
        <path d="M150 172 L145 194 M160 174 L160 197 M170 172 L175 194" stroke={W} strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="160" cy="140" r="62" stroke={F} strokeWidth="1" strokeDasharray="5,6"/>
      </svg>
    );
    case 'ppc': return ( // CHEETAH — side running
      <svg viewBox="0 0 340 220" style={{ width: '100%', height: '100%' }} fill="none">
        <ellipse cx="168" cy="112" rx="78" ry="36" stroke={W} strokeWidth="2.5" transform="rotate(-5 168 112)"/>
        <circle cx="78" cy="93" r="30" stroke={W} strokeWidth="2.5"/>
        <path d="M96 108 C108 115 122 117 134 114" stroke={W} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M65 66 L73 53 L81 66" stroke={W} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M85 63 L93 51 L101 64" stroke={W} strokeWidth="1.8" strokeLinecap="round"/>
        <ellipse cx="72" cy="88" rx="7" ry="6" stroke={W} strokeWidth="1.6"/>
        <circle cx="74" cy="88" r="3" fill={W}/>
        <path d="M50 93 C57 97 68 97 74 93" stroke={W} strokeWidth="1.4" strokeLinecap="round"/>
        <ellipse cx="50" cy="91" rx="5" ry="3.5" stroke={W} strokeWidth="1.4"/>
        <path d="M110 138 L90 176 L86 179 M132 142 L120 179 L124 181" stroke={W} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M202 135 L197 174 L192 177 M227 132 L230 169 L234 171" stroke={W} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M240 96 C262 80 282 76 297 86 C307 93 304 105 297 107" stroke={W} strokeWidth="2.2" strokeLinecap="round"/>
        {[[148,96],[164,89],[180,96],[167,110],[150,114],[132,101],[192,99],[207,105],[185,116]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4" fill={F} stroke={W} strokeWidth="1.2"/>
        ))}
        <path d="M286 118 L312 115 M281 127 L310 127 M279 136 L306 138" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
    case 'social': return ( // DOLPHIN — leaping
      <svg viewBox="0 0 340 260" style={{ width: '100%', height: '100%' }} fill="none">
        <path d="M38 202 C58 140 100 88 162 68 C222 48 272 70 302 112" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M38 202 C70 186 122 172 178 170 C232 168 276 176 302 112" stroke={F} strokeWidth="2" strokeLinecap="round"/>
        <path d="M186 78 C196 53 207 43 217 54 C212 67 202 74 186 78Z" stroke={W} strokeWidth="2" fill={F}/>
        <path d="M38 202 C23 192 13 179 20 168 M38 202 C28 217 16 222 12 214" stroke={W} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M302 112 C318 102 328 90 322 81 C317 96 310 105 302 112Z" stroke={W} strokeWidth="2" fill={F}/>
        <circle cx="291" cy="97" r="6" stroke={W} strokeWidth="2"/>
        <circle cx="292" cy="97" r="2.5" fill={W}/>
        <path d="M98 160 C150 168 202 172 252 160" stroke={F} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4,4"/>
        {[[80,230],[120,240],[160,236],[200,228]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3" fill={F}/>))}
        <path d="M80 230 L120 240 L160 236 L200 228" stroke={F} strokeWidth="1"/>
        <path d="M52 212 C57 202 62 207 67 200 M72 217 C77 207 80 212 85 204" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
    case 'local': return ( // BEAR — frontal face
      <svg viewBox="0 0 280 300" style={{ width: '100%', height: '100%' }} fill="none">
        <circle cx="140" cy="156" r="98" stroke={W} strokeWidth="2.5"/>
        <circle cx="66" cy="67" r="30" stroke={W} strokeWidth="2.5"/>
        <circle cx="66" cy="67" r="17" stroke={F} strokeWidth="1.5"/>
        <circle cx="214" cy="67" r="30" stroke={W} strokeWidth="2.5"/>
        <circle cx="214" cy="67" r="17" stroke={F} strokeWidth="1.5"/>
        <circle cx="104" cy="135" r="17" fill={F} stroke={W} strokeWidth="2.5"/>
        <circle cx="107" cy="133" r="8" fill={W}/>
        <circle cx="110" cy="130" r="2.5" fill="rgba(255,255,255,0.4)"/>
        <circle cx="176" cy="135" r="17" fill={F} stroke={W} strokeWidth="2.5"/>
        <circle cx="179" cy="133" r="8" fill={W}/>
        <circle cx="182" cy="130" r="2.5" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="140" cy="175" rx="21" ry="14" fill={F} stroke={W} strokeWidth="2.5"/>
        <ellipse cx="140" cy="172" rx="9" ry="6" fill={W}/>
        <path d="M140 188 C130 198 118 202 112 197 M140 188 C150 198 162 202 168 197" stroke={W} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M60 130 C65 140 70 150 68 160" stroke={F} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M220 130 C215 140 210 150 212 160" stroke={F} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M48 248 C60 256 90 264 140 266 C190 264 220 256 232 248" stroke={F} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    );
    case 'analytics': return ( // OWL — frontal
      <svg viewBox="0 0 280 320" style={{ width: '100%', height: '100%' }} fill="none">
        <path d="M58 163 C38 170 33 200 36 230 C40 268 78 295 140 298 C202 295 240 268 244 230 C247 200 242 170 222 163 C202 146 177 138 140 136 C103 138 78 146 58 163Z" stroke={W} strokeWidth="2.5"/>
        <circle cx="140" cy="88" r="66" stroke={W} strokeWidth="2.5"/>
        <path d="M90 30 L100 55 L81 52 Z" fill={F} stroke={W} strokeWidth="1.8"/>
        <path d="M190 30 L180 55 L199 52 Z" fill={F} stroke={W} strokeWidth="1.8"/>
        <circle cx="110" cy="88" r="29" fill={F} stroke={W} strokeWidth="2.5"/>
        <circle cx="110" cy="88" r="17" stroke={W} strokeWidth="1.5"/>
        <circle cx="113" cy="86" r="10" fill={W}/>
        <circle cx="116" cy="83" r="3" fill="rgba(255,255,255,0.5)"/>
        <circle cx="170" cy="88" r="29" fill={F} stroke={W} strokeWidth="2.5"/>
        <circle cx="170" cy="88" r="17" stroke={W} strokeWidth="1.5"/>
        <circle cx="173" cy="86" r="10" fill={W}/>
        <circle cx="176" cy="83" r="3" fill="rgba(255,255,255,0.5)"/>
        <path d="M130 110 L140 124 L150 110 Z" fill={W}/>
        <path d="M77 66 C79 47 94 37 110 42" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M203 66 C201 47 186 37 170 42" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M58 180 C48 202 53 226 68 238" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M222 180 C232 202 227 226 212 238" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M106 295 L98 316 M114 297 L110 318 M122 298 L120 320" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M174 295 L166 316 M166 297 L162 318 M158 298 L156 320" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
    case 'content': return ( // ELEPHANT — side profile
      <svg viewBox="0 0 360 280" style={{ width: '100%', height: '100%' }} fill="none">
        <ellipse cx="202" cy="158" rx="118" ry="80" stroke={W} strokeWidth="2.5"/>
        <circle cx="80" cy="130" r="50" stroke={W} strokeWidth="2.5"/>
        <ellipse cx="60" cy="122" rx="37" ry="44" stroke={W} strokeWidth="2.5" transform="rotate(-10 60 122)"/>
        <ellipse cx="60" cy="122" rx="25" ry="32" stroke={F} strokeWidth="1.5" transform="rotate(-10 60 122)"/>
        <path d="M46 152 C28 168 16 185 13 205 C11 218 16 228 26 225 C36 222 40 210 50 200 C56 194 63 192 68 195" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M68 195 C77 200 79 210 71 215 C63 220 57 214 59 205" stroke={W} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="69" cy="118" r="8.5" stroke={W} strokeWidth="2"/>
        <circle cx="71" cy="117" r="4" fill={W}/>
        <path d="M50 160 C38 168 30 178 33 188 C36 196 48 196 58 190" stroke={W} strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="110" y="230" width="26" height="42" rx="11" stroke={W} strokeWidth="2.2"/>
        <rect x="150" y="232" width="26" height="42" rx="11" stroke={W} strokeWidth="2.2"/>
        <rect x="224" y="234" width="26" height="42" rx="11" stroke={W} strokeWidth="2.2"/>
        <rect x="264" y="232" width="26" height="42" rx="11" stroke={W} strokeWidth="2.2"/>
        <path d="M318 148 C332 140 338 130 330 122 C325 118 318 124 320 132" stroke={W} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
    case 'email': return ( // HUMMINGBIRD — in flight
      <svg viewBox="0 0 320 260" style={{ width: '100%', height: '100%' }} fill="none">
        <ellipse cx="145" cy="140" rx="33" ry="18" stroke={W} strokeWidth="2.5" transform="rotate(-20 145 140)"/>
        <path d="M120 152 C105 162 95 170 90 178 M120 152 C108 165 100 175 98 185" stroke={W} strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="178" cy="122" r="18" stroke={W} strokeWidth="2.5"/>
        <path d="M195 118 L258 104" stroke={W} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M195 122 L256 110" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="183" cy="118" r="4.5" fill={W}/>
        <circle cx="184" cy="117" r="1.5" fill="rgba(255,255,255,0.5)"/>
        <path d="M152 126 C146 100 141 72 149 55 C159 70 163 95 159 122Z" fill={F} stroke={W} strokeWidth="1.6"/>
        <path d="M136 118 C130 94 127 68 134 50" stroke={F} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4,3"/>
        <path d="M121 115 C117 91 115 65 122 47" stroke={F} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4,3" opacity="0.5"/>
        <path d="M152 145 C149 169 151 193 159 209 C163 193 161 169 161 145Z" fill={F} stroke={W} strokeWidth="1.6"/>
        <circle cx="280" cy="130" r="14" stroke={F} strokeWidth="1.5"/>
        <circle cx="280" cy="130" r="5.5" stroke={F} strokeWidth="1.5"/>
        {[0,60,120,180,240,300].map((deg,i)=>(
          <path key={i} d={`M${280+14*Math.cos(deg*Math.PI/180)} ${130+14*Math.sin(deg*Math.PI/180)} L${280+22*Math.cos(deg*Math.PI/180)} ${130+22*Math.sin(deg*Math.PI/180)}`} stroke={F} strokeWidth="1.2" opacity="0.5"/>
        ))}
        <ellipse cx="168" cy="132" rx="11" ry="7" fill={F} transform="rotate(-20 168 132)" opacity="0.6"/>
      </svg>
    );
    case 'cro': return ( // CHAMELEON — side on branch
      <svg viewBox="0 0 360 280" style={{ width: '100%', height: '100%' }} fill="none">
        <path d="M20 200 L340 195" stroke={F} strokeWidth="7" strokeLinecap="round"/>
        <path d="M40 197 C30 183 28 165 38 152 C48 138 62 135 70 145 C78 155 74 170 62 175 C52 180 44 175 45 165" stroke={W} strokeWidth="3" strokeLinecap="round"/>
        <path d="M65 165 C80 148 100 142 120 140 C140 138 165 140 185 142 C205 144 222 140 237 135 C252 130 267 135 277 145 C287 155 284 168 272 175 C257 182 237 180 217 178 C197 176 172 178 147 180 C122 182 97 185 80 188 C67 190 62 182 65 165Z" stroke={W} strokeWidth="2.5" fill={F}/>
        {[100,130,158,184,210,238,262].map((x,i)=>(
          <circle key={i} cx={x} cy={140+i%2*3} r="4.5" fill={W} opacity={0.8-i*0.05}/>
        ))}
        <path d="M272 155 C287 148 302 145 314 150 C324 155 327 165 320 172 C310 180 292 180 280 172 C270 165 270 158 272 155Z" stroke={W} strokeWidth="2.5" fill={F}/>
        <path d="M280 152 C284 138 294 132 304 136 C308 148 302 152 292 154 L280 152Z" stroke={W} strokeWidth="1.8" fill={F}/>
        <circle cx="306" cy="160" r="13" fill="rgba(255,255,255,0.15)" stroke={W} strokeWidth="2.5"/>
        <circle cx="306" cy="160" r="7.5" stroke={W} strokeWidth="1.5"/>
        <circle cx="308" cy="158" r="5" fill={W}/>
        <circle cx="310" cy="156" r="2" fill="rgba(255,255,255,0.6)"/>
        <path d="M327 162 L357 158" stroke={W} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="359" cy="157" r="4" fill={W}/>
        <path d="M107 180 L97 196 M122 182 L122 196 M182 180 L174 196 M197 182 L202 196" stroke={W} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M92 198 L87 206 M99 198 L97 207 M106 198 L107 207" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M170 198 L165 206 M177 198 L175 207 M184 198 L185 207" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
    default: return (
      <svg viewBox="0 0 280 280" style={{ width: '100%', height: '100%' }} fill="none">
        <circle cx="140" cy="140" r="100" stroke={W} strokeWidth="2" strokeDasharray="8,6"/>
        <circle cx="140" cy="140" r="60" stroke={F} strokeWidth="1.5"/>
      </svg>
    );
  }
}

// ── INDUSTRY META + ILLUSTRATIONS ────────────────────────────────────────────

const INDUSTRY_META = {
  saas:         { tagline: 'Pipeline velocity for recurring revenue.', desc: 'SaaS growth is a compounding machine when every stage of the customer lifecycle — acquisition, activation, retention, expansion — is optimized together. One leaky stage bleeds all the others.' },
  ecommerce:    { tagline: 'Acquisition, retention, and cart recovery.', desc: 'E-commerce marketing lives and dies in the funnel: getting qualified shoppers in, removing friction from the path to purchase, and building the repeat-purchase behavior that turns CAC into a one-time cost.' },
  realestate:   { tagline: 'Local intent, listing authority, and trust.', desc: 'Real estate marketing is a local game with high-stakes decisions. Authority, visibility at the moment of intent, and consistent trust signals across every touchpoint are what separate the agents who dominate a market from those who compete on commission.' },
  healthcare:   { tagline: 'Compliant growth in a regulated vertical.', desc: 'Healthcare marketing requires navigating HIPAA, patient trust, and intense local competition simultaneously. The practices and systems that grow healthcare brands do so within constraints that eliminate shortcuts and reward long-term investment.' },
  fintech:      { tagline: 'Trust, conversion, and CAC discipline.', desc: 'Fintech brands face the hardest conversion problem in marketing: asking people to trust you with their money. Every channel, every message, every touchpoint either builds or destroys that trust — and CAC compounds accordingly.' },
  logistics:    { tagline: 'B2B demand gen that moves freight and closes deals.', desc: 'Logistics marketing operates in long B2B sales cycles, complex buying committees, and a market where trust is earned through operational excellence, not brand awareness. Content and reputation are the only sustainable differentiation.' },
  professional: { tagline: 'Reputation-led growth and referral loops.', desc: 'Professional services firms grow through expertise visibility, reputation compounding, and referral flywheel activation. The firms that grow fastest treat their knowledge as a marketing asset and invest accordingly.' },
  hospitality:  { tagline: 'Direct bookings and loyalty over OTA dependency.', desc: "Hospitality's biggest marketing challenge isn't traffic — it's margin. OTA dependency erodes profitability on every booking. The brands that win build direct relationships, retention programs, and demand channels that make OTAs optional." },
};

const INDUSTRY_HUE = { saas: 250, ecommerce: 160, realestate: 50, healthcare: 195, fintech: 220, logistics: 30, professional: 290, hospitality: 55 };

function IndustryIllustration({ industryId }) {
  const W = 'rgba(255,255,255,0.90)';
  const F = 'rgba(255,255,255,0.28)';
  const M = 'rgba(255,255,255,0.55)';

  switch (industryId) {
    case 'saas': return ( // Customer lifecycle pipeline
      <svg viewBox="0 0 340 220" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Stage circles */}
        {[['V',46],['T',110],['P',174],['↑',238],['★',302]].map(([label,cx],i)=>(
          <g key={cx}>
            <circle cx={cx} cy={90} r={28} stroke={i===2?W:M} strokeWidth={i===2?2.5:1.8} fill={i===2?F:'none'}/>
            <text x={cx} y={95} textAnchor="middle" fill={W} fontSize={i===2?13:11} fontFamily="monospace" fontWeight="700">{label}</text>
          </g>
        ))}
        {/* Arrows between */}
        {[64,128,192,256].map(x=>(
          <path key={x} d={`M${x} 90 L${x+18} 90`} stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        ))}
        {[64,128,192,256].map(x=>(
          <path key={x+'a'} d={`M${x+14} 86 L${x+18} 90 L${x+14} 94`} stroke={F} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        ))}
        {/* Labels below */}
        {[['Visitor',46],['Trial',110],['Active',174],['Expand',238],['Advocate',302]].map(([l,cx])=>(
          <text key={l} x={cx} y={135} textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">{l}</text>
        ))}
        {/* MRR growth chart */}
        <text x="20" y="168" fill={F} fontSize="8" fontFamily="monospace">MRR</text>
        <polyline points="20,195 65,190 110,180 155,168 200,155 245,138 290,118 320,105" stroke={W} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <polyline points="20,195 65,190 110,180 155,168 200,155 245,138 290,118 320,105 320,210 20,210" fill={W} fillOpacity="0.07" stroke="none"/>
        <line x1="20" y1="210" x2="320" y2="210" stroke={F} strokeWidth="1"/>
        {/* Churn indicator */}
        <path d="M174 118 L174 125 L160 140" stroke={F} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3,2"/>
        <text x="140" y="152" fill={F} fontSize="8" fontFamily="monospace">churn</text>
      </svg>
    );
    case 'ecommerce': return ( // Shopping flow
      <svg viewBox="0 0 360 240" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Product grid */}
        <rect x="16" y="50" width="55" height="130" rx="6" stroke={M} strokeWidth="1.5"/>
        {[[22,57],[46,57],[22,100],[46,100],[22,143],[46,143]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="20" height="30" rx="3" stroke={F} strokeWidth="1.2"/>
        ))}
        <text x="43" y="194" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">Products</text>
        {/* Arrow */}
        <path d="M76 115 L105 115" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M101 111 L105 115 L101 119" stroke={F} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Shopping cart */}
        <path d="M115 85 L128 85 L138 130 L175 130 L183 98 L128 98" stroke={W} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="146" cy="140" r="6" stroke={W} strokeWidth="2"/>
        <circle cx="170" cy="140" r="6" stroke={W} strokeWidth="2"/>
        {[[138,110],[150,106],[163,108]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="10" height="14" rx="2" stroke={F} strokeWidth="1.2"/>
        ))}
        <text x="149" y="160" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">Cart</text>
        {/* Arrow */}
        <path d="M192 115 L218 115" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M214 111 L218 115 L214 119" stroke={F} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Card */}
        <rect x="225" y="90" width="68" height="45" rx="6" stroke={W} strokeWidth="2.2"/>
        <rect x="225" y="90" width="68" height="14" rx="5" fill={F}/>
        <rect x="235" y="114" width="24" height="5" rx="2" stroke={F} strokeWidth="1.2"/>
        <rect x="265" y="114" width="18" height="5" rx="2" stroke={F} strokeWidth="1.2"/>
        <text x="259" y="155" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">Checkout</text>
        {/* Arrow */}
        <path d="M298 115 L320 115" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M316 111 L320 115 L316 119" stroke={F} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Package */}
        <rect x="326" y="90" width="26" height="26" rx="3" stroke={W} strokeWidth="2"/>
        <path d="M326 103 L352 103 M339 90 L339 116" stroke={F} strokeWidth="1.2"/>
        <path d="M332 97 L346 97" stroke={F} strokeWidth="1"/>
        <text x="339" y="130" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">Shipped</text>
        {/* Conversion rate */}
        <text x="180" y="200" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">avg. 2.3% CVR  ·  AOV $124  ·  LTV 3.4×</text>
      </svg>
    );
    case 'realestate': return ( // House with measurements
      <svg viewBox="0 0 300 280" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* House body */}
        <rect x="60" y="140" width="180" height="110" stroke={W} strokeWidth="2.5"/>
        {/* Roof */}
        <path d="M45 140 L150 60 L255 140Z" stroke={W} strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Chimney */}
        <rect x="188" y="72" width="22" height="42" stroke={W} strokeWidth="2"/>
        {/* Door */}
        <rect x="126" y="185" width="48" height="65" rx="3" stroke={W} strokeWidth="2"/>
        <circle cx="168" cy="218" r="4" fill={W}/>
        {/* Windows */}
        <rect x="74" y="158" width="40" height="35" rx="3" stroke={W} strokeWidth="2"/>
        <line x1="94" y1="158" x2="94" y2="193" stroke={F} strokeWidth="1.2"/>
        <line x1="74" y1="175" x2="114" y2="175" stroke={F} strokeWidth="1.2"/>
        <rect x="186" y="158" width="40" height="35" rx="3" stroke={W} strokeWidth="2"/>
        <line x1="206" y1="158" x2="206" y2="193" stroke={F} strokeWidth="1.2"/>
        <line x1="186" y1="175" x2="226" y2="175" stroke={F} strokeWidth="1.2"/>
        {/* Ground */}
        <line x1="30" y1="250" x2="270" y2="250" stroke={F} strokeWidth="1.5"/>
        {/* Path */}
        <path d="M126 250 L110 275 M174 250 L190 275" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        {/* Trees */}
        <line x1="26" y1="250" x2="26" y2="200" stroke={F} strokeWidth="1.5"/>
        <circle cx="26" cy="190" r="18" stroke={F} strokeWidth="1.5"/>
        <line x1="274" y1="250" x2="274" y2="200" stroke={F} strokeWidth="1.5"/>
        <circle cx="274" cy="190" r="18" stroke={F} strokeWidth="1.5"/>
        {/* Dimension lines */}
        <path d="M50 140 L50 250" stroke={F} strokeWidth="1" strokeDasharray="3,3"/>
        <path d="M44 140 L56 140 M44 250 L56 250" stroke={F} strokeWidth="1"/>
        <text x="36" y="200" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace" transform="rotate(-90 36 200)">2,450 sq ft</text>
        <path d="M60 268 L240 268" stroke={F} strokeWidth="1" strokeDasharray="3,3"/>
        <path d="M60 262 L60 274 M240 262 L240 274" stroke={F} strokeWidth="1"/>
        <text x="150" y="278" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">60 ft</text>
        {/* Sold tag */}
        <rect x="195" y="58" width="46" height="18" rx="4" fill={W} fillOpacity="0.15" stroke={W} strokeWidth="1.2"/>
        <text x="218" y="70" textAnchor="middle" fill={W} fontSize="9" fontFamily="monospace" fontWeight="700">SOLD</text>
      </svg>
    );
    case 'healthcare': return ( // ECG + cross
      <svg viewBox="0 0 340 240" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Medical cross */}
        <rect x="138" y="30" width="64" height="64" rx="8" stroke={W} strokeWidth="2.5"/>
        <rect x="118" y="50" width="104" height="24" rx="4" fill={F} stroke={W} strokeWidth="1.5"/>
        <rect x="148" y="20" width="44" height="84" rx="4" fill={F} stroke={W} strokeWidth="1.5"/>
        {/* ECG line */}
        <polyline points="20,155 60,155 72,155 82,120 90,185 100,130 110,155 150,155 158,155 340,155" stroke={W} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Grid lines */}
        {[80,120,160,200,240,280,320].map(x=>(
          <line key={x} x1={x} y1="130" x2={x} y2="180" stroke={F} strokeWidth="0.8" opacity="0.4"/>
        ))}
        {[130,155,180].map(y=>(
          <line key={y} x1="20" y1={y} x2="340" y2={y} stroke={F} strokeWidth="0.8" opacity="0.4"/>
        ))}
        {/* BPM label */}
        <rect x="245" y="118" width="66" height="26" rx="5" fill={F} stroke={W} strokeWidth="1.2"/>
        <text x="278" y="128" textAnchor="middle" fill={W} fontSize="8" fontFamily="monospace">BPM</text>
        <text x="278" y="140" textAnchor="middle" fill={W} fontSize="12" fontFamily="monospace" fontWeight="700">72</text>
        {/* DNA helix hint */}
        <path d="M28 190 C36 182 44 198 52 190 C60 182 68 198 76 190 C84 182 92 198 100 190" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M28 200 C36 208 44 192 52 200 C60 208 68 192 76 200 C84 208 92 192 100 200" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        {[36,52,68,84,100].map(x=>(
          <line key={x} x1={x} y1="190" x2={x} y2="200" stroke={F} strokeWidth="1" opacity="0.5"/>
        ))}
        <text x="60" y="218" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">genomics</text>
      </svg>
    );
    case 'fintech': return ( // Circuit network with currency
      <svg viewBox="0 0 320 260" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Center node */}
        <circle cx="160" cy="125" r="36" fill={F} stroke={W} strokeWidth="2.5"/>
        <text x="160" y="118" textAnchor="middle" fill={W} fontSize="18" fontFamily="monospace" fontWeight="700">$</text>
        <text x="160" y="136" textAnchor="middle" fill={W} fontSize="8" fontFamily="monospace">LEDGER</text>
        {/* Satellite nodes */}
        {[[160,32],[254,72],[272,178],[160,220],[66,178],[48,72]].map(([cx,cy],i)=>{
          const labels=['🔐','↑','💳','📊','🏦','⚡'];
          return (<g key={i}>
            <line x1="160" y1="125" x2={cx} y2={cy} stroke={F} strokeWidth="1.2" strokeDasharray="5,4"/>
            <circle cx={cx} cy={cy} r="20" stroke={M} strokeWidth="1.8"/>
            <text x={cx} y={cy+4} textAnchor="middle" fill={W} fontSize="12">{labels[i]}</text>
          </g>);
        })}
        {/* Circuit corner decorations */}
        <path d="M20 20 L20 50 L50 50" stroke={F} strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M300 20 L300 50 L270 50" stroke={F} strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M20 240 L20 210 L50 210" stroke={F} strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M300 240 L300 210 L270 210" stroke={F} strokeWidth="1.2" strokeLinecap="round"/>
        {/* TXN flow dots */}
        {[[108,65],[220,178],[75,165],[245,85]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3" fill={W} opacity="0.7"/>
        ))}
      </svg>
    );
    case 'logistics': return ( // Route map with truck
      <svg viewBox="0 0 360 240" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Route path */}
        <path d="M54 165 C80 165 90 120 130 120 C170 120 175 155 215 150 C255 145 268 110 305 110" stroke={W} strokeWidth="2" strokeLinecap="round" strokeDasharray="8,5"/>
        {/* Waypoints */}
        {[[130,120],[215,150]].map(([cx,cy])=>(
          <g key={cx}>
            <circle cx={cx} cy={cy} r="8" fill={F} stroke={W} strokeWidth="1.8"/>
            <circle cx={cx} cy={cy} r="3" fill={W}/>
          </g>
        ))}
        {/* Truck (side view) */}
        <rect x="16" y="148" width="52" height="30" rx="4" stroke={W} strokeWidth="2.2"/>
        <path d="M68 148 L80 148 L90 162 L90 178 L68 178" stroke={W} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="70" y="150" width="16" height="14" rx="2" stroke={F} strokeWidth="1.4"/>
        <circle cx="28" cy="178" r="8" stroke={W} strokeWidth="2"/> <circle cx="28" cy="178" r="3" fill={W}/>
        <circle cx="68" cy="178" r="8" stroke={W} strokeWidth="2"/> <circle cx="68" cy="178" r="3" fill={W}/>
        <circle cx="84" cy="178" r="8" stroke={W} strokeWidth="2"/> <circle cx="84" cy="178" r="3" fill={W}/>
        {/* Warehouse */}
        <rect x="300" y="88" width="50" height="50" stroke={W} strokeWidth="2.2"/>
        <path d="M295 88 L325 72 L355 88" stroke={W} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="312" y="110" width="20" height="28" rx="1" stroke={F} strokeWidth="1.5"/>
        {/* Packages */}
        {[[310,152],[328,152],[310,168],[328,168]].map(([x,y])=>(
          <rect key={x+y} x={x} y={y} width="14" height="12" rx="2" stroke={F} strokeWidth="1.2"/>
        ))}
        {/* KPIs */}
        <text x="180" y="210" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">ETA: 2 days  ·  94.2% on-time  ·  12 stops</text>
      </svg>
    );
    case 'professional': return ( // Org chart
      <svg viewBox="0 0 320 260" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Briefcase at top */}
        <rect x="132" y="22" width="56" height="40" rx="6" stroke={W} strokeWidth="2.2"/>
        <path d="M148 22 L148 16 Q148 10 160 10 Q172 10 172 16 L172 22" stroke={W} strokeWidth="2" strokeLinecap="round"/>
        <line x1="132" y1="38" x2="188" y2="38" stroke={F} strokeWidth="1.5"/>
        {/* Top box */}
        <rect x="122" y="75" width="76" height="32" rx="5" fill={F} stroke={W} strokeWidth="2"/>
        <text x="160" y="95" textAnchor="middle" fill={W} fontSize="10" fontFamily="monospace" fontWeight="700">PARTNER</text>
        {/* Lines down */}
        <line x1="160" y1="107" x2="160" y2="125" stroke={F} strokeWidth="1.5"/>
        <line x1="80" y1="125" x2="240" y2="125" stroke={F} strokeWidth="1.5"/>
        <line x1="80" y1="125" x2="80" y2="140" stroke={F} strokeWidth="1.5"/>
        <line x1="240" y1="125" x2="240" y2="140" stroke={F} strokeWidth="1.5"/>
        {/* Level 2 boxes */}
        {[[40,140,68,'SENIOR'],[172,140,68,'SENIOR']].map(([x,y,w,t])=>(
          <g key={x}>
            <rect x={x} y={y} width={w} height={28} rx="4" stroke={M} strokeWidth="1.8"/>
            <text x={x+w/2} y={y+17} textAnchor="middle" fill={W} fontSize="8" fontFamily="monospace">{t}</text>
          </g>
        ))}
        {/* Lines down level 2 */}
        <line x1="74" y1="168" x2="74" y2="185" stroke={F} strokeWidth="1.2"/>
        <line x1="34" y1="185" x2="114" y2="185" stroke={F} strokeWidth="1.2"/>
        <line x1="206" y1="168" x2="206" y2="185" stroke={F} strokeWidth="1.2"/>
        <line x1="166" y1="185" x2="246" y2="185" stroke={F} strokeWidth="1.2"/>
        {[14,54,94,146,186,226].map(x=>(
          <g key={x}>
            <line x1={x+20} y1="185" x2={x+20} y2="196" stroke={F} strokeWidth="1.2"/>
            <rect x={x} y={196} width="40" height="22" rx="3" stroke={F} strokeWidth="1.2"/>
            <line x1={x+8} y1="204" x2={x+32} y2="204" stroke={F} strokeWidth="1" opacity="0.5"/>
            <line x1={x+8} y1="210" x2={x+28} y2="210" stroke={F} strokeWidth="1" opacity="0.5"/>
          </g>
        ))}
        {/* Legend */}
        <text x="160" y="235" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">6 practice areas  ·  42 consultants</text>
      </svg>
    );
    case 'hospitality': return ( // Hotel building
      <svg viewBox="0 0 280 300" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Stars */}
        {[70,98,126,154,182].map((x,i)=>(
          <text key={i} x={x} y="32" textAnchor="middle" fill={W} fontSize="14">★</text>
        ))}
        {/* Building */}
        <rect x="40" y="42" width="200" height="210" stroke={W} strokeWidth="2.5"/>
        {/* Windows grid: 4 cols × 5 rows */}
        {[0,1,2,3,4].flatMap(row=>[0,1,2,3].map(col=>{
          const x=55+col*44; const y=58+row*36;
          return (<rect key={`${row}-${col}`} x={x} y={y} width="24" height="20" rx="2" fill={row===2&&col===1?F:'none'} stroke={F} strokeWidth="1.4"/>);
        }))}
        {/* Hotel sign */}
        <rect x="90" y="48" width="100" height="20" rx="3" fill={F} stroke={W} strokeWidth="1.2"/>
        <text x="140" y="62" textAnchor="middle" fill={W} fontSize="9" fontFamily="monospace" fontWeight="700">GRAND HOTEL</text>
        {/* Entrance awning */}
        <path d="M90 252 L95 240 L185 240 L190 252" stroke={W} strokeWidth="2"/>
        <line x1="95" y1="240" x2="185" y2="240" stroke={W} strokeWidth="1.5"/>
        {/* Door */}
        <rect x="110" y="218" width="60" height="34" rx="2" stroke={W} strokeWidth="2"/>
        <line x1="140" y1="218" x2="140" y2="252" stroke={F} strokeWidth="1.4"/>
        <circle cx="134" cy="235" r="3" fill={W}/>
        {/* Ground */}
        <line x1="20" y1="252" x2="260" y2="252" stroke={F} strokeWidth="1.5"/>
        {/* Flags */}
        <line x1="40" y1="42" x2="40" y2="12" stroke={F} strokeWidth="1.5"/>
        <path d="M40 12 L60 18 L40 24" fill={F} stroke={F} strokeWidth="1"/>
        <line x1="240" y1="42" x2="240" y2="12" stroke={F} strokeWidth="1.5"/>
        <path d="M240 12 L220 18 L240 24" fill={F} stroke={F} strokeWidth="1"/>
        {/* Concierge */}
        <text x="140" y="274" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">Occupancy 94%  ·  ADR $289  ·  RevPAR $272</text>
      </svg>
    );
    default: return (
      <svg viewBox="0 0 280 280" fill="none" style={{ width:'100%',height:'100%' }}>
        <circle cx="140" cy="140" r="100" stroke={W} strokeWidth="2" strokeDasharray="8,6"/>
      </svg>
    );
  }
}

// ── NICHE HUB PAGE ────────────────────────────────────────────────────────────

function NicheHubPage({ niche, onNavigate }) {
  const hub = niche || NICHES[0];
  const nicheArticles = ARTICLES.filter(a => a.niche === hub.name || a.industry === hub.name);
  const allArticles = nicheArticles.length > 0 ? nicheArticles : ARTICLES.slice(0, 4);
  const [openFaq, setOpenFaq] = useState(null);

  const isIndustry = !!INDUSTRIES.find(i => i.id === hub.id);
  const animalData = !isIndustry ? (NICHE_ANIMALS[hub.id] || NICHE_ANIMALS.seo) : null;
  const industryData = isIndustry ? (INDUSTRY_META[hub.id] || INDUSTRY_META.saas) : null;
  const meta = isIndustry ? industryData : animalData;

  const hue = isIndustry ? (INDUSTRY_HUE[hub.id] || 250) : (NICHE_HUE[hub.id] || 160);
  const heroBg = `oklch(0.17 0.055 ${hue})`;
  const heroAccent = `oklch(0.42 0.14 ${hue})`;

  const faqs = [
    { q: `What is ${hub.name} and why does it matter?`, a: `${hub.name} is a critical growth lever for modern businesses. ${animalData.desc}` },
    { q: `How long before I see results from ${hub.name}?`, a: 'Results depend on starting point, competition, and execution quality. Most businesses see meaningful movement within 3–6 months. Measuring leading indicators gives you early validation before revenue attribution catches up.' },
    { q: `What budget should I allocate to ${hub.name}?`, a: 'Work backwards from outcome to investment. Define what success looks like in 12 months and what it would be worth, then set a realistic budget that could actually produce those results rather than starting from an arbitrary number.' },
    { q: `Should I hire in-house or use an agency for ${hub.name}?`, a: 'In-house is best for consistent execution over time. Agencies shine for specialized expertise on demand or faster scaling than hiring allows. Most mature marketing orgs leverage both strategically.' },
  ];

  const SUBTOPICS = ['Getting Started', 'Strategy & Planning', 'Technical Setup', 'Measurement', 'Advanced Tactics', 'Case Studies', 'Tools & Stack', 'Industry Applications'];

  return (
    <main id="main-content" className="page-enter">

      {/* ── HERO ── */}
      <div style={{ background: heroBg, borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(ellipse at 68% 50%, ${heroAccent}18 0%, transparent 65%)`, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${heroAccent}40, transparent)` }}></div>
        <div className="container" style={{ padding: '52px 24px 60px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'center' }}>

            {/* Left: content */}
            <div>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 22 }}>
                {[['home','Home'],['blog','Channels']].map(([page,label],i) => (
                  <React.Fragment key={page}>
                    {i > 0 && <span>›</span>}
                    <span onClick={() => onNavigate(page)} style={{ cursor: 'pointer', transition: 'color 150ms' }}
                      onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.75)'}
                      onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.38)'}>{label}</span>
                  </React.Fragment>
                ))}
                <span>›</span>
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>{hub.name}</span>
              </div>

              {/* Channel/industry badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 6, padding: '5px 14px', marginBottom: 20 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: hub.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 7, fontWeight: 800, color: 'white', letterSpacing: '0.02em' }}>{hub.abbr}</span>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{isIndustry ? 'Industry' : 'Marketing Channel'}</span>
              </div>

              {/* H1 */}
              <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 58px)', fontWeight: 800, color: 'white', letterSpacing: '-0.042em', lineHeight: 1.04, marginBottom: 14 }}>{hub.name}</h1>

              {/* Tagline */}
              <p style={{ fontSize: 17, color: `oklch(0.72 0.06 ${hue})`, fontStyle: 'italic', fontFamily: 'var(--font-serif)', marginBottom: 16, lineHeight: 1.4 }}>
                "{meta.tagline}"
              </p>

              {/* Description */}
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', lineHeight: 1.72, maxWidth: 480, marginBottom: 30 }}>{meta.desc}</p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                <button className="btn btn-primary btn-lg" onClick={() => onNavigate('blog')}>
                  Explore {hub.count} guides
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)' }} onClick={() => onNavigate('resources')}>
                  Free templates
                </button>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 0, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                {[[`${hub.count || 30}+`,'Guides'], ['All levels','Skill level'], ['2026','Last updated']].map(([val,lbl],i) => (
                  <div key={lbl} style={{ paddingRight: i < 2 ? 28 : 0, paddingLeft: i > 0 ? 28 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>{val}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: animal illustration */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ width: '100%', maxWidth: 320, aspectRatio: '1/0.88', background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${hub.color}1a 0%, transparent 70%)` }}></div>
                <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
                  {isIndustry
                    ? <IndustryIllustration industryId={hub.id} />
                    : <AnimalIllustration nicheId={hub.id} />
                  }
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ height: 1, width: 20, background: 'rgba(255,255,255,0.18)' }}></div>
                <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
                  {isIndustry ? hub.name : `The ${animalData.name}`}
                </span>
                <div style={{ height: 1, width: 20, background: 'rgba(255,255,255,0.18)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PILLAR GUIDES ── */}
      <section style={{ padding: '72px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <AppearSection>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: hub.color, marginBottom: 8 }}>Start Here</div>
                <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, letterSpacing: '-0.03em' }}>Pillar content for {hub.name}</h2>
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 8, maxWidth: 440 }}>The guides we recommend reading first. They set the frameworks everything else builds on.</p>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('blog')}>View all →</button>
            </div>
            <div className="grid-3">
              {(allArticles.length > 0 ? allArticles : ARTICLES).slice(0,3).map(a => (
                <ArticleCard key={a.id} article={a} onClick={art => onNavigate('article', art)} accentColor={hub.color} />
              ))}
            </div>
          </AppearSection>
        </div>
      </section>

      {/* ── TOPIC NAVIGATOR ── */}
      <section style={{ padding: '64px 0', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <AppearSection>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: hub.color, marginBottom: 8 }}>Sub-topics</div>
              <h2 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, letterSpacing: '-0.03em' }}>Navigate by focus area</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {SUBTOPICS.map((topic, i) => (
                <div key={topic} style={{ padding: '16px 18px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', transition: 'all 160ms', display: 'flex', alignItems: 'center', gap: 12 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = hub.color; e.currentTarget.style.boxShadow = `0 0 0 3px ${hub.color}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: 32, height: 32, borderRadius: 'var(--r)', background: hub.bg || 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: hub.color }}></div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>{topic}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{3+(i*3%8)} articles</div>
                  </div>
                </div>
              ))}
            </div>
          </AppearSection>
        </div>
      </section>

      {/* ── LATEST ARTICLES ── */}
      <section style={{ padding: '72px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <AppearSection>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: hub.color, marginBottom: 8 }}>Latest</div>
                <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, letterSpacing: '-0.03em' }}>Recent {hub.name} guides</h2>
              </div>
              <button className="btn btn-ghost" onClick={() => onNavigate('blog')}>View all →</button>
            </div>
            <div className="grid-3">
              {ARTICLES.slice(0,6).map(a => <ArticleCard key={a.id} article={a} onClick={art => onNavigate('article', art)} />)}
            </div>
          </AppearSection>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section style={{ padding: '64px 0', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <AppearSection>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: hub.color, marginBottom: 8 }}>Free Resources</div>
              <h2 style={{ fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, letterSpacing: '-0.03em' }}>Tools and templates for {hub.name}</h2>
            </div>
            <div className="grid-3">
              {RESOURCES.slice(0,3).map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          </AppearSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '72px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-sm">
          <AppearSection>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: hub.color, marginBottom: 8 }}>FAQ</div>
              <h2 style={{ fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, letterSpacing: '-0.03em' }}>Common questions about {hub.name}</h2>
            </div>
            {faqs.map((f, i) => <FAQItem key={i} question={f.q} answer={f.a} />)}
          </AppearSection>
        </div>
      </section>

      <div className="section"><div className="container"><NewsletterSignup /></div></div>
    </main>
  );
}

// ── RESOURCES PAGE ────────────────────────────────────────────────────────────

function ResourcesPage({ onNavigate }) {
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

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────

const TEAM = [
  { name: 'Maya Chen', role: 'Head of SEO & Co-founder', initials: 'MC', bio: 'Led SEO at two Series B startups. Ran 200+ technical audits. Formerly Search Analyst at Google.', expertise: ['Technical SEO', 'Content Strategy', 'Analytics'] },
  { name: 'Jordan Walsh', role: 'PPC Lead & Co-founder', initials: 'JW', bio: 'Managed $24M+ in Google and Meta ad spend. Ex-agency director. Obsessed with Quality Score mechanics and bidding strategy.', expertise: ['Google Ads', 'Meta Ads', 'LinkedIn Ads'] },
  { name: 'Sam Rivera', role: 'Content Strategist', initials: 'SR', bio: 'Former editor at a top 50 marketing publication. Built content programs from zero to 200k monthly sessions at three companies.', expertise: ['Content Strategy', 'Editorial', 'Distribution'] },
  { name: 'Priya Sharma', role: 'Email & CRM Lead', initials: 'PS', bio: 'Managed email programs for 8 e-commerce brands. Expert in deliverability, segmentation, and lifecycle automation.', expertise: ['Email Marketing', 'CRM', 'Automation'] },
];

function AboutPage({ onNavigate }) {
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
            The AI GTM Engineer exists because the internet is full of marketing content that teaches you marketing content exists, not how to actually grow a business. After running dozens of audits and campaigns, we started writing the resource we wished we'd had when we started.
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
            <p className="section-sub">Everyone who writes for The AI GTM Engineer has run the plays they write about. We don't publish theory.</p>
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
              ['2025', 'Crossed 10,000 weekly readers', 'Purely organic. Every reader came from referrals, search, or social sharing. We\'ve never run a paid acquisition campaign for The AI GTM Engineer itself.'],
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

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────

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
    { mark: '→', title: 'General inquiries', detail: 'hello@aigtmengineer.com', note: 'Response within 2 business days' },
    { mark: '+', title: 'Partnerships', detail: 'partnerships@aigtmengineer.com', note: 'Tool integrations and co-marketing' },
    { mark: '/', title: 'Guest contributions', detail: 'editorial@aigtmengineer.com', note: 'Pitch guidelines on our About page' },
    { mark: '*', title: 'Press', detail: 'press@aigtmengineer.com', note: 'Media kit available on request' },
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

// ── RESOURCE ILLUSTRATIONS (innovation imagery) ───────────────────────────────

function ResourceIllustration({ type }) {
  const W = 'rgba(255,255,255,0.92)';
  const F = 'rgba(255,255,255,0.28)';
  const M = 'rgba(255,255,255,0.55)';

  switch (type) {
    case 'playbooks': return ( // ROCKET
      <svg viewBox="0 0 280 340" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Stars */}
        {[[30,40],[250,30],[270,120],[20,160],[255,200],[40,260]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={1.5+i%2} fill={W} opacity="0.6"/>
        ))}
        {/* Launch tower */}
        <line x1="58" y1="290" x2="58" y2="80" stroke={F} strokeWidth="2" strokeLinecap="round"/>
        <line x1="48" y1="80" x2="68" y2="80" stroke={F} strokeWidth="1.5"/>
        {[100,130,160,190,220,250].map(y=>(
          <line key={y} x1="48" y1={y} x2="68" y2={y} stroke={F} strokeWidth="1" opacity="0.6"/>
        ))}
        {[84,98,112,126].map((y,i)=>(
          <line key={y} x1="68" y1={y} x2={90+i*4} y2={y} stroke={F} strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
        ))}
        {/* Rocket body */}
        <path d="M140 30 C128 50 118 80 118 140 L162 140 C162 80 152 50 140 30Z" stroke={W} strokeWidth="2.5" fill={F}/>
        {/* Nose cone */}
        <path d="M118 140 L118 180 L162 180 L162 140" stroke={W} strokeWidth="2" fill={F}/>
        {/* Window */}
        <circle cx="140" cy="110" r="14" stroke={W} strokeWidth="2.2"/>
        <circle cx="140" cy="110" r="8" stroke={F} strokeWidth="1.5"/>
        <circle cx="137" cy="107" r="3" fill={W} opacity="0.5"/>
        {/* Fins */}
        <path d="M118 170 L90 210 L118 195" stroke={W} strokeWidth="2.2" fill={F} strokeLinejoin="round"/>
        <path d="M162 170 L190 210 L162 195" stroke={W} strokeWidth="2.2" fill={F} strokeLinejoin="round"/>
        {/* Engine nozzle */}
        <path d="M124 180 L116 200 L164 200 L156 180" stroke={W} strokeWidth="2"/>
        {/* Flame */}
        <path d="M124 200 C128 220 132 240 140 260 C148 240 152 220 156 200" stroke={W} strokeWidth="2" strokeLinecap="round" fill={F}/>
        <path d="M130 200 C133 215 137 228 140 240 C143 228 147 215 150 200" stroke={W} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        {/* Exhaust rings */}
        <ellipse cx="140" cy="204" rx="18" ry="4" stroke={F} strokeWidth="1.2"/>
        <ellipse cx="140" cy="218" rx="14" ry="3" stroke={F} strokeWidth="1" opacity="0.6"/>
        {/* Altitude marker */}
        <text x="200" y="100" fill={F} fontSize="9" fontFamily="monospace">T+02:30</text>
        <text x="200" y="114" fill={F} fontSize="9" fontFamily="monospace">ALT 12km</text>
        <text x="200" y="128" fill={F} fontSize="9" fontFamily="monospace">MACH 1.4</text>
      </svg>
    );
    case 'toolkits': return ( // TOOLBOX
      <svg viewBox="0 0 320 260" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Box body */}
        <rect x="40" y="130" width="240" height="110" rx="8" stroke={W} strokeWidth="2.5" fill={F}/>
        {/* Box lid (open) */}
        <path d="M40 130 L40 90 Q40 82 48 82 L272 82 Q280 82 280 90 L280 130" stroke={W} strokeWidth="2.5" fill="rgba(255,255,255,0.06)"/>
        {/* Lid hinge */}
        <rect x="38" y="126" width="244" height="10" rx="4" fill={F} stroke={W} strokeWidth="1.5"/>
        {/* Handle */}
        <path d="M110 82 C110 60 170 60 170 82" stroke={W} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* Compartments in box */}
        <line x1="40" y1="165" x2="280" y2="165" stroke={F} strokeWidth="1.2"/>
        <line x1="160" y1="165" x2="160" y2="240" stroke={F} strokeWidth="1.2"/>
        <line x1="100" y1="165" x2="100" y2="240" stroke={F} strokeWidth="1"/>
        <line x1="220" y1="165" x2="220" y2="240" stroke={F} strokeWidth="1"/>
        {/* Wrench left */}
        <path d="M68 100 C62 88 64 78 72 76 C76 75 80 77 80 77 L95 100 L88 107 L68 100Z" stroke={W} strokeWidth="2"  fill={F}/>
        <path d="M88 107 L112 138" stroke={W} strokeWidth="5" strokeLinecap="round"/>
        <path d="M115 135 C121 141 119 151 113 153 C109 154 105 152 105 152 L90 129 L97 122 L115 135Z" stroke={W} strokeWidth="2" fill={F}/>
        {/* Screwdriver */}
        <line x1="148" y1="78" x2="188" y2="140" stroke={W} strokeWidth="4" strokeLinecap="round"/>
        <path d="M144 74 L152 82 L148 86 L140 78 Z" fill={W}/>
        <rect x="182" y="134" width="12" height="18" rx="2" fill={F} stroke={W} strokeWidth="1.5" transform="rotate(45 188 143)"/>
        {/* Hammer */}
        <line x1="210" y1="78" x2="222" y2="125" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="196" y="68" width="28" height="18" rx="4" fill={F} stroke={W} strokeWidth="2"/>
        {/* Small tools in compartments */}
        {[[52,180],[75,200],[52,220],[125,180],[135,210],[175,175],[185,205],[245,180],[260,205]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="5" stroke={F} strokeWidth="1.2"/>
        ))}
      </svg>
    );
    case 'templates': return ( // BLUEPRINT
      <svg viewBox="0 0 320 280" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Grid */}
        {[0,1,2,3,4,5,6,7,8,9,10].map(i=>(
          <line key={'v'+i} x1={28+i*28} y1="20" x2={28+i*28} y2="260" stroke={F} strokeWidth="0.7" opacity="0.4"/>
        ))}
        {[0,1,2,3,4,5,6,7,8].map(i=>(
          <line key={'h'+i} x1="28" y1={20+i*30} x2="300" y2={20+i*30} stroke={F} strokeWidth="0.7" opacity="0.4"/>
        ))}
        {/* Floor plan outline */}
        <path d="M60 50 L60 200 L200 200 L200 130 L260 130 L260 50 Z" stroke={W} strokeWidth="2.5" fill="rgba(255,255,255,0.05)"/>
        {/* Interior walls */}
        <line x1="60" y1="130" x2="140" y2="130" stroke={W} strokeWidth="2"/>
        <line x1="140" y1="80" x2="140" y2="200" stroke={W} strokeWidth="2"/>
        {/* Doors (arc indicators) */}
        <path d="M60 110 Q76 110 76 126" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M140 90 Q156 90 156 106" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        {/* Room labels */}
        <text x="95" y="105" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">LIVING</text>
        <text x="95" y="170" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">KITCHEN</text>
        <text x="178" y="95" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">BED</text>
        <text x="232" y="95" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">BED</text>
        {/* Dimension arrows */}
        <path d="M46 50 L46 200" stroke={M} strokeWidth="1"/> 
        <path d="M40 50 L52 50 M40 200 L52 200" stroke={M} strokeWidth="1"/>
        <text x="34" y="130" textAnchor="middle" fill={M} fontSize="8" fontFamily="monospace" transform="rotate(-90 34 130)">45'-0"</text>
        <path d="M60 214 L260 214" stroke={M} strokeWidth="1"/>
        <path d="M60 208 L60 220 M260 208 L260 220" stroke={M} strokeWidth="1"/>
        <text x="160" y="228" textAnchor="middle" fill={M} fontSize="8" fontFamily="monospace">85'-6"</text>
        {/* Compass */}
        <circle cx="276" cy="56" r="18" stroke={F} strokeWidth="1.5"/>
        <path d="M276 40 L276 72 M260 56 L292 56" stroke={F} strokeWidth="1"/>
        <text x="276" y="44" textAnchor="middle" fill={W} fontSize="9" fontFamily="monospace" fontWeight="700">N</text>
        {/* Title block */}
        <rect x="28" y="248" width="264" height="24" stroke={F} strokeWidth="1.2"/>
        <line x1="140" y1="248" x2="140" y2="272" stroke={F} strokeWidth="1"/>
        <text x="84" y="263" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">PROJECT: ATLAS HQ</text>
        <text x="210" y="263" textAnchor="middle" fill={F} fontSize="8" fontFamily="monospace">SCALE 1:50  REV.3</text>
      </svg>
    );
    case 'podcast': return ( // MICROPHONE
      <svg viewBox="0 0 280 340" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Sound waves - outer */}
        <path d="M56 120 C32 140 32 190 56 210" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40 104 C8 130 8 200 40 226" stroke={F} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M224 120 C248 140 248 190 224 210" stroke={F} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M240 104 C272 130 272 200 240 226" stroke={F} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        {/* Mic capsule */}
        <path d="M100 50 Q100 20 140 20 Q180 20 180 50 L180 180 Q180 210 140 210 Q100 210 100 180 Z" stroke={W} strokeWidth="2.5" fill={F}/>
        {/* Grille lines */}
        {[70,90,110,130,150,170].map(y=>(
          <line key={y} x1="104" y1={y} x2="176" y2={y} stroke={W} strokeWidth="1" opacity="0.4"/>
        ))}
        {/* Vertical dividers */}
        {[118,130,140,150,162].map(x=>(
          <line key={x} x1={x} y1="48" x2={x} y2="205" stroke={W} strokeWidth="0.8" opacity="0.25"/>
        ))}
        {/* Body band */}
        <rect x="100" y="172" width="80" height="16" rx="0" fill="rgba(255,255,255,0.08)" stroke={W} strokeWidth="1.5"/>
        {/* Neck */}
        <rect x="130" y="210" width="20" height="50" rx="4" stroke={W} strokeWidth="2"/>
        {/* Base */}
        <path d="M90 260 C90 250 115 245 140 245 C165 245 190 250 190 260 L196 280 L84 280 Z" stroke={W} strokeWidth="2" fill={F}/>
        <ellipse cx="140" cy="280" rx="60" ry="8" stroke={W} strokeWidth="1.8"/>
        {/* On-air indicator */}
        <rect x="155" y="28" width="46" height="18" rx="4" fill="rgba(255,50,50,0.3)" stroke="rgba(255,100,100,0.7)" strokeWidth="1.2"/>
        <text x="178" y="40" textAnchor="middle" fill="rgba(255,150,150,0.9)" fontSize="8" fontFamily="monospace" fontWeight="700">ON AIR</text>
        {/* Audio waveform at bottom */}
        {[-5,-3,-1,2,-1,3,-5,1,-2,4,-3,2,-4,1,-2].map((h,i)=>(
          <line key={i} x1={86+i*8} y1={308-Math.abs(h)*3} x2={86+i*8} y2={308+Math.abs(h)*3} stroke={W} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
        ))}
      </svg>
    );
    case 'videos': return ( // CLAPPERBOARD + FILM
      <svg viewBox="0 0 320 280" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Clapperboard body */}
        <rect x="50" y="80" width="220" height="160" rx="8" stroke={W} strokeWidth="2.5" fill={F}/>
        {/* Clap top */}
        <rect x="50" y="48" width="220" height="42" rx="6" stroke={W} strokeWidth="2.5" fill="rgba(255,255,255,0.08)"/>
        {/* Diagonal stripes on clap */}
        {[-4,-2,0,2,4,6,8,10,12].map(i=>(
          <path key={i} d={`M${50+i*22} 48 L${50+i*22+28} 90`} stroke={W} strokeWidth="8" strokeLinecap="butt" opacity={i%2===0?0.5:0.15}/>
        ))}
        {/* Hinge */}
        <rect x="50" y="87" width="220" height="6" rx="2" fill={F} stroke={W} strokeWidth="1.2"/>
        {/* Clap board line */}
        <line x1="50" y1="90" x2="270" y2="90" stroke={W} strokeWidth="2.5"/>
        {/* Text inside */}
        <text x="160" y="116" textAnchor="middle" fill={F} fontSize="10" fontFamily="monospace">SCENE 12 / TAKE 3</text>
        <line x1="70" y1="126" x2="250" y2="126" stroke={F} strokeWidth="1"/>
        <text x="160" y="142" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">ROLL: B  CAM: 01</text>
        <line x1="70" y1="150" x2="250" y2="150" stroke={F} strokeWidth="1"/>
        <text x="160" y="165" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">DIR: J. WALSH</text>
        <line x1="70" y1="173" x2="250" y2="173" stroke={F} strokeWidth="1"/>
        <text x="160" y="188" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">DATE: APR 2026</text>
        {/* Film reel bottom left */}
        <circle cx="85" cy="222" r="28" stroke={W} strokeWidth="2"/>
        <circle cx="85" cy="222" r="10" stroke={W} strokeWidth="1.8"/>
        <circle cx="85" cy="222" r="4" fill={W}/>
        {[0,60,120,180,240,300].map(deg=>(
          <line key={deg} x1={85+10*Math.cos(deg*Math.PI/180)} y1={222+10*Math.sin(deg*Math.PI/180)} x2={85+28*Math.cos(deg*Math.PI/180)} y2={222+28*Math.sin(deg*Math.PI/180)} stroke={F} strokeWidth="1.5"/>
        ))}
        {/* Film strip bottom right */}
        <rect x="136" y="206" width="134" height="44" rx="4" stroke={W} strokeWidth="1.8"/>
        {[142,162,182,202,222,242,258].map(x=>(
          <rect key={x} x={x} y="210" width="8" height="6" rx="1" fill={F}/>
        ))}
        {[142,162,182,202,222,242,258].map(x=>(
          <rect key={x} x={x} y="236" width="8" height="6" rx="1" fill={F}/>
        ))}
        {[148,168,188,208,228,248].map(x=>(
          <rect key={x} x={x} y="218" width="14" height="16" rx="1" stroke={F} strokeWidth="1"/>
        ))}
      </svg>
    );
    case 'glossary': return ( // TYPOGRAPHY SPECIMEN
      <svg viewBox="0 0 300 320" fill="none" style={{ width:'100%',height:'100%' }}>
        {/* Open book outline */}
        <path d="M30 40 L30 280 Q30 290 40 290 L148 280 L150 280 L152 280 L260 290 Q270 290 270 280 L270 40 Q270 30 260 30 L152 40 L150 42 L148 40 L40 30 Q30 30 30 40Z" stroke={W} strokeWidth="2" fill={F}/>
        <line x1="150" y1="42" x2="150" y2="280" stroke={W} strokeWidth="1.8"/>
        {/* Spine shadow */}
        <path d="M146 40 L146 282" stroke={F} strokeWidth="3" opacity="0.3"/>
        <path d="M154 40 L154 282" stroke={F} strokeWidth="3" opacity="0.3"/>
        {/* Left page - Big 'A' */}
        <text x="88" y="180" textAnchor="middle" fill={W} fontSize="108" fontFamily="Georgia,serif" opacity="0.85">A</text>
        {/* Annotation lines on left */}
        <line x1="42" y1="88" x2="134" y2="88" stroke={M} strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="42" y1="148" x2="134" y2="148" stroke={M} strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="42" y1="190" x2="134" y2="190" stroke={M} strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="42" y1="215" x2="134" y2="215" stroke={M} strokeWidth="1"/>
        <text x="36" y="84" fill={F} fontSize="7" fontFamily="monospace">Cap height</text>
        <text x="36" y="144" fill={F} fontSize="7" fontFamily="monospace">x-height</text>
        <text x="36" y="186" fill={F} fontSize="7" fontFamily="monospace">baseline</text>
        {/* Right page - dictionary entry */}
        <text x="162" y="68" fill={W} fontSize="13" fontFamily="monospace" fontWeight="700">GTM</text>
        <text x="162" y="82" fill={F} fontSize="8" fontFamily="monospace">/ˌdʒiːtiːˈem/</text>
        <text x="162" y="96" fill={F} fontSize="7.5" fontFamily="monospace" fontStyle="italic">noun, abbrev.</text>
        <line x1="162" y1="102" x2="258" y2="102" stroke={F} strokeWidth="0.8"/>
        <text x="162" y="115" fill={M} fontSize="7.5" fontFamily="monospace">1. Go-to-Market. The strategy</text>
        <text x="162" y="127" fill={M} fontSize="7.5" fontFamily="monospace">   by which a business reaches</text>
        <text x="162" y="139" fill={M} fontSize="7.5" fontFamily="monospace">   its target customers.</text>
        <text x="162" y="158" fill={F} fontSize="7.5" fontFamily="monospace">"A strong GTM motion..."</text>
        <line x1="162" y1="168" x2="258" y2="168" stroke={F} strokeWidth="0.8"/>
        {/* Alphabet */}
        <text x="162" y="186" fill={F} fontSize="7" fontFamily="monospace">A B C D E F G H I J K L M</text>
        <text x="162" y="198" fill={F} fontSize="7" fontFamily="monospace">N O P Q R S T U V W X Y Z</text>
        {/* More lines */}
        {[215,230,245,260,272].map(y=>(
          <line key={y} x1="162" y1={y} x2="258" y2={y} stroke={F} strokeWidth="0.8" opacity="0.4"/>
        ))}
        {/* Page numbers */}
        <text x="80" y="274" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">— 247 —</text>
        <text x="220" y="274" textAnchor="middle" fill={F} fontSize="9" fontFamily="monospace">— 248 —</text>
      </svg>
    );
    default: return <svg viewBox="0 0 280 280" fill="none" style={{ width:'100%',height:'100%' }}><circle cx="140" cy="140" r="100" stroke={W} strokeWidth="2" strokeDasharray="8,6"/></svg>;
  }
}

// ── RESOURCE PAGES DATA ───────────────────────────────────────────────────────

const RESOURCE_PAGES_DATA = {
  playbooks: {
    label: 'Playbooks', count: 24, hue: 32, icon: '📋',
    tagline: 'The fastest path from strategy to execution.',
    desc: 'Every playbook starts where most strategies end — with the actual steps. These are the systems our team uses on real client engagements, documented well enough that someone else could run them without a briefing.',
    items: [
      { title: 'The 90-Day SEO Sprint Playbook', category: 'SEO', pages: 42, downloads: '3.2k' },
      { title: 'Paid Acquisition Launch Playbook', category: 'PPC', pages: 38, downloads: '2.8k' },
      { title: 'Content Engine Build Playbook', category: 'Content', pages: 55, downloads: '4.1k' },
      { title: 'Email List Growth Playbook', category: 'Email', pages: 29, downloads: '2.2k' },
      { title: 'Local SEO Domination Playbook', category: 'Local SEO', pages: 33, downloads: '1.9k' },
      { title: 'CRO Testing Cadence Playbook', category: 'CRO', pages: 27, downloads: '2.5k' },
    ]
  },
  toolkits: {
    label: 'Toolkits', count: 18, hue: 55, icon: '🧰',
    tagline: 'The software stacks that serious marketers use.',
    desc: 'Not sponsored lists of every tool that exists — opinionated stacks for each channel, based on what we actually use and what our best-performing clients run. Each toolkit includes setup notes and integration tips.',
    items: [
      { title: 'The Technical SEO Stack 2026', category: 'SEO', pages: null, downloads: '5.4k' },
      { title: 'PPC Analytics & Bid Management Kit', category: 'PPC', pages: null, downloads: '3.8k' },
      { title: 'Content Production Workflow Kit', category: 'Content', pages: null, downloads: '4.2k' },
      { title: 'Email Deliverability Tech Stack', category: 'Email', pages: null, downloads: '2.9k' },
      { title: 'Conversion Research & Testing Kit', category: 'CRO', pages: null, downloads: '3.1k' },
      { title: 'Social Listening & Analytics Kit', category: 'Social', pages: null, downloads: '2.4k' },
    ]
  },
  templates: {
    label: 'Templates', count: 31, hue: 160, icon: '📊',
    tagline: 'Ready-to-use frameworks. Drop in and run.',
    desc: "Templates that have survived contact with real clients — not generic spreadsheets built for show. Every template here has been used in an actual engagement and refined based on what broke the first time.",
    items: [
      { title: 'Technical SEO Audit Spreadsheet', category: 'SEO', pages: null, downloads: '8.1k' },
      { title: 'PPC Account Audit Template', category: 'PPC', pages: null, downloads: '6.3k' },
      { title: 'Content Brief Framework', category: 'Content', pages: null, downloads: '7.2k' },
      { title: 'GA4 E-commerce Tracking Spec', category: 'Analytics', pages: null, downloads: '5.8k' },
      { title: 'Email Campaign Reporting Template', category: 'Email', pages: null, downloads: '4.9k' },
      { title: 'CRO Test Documentation Template', category: 'CRO', pages: null, downloads: '3.7k' },
    ]
  },
  podcast: {
    label: 'Podcast', count: 68, hue: 290, icon: '🎙️',
    tagline: 'Conversations with practitioners, not theorists.',
    desc: 'GTMGods features the people who actually ran the campaigns, built the channels, and measured the results. No fluff, no pitches — just dense, practitioner-to-practitioner knowledge transfer.',
    items: [
      { title: 'How We 3×\'d Organic Traffic in 8 Months', category: 'E-commerce · EP 41', pages: null, downloads: '54 min' },
      { title: 'Rebuilding Paid Acquisition from Scratch', category: 'SaaS · EP 38', pages: null, downloads: '47 min' },
      { title: 'Local SEO at 100M+ Page Scale', category: 'Real Estate · EP 35', pages: null, downloads: '61 min' },
      { title: 'Marketing in a Compliance-Heavy Industry', category: 'Healthcare · EP 33', pages: null, downloads: '38 min' },
      { title: 'The Psychology Behind Our Checkout Redesign', category: 'Fintech · EP 29', pages: null, downloads: '52 min' },
      { title: 'Building Loyalty in the Post-OTA World', category: 'Hospitality · EP 26', pages: null, downloads: '45 min' },
    ]
  },
  videos: {
    label: 'Videos', count: 42, hue: 220, icon: '📹',
    tagline: 'Walkthroughs and teardowns, no slides required.',
    desc: 'Screen recordings, tool walkthroughs, live audits, and campaign teardowns. The format nobody publishes enough of — watching an expert actually do the work, explaining decisions in real time.',
    items: [
      { title: 'Live Technical SEO Audit — 400-Page SaaS Site', category: 'SEO · 38 min', pages: null, downloads: '12.4k views' },
      { title: 'Google Ads Account Teardown & Rebuild', category: 'PPC · 52 min', pages: null, downloads: '9.8k views' },
      { title: 'GA4 E-commerce Implementation Walkthrough', category: 'Analytics · 44 min', pages: null, downloads: '11.2k views' },
      { title: 'Email Deliverability Audit Live', category: 'Email · 28 min', pages: null, downloads: '7.6k views' },
      { title: 'CRO Heuristic Evaluation — Landing Page', category: 'CRO · 35 min', pages: null, downloads: '8.9k views' },
      { title: 'Content Brief to Published Article', category: 'Content · 41 min', pages: null, downloads: '6.3k views' },
    ]
  },
  glossary: {
    label: 'Glossary', count: 512, hue: 195, icon: '📖',
    tagline: '512 GTM terms defined with no hedging.',
    desc: 'Not definitions copied from Wikipedia. Every term in the GTM Glossary is defined with the precision of someone who has had to explain it to a client, use it in a brief, or be tested on it in a meeting.',
    items: [
      { title: 'Attribution & Measurement', category: '64 terms', pages: null, downloads: 'Most viewed' },
      { title: 'SEO & Content Terms', category: '88 terms', pages: null, downloads: 'Most viewed' },
      { title: 'Paid Media & Bidding', category: '72 terms', pages: null, downloads: '' },
      { title: 'Email & Deliverability', category: '58 terms', pages: null, downloads: '' },
      { title: 'Analytics & Data', category: '76 terms', pages: null, downloads: '' },
      { title: 'CRO & Experimentation', category: '54 terms', pages: null, downloads: '' },
    ]
  },
};

// ── RESOURCE DETAIL PAGE ──────────────────────────────────────────────────────

function ResourceDetailPage({ type, onNavigate }) {
  const data = RESOURCE_PAGES_DATA[type] || RESOURCE_PAGES_DATA.playbooks;
  const hue = data.hue;
  const heroBg = `oklch(0.17 0.055 ${hue})`;
  const heroAccent = `oklch(0.42 0.14 ${hue})`;
  const accentColor = `oklch(0.50 0.16 ${hue})`;

  return (
    <main id="main-content" className="page-enter">
      {/* ── HERO ── */}
      <div style={{ background: heroBg, borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(ellipse at 68% 50%, ${heroAccent}18 0%, transparent 65%)`, pointerEvents: 'none' }}></div>
        <div className="container" style={{ padding: '52px 24px 60px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 22 }}>
                <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.75)'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.38)'}>Home</span>
                <span>›</span>
                <span onClick={() => onNavigate('resources')} style={{ cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.75)'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.38)'}>Resources</span>
                <span>›</span>
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>{data.label}</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 6, padding: '5px 14px', marginBottom: 20 }}>
                <span style={{ fontSize: 14 }}>{data.icon}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Resource Library</span>
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 800, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 14 }}>{data.label}</h1>
              <p style={{ fontSize: 17, color: `oklch(0.72 0.06 ${hue})`, fontStyle: 'italic', fontFamily: 'var(--font-serif)', marginBottom: 16, lineHeight: 1.4 }}>"{data.tagline}"</p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', lineHeight: 1.72, maxWidth: 480, marginBottom: 30 }}>{data.desc}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-primary btn-lg">
                  Browse all {data.count} {data.label.toLowerCase()}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div style={{ display: 'flex', gap: 0, marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                {[[`${data.count}`, data.label], ['Free', 'Cost'], ['2026', 'Updated']].map(([val,lbl],i) => (
                  <div key={lbl} style={{ paddingRight: i<2?28:0, paddingLeft: i>0?28:0, borderLeft: i>0?'1px solid rgba(255,255,255,0.10)':'none' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>{val}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: innovation illustration */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ width: '100%', maxWidth: 300, aspectRatio: type === 'playbooks' || type === 'podcast' ? '0.88/1' : '1/0.95', background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${accentColor}18 0%, transparent 70%)` }}></div>
                <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
                  <ResourceIllustration type={type} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ITEMS GRID ── */}
      <section style={{ padding: '72px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <AppearSection>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accentColor, marginBottom: 8 }}>Featured</div>
                <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, letterSpacing: '-0.03em' }}>Top {data.label}</h2>
              </div>
              <button className="btn btn-secondary btn-sm">View all {data.count} →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {data.items.map((item, i) => (
                <ResourceItemCard key={i} item={item} accentColor={accentColor} heroBg={heroBg} hue={hue} type={type} />
              ))}
            </div>
          </AppearSection>
        </div>
      </section>

      <div className="section"><div className="container"><NewsletterSignup /></div></div>
    </main>
  );
}

function ResourceItemCard({ item, accentColor, heroBg, hue, type }) {
  const [hovered, setHovered] = React.useState(false);
  const isPodcast = type === 'podcast';
  const isVideo = type === 'videos';
  const isGlossary = type === 'glossary';
  const actionLabel = isPodcast ? '▶ Play episode' : isVideo ? '▶ Watch' : isGlossary ? 'Browse terms' : '⬇ Download free';

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ padding: '20px', borderRadius: 'var(--r-lg)', border: `1px solid ${hovered ? 'var(--border-s)' : 'var(--border)'}`, background: 'var(--bg)', cursor: 'pointer', transition: 'all 180ms', transform: hovered ? 'translateY(-2px)' : 'none', boxShadow: hovered ? 'var(--sh-md)' : 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Category badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: accentColor, background: `oklch(0.92 0.03 ${hue})`, padding: '3px 8px', borderRadius: 4 }}>{item.category}</span>
        {item.downloads && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{item.downloads}</span>}
      </div>
      {/* Title */}
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.35 }}>{item.title}</div>
      {item.pages && <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{item.pages} pages</div>}
      {/* CTA */}
      <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: hovered ? accentColor : 'var(--text-3)', transition: 'color 180ms' }}>{actionLabel}</div>
    </div>
  );
}

Object.assign(window, { NicheHubPage, ResourcesPage, AboutPage, ContactPage, ResourceDetailPage });
