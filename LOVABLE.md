# Lovable Guardrails

## Do NOT modify

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- Any file inside `terraform/`
- Any file inside `.github/`
- Any file inside `.claude/`
- Any file inside `.vscode/`
- `LOVABLE.md`
- `CLAUDE.md`

## Do NOT create

- New Supabase edge functions inside `supabase/functions/`
- New Docker or infrastructure-related files

## Scope

Lovable should only modify application source code inside `src/`, configuration files for the frontend build (e.g. `vite.config.ts`, `tailwind.config.ts`, `package.json`), and Supabase migrations inside `supabase/migrations/`.
