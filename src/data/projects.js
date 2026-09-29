// variant: 'wide-accent' | 'narrow-tilt-r' | 'narrow-tilt-l' | 'wide-dark'
// media (optioneel): { image } | { label } | { blue } | { belt }
// list (optioneel): [{ name, what }]
export const projects = [
  {
    id: 'padplanner',
    variant: 'wide-accent',
    type: 'Side project',
    year: '2026',
    title: 'PadPlanner',
    text: 'Een generator voor rondwandelingen: kies je startpunt en afstand, en je krijgt een route die weer bij je voordeur eindigt. Idee van mijn broer, gebouwd door mij.',
    media: { image: '/assets/images/route.jpg', label: '[ SCREENSHOT PADPLANNER ]' },
    tags: ['React', 'Vercel'],
    links: [{ label: 'Bekijk project', href: 'https://padplanner.vercel.app' }],
  },
  {
    id: 'school',
    variant: 'narrow-tilt-r',
    type: 'School',
    year: 'MBO',
    title: 'Schoolprojecten & hackathons',
    text: 'Op school heb ik heel veel kleine projecten gebouwd, en ook genoeg dingetjes die nooit af zijn gekomen. Een greep:',
    list: [
      { name: 'Examenproject', what: 'app voor een rijschool' },
      { name: 'Excellent Taste', what: 'restaurant-app, full-stack' },
      { name: 'Hackathon', what: 'digitale laboratoria in het Nederlandse onderwijs verbinden' },
      { name: 'Hackathon', what: 'jongeren vaker naar buiten krijgen' },
    ],
    tags: [],
    links: [],
  },
  {
    id: 'raket',
    variant: 'narrow-tilt-l',
    type: 'Stage',
    year: '2026',
    title: 'Stage bij Raket',
    text: 'Meegebouwd aan Pulse720 en Curo.one in een echt dev-team. Ik werkte aan UI-componenten in Vue.js en aan de koppeling met AI-API\'s.',
    media: { blue: 'Pulse720 × Curo.one' },
    tags: [],
    links: [
      { label: 'Pulse720', href: 'https://app.pulse720.com' },
      { label: 'Curo.one', href: 'https://curo.one' },
    ],
  },
  {
    id: 'fabriek',
    variant: 'wide-dark',
    type: 'Experiment',
    badge: 'in de maak',
    title: 'De 3D-fabriek',
    text: 'Een portfolio als fabriek in Three.js, waar je als bezoeker doorheen rijdt. Nog lang niet af, wel heel leuk om aan te werken.',
    media: { belt: '[ RENDER 3D-FABRIEK ]' },
    tags: ['Three.js', 'WebGL'],
    links: [],
  },
]
