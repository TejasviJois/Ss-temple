import './About.css'

export default function WhoIsSamrajyaLakshmi() {
  return (
    <div className="about-page">
      <div className="page-banner">
        <h1>Who is Shree Samrajya Lakshmi</h1>
        <p>The Supreme Form of Goddess Lakshmi</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>The Divine Mother of Sovereignty</h2>
              <div className="divider" style={{ margin: '16px 0 24px' }} />
              <p>
                Shree Samrajya Lakshmi is the highest and most powerful form of Goddess Lakshmi,
                the divine consort of Lord Vishnu. While Goddess Lakshmi is widely worshipped in
                her eight primary forms (Ashta Lakshmi), Samrajya Lakshmi represents the supreme
                manifestation — the bestower of sovereignty, empire, and absolute dominion.
              </p>
              <p>
                The word "Samrajya" translates to "Empire" or "Sovereign Rule." Thus,
                Samrajya Lakshmi is the goddess who grants not merely wealth or prosperity,
                but the power to lead, govern, and create lasting legacies. She embodies the
                divine feminine energy that transforms ordinary individuals into visionary leaders.
              </p>
              <p>
                Throughout history, the greatest kings and rulers of Bharat have been secretly
                worshipping Samrajya Lakshmi for their individual success and the welfare of
                the people they led. Legendary rulers such as Lord Rama, Janaka Maharaja (father
                of Sita Devi), Sri Krishnadevaraya of the Vijayanagara Empire, Raja Raja Chozha
                of the Chola Dynasty, and Sri Chatrapati Shivaji Maharaja of the Maratha Empire
                — all were devoted worshippers of this mysterious yet immensely powerful deity.
              </p>
            </div>

            <div className="about-highlight-box">
              <h3>Blessings of Samrajya Lakshmi</h3>
              <ul>
                <li><strong>Sovereign Authority</strong> — Divine power to lead with wisdom and justice</li>
                <li><strong>Immense Prosperity</strong> — Abundance that flows to you and your people</li>
                <li><strong>Victory & Success</strong> — Triumph in all endeavors and life's battles</li>
                <li><strong>Divine Protection</strong> — A shield of grace over family and community</li>
                <li><strong>Spiritual Elevation</strong> — Inner transformation and higher consciousness</li>
                <li><strong>Legacy Building</strong> — The power to create institutions that outlast generations</li>
              </ul>
            </div>

            <div className="about-text">
              <h2>The Eight Forms of Lakshmi</h2>
              <div className="divider" style={{ margin: '16px 0 24px' }} />
              <p>
                While Ashta Lakshmi (the eight forms) includes Adi Lakshmi, Dhanya Lakshmi,
                Dhairya Lakshmi, Gaja Lakshmi, Santana Lakshmi, Vijaya Lakshmi, Vidya Lakshmi,
                and Dhana Lakshmi — Samrajya Lakshmi transcends all of these as the supreme
                unified form. Worshipping Samrajya Lakshmi is considered equivalent to receiving
                the combined blessings of all eight forms simultaneously.
              </p>
            </div>

            <div className="about-cards-grid">
              {[
                { name: 'Adi Lakshmi', desc: 'The primeval mother, the original source of all creation and existence.' },
                { name: 'Dhairya Lakshmi', desc: 'The bestower of courage, patience, and inner fortitude.' },
                { name: 'Gaja Lakshmi', desc: 'The grantor of royalty, power, and animal wealth.' },
                { name: 'Dhana Lakshmi', desc: 'The goddess of material and monetary wealth.' },
                { name: 'Santana Lakshmi', desc: 'The protector of progeny and family lineage.' },
                { name: 'Vijaya Lakshmi', desc: 'The goddess of victory in all endeavors.' },
                { name: 'Vidya Lakshmi', desc: 'The bestower of knowledge, arts, and sciences.' },
                { name: 'Dhanya Lakshmi', desc: 'The goddess of agricultural and food abundance.' },
              ].map((f) => (
                <div key={f.name} className="about-mini-card card">
                  <span className="about-mini-card__icon">ॐ</span>
                  <h4>{f.name}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
