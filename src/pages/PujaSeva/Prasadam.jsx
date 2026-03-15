import './PujaSeva.css'

const offerings = [
  { name: 'Samrajya Lakshmi Prasadam Box', price: '₹501', desc: 'Sacred prasadam blessed during Samrajya Lakshmi puja — includes kumkum, turmeric, vibhuti, flowers, and sweet prasadam.' },
  { name: 'Abhishekam Theertham', price: '₹251', desc: 'Holy water from the sacred abhishekam, charged with mantra energy for purification and blessings.' },
  { name: 'Energized Kumkum & Turmeric', price: '₹151', desc: 'Special kumkum and turmeric energized during Lalitha Sahasranama for daily worship use.' },
  { name: 'Sacred Lotus Seeds (108)', price: '₹351', desc: '108 lotus seeds used in archana, blessed and suitable for meditation japa practice.' },
  { name: 'Panchamritam Prasadam', price: '₹301', desc: 'Five-nectar divine offering prepared with milk, curd, ghee, honey, and sugar during special puja.' },
  { name: 'Complete Puja Kit', price: '₹1,100', desc: 'Everything you need for home Samrajya Lakshmi worship — includes idol photo, kumkum, turmeric, flowers, deepam, and instruction guide.' },
]

export default function Prasadam() {
  return (
    <div className="puja-page">
      <div className="page-banner">
        <h1>Prasadam & Offerings</h1>
        <p>Receive sacred blessings at your doorstep</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Sacred Prasadam</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Order blessed prasadam and sacred items delivered directly to your home
          </p>

          <div className="prasadam-grid">
            {offerings.map((o) => (
              <div key={o.name} className="prasadam-card card">
                <div className="prasadam-card__icon">🙏</div>
                <h3>{o.name}</h3>
                <p>{o.desc}</p>
                <div className="prasadam-card__footer">
                  <span className="prasadam-card__price">{o.price}</span>
                  <button className="btn btn-maroon">Order Now</button>
                </div>
              </div>
            ))}
          </div>

          <div className="prasadam-note">
            <p>
              <strong>Note:</strong> All prasadam items are blessed during authentic Vedic rituals
              at the SHREE SAMRAJYALAKSHMI TEMPLE. Shipping is available across India.
              For international orders, please contact us directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
