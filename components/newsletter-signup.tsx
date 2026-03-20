"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !emailPattern.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!response.ok) {
        throw new Error("Newsletter subscription failed");
      }

      setEmail("");
      setSuccess("You're on the list! Check your inbox for a confirmation.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          aria-invalid={error ? "true" : "false"}
          className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" className="h-11" disabled={isSubmitting}>
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      <p className="mt-2 text-xs text-muted-foreground">
        By subscribing, you agree to our{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
          Privacy Policy
        </Link>
        . Unsubscribe anytime.
      </p>

      {error ? (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400" role="status">
          {success}
        </p>
      ) : null}
    </div>
  );
}
