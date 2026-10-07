// Ritar de handritade såpbubblorna (site/img/bubbla-*.svg) i samma röda,
// lite darriga linje som logotypen och grisarna. Körs en gång för hand;
// resultatet är incheckat. Samma frö ger samma bubbla, så filerna går att
// återskapa exakt.
//
//   node kultingen/tools/bubblor.mjs
import { writeFileSync } from 'node:fs';

const RED = '#d2232a';
const out = new URL('../site/img/', import.meta.url);

// Liten deterministisk slump (mulberry32).
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Catmull-Rom genom punkterna -> kubiska bezier, så linjen blir mjuk.
function smooth(pts) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1.map(v => v.toFixed(1)).join(' ')} ${c2.map(v => v.toFixed(1)).join(' ')} ${p2.map(v => v.toFixed(1)).join(' ')}`;
  }
  return d;
}

// En handdragen ring: radien vandrar lite, och pennan går ett varv plus en
// bit så att start och slut överlappar, som när man ritar en cirkel för hand.
function ring(rand, cx, cy, r, { wobble = 0.035, extra = 0.07, from = rand() * Math.PI * 2, sweep = Math.PI * 2 } = {}) {
  const waves = [1, 2, 3].map(k => ({ k, a: (rand() - 0.5) * 2 * wobble / k, p: rand() * Math.PI * 2 }));
  const n = 48, total = sweep + extra * Math.PI * 2, pts = [];
  for (let i = 0; i <= n; i++) {
    const t = from + (total * i) / n;
    // lite inåt i slutet, så överlappet syns
    const drift = i / n > 0.9 ? -0.012 * ((i / n - 0.9) / 0.1) : 0;
    const rr = r * (1 + waves.reduce((s, w) => s + w.a * Math.sin(w.k * t + w.p), 0) + drift);
    pts.push([cx + rr * Math.cos(t), cy + rr * Math.sin(t)]);
  }
  return smooth(pts);
}

function bubble(seed) {
  const rand = rng(seed);
  const outer = ring(rand, 100, 100, 90);
  // Glansen: en kort båge uppe till vänster och en liten prick bredvid.
  const a0 = Math.PI * (1.12 + rand() * 0.06);
  const shine = ring(rand, 100, 100, 70 + rand() * 4, { from: a0, sweep: Math.PI * (0.26 + rand() * 0.06), extra: 0, wobble: 0.02 });
  const dotA = a0 + Math.PI * (0.4 + rand() * 0.04);
  const dot = ring(rand, 100 + 70 * Math.cos(dotA), 100 + 70 * Math.sin(dotA), 2.2, { extra: 0, wobble: 0.1 });
  const path = (d, w) => `<path d="${d}" fill="none" stroke="${RED}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${path(outer, 2.2)}${path(shine, 2.2)}${path(dot, 2)}</svg>\n`;
}

// Sex bubblor för USP:erna och tre små, tomma, att strö mellan dem.
for (let i = 1; i <= 6; i++) writeFileSync(new URL(`bubbla-${i}.svg`, out), bubble(1000 + i * 17));
for (let i = 1; i <= 3; i++) writeFileSync(new URL(`bubbla-liten-${i}.svg`, out), bubble(5000 + i * 31));
console.log('9 bubblor skrivna till site/img/');
