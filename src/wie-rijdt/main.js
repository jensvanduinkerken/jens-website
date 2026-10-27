import '../styles/index.css'
import './wie-rijdt.css'

const DEFAULT = { kids: [
  { id: 'k1', name: 'Kind 1' }, { id: 'k2', name: 'Kind 2' },
  { id: 'k3', name: 'Kind 3' }, { id: 'k4', name: 'Kind 4' },
], rides: [] }
const LS_KEY = 'wie-rijdt-state'
const $ = id => document.getElementById(id)
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

let state = loadLocal() || structuredClone(DEFAULT)
const present = new Set(state.kids.map(k => k.id))
let dir = 'heen'
let mode = 'eerlijk'
let lastRideId = null
let spinning = false

// ---- opslag: alleen in deze browser
function loadLocal() {
  try { const s = JSON.parse(localStorage.getItem(LS_KEY)); if (s && Array.isArray(s.kids)) return { kids: s.kids, rides: s.rides || [] } } catch {}
  return null
}
function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)) } catch {} }

// ---- logica
const counts = () => {
  const c = Object.fromEntries(state.kids.map(k => [k.id, 0]))
  for (const r of state.rides) if (r.kidId in c) c[r.kidId]++
  return c
}
const nameOf = id => (state.kids.find(k => k.id === id) || {}).name || '?'

function pickCandidates() {
  const ids = state.kids.map(k => k.id).filter(id => present.has(id))
  if (!ids.length) return { pool: [], reason: '' }
  if (mode === 'geluk') return { pool: ids, reason: 'Puur geluk: iedereen evenveel kans.' }
  const c = counts()
  const min = Math.min(...ids.map(id => c[id]))
  let pool = ids.filter(id => c[id] === min)
  // wie de vorige rit reed krijgt er niet twee achter elkaar als iemand anders gelijk staat
  const prev = state.rides[state.rides.length - 1]
  if (prev && pool.length > 1) pool = pool.filter(id => id !== prev.kidId)
  const reason = pool.length === 1
    ? `${nameOf(pool[0])} heeft het minst gereden (${min}×).`
    : `${pool.map(nameOf).join(', ')} staan gelijk met ${min}×. Het lot beslist.`
  return { pool, reason }
}

function draw() {
  if (spinning) return
  const { pool, reason } = pickCandidates()
  if (!pool.length) { $('why').textContent = 'Kies eerst wie er mee gaat.'; return }
  const winner = pool[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32 * pool.length)]
  const showPool = state.kids.filter(k => present.has(k.id)).map(k => k.id)
  spinning = true
  $('go').disabled = true; $('after').hidden = true; $('swaplist').hidden = true
  $('why').textContent = '…'
  const plate = $('plate'); plate.classList.remove('is-win'); plate.classList.add('is-spin')
  const steps = reduceMotion ? 1 : 18 + Math.floor(Math.random() * 6)
  let i = 0, delay = 50
  const tick = () => {
    i++
    if (i >= steps) {
      plate.classList.remove('is-spin'); void plate.offsetWidth; plate.classList.add('is-win')
      $('plateName').textContent = nameOf(winner)
      $('why').textContent = reason
      record(winner)
      spinning = false; $('go').disabled = false; $('after').hidden = false
      return
    }
    $('plateName').textContent = nameOf(showPool[i % showPool.length])
    delay *= 1.13
    setTimeout(tick, delay)
  }
  tick()
}

function record(kidId, swappedFrom) {
  const ride = { id: 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), kidId, dir, ts: Date.now() }
  if (swappedFrom) ride.swappedFrom = swappedFrom
  state.rides.push(ride)
  if (state.rides.length > 400) state.rides = state.rides.slice(-400)
  lastRideId = ride.id
  render(); save()
}

function undo() {
  if (!lastRideId) return
  state.rides = state.rides.filter(r => r.id !== lastRideId)
  lastRideId = null
  $('after').hidden = true; $('swaplist').hidden = true
  $('plateName').textContent = '? - ? - ?'
  $('why').textContent = 'Rit is weggehaald. Kies opnieuw.'
  render(); save()
}

function showSwap() {
  const ride = state.rides.find(r => r.id === lastRideId)
  if (!ride) return
  const box = $('swaplist'); box.innerHTML = ''
  const p = document.createElement('p'); p.textContent = `${nameOf(ride.kidId)} geeft de beurt aan:`; box.append(p)
  for (const k of state.kids) {
    if (k.id === ride.kidId || !present.has(k.id)) continue
    const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn--light btn--sm'; b.textContent = k.name
    b.onclick = () => {
      const from = ride.kidId
      state.rides = state.rides.filter(r => r.id !== lastRideId)
      record(k.id, from)
      $('plateName').textContent = k.name
      $('why').textContent = `${nameOf(from)} gaf de beurt weg en houdt dus voorrang voor de volgende keer.`
      box.hidden = true
    }
    box.append(b)
  }
  box.hidden = box.children.length <= 1
}

// ---- render
function render() {
  const pres = $('present'); pres.innerHTML = ''
  for (const k of state.kids) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'rit-chip'
    b.textContent = k.name; b.setAttribute('aria-pressed', present.has(k.id))
    b.onclick = () => { present.has(k.id) ? present.delete(k.id) : present.add(k.id); render() }
    pres.append(b)
  }

  const c = counts(), max = Math.max(1, ...Object.values(c))
  const rows = $('rows'); rows.innerHTML = ''
  for (const k of state.kids) {
    const r = document.createElement('div'); r.className = 'rit-row'
    const n = document.createElement('span'); n.className = 'rit-row__n'; n.textContent = k.name
    const bar = document.createElement('div'); bar.className = 'rit-bar'
    const fill = document.createElement('i'); fill.style.width = (c[k.id] / max * 100) + '%'; bar.append(fill)
    const cnt = document.createElement('span'); cnt.className = 'rit-row__c mono'; cnt.textContent = c[k.id]
    r.append(n, bar, cnt); rows.append(r)
  }

  const { pool } = pickCandidates()
  $('next').innerHTML = ''
  if (mode === 'eerlijk' && pool.length) {
    $('next').append('Volgende rit maakt kans: ')
    const b = document.createElement('b'); b.textContent = pool.map(nameOf).join(', '); $('next').append(b)
  }

  const log = $('log'); log.innerHTML = ''
  const recent = state.rides.slice(-15).reverse()
  if (!recent.length) {
    const li = document.createElement('li'); li.className = 'rit-empty'
    li.textContent = 'Nog geen ritten. De eerste keuze komt hier te staan.'
    log.append(li)
  }
  for (const r of recent) {
    const li = document.createElement('li')
    const t = document.createElement('time'); t.className = 'mono'
    t.textContent = new Date(r.ts).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
    const who = document.createElement('span'); who.textContent = nameOf(r.kidId)
    if (r.swappedFrom) { const s = document.createElement('span'); s.className = 'rit-log__s'; s.textContent = `kreeg de beurt van ${nameOf(r.swappedFrom)}`; who.append(s) }
    const d = document.createElement('span'); d.className = 'rit-log__d mono'; d.textContent = r.dir
    li.append(t, who, d); log.append(li)
  }

  const names = $('names')
  if (!names.contains(document.activeElement)) {
    names.innerHTML = ''
    state.kids.forEach((k, i) => {
      const inp = document.createElement('input'); inp.id = 'name-' + k.id; inp.value = k.name
      inp.setAttribute('aria-label', `Naam kind ${i + 1}`); inp.maxLength = 20
      inp.onchange = () => { k.name = inp.value.trim() || `Kind ${i + 1}`; render(); save() }
      names.append(inp)
    })
  }
}

// ---- events
$('go').onclick = draw
$('undoBtn').onclick = undo
$('swapBtn').onclick = showSwap
for (const b of $('dir').querySelectorAll('button')) b.onclick = () => {
  dir = b.dataset.dir
  for (const o of $('dir').querySelectorAll('button')) o.setAttribute('aria-pressed', o === b)
}
$('modeBtn').onclick = () => {
  mode = mode === 'eerlijk' ? 'geluk' : 'eerlijk'
  $('modeName').textContent = mode === 'eerlijk' ? 'Eerlijk' : 'Puur geluk'
  render()
}
$('resetBtn').onclick = () => { $('resetConfirm').hidden = false }
$('resetNo').onclick = () => { $('resetConfirm').hidden = true }
$('resetYes').onclick = () => {
  state.rides = []; lastRideId = null; $('resetConfirm').hidden = true
  $('plateName').textContent = '? - ? - ?'; $('why').textContent = 'Alles staat weer op nul.'
  $('after').hidden = true; render(); save()
}

render()
