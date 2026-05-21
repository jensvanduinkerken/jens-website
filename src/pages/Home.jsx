import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { projects } from '../data/projects'
import '../styles/Home.css'
import '../styles/scrollAnimations.css'
import '../styles/landed/main.css'
import '../styles/landed/fontawesome-all.min.css'

export default function Home() {
  useScrollAnimation()
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.className = isScrolled ? 'scrolled' : ''
    }
  }, [isScrolled])

  return (
    <div id="page-wrapper">
      {/* Header */}
      <header id="header" ref={headerRef}>
        <h1 id="logo">
          <Link to="/">Jens</Link>
        </h1>
        <nav id="nav">
          <ul>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li>
              <Link to="#">Menu</Link>
              <ul>
                <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Over mij</Link></li>
                <li><Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projecten</Link></li>
                <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
              </ul>
            </li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Over mij</Link></li>
            <li><Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projecten</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
          </ul>
        </nav>
      </header>
    <div id="page-wrapper">
      {/* Banner */}
      <section id="banner">
        <div className="content">
          <header>
            <h2>Jens van Duinkerken</h2>
            <p>Software Developer die digitale oplossingen bouwt<br />
            met passie en precisie</p>
          </header>
          <span className="image">
            <div className="hero-placeholder">
              <h3>Mijn Portfolio</h3>
            </div>
          </span>
        </div>
        <a href="#one" className="goto-next scrolly">Next</a>
      </section>

      {/* One */}
      <section id="one" className="spotlight style1 bottom">
        <span className="image fit main">
          <div className="placeholder-section">
            <h4>Wie ik ben</h4>
          </div>
        </span>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-4 col-12-medium">
                <header>
                  <h2>Jens van Duinkerken</h2>
                  <p>19-jarige Software Developer student</p>
                </header>
              </div>
              <div className="col-4 col-12-medium">
                <p>
                  Ik ben altijd geïnteresseerd geweest in technologie en hoe dingen werken.
                  Het bouwen van digitale oplossingen die mensen helpen, dát is waar ik
                  passie voor heb.
                </p>
              </div>
              <div className="col-4 col-12-medium">
                <p>
                  Mijn focus ligt op webontwikkeling met moderne frameworks, maar ik ben
                  altijd klaar om nieuwe uitdagingen aan te gaan en mijn kennis uit te breiden.
                </p>
              </div>
            </div>
          </div>
        </div>
        <a href="#two" className="goto-next scrolly">Next</a>
      </section>

      {/* Two */}
      <section id="two" className="spotlight style2 right">
        <span className="image fit main">
          <div className="placeholder-section">
            <h4>Wat ik doe</h4>
          </div>
        </span>
        <div className="content">
          <header>
            <h2>Mijn Kernvaardigheden</h2>
            <p>Specialisaties in webontwikkeling en software engineering</p>
          </header>
          <div className="services-list">
            <div className="service-item-landed">
              <h3>Webontwikkeling</h3>
              <p>Responsieve websites met HTML, CSS, JavaScript en moderne frameworks zoals React.</p>
            </div>
            <div className="service-item-landed">
              <h3>Frontend Engineering</h3>
              <p>Dynamische gebruikerservaringen en intuïtieve interfaces met moderne best practices.</p>
            </div>
            <div className="service-item-landed">
              <h3>API Development</h3>
              <p>Bouwen van RESTful APIs en integraties tussen verschillende systemen.</p>
            </div>
          </div>
          <ul className="actions">
            <li><Link to="/about" className="button">Meer over mij</Link></li>
          </ul>
        </div>
        <a href="#three" className="goto-next scrolly">Next</a>
      </section>

      {/* Three */}
      <section id="three" className="spotlight style3 left">
        <span className="image fit main bottom">
          <div className="placeholder-section">
            <h4>Projecten</h4>
          </div>
        </span>
        <div className="content">
          <header>
            <h2>Uitgelichte Projecten</h2>
            <p>Recente werkstukken die mijn vaardigheden demonstreren</p>
          </header>
          <div className="featured-projects">
            {projects.filter(p => p.featured).slice(0, 3).map((project) => (
              <div key={project.id} className="project-preview">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
          <ul className="actions">
            <li><Link to="/projects" className="button">Alle projecten bekijken</Link></li>
          </ul>
        </div>
        <a href="#four" className="goto-next scrolly">Next</a>
      </section>

      {/* Four */}
      <section id="four" className="wrapper style1 special fade-up">
        <div className="container">
          <header className="major">
            <h2>Technologie Stack</h2>
            <p>De tools en technologieën die ik beheers</p>
          </header>
          <div className="box alt">
            <div className="row gtr-uniform">
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-code"></span>
                <h3>Frontend</h3>
                <p>HTML, CSS, JavaScript, React, Bootstrap</p>
              </section>
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-server"></span>
                <h3>Backend</h3>
                <p>Node.js, Express, APIs, MySQL, MongoDB</p>
              </section>
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-tools"></span>
                <h3>Tools</h3>
                <p>Git, VS Code, Figma, Postman</p>
              </section>
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-mobile-alt"></span>
                <h3>Responsive</h3>
                <p>Mobile-first design, Cross-browser compatibility</p>
              </section>
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-rocket"></span>
                <h3>Performance</h3>
                <p>Optimalisatie, Snelheid, Best practices</p>
              </section>
              <section className="col-4 col-6-medium col-12-xsmall">
                <span className="icon solid alt major fa-puzzle-piece"></span>
                <h3>Problem-solving</h3>
                <p>Analytisch denken, Creatieve oplossingen</p>
              </section>
            </div>
          </div>
          <footer className="major">
            <ul className="actions special">
              <li><Link to="/about" className="button">Meer skills zien</Link></li>
            </ul>
          </footer>
        </div>
      </section>

      {/* Five */}
      <section id="five" className="wrapper style2 special fade">
        <div className="container">
          <header>
            <h2>Laten we samenwerken</h2>
            <p>Klaar om iets geweldigs te bouwen?</p>
          </header>
          <div className="cta">
            <Link to="/contact" className="button primary large">
              Neem contact op
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <ul className="icons">
          <li><a href="https://github.com" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
          <li><a href="https://linkedin.com" className="icon brands alt fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
          <li><a href="mailto:jens@example.com" className="icon solid alt fa-envelope"><span className="label">Email</span></a></li>
        </ul>
        <ul className="copyright">
          <li>&copy; 2024 Jens van Duinkerken. All rights reserved.</li>
          <li>Design: <a href="http://html5up.net">HTML5 UP</a> | Modified by Jens</li>
        </ul>
      </footer>
    </div>
  )
}
