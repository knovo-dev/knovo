export function StructuredOutputFailuresDiagram() {
  const rows = [
    { mode: "Syntax valid, wrong schema", fix: "Use schema-constrained generation" },
    { mode: 'Enum drift ("urgent" vs "high")', fix: "Explicit enums + repair map for synonyms" },
    { mode: "Missing nested fields", fix: "Flatten depth + retry with validation error" },
    { mode: "Mixed prose + JSON output", fix: "Vendor-native structured output features" },
    { mode: "Business-rule violations", fix: "Separate schema vs business-rule checks" },
  ];

  const ROW_H = 28;
  const START_Y = 58;
  const MID_X = 300;

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 210" width="100%">
        <text
          x="300"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Structured Output Failure Modes
        </text>

        <text x="15" y="44" fontSize="11" fontWeight="600" fill="#EF4444">
          Failure Mode
        </text>
        <text x={MID_X + 15} y="44" fontSize="11" fontWeight="600" fill="#10B981">
          Fix
        </text>

        <line
          x1="10"
          y1="50"
          x2="590"
          y2="50"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        <line
          x1={MID_X}
          y1="50"
          x2={MID_X}
          y2={START_Y + rows.length * ROW_H}
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />

        {rows.map((row, i) => {
          const y = START_Y + i * ROW_H;
          const textY = y + ROW_H / 2 + 4;
          const isEven = i % 2 === 0;
          return (
            <g key={i}>
              <rect
                x="10"
                y={y}
                width="580"
                height={ROW_H}
                fill="hsl(var(--muted))"
                fillOpacity={isEven ? 0.3 : 0}
                rx="2"
              />
              <circle
                cx="24"
                cy={y + ROW_H / 2}
                r="4"
                fill="#EF4444"
                fillOpacity="0.75"
              />
              <text x="34" y={textY} fontSize="10" fill="hsl(var(--foreground))">
                {row.mode}
              </text>
              <circle
                cx={MID_X + 14}
                cy={y + ROW_H / 2}
                r="4"
                fill="#10B981"
                fillOpacity="0.75"
              />
              <text x={MID_X + 24} y={textY} fontSize="10" fill="hsl(var(--foreground))">
                {row.fix}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Five predictable failure modes and targeted production fixes
      </figcaption>
    </figure>
  );
}
