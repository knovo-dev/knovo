export function StructuredOutputPipelineDiagram() {
  const BOX_W = 86;
  const BOX_H = 44;
  const BOX_Y = 72;
  const CY = BOX_Y + BOX_H / 2;
  const STEP = BOX_W + 20;
  const MARGIN = 42;
  const RETRY_Y = 150;

  const xs = [0, 1, 2, 3, 4].map((i) => MARGIN + i * STEP);
  const cxs = xs.map((x) => x + BOX_W / 2);

  const boxes = [
    { lines: ["Prompt", "+ Schema"], color: "#4F46E5" },
    { lines: ["LLM"], color: "#7C3AED" },
    { lines: ["JSON", "Output"], color: "#0EA5E9" },
    { lines: ["Schema", "Validate"], color: "#F59E0B" },
    { lines: ["Typed", "Data ✓"], color: "#10B981" },
  ];

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 562 178" width="100%">
        <defs>
          <marker id="sop-arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="hsl(var(--muted-foreground))" />
          </marker>
          <marker id="sop-grn" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#10B981" />
          </marker>
          <marker id="sop-red" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#EF4444" />
          </marker>
        </defs>

        <text
          x="281"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Structured Output Production Pipeline
        </text>

        {boxes.map((box, i) => (
          <g key={i}>
            <rect
              x={xs[i]}
              y={BOX_Y}
              width={BOX_W}
              height={BOX_H}
              rx="6"
              fill={box.color}
              fillOpacity="0.12"
              stroke={box.color}
              strokeWidth="1.5"
            />
            {box.lines.length === 1 ? (
              <text
                x={cxs[i]}
                y={CY + 5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="500"
                fill={box.color}
              >
                {box.lines[0]}
              </text>
            ) : (
              <>
                <text
                  x={cxs[i]}
                  y={CY - 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="500"
                  fill={box.color}
                >
                  {box.lines[0]}
                </text>
                <text
                  x={cxs[i]}
                  y={CY + 9}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="500"
                  fill={box.color}
                >
                  {box.lines[1]}
                </text>
              </>
            )}
          </g>
        ))}

        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={xs[i] + BOX_W + 2}
            y1={CY}
            x2={xs[i + 1] - 2}
            y2={CY}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1.5"
            markerEnd="url(#sop-arr)"
          />
        ))}

        <line
          x1={xs[3] + BOX_W + 2}
          y1={CY}
          x2={xs[4] - 2}
          y2={CY}
          stroke="#10B981"
          strokeWidth="1.5"
          markerEnd="url(#sop-grn)"
        />

        <path
          d={`M ${cxs[3]} ${BOX_Y + BOX_H} L ${cxs[3]} ${RETRY_Y} L ${cxs[1]} ${RETRY_Y} L ${cxs[1]} ${BOX_Y + BOX_H}`}
          stroke="#EF4444"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
          markerEnd="url(#sop-red)"
        />
        <text
          x={(cxs[3] + cxs[1]) / 2}
          y={RETRY_Y + 14}
          textAnchor="middle"
          fontSize="10"
          fill="#EF4444"
        >
          retry with validation error
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Schema-constrained generation, application-side validation, and retry loop on failure
      </figcaption>
    </figure>
  );
}
