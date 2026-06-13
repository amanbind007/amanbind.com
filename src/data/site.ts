export const site = {
  name: 'Aman Bind',
  domain: 'amanbind.com',
  url: 'https://amanbind.com',
  role: 'Platform & DevSecOps Engineer',
  // Rotated by the hero typewriter.
  roles: [
    'Platform & DevSecOps Engineer',
    'CI/CD & Release Automation',
    'AWS Solutions Architect (Pro)',
    'Observability & SRE',
    'iOS / SwiftUI Developer',
  ],
  tagline:
    'I build the delivery machinery that lets product teams ship without fear — pipelines, observability, and cloud architecture.',
  location: 'Bengaluru, Karnataka, India',
  email: 'amanbind007@gmail.com',
  resumePath: '/resume.pdf',
  availability: 'Open to Platform / DevSecOps / SRE / Cloud Architect roles',
  socials: {
    github: 'https://github.com/amanbind007',
    linkedin: 'https://www.linkedin.com/in/amanbind',
    credly: 'https://www.credly.com/users/amanbind007',
    email: 'mailto:amanbind007@gmail.com',
  },
} as const;

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
] as const;
