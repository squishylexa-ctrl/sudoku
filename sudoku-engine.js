// ── NEO SUDOKU ENGINE ──

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
    const nums=[1,2,3,4,5,6,7,8,9].sort(()=>Math.random()-0.5);
    for(let n of nums) {
      if(ok(r,c,n)) { g[r][c]=n; if(solve(pos+1)) return true; g[r][c]=0; }
    }
    return false;
  };
  solve(0); return g;
}

function makeCages(sol, diff) {
  const cages = []; const done = Array.from({length:9}, () => Array(9).fill(false));
  const colors = ["#ff6b6b","#ffa94d","#69db7c","#4cc9f0","#da77f2"];
  
  // Bestimme die maximale Cage-Größe basierend auf dem Schwierigkeitsgrad
  let maxCageSize = 3;
  if (diff === "easy") maxCageSize = 2;
  else if (diff === "mittel") maxCageSize = 3;
  else if (diff === "schwer") maxCageSize = 4;
  else if (diff === "boshaft") maxCageSize = 5;

  for(let r=0; r<9; r++) {
    for(let c=0; c<9; c++) {
      if(done[r][c]) continue;
      const cage = [[r,c]]; done[r][c]=true;
      
      // Nutze die maxCageSize, damit die Schleife ein klares Ende hat
      let size = Math.floor(Math.random() * maxCageSize) + 1;
      while(cage.length < size) {
        const [lr,lc] = cage[cage.length-1];
        const nb = [[lr-1,lc],[lr+1,lc],[lr,lc-1],[lr,lc+1]]
          .filter(([cr,cc]) => cr>=0&&cr<9&&cc>=0&&cc<9&&!done[cr][cc]);
        if(!nb.length) break;
        const [nr,nc] = nb[Math.floor(Math.random()*nb.length)];
        cage.push([nr,nc]); done[nr][nc]=true;
      }
      const sum = cage.reduce((s,[cr,cc]) => s+sol[cr][cc], 0);
      cages.push({cells:cage, sum, color:colors[cages.length%colors.length]});
    }
  }
  return cages;
}

function buildCageMap(cages) {
  const m = {};
  cages.forEach((c,i) => c.cells.forEach(([r,col]) => { m[`${r},${col}`]=i; }));
  return m;
}

function cageTopLeft(cageIdx, cages) {
  return [...cages[cageIdx].cells].sort((a,b) => a[0]-b[0]||a[1]-b[1])[0];
}

function isCageDone(cage, grid) {
  let s = 0;
  for(let [r,c] of cage.cells) {
    if(grid[r][c]===0) return false;
    s += grid[r][c];
  }
  return s === cage.sum;
}
