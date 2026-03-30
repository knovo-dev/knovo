const WORDS = ["The", "API", "request", "failed", "because", "timeout"];
const TW = 72;
const TH = 32;
const GAP = 10;
const TOTAL = WORDS.length * TW + (WORDS.length - 1) * GAP;
const SX = (640 - TOTAL) / 2;
const TY = 140;
const FOCUS = 3; // "failed"

// Attention weights FROM "failed" TO each token (higher = more attention)
const WEIGHTS = [0.05, 0.7, 0.55, 1.0, 0.25, 0.85];

function arc(x1: number, x2: number, baseY: number, weight: number): string {
  const cx = (x1 + x2) / 2;
  const spread = Math.abs(x2 - x1);
  const cy = baseY - spread * 0.38 - 10;
  return `M${x1},${baseY} Q${cx},${cy} ${x2},${baseY}`;
}

export function AttentionDiagram() {
  const muted = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const fg = "hsl(var(--foreground))";

  const centerX = (i: number) => SX + i * (TW + GAP) + TW / 2;

  return (
    <figure className="not-prose my-8" aria-label="Attention mechanism diagram">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 640 210" width="100%" xmlns="http://www.w3.org/2000/svg">

          {/* Attention arcs */}
          {WEIGHTS.map((w, i) => {
            if (i === FOCUS || w < 0.1) return null;
            const x1 = centerX(FOCUS);
            const x2 = centerX(i);
            return (
              <path
                key={i}
                d={arc(x1, x2, TY, w)}
                fill="none"
                stroke="#4F46E5"
                strokeWidth={w * 3.5}
                strokeOpacity={w * 0.85}
              />
            );
          })}

          {/* Token boxes */}
          {WORDS.map((word, i) => {
            const x = SX + i * (TW + GAP);
            const isFocus = i === FOCUS;
            const w = WEIGHTS[i];
            const color = isFocus ? "#4F46E5" : w > 0.6 ? "#7C3AED" : w > 0.3 ? "#0EA5E9" : "#94a3b8";
            return (
              <g key={word}>
                <rect x={x} y={TY} width={TW} height={TH} rx={7}
                  fill={isFocus ? "#4F46E520" : color + "12"}
                  stroke={color}
                  strokeWidth={isFocus ? 2 : 1.5} />
                <text x={x + TW / 2} y={TY + 20} textAnchor="middle" fontSize={12}
                  fontWeight={isFocus ? 700 : 500}
                  style={{ fill: color, fontFamily: "sans-serif" }}>
                  {word}
                </text>
              </g>
            );
          })}

          {/* Focus label */}
          <text x={centerX(FOCUS)} y={TY + 50} textAnchor="middle" fontSize={10}
            style={{ fill: "#4F46E5" }}>
            query token
          </text>

          {/* Weight legend */}
          <text x={320} y={24} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            Attention from &ldquo;failed&rdquo; to other tokens
          </text>
          <text x={320} y={42} textAnchor="middle" fontSize={11}
            style={{ fill: muted }}>
            arc thickness = attention weight · strong pull on &ldquo;API&rdquo;, &ldquo;request&rdquo;, &ldquo;timeout&rdquo;
          </text>

          {/* Legend bar */}
          <text x={40} y={200} fontSize={10} style={{ fill: muted }}>low</text>
          {[0.15, 0.35, 0.55, 0.75, 0.95].map((op, i) => (
            <rect key={i} x={68 + i * 18} y={190} width={14} height={8} rx={2}
              fill="#4F46E5" fillOpacity={op} />
          ))}
          <text x={162} y={200} fontSize={10} style={{ fill: muted }}>high attention</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        When processing &ldquo;failed&rdquo;, the model attends most strongly to &ldquo;API&rdquo;, &ldquo;request&rdquo;, and &ldquo;timeout&rdquo; — the contextually relevant tokens.
      </figcaption>
    </figure>
  );
}
