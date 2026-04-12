// Comparison matrix: Pinecone vs Weaviate vs pgvector vs Chroma across 5 dimensions.
// Visual: 4-column header, 5 criteria rows, coloured circle indicators.

const DBS = [
  { name: "Pinecone", color: "#4F46E5" },
  { name: "Weaviate", color: "#7C3AED" },
  { name: "pgvector", color: "#0EA5E9" },
  { name: "Chroma",   color: "#10B981" },
] as const;

// "yes" | "partial" | "no" for each DB (same order as DBS)
const ROWS = [
  { label: "Fully managed",  values: ["yes", "partial", "partial", "partial"] },
  { label: "Hybrid search",  values: ["partial", "yes", "partial", "yes"] },
  { label: "SQL + joins",    values: ["no", "no", "yes", "no"] },
  { label: "Local dev",      values: ["no", "partial", "yes", "yes"] },
  { label: "Open source",    values: ["no", "yes", "yes", "yes"] },
] as const;

type Val = "yes" | "partial" | "no";
const CFG: Record<Val, { fill: string; label: string }> = {
  yes:     { fill: "#10B981", label: "Y" },
  partial: { fill: "#F59E0B", label: "~" },
  no:      { fill: "#EF4444", label: "N" },
};

const COL_X = [210, 305, 400, 495] as const;   // centre X of each DB column
const ROW_Y = [88, 113, 138, 163, 188] as const; // centre Y of each criteria row

export function VectorDbComparisonDiagram() {
  const muted  = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const fg     = "hsl(var(--foreground))";

  return (
    <figure className="not-prose my-8" aria-label="Vector database comparison matrix">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 600 220" width="100%" xmlns="http://www.w3.org/2000/svg">

          {/* Title */}
          <text x={300} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            Vector database comparison
          </text>

          {/* DB column headers */}
          {DBS.map((db, i) => (
            <text key={i} x={COL_X[i]} y={50} textAnchor="middle"
              fontSize={11} fontWeight={700} style={{ fill: db.color }}>
              {db.name}
            </text>
          ))}

          {/* Header divider */}
          <line x1={155} y1={58} x2={540} y2={58}
            style={{ stroke: border }} strokeWidth={1} />

          {/* Criteria rows */}
          {ROWS.map((row, ri) => (
            <g key={ri}>
              {/* Row label */}
              <text x={148} y={ROW_Y[ri] + 4} textAnchor="end"
                fontSize={10} style={{ fill: muted }}>
                {row.label}
              </text>

              {/* Indicator circles */}
              {(row.values as readonly string[]).map((v, ci) => {
                const cfg = CFG[v as Val];
                return (
                  <g key={ci}>
                    <circle cx={COL_X[ci]} cy={ROW_Y[ri]} r={10}
                      fill={cfg.fill} fillOpacity={0.14} />
                    <circle cx={COL_X[ci]} cy={ROW_Y[ri]} r={10}
                      fill="none" stroke={cfg.fill} strokeWidth={1.5} />
                    <text x={COL_X[ci]} y={ROW_Y[ri] + 4} textAnchor="middle"
                      fontSize={10} fontWeight={700} style={{ fill: cfg.fill }}>
                      {cfg.label}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}

          {/* Legend */}
          <circle cx={186} cy={210} r={5} fill="#10B981" fillOpacity={0.2} />
          <circle cx={186} cy={210} r={5} fill="none" stroke="#10B981" strokeWidth={1.5} />
          <text x={194} y={214} fontSize={9} fontWeight={600} style={{ fill: "#10B981" }}>Y = strong</text>

          <circle cx={280} cy={210} r={5} fill="#F59E0B" fillOpacity={0.2} />
          <circle cx={280} cy={210} r={5} fill="none" stroke="#F59E0B" strokeWidth={1.5} />
          <text x={288} y={214} fontSize={9} fontWeight={600} style={{ fill: "#F59E0B" }}>~ = partial</text>

          <circle cx={380} cy={210} r={5} fill="#EF4444" fillOpacity={0.2} />
          <circle cx={380} cy={210} r={5} fill="none" stroke="#EF4444" strokeWidth={1.5} />
          <text x={388} y={214} fontSize={9} fontWeight={600} style={{ fill: "#EF4444" }}>N = limited</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Each system optimises for a different set of trade-offs — there is no universal winner.
      </figcaption>
    </figure>
  );
}
