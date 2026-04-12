export function SearchComparisonDiagram() {
  const BOX_W = 188;
  const BOX_H = 30;
  const START_Y = 55;
  const STEP = 40;
  const LX = 58;
  const RX = 354;
  const CL = LX + BOX_W / 2;
  const CR = RX + BOX_W / 2;
  const LEFT_COLOR = "#0EA5E9";
  const RIGHT_COLOR = "#7C3AED";

  const leftSteps = [
    { label: "Query", sub: '"cancel my plan"' },
    { label: "Tokenize", sub: "→ [cancel, plan]" },
    { label: "Inverted Index", sub: "lookup matching docs" },
    { label: "BM25 Scoring", sub: "term freq + length norm" },
    { label: "Results", sub: "exact term matches" },
  ];

  const rightSteps = [
    { label: "Query", sub: '"cancel my plan"' },
    { label: "Embed", sub: "→ [0.2, 0.8, …]" },
    { label: "ANN Index", sub: "HNSW / IVFFlat search" },
    { label: "Cosine Similarity", sub: "nearest vector matches" },
    { label: "Results", sub: "semantic neighbours" },
  ];

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 258" width="100%">
        <defs>
          <marker id="sc-l" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={LEFT_COLOR} />
          </marker>
          <marker id="sc-r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={RIGHT_COLOR} />
          </marker>
        </defs>

        <text
          x="300"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Keyword (BM25) vs Vector Retrieval
        </text>

        <text x={CL} y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill={LEFT_COLOR}>
          Keyword / BM25
        </text>
        <text x={CR} y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill={RIGHT_COLOR}>
          Vector / Semantic
        </text>
        <line
          x1="295"
          y1="48"
          x2="295"
          y2="248"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 3"
        />

        {leftSteps.map((step, i) => {
          const y = START_Y + i * STEP;
          const cy = y + BOX_H / 2;
          return (
            <g key={i}>
              <rect
                x={LX}
                y={y}
                width={BOX_W}
                height={BOX_H}
                rx="5"
                fill={LEFT_COLOR}
                fillOpacity={i === leftSteps.length - 1 ? 0.18 : 0.1}
                stroke={LEFT_COLOR}
                strokeWidth="1.5"
              />
              <text
                x={CL}
                y={cy - 3}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={LEFT_COLOR}
              >
                {step.label}
              </text>
              <text
                x={CL}
                y={cy + 9}
                textAnchor="middle"
                fontSize="9"
                fill="hsl(var(--muted-foreground))"
              >
                {step.sub}
              </text>
              {i < leftSteps.length - 1 && (
                <line
                  x1={CL}
                  y1={y + BOX_H + 2}
                  x2={CL}
                  y2={y + STEP - 2}
                  stroke={LEFT_COLOR}
                  strokeWidth="1.5"
                  markerEnd="url(#sc-l)"
                />
              )}
            </g>
          );
        })}

        {rightSteps.map((step, i) => {
          const y = START_Y + i * STEP;
          const cy = y + BOX_H / 2;
          return (
            <g key={i}>
              <rect
                x={RX}
                y={y}
                width={BOX_W}
                height={BOX_H}
                rx="5"
                fill={RIGHT_COLOR}
                fillOpacity={i === rightSteps.length - 1 ? 0.18 : 0.1}
                stroke={RIGHT_COLOR}
                strokeWidth="1.5"
              />
              <text
                x={CR}
                y={cy - 3}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={RIGHT_COLOR}
              >
                {step.label}
              </text>
              <text
                x={CR}
                y={cy + 9}
                textAnchor="middle"
                fontSize="9"
                fill="hsl(var(--muted-foreground))"
              >
                {step.sub}
              </text>
              {i < rightSteps.length - 1 && (
                <line
                  x1={CR}
                  y1={y + BOX_H + 2}
                  x2={CR}
                  y2={y + STEP - 2}
                  stroke={RIGHT_COLOR}
                  strokeWidth="1.5"
                  markerEnd="url(#sc-r)"
                />
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        BM25 retrieves by term overlap; vector search retrieves by semantic closeness in embedding
        space
      </figcaption>
    </figure>
  );
}
