// Compares the physical (Do) and social (Interact) gaps side by side

export function PhysicalSocialGapDiagram() {
  const fg = "hsl(var(--foreground))";
  const muted = "hsl(var(--muted-foreground))";
  const card = "hsl(var(--card))";
  const border = "hsl(var(--border))";
  const physColor = "#0EA5E9";   // sky — physical/Do
  const socColor = "#8B5CF6";    // violet — social/Interact

  const BAR_H = 14;
  const BAR_MAX = 200;

  // Physical: Do = 12% of AI market, but ~40% of economic workforce (illustration)
  // Social: Interact = 48% of combined market
  const physAiW = Math.round(BAR_MAX * 0.12);     // 12% AI market
  const socAiW = Math.round(BAR_MAX * 0.48);      // 48% combined market
  const physWorkW = Math.round(BAR_MAX * 0.65);   // large physical workforce (illustrative)
  const socWorkW = Math.round(BAR_MAX * 0.55);    // large social workforce (illustrative)

  const LEFT = 30;
  const RIGHT = 330;

  return (
    <figure className="not-prose my-8" aria-label="Physical and social AI gap diagram">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 600 230" width="100%" xmlns="http://www.w3.org/2000/svg">

          <text x={300} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            The physical and social gaps in AI coverage
          </text>

          {/* ── LEFT PANEL: Physical / Do ── */}
          <rect x={LEFT} y={30} width={260} height={166} rx={8}
            fill={card} style={{ stroke: border }} strokeWidth={1} />
          <rect x={LEFT} y={30} width={260} height={4} rx={2} fill={physColor} />

          <text x={LEFT + 130} y={54} textAnchor="middle"
            fontSize={13} fontWeight={700} style={{ fill: physColor }}>
            Physical ("Do")
          </text>

          {/* AI market share bar */}
          <text x={LEFT + 12} y={74} fontSize={9} style={{ fill: muted }}>AI market share</text>
          <rect x={LEFT + 12} y={78} width={BAR_MAX} height={BAR_H} rx={4}
            fill={physColor} fillOpacity={0.12} />
          <rect x={LEFT + 12} y={78} width={physAiW} height={BAR_H} rx={4}
            fill={physColor} />
          <text x={LEFT + 12 + physAiW + 6} y={89} fontSize={10} fontWeight={700}
            style={{ fill: physColor }}>12%</text>

          {/* Workforce bar */}
          <text x={LEFT + 12} y={106} fontSize={9} style={{ fill: muted }}>Workforce size</text>
          <rect x={LEFT + 12} y={110} width={BAR_MAX} height={BAR_H} rx={4}
            fill={physColor} fillOpacity={0.12} />
          <rect x={LEFT + 12} y={110} width={physWorkW} height={BAR_H} rx={4}
            fill={physColor} fillOpacity={0.4} />
          <text x={LEFT + 12 + physWorkW + 6} y={121} fontSize={9}
            style={{ fill: muted }}>large</text>

          <line x1={LEFT + 12} y1={132} x2={LEFT + 248} y2={132}
            style={{ stroke: border }} strokeWidth={1} />

          <text x={LEFT + 12} y={148} fontSize={9.5} style={{ fill: muted }}>
            20.8M robots deployed
          </text>
          <text x={LEFT + 12} y={162} fontSize={9.5} style={{ fill: muted }}>
            76.7% just clean floors
          </text>
          <text x={LEFT + 12} y={176} fontSize={9} fontWeight={600}
            style={{ fill: physColor }}>
            Physical automation far below economic weight
          </text>

          {/* ── RIGHT PANEL: Social / Interact ── */}
          <rect x={RIGHT} y={30} width={260} height={166} rx={8}
            fill={card} style={{ stroke: border }} strokeWidth={1} />
          <rect x={RIGHT} y={30} width={260} height={4} rx={2} fill={socColor} />

          <text x={RIGHT + 130} y={54} textAnchor="middle"
            fontSize={13} fontWeight={700} style={{ fill: socColor }}>
            Social ("Interact")
          </text>

          {/* AI market share bar */}
          <text x={RIGHT + 12} y={74} fontSize={9} style={{ fill: muted }}>Combined market share</text>
          <rect x={RIGHT + 12} y={78} width={BAR_MAX} height={BAR_H} rx={4}
            fill={socColor} fillOpacity={0.12} />
          <rect x={RIGHT + 12} y={78} width={socAiW} height={BAR_H} rx={4}
            fill={socColor} />
          <text x={RIGHT + 12 + socAiW + 6} y={89} fontSize={10} fontWeight={700}
            style={{ fill: socColor }}>48%</text>

          {/* Workforce bar */}
          <text x={RIGHT + 12} y={106} fontSize={9} style={{ fill: muted }}>Workforce size</text>
          <rect x={RIGHT + 12} y={110} width={BAR_MAX} height={BAR_H} rx={4}
            fill={socColor} fillOpacity={0.12} />
          <rect x={RIGHT + 12} y={110} width={socWorkW} height={BAR_H} rx={4}
            fill={socColor} fillOpacity={0.4} />
          <text x={RIGHT + 12 + socWorkW + 6} y={121} fontSize={9}
            style={{ fill: muted }}>large</text>

          <line x1={RIGHT + 12} y1={132} x2={RIGHT + 248} y2={132}
            style={{ stroke: border }} strokeWidth={1} />

          <text x={RIGHT + 12} y={148} fontSize={9.5} style={{ fill: muted }}>
            Care · Education · Coordination
          </text>
          <text x={RIGHT + 12} y={162} fontSize={9.5} style={{ fill: muted }}>
            Trust barrier, not capability barrier
          </text>
          <text x={RIGHT + 12} y={176} fontSize={9} fontWeight={600}
            style={{ fill: socColor }}>
            Largest market value, least product depth
          </text>

          <text x={300} y={214} textAnchor="middle" fontSize={10}
            style={{ fill: muted }}>
            Source: Cai et al. (2026), arXiv:2603.20619 · $186.4B total AI market
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Both gaps are large — physical AI is hard because of deployment complexity; social AI is hard because of trust.
      </figcaption>
    </figure>
  );
}
