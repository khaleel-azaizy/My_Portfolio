import { useRef, useEffect } from 'react'

const Loader = ({ onComplete }) => {
  return (
    <div className="loading-screen">
      <div className="loader-content">
        <div className="loader-name">
          {'KHALEEL'.split('').map((letter, i) => (
            <span key={i} className="loader-letter" style={{ '--delay': `${i * 0.15}s` }}>
              <span className="letter-bg">{letter}</span>
              <span className="letter-fill">{letter}</span>
            </span>
          ))}
          <span className="loader-space"></span>
          {'AZAIZY'.split('').map((letter, i) => (
            <span key={i + 7} className="loader-letter" style={{ '--delay': `${(i + 8) * 0.15}s` }}>
              <span className="letter-bg">{letter}</span>
              <span className="letter-fill">{letter}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader
