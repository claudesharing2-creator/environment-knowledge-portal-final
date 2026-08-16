# Project TODO

- [x] Establish the dashboard-style application shell with persistent sidebar navigation for Home, Start Here, Learning Path, Topics/Domains, Tasks/How-To, Workflows, I’m Taking Over, Sites & Facilities, Monitoring, Compliance, Documents, Glossary, FAQ, Knowledge Gaps, Conflicts/Verification, AI Assistant, and Search.
- [x] Apply the professional environmental visual system: deep green primary, slate/blue-gray secondary, warm white surfaces, readable sans-serif typography, accessible status colors with text/icons, and responsive sidebar-first behavior.
- [x] Define and migrate the seeded audit-derived data model for 11 knowledge domains, 17 tasks, 6 workflows, 12 roles, 16 site groups, 6 monitoring structures, 26 regulations, 139 parameters, 660 glossary terms, 4 conflicts, and 30 knowledge gaps.
- [x] Import real Phase 1–2 audit data with source identifiers and explicit citation metadata; do not fabricate unsupported operational content.
- [x] Implement reusable StatusBadge, EvidenceCard, CitationDrawer, and Trust Layer components.
- [x] Implement all eight evidence states: SOURCE_VERIFIED, SOURCE_SUPPORTED, PARTIAL_EVIDENCE, CONFLICTING, REQUIRES_HUMAN_REVIEW, HISTORICAL, SUPERSEDED, and NOT_FOUND.
- [x] Ensure status indicators always pair semantic color with visible text labels and/or icons.
- [x] Implement task/how-to detail pages with purpose, steps, inputs/outputs, required documents, roles, related regulations, knowledge gaps, citations, and visible PARTIAL_EVIDENCE controls for missing fields.
- [x] Implement the I’m Taking Over handover experience with source-derived task chooser, progress tracking, status fields, missing-information prompts, and user-owned handover notes.
- [x] Implement source-derived site and facility records with identity status, facilities, monitoring structures, parameters, and source citations.
- [x] Implement visually distinct compliance layers: regulations/standards, company requirements, permits/approvals, and practices/guidance.
- [x] Implement document library with original filenames, document type, status, source path, effective date, version, duplicates, and unprocessed-file handling.
- [x] Implement glossary and FAQ pages from seeded audit data with citations and uncertainty states.
- [x] Implement knowledge gaps and conflicts/verification pages with human-review workflows and Source A versus Source B comparison.
- [x] Implement keyword/full-text/metadata search across all approved knowledge entities with filters, facets, autocomplete, typo tolerance, and acronym/glossary expansion where supported.
- [x] Implement guarded source-grounded AI assistant using question classification, seeded knowledge retrieval, status-aware context assembly, citations, and SOURCE_SUPPORTED/PARTIAL_EVIDENCE/CONFLICTING/NOT_FOUND responses.
- [x] Ensure the AI never resolves conflicts, invents company-specific procedures, or answers company-specific questions from model memory alone.
- [x] Evaluate and use the prebuilt DashboardLayout and AIChatBox components where appropriate.
- [x] Add loading, empty, error, insufficient-evidence, conflict, permission, and source-unavailable states.
- [x] Add responsive desktop, laptop, tablet, and mobile field-reference behavior.
- [x] Add Vitest coverage for seeded data integrity, status policy, citation validation, conflict non-resolution, AI refusal behavior, and key tRPC procedures.
- [x] Run type checks, tests, and visual verification screenshots for the primary routes.
- [x] Document local setup, ingestion/update workflow, seeded-data provenance, AI/RAG behavior, environment variables, deployment considerations, and known limitations.
- [x] Save the final project checkpoint after all completed items are marked [x].
- [x] Model site groups and monitoring structures explicitly, or document the traceable reason they cannot be first-class seeded entities.
- [x] Extract a reusable TrustLayer component and use it across detail views.
- [x] Add task step-by-step workflow rendering and explicit linked knowledge-gap records.
- [x] Implement handover project detail UI with progress/status updates, missing-information prompts, and note CRUD.
- [x] Add explicit site/facility identity, facility, monitoring, and parameter sections.
- [x] Add dedicated document metadata sections for duplicates, unprocessed state, effective date, version, and source path.
- [x] Upgrade search with filters, facets, autocomplete, typo tolerance, and glossary/acronym expansion where supported.
- [x] Add classifier-backed AI routing and make conflict non-resolution and citation behavior directly testable.
- [x] Add explicit application error and source-unavailable states.
- [x] Expand Vitest coverage for conflict non-resolution, citation validation, handover procedures, and AI guardrails.
- [x] Expand implementation documentation with environment variable usage and deployment/runtime considerations.
- [x] Add full handover note edit/delete flows and tests, or explicitly narrow the implementation contract from CRUD to create/read/update.
- [x] Build dedicated site/facility detail sections for identity, facilities, monitoring structures, and related parameters.
- [x] Add surfaced search facet groups and counts, and wire glossary-term expansion from the seeded glossary records.
- [x] Use question classification to drive distinct retrieval/response paths by question kind.
- [x] Expand Vitest to validate citation contents/structure and authenticated handover get/update/note procedure behavior.

## Phase 6 — Source Accuracy Audit

- [x] Inventory every implemented knowledge surface and its source-backed claim set.
- [x] Compare every topic, task, workflow, FAQ, glossary, site, compliance, document, monitoring, handover, and AI claim against original source evidence.
- [x] Classify claims as SUPPORTED, PARTIALLY SUPPORTED, UNSUPPORTED, CONTRADICTED, or GENERIC.
- [x] Verify citation filename, page/slide/section/location fidelity and citation-to-claim coverage.
- [x] Audit invented procedures, responsibilities, deadlines, frequencies, limits, regulations, sites, facilities, roles, workflow steps, and document names.
- [x] Audit all known source conflicts and preserve Source A versus Source B without silent resolution.
- [x] Apply critical factual corrections or visible review flags to the application.
- [x] Produce the Phase 6 accuracy report with totals, errors, missing sources, corrections, and residual risks.
- [x] Run post-audit tests, type checks, visual verification, and save the Phase 6 checkpoint.
- [x] Enumerate every implemented surface explicitly, including FAQ, Start Here, Learning Path, and any additional routed pages, with a recorded claim-set audit.
- [x] Complete a page-by-page manual claim audit for remaining UI copy, FAQ, and handover claims.
- [x] Add representative claim-level AI audit coverage for each question class, or explicitly narrow the audit scope to response paths.
- [x] Save a new checkpoint after all Phase 6 corrections and coverage updates.
- [x] Perform and document an exhaustive page-by-page claim audit for every routed surface, each FAQ item, and all handover UI claims with evidence references.
- [x] Save and confirm a new checkpoint after the Phase 6 citation, UI, and test changes.
- [x] Save and confirm the post-Phase-6 checkpoint after the citation, UI, test, and audit-report changes.

## Phase 7 — New Personnel Simulation

- [x] Simulate a new Environment personnel user using only visible portal content and seeded knowledge.
- [x] Test all fifteen onboarding and operational questions through navigation, search, and AI paths.
- [x] Evaluate discoverability, navigation, terminology, readability, hierarchy, citations, task guidance, AI, and onboarding.
- [x] Identify technical pages, unexplained acronyms, missing context, dead ends, duplicates, unclear procedures, and missing sources.
- [x] Score onboarding, coverage, search, task guidance, traceability, AI reliability, usability, visual clarity, and maintainability.
- [x] Produce prioritized CRITICAL, HIGH, MEDIUM, and LOW improvements.
- [x] Save the Phase 7 simulation report and update the project checkpoint after all findings are recorded.
- [x] Perform a true UI-driven Phase 7 walkthrough using the live portal routes only, without direct procedure calls, and document findings per page and question.
- [x] Retest all fifteen onboarding questions with explicit navigation, search, and AI path coverage and record the best path for each.
- [x] Save and confirm a new post-Phase-7 checkpoint after the report and findings are complete.
- [x] Perform and document a true per-question Phase 7 retest for all 15 questions, recording the actual live navigation path, live search query/results, and AI path result or explicit access blocker.
- [x] If AI remains sign-in gated, document that blocker per question and explicitly narrow the Phase 7 AI retest scope in the report.
- [x] Save a new post-Phase-7 checkpoint after the finalized report and walkthrough artifacts are complete, then confirm the new checkpoint identifier/version.

- [x] Add a compact evidence row for each of the 15 questions with route used, exact live search query, result count, top visible results, answer/failure outcome, and the per-question AI access blocker.


## Phase 8 — Production Readiness

- [x] Perform the final functional, data, AI, security, performance, and UX readiness audit.
- [x] Verify deployment, backup, knowledge-base update, document replacement/versioning, and AI/RAG maintenance procedures.
- [x] Produce the production-readiness score, critical issues, technical debt register, administrator guide, and new-personnel user guide.
- [x] Run final Phase 8 validation and save a confirmed production-readiness checkpoint.

## Final Repository and Publish Delivery

- [ ] Run final validation and confirm the production-ready project state before repository export.
- [ ] Create a new private GitHub repository and push the finalized project code.
- [ ] Save and confirm the final checkpoint for publish readiness.
- [ ] Provide the GitHub repository URL, checkpoint version, and Management UI publish instructions.
