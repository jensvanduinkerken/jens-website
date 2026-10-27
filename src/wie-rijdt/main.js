import '../styles/index.css'
import './wie-rijdt.css'

const DEFAULT_NAMES = ['Bente', 'Ties', 'Mack', 'Jens']
const LS_KEY = 'wie-rijdt-namen'
const $ = id => document.getElementById(id)
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

const kids = loadNames().map((name, i) => ({ id: 'k' + (i + 1), name }))
const present = new Set(kids.map(k => k.id))
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
// Geen opgeslagen stand: het toeval start vanuit datum + wie er meegaat + ronde,
// zodat elke telefoon met dezelfde keuzes dezelfde bestuurders kiest.
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

function decide() {
  const going = kids.map(k => k.id).filter(id => present.has(id))
  if (!going.length) return null
  const rand = seededRandom([todayKey(), going.join(','), round].join('|'))
  const pick = pool => pool[Math.floor(rand() * pool.length)]

  // terug = de BOB; heen is iemand anders, die mag daarna drinken
  const terug = pick(going)
  const others = going.filter(id => id !== terug)
  const heen = others.length ? pick(others) : terug

  const why = heen === terug
    ? `${nameOf(heen)} is de enige en rijdt allebei de ritten. Geen drank dus.`
    : `${nameOf(heen)} rijdt heen en mag daarna drinken. ${nameOf(terug)} rijdt terug en is de BOB.`
  return { heen, terug, why }
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
function chip(k, on, onClick) {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'rit-chip'
  b.textContent = k.name; b.setAttribute('aria-pressed', on)
  b.onclick = onClick
  return b
}

function render() {
  const pres = $('present'); pres.innerHTML = ''
  for (const k of kids) pres.append(chip(k, present.has(k.id), () => {
    present.has(k.id) ? present.delete(k.id) : present.add(k.id)
    clearResult(); render()
  }))

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
