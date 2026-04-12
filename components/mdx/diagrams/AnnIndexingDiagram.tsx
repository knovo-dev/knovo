// ANN indexing vs brute-force search.
// Visual: two panels — left shows all connections (brute force), right shows only
// nearest-neighbour graph edges (HNSW). Same point cloud, different traversal cost.

// 10 data points in local (dx, dy) space within a ~220×155 bounding box.
// nearest=true marks the 4 closest to the query point Q(108,78).
const DOTS = [
  { dx: 22,  dy: 35,  nearest: false },
  { dx: 55,  dy: 98,  nearest: true  },  // dist ≈ 56.6
  { dx: 82,  dy: 28,  nearest: true  },  // dist ≈ 56.4
  { dx: 92,  dy: 118, nearest: true  },  // dist ≈ 43.1
  { dx: 122, dy: 58,  nearest: true  },  // dist ≈ 24.4  ← closest
  { dx: 132, dy: 138, nearest: false },
  { dx: 152, dy: 22,  nearest: false },
  { dx: 172, dy: 78,  nearest: false },
  { dx: 182, dy: 128, nearest: false },
  { dx: 62,  dy: 148, nearest: false },
];
const QDX = 108;
const QDY = 78;

const LEFT_OX = 20;   // left panel x-offset
const RIGHT_OX = 330; // right panel x-offset
const OY = 48;        // y-offset for both panels

export function AnnIndexingDiagram() {
  const muted  = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const fg     = "hsl(var(--foreground))";
  const query  = "#4F46E5";   // indigo — query point
  const near   = "#10B981";   // green  — nearest neighbours
  const far    = "#EF4444";   // faded  — skipped points

  const qLeft  = { x: LEFT_OX  + QDX, y: OY + QDY };
  const qRight = { x: RIGHT_OX + QDX, y: OY + QDY };

  return (
    <figure className="not-prose my-8" aria-label="ANN indexing vs brute-force search">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 600 215" width="100%" xmlns="http://www.w3.org/2000/svg">

          {/* Title */}
          <text x={300} y={20} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            ANN indexing vs brute-force search
          </text>

          {/* ── Panel labels ── */}
          <text x={LEFT_OX + 110} y={38} textAnchor="middle"
            fontSize={11} fontWeight={700} style={{ fill: "#F59E0B" }}>
            Brute force
          </text>
          <text x={RIGHT_OX + 110} y={38} textAnchor="middle"
            fontSize={11} fontWeight={700} style={{ fill: near }}>
            HNSW (approximate)
          </text>

          {/* ── Divider ── */}
          <line x1={295} y1={35} x2={295} y2={200}
            style={{ stroke: border }} strokeWidth={1} strokeDasharray="4,4" />

          {/* ── LEFT PANEL: brute force — connect Q to every dot ── */}
          {DOTS.map((d, i) => (
            <line key={i}
              x1={qLeft.x} y1={qLeft.y}
              x2={LEFT_OX + d.dx} y2={OY + d.dy}
              stroke="#F59E0B" strokeOpacity={0.45} strokeWidth={1} />
          ))}
          {DOTS.map((d, i) => (
            <circle key={i}
              cx={LEFT_OX + d.dx} cy={OY + d.dy} r={4}
              fill="#F59E0B" fillOpacity={0.7} />
          ))}
          {/* Query dot (left) */}
          <circle cx={qLeft.x} cy={qLeft.y} r={6} fill={query} />
          <circle cx={qLeft.x} cy={qLeft.y} r={9} fill="none"
            stroke={query} strokeOpacity={0.3} strokeWidth={2} />

          {/* ── RIGHT PANEL: HNSW — connect Q only to nearest neighbours ── */}
          {DOTS.map((d, i) =>
            d.nearest ? (
              <line key={i}
                x1={qRight.x} y1={qRight.y}
                x2={RIGHT_OX + d.dx} y2={OY + d.dy}
                stroke={near} strokeOpacity={0.75} strokeWidth={1.5} />
            ) : null
          )}
          {DOTS.map((d, i) => (
            <circle key={i}
              cx={RIGHT_OX + d.dx} cy={OY + d.dy} r={4}
              fill={d.nearest ? near : "hsl(var(--muted-foreground))"}
              fillOpacity={d.nearest ? 0.8 : 0.25} />
          ))}
          {/* Query dot (right) */}
          <circle cx={qRight.x} cy={qRight.y} r={6} fill={query} />
          <circle cx={qRight.x} cy={qRight.y} r={9} fill="none"
            stroke={query} strokeOpacity={0.3} strokeWidth={2} />

          {/* ── Stats ── */}
          <text x={LEFT_OX + 110} y={204} textAnchor="middle"
            fontSize={9} fontWeight={600} style={{ fill: "#F59E0B" }}>
            n comparisons · 100% exact recall
          </text>
          <text x={RIGHT_OX + 110} y={204} textAnchor="middle"
            fontSize={9} fontWeight={600} style={{ fill: near }}>
            log n traversals · ~96% recall
          </text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        HNSW skips the bulk of the search space. You trade a small amount of recall for dramatically lower query cost.
      </figcaption>
    </figure>
  );
}
