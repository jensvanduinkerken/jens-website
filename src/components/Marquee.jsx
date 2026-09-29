import { Fragment } from 'react'
import { tools } from '../data/site'

function Group() {
  return (
    <div className="marquee__group">
      {tools.map(t => (
        <Fragment key={t}>
          <span>{t}</span><span className="marquee__sep">/</span>
        </Fragment>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" aria-label={`Tools: ${tools.join(', ')}`}>
      <div className="marquee__track" aria-hidden="true">
        <Group />
        <Group />
      </div>
    </div>
  )
}
