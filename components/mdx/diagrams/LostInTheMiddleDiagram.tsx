// Lost-in-the-middle attention effect — models recall the start and end of long prompts
// more reliably than the middle. Visual: U-shaped recall curve above a context-position bar.

const BAR_X = 50;
const BAR_W = 500;
const BAR_H = 28;
const BAR_Y = 128;
const Y_HIGH = 50;   // high on chart = high recall (smaller SVG y = higher up)
const Y_LOW  = 100;  // low on chart = low recall

// Cubic bezier control points for the U-curve:
//   P0=(BAR_X, Y_HIGH), P1=(BAR_X+150, Y_LOW), P2=(BAR_X+BAR_W-150, Y_LOW), P3=(BAR_X+BAR_W, Y_HIGH)
// Midpoint at t=0.5 (Bernstein):
//   x = 0.125*P0x + 0.375*P1x + 0.375*P2x + 0.125*P3x = 300
//   y = 0.125*Y_HIGH + 0.75*Y_LOW + 0.125*Y_HIGH = 0.25*Y_HIGH + 0.75*Y_LOW
const MID_X = 300;
const MID_Y = Math.round(0.25 * Y_HIGH + 0.75 * Y_LOW);   // ≈ 88

const RECALL_W = Math.round(BAR_W * 0.30);  // 30% high-recall zones at each end

export function LostInTheMiddleDiagram() {
  const muted  = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const fg     = "hsl(var(--foreground))";
  const good   = "#10B981";   // green  — high recall
  const bad    = "#EF4444";   // red    — low recall

  const P1x = BAR_X + 150;
  const P2x = BAR_X + BAR_W - 150;

  return (
    <figure className="not-prose my-8" aria-label="Lost-in-the-middle recall effect diagram">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 600 220" width="100%" xmlns="http://www.w3.org/2000/svg">

          {/* Title */}
          <text x={300} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            The lost-in-the-middle effect
          </text>

          {/* Y-axis label — "Recall" */}
          <text x={18} y={76} textAnchor="middle" fontSize={8.5} style={{ fill: muted }}
            transform="rotate(-90 18 76)">
            Recall strength
          </text>

          {/* Horizontal guide lines */}
          <line x1={BAR_X} y1={Y_HIGH} x2={BAR_X + BAR_W} y2={Y_HIGH}
            style={{ stroke: border }} strokeWidth={0.5} strokeDasharray="4,4" />
          <line x1={BAR_X} y1={Y_LOW} x2={BAR_X + BAR_W} y2={Y_LOW}
            style={{ stroke: border }} strokeWidth={0.5} strokeDasharray="4,4" />

          {/* Y-axis tick labels */}
          <text x={BAR_X - 6} y={Y_HIGH + 4} textAnchor="end"
            fontSize={9} fontWeight={600} style={{ fill: good }}>High</text>
          <text x={BAR_X - 6} y={Y_LOW + 4} textAnchor="end"
            fontSize={9} fontWeight={600} style={{ fill: bad }}>Low</text>

          {/* U-shaped recall curve */}
          <path
            d={`M ${BAR_X},${Y_HIGH} C ${P1x},${Y_LOW} ${P2x},${Y_LOW} ${BAR_X + BAR_W},${Y_HIGH}`}
            fill="none" stroke={good} strokeWidth={2.5} strokeLinecap="round"
          />

          {/* Endpoint dots (high recall) */}
          <circle cx={BAR_X} cy={Y_HIGH} r={4} fill={good} />
          <circle cx={BAR_X + BAR_W} cy={Y_HIGH} r={4} fill={good} />

          {/* Midpoint dot (low recall) */}
          <circle cx={MID_X} cy={MID_Y} r={4} fill={bad} />

          {/* Context bar — background (dim / muted) */}
          <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={4}
            fill="hsl(var(--muted))" />

          {/* High-recall zones: start and end (green overlay) */}
          <rect x={BAR_X} y={BAR_Y} width={RECALL_W} height={BAR_H} rx={0}
            fill={good} fillOpacity={0.22} />
          <rect x={BAR_X + BAR_W - RECALL_W} y={BAR_Y} width={RECALL_W} height={BAR_H} rx={0}
            fill={good} fillOpacity={0.22} />

          {/* Bar border */}
          <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={4}
            fill="none" style={{ stroke: border }} strokeWidth={1} />

          {/* X-axis position labels */}
          <text x={BAR_X} y={BAR_Y + BAR_H + 16} textAnchor="start"
            fontSize={10} fontWeight={600} style={{ fill: good }}>Start</text>
          <text x={BAR_X + BAR_W / 2} y={BAR_Y + BAR_H + 16} textAnchor="middle"
            fontSize={10} fontWeight={600} style={{ fill: bad }}>Middle</text>
          <text x={BAR_X + BAR_W} y={BAR_Y + BAR_H + 16} textAnchor="end"
            fontSize={10} fontWeight={600} style={{ fill: good }}>End</text>

          {/* Sub-annotations */}
          <text x={BAR_X + RECALL_W / 2} y={BAR_Y + BAR_H + 29} textAnchor="middle"
            fontSize={9} style={{ fill: muted }}>recalled reliably</text>
          <text x={BAR_X + BAR_W / 2} y={BAR_Y + BAR_H + 29} textAnchor="middle"
            fontSize={9} style={{ fill: muted }}>often missed</text>
          <text x={BAR_X + BAR_W - RECALL_W / 2} y={BAR_Y + BAR_H + 29} textAnchor="middle"
            fontSize={9} style={{ fill: muted }}>recalled reliably</text>

          {/* Footer */}
          <text x={300} y={210} textAnchor="middle" fontSize={10} style={{ fill: muted }}>
            Larger context windows do not eliminate this effect — prompt structure still matters.
          </text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Models attend more reliably to content at the beginning and end of a long prompt. Critical evidence should not be buried in the middle.
      </figcaption>
    </figure>
  );
}
