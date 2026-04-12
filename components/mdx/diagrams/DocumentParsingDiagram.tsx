export function DocumentParsingDiagram() {
  const LEFT_COLOR = "#0EA5E9";
  const RIGHT_COLOR = "#7C3AED";

  const leftRows = [
    { label: "Input", val: "Clean digital PDF" },
    { label: "Method", val: "Direct text extraction" },
    { label: "Token cost", val: "Low" },
    { label: "Layout", val: "May lose structure" },
    { label: "Best for", val: "Embedded-text documents" },
  ];

  const rightRows = [
    { label: "Input", val: "Scanned or layout-rich PDF" },
    { label: "Method", val: "Page-as-image + model" },
    { label: "Token cost", val: "High (pages = images)" },
    { label: "Layout", val: "Preserved" },
    { label: "Best for", val: "Tables, forms, mixed pages" },
  ];

  const BOX_X_L = 20;
  const BOX_X_R = 325;
  const BOX_W = 255;
  const BOX_Y = 38;
  const BOX_H = 168;
  const ROW_START_Y = 82;
  const ROW_GAP = 26;

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 220" width="100%">
        <text
          x="300"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Document Parsing Paths
        </text>

        {/* Left box */}
        <rect
          x={BOX_X_L}
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx="8"
          fill={LEFT_COLOR}
          fillOpacity="0.1"
          stroke={LEFT_COLOR}
          strokeWidth="1.5"
        />
        <text
          x={BOX_X_L + BOX_W / 2}
          y={BOX_Y + 20}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={LEFT_COLOR}
        >
          Text Extraction
        </text>
        {leftRows.map((row, i) => (
          <g key={i}>
            <text
              x={BOX_X_L + 12}
              y={ROW_START_Y + i * ROW_GAP}
              fontSize="10"
              fontWeight="600"
              fill="hsl(var(--muted-foreground))"
            >
              {row.label}
            </text>
            <text
              x={BOX_X_L + 72}
              y={ROW_START_Y + i * ROW_GAP}
              fontSize="10"
              fill="hsl(var(--foreground))"
            >
              {row.val}
            </text>
          </g>
        ))}

        {/* "vs" pill */}
        <circle
          cx="300"
          cy={BOX_Y + BOX_H / 2}
          r="18"
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        <text
          x="300"
          y={BOX_Y + BOX_H / 2 + 4}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="hsl(var(--muted-foreground))"
        >
          vs
        </text>

        {/* Right box */}
        <rect
          x={BOX_X_R}
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx="8"
          fill={RIGHT_COLOR}
          fillOpacity="0.1"
          stroke={RIGHT_COLOR}
          strokeWidth="1.5"
        />
        <text
          x={BOX_X_R + BOX_W / 2}
          y={BOX_Y + 20}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={RIGHT_COLOR}
        >
          Visual Parsing
        </text>
        {rightRows.map((row, i) => (
          <g key={i}>
            <text
              x={BOX_X_R + 12}
              y={ROW_START_Y + i * ROW_GAP}
              fontSize="10"
              fontWeight="600"
              fill="hsl(var(--muted-foreground))"
            >
              {row.label}
            </text>
            <text
              x={BOX_X_R + 72}
              y={ROW_START_Y + i * ROW_GAP}
              fontSize="10"
              fill="hsl(var(--foreground))"
            >
              {row.val}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Use text extraction for clean digital PDFs; visual parsing when layout or scanned pages
        carry meaning
      </figcaption>
    </figure>
  );
}
