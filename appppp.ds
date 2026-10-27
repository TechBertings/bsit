import { useEffect, useState } from "react";

const CX = 320;
const CY = 215;
const W = 640;
const H = 430;
const CAM = 10;
const UNIT = 40;
const HX = 1;
const HY = 0.7;
const HZ = 0.3;
const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

const css = `
body { margin: 0; }
.od {
  --bg: #f3f5f8;
  --card: #ffffff;
  --ink: #16202e;
  --muted: #5d6b7e;
  --line: #d6dce5;
  --grid: #e8ecf2;
  --stage: #fbfcfe;
  --pos: #1f6fd1;
  --size: #0e8a6a;
  --rot: #d4501a;
  --obj: #dcd8f7;
  --obj-edge: #4b3fb0;
  --ax: #d64545;
  --ay: #2e9e5b;
  --az: #3a76d8;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ink);
  background: var(--bg);
  min-height: 100vh;
  padding: 2rem 1rem 3rem;
  box-sizing: border-box;
}
@media (prefers-color-scheme: dark) {
  .od {
    --bg: #12171f;
    --card: #1b222d;
    --ink: #eef2f7;
    --muted: #97a3b5;
    --line: #2f3a4a;
    --grid: #222b38;
    --stage: #161c26;
    --pos: #6aa8ff;
    --size: #4fd1a5;
    --rot: #ff8a5c;
    --obj: #4a4390;
    --obj-edge: #b3abff;
    --ax: #ff7a7a;
    --ay: #6fdc9a;
    --az: #7fb0ff;
  }
}
.od * { box-sizing: border-box; }
.od .wrap { max-width: 1100px; margin: 0 auto; }
.od header { margin-bottom: 1.5rem; }
.od h1 { font-size: 28px; line-height: 1.2; font-weight: 600; margin: 0 0 6px; letter-spacing: -0.01em; }
.od .lede { margin: 0; color: var(--muted); font-size: 16px; line-height: 1.6; max-width: 66ch; }
.od .layout { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 20px; align-items: start; }
.od .card { background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 12px; }
.od svg { display: block; width: 100%; height: auto; border-radius: 10px; background: var(--stage); }
.od .f-front { fill: var(--rot); fill-opacity: 0.92; }
.od .f-top { fill: var(--size); fill-opacity: 0.85; }
.od .f-side { fill: var(--obj); fill-opacity: 0.9; }
.od .under { display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center; margin: 12px 4px 0; font-size: 13px; color: var(--muted); }
.od .under label { display: flex; align-items: center; gap: 8px; }
.od .under input[type="range"] { width: 140px; accent-color: var(--pos); }
.od .sw { display: inline-block; width: 12px; height: 12px; border-radius: 3px; margin-right: 6px; vertical-align: -1px; }
.od .summary { margin: 10px 4px 4px; font-size: 15px; line-height: 1.5; min-height: 3em; }
.od .details { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 20px; margin-top: 20px; }
.od .details h2 { font-size: 15px; font-weight: 600; margin: 0 0 4px; }
.od .details p { margin: 0 0 10px; font-size: 13px; line-height: 1.5; color: var(--muted); }
.od .mat { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px; }
.od .mat span {
  text-align: center; padding: 8px 2px; font-size: 14px;
  font-variant-numeric: tabular-nums; background: var(--bg); border-radius: 6px;
}
.od .mat span.t { color: var(--pos); font-weight: 600; }
.od table { width: 100%; border-collapse: collapse; font-size: 13px; font-variant-numeric: tabular-nums; }
.od th { text-align: left; font-weight: 500; color: var(--muted); padding: 4px 6px; border-bottom: 1px solid var(--line); }
.od td { padding: 4px 6px; border-bottom: 1px solid var(--grid); }
.od td.n { color: var(--pos); }
.od .controls { display: grid; gap: 14px; }
.od .ctl {
  --c: var(--pos);
  background: var(--card); border: 1px solid var(--line); border-radius: 14px;
  padding: 14px 16px 12px; position: relative; overflow: hidden; transition: border-color 150ms;
}
.od .ctl.size { --c: var(--size); }
.od .ctl.rot { --c: var(--rot); }
.od .ctl::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: var(--c); }
.od .ctl.on { border-color: var(--c); }
.od .ctl-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.od .ctl h2 { font-size: 17px; font-weight: 600; margin: 0; }
.od .ctl .tag { font-size: 13px; color: var(--muted); margin-top: 2px; }
.od .chip { font-size: 12px; padding: 3px 9px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); white-space: nowrap; }
.od .ctl.on .chip { background: var(--c); border-color: var(--c); color: #fff; }
.od .srow { display: grid; grid-template-columns: 78px minmax(0, 1fr) 46px; align-items: center; gap: 8px; margin-top: 10px; }
.od .srow span.l { font-size: 13px; color: var(--muted); }
.od .srow input[type="range"] { width: 100%; accent-color: var(--c); }
.od .srow span.v { text-align: right; font-size: 14px; font-weight: 600; color: var(--c); font-variant-numeric: tabular-nums; }
.od .link { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 13px; color: var(--muted); }
.od .link input { accent-color: var(--size); }
.od .hint { font-size: 13px; color: var(--muted); margin: 10px 0 0; line-height: 1.5; }
.od button {
  font: inherit; font-size: 14px; padding: 9px 16px; color: var(--ink);
  background: var(--card); border: 1px solid var(--line); border-radius: 10px; cursor: pointer;
}
.od button:hover { border-color: var(--muted); }
.od button:focus-visible, .od input:focus-visible { outline: 2px solid var(--pos); outline-offset: 3px; }
.od .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1.25rem; }
.od .tabs button[aria-selected="true"], .od .seg button.on { background: var(--ink); color: var(--card); border-color: var(--ink); }
.od .seg { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
.od .calc-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 20px; align-items: start; }
.od .card h2 { font-size: 16px; font-weight: 600; margin: 0 0 8px; }
.od .fields { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 18px; }
.od .fld { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--muted); }
.od .fld input, .od .fld select {
  width: 100%; font: inherit; font-size: 15px; padding: 8px 10px; color: var(--ink);
  background: var(--bg); border: 1px solid var(--line); border-radius: 8px; font-variant-numeric: tabular-nums;
}
.od .prow { display: grid; grid-template-columns: 44px repeat(3, minmax(0, 1fr)); gap: 10px; align-items: end; margin-bottom: 10px; }
.od .chipbtn { padding: 9px 0; font-weight: 600; }
.od .chipbtn.on { background: var(--pos); border-color: var(--pos); color: var(--card); }
.od .note { font-size: 13px; color: var(--muted); margin: 0 0 12px; line-height: 1.5; }
.od .eq { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 10px 0 14px; }
.od .mat4 { display: grid; grid-template-columns: repeat(4, 50px); gap: 4px; }
.od .vec { display: grid; grid-template-columns: 50px; gap: 4px; }
.od .mat4 span, .od .vec span { text-align: center; padding: 8px 2px; font-size: 14px; font-variant-numeric: tabular-nums; background: var(--bg); border-radius: 6px; }
.od .mat4 span.t { color: var(--pos); font-weight: 600; }
.od .vec.res span { background: var(--pos); color: var(--card); font-weight: 600; }
.od .op { font-size: 20px; color: var(--muted); }
.od .steps { margin: 0 0 18px; padding: 0; list-style: none; font-size: 14px; line-height: 1.6; font-variant-numeric: tabular-nums; }
.od .steps li { padding: 5px 0; border-bottom: 1px solid var(--grid); }
.od .steps b { color: var(--pos); font-weight: 600; margin-right: 8px; }
.od .plabel { text-align: center; padding: 9px 0; font-weight: 600; background: var(--bg); border-radius: 8px; }
.od .sols { display: grid; gap: 14px; }
.od .hrow { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 8px 0; }
.od .br { border-left: 2px solid var(--ink); border-right: 2px solid var(--ink); border-radius: 8px; padding: 4px 6px; font-variant-numeric: tabular-nums; }
.od .br.col { display: grid; gap: 2px; }
.od .br.mat { display: grid; grid-template-columns: repeat(4, auto); gap: 2px 4px; }
.od .br span { text-align: center; padding: 3px 8px; font-size: 15px; min-width: 30px; white-space: nowrap; }
.od .br span.t { color: var(--pos); font-weight: 600; }
.od .br.hi span { color: var(--pos); font-weight: 600; }
.od .prob, .od .final { margin: 0 0 14px; font-size: 15px; line-height: 1.6; }
.od .final { margin: 0; }
.od .final b { font-weight: 600; }
.od .actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
.od button.primary { background: var(--pos); border-color: var(--pos); color: var(--card); font-weight: 600; }
.od button.primary:hover { filter: brightness(0.95); }
.od .err { margin: 10px 0 0; font-size: 13px; color: var(--ax); line-height: 1.5; }
.od .ptcard { margin-top: 20px; }
@media (max-width: 860px) { .od .calc-grid { grid-template-columns: 1fr; } }
@media (max-width: 860px) {
  .od .layout, .od .details { grid-template-columns: 1fr; }
  .od h1 { font-size: 24px; }
}
@media (prefers-reduced-motion: reduce) { .od .ctl { transition: none; } }
`;

const rad = (d) => (d * Math.PI) / 180;
const ident = () => [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

function mul(a, b) {
  const r = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      for (let k = 0; k < 4; k++) r[i][j] += a[i][k] * b[k][j];
  return r;
}
function mT(x, y, z) {
  const m = ident();
  m[0][3] = x; m[1][3] = y; m[2][3] = z;
  return m;
}
function mS(x, y, z) {
  const m = ident();
  m[0][0] = x; m[1][1] = y; m[2][2] = z;
  return m;
}
function mRX(d) {
  const c = Math.cos(rad(d)), s = Math.sin(rad(d));
  return [[1, 0, 0, 0], [0, c, -s, 0], [0, s, c, 0], [0, 0, 0, 1]];
}
function mRY(d) {
  const c = Math.cos(rad(d)), s = Math.sin(rad(d));
  return [[c, 0, s, 0], [0, 1, 0, 0], [-s, 0, c, 0], [0, 0, 0, 1]];
}
function mRZ(d) {
  const c = Math.cos(rad(d)), s = Math.sin(rad(d));
  return [[c, -s, 0, 0], [s, c, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
}
function tr(m, v) {
  return [0, 1, 2].map((i) => m[i][0] * v[0] + m[i][1] * v[1] + m[i][2] * v[2] + m[i][3]);
}
function project(p) {
  const k = (UNIT * CAM) / Math.max(0.5, CAM - p[2]);
  return [CX + p[0] * k, CY - p[1] * k, p[2]];
}
const base = (i) => [(i & 1 ? 1 : -1) * HX, (i & 2 ? 1 : -1) * HY, (i & 4 ? 1 : -1) * HZ];
const fmt = (n) => {
  const r = Math.round(n * 100) / 100;
  return (Object.is(r, -0) ? 0 : r).toFixed(2);
};
const fmtP = (p) => `(${fmt(p[0])}, ${fmt(p[1])}, ${fmt(p[2])})`;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function listWords(items) {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return items.join(" and ");
  return items.slice(0, -1).join(", ") + ", and " + items[items.length - 1];
}

const FACES = [
  { v: [0, 1, 3, 2], c: "f-side" },
  { v: [1, 5, 7, 3], c: "f-side" },
  { v: [0, 4, 6, 2], c: "f-side" },
  { v: [0, 1, 5, 4], c: "f-side" },
  { v: [2, 3, 7, 6], c: "f-top" },
  { v: [4, 5, 7, 6], c: "f-front" },
];
const EDGES = [];
for (let i = 0; i < 8; i++)
  for (let j = i + 1; j < 8; j++) {
    const d = i ^ j;
    if (d === 1 || d === 2 || d === 4) EDGES.push([i, j]);
  }

const START = { tx: 0, ty: 0, tz: 0, sx: 1, sy: 1, sz: 1, rx: 0, ry: 0, rz: 0 };

function Explorer({ calc }) {
  const [p, setP] = useState(START);
  const [yaw, setYaw] = useState(30);
  const [linked, setLinked] = useState(true);
  const [showBook, setShowBook] = useState(true);

  useEffect(() => {
    if (!calc) return;
    const P = calc.par;
    let next = { ...START };
    if (calc.type === "translate") next = { ...START, tx: num(P.tx), ty: num(P.ty), tz: num(P.tz) };
    if (calc.type === "scale") next = { ...START, sx: num(P.sx), sy: num(P.sy), sz: num(P.sz) };
    if (calc.type === "rotate") {
      const ang = ((((num(P.ang) + 180) % 360) + 360) % 360) - 180;
      next = { ...START, ["r" + P.axis]: ang };
    }
    setP(next);
    setLinked(next.sx === next.sy && next.sy === next.sz);
    setShowBook(false);
  }, [calc]);

  const setVal = (k, v) => {
    setP((old) => {
      if (linked && k[0] === "s") return { ...old, sx: v, sy: v, sz: v };
      return { ...old, [k]: v };
    });
  };
  const reset = () => setP(START);

  const M = mul(mT(p.tx, p.ty, p.tz), mul(mRZ(p.rz), mul(mRY(p.ry), mul(mRX(p.rx), mS(p.sx, p.sy, p.sz)))));
  const cp = calc ? calc.pts.map((r) => [num(r[0]), num(r[1]), num(r[2])]) : [];
  let fit = 1;
  if (calc) {
    const mx = Math.max(0.001, ...cp.flat().map(Math.abs), ...calc.out.flat().map(Math.abs));
    fit = mx > 3.5 ? 3.5 / mx : 1;
  }
  const V = mul(mRX(25), mul(mRY(yaw), mS(fit, fit, fit)));
  const cpNew = cp.map((v) => tr(M, v));
  const sO = cp.map((v) => project(tr(V, v)));
  const sN = cpNew.map((v) => project(tr(V, v)));

  const orig = [0, 1, 2, 3, 4, 5, 6, 7].map(base);
  const moved = orig.map((v) => tr(M, v));
  const scr = moved.map((v) => project(tr(V, v)));
  const ghost = orig.map((v) => project(tr(V, v)));

  const faces = FACES.map((f) => ({
    ...f,
    z: f.v.reduce((s, i) => s + scr[i][2], 0) / 4,
  })).sort((a, b) => a.z - b.z);

  const axisEnd = (v) => project(tr(V, v));
  const o = axisEnd([0, 0, 0]);
  const axes = [
    { end: axisEnd([3.6 / fit, 0, 0]), name: "x", color: "var(--ax)" },
    { end: axisEnd([0, 3.6 / fit, 0]), name: "y", color: "var(--ay)" },
    { end: axisEnd([0, 0, 3.6 / fit]), name: "z", color: "var(--az)" },
  ];

  const groups = [
    {
      cls: "pos", title: "Position", tag: "Translation, Tx Ty Tz",
      hint: "Slides the object along each axis. Size and orientation stay the same.",
      changed: p.tx !== 0 || p.ty !== 0 || p.tz !== 0,
      sliders: [
        { k: "tx", l: "Tx (x axis)", min: -10, max: 10, step: 0.5, show: (v) => f4(v) },
        { k: "ty", l: "Ty (y axis)", min: -6, max: 6, step: 0.5, show: (v) => f4(v) },
        { k: "tz", l: "Tz (z axis)", min: -6, max: 6, step: 0.5, show: (v) => f4(v) },
      ],
    },
    {
      cls: "size", title: "Size", tag: "Scaling, Sx Sy Sz",
      hint: "Stretches the object from the origin. Values above 1 grow it, below 1 shrink it.",
      changed: p.sx !== 1 || p.sy !== 1 || p.sz !== 1,
      link: true,
      sliders: [
        { k: "sx", l: "Sx (width)", min: 0.1, max: 5, step: 0.1, show: (v) => f4(v) + "×" },
        { k: "sy", l: "Sy (height)", min: 0.1, max: 5, step: 0.1, show: (v) => f4(v) + "×" },
        { k: "sz", l: "Sz (depth)", min: 0.1, max: 5, step: 0.1, show: (v) => f4(v) + "×" },
      ],
    },
    {
      cls: "rot", title: "Orientation", tag: "Rotation, θ around x, y, z",
      hint: "Turns the object around an axis. Applied in the order x, then y, then z.",
      changed: p.rx !== 0 || p.ry !== 0 || p.rz !== 0,
      sliders: [
        { k: "rx", l: "Around x", min: -180, max: 180, step: 5, show: (v) => v + "°" },
        { k: "ry", l: "Around y", min: -180, max: 180, step: 5, show: (v) => v + "°" },
        { k: "rz", l: "Around z", min: -180, max: 180, step: 5, show: (v) => v + "°" },
      ],
    },
  ];

  const changedNames = groups.filter((g) => g.changed).map((g) => g.title.toLowerCase());
  const sameNames = groups.filter((g) => !g.changed).map((g) => g.title.toLowerCase());
  let summary = "Nothing has changed yet. Move a slider to transform the book.";
  if (changedNames.length) {
    summary = cap(listWords(changedNames)) + " changed.";
    if (sameNames.length) summary += " " + cap(listWords(sameNames)) + " stayed the same.";
  }

  return (
    <>
        <header>
          <h1>Position, size, and orientation in 3D</h1>
          <p className="lede">
            A geometric transformation changes where an object is, how big it is, or which way it faces.
            Use the sliders to apply the three basic transformations on all three axes and see the
            matrix and the new coordinates update.
          </p>
        </header>

        <div className="layout">
          <div>
            <div className="card">
              <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A 3D book that can be moved, resized, and rotated around the x, y, and z axes">
                {Array.from({ length: 17 }, (_, i) => (
                  <line key={"v" + i} x1={i * 40} y1="0" x2={i * 40} y2={H} stroke="var(--grid)" strokeWidth="1" />
                ))}
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={"h" + i} x1="0" y1={i * 40} x2={W} y2={i * 40} stroke="var(--grid)" strokeWidth="1" />
                ))}

                {axes.map((a) => (
                  <g key={a.name}>
                    <line x1={o[0]} y1={o[1]} x2={a.end[0]} y2={a.end[1]} stroke={a.color} strokeWidth="1.5" />
                    <text x={a.end[0] + 6} y={a.end[1] + 4} fontSize="13" fill={a.color}>{a.name}</text>
                  </g>
                ))}

                {(showBook ? EDGES : []).map(([i, j]) => (
                  <line key={"g" + i + j} x1={ghost[i][0]} y1={ghost[i][1]} x2={ghost[j][0]} y2={ghost[j][1]}
                    stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="4 4" />
                ))}

                {(showBook ? faces : []).map((f, idx) => (
                  <polygon key={idx} className={f.c}
                    points={f.v.map((i) => scr[i][0].toFixed(1) + "," + scr[i][1].toFixed(1)).join(" ")}
                    stroke="var(--obj-edge)" strokeWidth="1.8" strokeLinejoin="round" />
                ))}

                {(showBook ? scr : []).map((s, i) => (
                  <text key={i} x={s[0] + 7} y={s[1] - 6} fontSize="12" fill="var(--ink)"
                    stroke="var(--stage)" strokeWidth="3" paintOrder="stroke">{LABELS[i]}</text>
                ))}
                {calc && cp.map((v, i) => (
                  <g key={"pt" + i}>
                    <line x1={sO[i][0]} y1={sO[i][1]} x2={sN[i][0]} y2={sN[i][1]} stroke="var(--pos)" strokeWidth="1.5" strokeDasharray="4 3" />
                    <circle cx={sO[i][0]} cy={sO[i][1]} r="5" fill="var(--stage)" stroke="var(--muted)" strokeWidth="2" />
                    <text x={sO[i][0] + 8} y={sO[i][1] + 15} fontSize="12" fill="var(--muted)" stroke="var(--stage)" strokeWidth="3" paintOrder="stroke">{LABELS[i]}</text>
                    <circle cx={sN[i][0]} cy={sN[i][1]} r="6" fill="var(--pos)" stroke="var(--stage)" strokeWidth="2" />
                    <text x={sN[i][0] + 9} y={sN[i][1] - 8} fontSize="13" fontWeight="600" fill="var(--ink)" stroke="var(--stage)" strokeWidth="3" paintOrder="stroke">{LABELS[i]}′</text>
                  </g>
                ))}
              </svg>

              <div className="under">
                {showBook && <span><i className="sw" style={{ background: "var(--rot)" }} />front cover</span>}
                {showBook && <span><i className="sw" style={{ background: "var(--size)" }} />top</span>}
                {showBook && <span>Dashed outline: original position</span>}
                {calc && (
                  <>
                    <span><i className="sw" style={{ background: "var(--pos)" }} />new point (A′)</span>
                    <span>Hollow dot: original point (A)</span>
                    <label>
                      <input type="checkbox" checked={showBook} onChange={(e) => setShowBook(e.target.checked)} />
                      Show book
                    </label>
                  </>
                )}
                <label>
                  Camera angle
                  <input type="range" min="-180" max="180" step="5" value={yaw}
                    aria-label="Camera angle" onChange={(e) => setYaw(Number(e.target.value))} />
                </label>
              </div>
              <p className="summary" aria-live="polite">{summary}</p>
              {calc && fit < 1 && (
                <p className="note" style={{ margin: "0 4px 4px" }}>
                  The scene is scaled to {f4(fit)}× so all your points fit on screen.
                </p>
              )}
            </div>

            <div className="card details">
              <div>
                <h2>Combined 4×4 matrix</h2>
                <p>Scale first, then rotate, then translate. The last column (blue) holds the translation.</p>
                <div className="mat">
                  {M.map((row, i) =>
                    row.map((n, j) => (
                      <span key={i + "-" + j} className={j === 3 && i < 3 ? "t" : ""}>{fmt(n)}</span>
                    ))
                  )}
                </div>
              </div>
              <div>
                <h2>Corner coordinates</h2>
                <p>Each corner is multiplied by the matrix to get its new position.</p>
                <table>
                  <thead>
                    <tr><th>Point</th><th>Original</th><th>New</th></tr>
                  </thead>
                  <tbody>
                    {orig.map((v, i) => (
                      <tr key={i}>
                        <td>{LABELS[i]}</td>
                        <td>{fmtP(v)}</td>
                        <td className="n">{fmtP(moved[i])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {calc && (
              <div className="card ptcard">
                <h2>Your points</h2>
                <p className="note">From the numbers you calculated. They also follow the sliders.</p>
                <table>
                  <thead>
                    <tr><th>Point</th><th>Original</th><th>New position</th></tr>
                  </thead>
                  <tbody>
                    {cp.map((v, i) => (
                      <tr key={i}>
                        <td>{LABELS[i]}</td>
                        <td>{fmtP(v)}</td>
                        <td className="n">{fmtP(cpNew[i])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="controls">
            {groups.map((g) => (
              <div key={g.title} className={`ctl ${g.cls} ${g.changed ? "on" : ""}`}>
                <div className="ctl-top">
                  <div>
                    <h2>{g.title}</h2>
                    <div className="tag">{g.tag}</div>
                  </div>
                  <span className="chip">{g.changed ? "Changed" : "Unchanged"}</span>
                </div>
                {g.sliders.map((s) => (
                  <div className="srow" key={s.k}>
                    <span className="l">{s.l}</span>
                    <input type="range" min={s.min} max={s.max} step={s.step} value={p[s.k]}
                      aria-label={g.title + " " + s.l}
                      onChange={(e) => setVal(s.k, Number(e.target.value))} />
                    <span className="v">{s.show(p[s.k])}</span>
                  </div>
                ))}
                {g.link && (
                  <label className="link">
                    <input type="checkbox" checked={linked} onChange={(e) => setLinked(e.target.checked)} />
                    Scale all axes together
                  </label>
                )}
                <p className="hint">{g.hint}</p>
              </div>
            ))}
            <div>
              <button type="button" onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
    </>
  );
}

const num = (s) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};
const f4 = (n) => {
  const r = Math.round(n * 10000) / 10000;
  return String(Object.is(r, -0) ? 0 : r);
};

function buildMatrix(type, par) {
  if (type === "translate") return mT(num(par.tx), num(par.ty), num(par.tz));
  if (type === "scale") return mS(num(par.sx), num(par.sy), num(par.sz));
  const a = num(par.ang);
  if (par.axis === "y") return mRY(a);
  if (par.axis === "z") return mRZ(a);
  return mRX(a);
}

const symMatrix = (type, axis) => {
  if (type === "translate")
    return [["1", "0", "0", "Tx"], ["0", "1", "0", "Ty"], ["0", "0", "1", "Tz"], ["0", "0", "0", "1"]];
  if (type === "scale")
    return [["Sx", "0", "0", "0"], ["0", "Sy", "0", "0"], ["0", "0", "Sz", "0"], ["0", "0", "0", "1"]];
  if (axis === "y")
    return [["cosθ", "0", "sinθ", "0"], ["0", "1", "0", "0"], ["−sinθ", "0", "cosθ", "0"], ["0", "0", "0", "1"]];
  if (axis === "z")
    return [["cosθ", "−sinθ", "0", "0"], ["sinθ", "cosθ", "0", "0"], ["0", "0", "1", "0"], ["0", "0", "0", "1"]];
  return [["1", "0", "0", "0"], ["0", "cosθ", "−sinθ", "0"], ["0", "sinθ", "cosθ", "0"], ["0", "0", "0", "1"]];
};

const termStr = (n) => (n < 0 ? `(${f4(n)})` : f4(n));

function Col({ items, hi }) {
  return (
    <div className={"br col" + (hi ? " hi" : "")}>
      {items.map((t, i) => <span key={i}>{t}</span>)}
    </div>
  );
}

function Mat({ rows, hiCol }) {
  return (
    <div className="br mat">
      {rows.flat().map((t, i) => (
        <span key={i} className={hiCol && i % 4 === 3 && i < 12 ? "t" : ""}>{t}</span>
      ))}
    </div>
  );
}

const REQ = { translate: ["tx", "ty", "tz"], scale: ["sx", "sy", "sz"], rotate: ["ang"] };
const isNum = (s) => String(s).trim() !== "" && Number.isFinite(Number(s));
const blankPts = () => [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]];
const keyOf = (type, par, pts) =>
  JSON.stringify([type, REQ[type].map((k) => par[k]), type === "rotate" ? par.axis : "", pts]);

function Calculator({ calc, onCalculate, onView }) {
  const [type, setType] = useState("scale");
  const [par, setPar] = useState({ tx: "", ty: "", tz: "", sx: "", sy: "", sz: "", ang: "", axis: "x" });
  const [pts, setPts] = useState(blankPts());
  const [error, setError] = useState("");

  const clear = () => {
    setPar({ tx: "", ty: "", tz: "", sx: "", sy: "", sz: "", ang: "", axis: "x" });
    setPts(blankPts());
    setError("");
  };
  const setP = (k, v) => {
    setPar((old) => ({ ...old, [k]: v }));
    setError("");
  };
  const setPt = (i, j, v) => {
    setPts((old) => old.map((r, a) => (a === i ? r.map((c, b) => (b === j ? v : c)) : r)));
    setError("");
  };

  const calculate = () => {
    const bad = REQ[type].some((k) => !isNum(par[k])) || pts.some((r) => r.some((c) => !isNum(c)));
    if (bad) {
      setError("Fill in every field with a number, then press Calculate.");
      return;
    }
    const mm = buildMatrix(type, par);
    onCalculate({
      type,
      par: { ...par },
      pts: pts.map((r) => [...r]),
      out: pts.map((r) => tr(mm, r.map(Number))),
    });
  };

  const shown = calc && calc.type === type ? calc : null;
  const stale = shown && keyOf(type, par, pts) !== keyOf(shown.type, shown.par, shown.pts);

  let m = null, vecs = [], out = [], idxs = [], verb = "", problem = "";
  if (shown) {
    m = buildMatrix(shown.type, shown.par);
    vecs = shown.pts.map((r) => [num(r[0]), num(r[1]), num(r[2])]);
    out = shown.out;
    idxs = vecs.map((_, i) => i);
    verb = { translate: "translation", scale: "scaling", rotate: "rotation" }[shown.type];
    const sp = shown.par;
    if (shown.type === "translate")
      problem = `Determine the object's new coordinates after applying the translation vectors ${f4(num(sp.tx))} towards the x axis, ${f4(num(sp.ty))} towards the y axis, and ${f4(num(sp.tz))} towards the z axis.`;
    if (shown.type === "scale")
      problem = `Determine the object's new coordinates after applying the scaling factors ${f4(num(sp.sx))} towards the x axis, ${f4(num(sp.sy))} towards the y axis, and ${f4(num(sp.sz))} towards the z axis.`;
    if (shown.type === "rotate")
      problem = `Determine the object's new coordinates after applying a rotation of ${f4(num(sp.ang))} degrees around the ${sp.axis} axis.`;
  }
  const label = (i) => `${LABELS[i]}(${vecs[i].map(f4).join(", ")})`;
  const newLabel = (i) => `${LABELS[i]}(${out[i].map(f4).join(", ")})`;

  const explain = {
    translate: "Translation adds the same vector to every point. The translation vectors go in the last column of the matrix.",
    scale: "The scaling factors go diagonally, starting from the first element. A factor above 1 enlarges the object, below 1 shrinks it, and exactly 1 leaves it unchanged.",
    rotate: "Rotation uses the sine and cosine of the angle. The coordinate on the axis of rotation stays the same.",
  }[type];

  const field = (lab, k) => (
    <label className="fld" key={k}>
      <span>{lab}</span>
      <input type="number" step="any" placeholder="0" value={par[k]} onChange={(e) => setP(k, e.target.value)} />
    </label>
  );

  return (
    <>
      <header>
        <h1>Calculate the new position</h1>
        <p className="lede">
          Choose a transformation, type in the given values, then press Calculate. The solution is
          worked out like in the handout, and the result also appears in Explore in 3D.
        </p>
      </header>

      <div className="calc-grid">
        <div className="card">
          <h2>1. Choose the transformation</h2>
          <div className="seg">
            {[["scale", "Scaling"], ["translate", "Translation"], ["rotate", "Rotation"]].map(([t, l]) => (
              <button key={t} type="button" className={type === t ? "on" : ""} aria-pressed={type === t}
                onClick={() => { setType(t); setError(""); }}>{l}</button>
            ))}
          </div>

          <h2>2. Enter the given values</h2>
          {type === "translate" && (
            <div className="fields">{field("Tx", "tx")}{field("Ty", "ty")}{field("Tz", "tz")}</div>
          )}
          {type === "scale" && (
            <div className="fields">{field("Sx", "sx")}{field("Sy", "sy")}{field("Sz", "sz")}</div>
          )}
          {type === "rotate" && (
            <div className="fields">
              {field("Angle (degrees)", "ang")}
              <label className="fld">
                <span>Rotate around</span>
                <select value={par.axis} onChange={(e) => setP("axis", e.target.value)}>
                  <option value="x">x axis</option>
                  <option value="y">y axis</option>
                  <option value="z">z axis</option>
                </select>
              </label>
            </div>
          )}

          <h2>3. Enter the initial coordinates</h2>
          {pts.map((r, i) => (
            <div className="prow" key={i}>
              <span className="plabel">{LABELS[i]}</span>
              {["x", "y", "z"].map((ax, j) => (
                <label className="fld" key={ax}>
                  <span>{ax}</span>
                  <input type="number" step="any" placeholder="0" value={r[j]} onChange={(e) => setPt(i, j, e.target.value)} />
                </label>
              ))}
            </div>
          ))}

          <div className="actions">
            <button type="button" className="primary" onClick={calculate}>Calculate</button>
            <button type="button" onClick={clear}>Clear</button>
          </div>
          {error && <p className="err" role="alert">{error}</p>}
        </div>

        <div className="sols">
          {shown && (
            <div className="card">
              <h2>Sample problem</h2>
              <p className="prob">
                The initial coordinates of an object are {idxs.map(label).join(", ")}. {problem}
              </p>
              {stale && <p className="err">You changed the inputs. Press Calculate to update the solution.</p>}
            </div>
          )}

          <div className="card">
            <h2>General form</h2>
            <div className="hrow">
              <Col items={["x", "y", "z", "1"]} />
              <span className="op">=</span>
              <Mat rows={symMatrix(type, par.axis)} hiCol={type === "translate"} />
              <span className="op">·</span>
              <Col items={["xᵢ", "yᵢ", "zᵢ", "1"]} />
            </div>
            <p className="note">{explain}</p>
          </div>

          {!shown && (
            <div className="card">
              <p className="prob">Fill in the fields and press Calculate to see the solution for each point.</p>
            </div>
          )}

          {shown && idxs.map((i) => {
            const full = [...vecs[i], 1];
            return (
              <div className="card" key={i}>
                <h2>Solution for {label(i)}:</h2>
                <div className="hrow">
                  <Col items={["x", "y", "z", "1"]} />
                  <span className="op">=</span>
                  <Mat rows={m.map((row) => row.map(f4))} hiCol={shown.type === "translate"} />
                  <span className="op">·</span>
                  <Col items={full.map(f4)} />
                </div>
                <div className="hrow">
                  <span className="op">=</span>
                  <Col items={m.map((row) => row.map((c, j) => termStr(c * full[j])).join(" + "))} />
                </div>
                <div className="hrow">
                  <span className="op">=</span>
                  <Col hi items={[...out[i], 1].map(f4)} />
                </div>
              </div>
            );
          })}

          {shown && (
            <div className="card">
              <p className="final">
                The new coordinates of the object after {verb} are <b>{idxs.map(newLabel).join(", ")}</b>.
              </p>
              <div className="actions">
                <button type="button" className="primary" onClick={onView}>See the position in 3D</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function App() {
  const [tab, setTab] = useState("calc");
  const [calc, setCalc] = useState(null);
  return (
    <div className="od">
      <style>{css}</style>
      <div className="wrap">
        <nav className="tabs" role="tablist" aria-label="Sections">
          <button type="button" role="tab" aria-selected={tab === "calc"} onClick={() => setTab("calc")}>
            Calculate with your numbers
          </button>
          <button type="button" role="tab" aria-selected={tab === "explore"} onClick={() => setTab("explore")}>
            Explore in 3D
          </button>
        </nav>
        <div hidden={tab !== "calc"}>
          <Calculator calc={calc} onCalculate={setCalc} onView={() => setTab("explore")} />
        </div>
        <div hidden={tab !== "explore"}>
          <Explorer calc={calc} />
        </div>
      </div>
    </div>
  );
}

export default App;