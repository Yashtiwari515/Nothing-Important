import { useNavigate } from "react-router-dom";
import "../styles/landing.css";


function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-orb orb-one"></div>
      <div className="landing-orb orb-two"></div>
      <div className="landing-grid"></div>

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <span>VOID</span>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          EVERYTHING IS FINE
        </div>
      </nav>

      {/* Hero */}
      <main className="landing-hero">
        <div className="eyebrow">
          <span>✦</span>
          NOTHING TO SEE HERE
          <span>✦</span>
        </div>

        <h1>
          This website
          <span> does nothing.</span>
        </h1>

        <p className="hero-description">
          You probably have better things to do.
          But since you're already here, you might as well
          take a look around.
        </p>

        <div className="hero-buttons">
          <button
            className="enter-button"
            onClick={() => navigate("/login")}
          >
            <span>Okay, I'm curious</span>
            <span className="arrow">↗</span>
          </button>

          <div className="secret-text">
            <span>¯\_(ツ)_/¯</span>
            We have absolutely no idea what you're doing here.
          </div>
        </div>

        {/* Random terminal */}
        <div className="terminal-card">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <span>nothing-important.exe</span>

            <span className="terminal-live">RUNNING</span>
          </div>

          <div className="terminal-body">
            <p>
              <span className="terminal-green">&gt;</span>{" "}
              Waking up the website...
            </p>

            <p>
              <span className="terminal-green">&gt;</span>{" "}
              Checking absolutely nothing...
            </p>

            <p>
              <span className="terminal-green">&gt;</span>{" "}
              Everything seems unnecessarily complicated.
            </p>

            <p>
              <span className="terminal-green">&gt;</span>{" "}
              <span className="typing">
                Proceeding anyway...
              </span>
            </p>
          </div>
        </div>

        {/* Random stats */}
        <div className="landing-stats">
          <div>
            <strong>404</strong>
            <span>GOOD IDEAS</span>
          </div>

          <div>
            <strong>69%</strong>
            <span>PROBABLY WORKING</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>UNNECESSARY THINGS</span>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <span>MADE FOR NO PARTICULAR REASON.</span>
        <span>© 2026 VOID</span>
      </footer>
    </div>
  );
}

export default Landing;
