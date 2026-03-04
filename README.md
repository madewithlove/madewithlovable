# madewithlovable

A step-by-step guide to de-risking your [Lovable](https://lovable.dev) project for production use.

Lovable is excellent for agility and speed-to-market, but shipping AI-generated code to production without guardrails introduces structural risks — from unreviewed changes breaking infrastructure to vendor lock-in on hosting. This project provides a repeatable playbook to mitigate those risks while keeping the benefits of rapid AI-assisted development.

- **Lovable-hosted:** [made-with.lovable.app](https://made-with.lovable.app)
- **Self-hosted (AWS):** [d12vini1os6dc2.cloudfront.net](https://d12vini1os6dc2.cloudfront.net)

---

## What This Is

An interactive wizard that walks you through six steps to establish ownership, safety, and operational independence over a Lovable-built application. Each step is optional (except the first), so you can adopt only what makes sense for your project.

---

## The Six Steps

### 1. Project URL

Enter your Lovable project URL. The wizard extracts the project UUID and uses it to generate context-aware links throughout the remaining steps (e.g., direct links to your project's GitHub settings, Knowledge configuration, etc.).

### 2. Connect to GitHub

Export your Lovable project to a GitHub repository. This is the foundation of everything else — without version control, you can't review changes, run CI/CD, or deploy independently. Lovable syncs commits bidirectionally, so you keep the AI editor workflow while gaining full Git history.

### 3. Guardrails

Add a `LOVABLE.md` file to your repository root that scopes what the AI is allowed to modify. This file acts as a contract: Lovable (and any other AI agent) should only touch application source code inside `src/`, frontend build configuration, and database migrations. Protected files include:

- Infrastructure (`Dockerfile`, `docker-compose.yml`, `terraform/`)
- CI/CD pipelines (`.github/`)
- The guardrails file itself (`LOVABLE.md`)

The guardrails are enforced in two ways:
1. **At authoring time** — by registering `LOVABLE.md` as custom knowledge in your Lovable project settings, so the AI respects the boundaries while generating code.
2. **At merge time** — by the CI/CD pipeline's automated review (see Step 6).

### 4. Local Development Setup

Run the full application locally using Docker, independent of Lovable's preview environment. This enables:

- Working in your preferred IDE or with other AI coding agents (Cursor, Claude Code, etc.)
- Offline development
- Running the test suite locally
- Building production artifacts

The setup is a single command: `docker-compose up`, which starts a development server on `localhost:8081` with hot-reloading and volume-mounted source code.

### 5. Production Self-Hosting

Decouple your production environment from Lovable's hosting. The guide covers:

- **Creating a `production` branch** in GitHub to separate what's deployed from what's being developed.
- **AWS S3 + CloudFront** as the hosting infrastructure (private S3 bucket as origin, CloudFront for delivery). Terraform configuration is provided, but manual setup via the AWS Console works too.
- **Building and deploying** — running `npm run build` (locally or via Docker) and uploading the `dist/` folder to S3.
- **Lovable Cloud (Supabase) considerations** — by default, self-hosted frontends share the same backend. For a dedicated production database, a manual migration to a managed Supabase instance is required.

**Key technical notes:**
- CloudFront must have `index.html` set as the Default root object.
- Lovable occasionally desyncs `package-lock.json` from `package.json`. If `npm ci` fails, use `npm install` and commit the updated lock file.

### 6. CI/CD Pipeline

Three GitHub Actions workflows automate the release process:

| Workflow | Trigger | Purpose |
|---|---|---|
| `initiate-release.yml` | Manual (workflow_dispatch) | Creates a PR from `main` → `production` with an auto-generated changelog |
| `ci-guardrails.yml` | PR to `production` | Claude reviews the diff against `LOVABLE.md` guardrails — approves and merges if clean, requests changes if violations are found |
| `deploy.yml` | Push to `production` | Builds the app, syncs to S3, and invalidates the CloudFront cache |

**Required setup:**
- Install the [Claude GitHub app](https://github.com/apps/claude) on your repository
- Add the `ANTHROPIC_API_KEY` secret (from [Anthropic Console](https://console.anthropic.com/settings/keys))
- Add AWS IAM credentials as secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) with permissions for S3 and CloudFront
- Add GitHub Actions **variables**: `S3_BUCKET` and `CLOUDFRONT_DISTRIBUTION_ID`
- If using Lovable Cloud: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` as secrets
- Enable "Allow GitHub Actions to create and approve pull requests" in your organization/repository settings

**The release flow:**
1. A non-technical user (or anyone) triggers the "Move main to production" workflow manually.
2. Claude generates a release PR with a summary of changes.
3. The guardrails workflow automatically reviews the PR diff — if all changes are within scope, it approves and merges. If guardrail violations are detected, it requests changes with inline comments.
4. On merge to `production`, the deploy workflow builds and publishes to AWS.

---

## Tech Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/) for step transitions

---

## Getting Started

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

Or with Docker:

```sh
docker-compose up
```

The app will be available at `http://localhost:8081`.
