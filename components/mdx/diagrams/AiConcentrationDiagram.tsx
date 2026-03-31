// Shows that 92% of AI apps collapse into just 6.8% of work activities.
// Visual: proportional horizontal bar — narrow colored zone vs vast muted zone.

const TOTAL_W = 540;
const BAR_H = 48;
const BAR_X = 30;
const BAR_Y = 62;
const SATURATED_W = Math.round(TOTAL_W * 0.068); // 6.8% of bar
const UNSATURATED_W = TOTAL_W - SATURATED_W;

export function AiConcentrationDiagram() {
  const muted = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const fg = "hsl(var(--foreground))";
  const accent = "#4F46E5";

  const saturatedMid = BAR_X + SATURATED_W / 2;
  const unsaturatedMid = BAR_X + SATURATED_W + UNSATURATED_W / 2;

  return (
    <figure className="not-prose my-8" aria-label="AI concentration diagram — 92% of apps in 6.8% of activities">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 600 200" width="100%" xmlns="http://www.w3.org/2000/svg">

          <text x={300} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            92% of all AI apps compete for 6.8% of activity space
          </text>

          {/* Unsaturated zone (background, full width, drawn first) */}
          <rect x={BAR_X} y={BAR_Y} width={TOTAL_W} height={BAR_H} rx={6}
            fill="hsl(var(--muted))" />

          {/* Saturated zone (small left strip) */}
          <rect x={BAR_X} y={BAR_Y} width={SATURATED_W} height={BAR_H} rx={6}
            fill={accent} fillOpacity={0.9} />

          {/* Border overlay */}
          <rect x={BAR_X} y={BAR_Y} width={TOTAL_W} height={BAR_H} rx={6}
            fill="none" style={{ stroke: border }} strokeWidth={1} />

          {/* Divider between zones */}
          <line x1={BAR_X + SATURATED_W} y1={BAR_Y - 4}
            x2={BAR_X + SATURATED_W} y2={BAR_Y + BAR_H + 4}
            style={{ stroke: border }} strokeWidth={1} strokeDasharray="3,3" />

          {/* Saturated label above bar */}
          <text x={saturatedMid} y={BAR_Y - 10} textAnchor="middle"
            fontSize={10} fontWeight={600} style={{ fill: accent }}>
            6.8% of activities
          </text>

          {/* Unsaturated label above bar */}
          <text x={unsaturatedMid} y={BAR_Y - 10} textAnchor="middle"
            fontSize={10} style={{ fill: muted }}>
            93.2% of activities
          </text>

          {/* Saturated stat below bar */}
          <text x={saturatedMid} y={BAR_Y + BAR_H + 18} textAnchor="middle"
            fontSize={11} fontWeight={700} style={{ fill: accent }}>
            92% of AI apps
          </text>

          {/* Unsaturated stat below bar */}
          <text x={unsaturatedMid} y={BAR_Y + BAR_H + 18} textAnchor="middle"
            fontSize={11} style={{ fill: muted }}>
            8% of AI apps
          </text>

          {/* Sub-labels */}
          <text x={saturatedMid} y={BAR_Y + BAR_H + 34} textAnchor="middle"
            fontSize={9} style={{ fill: muted }}>
            (all cognitive)
          </text>
          <text x={unsaturatedMid} y={BAR_Y + BAR_H + 34} textAnchor="middle"
            fontSize={9} style={{ fill: muted }}>
            (mostly physical + social)
          </text>

          <text x={300} y={186} textAnchor="middle" fontSize={10}
            style={{ fill: muted }}>
            Source: Cai et al. (2026), arXiv:2603.20619 · 39,603 activities · 13,275 AI apps
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        This is not mild clustering — it is extreme concentration. The AI market is drilling deep, not spreading wide.
      </figcaption>
    </figure>
  );
}
