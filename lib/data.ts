import { IProject, IExperience } from '@/types';

export const GENERAL_INFO = {
  email: 'chethana.workspace@gmail.com',
  emailSubject: "Let's collaborate on a project",
  emailBody: 'Hi Chethana, I am reaching out because...',
  github: 'https://github.com/chetx27',
  githubUser: 'chetx27',
  linkedin: 'https://www.linkedin.com/in/chetx27/',
  medium: 'https://medium.com/@chetx27',
  discordHandle: 'chetx27',
  discord: 'https://discord.com/users/chetx27',
};

export const CONTACT_LINKS = [
  {
    id: 'email',
    label: 'Email',
    handle: GENERAL_INFO.email,
    hint: 'Best for projects & collabs',
    href: `mailto:${GENERAL_INFO.email}?subject=${encodeURIComponent(GENERAL_INFO.emailSubject)}&body=${encodeURIComponent(GENERAL_INFO.emailBody)}`,
    blockColor: '#e3eae4',
    blockTextColor: '#0c100c',
    glow: 'rgba(227, 234, 228, 0.35)',
    copyValue: GENERAL_INFO.email,
    wide: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/chetx27',
    hint: 'Professional network',
    href: GENERAL_INFO.linkedin,
    blockColor: '#738296',
    blockTextColor: '#e3eae4',
    glow: 'rgba(115, 130, 150, 0.45)',
  },
  {
    id: 'discord',
    label: 'Discord',
    handle: `@${GENERAL_INFO.discordHandle}`,
    hint: 'Fastest way to yap',
    href: GENERAL_INFO.discord,
    blockColor: '#485d60',
    blockTextColor: '#e3eae4',
    glow: 'rgba(72, 93, 96, 0.5)',
    copyValue: GENERAL_INFO.discordHandle,
  },
  {
    id: 'medium',
    label: 'Medium',
    handle: '@chetx27',
    hint: 'Essays & long reads',
    href: GENERAL_INFO.medium,
    blockColor: '#b5c7b7',
    blockTextColor: '#0c100c',
    glow: 'rgba(181, 199, 183, 0.4)',
  },
] as const;

/** Spotify — profile link + public playlist embed (user pages can't embed) */
export const SPOTIFY = {
  handle: 'chetx27',
  profileUrl:
    'https://open.spotify.com/user/olwfu6bl1rglx7q45fjf1b643?si=a30d15303f474047',
  embedUrl:
    'https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator&theme=0',
};

export const SOCIAL_LINKS = [
  { name: 'github', url: GENERAL_INFO.github },
  { name: 'linkedin', url: GENERAL_INFO.linkedin },
  { name: 'discord', url: GENERAL_INFO.discord },
  { name: 'medium', url: GENERAL_INFO.medium },
  { name: 'spotify', url: SPOTIFY.profileUrl },
  { name: 'email', url: `mailto:${GENERAL_INFO.email}` },
];

/** Engineering areas — grouped by domain, not a logo wall */
export const MY_STACK: Record<string, string[]> = {
  'AI / ML': ['Python', 'OpenCV', 'PyTorch', 'Computer Vision', 'Signal Processing'],
  'Systems / Backend': ['Node.js', 'MongoDB', 'Firebase'],
  'Frontend': ['Next.js', 'React', 'TypeScript'],
  'Tools / Infrastructure': ['Git', 'GitHub', 'Figma'],
};

export const MY_EXPERIENCE: IExperience[] = [
  {
    company: 'McKinsey.org',
    logo: 'https://www.google.com/s2/favicons?domain=mckinsey.org&sz=128',
    employmentType: 'Full-time',
    location: 'Bengaluru · Remote',
    blockColor: '#485d60',
    blockTextColor: '#e3eae4',
    roles: [
      {
        title: 'Forward Graduate',
        duration: 'Apr 2026 — Present · 5 mos',
        contribution:
          'Selected for McKinsey.org Forward — a leadership program focused on problem-solving, systems thinking, and building solutions for real-world challenges.',
      },
    ],
  },
  {
    company: 'Dora DAO',
    logo: 'https://www.google.com/s2/favicons?domain=doradao.substack.com&sz=128',
    employmentType: 'Fellowship',
    location: 'Remote',
    blockColor: '#b5c7b7',
    blockTextColor: '#0c100c',
    roles: [
      {
        title: 'Girls Who Yap Fellow 2026',
        duration: 'Jul 2026 — Present · 1 mo',
        skills: ['AI', 'Building in Public'],
        contribution:
          'Building AI projects in public — documenting the process, sharing learnings, and contributing to an open builder community.',
      },
    ],
  },
  {
    company: 'TEDxCITBengaluru',
    logo: 'https://www.google.com/s2/favicons?domain=ted.com&sz=128',
    employmentType: 'Full-time',
    location: 'Bengaluru · On-site',
    blockColor: '#738296',
    blockTextColor: '#e3eae4',
    roles: [
      {
        title: 'Media Team',
        duration: 'Oct 2025 — Present · 11 mos',
        contribution:
          'Producing visual content and media assets for TEDx events — filming, editing, and shaping how ideas are presented on stage and online.',
      },
    ],
  },
  {
    company: 'SheFi',
    logo: 'https://www.google.com/s2/favicons?domain=shefi.org&sz=128',
    employmentType: 'Full-time · 7 mos',
    blockColor: '#b5c7b7',
    blockTextColor: '#0c100c',
    roles: [
      {
        title: 'SheFi Scholar 2026',
        duration: 'Jan 2026 — Apr 2026 · 4 mos',
        skills: ['Web3', 'Blockchain'],
        contribution:
          'Completed SheFi Scholar program — hands-on exploration of Web3, DeFi protocols, and blockchain infrastructure.',
      },
      {
        title: 'SheFi Scholar 2025',
        duration: 'Oct 2025 — Dec 2025 · 3 mos',
        contribution:
          'First cohort — foundational Web3 education covering smart contracts, on-chain identity, and decentralized systems.',
      },
    ],
  },
  {
    company: 'GirlScript Summer of Code',
    logo: 'https://www.google.com/s2/favicons?domain=girlscript.tech&sz=128',
    employmentType: 'Full-time',
    location: 'Bengaluru · Hybrid',
    blockColor: '#485d60',
    blockTextColor: '#e3eae4',
    roles: [
      {
        title: 'Campus Ambassador',
        duration: 'Jul 2025 — Oct 2025 · 4 mos',
        skills: ['Open-Source Development', 'Social Media'],
        contribution:
          'Drove open-source participation on campus — organized workshops, promoted GSSoC contributions, and managed community outreach channels.',
      },
    ],
  },
  {
    company: 'GDG Cambridge Institute of Technology',
    logo: 'https://www.google.com/s2/favicons?domain=developers.google.com&sz=128',
    employmentType: 'Full-time · 1 yr 1 mo',
    location: 'Bengaluru · On-site',
    blockColor: '#e3eae4',
    blockTextColor: '#0c100c',
    roles: [
      {
        title: 'Curator',
        duration: 'Sep 2025 — Oct 2025 · 2 mos',
        contribution:
          'Curated developer events and speaker lineups for GDG CIT — planning sessions, coordinating logistics, and shaping event programming.',
      },
      {
        title: 'Social Media Lead',
        duration: 'Oct 2024 — Oct 2025 · 1 yr 1 mo',
        skills: ['Social Media Management'],
        contribution:
          'Led GDG CIT\'s social presence for a year — content strategy, event promotion, and growing the local developer community online.',
      },
    ],
  },
];

const thumb = (file: string) => `/projects/thumbnail/${file}`;
const long = (file: string) => `/projects/long/${file}`;

/** Selected projects — AI/ML first, each with case study depth */
export const PROJECTS: IProject[] = [
  {
    title: 'TrinetraAI',
    slug: 'trinetraai',
    year: 2024,
    description:
      'Hands-free desktop control for users who can\'t rely on keyboard and mouse.',
    highlight:
      'Built a real-time gesture pipeline mapping webcam input to OS-level actions.',
    role: 'Solo engineer — computer vision, gesture mapping, desktop integration.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'Real-time Inference'],
    thumbnail: thumb('trinetraai.png'),
    longThumbnail: long('trinetraai.png'),
    images: [],
    sourceCode: 'https://github.com/chetx27/TrinetraAI',
    caseStudy: {
      problem:
        'Conventional desktop interfaces assume full keyboard and mouse access — leaving users with limited mobility dependent on expensive assistive hardware.',
      whyInteresting:
        'Turns a commodity webcam into an accessibility interface using real-time computer vision, not specialized hardware.',
      built: [
        'Webcam-based gesture recognition pipeline',
        'Gesture-to-action mapping for desktop control',
        'Real-time inference loop with OpenCV + MediaPipe',
      ],
      technical: [
        'Python',
        'OpenCV',
        'MediaPipe hand tracking',
        'Real-time video processing',
        'Desktop automation hooks',
      ],
      challenge:
        'Low-latency gesture detection that remains reliable across varying lighting and camera angles.',
    },
  },
  {
    title: 'tarang4all',
    slug: 'tarang4all',
    year: 2025,
    description:
      'Live radio signal monitoring across Indian cities with AI pattern detection.',
    highlight:
      'Built a signal ingestion + visualization pipeline with ML-assisted anomaly detection.',
    role: 'Full stack — signal processing, dashboard, AI pattern layer.',
    techStack: ['Next.js', 'TypeScript', 'Signal Processing', 'AI'],
    thumbnail: thumb('tarang4all.png'),
    longThumbnail: long('tarang4all.png'),
    images: [],
    sourceCode: 'https://github.com/chetx27/tarang4all',
    liveUrl: 'https://tarang4all.vercel.app',
    caseStudy: {
      problem:
        'Radio signal patterns across cities are hard to monitor at scale — anomalies get missed until someone is already watching.',
      whyInteresting:
        'Combines live signal ingestion with AI-assisted pattern detection on real-world broadcast data.',
      built: [
        'Live signal monitoring dashboard',
        'Multi-city signal visualization',
        'AI layer for pattern and anomaly detection',
      ],
      technical: [
        'Next.js',
        'TypeScript',
        'Signal processing pipeline',
        'Real-time data visualization',
        'ML pattern detection',
      ],
      challenge:
        'Processing and visualizing continuous signal streams while surfacing meaningful patterns without drowning in noise.',
    },
  },
  {
    title: 'canopy',
    slug: 'canopy',
    year: 2026,
    description:
      'Detecting urban tree loss and climate risk from geospatial data.',
    highlight:
      'Designed a geospatial AI pipeline for tree-loss detection and intervention planning.',
    role: 'ML engineer — remote sensing, geospatial models, analysis pipeline.',
    techStack: ['Python', 'Geospatial AI', 'Remote Sensing'],
    thumbnail: thumb('canopy.png'),
    longThumbnail: long('canopy.png'),
    images: [],
    sourceCode: 'https://github.com/chetx27/canopy',
    caseStudy: {
      problem:
        'Cities lose tree cover faster than manual surveys can track — making climate risk hard to quantify and interventions reactive.',
      whyInteresting:
        'Applies remote sensing and geospatial ML to an environmental problem with direct civic impact.',
      built: [
        'Tree loss detection from geospatial imagery',
        'Climate risk prediction layer',
        'City intervention optimization model',
      ],
      technical: [
        'Python',
        'Geospatial AI',
        'Remote sensing data processing',
        'Satellite/aerial imagery analysis',
      ],
      challenge:
        'Extracting reliable tree-loss signals from noisy geospatial data across varying urban densities.',
    },
  },
  {
    title: 'ragepaint',
    slug: 'ragepaint',
    year: 2025,
    description:
      'High-performance drawing engine that doesn\'t trade speed for accessibility.',
    highlight:
      'Dual-canvas architecture with WCAG AA compliance baked into the rendering layer.',
    role: 'Frontend engineer — canvas rendering, performance, accessibility.',
    techStack: ['React', 'TypeScript', 'Canvas', 'Vite'],
    thumbnail: thumb('ragepaint.png'),
    longThumbnail: long('ragepaint.png'),
    images: [],
    sourceCode: 'https://github.com/chetx27/ragepaint',
    caseStudy: {
      problem:
        'Most browser drawing apps force a choice — smooth performance or accessible design, rarely both.',
      built: [
        'Dual-canvas rendering architecture',
        'High-performance stroke engine in React',
        'WCAG AA compliant color and interaction patterns',
      ],
      technical: [
        'React',
        'TypeScript',
        'HTML Canvas API',
        'Vite build pipeline',
        'Performance-optimized render loop',
      ],
      challenge:
        'Maintaining 60fps drawing on dual canvases while meeting accessibility contrast and interaction requirements.',
    },
  },
  {
    title: 'Rootfood',
    slug: 'rootfood',
    year: 2026,
    description:
      'Direct-to-consumer marketplace connecting buyers with local sustainable producers.',
    highlight:
      'Full-stack ecommerce with producer onboarding and order flow.',
    role: 'Full stack — product, frontend, backend integration.',
    techStack: ['React', 'Full Stack', 'Ecommerce'],
    thumbnail: thumb('rootfood.png'),
    longThumbnail: long('rootfood.png'),
    images: [],
    sourceCode: 'https://github.com/chetx27/therootfood',
    caseStudy: {
      problem:
        'Small sustainable food producers lack direct digital channels to reach local consumers.',
      built: [
        'Producer-facing onboarding flow',
        'Consumer marketplace with product catalog',
        'Order and checkout pipeline',
      ],
      technical: [
        'React',
        'Full-stack architecture',
        'Ecommerce data models',
        'REST API integration',
      ],
    },
  },
];

export const BLOG_POSTS = [
  {
    title: 'so… is vibecoding actually making us dumber?',
    excerpt:
      'Being an engineering major, I use AI to code — and I started asking an uncomfortable question: am I actually learning anything?',
    date: 'Jun 21, 2026',
    readTime: '4 min read',
    tags: ['Vibe Coding', 'Tech'],
    url: 'https://medium.com/@chetx27/so-is-vibecoding-actually-making-us-dumber-81d5f0a8a04b',
    blockColor: '#485d60',
    blockTextColor: '#e3eae4',
  },
  {
    title: 'Why Is Gen Z Behind Every Trend? (And Why They\'re Also the First to Kill It)',
    excerpt:
      'Blink and it\'s already over. One week it\'s office siren, the next tomato girl summer — Gen Z doesn\'t follow trends, they are the trend machine.',
    date: 'May 30, 2026',
    readTime: '4 min read',
    tags: ['Gen Z', 'Culture'],
    url: 'https://medium.com/@chetx27/why-is-gen-z-behind-every-trend-and-why-theyre-also-the-first-to-kill-it-ab9fbd887ed8?sharedUserId=chetx27',
    blockColor: '#738296',
    blockTextColor: '#e3eae4',
  },
];
