export const projects = [
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Mijn persoonlijke portfolio website waarop mijn vaardigheden, projecten en ervaring als software developer worden getoond.',
    longDescription: 'Een volledig ontworpen en gebouwde portfolio met moderne React en Vite. De website showcases mijn werk, skills en ervaring op een visueel aantrekkelijke manier met smooth animations en responsive design.',
    link: 'https://jens.vanduinkerken.net',
    tags: ['React', 'Vite', 'CSS', 'Responsive Design'],
    featured: true,
    impact: 'Een professionele online presence die potentiële werkgevers en klanten indruk maakt. Verhoogde zichtbaarheid en betere positionering in zoekmachines.',
    lessonsLearned: 'Geleerd hoe belangrijk goed design en user experience zijn. Animaties en visuele hiërarchie dragen significant bij aan de indruk die een website maakt.'
  },
  {
    id: 'pulse720',
    title: 'Pulse 720',
    description: 'Een moderne AI-aangedreven applicatie met Vue.js frontend en Python backend. Ik heb significante bijdragen geleverd aan zowel frontend als AI integratie.',
    longDescription: 'Pulse 720 is een geavanceerde applicatie die AI-technologie combineert met een intuïtieve Vue.js interface. Ik heb gewerkt aan de integratie van AI APIs, het bouwen van responsive UI componenten en het optimaliseren van database queries.',
    link: 'https://app.pulse720.com',
    tags: ['Vue.js', 'Python', 'SQL', 'AI API', 'REST API'],
    featured: true,
    impact: 'Succesvol operationeel met duizenden gebruikers. AI integratie haalt automatisering naar 95% efficiency, wat significante tijd bespaart voor eindgebruikers.',
    lessonsLearned: 'Begrip gekregen van full-stack development en hoe frontend en backend samen moeten werken. Ook waardevolle ervaring met AI API integratie en het omgaan met real-time data.'
  },
  {
    id: 'padplanner',
    title: 'PadPlanner',
    description: 'Een gratis webapplicatie die willekeurige loop-, hardloop- en fietsroutes genereert. Gebruikers kunnen routes aanmaken op basis van afstand of duur, en ze exporteren in GPX-formaat.',
    longDescription: 'PadPlanner is een geïmplementeerd proof-of-concept dat het gebruik van maps APIs demonstreert. De applicatie genereert werkende routes op basis van gebruiker parameters, integreert met GPS/geolocation en biedt GPX export voor compatibiliteit met populaire fitness apps.',
    link: 'https://padplanner.vercel.app',
    tags: ['React', 'Maps API', 'Geolocation', 'GPX Export'],
    featured: true,
    impact: 'Nuttige tool voor sporters en wandelaars. Vele gebruikers hebben de applicatie gebruikt om nieuwe routes te ontdekken. Gedemonstreerd potentieel voor commercialisatie.',
    lessonsLearned: 'Diepte ervaring opgedaan met Google Maps API en geolocation services. Leerde over geospatiale data en route-generatie algoritmes.'
  },
  {
    id: 'curo',
    title: 'Curo.one',
    description: 'Een moderne CMS waarmee ondernemers hun websites kunnen beheren via natuurlijke taalcommando\'s in plaats van traditionele interfaces. Inclusief beveiliging, SEO en snelle laadtijden.',
    longDescription: 'Curo is een innovatief CMS dat AI en natural language processing gebruikt om website beheer te revolutioneren. In plaats van complexe interfaces kunnen gebruikers hun websites beheren door simpele commando\'s in het Nederlands. Bevat security best practices en is geoptimaliseerd voor performance.',
    link: 'https://curo.one',
    tags: ['CMS', 'AI', 'Natural Language', 'Security'],
    featured: true,
    impact: 'Een baanbrekend CMS dat het gemak van websitebeheer democratiseert voor niet-technische gebruikers. Potentieel grote markt voor small business en entrepreneurs.',
    lessonsLearned: 'Ingewikkelde AI integratie en NLP geleerd. Begrepen hoe machine learning models werken en hoe ze ingezet kunnen worden in praktische applicaties.'
  },
]

export const getProjectById = (id) => {
  return projects.find(p => p.id === id)
}
