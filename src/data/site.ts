export const site = {
  name: 'Aman Bind',
  domain: 'amanbind.com',
  url: 'https://amanbind.com',
  role: 'Platform & DevSecOps Engineer',
  // Rotated by the hero typewriter.
  roles: [
    'Product Engineering',
    'Platform & DevSecOps Engineer',
    'CI/CD & Release Automation',
    'AWS Solutions Architect Professional',
    'GitOps & Git Whisperer',
    'GenAI, RAG & Agentic Workflows',
    'Observability & SRE',
    'Database & Access Governance',
  ],
  tagline:
    'Platform and DevSecOps engineer. I work on CI/CD, observability and AWS infrastructure.',
  summary:
    'Platform engineer at TCS, working on TCS Enterprise Manager — an enterprise ITSM/ITOM product. I moved a 75+ microservice estate off SVN and manual deploys onto GitLab, Jenkins and infrastructure-as-code. Deployment downtime went from about an hour to ten minutes, and reverts from about an hour to under thirty seconds. Six AWS certifications.',
  location: 'Bengaluru, Karnataka, India',
  email: 'amanbind007@gmail.com',
  emailAlt: 'itsme@amanbind.com',
  phone: '+91 83051-48293',
  resumePath: '/resume.pdf',
  availability: 'Open to DevOps / SRE / Platform / Cloud Architect roles',
  socials: {
    github: 'https://github.com/amanbind007',
    linkedin: 'https://www.linkedin.com/in/amanbind',
    credly: 'https://www.credly.com/users/amanbind007',
    goodreads: 'https://www.goodreads.com/amanbind',
    email: 'mailto:amanbind007@gmail.com',
    emailAlt: 'mailto:itsme@amanbind.com',
  },
} as const;

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Projects', href: '/projects' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Certifications', href: '/#certifications' },
  { label: 'About', href: '/about' },
] as const;

/** Headline numbers from the TEM platform rebuild. */
export const impactStats = [
  { value: '60 min → 10 min', label: 'Deployment downtime', tone: 'accent' },
  { value: '60 min → <30 s', label: 'Production revert', tone: 'ok' },
  { value: '6', label: 'AWS certifications', tone: 'info' },
  { value: '75+', label: 'Microservices on automated CI/CD', tone: 'warn' },
] as const;
