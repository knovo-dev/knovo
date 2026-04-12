const INDIGO = "#4F46E5";
const SKY = "#0EA5E9";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";

const CARD_W = 268;
const CARD_H = 78;
const GAP_X = 24;
const GAP_Y = 14;
const MARGIN_X = 20;
const CARDS_Y = 36;

// Two columns, two rows
const cards = [
  {
    title: "Chunking",
    sub: "Split into semantic units",
    points: ["Large document corpora", "RAG pipelines", "Partial processing"],
    color: INDIGO,
    col: 0,
    row: 0,
  },
  {
    title: "Sliding Window",
    sub: "Keep recent, summarize old",
    points: ["Long conversations", "Agent loops", "Session continuity"],
    color: SKY,
    col: 1,
    row: 0,
  },
  {
    title: "Selective Retrieval",
    sub: "Fetch only relevant chunks",
    points: ["Large corpus, specific query", "Cost & latency sensitive", "Inspectable citations"],
    color: EMERALD,
    col: 0,
    row: 1,
  },
  {
    title: "Summarization",
    sub: "Compress old state",
    points: ["Multi-turn workflows", "Agent memory", "Preserving decisions"],
    color: AMBER,
    col: 1,
    row: 1,
  },
];

export function ContextWindowStrategiesDiagram() {
  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 220" width="100%">
        <text
          x="300"
          y="20"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Context Window Management Strategies
        </text>

        {cards.map((card) => {
          const x = MARGIN_X + card.col * (CARD_W + GAP_X);
          const y = CARDS_Y + card.row * (CARD_H + GAP_Y);
          const cx = x + CARD_W / 2;
          return (
            <g key={card.title}>
              <rect
                x={x}
                y={y}
                width={CARD_W}
                height={CARD_H}
                rx="8"
                fill={card.color}
                fillOpacity="0.07"
                stroke={card.color}
                strokeWidth="1.5"
              />
              <text
                x={x + 14}
                y={y + 20}
                fontSize="12"
                fontWeight="700"
                fill={card.color}
              >
                {card.title}
              </text>
              <text
                x={x + 14}
                y={y + 33}
                fontSize="9"
                fill="hsl(var(--muted-foreground))"
              >
                {card.sub}
              </text>
              <line
                x1={x + 10}
                y1={y + 39}
                x2={x + CARD_W - 10}
                y2={y + 39}
                stroke={card.color}
                strokeWidth="0.75"
                strokeOpacity="0.35"
              />
              {card.points.map((pt, i) => (
                <text
                  key={i}
                  x={x + 14}
                  y={y + 52 + i * 14}
                  fontSize="9.5"
                  fill="hsl(var(--foreground))"
                >
                  • {pt}
                </text>
              ))}
              {/* Invisible cx reference suppressor */}
              <text x={cx} y={0} fontSize="0">{""}</text>
            </g>
          );
        })}

        <text
          x="300"
          y="212"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          Hybrid designs are common — retrieve first, then reason over the narrowed set with long context
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Four strategies for managing long contexts — the right choice depends on corpus size,
        query specificity, and cost tolerance
      </figcaption>
    </figure>
  );
}
