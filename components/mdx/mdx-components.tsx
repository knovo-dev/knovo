import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  TokenizerDiagram,
  TransformerDiagram,
  AttentionDiagram,
  TemperatureDiagram,
  ContextWindowDiagram,
  ContextWindowAnatomyDiagram,
  LostInTheMiddleDiagram,
  AnnIndexingDiagram,
  VectorDbComparisonDiagram,
  ThinkDoInteractDiagram,
  AiConcentrationDiagram,
  ThreeOpportunityTypesDiagram,
  PhysicalSocialGapDiagram,
  StructuredOutputPipelineDiagram,
  StructuredOutputFailuresDiagram,
  EvalLayersDiagram,
  EvalLoopDiagram,
} from "@/components/mdx/diagrams";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function flattenChildren(children: ReactNode) {
  return Array.isArray(children) ? children.join("") : String(children ?? "");
}

export const mdxComponents: MDXComponents = {
  a: (props) => (
    <Link
      {...props}
      href={props.href ?? "#"}
      className="font-medium text-accent underline underline-offset-4"
    />
  ),
  pre: (props) => <pre {...props} />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-2 border-accent pl-4 italic text-muted-foreground"
    />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  ),
  th: (props) => <th {...props} className="border border-border px-3 py-2 text-left" />,
  td: (props) => <td {...props} className="border border-border px-3 py-2 align-top" />,
  h2: ({ children, ...props }) => {
    const text = flattenChildren(children);
    return (
      <h2 id={slugify(text)} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = flattenChildren(children);
    return (
      <h3 id={slugify(text)} {...props}>
        {children}
      </h3>
    );
  },
  Badge,
  TokenizerDiagram,
  TransformerDiagram,
  AttentionDiagram,
  TemperatureDiagram,
  ContextWindowDiagram,
  ContextWindowAnatomyDiagram,
  LostInTheMiddleDiagram,
  AnnIndexingDiagram,
  VectorDbComparisonDiagram,
  ThinkDoInteractDiagram,
  AiConcentrationDiagram,
  ThreeOpportunityTypesDiagram,
  PhysicalSocialGapDiagram,
  StructuredOutputPipelineDiagram,
  StructuredOutputFailuresDiagram,
  EvalLayersDiagram,
  EvalLoopDiagram,
};
