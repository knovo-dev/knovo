const TOKENS = [
  { text: "transform", id: "47385", color: "#4F46E5" },
  { text: "ers", id: "1291", color: "#7C3AED" },
  { text: "\u25b8are", id: "527", color: "#0EA5E9" },
  { text: "\u25b8useful", id: "5505", color: "#10B981" },
];

const VW = 640;
const BOX_W = 112;
const BOX_H = 38;
const GAP = 10;
const TOTAL = TOKENS.length * BOX_W + (TOKENS.length - 1) * GAP;
const SX = (VW - TOTAL) / 2;

export function TokenizerDiagram() {
  const fg = "hsl(var(--foreground))";
  const muted = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";

  return (
    <figure className="not-prose my-8" aria-label="Tokenization example">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 640 162" width="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Input string */}
          <text x={320} y={24} textAnchor="middle" fontSize={13}
            style={{ fill: fg, fontFamily: "monospace", fontWeight: 500 }}>
            Input: &quot;transformers are useful&quot;
          </text>

          {/* Down arrow */}
          <line x1={320} y1={32} x2={320} y2={50}
            style={{ stroke: border }} strokeWidth={1.5} />
          <path d="M315,48 L320,56 L325,48"
            fill="none" style={{ stroke: muted }} strokeWidth={1.5} strokeLinejoin="round" />

          {/* Token boxes */}
          {TOKENS.map((t, i) => {
            const x = SX + i * (BOX_W + GAP);
            const cx = x + BOX_W / 2;
            return (
              <g key={t.id}>
                <rect x={x} y={60} width={BOX_W} height={BOX_H} rx={7}
                  fill={t.color + "18"} stroke={t.color} strokeWidth={1.5} />
                <text x={cx} y={83} textAnchor="middle" fontSize={12} fontWeight={600}
                  style={{ fill: t.color, fontFamily: "monospace" }}>
                  {t.text}
                </text>
                <text x={cx} y={118} textAnchor="middle" fontSize={11}
                  style={{ fill: muted, fontFamily: "monospace" }}>
                  id {t.id}
                </text>
              </g>
            );
          })}

          {/* Footer */}
          <text x={320} y={148} textAnchor="middle" fontSize={11.5}
            style={{ fill: muted }}>
            3 words → 4 subword tokens · ▸ marks a leading space
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Tokenisation splits text into subword units. Word count ≠ token count.
      </figcaption>
    </figure>
  );
}
