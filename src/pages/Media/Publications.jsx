import './Media.css'

const publications = [
  {
    title: 'The Divine Secret of Samrajya Lakshmi',
    author: 'Dr. Krupanidhi Guruji',
    type: 'Book',
    desc: 'A comprehensive guide to understanding the supreme form of Lakshmi, her history, mantras, and worship methods.',
    lang: 'English / Kannada',
  },
  {
    title: 'Sri Lalitha Sahasranama — Commentary & Meaning',
    author: 'Dr. Krupanidhi Guruji',
    type: 'Book',
    desc: 'Detailed verse-by-verse commentary on the thousand names of Goddess Lalitha with practical worship guidance.',
    lang: 'Sanskrit / English',
  },
  {
    title: 'Monthly Spiritual Newsletter — Lakshmi Jyothi',
    author: 'Temple Editorial Team',
    type: 'Newsletter',
    desc: 'Monthly publication covering temple updates, spiritual teachings, festival guides, and devotee stories.',
    lang: 'English / Kannada',
  },
  {
    title: 'Path of Sovereignty — Teachings of Guruji',
    author: 'Compiled by Devotees',
    type: 'Book',
    desc: 'Collection of Guruji\'s discourses on leadership, dharma, and the role of Samrajya Lakshmi in modern life.',
    lang: 'English',
  },
  {
    title: 'Ashta Lakshmi Stotram — Illustrated Edition',
    author: 'Temple Publications',
    type: 'Prayer Book',
    desc: 'Beautifully illustrated prayer book with the Ashta Lakshmi hymns, meanings, and daily worship schedule.',
    lang: 'Sanskrit / English / Kannada',
  },
  {
    title: 'Temple Construction — A Visual Chronicle',
    author: 'Documentation Team',
    type: 'Photo Book',
    desc: 'Visual documentation of the temple construction journey from foundation to its current glorious stage.',
    lang: 'English',
  },
]

export default function Publications() {
  return (
    <div>
      <div className="page-banner">
        <h1>Publications & Teachings</h1>
        <p>Sacred knowledge and spiritual literature</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="publications-grid">
            {publications.map((p) => (
              <div key={p.title} className="publication-card card">
                <div className="publication-card__type">{p.type}</div>
                <h3>{p.title}</h3>
                <span className="publication-card__author">by {p.author}</span>
                <p>{p.desc}</p>
                <div className="publication-card__footer">
                  <span className="publication-card__lang">{p.lang}</span>
                  <button className="btn btn-maroon">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
