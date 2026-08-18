import { IProject, IExperience } from '@/types';
import type { TicketGradient, TicketTexture } from '@/components/ui/admit-one-ticket';

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

export type ContactTicket = {
  id: (typeof CONTACT_LINKS)[number]['id'];
  href: string;
  copyValue?: string;
  name: string;
  presenter: string;
  event: string;
  venue: string;
  dates: string;
  stubText: string;
  watermark: string;
  texture: TicketTexture;
  gradient: TicketGradient;
};

export const CONTACT_TICKETS: ContactTicket[] = [
  {
    id: 'email',
    href: `mailto:${GENERAL_INFO.email}?subject=${encodeURIComponent(GENERAL_INFO.emailSubject)}&body=${encodeURIComponent(GENERAL_INFO.emailBody)}`,
    copyValue: GENERAL_INFO.email,
    name: 'Chethana G',
    presenter: 'Portfolio presents',
    event: 'Direct Line · Email',
    venue: 'Projects & collabs',
    dates: 'Open 24/7',
    stubText: 'Admit one',
    watermark: 'MAIL',
    texture: {
      engine: 'generative',
      colorBack: '#485d60',
      colorFront: '#e3eae4',
      colorHighlight: '#b5c7b7',
      shape: 'swirl',
      type: '4x4',
      size: 1.2,
      scale: 1.1,
      speed: 0.35,
    },
    gradient: {
      centreX: 0.55,
      centreY: 0.35,
      radius: 0.62,
      midStop: 0.42,
      colorLight: '#e3eae4',
      colorMid: '#b5c7b7',
      colorDark: '#485d60',
    },
  },
  {
    id: 'linkedin',
    href: GENERAL_INFO.linkedin,
    name: 'Chetx27',
    presenter: 'Professional lane',
    event: 'LinkedIn · Network',
    venue: 'Collabs & updates',
    dates: '2026',
    stubText: 'Admit one',
    watermark: 'IN',
    texture: {
      engine: 'generative',
      colorBack: '#485d60',
      colorFront: '#738296',
      colorHighlight: '#e3eae4',
      shape: 'wave',
      type: '8x8',
      size: 1.4,
      scale: 1.15,
      speed: 0.28,
    },
    gradient: {
      centreX: 0.68,
      centreY: 0.28,
      radius: 0.55,
      midStop: 0.48,
      colorLight: '#e3eae4',
      colorMid: '#738296',
      colorDark: '#485d60',
    },
  },
  {
    id: 'discord',
    href: GENERAL_INFO.discord,
    copyValue: GENERAL_INFO.discordHandle,
    name: GENERAL_INFO.discordHandle,
    presenter: 'Fast lane',
    event: 'Discord · Yap',
    venue: 'DMs & voice',
    dates: 'Always on',
    stubText: 'Admit one',
    watermark: 'DC',
    texture: {
      engine: 'generative',
      colorBack: '#0c100c',
      colorFront: '#738296',
      colorHighlight: '#b5c7b7',
      shape: 'dots',
      type: 'random',
      size: 0.9,
      scale: 1.25,
      speed: 0.45,
    },
    gradient: {
      centreX: 0.4,
      centreY: 0.45,
      radius: 0.7,
      midStop: 0.38,
      colorLight: '#738296',
      colorMid: '#485d60',
      colorDark: '#0c100c',
    },
  },
  {
    id: 'medium',
    href: GENERAL_INFO.medium,
    name: 'Chetx27',
    presenter: 'Think pieces',
    event: 'Medium · Writing',
    venue: 'Essays & culture',
    dates: '2026',
    stubText: 'Admit one',
    watermark: 'MD',
    texture: {
      engine: 'generative',
      colorBack: '#485d60',
      colorFront: '#b5c7b7',
      colorHighlight: '#e3eae4',
      shape: 'ripple',
      type: '2x2',
      size: 1.1,
      scale: 1.05,
      speed: 0.32,
    },
    gradient: {
      centreX: 0.52,
      centreY: 0.22,
      radius: 0.6,
      midStop: 0.44,
      colorLight: '#e3eae4',
      colorMid: '#b5c7b7',
      colorDark: '#485d60',
    },
  },
];

/** Spotify — profile link + public playlist embed (user pages can't embed) */
export const SPOTIFY = {
  handle: 'chetx27',
  profileUrl:
    'https://open.spotify.com/user/olwfu6bl1rglx7q45fjf1b643?si=a30d15303f474047',
  // Chill Hits — public Spotify playlist (user/profile embeds 404)
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

/** Top 4 stack groups */
export const MY_STACK = {
  frontend: [
    { name: 'Next.js', icon: '/logo/next.png' },
    { name: 'React', icon: '/logo/react.png' },
    { name: 'TypeScript', icon: '/logo/js.png' },
  ],
  backend: [
    { name: 'Node.js', icon: '/logo/node.png' },
    { name: 'MongoDB', icon: '/logo/mongodb.png' },
    { name: 'Firebase', icon: '/logo/express.png' },
  ],
  ai: [
    { name: 'Python', icon: '/logo/js.png' },
    { name: 'OpenCV', icon: '/logo/gsap.png' },
    { name: 'PyTorch', icon: '/logo/prisma.png' },
  ],
  tools: [
    { name: 'Git', icon: '/logo/git.png' },
    { name: 'GitHub', icon: '/logo/github.png' },
    { name: 'Figma', icon: '/logo/framer-motion.png' },
  ],
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
      },
      {
        title: 'SheFi Scholar 2025',
        duration: 'Oct 2025 — Dec 2025 · 3 mos',
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
      },
      {
        title: 'Social Media Lead',
        duration: 'Oct 2024 — Oct 2025 · 1 yr 1 mo',
        skills: ['Social Media Management'],
      },
    ],
  },
];

const thumb = (file: string) => `/projects/thumbnail/${file}`;
const long = (file: string) => `/projects/long/${file}`;

/** 5 selected projects — each links to GitHub */
export const PROJECTS: IProject[] = [
  {
    title: 'tarang4all',
    slug: 'tarang4all',
    year: 2025,
    description: 'Live radio signal monitoring across Indian cities with AI pattern detection.',
    role: '',
    techStack: ['Next.js', 'TypeScript', 'Signal Processing', 'AI'],
    thumbnail: thumb('mti-electronics.webp'),
    longThumbnail: long('mti-electronics.webp'),
    images: [],
    sourceCode: 'https://github.com/chetx27/tarang4all',
    liveUrl: 'https://tarang4all.vercel.app',
  },
  {
    title: 'Rootfood',
    slug: 'rootfood',
    year: 2026,
    description: 'Fresh producer ecommerce connecting consumers with sustainable local sources.',
    role: '',
    techStack: ['Ecommerce', 'Full Stack', 'React'],
    thumbnail: thumb('epikcart.jpg'),
    longThumbnail: long('epikcart.jpg'),
    images: [],
    sourceCode: 'https://github.com/chetx27/therootfood',
  },
  {
    title: 'ragepaint',
    slug: 'ragepaint',
    year: 2025,
    description: 'High performance React drawing app with dual canvas and WCAG AA support.',
    role: '',
    techStack: ['React', 'TypeScript', 'Canvas', 'Vite'],
    thumbnail: thumb('devLinks.jpg'),
    longThumbnail: long('devLinks.jpg'),
    images: [],
    sourceCode: 'https://github.com/chetx27/ragepaint',
  },
  {
    title: 'TrinetraAI',
    slug: 'trinetraai',
    year: 2024,
    description: 'Webcam based desktop control for disabled and elderly users.',
    role: '',
    techStack: ['Python', 'OpenCV', 'MediaPipe'],
    thumbnail: thumb('resume-roaster.jpg'),
    longThumbnail: long('resume-roaster.jpg'),
    images: [],
    sourceCode: 'https://github.com/chetx27/TrinetraAI',
  },
  {
    title: 'canopy',
    slug: 'canopy',
    year: 2026,
    description:
      'AI for detecting tree loss, predicting climate risk, and optimizing city interventions.',
    role: '',
    techStack: ['Python', 'Geospatial AI', 'Remote Sensing'],
    thumbnail: thumb('property-pro.jpg'),
    longThumbnail: long('property-pro.jpg'),
    images: [],
    sourceCode: 'https://github.com/chetx27/canopy',
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
