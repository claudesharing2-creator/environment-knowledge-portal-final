# Environment Knowledge & Handover Portal — Implementation Notes

## What is implemented

This project is a source-grounded dashboard for the audited Environment knowledge base. It uses the full-stack WebDev template with React, Tailwind, Express, tRPC, Drizzle and Manus OAuth. The sidebar covers the approved portal navigation, while the Home, Start Here, Learning Path, Topics, Tasks, Workflows, I’m Taking Over, Sites, Monitoring, Compliance, Documents, Glossary, FAQ, Knowledge Gaps, Conflicts, AI Assistant and Search surfaces are available in the preview.

The database contains a normalized `portal_records` read model plus user-owned `handover_projects`, `handover_items` and `handover_notes` tables. The imported seed records are generated from `/home/ubuntu/env_audit/audit_outputs` and `/home/ubuntu/env_audit/phase2_outputs` by `server/seed.ts` and `server/seed-data.json`. The source inventory is not altered by this application.

## Seed provenance

The initial database import contains 1,237 source-grounded records: 89 documents, 11 domains, 6 workflows, 17 tasks, 12 roles, 243 sites, 26 regulations, 139 parameters, 660 glossary terms, 30 knowledge gaps and 4 conflicts. Each record retains its original structured data and source references in `portal_records.data` and `portal_records.sourceRefs`.

## Evidence and status policy

The UI uses visible status labels and icons for SOURCE_VERIFIED, SOURCE_SUPPORTED, PARTIAL_EVIDENCE, CONFLICTING, REQUIRES_HUMAN_REVIEW, HISTORICAL, SUPERSEDED and NOT_FOUND. A status is never communicated by color alone. Task details render absent fields as PARTIAL_EVIDENCE rather than inventing values. Conflict details show Source A and Source B side by side and do not resolve them.

## AI assistant policy

The `portal.aiAsk` procedure retrieves matching seeded records before any model call. It returns NOT_FOUND when evidence is absent, returns CONFLICTING without synthesis when a conflict record matches, and labels results PARTIAL_EVIDENCE when unresolved gaps are included. Otherwise, the server-side built-in LLM receives only the retrieved evidence and is instructed not to invent company-specific procedures, limits, responsibilities or legal conclusions. Citations are returned with every supported response.

## Local development

Use `pnpm dev` for the development server, `pnpm check` for TypeScript validation, `pnpm test` for Vitest, and `pnpm build` for the production build. To regenerate and import the audit seed after updating the audit package, run the reproducible generator from the audit workspace, then run `pnpm tsx server/seed.ts` from this project. Schema changes must be generated with `pnpm drizzle-kit generate`, reviewed, and applied through the managed database migration workflow.

## Known limitations

The current release uses a compact normalized read model and deterministic keyword retrieval rather than a separate vector database. Search and AI retrieval are intentionally conservative. Handover progress notes are persisted for authenticated users, while document uploads, administrative editing, embeddings, and a background ingestion worker remain follow-up work for a later implementation milestone.

## Environment variables

The WebDev runtime injects `DATABASE_URL` for the MySQL/TiDB database, `JWT_SECRET` for session signing, `VITE_APP_ID`, `OAUTH_SERVER_URL` and `VITE_OAUTH_PORTAL_URL` for Manus OAuth, `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY` for server-side built-in LLM access, and the `OWNER_*` variables for ownership context. The portal does not commit `.env` files or hardcode secrets. Frontend code uses only the template-provided public configuration through the existing auth and tRPC bindings.

## Deployment and runtime considerations

The application is designed for the managed single-process Autoscale runtime. Read-model retrieval is local and bounded, while AI synthesis is request-scoped and guarded by retrieved evidence; no always-on worker is required for the current release. The seed import is an administrative operation and is not run during web requests. Large document ingestion, embedding generation, vector indexing and scheduled refresh jobs should be added as a separate worker or persistent service rather than placed inside the request process. Before production publishing, verify OAuth redirect configuration, database SSL settings, built-in LLM availability, and the seed-data provenance checksum in the deployment environment.
