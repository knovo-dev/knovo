// Anatomy of a context window — what fills each zone of the token budget.
// Visual: annotated segmented bar with alternating above/below labels, 1M token scale.

const BAR_X = 30;
const BAR_W = 540;
const BAR_H = 36;
const BAR_Y = 90;

const SEGS = [
  { label: "System prompt",   pct: 5,  color: "#4F46E5", above: true  },
  { label: "Chat history",    pct: 12, color: "#7C3AED", above: false },
  { label: "Retrieved docs",  pct: 28, color: "#0EA5E9", above: true  },
  { label: "Tool outputs",    pct: 10, color: "#F59E0B", above: false },
  { label: "Output reserved", pct: 15, color: "#EF4444", above: true  },
  { label: "Free space",      pct: 30, color: null,      above: false },
];

export function ContextWindowAnatomyDiagram() {
  const muted = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const fg = "hsl(var(--foreground))";

  // Pixel widths — last segment absorbs rounding error
  const widths = SEGS.map((s) => Math.round((s.pct / 100) * BAR_W));
  widths[widths.length - 1] += BAR_W - widths.reduce((a, b) => a + b, 0);

  // Center X of each segment
  let pos = BAR_X;
  const centers = widths.map((w) => { const c = pos + w / 2; pos += w; return c; });

  return (
    <figure className="not-prose my-8" aria-label="Context window anatomy — token budget breakdown">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 600 220" width="100%" xmlns="http://www.w3.org/2000/svg">

          {/* Title */}
          <text x={300} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            What fills a context window (1M token example)
          </text>

          {/* Bar background */}
          <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={6}
            fill="hsl(var(--muted))" />

          {/* Coloured segments */}
          {(() => {
            let c = BAR_X;
            return SEGS.map((seg, i) => {
              const w = widths[i];
              const x = c; c += w;
              return (
                <rect key={i} x={x} y={BAR_Y} width={w} height={BAR_H} rx={0}
                  fill={seg.color ?? "hsl(var(--muted))"}
                  fillOpacity={seg.color ? 0.85 : 0.35} />
              );
            });
          })()}

          {/* Bar border */}
          <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={6}
            fill="none" style={{ stroke: border }} strokeWidth={1} />

          {/* Alternating tick-line + label annotations */}
          {SEGS.map((seg, i) => {
            const x = centers[i];
            const color = seg.color ?? muted;
            return seg.above ? (
              <g key={i}>
                <line x1={x} y1={BAR_Y} x2={x} y2={BAR_Y - 10}
                  style={{ stroke: border }} strokeWidth={1} />
                <text x={x} y={BAR_Y - 20} textAnchor="middle"
                  fontSize={8} style={{ fill: muted }}>
                  {seg.pct}%
                </text>
                <text x={x} y={BAR_Y - 30} textAnchor="middle"
                  fontSize={9} fontWeight={600} style={{ fill: color }}>
                  {seg.label}
                </text>
              </g>
            ) : (
              <g key={i}>
                <line x1={x} y1={BAR_Y + BAR_H} x2={x} y2={BAR_Y + BAR_H + 10}
                  style={{ stroke: border }} strokeWidth={1} />
                <text x={x} y={BAR_Y + BAR_H + 22} textAnchor="middle"
                  fontSize={9} fontWeight={600} style={{ fill: color }}>
                  {seg.label}
                </text>
                <text x={x} y={BAR_Y + BAR_H + 33} textAnchor="middle"
                  fontSize={8} style={{ fill: muted }}>
                  {seg.pct}%
                </text>
              </g>
            );
          })}

          {/* Footer */}
          <text x={300} y={210} textAnchor="middle" fontSize={10} style={{ fill: muted }}>
            Proportions are illustrative. Output space must be reserved — it is not automatically available.
          </text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Every component competes for the same token budget. Scaffolding alone can consume 20–30% before any source material is loaded.
      </figcaption>
    </figure>
  );
}
