export const metadata = {
  title: "Privacy Policy - CalcZipp",
  description: "CalcZipp privacy policy. We respect your privacy and don't track you.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg text-muted-foreground">
            <p className="text-sm text-muted-foreground mb-8">Last updated: February 2026</p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Our Commitment</h2>
            <p>
              CalcZipp is committed to protecting your privacy. We designed our service with privacy in mind.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">What We Don't Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We don't require account creation</li>
              <li>We don't store your calculations</li>
              <li>We don't use cookies for tracking</li>
              <li>We don't sell any data</li>
              <li>We don't use third-party analytics that track individuals</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">How Calculations Work</h2>
            <p>
              All calculations are performed locally in your browser. Your inputs are never sent to our servers.
              When you close the page, your data is gone.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Hosting & Technical Data</h2>
            <p>
              Our hosting provider may collect standard server logs (IP addresses, browser type, etc.) 
              for security and operational purposes. This data is not used for tracking or marketing.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">External Links</h2>
            <p>
              CalcZipp contains links to other ZIPP family products and external websites. 
              We are not responsible for the privacy practices of other sites.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Changes</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Contact</h2>
            <p>
              Questions about privacy? Email us at{" "}
              <a href="mailto:hello@bluprynt.com" className="text-primary hover:underline">
                hello@bluprynt.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
