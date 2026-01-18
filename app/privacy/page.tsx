'use client';

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy & Cookie Policy</h1>

      <p className="text-sm text-foreground/70 mb-8">Last updated: January 8, 2026</p>

      <div className="space-y-8">
        <section>
          <p className="mb-6">
            We respect your privacy and are committed to protecting personal information in accordance
            with applicable privacy laws, including the EU General Data Protection Regulation (GDPR),
            U.S. state privacy laws, and the Australian Privacy Act.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-3">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal information you voluntarily provide (such as name or email when contacting us)</li>
            <li>Technical information such as IP address, browser type, device type, and operating system</li>
            <li>Usage data related to how visitors interact with the site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
          <p className="mb-3">We use collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Operate and maintain the website</li>
            <li>Improve content, performance, and user experience</li>
            <li>Respond to inquiries</li>
            <li>Analyze traffic and usage trends</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing (EU/UK Users)</h2>
          <p className="mb-3">Where required, we process personal data based on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your consent</li>
            <li>Legitimate interests (such as analytics, security, and site performance)</li>
            <li>Legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
          <p className="mb-6">
            We use cookies and similar technologies to support core site functionality and to understand
            how visitors use the site.
          </p>

          <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use</h3>

          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-semibold mb-1">Necessary Cookies</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Required for core site functionality</li>
                <li>Cannot be disabled</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Analytics Cookies</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Used to measure site usage and performance</li>
                <li>Enabled only with your consent where required by law</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Functional Cookies</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Remember user preferences where applicable</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Third-Party Cookies</h4>
              <p className="pl-6">
                Some cookies may be set by third-party services we use, such as analytics or hosting
                providers. These providers may process data in accordance with their own privacy
                policies.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Managing Your Preferences</h3>
          <p className="mb-3">You can:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accept or reject cookies through our consent banner</li>
            <li>Change your preferences at any time via the cookie settings link</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
          <p>We do not sell personal information. Data may be shared with trusted service providers solely to operate and maintain the website.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
          <p>
            Your information may be processed outside your country of residence. Where this occurs,
            reasonable safeguards are applied.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p>
            We retain personal information only for as long as necessary to fulfill the purposes
            outlined in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent at any time</li>
            <li>Object to or restrict processing</li>
          </ul>
          <p>EU and UK users may also lodge a complaint with a supervisory authority.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            If you have questions about this Privacy & Cookie Policy or your personal data, contact us
            at:{' '}
            <a href="mailto:admin@helloamandalynn.com" className="text-primary hover:underline">
              admin@helloamandalynn.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
