import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import './Legal.css'

const faqs = [
  {
    q: 'What are the temple visiting hours?',
    a: 'The temple is open from 6:00 AM to 12:00 PM in the morning and 4:00 PM to 8:30 PM in the evening. Special timings apply during festivals and events.',
  },
  {
    q: 'How do I book a puja online?',
    a: 'Visit the "Book Puja / Seva" page from the Pujas & Seva menu. Select your preferred puja, enter your personal and sankalpa details, choose a date and time slot, and submit the booking. Our team will confirm the booking and share payment details.',
  },
  {
    q: 'Can I attend pujas virtually / online?',
    a: 'Yes, we are working on live streaming selected pujas. Currently, you can book pujas and receive prasadam by post. Watch the "Temple Construction Live" page for our live stream capabilities.',
  },
  {
    q: 'Is my donation eligible for tax deduction?',
    a: 'Yes. Our trust has valid 80G and 12A registrations. All eligible donations qualify for 50% tax deduction under Section 80G of the Income Tax Act. Please provide your PAN card number during donation for the receipt.',
  },
  {
    q: 'How will I receive the prasadam after booking a puja?',
    a: 'Blessed prasadam is carefully packed and shipped via courier to your address within 3–5 business days after the puja is performed. You will receive a tracking number via SMS/email.',
  },
  {
    q: 'Can I cancel or reschedule a booked puja?',
    a: 'Yes. Free rescheduling is available up to 24 hours before the scheduled time. For cancellations, please refer to our Refund & Cancellation Policy for detailed terms.',
  },
  {
    q: 'Who is Shree Samrajya Lakshmi?',
    a: 'Shree Samrajya Lakshmi is the highest and most powerful form of Goddess Lakshmi — the bestower of sovereignty, empire, and absolute dominion. Visit our "Who is Shree Samrajya Lakshmi" page for a detailed explanation.',
  },
  {
    q: 'How can I volunteer at the temple?',
    a: 'Visit the "Volunteer / Seva Signup" page and fill out the application form. Our seva coordinator will contact you to discuss available opportunities that match your skills and availability.',
  },
  {
    q: 'Do you ship prasadam and store items internationally?',
    a: 'Currently, we ship within India. For international orders, please contact us directly at info@samrajyalakshmitemple.org and we will arrange shipping on a case-by-case basis.',
  },
  {
    q: 'How can I contribute to the temple construction?',
    a: 'You can donate towards temple construction through our E-Hundi page by selecting "Temple Construction" as the cause. Every contribution, big or small, helps build this divine abode.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div>
      <div className="page-banner">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about the temple and our services</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}>
                <button
                  className="faq-item__question"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <FiChevronDown className="faq-item__chevron" />
                </button>
                {openIndex === i && (
                  <div className="faq-item__answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
