const LABELS = ["yes", "no", "maybe", "depends"];
const BASE = [0.62, 0.20, 0.10, 0.08];
const TEMPS = [0.2, 0.7, 1.4];
const COLORS = ["#4F46E5", "#7C3AED", "#0EA5E9", "#10B981"];

function applyTemp(probs: number[], t: number): number[] {
  const logits = probs.map((p) => Math.log(p + 1e-12) / t);
  const max = Math.max(...logits);
  const exp = logits.map((l) => Math.exp(l - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map((e) => e / sum);
}

const CHART_W = 160;
const CHART_H = 100;
const BAR_W = 24;
const BAR_GAP = 8;
const CHART_GAP = 40;
const TOTAL_CHARTS = TEMPS.length * CHART_W + (TEMPS.length - 1) * CHART_GAP;
const START_X = (580 - TOTAL_CHARTS) / 2;

export function TemperatureDiagram() {
  const muted = "hsl(var(--muted-foreground))";
  const border = "hsl(var(--border))";
  const fg = "hsl(var(--foreground))";

  return (
    <figure className="not-prose my-8" aria-label="Temperature effect on token probability diagram">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <svg viewBox="0 0 580 220" width="100%" xmlns="http://www.w3.org/2000/svg">

          <text x={290} y={22} textAnchor="middle" fontSize={12} fontWeight={600}
            style={{ fill: fg }}>
            Same distribution — different temperature
          </text>

          {TEMPS.map((temp, ci) => {
            const probs = applyTemp(BASE, temp);
            const cx = START_X + ci * (CHART_W + CHART_GAP);
            const baseline = 36 + CHART_H;

            return (
              <g key={temp}>
                {/* Temp label */}
                <text x={cx + CHART_W / 2} y={48} textAnchor="middle" fontSize={13}
                  fontWeight={700} style={{ fill: fg }}>
                  T = {temp}
                </text>

                {/* Bars */}
                {probs.map((p, bi) => {
                  const barH = Math.round(p * CHART_H);
                  const bx = cx + bi * (BAR_W + BAR_GAP) + 4;
                  const by = baseline - barH;
                  return (
                    <g key={bi}>
                      <rect x={bx} y={by} width={BAR_W} height={barH} rx={3}
                        fill={COLORS[bi]} fillOpacity={0.85} />
                      <text x={bx + BAR_W / 2} y={by - 3} textAnchor="middle" fontSize={9}
                        style={{ fill: muted }}>
                        {Math.round(p * 100)}%
                      </text>
                      <text x={bx + BAR_W / 2} y={baseline + 13} textAnchor="middle" fontSize={9}
                        style={{ fill: muted, fontFamily: "monospace" }}>
                        {LABELS[bi]}
                      </text>
                    </g>
                  );
                })}

                {/* Baseline */}
                <line x1={cx} y1={baseline} x2={cx + CHART_W - 10} y2={baseline}
                  style={{ stroke: border }} strokeWidth={1} />
              </g>
            );
          })}

          <text x={290} y={205} textAnchor="middle" fontSize={11}
            style={{ fill: muted }}>
            Low temp = dominant token wins · High temp = flatter, more varied sampling
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Temperature reshapes the probability distribution — it does not change the model&apos;s underlying knowledge.
      </figcaption>
    </figure>
  );
}
