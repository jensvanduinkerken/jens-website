import { projects } from '../data/projects'

const variantClass = {
  'wide-accent': 'card--wide card--accent',
  'narrow-tilt-r': 'card--narrow card--tilt-r',
  'narrow-tilt-l': 'card--narrow card--tilt-l',
  'wide-dark': 'card--wide card--dark card--offset',
}

function Media({ media }) {
  if (media.image) {
    return <div className="card__media"><img src={media.image} alt="" /></div>
  }
  if (media.blue) return <div className="card__media card__media--blue">{media.blue}</div>
  if (media.belt) return <div className="card__media card__media--belt">{media.belt}</div>
  return <div className="card__media">{media.label}</div>
}

function Links({ links }) {
  if (links.length === 0) return null
  return (
    <div className="card__links">
      {links.map(l => (
        <a key={l.href} href={l.href} className="card__link" target="_blank" rel="noopener noreferrer">
          {l.label}<span className="arr">→</span>
        </a>
      ))}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const { variant, type, year, badge, title, text, media, list, tags, links } = project
  const chips = tags.length > 0 && (
    <div className="chips">{tags.map(t => <span key={t} className="chip">{t}</span>)}</div>
  )

  return (
    <article className={`card ${variantClass[variant]} reveal`}>
      <div className="card__meta mono">
        <span>{String(index + 1).padStart(2, '0')} — {type}</span>
        {badge ? <span className="card__badge">{badge}</span> : <span>{year}</span>}
      </div>
      {media && <Media media={media} />}
      <h3 className="card__title">{title}</h3>
      <p className="card__text">{text}</p>
      {list && (
        <ul className="card__list">
          {list.map(item => (
            <li key={item.what}>
              <span className="card__list-name mono">{item.name}</span>
              <span>{item.what}</span>
            </li>
          ))}
        </ul>
      )}
      {chips && links.length > 0 ? (
        <div className="card__foot">{chips}<Links links={links} /></div>
      ) : (
        <>{chips}<Links links={links} /></>
      )}
    </article>
  )
}

export default function Work() {
  return (
    <section id="werk" className="work container">
      <div className="section-head">
        <h2 className="section-title">Dingen die ik<br />gebouwd heb</h2>
        <div className="section-meta mono">( {String(projects.length).padStart(2, '0')} projecten )</div>
      </div>

      <div className="work__grid">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
}
