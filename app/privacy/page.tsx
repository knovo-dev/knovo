import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How Knovo collects and uses newsletter data, and how to contact us about privacy.",
  path: "/privacy",
});

const sections = [
  {
    title: "What data we collect",
    content:
      "We only collect email addresses submitted through the Knovo newsletter signup form.",
  },
  {
    title: "How we use it",
    content:
      "We use your email address to send the weekly AI insights newsletter and important newsletter-related updates.",
  },
  {
    title: "How to unsubscribe",
    content: "You can unsubscribe anytime by clicking the unsubscribe link in any newsletter email.",
  },
  {
    title: "No data sold to third parties — ever",
    content:
      "We do not sell, rent, or trade your personal data to third parties under any circumstance.",
  },
  {
    title: "Contact",
    content: "For privacy questions, contact us at hello@knovo.dev.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-accent">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-5 text-sm text-muted-foreground">
        Last updated: March 21, 2026
      </p>

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
