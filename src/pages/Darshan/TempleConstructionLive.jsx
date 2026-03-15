import './Darshan.css'

export default function TempleConstructionLive() {
  return (
    <div className="darshan-page">
      <div className="page-banner">
        <h1>Temple Construction Live</h1>
        <p>Watch the sacred construction progress in real-time</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="darshan-content">
            <div className="darshan-live-container">
              <div className="darshan-live-placeholder">
                <div className="darshan-live-icon">📹</div>
                <h3>Live CCTV Feed</h3>
                <p>
                  The live stream of the temple construction will appear here.
                  Please check back during active construction hours.
                </p>
                <div className="darshan-live-status">
                  <span className="darshan-live-dot" />
                  Stream will be available soon
                </div>
              </div>
            </div>

            <div className="darshan-info">
              <h2>About the Construction</h2>
              <div className="divider" style={{ margin: '16px 0 24px' }} />
              <p>
                The SHREE SAMRAJYALAKSHMI TEMPLE (ಶ್ರೀ ಸಾಮ್ರಾಜಲಕ್ಷ್ಮಿ ದೇವಾಲಯ) is being constructed following traditional
                Vastu Shastra and Agama principles, ensuring that every aspect of the structure
                resonates with divine energy. The temple will feature intricate carvings,
                sacred geometry, and spaces designed for various forms of worship and meditation.
              </p>
              <p>
                We provide this live feed so that devotees from around the world can witness
                the sacred process of building the divine abode and feel connected to this
                historic endeavor.
              </p>

              <div className="darshan-stats">
                <div className="darshan-stat">
                  <span className="darshan-stat__number">24/7</span>
                  <span className="darshan-stat__label">Live Monitoring</span>
                </div>
                <div className="darshan-stat">
                  <span className="darshan-stat__number">HD</span>
                  <span className="darshan-stat__label">Video Quality</span>
                </div>
                <div className="darshan-stat">
                  <span className="darshan-stat__number">Multi</span>
                  <span className="darshan-stat__label">Camera Angles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
