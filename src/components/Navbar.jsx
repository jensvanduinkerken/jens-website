import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/Navbar.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header id="header">
      <h1 id="logo">
        <Link to="/">Jens</Link>
      </h1>
      <nav id="nav">
        <ul className={isMobileMenuOpen ? 'active' : ''}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li>
            <Link to="#" onClick={(e) => { e.preventDefault(); toggleMobileMenu(); }}>Menu</Link>
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
  )
}
