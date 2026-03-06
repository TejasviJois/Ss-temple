import './About.css'

export default function MahaSamsthanam() {
  return (
    <div className="about-page">
      <div className="page-banner">
        <h1>Shree Samrajyalakshmi Maha Samsthanam</h1>
        <p>The Supreme Spiritual Seat</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>The Sacred Institution</h2>
              <div className="divider" style={{ margin: '16px 0 24px' }} />
              <p>
                Shree Samrajyalakshmi Maha Samsthanam is the supreme spiritual institution
                dedicated to preserving, practicing, and propagating the ancient worship
                traditions of Shree Samrajya Lakshmi. Established under the divine guidance
                of Pujya Shree Krupanidhi Guruji, it serves as the central authority for
                all matters pertaining to Samrajya Lakshmi worship worldwide.
              </p>
              <p>
                The term "Maha Samsthanam" denotes a grand spiritual establishment — a seat
                of supreme authority in matters of dharma, ritual, and spiritual practice.
                It functions as the fountainhead from which authentic knowledge, mantras,
                and worship methodologies of Samrajya Lakshmi flow to devotees across the world.
              </p>
            </div>

            <div className="about-highlight-box" style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFFFFF)' }}>
              <h3>Core Functions of the Maha Samsthanam</h3>
              <ul>
                <li><strong>Spiritual Authority</strong> — Custodian of authentic Samrajya Lakshmi worship traditions</li>
                <li><strong>Mantra Deeksha</strong> — Initiation of seekers into sacred mantras through proper lineage</li>
                <li><strong>Vedic Research</strong> — Deep study and revival of ancient scriptures related to Samrajya Lakshmi</li>
                <li><strong>Temple Administration</strong> — Oversight of all Samrajya Lakshmi temples and centers</li>
                <li><strong>Dharma Propagation</strong> — Spreading awareness about this supreme form of Lakshmi globally</li>
                <li><strong>Charitable Services</strong> — Operating hospitals, schools, and welfare programs for community upliftment</li>
              </ul>
            </div>

            <div className="about-text">
              <h2>The Shree Samrajya Lakshmi Foundation</h2>
              <div className="divider" style={{ margin: '16px 0 24px' }} />
              <p>
                Operating as the social welfare wing of the Maha Samsthanam, the Shree Samrajya
                Lakshmi Foundation extends the divine grace into tangible community service.
                The foundation is currently spearheading the construction of the Shree
                Samrajyalakshmi Multi-Super Specialty Hospital — a 1000-bedded facility in
                Madhugiri, Karnataka, dedicated to providing free healthcare to the people.
              </p>
              <p>
                This ambitious project embodies the core principle of Samrajya Lakshmi worship:
                that true sovereignty is demonstrated through selfless service. The hospital
                represents the Maha Samsthanam's commitment to translating spiritual blessings
                into real-world impact.
              </p>
            </div>

            <div className="about-two-col">
              <div className="about-highlight-box">
                <h3>Spiritual Initiatives</h3>
                <ul>
                  <li>Daily Samrajya Lakshmi Puja and Archana</li>
                  <li>Monthly Lalitha Sahasranama Parayana</li>
                  <li>Annual Maha Yagnam celebrations</li>
                  <li>Spiritual discourses and satsangs</li>
                  <li>Mantra initiation programs</li>
                </ul>
              </div>
              <div className="about-highlight-box">
                <h3>Social Initiatives</h3>
                <ul>
                  <li>Free multi-super specialty hospital project</li>
                  <li>Educational support for underprivileged</li>
                  <li>Free medical and cancer check-up camps</li>
                  <li>Sewing machine donations for women empowerment</li>
                  <li>Environmental conservation programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
