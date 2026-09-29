import { site } from '../data/site'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="contact__title">Zin om samen<br />iets te bouwen?</h2>
        <a href={`mailto:${site.email}`} className="contact__mail">{site.email}</a>
        <div className="contact__links">
          <a href={site.github} className="btn btn--dark" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={site.linkedin} className="btn btn--light" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </div>
    </section>
  )
}
