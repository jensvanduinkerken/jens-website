import '../styles/index.css'
import './wie-rijdt.css'

const DEFAULT_NAMES = ['Kind 1', 'Kind 2', 'Kind 3', 'Kind 4']
const LS_KEY = 'wie-rijdt-namen'
const $ = id => document.getElementById(id)
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

const kids = loadNames().map((name, i) => ({ id: 'k' + (i + 1), name }))
const present = new Set(kids.map(k => k.id))
const drinkers = new Set()
let round = 1
let spinning = false

// ---- opslag: alleen de namen, in deze browser
function loadNames() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_KEY))
    if (Array.isArray(s) && s.length === DEFAULT_NAMES.length) return s
  } catch {}
  return [...DEFAULT_NAMES]
}
function saveNames() { try { localStorage.setItem(LS_KEY, JSON.stringify(kids.map(k => k.name))) } catch {} }

// ---- loten
// Geen opgeslagen stand: het toeval start vanuit datum + keuzes + ronde,
// zodat elke telefoon met dezelfde invoer dezelfde bestuurders kiest.
const todayKey = () => new Date().toLocaleDateString('sv-SE') // JJJJ-MM-DD in lokale tijd

function seededRandom(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return () => { // mulberry32
    h = (h + 0x6D2B79F5) | 0
    let t = Math.imul(h ^ (h >>> 15), 1 | h)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const nameOf = id => kids.find(k => k.id === id)?.name ?? '?'
const list = ids => ids.length > 1
  ? `${ids.slice(0, -1).map(nameOf).join(', ')} en ${nameOf(ids.at(-1))} drinken`
  : `${nameOf(ids[0])} drinkt`

function decide() {
  const going = kids.map(k => k.id).filter(id => present.has(id))
  if (!going.length) return null
  const drinking = going.filter(id => drinkers.has(id))
  const sober = going.filter(id => !drinkers.has(id))
  const rand = seededRandom([todayKey(), going.join(','), drinking.join(','), round].join('|'))
  const pick = pool => pool[Math.floor(rand() * pool.length)]

  const terug = sober.length ? pick(sober) : null
  // heen: liefst iemand die drinkt, anders iemand anders dan de terugrijder
  let heenPool = drinking.length ? drinking : going.filter(id => id !== terug)
  if (!heenPool.length) heenPool = going
  const heen = pick(heenPool)

  const why = []
  if (!terug) why.push('Iedereen drinkt, dus niemand kan terugrijden. Regel een BOB of taxi.')
  else if (drinking.length) why.push(`${list(drinking)}, dus ${nameOf(terug)} rijdt terug.`)
  if (drinking.length && sober.length) why.push(`Wie drinkt rijdt heen: ${nameOf(heen)}.`)
  if (heen === terug) why.push(`${nameOf(heen)} is de enige die kan rijden.`)
  if (!drinking.length && heen !== terug) why.push('Puur geluk, voor allebei de ritten.')
  return { heen, terug, why: why.join(' ') }
}

function draw() {
  if (spinning) return
  const result = decide()
  if (!result) { $('why').textContent = 'Kies eerst wie er mee gaat.'; return }
  const going = kids.filter(k => present.has(k.id)).map(k => k.id)
  const plates = ['heen', 'terug'].map(dir => ({ plate: $('plate-' + dir), name: $('name-' + dir), winner: result[dir] }))
  spinning = true
  $('go').disabled = true; $('after').hidden = true
  $('why').textContent = '…'
  for (const p of plates) { p.plate.classList.remove('is-win'); p.plate.classList.add('is-spin') }
  const steps = reduceMotion ? 1 : 18 + Math.floor(Math.random() * 6)
  let i = 0, delay = 50
  const tick = () => {
    i++
    if (i >= steps) {
      for (const p of plates) {
        p.plate.classList.remove('is-spin'); void p.plate.offsetWidth; p.plate.classList.add('is-win')
        p.name.textContent = p.winner ? nameOf(p.winner) : 'BOB'
      }
      $('why').textContent = result.why
      $('round').textContent = round > 1 ? `Ronde ${round}` : ''
      spinning = false; $('go').disabled = false; $('after').hidden = false
      return
    }
    plates.forEach((p, j) => { p.name.textContent = nameOf(going[(i + j) % going.length]) })
    delay *= 1.13
    setTimeout(tick, delay)
  }
  tick()
}

function clearResult() {
  round = 1
  $('name-heen').textContent = $('name-terug').textContent = '? - ? - ?'
  $('why').textContent = 'Tik op de knop om te kiezen.'
  $('after').hidden = true
}

// ---- render
function chip(k, on, onClick, extra = '') {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'rit-chip ' + extra
  b.textContent = k.name; b.setAttribute('aria-pressed', on)
  b.onclick = onClick
  return b
}

function render() {
  const pres = $('present'); pres.innerHTML = ''
  for (const k of kids) pres.append(chip(k, present.has(k.id), () => {
    present.has(k.id) ? present.delete(k.id) : present.add(k.id)
    drinkers.delete(k.id)
    clearResult(); render()
  }))

  const drink = $('drinkers'); drink.innerHTML = ''
  for (const k of kids) {
    if (!present.has(k.id)) continue
    drink.append(chip(k, drinkers.has(k.id), () => {
      drinkers.has(k.id) ? drinkers.delete(k.id) : drinkers.add(k.id)
      clearResult(); render()
    }, 'rit-chip--drink'))
  }
  if (!drink.children.length) drink.textContent = '—'

  const names = $('names')
  if (!names.contains(document.activeElement)) {
    names.innerHTML = ''
    kids.forEach((k, i) => {
      const inp = document.createElement('input'); inp.id = 'name-' + k.id; inp.value = k.name
      inp.setAttribute('aria-label', `Naam ${i + 1}`); inp.maxLength = 20
      inp.onchange = () => { k.name = inp.value.trim() || DEFAULT_NAMES[i]; saveNames(); render() }
      names.append(inp)
    })
  }
}

// ---- events
$('today').textContent = new Date().toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })
$('go').onclick = draw
$('againBtn').onclick = () => { round++; draw() }

render()
