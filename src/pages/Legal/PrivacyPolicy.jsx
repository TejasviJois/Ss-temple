import './Legal.css'

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="page-banner">
        <h1>Privacy Policy</h1>
        <p>How we collect, use, and protect your information</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="legal-content">
            <p className="legal-update">Last updated: March 1, 2026</p>

            <h2>1. Information We Collect</h2>
            <p>We collect the following types of information when you use our services:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, phone number, email address, gotra, nakshatra, and family member details when booking pujas.</li>
              <li><strong>Payment Information:</strong> PAN card details (for 80G receipts), transaction records for donations and purchases.</li>
              <li><strong>Usage Data:</strong> Browser type, pages visited, and time spent on our website for improving user experience.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To process puja bookings, event registrations, and donation receipts.</li>
              <li>To communicate regarding your bookings, orders, and temple events.</li>
              <li>To send newsletters and updates (only with your consent).</li>
              <li>To issue 80G/12A tax exemption certificates.</li>
              <li>To improve our website and services.</li>
            </ul>

            <h2>3. Data Protection</h2>
            <p>
              We implement industry-standard security measures to protect your personal data
              against unauthorized access, alteration, disclosure, or destruction. All payment
              transactions are processed through secure, encrypted channels.
            </p>

            <h2>4. Data Sharing</h2>
            <p>
              We do not sell, trade, or transfer your personal information to third parties.
              Your data may be shared only with:
            </p>
            <ul>
              <li>Temple priests for performing pujas with correct sankalpa details.</li>
              <li>Payment processors for completing financial transactions securely.</li>
              <li>Government authorities when required by law.</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience. You can choose to
              disable cookies through your browser settings, though some features may not function
              properly without them.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review the personal data we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your data (subject to legal obligations).</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>

            <h2>7. Contact</h2>
            <p>
              For privacy-related inquiries, please contact our Data Protection Officer at{' '}
              <strong>privacy@samrajyalakshmitemple.org</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
