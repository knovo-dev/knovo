export function MultimodalPipelineDiagram() {
  const BOX_W = 90;
  const BOX_H = 45;
  const BOX_Y = 48;
  const CY = BOX_Y + BOX_H / 2;
  const MARGIN = 47;
  const STEP = BOX_W + 14;
  const RETURN_Y = 132;

  const boxes = [
    { lines: ["Ingest"], sub: "files / URLs", color: "#0EA5E9" },
    { lines: ["Normalize"], sub: "chunk · split", color: "#4F46E5" },
    { lines: ["Route"], sub: "route by type", color: "#F59E0B" },
    { lines: ["Reason"], sub: "LLM reasoning", color: "#7C3AED" },
    { lines: ["Validate"], sub: "schema · check", color: "#10B981" },
  ];

  const xs = boxes.map((_, i) => MARGIN + i * STEP);
  const cxs = xs.map((x) => x + BOX_W / 2);

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 168" width="100%">
        <defs>
          <marker id="mmp-arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="hsl(var(--muted-foreground))" />
          </marker>
          <marker id="mmp-red" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#EF4444" />
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
          Multimodal Production Pipeline
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
            <text
              x={cxs[i]}
              y={CY + 5}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={box.color}
            >
              {box.lines[0]}
            </text>
            <text
              x={cxs[i]}
              y={BOX_Y + BOX_H + 13}
              textAnchor="middle"
              fontSize="9"
              fill="hsl(var(--muted-foreground))"
            >
              {box.sub}
            </text>
          </g>
        ))}

        {/* Forward arrows */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={xs[i] + BOX_W + 2}
            y1={CY}
            x2={xs[i + 1] - 2}
            y2={CY}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1.5"
            markerEnd="url(#mmp-arr)"
          />
        ))}

        {/* Fallback arc: Validate → Normalize (dashed red) */}
        <path
          d={`M ${cxs[4]} ${BOX_Y + BOX_H} L ${cxs[4]} ${RETURN_Y} L ${cxs[1]} ${RETURN_Y} L ${cxs[1]} ${BOX_Y + BOX_H}`}
          stroke="#EF4444"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
          markerEnd="url(#mmp-red)"
        />
        <text
          x={(cxs[4] + cxs[1]) / 2}
          y={RETURN_Y + 14}
          textAnchor="middle"
          fontSize="10"
          fill="#EF4444"
        >
          fallback on low confidence
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Stage each modality through normalize → route → reason → validate before trusting the
        output
      </figcaption>
    </figure>
  );
}
