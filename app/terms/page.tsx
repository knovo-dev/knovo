import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Use",
  description:
    "Read the Terms of Use for Knovo, including content usage rights, newsletter terms, disclaimers, and contact information.",
  path: "/terms",
});

const sections = [
  {
    title: "Use of content",
    content:
      "All articles on Knovo are free to read. Article content is proprietary copyright (c) 2026 Knovo (knovo.dev). You may not reproduce or republish without written permission from hello@knovo.dev. Code snippets are MIT licensed.",
  },
  {
    title: "Newsletter",
    content:
      "By subscribing you agree to receive the weekly Knovo newsletter. Unsubscribe anytime via the link in any email.",
  },
  {
    title: "No warranties",
    content:
      "Knovo content is provided for informational purposes. We make no guarantees about accuracy or completeness. Always verify AI model information independently as it changes frequently.",
  },
  {
    title: "Limitation of liability",
    content:
      "Knovo is not liable for any damages arising from use of this site or reliance on its content.",
  },
  {
    title: "Changes to these terms",
    content:
      "We may update these terms at any time. Continued use of the site means you accept the updated terms.",
  },
  {
    title: "Contact",
    content: "For questions about these terms, contact us at hello@knovo.dev.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-accent">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Terms of Use</h1>
      <p className="mt-5 text-sm text-muted-foreground">Last updated: March 29, 2026</p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
