export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Terms of Service</h1>
      
      <p className="text-sm text-foreground/70 mb-8">Last updated: January 8, 2026</p>
      
      <div className="space-y-8">
        <section>
          <p className="mb-6">
            By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Use of the Website</h2>
          <p>
            This website is provided for informational and personal use only. You agree not to misuse the site, interfere with its operation, or attempt unauthorized access to any systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Content</h2>
          <p>
            All content on this site, including text, images, recipes, and media, is provided for general informational purposes. We make no guarantees regarding accuracy, completeness, or suitability for any purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p>
            All content on this website is owned by or licensed to us and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or republish content without prior written permission, except for personal, non-commercial use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Submissions</h2>
          <p>
            If you submit comments, messages, or other content, you grant us a non-exclusive right to use, display, and distribute that content in connection with the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
          <p>
            This site may contain links to third-party websites. We are not responsible for the content, policies, or practices of those websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p>
            This website is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including warranties of fitness for a particular purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any damages arising from your use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p>
            These Terms are governed by applicable laws based on your location, including U.S., EU, and Australian consumer protection laws where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the website constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            Questions regarding these Terms may be sent to:{" "}
            <a href="mailto:admin@helloamandalynn.com" className="text-primary hover:underline">
              admin@helloamandalynn.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
