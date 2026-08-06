# amanbind.com

Personal site and portfolio. Static build, deployed to S3 behind CloudFront.

**Stack:** [Astro 5](https://astro.build) · React 19 islands · Tailwind CSS v4 · MDX content collections
**Infrastructure:** S3 + CloudFront + Route 53 + ACM, described in Terraform
**Deploys:** GitHub Actions via OIDC — no long-lived AWS keys in the repo

---

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type check, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | `astro check` on its own |

Requires Node 20+.

---

## Themes

The whole palette is [Monokai Pro](https://monokai.pro). Seven filters ship —
six dark, one light:

| Filter | Mode |
| --- | --- |
| Classic | dark (default) |
| Octagon | dark |
| Machine | dark |
| Ristretto | dark |
| Spectrum | dark |
| Pacific | dark |
| Light Sun | light |

Each filter defines `--base1`…`--base8` and `--accent1`…`--accent6` in
`src/styles/global.css`, following the upstream palette structure. Semantic
tokens (`--c-bg`, `--c-text`, `--c-accent`, …) are derived from those, and
components only ever reference the semantic layer — so adding a filter means
adding one block of variables and one entry in `src/data/themes.ts`.

Selection persists in `localStorage`. An inline script in `BaseLayout.astro`
applies it before first paint, so there is no flash of the default palette;
first-time visitors get Light Sun or Classic depending on
`prefers-color-scheme`.

---

## Content

Everything editable lives in content collections and data files — no JSX
surgery required to update the site.

```
src/content/
  experience/      # roles: frontmatter + narrative body
  projects/        # case studies and repo write-ups
  certifications/  # AWS certifications
src/data/
  site.ts          # name, tagline, socials, headline stats
  skills.ts        # skill groups, career arc, education
  themes.ts        # Monokai Pro filter registry
```

Schemas are enforced in `src/content.config.ts`; a malformed frontmatter field
fails the build rather than rendering blank.

**Adding a project:** drop an `.mdx` file into `src/content/projects/`. Set
`category` to one of `platform | observability | cloud | ios | ml | homelab`,
give it an `order` (higher sorts first), and set `featured: true` to surface it
on the homepage.

---

## Deployment

### One-time infrastructure

Prerequisites: the domain's Route 53 hosted zone already exists, and AWS
credentials are configured locally.

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars   # adjust as needed
terraform init
terraform plan
terraform apply
```

This provisions:

- **S3** — private origin bucket, versioned, encrypted, TLS-only, with
  noncurrent versions expiring after 30 days
- **CloudFront** — OAC to the bucket (no public access, no website endpoint),
  HTTP/2 + IPv6, compression, security headers, and a viewer-request function
  that rewrites `/about` → `/about/index.html`
- **ACM** — DNS-validated certificate in `us-east-1` covering apex and `www`
- **Route 53** — A and AAAA aliases for both names
- **IAM** — a GitHub OIDC provider and a deploy role scoped to
  `repo:amanbind007/amanbind.com:ref:refs/heads/main`, permitted only to write
  to the bucket and create invalidations

If the AWS account already has the GitHub OIDC provider registered, set
`create_oidc_provider = false` — it is account-wide and creating a second one
fails.

### Wire up GitHub

Take the Terraform outputs and set them on the repository:

| Secret | Source |
| --- | --- |
| `AWS_DEPLOY_ROLE_ARN` | `terraform output deploy_role_arn` |
| `AWS_S3_BUCKET` | `terraform output bucket_name` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `terraform output distribution_id` |

Optionally set the `AWS_REGION` repository variable (defaults to `ap-south-1`).

### Shipping

Push to `main`. The workflow type checks, builds, then syncs in two passes —
fingerprinted `_astro/*` assets first with `max-age=31536000,immutable`, then
HTML with `max-age=0,must-revalidate` — and waits for the CloudFront
invalidation to complete before reporting success.

Assets before HTML matters: it guarantees no visitor is ever served a page
referencing an asset that has not landed yet.

---

## Repository layout

```
.github/workflows/   CI (pull requests) and deploy (main)
infra/terraform/     S3, CloudFront, ACM, Route 53, IAM/OIDC
public/              Static passthrough — favicon, robots.txt, résumé PDF
src/
  components/        Astro components (zero client JS)
  islands/           React — theme switcher, hero typewriter
  content/           MDX collections
  data/              Typed site content
  layouts/           BaseLayout: head, SEO, theme bootstrap
  pages/             Routes
  styles/global.css  Monokai Pro palettes + design tokens
```

---

## Outstanding

- [ ] Export the current résumé to `public/resume.pdf`
- [ ] Add `public/og.png` (1200×630) for link previews
- [ ] Fill in the three missing Credly badge URLs (see the `TODO` comments in
      `src/content/certifications/`) and confirm the exact title of the
      Generative AI certification
- [ ] Add `public/apple-touch-icon.png`
- [ ] Review the homelab project page — it lists a plausible stack rather than
      a verified inventory

---

## License

Code is MIT. Written content and the résumé are © Aman Bind.
