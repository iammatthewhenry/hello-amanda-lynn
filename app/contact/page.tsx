import { useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "../Breadcrumbs";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner@2.0.3";

// Cloudflare Turnstile types
declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        "error-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
        size?: "normal" | "compact" | "invisible";
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function page() {
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

  // Load Cloudflare Turnstile script
  useEffect(() => {
    // Check if script already exists in document
    const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
    
    if (existingScript) {
      // Script already loaded, just initialize widget
      if (window.turnstile && document.getElementById("cf-turnstile") && !turnstileWidgetId.current) {
        turnstileWidgetId.current = window.turnstile.render("#cf-turnstile", {
          sitekey: "1x00000000000000000000AA", // Demo token - always passes
          callback: (token: string) => {
            setTurnstileToken(token);
          },
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
          callback: (token: string) => {
            setTurnstileToken(token);
          },
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
        window.turnstile.remove(turnstileWidgetId.current);
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
    } catch (error) {
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
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-12 sm:mb-16">
        <div className="text-center space-y-4">
          <h1 className="mb-4">Let's Connect</h1>
          <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            I'd love to connect with you! Let's collaborate.
          </p>
        </div>
      </section>

      {/* Vintage Photo Contact Form */}
      <section className="max-w-[616px] sm:max-w-[670px] mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-24">
        {/* Polaroid-style Photo Container */}
        <div className="relative inline-block w-full">
          {/* The "Photo" - White Polaroid Border - FIXED: rotate to the RIGHT */}
          <div
            className="relative bg-white p-4 sm:p-6 shadow-2xl transform rotate-[2deg]"
            style={{
              boxShadow: "0 10px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {/* Thicker bottom border like a real Polaroid */}
            <div className="pb-8 sm:pb-12">
              {/* The "Photo" content - form with vintage filter */}
              <div
                className="relative pt-6 px-6 pb-4 sm:pt-8 sm:px-8 sm:pb-6 lg:pt-10 lg:px-10 lg:pb-8 overflow-hidden"
                style={{
                  background: "linear-gradient(to bottom, #FFFFFF 0%, #FAF8F6 100%)",
                  filter: "contrast(0.95) saturate(0.9) sepia(0.15)",
                }}
              >
                {/* Subtle noise/grain texture overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                ></div>

                {/* Vintage photo vignette effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.15) 100%)",
                  }}
                ></div>

                <form onSubmit={handleSubmit} className="relative space-y-[23px] sm:space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[23px] sm:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm text-foreground/80"
                      >
                        Your Name
                      </label>
                      {/* FIXED: Changed border color from #C9B8AE to #7A9B8E (green) */}
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/80 border-2 border-[#7A9B8E] focus:border-[#6A8B7E] focus:outline-none transition-colors"
                        placeholder="Amanda Lynn"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm text-foreground/80"
                      >
                        Your Email
                      </label>
                      {/* FIXED: Changed border color from #C9B8AE to #7A9B8E (green) */}
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/80 border-2 border-[#7A9B8E] focus:border-[#6A8B7E] focus:outline-none transition-colors"
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm text-foreground/80"
                    >
                      Subject
                    </label>
                    {/* FIXED: Changed border color from #C9B8AE to #7A9B8E (green) */}
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-[11px] sm:py-3 bg-white/80 border-2 border-[#7A9B8E] focus:border-[#6A8B7E] focus:outline-none transition-colors"
                    >
                      <option value="Brand Collaboration">Brand Collaboration</option>
                      <option value="Restaurant Review">Restaurant Review</option>
                      <option value="Media Inquiry">Media Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm text-foreground/80"
                    >
                      Your Message
                    </label>
                    {/* FIXED: Changed border color from #C9B8AE to #7A9B8E (green) */}
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-[11px] sm:py-3 bg-white/80 border-2 border-[#7A9B8E] focus:border-[#6A8B7E] focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project, question, or just say hi..."
                    />
                  </div>

                  {/* Cloudflare Turnstile - Hidden but functional */}
                  <div id="cf-turnstile" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden"></div>

                  {/* Submit Button - FIXED: Changed icon from SendHorizontal to ArrowRight */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-[#7A9B8E] text-white hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Handwritten-style caption at bottom - FIXED: Simplified mail icon */}
            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center">
              <p
                className="text-foreground/60 flex items-center justify-center gap-2"
                style={{
                  fontFamily: "'Segoe Script', 'Bradley Hand', cursive",
                  transform: "rotate(-1deg)",
                  fontSize: "calc(0.875rem + 7px)",
                }}
              >
                <span style={{ fontSize: "calc(0.875rem + 7px)" }}>Drop me a line!</span>
                <Mail size={21} className="text-[#7A9B8E]" strokeWidth={1.5} style={{ transform: "translateY(1px)" }} />
              </p>
            </div>
          </div>

          {/* Vintage photo aging effects - corner creases - FIXED: Moved to left side for right-tilted photo */}
          <div
            className="absolute top-2 left-2 w-8 h-8 bg-white/40 transform -rotate-45"
            style={{
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
              filter: "blur(1px)",
            }}
          ></div>
        </div>
      </section>
    </main>
  );
}
