export function PromptStackDiagram() {
  const BAND_H = 38;
  const GAP = 5;
  const START_Y = 38;

  const bands = [
    {
      num: "1",
      name: "System Prompt",
      desc: "Stable defaults · behavior constraints · output contract",
      color: "#4F46E5",
      risk: false,
    },
    {
      num: "2",
      name: "App / Developer Prompt",
      desc: "Product-specific rules · tool configuration",
      color: "#0EA5E9",
      risk: false,
    },
    {
      num: "3",
      name: "User Message",
      desc: "Task instance · per-request instruction",
      color: "#7C3AED",
      risk: true,
    },
    {
      num: "4",
      name: "Retrieved Context / Tool Outputs",
      desc: "Dynamic data · may contain adversarial text",
      color: "#F59E0B",
      risk: true,
    },
  ];

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
          Prompt Stack — Priority Order
        </text>

        {bands.map((band, i) => {
          const y = START_Y + i * (BAND_H + GAP);
          const cy = y + BAND_H / 2;
          return (
            <g key={i}>
              <rect
                x="10"
                y={y}
                width="580"
                height={BAND_H}
                rx="6"
                fill={band.color}
                fillOpacity="0.1"
                stroke={band.color}
                strokeWidth="1.5"
              />
              <circle cx="30" cy={cy} r="11" fill={band.color} fillOpacity="0.9" />
              <text
                x="30"
                y={cy + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="white"
              >
                {band.num}
              </text>
              <text x="50" y={cy - 5} fontSize="12" fontWeight="600" fill={band.color}>
                {band.name}
              </text>
              <text x="50" y={cy + 9} fontSize="10" fill="hsl(var(--muted-foreground))">
                {band.desc}
              </text>
              {band.risk && (
                <g>
                  <rect
                    x="520"
                    y={cy - 10}
                    width="66"
                    height="19"
                    rx="9"
                    fill="#EF4444"
                    fillOpacity="0.12"
                    stroke="#EF4444"
                    strokeWidth="1"
                  />
                  <text
                    x="553"
                    y={cy + 4}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="500"
                    fill="#EF4444"
                  >
                    override risk
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        System prompts have the highest priority but can be challenged by later context — design
        prompts to survive pressure
      </figcaption>
    </figure>
  );
}
