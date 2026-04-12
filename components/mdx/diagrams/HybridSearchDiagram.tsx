export function HybridSearchDiagram() {
  const BOX_H = 36;
  const BW_WIDE = 130;
  const BW_MED = 120;
  const QUERY_CX = 300;
  const LEFT_CX = 165;
  const RIGHT_CX = 435;
  const LEFT_COLOR = "#0EA5E9";
  const RIGHT_COLOR = "#7C3AED";
  const FUSION_COLOR = "#F59E0B";
  const RERANK_COLOR = "#10B981";

  return (
    <figure className="not-prose my-8">
      <svg viewBox="0 0 600 240" width="100%">
        <defs>
          <marker id="hs-arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="hsl(var(--muted-foreground))" />
          </marker>
          <marker id="hs-fus" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={FUSION_COLOR} />
          </marker>
          <marker id="hs-rer" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={RERANK_COLOR} />
          </marker>
        </defs>

        <text
          x="300"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="hsl(var(--foreground))"
        >
          Hybrid Retrieval Pipeline
        </text>

        {/* Query box */}
        <rect
          x={QUERY_CX - BW_MED / 2}
          y="32"
          width={BW_MED}
          height={BOX_H}
          rx="6"
          fill="#4F46E5"
          fillOpacity="0.12"
          stroke="#4F46E5"
          strokeWidth="1.5"
        />
        <text
          x={QUERY_CX}
          y="54"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#4F46E5"
        >
          Query
        </text>

        {/* Branch arrows from Query to BM25 and Vector */}
        <path
          d={`M ${QUERY_CX} 68 L ${QUERY_CX} 80 L ${LEFT_CX} 80 L ${LEFT_CX} 92`}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#hs-arr)"
        />
        <path
          d={`M ${QUERY_CX} 68 L ${QUERY_CX} 80 L ${RIGHT_CX} 80 L ${RIGHT_CX} 92`}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#hs-arr)"
        />

        {/* BM25 box */}
        <rect
          x={LEFT_CX - BW_WIDE / 2}
          y="92"
          width={BW_WIDE}
          height={BOX_H}
          rx="6"
          fill={LEFT_COLOR}
          fillOpacity="0.12"
          stroke={LEFT_COLOR}
          strokeWidth="1.5"
        />
        <text
          x={LEFT_CX}
          y="108"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill={LEFT_COLOR}
        >
          BM25 Retrieval
        </text>
        <text
          x={LEFT_CX}
          y="121"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          exact term candidates
        </text>

        {/* Vector box */}
        <rect
          x={RIGHT_CX - BW_WIDE / 2}
          y="92"
          width={BW_WIDE}
          height={BOX_H}
          rx="6"
          fill={RIGHT_COLOR}
          fillOpacity="0.12"
          stroke={RIGHT_COLOR}
          strokeWidth="1.5"
        />
        <text
          x={RIGHT_CX}
          y="108"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill={RIGHT_COLOR}
        >
          Vector Retrieval
        </text>
        <text
          x={RIGHT_CX}
          y="121"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          semantic candidates
        </text>

        {/* Converge arrows to Fusion */}
        <path
          d={`M ${LEFT_CX} 128 L ${LEFT_CX} 148 L ${QUERY_CX} 148 L ${QUERY_CX} 158`}
          stroke={FUSION_COLOR}
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#hs-fus)"
        />
        <path
          d={`M ${RIGHT_CX} 128 L ${RIGHT_CX} 148 L ${QUERY_CX} 148 L ${QUERY_CX} 158`}
          stroke={FUSION_COLOR}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Fusion box */}
        <rect
          x={QUERY_CX - BW_MED / 2}
          y="158"
          width={BW_MED}
          height={BOX_H}
          rx="6"
          fill={FUSION_COLOR}
          fillOpacity="0.12"
          stroke={FUSION_COLOR}
          strokeWidth="1.5"
        />
        <text
          x={QUERY_CX}
          y="174"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill={FUSION_COLOR}
        >
          Fusion
        </text>
        <text
          x={QUERY_CX}
          y="187"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          RRF or weighted merge
        </text>

        {/* Fusion → Reranker */}
        <line
          x1={QUERY_CX}
          y1="194"
          x2={QUERY_CX}
          y2="202"
          stroke={RERANK_COLOR}
          strokeWidth="1.5"
          markerEnd="url(#hs-rer)"
        />

        {/* Reranker box */}
        <rect
          x={QUERY_CX - BW_MED / 2}
          y="202"
          width={BW_MED}
          height={BOX_H}
          rx="6"
          fill={RERANK_COLOR}
          fillOpacity="0.12"
          stroke={RERANK_COLOR}
          strokeWidth="1.5"
        />
        <text
          x={QUERY_CX}
          y="218"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill={RERANK_COLOR}
        >
          Reranker
        </text>
        <text
          x={QUERY_CX}
          y="231"
          textAnchor="middle"
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
        >
          final relevance ranking
        </text>
      </svg>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Hybrid retrieval runs both BM25 and vector search in parallel, fuses results, then
        reranks for final relevance
      </figcaption>
    </figure>
  );
}
