const CATEGORIES = [
  {
    label: "Think",
    stat: "72%",
    statLabel: "of AI software market",
    color: "#4F46E5",
    examples: ["Analysis", "Coding", "Writing", "Diagnosis"],
  },
  {
    label: "Do",
    stat: "12%",
    statLabel: "of total AI market",
    color: "#0EA5E9",
    examples: ["Assembly", "Welding", "Surgery assist", "Picking"],
  },
  {
    label: "Interact",
    stat: "48%",
    statLabel: "of combined market",
    color: "#10B981",
    examples: ["Counselling", "Teaching", "Negotiating", "Care"],
  },
];

const W = 600;
const COL_W = 160;
const COL_GAP = (W - COL_W * 3) / 4;

export function ThinkDoInteractDiagram() {
  const muted = "hsl(var(--muted-foreground))";
  const fg = "hsl(var(--foreground))";
  const card = "hsl(var(--card))";
  const border = "hsl(var(--border))";

  return (
    <figure className="not-prose my-8" aria-label="Think / Do / Interact framework diagram">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 600 230" width="100%" xmlns="http://www.w3.org/2000/svg">

          <text x={300} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            The Think / Do / Interact framework
          </text>

          {CATEGORIES.map((cat, i) => {
            const cx = COL_GAP + i * (COL_W + COL_GAP);

            return (
              <g key={cat.label}>
                {/* Card background */}
                <rect x={cx} y={36} width={COL_W} height={168} rx={8}
                  fill={card} style={{ stroke: border }} strokeWidth={1} />

                {/* Accent top bar */}
                <rect x={cx} y={36} width={COL_W} height={4} rx={2}
                  fill={cat.color} />

                {/* Category label */}
                <text x={cx + COL_W / 2} y={62} textAnchor="middle"
                  fontSize={15} fontWeight={700} style={{ fill: cat.color }}>
                  {cat.label}
                </text>

                {/* Stat */}
                <text x={cx + COL_W / 2} y={90} textAnchor="middle"
                  fontSize={28} fontWeight={700} style={{ fill: fg }}>
                  {cat.stat}
                </text>
                <text x={cx + COL_W / 2} y={108} textAnchor="middle"
                  fontSize={9.5} style={{ fill: muted }}>
                  {cat.statLabel}
                </text>

                {/* Divider */}
                <line x1={cx + 16} y1={120} x2={cx + COL_W - 16} y2={120}
                  style={{ stroke: border }} strokeWidth={1} />

                {/* Examples */}
                {cat.examples.map((ex, ei) => (
                  <text key={ex} x={cx + COL_W / 2} y={136 + ei * 16}
                    textAnchor="middle" fontSize={9.5}
                    style={{ fill: muted }}>
                    {ex}
                  </text>
                ))}
              </g>
            );
          })}

          <text x={300} y={218} textAnchor="middle" fontSize={10}
            style={{ fill: muted }}>
            Source: Cai et al. (2026), arXiv:2603.20619 — MIT / SMART Centre
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Every work activity is primarily Think, Do, or Interact — and AI penetration differs dramatically across all three.
      </figcaption>
    </figure>
  );
}
