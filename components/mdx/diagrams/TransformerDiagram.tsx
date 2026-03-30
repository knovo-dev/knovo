const TOKENS = ["T\u2081", "T\u2082", "T\u2083", "T\u2084", "T\u2085"];
const TW = 48;
const TH = 30;
const TG = 8;
const TX_START = (480 - (TOKENS.length * TW + (TOKENS.length - 1) * TG)) / 2;

function Block({ y, offset, opacity }: { y: number; offset: number; opacity: number }) {
  const fg = "hsl(var(--foreground))";
  const muted = "hsl(var(--muted-foreground))";
  const x = 60 + offset;
  const w = 360 - offset;
  return (
    <g opacity={opacity}>
      {/* Outer block */}
      <rect x={x} y={y} width={w} height={88} rx={10}
        fill="#4F46E518" stroke="#4F46E5" strokeWidth={1.5} />
      {/* Attention sub-block */}
      <rect x={x + 12} y={y + 10} width={w - 24} height={28} rx={6}
        fill="#4F46E528" stroke="#4F46E560" strokeWidth={1} />
      <text x={x + w / 2} y={y + 29} textAnchor="middle" fontSize={11} fontWeight={600}
        style={{ fill: fg, fontFamily: "sans-serif" }}>
        Multi-Head Self-Attention
      </text>
      {/* FFN sub-block */}
      <rect x={x + 12} y={y + 50} width={w - 24} height={28} rx={6}
        fill="#7C3AED28" stroke="#7C3AED60" strokeWidth={1} />
      <text x={x + w / 2} y={y + 69} textAnchor="middle" fontSize={11} fontWeight={600}
        style={{ fill: muted, fontFamily: "sans-serif" }}>
        Feed Forward Network
      </text>
    </g>
  );
}

export function TransformerDiagram() {
  const fg = "hsl(var(--foreground))";
  const muted = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const accent = "#4F46E5";

  return (
    <figure className="not-prose my-8" aria-label="Transformer architecture diagram">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 480 360" width="100%" xmlns="http://www.w3.org/2000/svg">

          {/* ── Output probabilities ── */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={152 + i * 38} y={32 - [18, 10, 24, 8, 14][i]} width={22}
              height={[18, 10, 24, 8, 14][i]} rx={3}
              fill={i === 2 ? accent : accent + "50"} />
          ))}
          <text x={240} y={52} textAnchor="middle" fontSize={11}
            style={{ fill: muted }}>
            next-token probabilities
          </text>

          {/* Arrow: output → top block */}
          <line x1={240} y1={56} x2={240} y2={74}
            style={{ stroke: border }} strokeWidth={1.5} />
          <path d="M235,72 L240,80 L245,72"
            fill="none" style={{ stroke: muted }} strokeWidth={1.5} strokeLinejoin="round" />

          {/* Stacked transformer blocks (back to front) */}
          <Block y={88} offset={16} opacity={0.35} />
          <Block y={92} offset={8} opacity={0.6} />
          <Block y={96} offset={0} opacity={1} />

          {/* × N label */}
          <text x={432} y={148} fontSize={12} fontWeight={700}
            style={{ fill: accent }}>× N</text>

          {/* Arrow: blocks → embedding */}
          <line x1={240} y1={188} x2={240} y2={206}
            style={{ stroke: border }} strokeWidth={1.5} />
          <path d="M235,204 L240,212 L245,204"
            fill="none" style={{ stroke: muted }} strokeWidth={1.5} strokeLinejoin="round" />

          {/* Embedding layer */}
          <rect x={80} y={212} width={320} height={30} rx={8}
            fill="#0EA5E918" stroke="#0EA5E9" strokeWidth={1.5} />
          <text x={240} y={231} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: "#0EA5E9" }}>
            Token Embeddings + Positional Encoding
          </text>

          {/* Arrow: embedding → tokens */}
          <line x1={240} y1={246} x2={240} y2={264}
            style={{ stroke: border }} strokeWidth={1.5} />
          <path d="M235,262 L240,270 L245,262"
            fill="none" style={{ stroke: muted }} strokeWidth={1.5} strokeLinejoin="round" />

          {/* Input tokens */}
          {TOKENS.map((t, i) => {
            const x = TX_START + i * (TW + TG);
            return (
              <g key={t}>
                <rect x={x} y={272} width={TW} height={TH} rx={6}
                  fill="#10B98118" stroke="#10B981" strokeWidth={1.5} />
                <text x={x + TW / 2} y={291} textAnchor="middle" fontSize={13} fontWeight={600}
                  style={{ fill: "#10B981" }}>
                  {t}
                </text>
              </g>
            );
          })}
          <text x={240} y={322} textAnchor="middle" fontSize={11}
            style={{ fill: muted }}>
            Input tokens
          </text>

          {/* Right-side label */}
          <text x={24} y={148} textAnchor="middle" fontSize={10}
            style={{ fill: muted, writingMode: "vertical-rl" } as React.CSSProperties}>
            one pass per token generated
          </text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Transformer architecture: tokens flow up through N stacked blocks, each refining representations via attention and a feed-forward network.
      </figcaption>
    </figure>
  );
}
