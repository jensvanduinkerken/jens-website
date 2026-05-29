export const projects = [
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Mijn persoonlijke portfolio website waarop mijn vaardigheden, projecten en ervaring als software developer worden getoond.',
    link: 'https://jens.vanduinkerken.net',
    tags: ['React', 'Vite', 'CSS', 'Responsive Design'],
    featured: true
  },
  {
    id: 'pulse720',
    title: 'Pulse 720',
    description: 'Een moderne AI-aangedreven applicatie met Vue.js frontend en Python backend. Ik heb significante bijdragen geleverd aan zowel frontend als AI integratie.',
    link: 'https://app.pulse720.com',
    tags: ['Vue.js', 'Python', 'SQL', 'AI API', 'REST API'],
    featured: true
  },
  {
    id: 'padplanner',
    title: 'PadPlanner',
    description: 'Een gratis webapplicatie die willekeurige loop-, hardloop- en fietsroutes genereert. Gebruikers kunnen routes aanmaken op basis van afstand of duur, en ze exporteren in GPX-formaat.',
    link: 'https://padplanner.vercel.app',
    tags: ['React', 'Maps API', 'Geolocation', 'GPX Export'],
    featured: true
  },
  {
    id: 'curo',
    title: 'Curo.one',
    description: 'Een moderne CMS waarmee ondernemers hun websites kunnen beheren via natuurlijke taalcommando\'s in plaats van traditionele interfaces. Inclusief beveiliging, SEO en snelle laadtijden.',
    link: 'https://curo.one',
    tags: ['CMS', 'AI', 'Natural Language', 'Security'],
    featured: true
  },
]

export const getProjectById = (id) => {
  return projects.find(p => p.id === id)
}
