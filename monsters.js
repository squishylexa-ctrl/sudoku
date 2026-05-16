// ═══════════════════════════════════════════════════════════════
// monsters.js — Neo Sudoku Battle Modus
// Alle Monster mit Pixel Art, Sprüchen, Fähigkeiten, Effekten
// ═══════════════════════════════════════════════════════════════

const S = 3; // Pixel-Größe

// ── HILFSFUNKTIONEN ──────────────────────────────────────────────
function mkCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w*S; c.height = h*S;
  c.style.imageRendering = 'pixelated';
  return c;
}

// ── PIXEL ART ZEICHENFUNKTIONEN ───────────────────────────────────

function drawSlime(ctx, t, colors) {
  const b=Math.sin(t*0.05)*1, sq=Math.sin(t*0.05)*0.08;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2+b*S);
  ctx.scale(1-sq,1+sq);
  const off={x:-4.5*S,y:-3.5*S};
  const body=[[0,0,0,1,1,1,0,0,0],[0,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,0],[0,0,1,0,1,0,1,0,0]];
  body.forEach((row,r)=>row.forEach((v,c)=>{
    if(!v)return;
    ctx.fillStyle=r<2?colors.dark:colors.main;
    ctx.fillRect(off.x+c*S,off.y+r*S,S,S);
  }));
  ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.fillRect(off.x+S,off.y+S,S,S);
  ctx.fillStyle='#111'; ctx.fillRect(off.x+2*S,off.y+3*S,S,S); ctx.fillRect(off.x+6*S,off.y+3*S,S,S);
  ctx.fillStyle='#fff'; ctx.fillRect(off.x+2*S+1,off.y+3*S+1,S-2,S-2); ctx.fillRect(off.x+6*S+1,off.y+3*S+1,S-2,S-2);
  ctx.fillStyle='#111'; ctx.fillRect(off.x+3*S,off.y+5*S,3*S,2);
  ctx.restore();
}

function drawMushroom(ctx, t, colors) {
  const bob=Math.sin(t*0.04)*1;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2+bob*S);
  const off={x:-4.5*S,y:-5*S};
  const hat=[[0,0,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1]];
  hat.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r<1?colors.dark:colors.main; ctx.fillRect(off.x+c*S,off.y+r*S,S,S);}));
  ctx.fillStyle=colors.spot||'#fff';
  [[2,1],[6,2],[3,3],[7,1],[5,4]].forEach(([c,r])=>ctx.fillRect(off.x+c*S,off.y+r*S,S,S));
  const face=[[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,0,1,1,1,0,0]];
  face.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle='#f0d0a0'; ctx.fillRect(off.x+(c+1)*S,off.y+(5+r)*S,S,S);}));
  ctx.fillStyle='#333';
  ctx.fillRect(off.x+2*S,off.y+6*S,S,S); ctx.fillRect(off.x+5*S,off.y+6*S,S,S);
  ctx.fillRect(off.x+2*S,off.y+5*S,2*S,2); ctx.fillRect(off.x+5*S,off.y+5*S,2*S,2);
  ctx.fillRect(off.x+3*S,off.y+7*S,3*S,S);
  ctx.fillStyle='#fff'; ctx.fillRect(off.x+3*S,off.y+7*S,S,S); ctx.fillRect(off.x+5*S,off.y+7*S,S,S);
  ctx.restore();
}

function drawBat(ctx, t, colors) {
  const fly=Math.sin(t*0.06)*2, wing=Math.sin(t*0.1);
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2+fly*S);
  const ws=[[1,1,0,0],[1,1,1,0],[0,1,1,1],[0,0,1,1]];
  ctx.save(); ctx.scale(-(1+wing*0.3),1);
  ws.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=colors.dark; ctx.fillRect((-5+c)*S,(-2+r)*S,S,S);}));
  ctx.restore();
  ctx.save(); ctx.scale(1+wing*0.3,1);
  ws.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=colors.dark; ctx.fillRect((1+c)*S,(-2+r)*S,S,S);}));
  ctx.restore();
  const body=[[0,1,1,0],[1,1,1,1],[1,1,1,1],[0,1,1,0]];
  body.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r<1?colors.dark:colors.main; ctx.fillRect((-2+c)*S,(-2+r)*S,S,S);}));
  ctx.fillStyle=colors.eye||'#ff4444'; ctx.fillRect(-S,-S,S,S); ctx.fillRect(0,-S,S,S);
  ctx.fillStyle=colors.main; ctx.fillRect(-2*S,-3*S,S,S); ctx.fillRect(S,-3*S,S,S);
  ctx.fillStyle='#fff'; ctx.fillRect(-S,S,S-1,S); ctx.fillRect(0,S,S-1,S);
  ctx.restore();
}

function drawGhost(ctx, t, colors) {
  const fl=Math.sin(t*0.04)*2, op=0.7+Math.sin(t*0.03)*0.3;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2+fl*S);
  ctx.globalAlpha=op;
  const body=[[0,0,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,0,1,0,1,0,1,0,1]];
  const off={x:-4.5*S,y:-3.5*S};
  body.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r<2?colors.dark:colors.main; ctx.fillRect(off.x+c*S,off.y+r*S,S,S);}));
  ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.fillRect(off.x+S,off.y+S,S,S);
  ctx.fillStyle=colors.dark; ctx.fillRect(off.x+2*S,off.y+2*S,2*S,S); ctx.fillRect(off.x+5*S,off.y+2*S,2*S,S);
  ctx.fillStyle=colors.eye||'#aaaaff'; ctx.fillRect(off.x+2*S+1,off.y+2*S+1,S,S-2); ctx.fillRect(off.x+5*S+1,off.y+2*S+1,S,S-2);
  ctx.fillStyle=colors.dark;
  for(let i=0;i<5;i++) ctx.fillRect(off.x+(2+i)*S,off.y+4*S+(i%2===0?0:S),S,S);
  ctx.globalAlpha=1; ctx.restore();
}

function drawRat(ctx, t, colors) {
  const run=Math.sin(t*0.08)*2, lp=Math.floor(t/8)%2, tw=Math.sin(t*0.06);
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2+run*S*0.3,ctx.canvas.height/2);
  // Schwanz
  ctx.strokeStyle=colors.dark; ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(5*S,0); ctx.lineTo(7*S,tw*S*0.8); ctx.lineTo(9*S,tw*S*1.5-S); ctx.lineTo(11*S,tw*S*0.5-2*S);
  ctx.stroke();
  const off={x:-5*S,y:-2*S};
  const body=[[0,0,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0]];
  body.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r===0?colors.dark:colors.main; ctx.fillRect(off.x+c*S,off.y+r*S,S,S);}));
  const hoff={x:-10*S,y:-3*S};
  const head=[[0,0,1,1,0],[0,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,0,0]];
  head.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r<1?colors.dark:colors.main; ctx.fillRect(hoff.x+c*S,hoff.y+r*S,S,S);}));
  ctx.fillStyle=colors.nose||'#ff8899'; ctx.fillRect(hoff.x-2*S,hoff.y+2*S,S,S*0.5);
  ctx.strokeStyle='#ddbbcc'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(hoff.x-2*S,hoff.y+2*S+2); ctx.lineTo(hoff.x-5*S,hoff.y+S+2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hoff.x-2*S,hoff.y+3*S); ctx.lineTo(hoff.x-5*S,hoff.y+3*S); ctx.stroke();
  ctx.fillStyle='#111'; ctx.fillRect(hoff.x+S,hoff.y+S,S+1,S+1);
  ctx.fillStyle=colors.eye||'#ff2244'; ctx.fillRect(hoff.x+S+1,hoff.y+S+1,S-1,S-1);
  ctx.fillStyle=colors.main; ctx.fillRect(hoff.x+2*S,hoff.y-S,S,S); ctx.fillRect(hoff.x+S,hoff.y-S,S,S);
  // Beine
  ctx.fillStyle=colors.dark;
  if(lp===0){
    ctx.fillRect(off.x+S,off.y+5*S,S,S); ctx.fillRect(off.x+3*S,off.y+4*S,S,S);
    ctx.fillRect(off.x+5*S,off.y+5*S,S,S); ctx.fillRect(off.x+7*S,off.y+4*S,S,S);
  } else {
    ctx.fillRect(off.x+S,off.y+4*S,S,S); ctx.fillRect(off.x+3*S,off.y+5*S,S,S);
    ctx.fillRect(off.x+5*S,off.y+4*S,S,S); ctx.fillRect(off.x+7*S,off.y+5*S,S,S);
  }
  ctx.restore();
}

function drawSkeleton(ctx, t, colors) {
  const shake=Math.sin(t*0.08)*0.5;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2+shake*S,ctx.canvas.height/2);
  const off={x:-3.5*S,y:-5*S};
  const head=[[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[0,1,1,1,1,1,0],[0,1,0,1,0,1,0]];
  head.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r===0?colors.dark:colors.main; ctx.fillRect(off.x+c*S,off.y+r*S,S,S);}));
  ctx.fillStyle='#111'; ctx.fillRect(off.x+S,off.y+S,2*S,2*S); ctx.fillRect(off.x+4*S,off.y+S,2*S,2*S);
  ctx.fillStyle=colors.eye||'#cc4444'; ctx.fillRect(off.x+S+1,off.y+S+1,S,S); ctx.fillRect(off.x+4*S+1,off.y+S+1,S,S);
  ctx.fillStyle=colors.main;
  ctx.fillRect(off.x+2*S,off.y+6*S,3*S,S); ctx.fillRect(off.x+3*S,off.y+7*S,S,3*S);
  ctx.fillRect(off.x+S,off.y+7*S,S,S); ctx.fillRect(off.x+5*S,off.y+7*S,S,S);
  ctx.fillRect(off.x+S,off.y+9*S,S,S); ctx.fillRect(off.x+5*S,off.y+9*S,S,S);
  ctx.fillRect(off.x+2*S,off.y+10*S,S,2*S); ctx.fillRect(off.x+4*S,off.y+10*S,S,2*S);
  ctx.restore();
}

function drawGolem(ctx, t, colors) {
  const rumble=Math.sin(t*0.12)*0.3;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2+rumble*S,ctx.canvas.height/2);
  const off={x:-3.5*S,y:-5*S};
  const body=[[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]];
  body.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=(r+c)%2===0?colors.dark:colors.main; ctx.fillRect(off.x+c*S,off.y+r*S,S,S);}));
  ctx.fillStyle=colors.crack||'#5a3010'; ctx.fillRect(off.x+2*S,off.y+2*S,1,3*S); ctx.fillRect(off.x+5*S,off.y+S,1,2*S);
  ctx.fillStyle=colors.eye||'#ff6600'; ctx.fillRect(off.x+S,off.y+S,2*S,S); ctx.fillRect(off.x+4*S,off.y+S,2*S,S);
  ctx.fillStyle=colors.eyeInner||'#ffaa00'; ctx.fillRect(off.x+S+1,off.y+S+1,S-2,S-2); ctx.fillRect(off.x+4*S+1,off.y+S+1,S-2,S-2);
  ctx.fillStyle=colors.main;
  ctx.fillRect(off.x-2*S,off.y+2*S,2*S,3*S); ctx.fillRect(off.x+7*S,off.y+2*S,2*S,3*S);
  ctx.fillRect(off.x+S,off.y+6*S,2*S,2*S); ctx.fillRect(off.x+4*S,off.y+6*S,2*S,2*S);
  ctx.restore();
}

function drawMummy(ctx, t, colors) {
  const schlur=Math.sin(t*0.03)*1.5, blink=Math.floor(t/60)%8===0;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2+schlur*S*0.3,ctx.canvas.height/2);
  const off={x:-3.5*S,y:-6*S};
  const tailOff=Math.sin(t*0.04)*S;
  ctx.fillStyle=colors.main;
  ctx.fillRect(off.x+5*S,off.y+8*S+tailOff*0.5,S,S);
  ctx.fillRect(off.x+6*S,off.y+9*S+tailOff,S*2,S*0.5);
  ctx.fillRect(off.x-S,off.y+7*S+tailOff*0.3,S,S*0.5);
  const body=[[0,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0],[0,1,1,0,0,1,1,0],[0,1,1,0,0,1,1,0]];
  body.forEach((row,r)=>row.forEach((v,c)=>{
    if(!v)return;
    const isStripe=r%2===0, isGap=c%3===0&&r%2===1;
    ctx.fillStyle=isGap?colors.dark:isStripe?colors.light||'#d4c898':colors.main;
    ctx.fillRect(off.x+c*S,off.y+r*S,S,S);
  }));
  const head=[[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[0,1,1,1,1,1,0]];
  head.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r===0?colors.dark:colors.main; ctx.fillRect(off.x+(c+0.5)*S,off.y+(-5+r)*S,S,S);}));
  if(blink){
    ctx.fillStyle=colors.dark; ctx.fillRect(off.x+2*S,off.y-3*S,2*S,2); ctx.fillRect(off.x+5*S,off.y-3*S,2*S,2);
  } else {
    ctx.fillStyle='#111'; ctx.fillRect(off.x+2*S,off.y-4*S,2*S,S); ctx.fillRect(off.x+5*S,off.y-4*S,2*S,S);
    ctx.fillStyle=colors.eye||'#00ff88'; ctx.fillRect(off.x+2*S+1,off.y-4*S+1,S-1,S-2);
    ctx.fillStyle='#888866'; ctx.fillRect(off.x+5*S,off.y-4*S,S,S);
  }
  ctx.fillStyle=colors.main;
  ctx.fillRect(off.x-3*S,off.y+S,3*S,S); ctx.fillRect(off.x+8*S,off.y+S,3*S,S);
  ctx.restore();
}

function drawWizard(ctx, t, colors) {
  const bob=Math.sin(t*0.04)*1, sparkle=Math.floor(t/8)%4;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2+bob*S*0.5);
  const off={x:-3.5*S,y:-7*S};
  const cloak=[[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,0,1,0,1,1],[1,0,0,0,0,0,1]];
  cloak.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r<2?colors.dark:colors.main; ctx.fillRect(off.x+c*S,off.y+(r+3)*S,S,S);}));
  ctx.fillStyle=colors.star||'#a080ff';
  [[1,4],[5,5],[2,6],[4,4],[6,4]].forEach(([c,r])=>ctx.fillRect(off.x+c*S,off.y+r*S,S*0.5,S*0.5));
  ctx.fillStyle='#e8c080';
  [[0,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]].forEach((row,r)=>row.forEach((v,c)=>{
    if(!v)return; ctx.fillStyle=r===0?'#c8a060':'#e8c080'; ctx.fillRect(off.x+(c+1)*S,off.y+r*S-S,S,S);
  }));
  ctx.fillStyle='#e0e0e0';
  ctx.fillRect(off.x+2*S,off.y+2*S,S,S); ctx.fillRect(off.x+3*S,off.y+2*S,S,S); ctx.fillRect(off.x+4*S,off.y+2*S,S,S);
  ctx.fillStyle=colors.eye||'#ff8800'; ctx.fillRect(off.x+2*S,off.y,S,S); ctx.fillRect(off.x+4*S,off.y,S,S);
  ctx.fillStyle='#ffcc00'; ctx.fillRect(off.x+2*S+1,off.y+1,S-2,S-2); ctx.fillRect(off.x+4*S+1,off.y+1,S-2,S-2);
  ctx.fillStyle=colors.dark;
  ctx.fillRect(off.x+3*S,off.y-4*S,S,S); ctx.fillRect(off.x+2*S,off.y-3*S,3*S,S);
  ctx.fillRect(off.x+2*S,off.y-2*S,3*S,S); ctx.fillRect(off.x+S,off.y-S,5*S,S);
  ctx.fillStyle=colors.main; ctx.fillRect(off.x,off.y,7*S,S);
  ctx.fillStyle='#ffcc00'; ctx.fillRect(off.x+3*S,off.y-3*S,S,S);
  const sc=['#ff88ff','#ffaaff','#ffffff','#cc66ff'];
  ctx.fillStyle=colors.main; ctx.fillRect(off.x+8*S,off.y+S,S,6*S);
  ctx.fillStyle=sc[sparkle]; ctx.fillRect(off.x+7*S,off.y,3*S,S); ctx.fillRect(off.x+8*S,off.y-S,S,3*S);
  ctx.restore();
}

function drawGlitch(ctx, t, colors) {
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
  const gx=(Math.random()-0.5)*2;
  const body=[[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[0,1,0,1,0,1,0]];
  const off={x:-3.5*S+gx*S,y:-3*S};
  body.forEach((row,r)=>row.forEach((v,c)=>{
    if(!v)return;
    const glitch=Math.random()>0.9;
    ctx.fillStyle=glitch?colors.glitch:r<1?colors.dark:colors.main;
    ctx.fillRect(off.x+c*S+(glitch?(Math.random()-0.5)*S:0),off.y+r*S,S,S);
  }));
  if(Math.random()>0.7){ctx.fillStyle=colors.glitch; ctx.fillRect(off.x,off.y+S*Math.floor(Math.random()*5),7*S,1);}
  ctx.fillStyle=colors.main; ctx.fillRect(off.x+S,off.y+S,2*S,S); ctx.fillRect(off.x+4*S,off.y+S,2*S,S);
  ctx.fillStyle='#fff'; ctx.fillRect(off.x+S,off.y+S,S,S); ctx.fillRect(off.x+4*S,off.y+S,S,S);
  ctx.fillStyle=colors.main; ctx.font=`bold ${S*3}px monospace`; ctx.textAlign='center'; ctx.fillText('?',gx*S,off.y+4*S);
  ctx.restore();
}

const CODE_CHARS=['0','1','<','>','{','}','/',';','#','?','!','='];
function drawCode(ctx, t, colors) {
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
  const float=Math.sin(t*0.03)*2, rot=Math.sin(t*0.02)*0.1;
  const frags=[
    {x:-5,y:-4+Math.sin(t*0.04)*1.5,c:CODE_CHARS[Math.floor(t/20)%CODE_CHARS.length],col:colors.accent||'#00ffcc'},
    {x:4, y:-3+Math.sin(t*0.05)*1.5,c:CODE_CHARS[Math.floor(t/15)%CODE_CHARS.length],col:colors.glitch||'#ff40ff'},
    {x:-4,y:3+Math.sin(t*0.06)*1.5, c:CODE_CHARS[Math.floor(t/18)%CODE_CHARS.length],col:'#40ffff'},
    {x:5, y:4+Math.sin(t*0.04)*1.5, c:CODE_CHARS[Math.floor(t/12)%CODE_CHARS.length],col:'#ffff40'},
  ];
  ctx.font=`bold ${S*2}px monospace`; ctx.textAlign='center'; ctx.textBaseline='middle';
  frags.forEach(f=>{ctx.fillStyle=f.col; ctx.globalAlpha=0.7+Math.sin(t*0.05)*0.3; ctx.fillText(f.c,f.x*S,(f.y+float*0.3)*S);});
  ctx.globalAlpha=1;
  ctx.save(); ctx.rotate(rot); ctx.translate(0,float*S*0.5);
  const body=[[0,1,1,1,1,0],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[0,1,1,1,1,0]];
  const off={x:-3*S,y:-3*S};
  body.forEach((row,r)=>row.forEach((v,c)=>{
    if(!v)return;
    const glitch=Math.random()>0.85;
    ctx.fillStyle=glitch?colors.glitch:['#004488','#0066cc','#0088ff','#00aaff'][(r+c)%4];
    ctx.fillRect(off.x+c*S+(glitch?(Math.random()-0.5)*2:0),off.y+r*S,S,S);
  }));
  const blink=Math.floor(t/20)%2===0;
  ctx.fillStyle=blink?colors.main:'#004488';
  ctx.fillRect(off.x+S,off.y+S,S,S); ctx.fillRect(off.x+4*S,off.y+S,S,S);
  ctx.fillStyle=colors.main; ctx.font=`bold ${S*1.5}px monospace`; ctx.fillText('<>',0,off.y+4*S);
  if(Math.random()>0.75){ctx.fillStyle=colors.glitch; ctx.globalAlpha=0.6; ctx.fillRect(off.x,off.y+S*Math.floor(Math.random()*5),6*S,1); ctx.globalAlpha=1;}
  ctx.restore(); ctx.restore();
}

function drawDragon(ctx, t, colors) {
  const breathe=Math.sin(t*0.04)*1, wf=Math.sin(t*0.08);
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2+breathe*S*0.5);
  ctx.fillStyle=colors.dark;
  const wo=wf*S;
  ctx.beginPath(); ctx.moveTo(-S*2,-S*3+wo); ctx.lineTo(-S*5,-S*5+wo); ctx.lineTo(-S*4,-S*2+wo); ctx.lineTo(-S*2,-S); ctx.fill();
  ctx.beginPath(); ctx.moveTo(S*2,-S*3+wo); ctx.lineTo(S*5,-S*5+wo); ctx.lineTo(S*4,-S*2+wo); ctx.lineTo(S*2,-S); ctx.fill();
  const body=[[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[0,1,1,1,1,1,0],[0,0,1,1,1,0,0]];
  const off={x:-3.5*S,y:-3*S};
  body.forEach((row,r)=>row.forEach((v,c)=>{if(!v)return; ctx.fillStyle=r<2?colors.dark:colors.main; ctx.fillRect(off.x+c*S,off.y+r*S,S,S);}));
  ctx.fillStyle=colors.scale||colors.dark;
  [[2,2],[4,2],[3,3],[2,4],[4,4]].forEach(([c,r])=>ctx.fillRect(off.x+c*S,off.y+r*S,S,S));
  ctx.fillStyle=colors.horn||'#ffaa00'; ctx.fillRect(off.x+S,off.y-2*S,S,2*S); ctx.fillRect(off.x+5*S,off.y-2*S,S,2*S);
  ctx.fillStyle=colors.eye||'#ffff00'; ctx.fillRect(off.x+S,off.y+S,2*S,S); ctx.fillRect(off.x+4*S,off.y+S,2*S,S);
  ctx.fillStyle='#000'; ctx.fillRect(off.x+S+1,off.y+S,S,S); ctx.fillRect(off.x+4*S+1,off.y+S,S,S);
  if(Math.sin(t*0.03)>0.3){
    (colors.flames||['#ff6600','#ff9900','#ffcc00']).forEach((c,i)=>{ctx.fillStyle=c; ctx.globalAlpha=0.8-i*0.2; ctx.fillRect(off.x+(3-i*0.5)*S,off.y+(6+i)*S,(1+i)*S,S);});
    ctx.globalAlpha=1;
  }
  ctx.fillStyle=colors.main; ctx.fillRect(off.x-S,off.y+3*S,S,S); ctx.fillRect(off.x-2*S,off.y+4*S,S,S); ctx.fillRect(off.x-3*S,off.y+5*S,S,S);
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════
// MONSTER DATEN
// ═══════════════════════════════════════════════════════════════

const MONSTERS = {

  // ── STUFE 1: DER WALD ────────────────────────────────────────

  slime: {
    id:'slime', name:'SLIME', stage:1, isBoss:false,
    baseHp:100, resistance:1.0, shield:0,
    color:'#52e07c',
    colors:{main:'#52e07c', dark:'#28902a'},
    canvasW:24, canvasH:20,
    draw: drawSlime,
    // Kein Board-Effekt
    effect: null,
    // Sprüche
    intro:   ["Blub...", "Blub blub!", "...blub?"],
    idle:    ["Blub!", "...blub blub...", "Blub blub blub!"],
    attack:  ["BLUB!", "...blub.", "Blub?!"],
    lowHp:   ["bl...ub...", "...blub...", "bllllub..."],
    defeat:  ["...blub.", "...b-blub...", "*blub*"],
    ability: null,
    abilityText: null,
  },

  mushroom: {
    id:'mushroom', name:'PILZ', stage:1, isBoss:false,
    baseHp:140, resistance:0.9, shield:0,
    color:'#ff7777',
    colors:{main:'#ff5555', dark:'#aa2222', spot:'#fff'},
    canvasW:24, canvasH:22,
    draw: drawMushroom,
    effect: {
      type: 'hideSums',
      description: 'Versteckt 3 zufällige Käfig-Summen',
      count: 3,
    },
    intro:   ["Hehehe...", "Meine Sporen sind überall!", "Du kannst nicht entkommen..."],
    idle:    ["Hehe...", "Spür meine Sporen!", "Muhahaha..."],
    attack:  ["SPOREN-ANGRIFF!", "Hehehe! Sieh nichts mehr!", "Atme tief ein..."],
    lowHp:   ["Ich... werde zurückkehren...", "Meine Sporen... überall...", "Husten... hehe..."],
    defeat:  ["Nein... meine Sporen...", "Ich verwelke... aber kehre zurück!", "Hehe... das war nur... Runde 1..."],
    ability: 'hideSums',
    abilityText: '🍄 Sporenwolke! Käfig-Summen verschwinden...',
  },

  bat: {
    id:'bat', name:'FLEDERMAUS', stage:1, isBoss:true,
    baseHp:200, resistance:0.85, shield:10,
    color:'#c077ff',
    colors:{main:'#c077ff', dark:'#7030c0', eye:'#ff4444'},
    canvasW:22, canvasH:18,
    draw: drawBat,
    effect: {
      type: 'fogBox',
      description: 'Nebel über eine zufällige 3x3 Box',
    },
    intro:   ["Die Nacht gehört mir!", "KREEEE!", "Fürchte die Dunkelheit!"],
    idle:    ["Kree...", "Ich seh dich...", "Die Dunkelheit naht..."],
    attack:  ["FINSTERNISANGRIFF!", "KREEEE! Sieh NICHTS!", "Dunkel... alles dunkel!"],
    lowHp:   ["Meine... Flügel...", "Kree... kree...", "Die Sonne... brennt mich..."],
    defeat:  ["KREEEE...!", "Die... Nacht... gehört... dir...", "Ich kehre... aus der Dunkelheit... zurück..."],
    ability: 'fogBox',
    abilityText: '🦇 Finsternis! Nebel verdunkelt das Board!',
  },

  // ── STUFE 2: DIE GRUFT ───────────────────────────────────────

  ghost: {
    id:'ghost', name:'EISGEIST', stage:2, isBoss:false,
    baseHp:180, resistance:0.8, shield:0,
    color:'#7ab0ff',
    colors:{main:'#7ab0ff', dark:'#3060bb', eye:'#ccddff'},
    canvasW:24, canvasH:20,
    draw: drawGhost,
    effect: {
      type: 'stealNumber',
      description: 'Klaut deine zuletzt eingetragene Zahl',
    },
    intro:   ["Ich bin schon lange hier...", "Deine Zahlen... gehören mir.", "Buhhhh..."],
    idle:    ["Buhhh...", "Ich bin überall...", "Fühlst du die Kälte?"],
    attack:  ["BESESSEN! Deine Zahl gehört mir!", "Buhhhh! Vergiss was du wusstest!", "Geist-Diebstahl!"],
    lowHp:   ["Ich... verblasse...", "Die andere Seite... ruft...", "Buh... buh..."],
    defeat:  ["Ich... gehe... in Frieden...", "Bis wir uns... wiedersehen...", "Buhhh...zzz..."],
    ability: 'stealNumber',
    abilityText: '👻 Besessenheit! Deine letzte Zahl verschwindet!',
  },

  rat: {
    id:'rat', name:'GRUFT-RATTE', stage:2, isBoss:false,
    baseHp:150, resistance:0.85, shield:0,
    color:'#cc8899',
    colors:{main:'#aa7788', dark:'#775566', eye:'#ff2244', nose:'#ff8899'},
    canvasW:28, canvasH:20,
    draw: drawRat,
    effect: {
      type: 'hideNotes',
      description: 'Löscht alle deine Notizen',
    },
    intro:   ["QUIEK!", "Wir sind viele!", "Du bist in unserem Revier!"],
    idle:    ["Quiek...", "Ich rieche deine Angst!", "QUIEK QUIEK!"],
    attack:  ["SCHWARM-ANGRIFF! Deine Notizen!", "QUIEK! Weg damit!", "Der Schwarm verschlingt alles!"],
    lowHp:   ["Quiek... quiek...", "Rückzug... quiek...", "Ich hol Verstärkung... quiek..."],
    defeat:  ["QUIEEEK...!", "Wir... kommen zurück... zu zehnt...", "Quiek... quiek...zzz..."],
    ability: 'hideNotes',
    abilityText: '🐀 Rattenschwarm! Alle Notizen verschwinden!',
  },

  skeleton: {
    id:'skeleton', name:'SKELETT', stage:2, isBoss:true,
    baseHp:280, resistance:0.75, shield:20,
    color:'#d4c080',
    colors:{main:'#d4c080', dark:'#907040', eye:'#ff8800'},
    canvasW:22, canvasH:26,
    draw: drawSkeleton,
    effect: {
      type: 'cursedCells',
      description: 'Verflucht 2 Zellen — Fehler dort macht doppelten Schaden',
      count: 2,
    },
    intro:   ["Klapper klapper...", "Ich bin schon lange tot. Du bald auch.", "Klappern ist meine Sprache."],
    idle:    ["Klapper...", "Knochen brechen nie...", "Tick... tack... klapper..."],
    attack:  ["FLUCH DER TOTEN! Vorsicht...", "Klapper KLAPPER! Verflucht!", "Die Knochen sprechen..."],
    lowHp:   ["Klap... per...", "Meine Knochen... zerfallen...", "Ich... bin... unsterblich..."],
    defeat:  ["KLAPPER... klapper...", "Ich... falle... auseinander...", "Nur... Knochen... übrig..."],
    ability: 'cursedCells',
    abilityText: '💀 Fluch! Zellen sind verflucht — Fehler kostet doppelt!',
  },

  // ── STUFE 3: DIE RUINEN ──────────────────────────────────────

  golem: {
    id:'golem', name:'LAVA-GOLEM', stage:3, isBoss:false,
    baseHp:350, resistance:0.65, shield:30,
    color:'#e08844',
    colors:{main:'#e08844', dark:'#904020', crack:'#3a1808', eye:'#ff3300', eyeInner:'#ff8800'},
    canvasW:26, canvasH:24,
    draw: drawGolem,
    effect: {
      type: 'freezeCells',
      description: 'Friert 3 zufällige Zellen ein',
      count: 3,
    },
    intro:   ["...", "RUMBLE.", "Ich... bin... Stein."],
    idle:    ["...", "Rumble...", "Grrrr..."],
    attack:  ["ERDBEBEN! Zellen eingefroren!", "RUMBLE! Nichts bewegt sich!", "Stein... friert... alles!"],
    lowHp:   ["Rum... ble...", "Ich... breche...", "Stein... zerbricht... nie..."],
    defeat:  ["RUMBLE...!", "Ich... zerfall... zu Staub...", "..."],
    ability: 'freezeCells',
    abilityText: '🪨 Erdbeben! Zellen sind eingefroren!',
  },

  mummy: {
    id:'mummy', name:'MUMIE', stage:3, isBoss:false,
    baseHp:300, resistance:0.7, shield:15,
    color:'#c8b890',
    colors:{main:'#c8b890', dark:'#8a7850', light:'#d4c898', eye:'#00ff88'},
    canvasW:28, canvasH:28,
    draw: drawMummy,
    effect: {
      type: 'blockHints',
      description: 'Sperrt alle Tipps für 5 Züge',
      duration: 5,
    },
    intro:   ["Ich schlummerte... 3000 Jahre...", "Der Fluch des Pharaos trifft dich!", "Erwacht... und hungrig..."],
    idle:    ["Schluuurf...", "Der Fluch...", "3000 Jahre... Schlaf..."],
    attack:  ["FLUCH DES PHARAOS! Keine Tipps!", "Schluuuurf! Deine Weisheit... verflucht!", "Der Pharao nimmt alles!"],
    lowHp:   ["Meine Verbände... zerfallen...", "Der Fluch... schwächt...", "Schluur...f..."],
    defeat:  ["Ich... kehre... in den Sarkophag...", "Der Pharao... ruft mich zurück...", "Schluuurf...zzz..."],
    ability: 'blockHints',
    abilityText: '🧟 Fluch des Pharaos! Tipps für 5 Züge gesperrt!',
  },

  wizard: {
    id:'wizard', name:'ZAUBERER', stage:3, isBoss:true,
    baseHp:420, resistance:0.6, shield:25,
    color:'#a080ff',
    colors:{main:'#3a2880', dark:'#1a0840', eye:'#ff8800', star:'#a080ff'},
    canvasW:28, canvasH:28,
    draw: drawWizard,
    effect: {
      type: 'shuffleColors',
      description: 'Alle Käfig-Farben werden gleich — kein visueller Unterschied',
    },
    intro:   ["Ich habe Sudoku studiert seit 500 Jahren!", "Deine Zahlen sind meiner Magie schutzlos!", "Abrakadabra... du verlierst!"],
    idle:    ["Hm... interessant...", "Magie ist überall...", "Ich sehe deine Schwächen..."],
    attack:  ["FARBZAUBER! Alles sieht gleich aus!", "Abrakadabra! Verwirrung!", "Meine Magie verwirrt dich!"],
    lowHp:   ["Mein Zauberstab... schwächelt...", "Die Magie... lässt nach...", "Abra... kada... bra..."],
    defeat:  ["Unmöglich... meine Magie...", "Ein würdiger Gegner... Respekt...", "Abrakadabra... auf Wiedersehen..."],
    ability: 'shuffleColors',
    abilityText: '🧙 Farbzauber! Alle Käfige sehen gleich aus!',
  },

  // ── STUFE 4: DIE VOID ────────────────────────────────────────

  glitch: {
    id:'glitch', name:'VOID-GLITCH', stage:4, isBoss:false,
    baseHp:500, resistance:0.5, shield:0,
    color:'#ff40ff',
    colors:{main:'#ff40ff', dark:'#880088', glitch:'#00ffcc'},
    canvasW:22, canvasH:20,
    draw: drawGlitch,
    effect: {
      type: 'shuffleNumpad',
      description: 'Mischt die Numpad-Tasten zufällig durch',
    },
    intro:   ["ERR0R: Realität nicht gefunden.", "404 - Sudoku nicht mehr sicher.", "SYSTEM FEHLER... hehe..."],
    idle:    ["Err0r...", "Gl1tch...", "404..."],
    attack:  ["DATENFEHLER! Numpad zerstört!", "ERR0R! Was ist welche Taste?!", "GL1TCH! Alles durcheinander!"],
    lowHp:   ["Syst3m... failt...", "Err0r... err0r...", "Gl1tch... gl1tch..."],
    defeat:  ["ERR0R: Ich existiere nicht mehr...", "404 - Gl1tch nicht gefunden...", "Syst3m... shutdown..."],
    ability: 'shuffleNumpad',
    abilityText: '💠 Datenfehler! Numpad komplett durchgemischt!',
  },

  code: {
    id:'code', name:'CODE-SCHNIPSEL', stage:4, isBoss:false,
    baseHp:450, resistance:0.55, shield:20,
    color:'#00ffcc',
    colors:{main:'#00ffcc', dark:'#004488', glitch:'#ff40ff', accent:'#00ffcc'},
    canvasW:26, canvasH:26,
    draw: drawCode,
    effect: {
      type: 'fakeSums',
      description: 'Käfig-Summen zeigen falsche Zahlen an',
      duration: 4,
    },
    intro:   ["Ich bin überall im Code...", "SYNTAX ERROR in deinem Gehirn!", "Null und Eins... das ist alles."],
    idle:    ["01001...", "Parsing...", "Compiling..."],
    attack:  ["SYNTAX ERROR! Falsche Summen!", "COMPILE FEHLER! Nichts stimmt!", "NULL POINTER! Alles lügt!"],
    lowHp:   ["Stack... overflow...", "Memory... leak...", "01...00..."],
    defeat:  ["Process... terminated...", "Segmentation... fault...", "01000000... shutdown..."],
    ability: 'fakeSums',
    abilityText: '💻 Syntax Error! Käfig-Summen sind falsch!',
  },

  dragon: {
    id:'dragon', name:'VOID-DRACHE', stage:4, isBoss:true,
    baseHp:800, resistance:0.3, shield:50,
    color:'#cc44ff',
    colors:{main:'#cc44ff', dark:'#660088', scale:'#aa22cc', horn:'#ff88ff', eye:'#ff00ff', flames:['#cc00ff','#ff44ff','#ffaaff']},
    canvasW:26, canvasH:24,
    draw: drawDragon,
    effect: {
      type: 'chaos',
      description: 'Kombiniert 2 zufällige Effekte gleichzeitig',
    },
    intro:   [
      "Ich habe Sudoku gespielt bevor du geboren wurdest.",
      "Die Void verschluckt alles. Auch dich.",
      "Tausend Jahre... und noch nie verloren.",
    ],
    idle:    ["...", "Ich sehe alles...", "Die Void flüstert mir..."],
    attack:  ["FEUERSBRUNST DER VOID! CHAOS!", "Alles brennt! Alles zerfällt!", "VOID-CHAOS! Kein Entkommen!"],
    lowHp:   ["Unmöglich...", "Die Void... verlässt mich...", "Ich... bin... unsterblich..."],
    defeat:  [
      "Du... hast... gewonnen... Aber die Void... kommt zurück...",
      "Respekt... Würdiger Gegner der Void...",
      "Ich kehre... in die Dunkelheit... bis wir uns wiedersehen...",
    ],
    ability: 'chaos',
    abilityText: '🐉 Void-Feuersbrunst! Doppelter Chaos-Angriff!',
  },
};

// ── STUFEN KONFIGURATION ─────────────────────────────────────────
const STAGES = [
  {
    id: 1,
    name: 'Der Wald',
    emoji: '🌿',
    color: '#52e07c',
    bg: 'radial-gradient(ellipse at 50% 0%, #0a2010 0%, #080610 70%)',
    difficulty: 'easy',
    monsters: [
      // 10 Kämpfe: Slime × 4, Pilz × 3, Fledermaus × 2, Boss-Fledermaus × 1
      {id:'slime',    hpMult:1.0, dmgMult:1.0, abilityEvery:null},
      {id:'slime',    hpMult:1.2, dmgMult:1.0, abilityEvery:null},
      {id:'mushroom', hpMult:1.0, dmgMult:1.0, abilityEvery:5},
      {id:'slime',    hpMult:1.4, dmgMult:1.1, abilityEvery:null},
      {id:'mushroom', hpMult:1.2, dmgMult:1.1, abilityEvery:4},
      {id:'bat',      hpMult:0.8, dmgMult:1.0, abilityEvery:4},
      {id:'mushroom', hpMult:1.4, dmgMult:1.2, abilityEvery:3},
      {id:'slime',    hpMult:1.6, dmgMult:1.2, abilityEvery:null},
      {id:'bat',      hpMult:1.0, dmgMult:1.1, abilityEvery:3},
      {id:'bat',      hpMult:1.5, dmgMult:1.3, abilityEvery:2, isFinalBoss:true},
    ],
    reward: {hp:30, xp:200, item:'🧪 Kleiner Heiltrank'},
  },
  {
    id: 2,
    name: 'Die Gruft',
    emoji: '💀',
    color: '#7ab0ff',
    bg: 'radial-gradient(ellipse at 50% 0%, #0a1020 0%, #080610 70%)',
    difficulty: 'mittel',
    monsters: [
      {id:'ghost',    hpMult:1.0, dmgMult:1.0, abilityEvery:5},
      {id:'rat',      hpMult:1.0, dmgMult:1.0, abilityEvery:4},
      {id:'ghost',    hpMult:1.2, dmgMult:1.1, abilityEvery:4},
      {id:'rat',      hpMult:1.2, dmgMult:1.1, abilityEvery:3},
      {id:'skeleton', hpMult:0.7, dmgMult:1.0, abilityEvery:4},
      {id:'ghost',    hpMult:1.4, dmgMult:1.2, abilityEvery:3},
      {id:'rat',      hpMult:1.4, dmgMult:1.2, abilityEvery:3},
      {id:'skeleton', hpMult:0.9, dmgMult:1.1, abilityEvery:3},
      {id:'ghost',    hpMult:1.6, dmgMult:1.3, abilityEvery:2},
      {id:'skeleton', hpMult:1.4, dmgMult:1.4, abilityEvery:2, isFinalBoss:true},
    ],
    reward: {hp:50, xp:400, item:'🧪 Großer Heiltrank'},
  },
  {
    id: 3,
    name: 'Die Ruinen',
    emoji: '🪨',
    color: '#e08844',
    bg: 'radial-gradient(ellipse at 50% 0%, #201008 0%, #080610 70%)',
    difficulty: 'schwer',
    monsters: [
      {id:'golem',  hpMult:0.8, dmgMult:1.0, abilityEvery:4},
      {id:'mummy',  hpMult:1.0, dmgMult:1.0, abilityEvery:4},
      {id:'golem',  hpMult:1.0, dmgMult:1.1, abilityEvery:3},
      {id:'mummy',  hpMult:1.2, dmgMult:1.1, abilityEvery:3},
      {id:'wizard', hpMult:0.6, dmgMult:1.0, abilityEvery:4},
      {id:'golem',  hpMult:1.2, dmgMult:1.2, abilityEvery:3},
      {id:'mummy',  hpMult:1.4, dmgMult:1.2, abilityEvery:2},
      {id:'wizard', hpMult:0.8, dmgMult:1.1, abilityEvery:3},
      {id:'golem',  hpMult:1.4, dmgMult:1.3, abilityEvery:2},
      {id:'wizard', hpMult:1.3, dmgMult:1.5, abilityEvery:2, isFinalBoss:true},
    ],
    reward: {hp:80, xp:700, item:'💎 Schutzkristall'},
  },
  {
    id: 4,
    name: 'Die Void',
    emoji: '💠',
    color: '#ff40ff',
    bg: 'radial-gradient(ellipse at 50% 0%, #1a0020 0%, #080610 70%)',
    difficulty: 'boshaft',
    monsters: [
      {id:'glitch', hpMult:0.8, dmgMult:1.0, abilityEvery:4},
      {id:'code',   hpMult:0.8, dmgMult:1.0, abilityEvery:4},
      {id:'glitch', hpMult:1.0, dmgMult:1.1, abilityEvery:3},
      {id:'code',   hpMult:1.0, dmgMult:1.1, abilityEvery:3},
      {id:'dragon', hpMult:0.5, dmgMult:1.0, abilityEvery:3},
      {id:'glitch', hpMult:1.2, dmgMult:1.2, abilityEvery:3},
      {id:'code',   hpMult:1.2, dmgMult:1.2, abilityEvery:2},
      {id:'dragon', hpMult:0.7, dmgMult:1.1, abilityEvery:3},
      {id:'glitch', hpMult:1.4, dmgMult:1.3, abilityEvery:2},
      {id:'dragon', hpMult:1.5, dmgMult:1.6, abilityEvery:2, isFinalBoss:true},
    ],
    reward: {hp:100, xp:1200, item:'👑 Void-Krone'},
  },
];

// ── SPIELER LEVEL SYSTEM ─────────────────────────────────────────
const BATTLE_TITLES = [
  'Frischling ⚔️',
  'Kämpfer 🗡️',
  'Krieger 🛡️',
  'Veteran ⚜️',
  'Ritter 🏇',
  'Champion 🏆',
  'Held 🌟',
  'Legende 👑',
  'Meister 💎',
  'Void-Bezwinger 😈',
];

function getBattleTitle(level) {
  return BATTLE_TITLES[Math.min(level-1, BATTLE_TITLES.length-1)];
}

function battleXpForLevel(level) {
  return Math.round(300 * Math.pow(1.5, level));
}

function calcBattleLevel(totalXp) {
  let level=1, xp=totalXp, needed=battleXpForLevel(1);
  while(xp>=needed){xp-=needed; level++; needed=battleXpForLevel(level);}
  return {level, currentXp:xp, neededXp:needed};
}

function getPlayerMaxHp(level) {
  return 50 + (level-1) * 10; // Level 1=50HP, Level 10=140HP
}

// ── SPRUCH AUSWÄHLEN ─────────────────────────────────────────────
function getRandomQuote(monster, type) {
  const quotes = monster[type];
  if(!quotes || !quotes.length) return null;
  return quotes[Math.floor(Math.random()*quotes.length)];
}

// ── BATTLE SAVE/LOAD ─────────────────────────────────────────────
function loadBattleData() {
  try {
    const s = localStorage.getItem('ns_battle');
    return s ? JSON.parse(s) : {totalXp:0, unlockedStages:[1], completedStages:[], currentStage:1, currentFight:0};
  } catch { return {totalXp:0, unlockedStages:[1], completedStages:[], currentStage:1, currentFight:0}; }
}

function saveBattleData(data) {
  try { localStorage.setItem('ns_battle', JSON.stringify(data)); } catch {}
}

function addBattleXP(amount) {
  const data = loadBattleData();
  const before = calcBattleLevel(data.totalXp);
  data.totalXp += amount;
  const after = calcBattleLevel(data.totalXp);
  saveBattleData(data);
  return {before, after, levelUp: after.level > before.level, newLevel: after.level};
}
