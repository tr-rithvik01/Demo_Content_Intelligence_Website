// pages-home.jsx — HomePage with Tetris hero

var { useState, useEffect, useRef, useCallback } = React;

// ── Tetris constants ─────────────────────────────────────────────────────────

const T_COLS = 10, T_ROWS = 20, WIN_LINES = 20;
const CELL = 28; // 28 × 20 rows = 560px — fills the hero panel exactly

const MARKETING_TERMS = [
  'CAC','LTV','MQL','SQL','ARR','MRR','NRR','GRR','ICP','TAM',
  'SAM','SOM','PLG','ABM','PQL','GTM','ROI','CPA','CPC','CPM',
  'CTR','ROAS','NPS','DAU','MAU','OKR','KPI','CRO','SEO','SEM',
  'ACV','TCV','ARPU','LCP','CLS','INP','AOV','CPL','CDP','DMP',
  'SERP','GBP','CWV','SDR','Churn','TOFU','MOFU','BOFU','Cohort',
  'Funnel','Brand','Pipeline','Quota','Upsell','Referral','Organic',
  'Paid','Inbound','Outbound','Email','Push','Social','UGC','PR',
  'Runway','Burn','EBITDA','Virality','Persona','B2B','B2C','SaaS',
  'MVP','POC','SLA','API','CRM','BI','LLM','SFDC','Braze','Klaviyo',
  'GA4','Heap','Mixpanel','Looker','Ahrefs','Stripe','Twilio',
  'Segment','Amplitude','Retention','Revenue','Profit','Conversion',
  'Attribution','Journey','Touchpoint','Engagement','Awareness',
  'Acquisition','Activation','Expansion','Payback','Win Rate',
  'Velocity','Coverage','Efficiency','Rule of 40','Magic Num',
  'Burn Rate','Flywheel','Moat','PMF','Traction','Scale','Freemium',
  'Trial','Demo','BANT','MEDDIC','Solution','Proof','Champion',
  'Outreach','Cadence','Signal','Intent','Workflow','Nurture',
  'Score','Qualify','Handoff','Retarget','A/B Test','Heatmap',
  'Session','ARPA','Logo Churn','Net Rev','New MRR','Exp MRR',
];

const PIECE_DEFS = [
  { shape: [[1,1,1,1]], color: '#e05a35' },
  { shape: [[1,1],[1,1]], color: '#2aaa8a' },
  { shape: [[0,1,0],[1,1,1]], color: '#a855f7' },
  { shape: [[0,1,1],[1,1,0]], color: '#3b82f6' },
  { shape: [[1,1,0],[0,1,1]], color: '#ef4444' },
  { shape: [[1,0,0],[1,1,1]], color: '#f59e0b' },
  { shape: [[0,0,1],[1,1,1]], color: '#10b981' },
];

const DROP_INTERVALS = [800,720,630,550,470,380,300,220,130,100];
const LINE_SCORES = [0,100,300,500,800];

// ── Pure utils ───────────────────────────────────────────────────────────────

const rotateMat = m => m[0].map((_,c) => m.map(r => r[c]).reverse());
const mkBoard   = () => Array.from({length:T_ROWS}, () => Array(T_COLS).fill(null));
const randTerm  = () => MARKETING_TERMS[Math.floor(Math.random() * MARKETING_TERMS.length)];
const randPiece = () => {
  const d = PIECE_DEFS[Math.floor(Math.random() * PIECE_DEFS.length)];
  return { shape: d.shape.map(r => [...r]), color: d.color, term: randTerm() };
};

function valid(board, shape, pos) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nr = pos.r + r, nc = pos.c + c;
      if (nr < 0 || nr >= T_ROWS || nc < 0 || nc >= T_COLS || board[nr][nc]) return false;
    }
  return true;
}

function mergeBoard(board, shape, pos, color, term) {
  const next = board.map(r => [...r]);
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) next[pos.r+r][pos.c+c] = {color, term};
  return next;
}

function clearLines(board) {
  const kept = board.filter(row => row.some(c => !c));
  const cleared = T_ROWS - kept.length;
  return {
    board: [...Array.from({length:cleared}, () => Array(T_COLS).fill(null)), ...kept],
    cleared,
  };
}

function getGhost(board, shape, pos) {
  let gp = {...pos};
  while (valid(board, shape, {r:gp.r+1, c:gp.c})) gp = {r:gp.r+1, c:gp.c};
  return gp;
}

function tryRotate(board, shape, pos) {
  const rot = rotateMat(shape);
  for (const kick of [0,-1,1,-2,2]) {
    const np = {r:pos.r, c:pos.c+kick};
    if (valid(board, rot, np)) return {shape:rot, pos:np};
  }
  return null;
}

// ── Game hook ────────────────────────────────────────────────────────────────

function lockAndAdvance(gs) {
  const merged = mergeBoard(gs.board, gs.cur.shape, gs.pos, gs.cur.color, gs.cur.term);
  const {board, cleared} = clearLines(merged);
  const score  = gs.score + LINE_SCORES[Math.min(cleared, 4)] * (gs.level + 1);
  const lines  = gs.lines + cleared;
  const level  = Math.floor(lines / 10);
  const won    = lines >= WIN_LINES;
  const nextPos = {r:0, c:Math.floor((T_COLS - gs.next.shape[0].length) / 2)};
  const over   = !valid(board, gs.next.shape, nextPos);
  gs.board  = board;
  gs.cur    = gs.next;
  gs.pos    = nextPos;
  gs.next   = randPiece();
  gs.score  = score;
  gs.lines  = lines;
  gs.level  = level;
  gs.status = won ? 'won' : over ? 'over' : 'playing';
}

function useGame(keybinds, enabled) {
  const gsRef       = useRef(null);
  const [rev, setRev] = useState(0);
  const rafRef      = useRef(null);
  const lastDropRef = useRef(0);
  const enabledRef  = useRef(enabled);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  const start = useCallback(() => {
    const cur = randPiece();
    gsRef.current = {
      board: mkBoard(), cur,
      pos:  {r:0, c:Math.floor((T_COLS - cur.shape[0].length) / 2)},
      next: randPiece(), score:0, lines:0, level:0, status:'playing',
    };
    lastDropRef.current = performance.now();
    setRev(v => v+1);
  }, []);

  useEffect(() => {
    function tick(ts) {
      rafRef.current = requestAnimationFrame(tick);
      if (!enabledRef.current) return;
      const gs = gsRef.current;
      if (!gs || gs.status !== 'playing') return;
      const interval = DROP_INTERVALS[Math.min(gs.level, DROP_INTERVALS.length-1)];
      if (ts - lastDropRef.current < interval) return;
      lastDropRef.current = ts;
      const newPos = {r:gs.pos.r+1, c:gs.pos.c};
      if (valid(gs.board, gs.cur.shape, newPos)) {
        gs.pos = newPos;
      } else {
        lockAndAdvance(gs);
      }
      setRev(v => v+1);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (!enabledRef.current) return;
      const gs = gsRef.current;
      if (!gs || gs.status !== 'playing') return;
      const kb = keybinds;
      let changed = false;
      if (e.code === kb.left) {
        e.preventDefault();
        const np = {r:gs.pos.r, c:gs.pos.c-1};
        if (valid(gs.board, gs.cur.shape, np)) { gs.pos = np; changed = true; }
      } else if (e.code === kb.right) {
        e.preventDefault();
        const np = {r:gs.pos.r, c:gs.pos.c+1};
        if (valid(gs.board, gs.cur.shape, np)) { gs.pos = np; changed = true; }
      } else if (e.code === kb.down) {
        e.preventDefault();
        const np = {r:gs.pos.r+1, c:gs.pos.c};
        if (valid(gs.board, gs.cur.shape, np)) {
          gs.pos = np; lastDropRef.current = performance.now(); changed = true;
        }
      } else if (e.code === kb.rot) {
        e.preventDefault();
        const result = tryRotate(gs.board, gs.cur.shape, gs.pos);
        if (result) { gs.cur = {...gs.cur, shape:result.shape}; gs.pos = result.pos; changed = true; }
      } else if (e.code === kb.drop) {
        e.preventDefault();
        const ghost  = getGhost(gs.board, gs.cur.shape, gs.pos);
        const bonus  = (ghost.r - gs.pos.r) * 2;
        gs.pos = ghost;
        lockAndAdvance(gs);
        gs.score += bonus;
        lastDropRef.current = performance.now();
        changed = true;
      }
      if (changed) setRev(v => v+1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keybinds]);

  return { gs: gsRef.current, rev, start, restart: start };
}

// ── Board canvas ─────────────────────────────────────────────────────────────

function BoardCanvas({ gs, cellSize, rev }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gs) return;
    const ctx = canvas.getContext('2d');
    const W = T_COLS * cellSize, H = T_ROWS * cellSize;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#080a12';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r < T_ROWS; r++)
      for (let c = 0; c < T_COLS; c++)
        ctx.strokeRect(c*cellSize, r*cellSize, cellSize, cellSize);

    function drawCell(r, c, color, term, alpha) {
      const x = c*cellSize, y = r*cellSize;
      ctx.save();
      ctx.globalAlpha = alpha != null ? alpha : 1;
      ctx.fillStyle = color;
      ctx.fillRect(x+1, y+1, cellSize-2, cellSize-2);
      ctx.fillStyle = 'rgba(255,255,255,0.20)';
      ctx.fillRect(x+1, y+1, cellSize-2, 2);
      ctx.fillRect(x+1, y+1, 2, cellSize-2);
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(x+1, y+cellSize-3, cellSize-2, 2);
      ctx.fillRect(x+cellSize-3, y+1, 2, cellSize-2);
      if (cellSize >= 14 && term && (alpha == null || alpha > 0.4)) {
        const fs = Math.max(5, Math.min(8, cellSize * 0.35));
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.font = `700 ${fs}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 2;
        const label = term.length > 7 ? term.slice(0,6) + '.' : term;
        ctx.fillText(label, x + cellSize/2, y + cellSize/2);
      }
      ctx.restore();
    }

    for (let r = 0; r < T_ROWS; r++)
      for (let c = 0; c < T_COLS; c++) {
        const cell = gs.board[r][c];
        if (cell) drawCell(r, c, cell.color, cell.term);
      }

    if (gs.status === 'playing') {
      const ghost = getGhost(gs.board, gs.cur.shape, gs.pos);
      if (ghost.r !== gs.pos.r)
        for (let r = 0; r < gs.cur.shape.length; r++)
          for (let c = 0; c < gs.cur.shape[r].length; c++)
            if (gs.cur.shape[r][c])
              drawCell(ghost.r+r, ghost.c+c, gs.cur.color, '', 0.18);

      for (let r = 0; r < gs.cur.shape.length; r++)
        for (let c = 0; c < gs.cur.shape[r].length; c++)
          if (gs.cur.shape[r][c])
            drawCell(gs.pos.r+r, gs.pos.c+c, gs.cur.color, gs.cur.term);
    }

    if (gs.status === 'over') {
      ctx.save();
      ctx.fillStyle = 'rgba(8,10,18,0.80)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#ef4444';
      ctx.font = `800 ${Math.max(13,cellSize*0.65)}px "Plus Jakarta Sans",sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', W/2, H/2 - 14);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = `500 ${Math.max(9,cellSize*0.45)}px "Plus Jakarta Sans",sans-serif`;
      ctx.fillText('Press R to restart', W/2, H/2 + 12);
      ctx.restore();
    }
  }, [gs, cellSize, rev]);

  return <canvas ref={canvasRef} style={{display:'block', borderRadius:3}} />;
}

// ── Next-piece canvas ─────────────────────────────────────────────────────────

function NextPieceCanvas({ piece, cellSize }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!piece || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cols = piece.shape[0].length + 2, rows = piece.shape.length + 2;
    const W = cols*cellSize, H = rows*cellSize;
    const dpr = Math.min(window.devicePixelRatio||1, 2);
    canvas.width = W*dpr; canvas.height = H*dpr;
    canvas.style.width = W+'px'; canvas.style.height = H+'px';
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#080a12';
    ctx.fillRect(0,0,W,H);
    const offR=1, offC=1;
    for (let r=0; r<piece.shape.length; r++)
      for (let c=0; c<piece.shape[r].length; c++) {
        if (!piece.shape[r][c]) continue;
        const x=(offC+c)*cellSize, y=(offR+r)*cellSize;
        ctx.fillStyle = piece.color;
        ctx.fillRect(x+1,y+1,cellSize-2,cellSize-2);
        ctx.fillStyle = 'rgba(255,255,255,0.20)';
        ctx.fillRect(x+1,y+1,cellSize-2,2);
        ctx.fillRect(x+1,y+1,2,cellSize-2);
      }
  }, [piece, cellSize]);
  return <canvas ref={canvasRef} style={{display:'block', borderRadius:3}} />;
}

// ── Win modal ─────────────────────────────────────────────────────────────────

function WinModal({ score, lines, onPlayAgain }) {
  const [copied, setCopied] = useState(false);
  const CODE = 'GTMCHAMP';
  function copyCode() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CODE).then(() => {
        setCopied(true); setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  }
  return (
    <div style={{
      position:'absolute', inset:0,
      background:'rgba(8,10,18,0.92)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:20, borderRadius:4,
    }}>
      <div style={{
        background:'oklch(0.16 0.04 258)',
        border:'1px solid oklch(0.28 0.06 258)',
        borderRadius:12, padding:'24px 20px',
        textAlign:'center', maxWidth:260, width:'90%',
      }}>
        <div style={{fontSize:32, marginBottom:6}}>🏆</div>
        <div style={{fontSize:14, fontWeight:800, color:'#f59e0b', letterSpacing:'-0.02em', marginBottom:4}}>
          GTM Mastermind Unlocked
        </div>
        <div style={{fontSize:11, color:'rgba(255,255,255,0.5)', marginBottom:14}}>
          {lines} lines &middot; Score: {score.toLocaleString()}
        </div>
        <div style={{background:'oklch(0.11 0.03 258)', borderRadius:8, padding:'10px 12px', marginBottom:12}}>
          <div style={{fontSize:9, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:5}}>
            Unlock code
          </div>
          <div style={{fontFamily:'monospace', fontSize:20, fontWeight:800, color:'#e05a35', letterSpacing:'0.12em'}}>
            {CODE}
          </div>
        </div>
        <div style={{fontSize:10, color:'rgba(255,255,255,0.45)', marginBottom:14, lineHeight:1.55}}>
          GTM Remixed Vault — 50 frameworks,<br/>12 templates, 0 fluff
        </div>
        <div style={{display:'flex', gap:8, justifyContent:'center'}}>
          <button
            onClick={copyCode}
            style={{
              background: copied ? '#2aaa8a' : '#e05a35',
              color:'white', border:'none', borderRadius:6,
              padding:'7px 14px', fontSize:11, fontWeight:700, cursor:'pointer',
              transition:'background 0.2s',
            }}
          >{copied ? 'Copied!' : 'Copy Code'}</button>
          <button
            onClick={onPlayAgain}
            style={{
              background:'transparent', color:'rgba(255,255,255,0.65)',
              border:'1px solid oklch(0.28 0.06 258)',
              borderRadius:6, padding:'7px 14px', fontSize:11, fontWeight:700, cursor:'pointer',
            }}
          >Play Again</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, big }) {
  return (
    <div style={{marginBottom:10}}>
      <div style={{fontSize:8, fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:2}}>{label}</div>
      <div style={{fontSize: big ? 17 : 13, fontWeight:800, color:'white', letterSpacing:'-0.02em'}}>{value}</div>
    </div>
  );
}

// ── Tetris game ───────────────────────────────────────────────────────────────

const P1_KEYS = {left:'ArrowLeft', right:'ArrowRight', down:'ArrowDown', rot:'ArrowUp', drop:'Space'};

const CW_CELLS = [
  {r:1, c:1, ans:'C', num:1}, {r:1, c:2, ans:'A'}, {r:1, c:3, ans:'C'},
  {r:2, c:1, ans:'H'}, {r:3, c:1, ans:'U', num:3}, {r:4, c:1, ans:'R'}, {r:5, c:1, ans:'N'},
  {r:3, c:2, ans:'P'}, {r:3, c:3, ans:'S'}, {r:3, c:4, ans:'E'}, {r:3, c:5, ans:'L'}, {r:3, c:6, ans:'L'},
  {r:1, c:5, ans:'S', num:2}, {r:2, c:5, ans:'A'}, {r:4, c:5, ans:'E'}, {r:5, c:5, ans:'S'}
];

const SUDOKU_BOARD = [
  [5,3,null, null,7,null, null,null,null],
  [6,null,null, 1,9,5, null,null,null],
  [null,9,8, null,null,null, null,6,null],
  [8,null,null, null,6,null, null,null,3],
  [4,null,null, 8,null,3, null,null,1],
  [7,null,null, null,2,null, null,null,6],
  [null,6,null, null,null,null, 2,8,null],
  [null,null,null, 4,1,9, null,null,5],
  [null,null,null, null,8,null, null,7,9]
];

function HeroGames() {
  const [activeGame, setActiveGame] = useState(null);
  return (
    <div style={{position:'absolute', inset:0, background:'#080a12', overflow:'hidden', borderRadius: 6}}>
      {/* CRT Scanline Overlay */}
      <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)', pointerEvents:'none', zIndex:100}} />
      {!activeGame && <GameMenu onSelect={setActiveGame} />}
      {activeGame === 'tetris' && <TetrisPlay onBack={() => setActiveGame(null)} />}
      {activeGame === 'snake' && <SnakePlay onBack={() => setActiveGame(null)} />}
      {activeGame === 'crossword' && <CrosswordPlay onBack={() => setActiveGame(null)} />}
      {activeGame === 'sudoku' && <SudokuPlay onBack={() => setActiveGame(null)} />}
    </div>
  );
}

function GameMenu({ onSelect }) {
  return (
    <div style={{position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {/* Retro Synthwave Grid Background */}
      <div style={{position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none'}}>
        {/* Sun / Glow */}
        <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, rgba(224, 90, 53, 0.15) 0%, transparent 60%)'}} />
        {/* Horizon Grid */}
        <div style={{
          position: 'absolute', bottom: 0, left: '-50%', right: '-50%', height: '50%',
          transform: 'perspective(300px) rotateX(80deg)',
          transformOrigin: 'top center',
          backgroundImage: 'linear-gradient(rgba(42, 170, 138, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 170, 138, 0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: 'center top',
          borderTop: '2px solid rgba(42, 170, 138, 0.8)',
          boxShadow: '0 -10px 40px rgba(42, 170, 138, 0.3)',
        }} />
        {/* Floating marketing terms in the "sky" */}
        {MARKETING_TERMS.slice(0,32).map((t,i) => (
          <div key={t} style={{
            position:'absolute',
            left:`${(i*37+13)%90}%`, top:`${(i*19+7)%45}%`,
            fontSize: i%3===0 ? 12 : i%3===1 ? 9 : 8,
            fontWeight:700,
            color:`rgba(255,255,255,${0.03+(i%4)*0.03})`,
            fontFamily:'monospace',
            letterSpacing:'-0.02em', whiteSpace:'nowrap',
          }}>{t}</div>
        ))}
      </div>
      <div style={{position:'relative', zIndex:1, textAlign:'center', padding:'0 20px', width:'100%'}}>
        <div style={{fontSize:20, fontWeight:800, color:'white', letterSpacing:'-0.02em', marginBottom:28, lineHeight:1.35, textShadow:'0 2px 10px rgba(0,0,0,0.8)'}}>
          Template games engage;<br/>
          <span style={{color:'#e05a35', textShadow:'0 0 20px rgba(224,90,53,0.4)'}}>Template SaaS hero images bore.</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          {[
            {id:'crossword', name:'Crossword', icon:'📝', desc:'Marketing Terms'},
            {id:'snake', name:'Snake', icon:'🐍', desc:'Growth Eater'},
            {id:'tetris', name:'Tetris', icon:'🧱', desc:'Stack Metrics'},
            {id:'sudoku', name:'Sudoku', icon:'🔢', desc:'Number Crunch'},
          ].map(g => (
            <button key={g.id} onClick={() => onSelect(g.id)} style={{
              background:'rgba(18, 20, 30, 0.7)', border:'1px solid rgba(42, 170, 138, 0.3)',
              boxShadow:'0 4px 12px rgba(0,0,0,0.3)', borderRadius:8, padding:'16px 12px',
              cursor:'pointer', textAlign:'center', transition:'all 0.2s', color:'white'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#2aaa8a'; e.currentTarget.style.background='rgba(42, 170, 138, 0.15)'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(42, 170, 138, 0.3)'; e.currentTarget.style.background='rgba(18, 20, 30, 0.7)'; e.currentTarget.style.transform='translateY(0)'; }}>
              <div style={{fontSize:28, marginBottom:8, filter:'drop-shadow(0 0 8px rgba(255,255,255,0.3))'}}>{g.icon}</div>
              <div style={{fontSize:13, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.05em'}}>{g.name}</div>
              <div style={{fontSize:10, color:'rgba(255,255,255,0.4)', marginTop:4}}>{g.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SnakePlay({ onBack }) {
  const [snake, setSnake] = useState([{x:10, y:10}]);
  const [dir, setDir] = useState({x:0, y:-1});
  const [food, setFood] = useState({x:15, y:5});
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  useEffect(() => {
    const handle = e => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
      if (e.key === 'ArrowUp' && dir.y !== 1) setDir({x:0, y:-1});
      if (e.key === 'ArrowDown' && dir.y !== -1) setDir({x:0, y:1});
      if (e.key === 'ArrowLeft' && dir.x !== 1) setDir({x:-1, y:0});
      if (e.key === 'ArrowRight' && dir.x !== -1) setDir({x:1, y:0});
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [dir]);

  useEffect(() => {
    if (over) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const nx = prev[0].x + dir.x, ny = prev[0].y + dir.y;
        if (nx<0||nx>=20||ny<0||ny>=40||prev.some(s=>s.x===nx&&s.y===ny)) { setOver(true); return prev; }
        const ns = [{x:nx, y:ny}, ...prev];
        if (nx===food.x && ny===food.y) {
          setScore(s=>s+10); setFood({x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*40)});
        } else ns.pop();
        return ns;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [dir, food, over]);

  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'stretch'}}>
      <div style={{position:'relative', width:280, flexShrink:0, background:'#080a12'}}>
        {snake.map((s,i) => <div key={i} style={{position:'absolute', left:s.x*14, top:s.y*14, width:14, height:14, background:i===0?'#2aaa8a':'#10b981', border:'1px solid #080a12'}} />)}
        <div style={{position:'absolute', left:food.x*14, top:food.y*14, width:14, height:14, background:'#e05a35', borderRadius:'50%'}} />
        {over && (
          <div style={{position:'absolute', inset:0, background:'rgba(8,10,18,0.8)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <div style={{color:'#ef4444', fontWeight:800, fontSize:20}}>GAME OVER</div>
            <button onClick={()=>{setSnake([{x:10,y:10}]);setDir({x:0,y:-1});setScore(0);setOver(false);}} style={{marginTop:12, padding:'6px 12px', background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'white', borderRadius:4, cursor:'pointer'}}>Restart</button>
          </div>
        )}
      </div>
      <div style={{width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)'}}>
        <Stat label="SCORE" value={score} big />
        <div style={{marginTop:'auto'}}>
          <div style={{fontSize:9, color:'rgba(255,255,255,0.4)', lineHeight:1.5, marginBottom:10}}>Use arrow keys to eat MRR (apples). Don't hit walls.</div>
          <button onClick={onBack} style={{background:'transparent', color:'rgba(255,255,255,0.25)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, padding:'4px 6px', fontSize:8, cursor:'pointer', width:'100%'}}>← Back</button>
        </div>
      </div>
    </div>
  );
}

function CrosswordPlay({ onBack }) {
  const [vals, setVals] = useState({});
  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'stretch'}}>
      <div style={{position:'relative', width:280, flexShrink:0, background:'#080a12', padding:10}}>
        <div style={{position:'relative', width:260, height:240}}>
          {CW_CELLS.map((cell, i) => (
            <div key={i} style={{position:'absolute', left:cell.c*28+28, top:cell.r*28+50, width:28, height:28, background:'white', border:'1px solid #333'}}>
              {cell.num && <div style={{position:'absolute', top:1, left:2, fontSize:8, color:'#333', zIndex:2}}>{cell.num}</div>}
              <input maxLength={1} value={vals[`${cell.r}-${cell.c}`] || ''} onChange={e => setVals({...vals, [`${cell.r}-${cell.c}`]: e.target.value.toUpperCase()})} style={{position:'absolute', inset:0, background:'transparent', border:'none', textAlign:'center', textTransform:'uppercase', fontWeight:800, fontSize:14, padding:0, margin:0, color:'#000', width:'100%', height:'100%', outline:'none'}} />
            </div>
          ))}
        </div>
        <div style={{marginTop:10, color:'white', fontSize:10.5, lineHeight:1.5, padding:'0 10px'}}>
          <strong style={{color:'#e05a35'}}>Across</strong><br/>
          1. Cost to acquire a customer (Abbr)<br/>
          3. Persuading a customer to buy more<br/><br/>
          <strong style={{color:'#e05a35'}}>Down</strong><br/>
          1. The rate at which customers leave<br/>
          2. The revenue generating team
        </div>
      </div>
      <div style={{width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)'}}>
        <Stat label="GAME" value="WORDS" />
        <div style={{marginTop:'auto'}}>
          <div style={{fontSize:9, color:'rgba(255,255,255,0.4)', lineHeight:1.5, marginBottom:10}}>Click cells to type. Fill in the marketing terms.</div>
          <button onClick={onBack} style={{background:'transparent', color:'rgba(255,255,255,0.25)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, padding:'4px 6px', fontSize:8, cursor:'pointer', width:'100%'}}>← Back</button>
        </div>
      </div>
    </div>
  );
}

function SudokuPlay({ onBack }) {
  const [vals, setVals] = useState({});
  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'stretch'}}>
      <div style={{position:'relative', width:280, flexShrink:0, background:'#080a12', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(9, 28px)', gap:0, background:'#333', border:'2px solid white'}}>
          {SUDOKU_BOARD.flatMap((row, r) => row.map((val, c) => (
            <div key={`${r}-${c}`} style={{width:28, height:28, background:'white', borderRight: (c%3===2 && c<8) ? '2px solid #333' : '1px solid #ccc', borderBottom: (r%3===2 && r<8) ? '2px solid #333' : '1px solid #ccc', position:'relative'}}>
              {val ? (
                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontWeight:800, fontSize:14}}>{val}</div>
              ) : (
                <input maxLength={1} value={vals[`${r}-${c}`] || ''} onChange={e => setVals({...vals, [`${r}-${c}`]: e.target.value.replace(/[^1-9]/g,'')})} style={{position:'absolute', inset:0, background:'transparent', border:'none', textAlign:'center', fontWeight:800, fontSize:14, padding:0, margin:0, color:'#2aaa8a', width:'100%', height:'100%', outline:'none'}} />
              )}
            </div>
          )))}
        </div>
      </div>
      <div style={{width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)'}}>
        <Stat label="GAME" value="SUDOKU" />
        <div style={{marginTop:'auto'}}>
          <div style={{fontSize:9, color:'rgba(255,255,255,0.4)', lineHeight:1.5, marginBottom:10}}>Fill the 9x9 grid so every row, col, and 3x3 box has 1-9.</div>
          <button onClick={onBack} style={{background:'transparent', color:'rgba(255,255,255,0.25)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, padding:'4px 6px', fontSize:8, cursor:'pointer', width:'100%'}}>← Back</button>
        </div>
      </div>
    </div>
  );
}

function TetrisPlay({ onBack }) {
  const { gs, rev, start, restart } = useGame(P1_KEYS, true);

  useEffect(() => { start(); }, []);

  useEffect(() => {
    function onKey(e) { if (e.code === 'KeyR') restart(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [restart]);

  const cs = CELL;

  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'stretch'}}>
      {/* Board — fills full height */}
      <div style={{position:'relative', flexShrink:0}}>
        {gs && <BoardCanvas gs={gs} cellSize={cs} rev={rev} />}
        {gs && gs.status === 'won' && <WinModal score={gs.score} lines={gs.lines} onPlayAgain={restart} />}
      </div>

      {/* HUD — fixed narrow strip */}
      {gs && (
        <div style={{width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)'}}>
          <Stat label="SCORE" value={gs.score.toLocaleString()} big />
          <Stat label="LINES" value={`${gs.lines}/${WIN_LINES}`} />
          <Stat label="LEVEL" value={gs.level + 1} />

          {/* Progress */}
          <div style={{height:3, borderRadius:2, background:'rgba(255,255,255,0.07)', marginBottom:12, overflow:'hidden'}}>
            <div style={{height:'100%', borderRadius:2, background:'#e05a35', width:`${Math.min(100,(gs.lines/WIN_LINES)*100)}%`, transition:'width 0.3s'}} />
          </div>

          {/* Next */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:8, fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:5}}>NEXT</div>
            {gs.next && <NextPieceCanvas piece={gs.next} cellSize={14} />}
          </div>

          {/* Dropping term */}
          {gs.cur && (
            <div style={{marginBottom:10}}>
              <div style={{fontSize:8, fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:4}}>NOW</div>
              <div style={{fontSize:11, fontWeight:800, color:gs.cur.color, wordBreak:'break-word', lineHeight:1.2}}>{gs.cur.term}</div>
            </div>
          )}

          {/* Controls + back */}
          <div style={{marginTop:'auto'}}>
            <div style={{fontSize:7, color:'rgba(255,255,255,0.18)', lineHeight:1.9}}>
              ←→ Move<br/>↑ Rotate<br/>↓ Drop<br/>Spc Hard<br/>R Reset
            </div>
            <button
              onClick={onBack}
              style={{
                marginTop:10, background:'transparent',
                color:'rgba(255,255,255,0.25)',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:4, padding:'4px 6px',
                fontSize:8, cursor:'pointer', width:'100%',
              }}
            >← Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────

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

          {/* Right: games */}
          <div style={{
            position: 'relative',
            border: '10px solid #131520',
            borderTopColor: '#1d2133',
            borderBottomColor: '#0a0c14',
            borderRightColor: '#0f111a',
            borderRadius: 16,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.8)',
            height: 560,
            overflow: 'hidden',
            background: '#080a12',
            boxSizing: 'border-box'
          }}>
            <HeroGames />
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
