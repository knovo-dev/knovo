export function EvalLoopDiagram() {
  const BOX_W = 120;
  const BOX_H = 46;
  const BOX_Y = 55;
  const CY = BOX_Y + BOX_H / 2;
  const RETURN_Y = 132;
  const MARGIN = 20;
  const STEP = BOX_W + 20;

  const boxes = [
    { lines: ["Make", "Change"], color: "#4F46E5" },
    { lines: ["Run", "Eval Set"], color: "#0EA5E9" },
    { lines: ["Review", "Failures"], color: "#F59E0B" },
    { lines: ["Fix or", "Accept"], color: "#10B981" },
  ];

  const xs = boxes.map((_, i) => MARGIN + i * STEP);
  const cxs = xs.map((x) => x + BOX_W / 2);

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 580 158" width="100%">
        <defs>
          <marker
            id="eld-arr"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="hsl(var(--muted-foreground))" />
          </marker>
          <marker
            id="eld-ret"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="#7C3AED" />
          </marker>
        </defs>

        <text
          x="290"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Minimal Eval Loop in CI
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
              y={CY - 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={box.color}
            >
              {box.lines[0]}
            </text>
            <text
              x={cxs[i]}
              y={CY + 9}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={box.color}
            >
              {box.lines[1]}
            </text>
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
            markerEnd="url(#eld-arr)"
          />
        ))}

        <path
          d={`M ${cxs[3]} ${BOX_Y + BOX_H} L ${cxs[3]} ${RETURN_Y} L ${cxs[0]} ${RETURN_Y} L ${cxs[0]} ${BOX_Y + BOX_H}`}
          stroke="#7C3AED"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
          markerEnd="url(#eld-ret)"
        />
        <text
          x={(cxs[0] + cxs[3]) / 2}
          y={RETURN_Y + 14}
          textAnchor="middle"
          fontSize="10"
          fill="#7C3AED"
        >
          iterate until metrics pass
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Treat evals as a repeating CI loop — not a one-off notebook check
      </figcaption>
    </figure>
  );
}
