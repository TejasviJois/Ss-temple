import './Pages.css'

const products = [
  { name: 'Samrajya Lakshmi Deity Photo (Framed)', price: '₹999', category: 'Deity' },
  { name: 'Silver Lakshmi Coin (10g)', price: '₹1,500', category: 'Silver' },
  { name: 'Brass Deepam (Traditional)', price: '₹450', category: 'Puja Items' },
  { name: 'Samrajya Lakshmi Yantra (Copper)', price: '₹2,100', category: 'Yantra' },
  { name: 'Rudraksha Mala (108 beads)', price: '₹800', category: 'Mala' },
  { name: 'Kumkum & Vibhuti Set', price: '₹199', category: 'Puja Items' },
  { name: 'Puja Thali Set (Brass)', price: '₹1,200', category: 'Puja Items' },
  { name: 'Samrajya Lakshmi Book (English)', price: '₹350', category: 'Books' },
  { name: 'Temple Incense Collection', price: '₹250', category: 'Incense' },
  { name: 'Gold-Plated Lakshmi Pendant', price: '₹3,500', category: 'Jewelry' },
  { name: 'Silk Vastram for Deity', price: '₹750', category: 'Vastram' },
  { name: 'Camphor & Ghee Lamp Kit', price: '₹180', category: 'Puja Items' },
]

export default function Store() {
  return (
    <div>
      <div className="page-banner">
        <h1>Temple Store</h1>
        <p>Sacred items and spiritual merchandise</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop Sacred Items</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Authentic puja items, deity accessories, and spiritual books
          </p>

          <div className="store-grid">
            {products.map((p) => (
              <div key={p.name} className="store-card card">
                <div className="store-card__img">🛕</div>
                <span className="store-card__category">{p.category}</span>
                <h3>{p.name}</h3>
                <div className="store-card__footer">
                  <span className="store-card__price">{p.price}</span>
                  <button className="btn btn-maroon">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
