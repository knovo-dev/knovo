export function SystemPromptAnatomyDiagram() {
  const BAND_H = 50;
  const GAP = 6;
  const START_Y = 38;

  const bands = [
    {
      num: "1",
      name: "Persona",
      desc: "Who the assistant is · behavioral frame",
      color: "#4F46E5",
      tags: ["customer support", "extractor", "agent"],
    },
    {
      num: "2",
      name: "Constraints",
      desc: "What the model must and must not do",
      color: "#F59E0B",
      tags: ["context-only", "ask when unclear", "no inventing"],
    },
    {
      num: "3",
      name: "Output Contract",
      desc: "Shape of the answer · format · fallback phrasing",
      color: "#10B981",
      tags: ["JSON only", "numbered steps", "refusal phrasing"],
    },
  ];

  const TAG_W = 110;

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 212" width="100%">
        <text
          x="300"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Anatomy of a System Prompt
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
              <circle cx="30" cy={cy} r="12" fill={band.color} fillOpacity="0.9" />
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
              <text x="52" y={cy - 6} fontSize="13" fontWeight="700" fill={band.color}>
                {band.name}
              </text>
              <text x="52" y={cy + 10} fontSize="10" fill="hsl(var(--muted-foreground))">
                {band.desc}
              </text>
              {band.tags.map((tag, j) => {
                const tagX = 250 + j * 113;
                return (
                  <g key={j}>
                    <rect
                      x={tagX}
                      y={cy - 11}
                      width={TAG_W}
                      height={20}
                      rx="10"
                      fill={band.color}
                      fillOpacity="0.15"
                      stroke={band.color}
                      strokeWidth="1"
                    />
                    <text
                      x={tagX + TAG_W / 2}
                      y={cy + 3}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="500"
                      fill={band.color}
                    >
                      {tag}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        A reliable system prompt covers all three layers — missing any one makes behavior
        unpredictable
      </figcaption>
    </figure>
  );
}
