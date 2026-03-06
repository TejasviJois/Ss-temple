import { FiBook, FiMusic, FiStar, FiSun, FiFileText, FiHeart } from 'react-icons/fi'
import './Media.css'

const guides = [
  {
    icon: <FiStar />,
    title: 'How to Worship Samrajya Lakshmi at Home',
    desc: 'Step-by-step guide for daily puja including required items, mantras, and the correct sequence of worship.',
    items: ['Puja Samagri List', 'Sankalpa Procedure', 'Mantra Pronunciation Guide', 'Naivedya Preparation'],
  },
  {
    icon: <FiMusic />,
    title: 'Important Mantras & Stotrams',
    desc: 'Collection of essential mantras for Samrajya Lakshmi worship with correct pronunciation and meaning.',
    items: ['Samrajya Lakshmi Maha Mantra', 'Sri Suktam', 'Lakshmi Ashtottaram', 'Kanakadhara Stotram'],
  },
  {
    icon: <FiSun />,
    title: 'Auspicious Days & Timings',
    desc: 'Guide to the most auspicious days and muhurtas for Lakshmi worship throughout the year.',
    items: ['Friday Puja Timings', 'Pournami Schedule', 'Festival Calendar', 'Nakshatra-based Worship'],
  },
  {
    icon: <FiBook />,
    title: 'Lalitha Sahasranama Guide',
    desc: 'Complete guide to performing Lalitha Sahasranama parayana with proper method and pronunciation.',
    items: ['Preparation & Niyamas', 'Correct Chanting Method', 'Kumkum Archana Procedure', 'Benefits & Phalashruti'],
  },
  {
    icon: <FiFileText />,
    title: 'Ritual Guides for Special Pujas',
    desc: 'Detailed procedure for performing special pujas like Ganapathi Homam, Navagraha Shanti, and more.',
    items: ['Ganapathi Homam', 'Navagraha Shanti', 'Sudarshana Homam', 'Satyanarayana Puja'],
  },
  {
    icon: <FiHeart />,
    title: 'Devotional Practices for Daily Life',
    desc: 'Simple practices to bring the blessings of Samrajya Lakshmi into your everyday routine.',
    items: ['Morning Prayer Routine', 'Deepam Lighting Guide', 'Sandhya Vandana', 'Nightly Gratitude Practice'],
  },
]

export default function Resources() {
  return (
    <div>
      <div className="page-banner">
        <h1>Resources & How-to</h1>
        <p>Mantra guides, ritual instructions, and spiritual resources</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Spiritual Guides</h2>
          <div className="divider" />
          <p className="section-subtitle">Everything you need for authentic Samrajya Lakshmi worship</p>

          <div className="resources-grid">
            {guides.map((g) => (
              <div key={g.title} className="resource-card card">
                <div className="resource-card__icon">{g.icon}</div>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                <ul className="resource-card__items">
                  {g.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                <button className="btn btn-maroon" style={{ marginTop: 'auto' }}>Read Guide</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
