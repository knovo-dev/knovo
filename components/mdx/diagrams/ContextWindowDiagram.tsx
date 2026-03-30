const SEGMENTS = [
  { label: "System", tokens: 1200, color: "#4F46E5" },
  { label: "History", tokens: 9000, color: "#7C3AED" },
  { label: "Retrieved", tokens: 18000, color: "#0EA5E9" },
  { label: "User", tokens: 600, color: "#10B981" },
  { label: "Output", tokens: 2500, color: "#F59E0B" },
];
const TOTAL_WINDOW = 128000;
const USED = SEGMENTS.reduce((s, seg) => s + seg.tokens, 0);
const FREE = TOTAL_WINDOW - USED;

const BAR_X = 40;
const BAR_W = 540;
const BAR_H = 32;
const BAR_Y = 70;

export function ContextWindowDiagram() {
  const muted = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const fg = "hsl(var(--foreground))";

  let cursor = BAR_X;

  return (
    <figure className="not-prose my-8" aria-label="Context window budget diagram">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 620 172" width="100%" xmlns="http://www.w3.org/2000/svg">

          <text x={310} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            128k context window — token budget breakdown
          </text>

          {/* Bar background */}
          <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={6}
            fill="hsl(var(--muted))" />

          {/* Segments */}
          {SEGMENTS.map((seg) => {
            const segW = Math.round((seg.tokens / TOTAL_WINDOW) * BAR_W);
            const x = cursor;
            cursor += segW;
            return (
              <rect key={seg.label} x={x} y={BAR_Y} width={segW} height={BAR_H}
                fill={seg.color} fillOpacity={0.85}
                rx={0} />
            );
          })}

          {/* Round left/right corners via clip */}
          <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={6}
            fill="none" style={{ stroke: border }} strokeWidth={1} />

          {/* Free space label inside bar */}
          <text
            x={BAR_X + (USED / TOTAL_WINDOW) * BAR_W + (FREE / TOTAL_WINDOW) * BAR_W / 2}
            y={BAR_Y + 20}
            textAnchor="middle" fontSize={10}
            style={{ fill: muted }}>
            {Math.round((FREE / TOTAL_WINDOW) * 100)}% free
          </text>

          {/* Legend */}
          {SEGMENTS.map((seg, i) => {
            const lx = 40 + i * 108;
            return (
              <g key={seg.label}>
                <rect x={lx} y={118} width={10} height={10} rx={2} fill={seg.color} fillOpacity={0.85} />
                <text x={lx + 14} y={127} fontSize={10.5} style={{ fill: muted }}>
                  {seg.label} {(seg.tokens / 1000).toFixed(1)}k
                </text>
              </g>
            );
          })}

          {/* Stats */}
          <text x={310} y={156} textAnchor="middle" fontSize={11}
            style={{ fill: muted }}>
            {USED.toLocaleString()} tokens used · {FREE.toLocaleString()} remaining of 128,000
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Every part of the prompt consumes context budget. Output headroom must also be reserved.
      </figcaption>
    </figure>
  );
}
