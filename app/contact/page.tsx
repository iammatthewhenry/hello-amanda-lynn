import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";

export const dynamic = 'force-static';

export default function ContactPage() {
  return (
    <main>
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-12 sm:mb-16">
        <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.5] mb-4">
          Let's Connect
        </h1>
        <p className="text-base font-normal text-[#2C2C2C]/70 leading-relaxed max-w-2xl mx-auto">
          I'd love to connect with you! Let's collaborate.
        </p>
      </section>

      {/* Vintage Photo Contact Form */}
      <section className="max-w-[616px] sm:max-w-[670px] mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-24">
        <ContactForm />
      </section>
    </main>
  );
}
