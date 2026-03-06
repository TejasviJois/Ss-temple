import { useState } from 'react'
import { FiPlay, FiPause, FiDownload } from 'react-icons/fi'
import './Media.css'

const audioTracks = [
  { title: 'Sri Lalitha Sahasranama — Full Chanting', duration: '42:15', artist: 'Temple Priests' },
  { title: 'Samrajya Lakshmi Stotram', duration: '12:30', artist: 'Dr. Krupanidhi Guruji' },
  { title: 'Ashta Lakshmi Stotram', duration: '18:45', artist: 'Temple Priests' },
  { title: 'Sri Lakshmi Ashtottara Shatanamavali (108 Names)', duration: '15:20', artist: 'Temple Priests' },
  { title: 'Kanakadhara Stotram', duration: '8:10', artist: 'Dr. Krupanidhi Guruji' },
  { title: 'Sri Suktam — Vedic Hymn to Lakshmi', duration: '10:50', artist: 'Veda Pandit Team' },
  { title: 'Samrajya Lakshmi Maha Mantra — 108 Repetitions', duration: '35:00', artist: 'Dr. Krupanidhi Guruji' },
  { title: 'Lalitha Trishati (300 Names)', duration: '22:30', artist: 'Temple Priests' },
  { title: 'Evening Aarti & Deepotsavam Bhajans', duration: '28:40', artist: 'Temple Bhajan Group' },
  { title: 'Guruji\'s Discourse — Significance of Samrajya Lakshmi', duration: '55:10', artist: 'Dr. Krupanidhi Guruji' },
]

export default function LalithaAudio() {
  const [playing, setPlaying] = useState(null)

  return (
    <div>
      <div className="page-banner">
        <h1>Lalitha Audio</h1>
        <p>Sacred chants, stotrams, and spiritual discourses</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="audio-content">
            <div className="audio-hero">
              <div className="audio-hero__icon">ॐ</div>
              <h2>Divine Audio Library</h2>
              <p>
                Listen to sacred chants, stotrams, and mantras recited by our temple priests
                and Pujya Dr. Krupanidhi Guruji. These recordings are blessed and ideal for
                daily meditation and worship.
              </p>
            </div>

            <div className="audio-list">
              {audioTracks.map((track, i) => (
                <div key={i} className={`audio-track card ${playing === i ? 'audio-track--playing' : ''}`}>
                  <button
                    className="audio-track__play"
                    onClick={() => setPlaying(playing === i ? null : i)}
                    aria-label={playing === i ? 'Pause' : 'Play'}
                  >
                    {playing === i ? <FiPause /> : <FiPlay />}
                  </button>
                  <div className="audio-track__info">
                    <h4>{track.title}</h4>
                    <span>{track.artist}</span>
                  </div>
                  <span className="audio-track__duration">{track.duration}</span>
                  <button className="audio-track__download" aria-label="Download">
                    <FiDownload />
                  </button>
                </div>
              ))}
            </div>

            <div className="audio-note">
              <p>
                <strong>Note:</strong> Audio files will be available for streaming and download soon.
                Subscribe to our newsletter or follow us on social media for updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
