import './Media.css'

const galleries = [
  { title: 'Temple Construction Progress', count: 24, cover: '🏗️' },
  { title: 'Festival Celebrations', count: 36, cover: '🎆' },
  { title: 'Puja & Homam', count: 18, cover: '🔥' },
  { title: 'Community Service', count: 15, cover: '🤝' },
  { title: 'Guruji\'s Discourses', count: 12, cover: '🙏' },
  { title: 'Anna Danam', count: 20, cover: '🍛' },
]

const recentPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  caption: `Temple moments #${i + 1}`,
}))

export default function MediaGallery() {
  return (
    <div>
      <div className="page-banner">
        <h1>Media Gallery</h1>
        <p>Visual journey through our sacred activities</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Photo Albums</h2>
          <div className="divider" />
          <p className="section-subtitle">Browse through our collection of sacred moments</p>

          <div className="gallery-albums">
            {galleries.map((g) => (
              <div key={g.title} className="gallery-album card">
                <div className="gallery-album__cover">{g.cover}</div>
                <div className="gallery-album__info">
                  <h3>{g.title}</h3>
                  <span>{g.count} photos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <h2 className="section-title">Recent Photos</h2>
          <div className="divider" />
          <p className="section-subtitle">Latest glimpses from the temple</p>

          <div className="gallery-grid">
            {recentPhotos.map((p) => (
              <div key={p.id} className="gallery-item">
                <div className="gallery-item__placeholder">🛕</div>
                <span className="gallery-item__caption">{p.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
