import { useEffect, useState } from 'react'
import { site } from '../data/site'

const links = [
  { href: '#werk', label: 'Werk' },
  { href: '#over', label: 'Over mij' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="container">
      <nav className="nav" aria-label="Hoofdmenu">
        <a href="#top" className="logo"><span className="logo__mark">J</span><span>jens.</span></a>
        <div className="nav__links">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href={`mailto:${site.email}`} className="btn btn--dark btn--sm">Mail me</a>
        </div>
        <button
          className="nav__toggle"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span>
        </button>
        {open && (
          <div id="mobile-menu" className="nav__menu">
            {links.map(l => <a key={l.href} href={l.href} onClick={close}>{l.label}</a>)}
            <a href={`mailto:${site.email}`} className="btn btn--dark" onClick={close}>Mail me</a>
          </div>
        )}
      </nav>
    </header>
  )
}
