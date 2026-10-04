import { useState } from "react";

const BASE_W = 120;
const BASE_H = 70;
const CX = 320;
const CY = 210;
const W = 640;
const H = 420;

const css = `
body { margin: 0; }
.od {
  --bg: #f3f5f8;
  --card: #ffffff;
  --ink: #16202e;
  --muted: #5d6b7e;
  --line: #d6dce5;
  --grid: #e3e8ef;
  --stage: #fbfcfe;
  --pos: #1f6fd1;
  --size: #0e8a6a;
  --rot: #d4501a;
  --obj: #e9e6fb;
  --obj-edge: #4b3fb0;
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
    --grid: #232c39;
    --stage: #161c26;
    --pos: #6aa8ff;
    --size: #4fd1a5;
    --rot: #ff8a5c;
    --obj: #35306e;
    --obj-edge: #b3abff;
  }
}
.od * { box-sizing: border-box; }
.od .wrap { max-width: 1040px; margin: 0 auto; }
.od header { margin-bottom: 1.5rem; }
.od h1 { font-size: 28px; line-height: 1.2; font-weight: 600; margin: 0 0 6px; letter-spacing: -0.01em; }
.od .lede { margin: 0; color: var(--muted); font-size: 16px; line-height: 1.6; max-width: 60ch; }
.od .layout { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 20px; align-items: start; }
.od .stage-card { background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 12px; }
.od svg { display: block; width: 100%; height: auto; border-radius: 10px; background: var(--stage); }
.od .summary {
  margin: 12px 4px 4px;
  font-size: 15px;
  line-height: 1.5;
  color: var(--ink);
  min-height: 3em;
}
.od .controls { display: grid; gap: 14px; }
.od .ctl {
  --c: var(--pos);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px 16px 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 150ms;
}
.od .ctl.size { --c: var(--size); }
.od .ctl.rot { --c: var(--rot); }
.od .ctl::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 5px;
  background: var(--c);
}
.od .ctl.on { border-color: var(--c); }
.od .ctl-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.od .ctl h2 { font-size: 17px; font-weight: 600; margin: 0; }
.od .ctl .tag { font-size: 13px; color: var(--muted); margin-top: 2px; }
.od .chip {
  font-size: 12px;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--muted);
  white-space: nowrap;
}
.od .ctl.on .chip { background: var(--c); border-color: var(--c); color: #fff; }
.od .ctl input[type="range"] { width: 100%; margin: 14px 0 6px; accent-color: var(--c); }
.od .ctl-bottom { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.od .ctl .hint { font-size: 14px; color: var(--muted); }
.od .ctl .val { font-size: 18px; font-weight: 600; font-variant-numeric: tabular-nums; color: var(--c); }
.od button {
  font: inherit;
  font-size: 14px;
  padding: 9px 16px;
  color: var(--ink);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 10px;
  cursor: pointer;
}
.od button:hover { border-color: var(--muted); }
.od button:focus-visible,
.od input:focus-visible { outline: 2px solid var(--pos); outline-offset: 3px; }
@media (max-width: 820px) {
  .od .layout { grid-template-columns: 1fr; }
  .od h1 { font-size: 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .od .ctl { transition: none; }
}
`;

function listWords(items) {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return items.join(" and ");
  return items.slice(0, -1).join(", ") + ", and " + items[items.length - 1];
}

function App() {
  const [tx, setTx] = useState(0);
  const [scale, setScale] = useState(1);
  const [angle, setAngle] = useState(0);

  const reset = () => {
    setTx(0);
    setScale(1);
    setAngle(0);
  };

  const width = Math.round(BASE_W * scale);
  const height = Math.round(BASE_H * scale);

  const controls = [
    {
      id: "tx", cls: "pos", title: "Position", tag: "Translation, Tx",
      hint: "Where the object is", min: -200, max: 200, step: 1,
      value: tx, set: setTx, shown: `${tx}`, changed: tx !== 0,
    },
    {
      id: "sc", cls: "size", title: "Size", tag: "Scaling, S",
      hint: "How big the object is", min: 0.5, max: 1.6, step: 0.1,
      value: scale, set: setScale, shown: `${width} × ${height}`, changed: scale !== 1,
    },
    {
      id: "rt", cls: "rot", title: "Orientation", tag: "Rotation, θ",
      hint: "Which way the object faces", min: -180, max: 180, step: 5,
      value: angle, set: setAngle, shown: `${angle}°`, changed: angle !== 0,
    },
  ];

  const changedNames = controls.filter((c) => c.changed).map((c) => c.title.toLowerCase());
  const sameNames = controls.filter((c) => !c.changed).map((c) => c.title.toLowerCase());
  let summary = "Nothing has changed yet. Move a slider to transform the book.";
  if (changedNames.length) {
    const first = listWords(changedNames);
    summary = first.charAt(0).toUpperCase() + first.slice(1) + " changed.";
    if (sameNames.length) summary += " " + listWords(sameNames).replace(/^./, (m) => m.toUpperCase()) + " stayed the same.";
  }

  const ox = CX + tx;
  const R = 62;
  const a = (angle * Math.PI) / 180;
  const ex = ox - R * Math.sin(a);
  const ey = CY - R * Math.cos(a);
  const sweep = angle > 0 ? 0 : 1;

  const vLines = [];
  for (let x = 0; x <= W; x += 40) vLines.push(x);
  const hLines = [];
  for (let y = 0; y <= H; y += 40) hLines.push(y);

  return (
    <div className="od">
      <style>{css}</style>
      <div className="wrap">
        <header>
          <h1>Position, size, and orientation</h1>
          <p className="lede">
            A geometric transformation changes one of three things about an object.
            Move each slider and watch which one changes.
          </p>
        </header>

        <div className="layout">
          <div className="stage-card">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A book that can be moved, resized, and rotated on a grid">
              <defs>
                <marker id="od-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill="var(--pos)" />
                </marker>
              </defs>

              {vLines.map((x) => (
                <line key={"v" + x} x1={x} y1="0" x2={x} y2={H} stroke="var(--grid)" strokeWidth="1" />
              ))}
              {hLines.map((y) => (
                <line key={"h" + y} x1="0" y1={y} x2={W} y2={y} stroke="var(--grid)" strokeWidth="1" />
              ))}
              <line x1="0" y1={CY} x2={W} y2={CY} stroke="var(--line)" strokeWidth="1.5" />
              <line x1={CX} y1="0" x2={CX} y2={H} stroke="var(--line)" strokeWidth="1.5" />
              <text x={W - 10} y={CY - 8} textAnchor="end" fontSize="13" fill="var(--muted)">x</text>
              <text x={CX + 8} y="18" fontSize="13" fill="var(--muted)">y</text>

              <rect
                x={CX - BASE_W / 2}
                y={CY - BASE_H / 2}
                width={BASE_W}
                height={BASE_H}
                rx="4"
                fill="none"
                stroke="var(--muted)"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              <text x={CX} y={CY + BASE_H / 2 + 20} textAnchor="middle" fontSize="12" fill="var(--muted)">
                original
              </text>

              {tx !== 0 && (
                <line
                  x1={CX}
                  y1={CY}
                  x2={tx > 0 ? ox - 4 : ox + 4}
                  y2={CY}
                  stroke="var(--pos)"
                  strokeWidth="2"
                  markerEnd="url(#od-arrow)"
                />
              )}

              {angle !== 0 && (
                <g>
                  <line x1={ox} y1={CY} x2={ox} y2={CY - R - 8} stroke="var(--rot)" strokeWidth="1" strokeDasharray="3 3" />
                  <path
                    d={`M ${ox} ${CY - R} A ${R} ${R} 0 0 ${sweep} ${ex} ${ey}`}
                    fill="none"
                    stroke="var(--rot)"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              <g transform={`translate(${ox},${CY}) rotate(${-angle}) scale(${scale})`}>
                <rect
                  x={-BASE_W / 2}
                  y={-BASE_H / 2}
                  width={BASE_W}
                  height={BASE_H}
                  rx="4"
                  fill="var(--obj)"
                  stroke="var(--obj-edge)"
                  strokeWidth="2"
                />
                <polygon points={`-13,${-BASE_H / 2} 13,${-BASE_H / 2} 0,${-BASE_H / 2 - 22}`} fill="var(--rot)" />
                <text x="0" y="6" textAnchor="middle" fontSize="16" fill="var(--ink)">BSIT 3104</text>
              </g>
            </svg>
            <p className="summary" aria-live="polite">{summary}</p>
          </div>

          <div className="controls">
            {controls.map((c) => (
              <div key={c.id} className={`ctl ${c.cls} ${c.changed ? "on" : ""}`}>
                <div className="ctl-top">
                  <div>
                    <h2>{c.title}</h2>
                    <div className="tag">{c.tag}</div>
                  </div>
                  <span className="chip">{c.changed ? "Changed" : "Unchanged"}</span>
                </div>
                <input
                  id={c.id}
                  type="range"
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={c.value}
                  aria-label={c.title}
                  onChange={(e) => c.set(Number(e.target.value))}
                />
                <div className="ctl-bottom">
                  <span className="hint">{c.hint}</span>
                  <span className="val">{c.shown}</span>
                </div>
              </div>
            ))}
            <div>
              <button type="button" onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;