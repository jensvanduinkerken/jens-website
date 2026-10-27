export const site = {
  email: 'jens@vanduinkerken.net',
  github: 'https://github.com/jensz321',
  linkedin: 'https://www.linkedin.com/in/jens-van-duinkerken-1a1b97292',
  photo: '/assets/images/jens.jpg',
  birthDate: new Date(2006, 9, 13), // 13 oktober 2006 (maand telt vanaf 0)
}

// leeftijd op basis van de geboortedatum, zodat die nooit verouderd raakt
export function age() {
  const today = new Date()
  const b = site.birthDate
  const hadBirthday = today.getMonth() > b.getMonth()
    || (today.getMonth() === b.getMonth() && today.getDate() >= b.getDate())
  return today.getFullYear() - b.getFullYear() - (hadBirthday ? 0 : 1)
}

export const tools = ['Node.js', 'React', 'Tailwind', 'Supabase', 'Three.js', 'Vercel', 'JavaScript']

export const route = [
  { when: 't/m 2026 · Aventus, Apeldoorn', what: 'MBO Software Development' },
  { when: 'sep 2024 – jan 2025 · Aventus', what: 'Stage bij school' },
  { when: 'feb – jul 2026 · Raket', what: 'Stage developer' },
  { when: 'jun – aug 2026 · Málaga', what: 'Bootcamp content strategy' },
  { when: 'nu · Windesheim, Zwolle', what: 'HBO ICT — Business IT & Management', now: true },
]
