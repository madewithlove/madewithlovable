

# madewithlovable — Guided Workflow App

## Overview
A step-by-step wizard app that guides users through de-risking their Lovable project, with a clean minimal design and progress tracking sidebar.

## Pages & Flow

### Landing Page (`/`)
- Hero section with the "madewithlovable" branding (all lowercase)
- Three key points presented as cards/callouts:
  - "Lovable is good for agility and fast to market"
  - "But it has structural risks like production-grade stability"
  - "Developers can't fully own the code"
- Value proposition: madewithlovable helps set up a protected production environment with guardrails
- "Start Now" CTA button → navigates to Step 1

### Wizard Layout
- Left sidebar showing all steps with status indicators (pending, current, completed/skipped)
- Main content area for the active step
- Steps: Project URL → GitHub → Guardrails → Local Setup → Self-Hosting → Done

### Step 1: Project URL
- Input field for Lovable project URL
- Real-time validation: must match `lovable.dev/projects/{uuid}` pattern
- Extract the project UUID for use in subsequent steps (stored in app state)
- "Next" button (enabled only when valid)

### Step 2: Connect to GitHub
- Explanation of why GitHub export matters
- Dynamic link (using extracted UUID): opens Lovable project GitHub settings in new tab
- Link to Lovable docs (https://docs.lovable.dev/integrations/github)
- "Next" button to proceed

### Step 3: Guardrails (skippable)
- Instructions to add `LOVABLE.md` to repo root, with a download button (placeholder file for now)
- Dynamic link to Lovable Knowledge settings (using UUID)
- Copyable text block with the knowledge instructions
- "Next" and "Skip for now" buttons

### Step 4: Local Setup (skippable)
- Git clone instructions with copyable command
- Docker.zip download button (placeholder for now)
- Link to install Docker
- Instructions: run `docker-compose up`, access at `http://localhost:8090`
- "Next" and "Skip for now" buttons

### Step 5: Production Self-Hosting (skippable)
- Instructions to create a `production` branch in GitHub
- Git workflows download (placeholder zip for now)
- Explanation of the 3 automated actions (Claude PR, review, approval)
- Note about Claude app + ANTHROPIC_KEY secret
- Terraform/S3+CloudFront setup option (placeholder zip)
- "Next" and "Skip for now" buttons

### Completion Page
- "Congratulations, your Lovable project is now de-risked!" message
- Summary of completed vs skipped steps
- Option to go back and complete skipped steps

## Design
- Clean, minimal, professional look — dark navy/slate tones with subtle accent color
- All lowercase branding throughout
- Step sidebar with checkmarks (✓), skip indicators (~), and numbered circles
- Smooth transitions between steps

## State Management
- React context to hold project UUID, current step, and step statuses (completed/skipped/pending)
- All client-side, no backend needed

