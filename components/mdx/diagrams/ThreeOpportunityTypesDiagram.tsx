const TYPES = [
  {
    label: "Technical",
    badge: "Safest near-term bet",
    color: "#4F46E5",
    desc: "Proven capability,\nno product yet",
    items: ["Workflow gap", "Data access", "Domain packaging"],
  },
  {
    label: "Economic",
    badge: "Highest-value gap",
    color: "#10B981",
    desc: "Feasible + economically\ndense",
    items: ["Large workforce", "High repetition", "Clear ROI case"],
  },
  {
    label: "Unrecognised",
    badge: "Most transformational",
    color: "#F59E0B",
    desc: "Not yet seriously\nexplored",
    items: ["Physical + social", "No product category", "First-mover space"],
  },
];

const W = 600;
const COL_W = 158;
const COL_GAP = (W - COL_W * 3) / 4;

export function ThreeOpportunityTypesDiagram() {
  const fg = "hsl(var(--foreground))";
  const muted = "hsl(var(--muted-foreground))";
  const card = "hsl(var(--card))";
  const border = "hsl(var(--border))";

  return (
    <figure className="not-prose my-8" aria-label="Three AI opportunity types diagram">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 600 240" width="100%" xmlns="http://www.w3.org/2000/svg">

          <text x={300} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            Three types of gap in the activity map
          </text>

          {TYPES.map((type, i) => {
            const cx = COL_GAP + i * (COL_W + COL_GAP);

            return (
              <g key={type.label}>
                {/* Card */}
                <rect x={cx} y={34} width={COL_W} height={184} rx={8}
                  fill={card} style={{ stroke: border }} strokeWidth={1} />

                {/* Accent top */}
                <rect x={cx} y={34} width={COL_W} height={4} rx={2}
                  fill={type.color} />

                {/* Label */}
                <text x={cx + COL_W / 2} y={58} textAnchor="middle"
                  fontSize={14} fontWeight={700} style={{ fill: type.color }}>
                  {type.label}
                </text>

                {/* Badge */}
                <rect x={cx + 12} y={64} width={COL_W - 24} height={16} rx={8}
                  fill={type.color} fillOpacity={0.12} />
                <text x={cx + COL_W / 2} y={75} textAnchor="middle"
                  fontSize={8.5} fontWeight={600} style={{ fill: type.color }}>
                  {type.badge}
                </text>

                {/* Description */}
                {type.desc.split("\n").map((line, li) => (
                  <text key={li} x={cx + COL_W / 2} y={96 + li * 14}
                    textAnchor="middle" fontSize={10} style={{ fill: muted }}>
                    {line}
                  </text>
                ))}

                {/* Divider */}
                <line x1={cx + 14} y1={122} x2={cx + COL_W - 14} y2={122}
                  style={{ stroke: border }} strokeWidth={1} />

                {/* Gap types */}
                {type.items.map((item, ii) => (
                  <g key={item}>
                    <circle cx={cx + 20} cy={136 + ii * 18} r={3}
                      fill={type.color} fillOpacity={0.7} />
                    <text x={cx + 28} y={140 + ii * 18}
                      fontSize={9.5} style={{ fill: muted }}>
                      {item}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}

          <text x={300} y={228} textAnchor="middle" fontSize={10}
            style={{ fill: muted }}>
            Source: Cai et al. (2026), arXiv:2603.20619 — MIT / SMART Centre
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Not all white space is equal — sorting gaps by type changes where you should build.
      </figcaption>
    </figure>
  );
}
