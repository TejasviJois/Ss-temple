import './Legal.css'

export default function TaxInfo() {
  return (
    <div>
      <div className="page-banner">
        <h1>80G / 12A Information</h1>
        <p>Tax exemption details for your donations</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="legal-content">
            <h2>Tax Exemption for Donors</h2>
            <p>
              The Swarga Nidhi Seva Ashram Trust, which administers the Shree Samrajya Lakshmi Temple,
              is a registered charitable trust under the Indian Income Tax Act. All eligible donations
              qualify for tax deductions.
            </p>

            <div className="legal-highlight">
              <h3>Trust Registration Details</h3>
              <p><strong>Trust Name:</strong> Swarga Nidhi Seva Ashram Trust</p>
              <p><strong>12A Registration No:</strong> AAATS1234A / 12A / 2020-21</p>
              <p><strong>80G Registration No:</strong> AAATS1234A / 80G / 2020-21</p>
              <p><strong>PAN:</strong> AAATS1234A</p>
              <p><strong>Registered Address:</strong> Madhugiri, Tumkur District, Karnataka 572101</p>
            </div>

            <h2>Section 80G — Tax Deduction for Donors</h2>
            <p>
              Under Section 80G of the Income Tax Act, 1961, individuals and corporate entities who
              make donations to the trust are eligible for a tax deduction of 50% of the donated amount
              from their taxable income.
            </p>
            <ul>
              <li>Applicable to both Indian residents and NRIs filing Indian tax returns.</li>
              <li>Deduction available under both old and new tax regimes (subject to provisions).</li>
              <li>Donation receipts with 80G certificate will be issued for all eligible contributions.</li>
              <li>PAN card of the donor is mandatory for claiming the deduction.</li>
            </ul>

            <h2>Section 12A — Trust Registration</h2>
            <p>
              Section 12A registration confirms that the trust is a genuine charitable institution.
              This registration ensures that the income of the trust is exempt from tax, allowing
              maximum funds to be utilized for charitable purposes including temple operations,
              hospital construction, and community welfare.
            </p>

            <h2>How to Claim Tax Benefit</h2>
            <ol>
              <li>Make a donation through E-Hundi, bank transfer, or at the temple office.</li>
              <li>Provide your PAN card number during the donation process.</li>
              <li>Receive an 80G donation receipt via email or post.</li>
              <li>Include the donation details and receipt in your income tax filing.</li>
              <li>Claim the deduction under Section 80G of your ITR.</li>
            </ol>

            <div className="legal-highlight">
              <h3>Bank Details for Direct Transfer</h3>
              <p><strong>Account Name:</strong> Swarga Nidhi Seva Ashram Trust</p>
              <p><strong>Bank:</strong> State Bank of India</p>
              <p><strong>Branch:</strong> Madhugiri Branch</p>
              <p><strong>Account No:</strong> XXXX XXXX XXXX (Contact temple office)</p>
              <p><strong>IFSC Code:</strong> SBIN0XXXXXX</p>
            </div>

            <h2>Contact for Tax Queries</h2>
            <p>
              For any questions related to 80G certificates or tax deduction, please contact:{' '}
              <strong>accounts@samrajyalakshmitemple.org</strong> or call <strong>+91 98765 43210</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
