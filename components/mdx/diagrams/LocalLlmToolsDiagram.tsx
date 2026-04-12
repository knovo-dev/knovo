const OLLAMA = "#0EA5E9";
const VLLM = "#7C3AED";
const LMS = "#10B981";

const BOX_W = 160;
const BOX_H = 140;
const BOX_Y = 35;

const tools = [
    {
      name: "Ollama",
      tagline: "CLI-first runtime",
      color: OLLAMA,
      badge: "Fastest start",
      points: ["Dev & eval speed", "Simple local API", "Consumer hardware"],
      cx: 110,
    },
    {
      name: "vLLM",
      tagline: "Production serving engine",
      color: VLLM,
      badge: "Highest throughput",
      points: ["GPU-backed serving", "OpenAI-compatible", "Cluster-scale ops"],
      cx: 300,
    },
    {
      name: "LM Studio",
      tagline: "Desktop GUI workflow",
      color: LMS,
      badge: "Friendliest UI",
      points: ["Visual model browser", "Local API server", "No CLI needed"],
      cx: 490,
    },
];

export function LocalLlmToolsDiagram() {
  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 215" width="100%">
        <text
          x="300"
          y="20"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Local LLM Tools at a Glance
        </text>

        {tools.map((tool) => (
          <g key={tool.name}>
            <rect
              x={tool.cx - BOX_W / 2}
              y={BOX_Y}
              width={BOX_W}
              height={BOX_H}
              rx="8"
              fill={tool.color}
              fillOpacity="0.08"
              stroke={tool.color}
              strokeWidth="1.5"
            />
            <text
              x={tool.cx}
              y={BOX_Y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={tool.color}
            >
              {tool.name}
            </text>
            <text
              x={tool.cx}
              y={BOX_Y + 36}
              textAnchor="middle"
              fontSize="9"
              fill="hsl(var(--muted-foreground))"
            >
              {tool.tagline}
            </text>
            <line
              x1={tool.cx - BOX_W / 2 + 10}
              y1={BOX_Y + 44}
              x2={tool.cx + BOX_W / 2 - 10}
              y2={BOX_Y + 44}
              stroke={tool.color}
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
            {tool.points.map((pt, i) => (
              <text
                key={i}
                x={tool.cx - BOX_W / 2 + 14}
                y={BOX_Y + 62 + i * 22}
                fontSize="10"
                fill="hsl(var(--foreground))"
              >
                • {pt}
              </text>
            ))}
            <text
              x={tool.cx}
              y={BOX_Y + BOX_H + 16}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill={tool.color}
            >
              {tool.badge}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Ollama, vLLM, and LM Studio solve different problems — choose based on deployment context,
        not popularity
      </figcaption>
    </figure>
  );
}
