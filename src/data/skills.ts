export interface SkillGroup {
  title: string;
  /** Maps to a semantic colour token in global.css. */
  tone: 'accent' | 'info' | 'ok' | 'warn' | 'alt';
  note: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'CI/CD & Release Engineering',
    tone: 'accent',
    note: 'Where most of my day goes.',
    items: [
      'Jenkins (declarative + scripted)',
      'GitLab CI',
      'Groovy shared libraries',
      'Branching & delivery models',
      'Blue/green & rollback strategy',
      'Merge evaluation gates',
      'Artifact & backup pipelines',
      'GitLab package & container registry',
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    tone: 'info',
    note: 'Mostly AWS.',
    items: [
      'AWS (EC2, S3, VPC, IAM, Lambda, ECS, RDS, CloudFront, Route 53)',
      'Terraform',
      'Ansible',
      'Docker',
      'Podman',
      'Kubernetes',
      'Caddy / Nginx',
      'Linux administration',
      'Cloudflare (DNS, Tunnels, R2)',
    ],
  },
  {
    title: 'Observability & SRE',
    tone: 'ok',
    note: 'Metrics, logs and traces, and the automation on top of them.',
    items: [
      'OpenTelemetry',
      'OpenTelemetry Collector',
      'OpenSearch',
      'Prometheus',
      'Grafana',
      'Alertmanager',
      'Distributed tracing',
      'Automated root-cause analysis',
      'Apache Superset',
      'PostgreSQL / pgbouncer',
      'Production on-call',
    ],
  },
  {
    title: 'Security & Governance',
    tone: 'warn',
    note: 'Scanning, licensing and access control.',
    items: [
      'SonarQube',
      'Veracode',
      'FlexNet Code Insight (SCA)',
      'OSS licence compliance',
      'Policy-as-code access control',
      'WSO2 API management',
      'Keycloak / OIDC',
      'Bytebase (JIT DB access)',
      'GitLab OAuth / SSO',
    ],
  },
  {
    title: 'Languages',
    tone: 'alt',
    note: 'Ordered by how recently I shipped something in them.',
    items: ['Swift', 'Python', 'Bash', 'Groovy', 'YAML / HCL', 'Java', 'Dart', 'SQL', 'C / C++', 'TypeScript'],
  },
  {
    title: 'Application Development',
    tone: 'accent',
    note: 'The half of my background that came first.',
    items: [
      'SwiftUI',
      'UIKit',
      'Combine',
      'SwiftData / CoreData',
      'Flutter',
      'CoreML / CreateML / Vision',
      'REST APIs',
      'Firebase / Firestore',
      'MVVM',
    ],
  },
];

export interface TimelineEvent {
  year: string;
  label: string;
}

/** Compact narrative used on the About page. */
export const arc: TimelineEvent[] = [
  { year: '2019', label: 'Started B.Tech CSE at SVVV, Indore — iOS specialisation track' },
  { year: '2023', label: 'DataFlair internship: 40+ projects across iOS, Android, Python and web' },
  { year: '2023', label: 'Joined TCS; sole developer on a native SwiftUI iPad app for Baxter' },
  { year: '2024', label: 'Moved to Platform Solutions — SVN to GitLab, first Jenkins pipelines' },
  { year: '2024', label: 'Delivery model rewritten: 70+ microservices on governed CI/CD' },
  { year: '2025', label: 'OpenTelemetry RCA shipped into the product APM module; OSS/IP audit' },
  { year: '2026', label: 'Database access governance, artifact management; building the product Flutter client' },
];

export const education = {
  institution: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya',
  location: 'Indore, Madhya Pradesh',
  degree: 'B.Tech, Computer Science',
  specialisation: 'Specialisation in iOS Mobile Application Development (AATCe)',
  period: 'Jun 2019 — Jul 2023',
  grade: '8.75 / 10 CGPA',
  coursework: [
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Computer Networks',
    'iOS App Development',
  ],
};
