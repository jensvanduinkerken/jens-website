import { route } from '../data/site'

export default function About() {
  return (
    <section id="over" className="about container">
      <div className="about__text reveal">
        <h2 className="section-title">Over mij</h2>
        <p>Ik ben Jens, 19 jaar, uit Apeldoorn. Na mijn MBO Software Development en een stage bij Raket zit ik nu op Windesheim voor Business IT &amp; Management.</p>
        <p>Ik bouw het liefst dingen die echt gebruikt worden, van een restaurant-app tot een routeplanner voor wandelingen. Deze zomer zat ik in Málaga voor een bootcamp over content strategy.</p>
      </div>

      <div className="route reveal">
        <div className="route__label mono">MIJN ROUTE TOT NU TOE</div>
        <ol>
          {route.map((stop, i) => (
            <li key={stop.what}>
              <div className="route__rail">
                <span className={`route__stop${stop.now ? ' route__stop--now' : ''}`}></span>
                {i < route.length - 1 && <span className="route__line"></span>}
              </div>
              <div>
                <div className="route__when mono">{stop.when}</div>
                <div className="route__what">{stop.what}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
