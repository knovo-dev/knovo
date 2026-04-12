export function EvalLayersDiagram() {
  const H = 46;
  const layers = [
    {
      num: "3",
      name: "Task Success",
      metrics: "User outcome · business metric · end-to-end pass/fail",
      color: "#10B981",
      x: 70,
      w: 460,
      y: 38,
    },
    {
      num: "2",
      name: "Generation Quality",
      metrics: "Faithfulness · answer relevancy · hallucination rate",
      color: "#7C3AED",
      x: 40,
      w: 520,
      y: 89,
    },
    {
      num: "1",
      name: "Retrieval Quality",
      metrics: "Context precision · context recall · chunk relevance",
      color: "#0EA5E9",
      x: 10,
      w: 580,
      y: 140,
    },
  ];

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 200" width="100%">
        <text
          x="300"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Three Layers of LLM Evaluation
        </text>

        {layers.map((layer) => {
          const cy = layer.y + H / 2;
          return (
            <g key={layer.num}>
              <rect
                x={layer.x}
                y={layer.y}
                width={layer.w}
                height={H}
                rx="6"
                fill={layer.color}
                fillOpacity="0.12"
                stroke={layer.color}
                strokeWidth="1.5"
              />
              <circle
                cx={layer.x + 22}
                cy={cy}
                r="11"
                fill={layer.color}
                fillOpacity="0.9"
              />
              <text
                x={layer.x + 22}
                y={cy + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="white"
              >
                {layer.num}
              </text>
              <text
                x={layer.x + 42}
                y={cy - 5}
                fontSize="12"
                fontWeight="600"
                fill={layer.color}
              >
                {layer.name}
              </text>
              <text
                x={layer.x + 42}
                y={cy + 10}
                fontSize="10"
                fill="hsl(var(--muted-foreground))"
              >
                {layer.metrics}
              </text>
            </g>
          );
        })}

        <text
          x="300"
          y="196"
          textAnchor="middle"
          fontSize="10"
          fill="hsl(var(--muted-foreground))"
        >
          Layer 1 is the foundation — weak retrieval breaks everything above it
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Separating retrieval, generation, and task-success layers makes failures far easier to
        diagnose
      </figcaption>
    </figure>
  );
}
