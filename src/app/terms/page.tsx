export const metadata = {
  title: "Terms of Service - CalcZipp",
  description: "CalcZipp terms of service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg text-muted-foreground">
            <p className="text-sm text-muted-foreground mb-8">Last updated: February 2026</p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Acceptance</h2>
            <p>
              By using CalcZipp, you agree to these terms. If you don't agree, please don't use our service.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Service Description</h2>
            <p>
              CalcZipp provides free online calculators for various purposes including financial, 
              mathematical, health, and conversion calculations.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">No Warranty</h2>
            <p>
              CalcZipp is provided "as is" without warranty of any kind. While we strive for accuracy, 
              we cannot guarantee that calculations are error-free. Always verify important calculations 
              with a professional.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Not Professional Advice</h2>
            <p>
              Our calculators are for informational purposes only and do not constitute financial, 
              medical, legal, or professional advice. Consult qualified professionals for important decisions.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Limitation of Liability</h2>
            <p>
              CalcZipp and BLUPRYNT shall not be liable for any damages arising from the use of our service.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Changes</h2>
            <p>
              We may modify these terms at any time. Continued use after changes constitutes acceptance.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Contact</h2>
            <p>
              Questions? Email us at{" "}
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
