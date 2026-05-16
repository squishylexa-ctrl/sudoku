// ═══════════════════════════════════════════════════════════════
// sudoku-engine.js — Neo Sudoku Generator & Hilfsfunktionen
// ═══════════════════════════════════════════════════════════════

const CAGE_COLORS = [
  "#ff6b6b","#ffa94d","#26d0a0","#5ba4cf","#b47ae0",
  "#ffe066","#4ecdc4","#ff8c42","#74c0fc","#e899a8",
  "#69db7c","#da77f2","#38d9d9","#ffa8a8","#8ce99a",
  "#ff9ff3","#54a0ff","#ff6348","#1dd1a1","#ffeaa7",
];

// ── SUDOKU GENERATOR ─────────────────────────────────────────────
function generateSolution() {
  const g = Array.from({length:9}, () => Array(9).fill(0));
  const ok = (r,c,n) => {
    for(let i=0;i<9;i++) if(g[r][i]===n||g[i][c]===n) return false;
    const br=Math.floor(r/3)*3, bc=Math.floor(c/3)*3;
    for(let i=0;i<3;i++) for(let j=0;j<3;j++) if(g[br+i][bc+j]===n) return false;
    return true;
  };
  const solve = pos => {
    if(pos===81) return true;
    const r=Math.floor(pos/9), c=pos%9;
    for(const n of [1,2,3,4,5,6,7,8,9].sort(()=>Math.random()-0.5))
      if(ok(r,c,n)){g[r][c]=n; if(solve(pos+1)) return true; g[r][c]=0;}
    return false;
  };
  solve(0);
  return g;
}

// ── KÄFIG GENERATOR ──────────────────────────────────────────────
function generateCages(sol, diff) {
  const cfg = {
    easy:    {min:2, max:3},
    mittel:  {min:2, max:4},
    schwer:  {min:2, max:5},
    boshaft: {min:3, max:6},
  };
  const {min, max} = cfg[diff] || cfg.mittel;
  const done = Array.from({length:9}, () => Array(9).fill(false));
  const cages = [];
  const cells = [];
  for(let r=0;r<9;r++) for(let c=0;c<9;c++) cells.push([r,c]);
  cells.sort(() => Math.random()-0.5);

  for(const [sr,sc] of cells){
    if(done[sr][sc]) continue;
    const size = min + Math.floor(Math.random()*(max-min+1));
    const cage = [[sr,sc]]; done[sr][sc]=true;
    while(cage.length < size){
      const [lr,lc] = cage[Math.floor(Math.random()*cage.length)];
      const nb = [[lr-1,lc],[lr+1,lc],[lr,lc-1],[lr,lc+1]]
        .filter(([r,c]) => r>=0&&r<9&&c>=0&&c<9&&!done[r][c]);
      if(!nb.length) break;
      const [nr,nc] = nb[Math.floor(Math.random()*nb.length)];
      cage.push([nr,nc]); done[nr][nc]=true;
    }
    const sum = cage.reduce((s,[r,c]) => s+sol[r][c], 0);
    cages.push({cells:cage, sum, color:CAGE_COLORS[cages.length%CAGE_COLORS.length]});
  }
  return cages;
}

// ── HILFSFUNKTIONEN ──────────────────────────────────────────────
function buildCageMap(cages) {
  const m = {};
  cages.forEach((c,i) => c.cells.forEach(([r,col]) => { m[`${r},${col}`]=i; }));
  return m;
}

function cageTopLeft(cageIdx, cages) {
  return [...cages[cageIdx].cells].sort((a,b) => a[0]-b[0]||a[1]-b[1])[0];
}

function isCageDone(cage, grid) {
  const vals = cage.cells.map(([r,c]) => grid[r][c]);
  if(vals.some(v => v===0)) return false;
  if(new Set(vals).size !== vals.length) return false;
  return vals.reduce((a,b) => a+b, 0) === cage.sum;
}

function fmt(s) {
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}

// ── NEUES SPIEL GENERIEREN ───────────────────────────────────────
function generateNewGame(diff) {
  const solution = generateSolution();
  const cages = generateCages(solution, diff);
  const cageMap = buildCageMap(cages);
  const userGrid = Array.from({length:9}, () => Array(9).fill(0));
  const notes = Array.from({length:9}, () => Array.from({length:9}, () => new Set()));
  return {solution, cages, cageMap, userGrid, notes};
}
