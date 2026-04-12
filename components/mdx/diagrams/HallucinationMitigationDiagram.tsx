const SKY = "#0EA5E9";
const EMERALD = "#10B981";

const BOX_W = 128;
const BOX_H = 50;
const GAP = 8;
const LEFT = 32; // (600 - 4*128 - 3*8) / 2 = 32

const xs = [LEFT, LEFT + BOX_W + GAP, LEFT + 2 * (BOX_W + GAP), LEFT + 3 * (BOX_W + GAP)];
const cxs = xs.map((x) => x + BOX_W / 2);

const DETECT_Y = 44;
const MITIGATE_Y = 140;

const detectItems = [
  { label: "Self-Consistency", sub: "Multiple runs" },
  { label: "Retrieval Check", sub: "Grounding audit" },
  { label: "Fact-Check Tools", sub: "External APIs" },
  { label: "Human Review", sub: "High-stakes evals" },
];

const mitigateItems = [
  { label: "RAG", sub: "Ground in docs" },
  { label: "Structured Output", sub: "Typed contracts" },
  { label: "Stepwise Reasoning", sub: "Decompose tasks" },
  { label: "Refusal Training", sub: "Abstain when weak" },
];

export function HallucinationMitigationDiagram() {
  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 225" width="100%">
        <text
          x="300"
          y="18"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Detection and Mitigation Pipeline
        </text>

        {/* DETECT section */}
        <text x="32" y="38" fontSize="10" fontWeight="700" fill={SKY}>
          DETECT
        </text>
        {detectItems.map((item, i) => (
          <g key={item.label}>
            <rect
              x={xs[i]}
              y={DETECT_Y}
              width={BOX_W}
              height={BOX_H}
              rx="6"
              fill={SKY}
              fillOpacity="0.08"
              stroke={SKY}
              strokeWidth="1.5"
            />
            <text
              x={cxs[i]}
              y={DETECT_Y + 20}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill={SKY}
            >
              {item.label}
            </text>
            <text
              x={cxs[i]}
              y={DETECT_Y + 35}
              textAnchor="middle"
              fontSize="9"
              fill="hsl(var(--muted-foreground))"
            >
              {item.sub}
            </text>
          </g>
        ))}

        {/* Connecting arrows */}
        {cxs.map((cx) => (
          <g key={cx}>
            <line
              x1={cx}
              y1={DETECT_Y + BOX_H + 2}
              x2={cx}
              y2={MITIGATE_Y - 4}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            <polygon
              points={`${cx - 4},${MITIGATE_Y - 4} ${cx + 4},${MITIGATE_Y - 4} ${cx},${MITIGATE_Y + 1}`}
              fill="hsl(var(--border))"
            />
          </g>
        ))}

        {/* MITIGATE section */}
        <text x="32" y="134" fontSize="10" fontWeight="700" fill={EMERALD}>
          MITIGATE
        </text>
        {mitigateItems.map((item, i) => (
          <g key={item.label}>
            <rect
              x={xs[i]}
              y={MITIGATE_Y}
              width={BOX_W}
              height={BOX_H}
              rx="6"
              fill={EMERALD}
              fillOpacity="0.08"
              stroke={EMERALD}
              strokeWidth="1.5"
            />
            <text
              x={cxs[i]}
              y={MITIGATE_Y + 20}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill={EMERALD}
            >
              {item.label}
            </text>
            <text
              x={cxs[i]}
              y={MITIGATE_Y + 35}
              textAnchor="middle"
              fontSize="9"
              fill="hsl(var(--muted-foreground))"
            >
              {item.sub}
            </text>
          </g>
        ))}

        <text
          x="300"
          y="215"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          Mitigation works best when matched to the failure type detected — one tactic rarely fixes all hallucination
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Detection and mitigation are paired — the right mitigation depends on what the detection
        layer reveals
      </figcaption>
    </figure>
  );
}
