const EMERALD = "#10B981";
const SKY = "#0EA5E9";
const AMBER = "#F59E0B";
const RED = "#EF4444";

const BAR_X = 175;
const BAR_MAX_W = 280;
const MAX_VAL = 50;
const ROW_H = 38;
const START_Y = 50;

const rows = [
  { label: "Plain English",      tokens: 25, color: EMERALD },
  { label: "Markdown",           tokens: 33, color: SKY     },
  { label: "JSON / Structured",  tokens: 38, color: AMBER   },
  { label: "URLs / Code",        tokens: 50, color: RED     },
];

export function TokenAnatomyDiagram() {
  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 210" width="100%">
        <text
          x="300"
          y="18"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Token Density by Content Type (per 100 characters)
        </text>

        {/* Axis labels */}
        <text x="30" y="40" fontSize="10" fontWeight="600" fill="hsl(var(--muted-foreground))">
          CONTENT TYPE
        </text>
        <text x={BAR_X} y="40" fontSize="10" fontWeight="600" fill="hsl(var(--muted-foreground))">
          TOKENS CONSUMED
        </text>

        {rows.map((row, i) => {
          const y = START_Y + i * ROW_H;
          const barW = (row.tokens / MAX_VAL) * BAR_MAX_W;
          return (
            <g key={row.label}>
              {/* Content type label */}
              <text x="30" y={y + 16} fontSize="11" fontWeight="600" fill={row.color}>
                {row.label}
              </text>
              {/* Track */}
              <rect
                x={BAR_X}
                y={y + 4}
                width={BAR_MAX_W}
                height={20}
                rx="4"
                fill="hsl(var(--muted))"
                fillOpacity="0.35"
              />
              {/* Filled bar */}
              <rect
                x={BAR_X}
                y={y + 4}
                width={barW}
                height={20}
                rx="4"
                fill={row.color}
                fillOpacity="0.75"
              />
              {/* Token count label */}
              <text
                x={BAR_X + BAR_MAX_W + 8}
                y={y + 17}
                fontSize="10"
                fontWeight="700"
                fill={row.color}
              >
                ~{row.tokens} tok
              </text>
            </g>
          );
        })}

        {/* Scale markers */}
        {[0, 25, 50].map((val) => {
          const x = BAR_X + (val / MAX_VAL) * BAR_MAX_W;
          return (
            <g key={val}>
              <line
                x1={x}
                y1={START_Y + 2}
                x2={x}
                y2={START_Y + rows.length * ROW_H - 2}
                stroke="hsl(var(--border))"
                strokeWidth="0.75"
                strokeDasharray="3 3"
              />
              <text
                x={x}
                y={START_Y + rows.length * ROW_H + 14}
                textAnchor="middle"
                fontSize="9"
                fill="hsl(var(--muted-foreground))"
              >
                {val}
              </text>
            </g>
          );
        })}

        <text
          x="300"
          y="200"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          Approximate values. URLs and code can cost 2× more tokens than equivalent plain prose.
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Token density varies significantly by content type — counting words or characters
        instead of tokens leads to prompt budget surprises
      </figcaption>
    </figure>
  );
}
