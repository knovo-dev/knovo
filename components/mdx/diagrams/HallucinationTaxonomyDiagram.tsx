const AMBER = "#F59E0B";
const RED = "#EF4444";
const VIOLET = "#7C3AED";

const BOX_W = 160;
const BOX_H = 138;
const BOX_Y = 35;

const types = [
  {
    name: "Factual Error",
    color: AMBER,
    badge: "Common",
    points: ["Wrong dates or names", "Stale knowledge", "Missing info stated anyway"],
    cx: 110,
  },
  {
    name: "Confabulation",
    color: RED,
    badge: "Most Dangerous",
    points: ["Invented citations", "Fabricated details", "Confident gap-fill"],
    cx: 300,
  },
  {
    name: "Reasoning Failure",
    color: VIOLET,
    badge: "Subtle",
    points: ["Correct facts", "Wrong inference drawn", "Multi-step logic error"],
    cx: 490,
  },
];

export function HallucinationTaxonomyDiagram() {
  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 210" width="100%">
        <text
          x="300"
          y="20"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Hallucination Taxonomy
        </text>

        {types.map((t) => (
          <g key={t.name}>
            <rect
              x={t.cx - BOX_W / 2}
              y={BOX_Y}
              width={BOX_W}
              height={BOX_H}
              rx="8"
              fill={t.color}
              fillOpacity="0.08"
              stroke={t.color}
              strokeWidth="1.5"
            />
            <text
              x={t.cx}
              y={BOX_Y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={t.color}
            >
              {t.name}
            </text>
            <text
              x={t.cx}
              y={BOX_Y + 36}
              textAnchor="middle"
              fontSize="9"
              fill="hsl(var(--muted-foreground))"
            >
              {t.badge}
            </text>
            <line
              x1={t.cx - BOX_W / 2 + 10}
              y1={BOX_Y + 44}
              x2={t.cx + BOX_W / 2 - 10}
              y2={BOX_Y + 44}
              stroke={t.color}
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
            {t.points.map((pt, i) => (
              <text
                key={i}
                x={t.cx - BOX_W / 2 + 12}
                y={BOX_Y + 61 + i * 22}
                fontSize="10"
                fill="hsl(var(--foreground))"
              >
                • {pt}
              </text>
            ))}
          </g>
        ))}

        <text
          x="300"
          y="200"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          Not all bad outputs are the same — the right fix depends on which type of failure is occurring
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Three distinct failure modes require different mitigations — confabulation is the most
        dangerous because it looks authoritative
      </figcaption>
    </figure>
  );
}
