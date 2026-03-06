import './Legal.css'

export default function RefundPolicy() {
  return (
    <div>
      <div className="page-banner">
        <h1>Refund & Cancellation Policy</h1>
        <p>Our policy on refunds, cancellations, and rescheduling</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="legal-content">
            <p className="legal-update">Last updated: March 1, 2026</p>

            <h2>1. Puja Bookings</h2>
            <ul>
              <li><strong>Cancellation before 48 hours:</strong> Full refund minus ₹100 processing fee.</li>
              <li><strong>Cancellation within 24–48 hours:</strong> 50% refund of the puja amount.</li>
              <li><strong>Cancellation within 24 hours:</strong> No refund. The puja will be performed in your name and prasadam will be sent.</li>
              <li><strong>Rescheduling:</strong> Free rescheduling allowed up to 24 hours before the scheduled time, subject to availability.</li>
            </ul>

            <h2>2. Donations (E-Hundi & Others)</h2>
            <p>
              All donations are voluntary offerings and are generally non-refundable. In case of
              accidental or duplicate transactions, please contact us within 7 days with transaction
              proof for a review.
            </p>

            <h2>3. Prasadam & Store Orders</h2>
            <ul>
              <li>Orders can be cancelled before dispatch for a full refund.</li>
              <li>Once dispatched, cancellation is not possible. If the item is damaged during delivery, a replacement or refund will be provided with photographic proof.</li>
              <li>Perishable prasadam items are non-refundable once delivered.</li>
            </ul>

            <h2>4. Event Registrations</h2>
            <ul>
              <li><strong>Free events:</strong> Cancellation anytime with no charges.</li>
              <li><strong>Paid events:</strong> Full refund if cancelled 72 hours before the event. 50% refund within 24–72 hours. No refund within 24 hours.</li>
            </ul>

            <h2>5. Refund Process</h2>
            <p>
              Approved refunds will be processed within 7–10 business days to the original payment
              method. For bank transfers, please allow additional time for your bank to process the credit.
            </p>

            <h2>6. How to Request a Refund</h2>
            <p>
              Contact our support team at <strong>support@samrajyalakshmitemple.org</strong> or
              call <strong>+91 98765 43210</strong> with your booking/order reference number.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
