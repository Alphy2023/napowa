import { MpesaIntegration } from "./mpesa-integration"

export default function DonatePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Donate</h1>
      <p className="mb-4">Your generous donation helps us continue our mission. Thank you for your support!</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Donation Options</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <MpesaIntegration />
          {/* Other donation options */}
          <div>
            <h3>Other Payment Methods (Coming Soon)</h3>
            <p>We are working on adding more payment options. Please check back later.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why Donate?</h2>
        <p className="mb-4">
          Your donation directly impacts our ability to provide essential services and support to those in need.
        </p>
        <ul>
          <li>Helps us reach more people</li>
          <li>Supports our ongoing programs</li>
          <li>Ensures the sustainability of our organization</li>
        </ul>
      </section>
    </div>
  )
}
