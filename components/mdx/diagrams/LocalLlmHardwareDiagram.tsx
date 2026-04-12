const BAR_COLOR = "#4F46E5";
const HIGHLIGHT = "#10B981";

const BAR_X = 80;
const BAR_MAX_W = 220;
const ROW_H = 36;
const START_Y = 52;

const rows = [
  { label: "FP32", vram: "~28 GB",  pct: 100,  hw: "Multi-GPU cluster",         color: BAR_COLOR },
  { label: "FP16", vram: "~14 GB",  pct: 50,   hw: "High-end GPU (A100/H100)",  color: BAR_COLOR },
  { label: "INT8", vram: "~7 GB",   pct: 25,   hw: "Prosumer GPU (3080/4080)",  color: BAR_COLOR },
  { label: "Q4",   vram: "~3.5 GB", pct: 12.5, hw: "Consumer GPU or CPU",       color: HIGHLIGHT },
];

export function LocalLlmHardwareDiagram() {
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
          Memory Footprint by Precision Level (7B Model)
        </text>

        {/* Column headers */}
        <text x="30" y="40" fontSize="10" fontWeight="600" fill="hsl(var(--muted-foreground))">
          FORMAT
        </text>
        <text x={BAR_X} y="40" fontSize="10" fontWeight="600" fill="hsl(var(--muted-foreground))">
          MEMORY NEED
        </text>
        <text x="360" y="40" fontSize="10" fontWeight="600" fill="hsl(var(--muted-foreground))">
          TYPICAL HARDWARE
        </text>

        {rows.map((row, i) => {
          const y = START_Y + i * ROW_H;
          const barW = (row.pct / 100) * BAR_MAX_W;
          return (
            <g key={row.label}>
              {/* Format label */}
              <text x="30" y={y + 16} fontSize="12" fontWeight="700" fill={row.color}>
                {row.label}
              </text>
              {/* Track */}
              <rect
                x={BAR_X}
                y={y + 4}
                width={BAR_MAX_W}
                height={18}
                rx="3"
                fill="hsl(var(--muted))"
                fillOpacity="0.35"
              />
              {/* Filled bar */}
              <rect
                x={BAR_X}
                y={y + 4}
                width={barW}
                height={18}
                rx="3"
                fill={row.color}
                fillOpacity="0.75"
              />
              {/* VRAM label after track */}
              <text
                x={BAR_X + BAR_MAX_W + 6}
                y={y + 16}
                fontSize="10"
                fontWeight="600"
                fill={row.color}
              >
                {row.vram}
              </text>
              {/* Hardware label */}
              <text x="360" y={y + 16} fontSize="9" fill="hsl(var(--muted-foreground))">
                {row.hw}
              </text>
            </g>
          );
        })}

        {/* Footer note */}
        <text
          x="300"
          y="200"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          Approximate values. Actual usage varies by runtime, context length, and concurrency.
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Quantization reduces VRAM requirements dramatically — Q4 brings a 7B model within reach of
        consumer hardware
      </figcaption>
    </figure>
  );
}
