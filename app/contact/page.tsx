'use client';

import { useState, useEffect, useRef } from "react";
import { SendHorizontal, Mail } from "lucide-react";
import { toast } from "sonner";
import { Section, PageHeader, Button } from '@/components/ui';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Brand Collaboration",
    message: "",
  });

  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const turnstileWidgetId = useRef<string>("");
  const turnstileLoaded = useRef(false);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    if (existingScript) {
      if (window.turnstile && document.getElementById("cf-turnstile") && !turnstileWidgetId.current) {
        turnstileWidgetId.current = window.turnstile.render("#cf-turnstile", {
          sitekey: "1x00000000000000000000AA",
          callback: (token: string) => setTurnstileToken(token),
          "error-callback": () => {
            toast.error("Verification failed. Please try again.");
            setTurnstileToken("");
          },
          theme: "light",
          size: "compact",
        });
      }
      return;
    }

    if (turnstileLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      turnstileLoaded.current = true;
      if (window.turnstile && document.getElementById("cf-turnstile")) {
        turnstileWidgetId.current = window.turnstile.render("#cf-turnstile", {
          sitekey: "1x00000000000000000000AA",
          callback: (token: string) => setTurnstileToken(token),
          "error-callback": () => {
            toast.error("Verification failed. Please try again.");
            setTurnstileToken("");
          },
          theme: "light",
          size: "compact",
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.remove?.(turnstileWidgetId.current);
        turnstileWidgetId.current = "";
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      toast.error("Please complete the security verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "Brand Collaboration", message: "" });

      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
      setTurnstileToken("");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <Section spacing="md" className="mb-12 sm:mb-16">
        <PageHeader
          title="Let's Connect"
          description="I'd love to connect with you! Let's collaborate."
          centered
        />
      </Section>

      <section className="max-w-[670px] mx-auto px-4 mb-24">
        <div className="relative bg-white p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input name="name" value={formData.name} onChange={handleChange} required />
            <input name="email" value={formData.email} onChange={handleChange} required />
            <textarea name="message" value={formData.message} onChange={handleChange} required />

            <div id="cf-turnstile" className="hidden" />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send Message"}
              <SendHorizontal size={18} />
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
