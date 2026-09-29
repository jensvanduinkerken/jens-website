import { site } from '../data/site'

function StatusSticker({ className }) {
  return (
    <div className={`sticker sticker--status mono ${className}`}>
      <span className="dot"></span>open voor stage &amp; projecten
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="hero container">
      <div className="hero__text">
        <div className="hero__label mono rise">[ PORTFOLIO / 2026 ]</div>
        <h1 className="hero__title rise d1">Hoi, ik ben <span className="hero__name">Jens.</span></h1>
        <p className="hero__intro rise d2">Student HBO ICT aan Windesheim in Zwolle. Ik bouw full-stack webapps met Node.js en React, en side projects waar ik zelf gewoon zin in heb.</p>
        <div className="hero__actions rise d3">
          <a href="#werk" className="btn btn--dark">Bekijk mijn werk ↓</a>
          <a href={`mailto:${site.email}`} className="btn btn--light">Zeg hallo</a>
        </div>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="polaroid">
          {site.photo
            ? <img className="polaroid__img" src={site.photo} alt="" />
            : <div className="polaroid__img mono">[ FOTO VAN JOU ]</div>}
          <div className="polaroid__caption mono">dit ben ik, echt waar</div>
        </div>
        <div className="sticker sticker--round">19 jaar<br />uit Apeldoorn</div>
        <div className="sticker sticker--pill mono">Node.js + React</div>
        <StatusSticker className="status-desktop" />
      </div>
      <StatusSticker className="status-mobile" />
    </section>
  )
}
