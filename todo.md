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

- [x] Run final validation and confirm the production-ready project state before repository export.
- [x] Create a new private GitHub repository and push the finalized project code.
- [x] Save and confirm the final checkpoint for publish readiness.
- [x] Provide the GitHub repository URL, checkpoint version, and Management UI publish instructions.

## GitHub Pages 404 Remediation

- [x] Inspect GitHub Pages source, workflow configuration, and repository build artifacts.
- [x] Implement the smallest compatible fix for the Pages deployment and SPA fallback/base path.
- [x] Push the fix and verify the live GitHub Pages URL returns the portal instead of 404.
- [x] Save a corrected checkpoint and report the verified deployment URL.

## GitHub Pages Interaction Failure

- [x] Reproduce the non-clickable controls on the live GitHub Pages deployment and inspect browser/network errors.
- [x] Determine whether the failure is caused by static-host backend incompatibility, routing, stale assets, or JavaScript errors.
- [x] Deploy the smallest reliable fix or clearly direct users to the verified full-stack deployment URL.
- [x] Verify a representative navigation click, search interaction, and working deployment URL.

## Manus Space Usability and Indonesian Localization

- [x] Reproduce the reported Manus Space interaction failure and capture the failing route, request, or runtime behavior.
- [x] Fix the smallest blocking runtime or interaction issue without weakening source-grounding or authentication controls.
- [x] Translate the portal navigation, headings, controls, states, prompts, and onboarding copy into Indonesian.
- [x] Validate navigation, search, data loading, AI states, mobile layout, and language consistency.
- [x] Save and confirm a localized working checkpoint and provide the verified URL.

## Follow-up Corrections — Manus Space and Localization

- [x] Document that the original Manus Space failure was not reproducible: navigation and Indonesian search returned data successfully; GitHub Pages was the deployment with the confirmed backend 404.
- [x] Complete the remaining Indonesian UI sweep, including Facets, Toggle Sidebar, mixed-language fallback states, and remaining detail labels.
- [x] Run explicit post-localization mobile, navigation, search, data-loading, and AI-state validation and record the evidence.
- [x] Save a new checkpoint after the corrected localization and validation evidence is complete.

## Evidence Detail Interaction Fix

- [x] Reproduce the Buka bukti failure and inspect EvidenceCard, route, and detail-state wiring.
- [x] Fix Buka bukti so the selected record opens its detail and citation panel reliably.
- [x] Validate detail opening, source references, back navigation, and related route behavior.
- [x] Save a corrected checkpoint and document how users should use Buka bukti.

## Evidence Detail Follow-up

- [x] Wire Buka bukti on Search results to open the correct detail route for each record type.
- [x] Retest Buka bukti on Topics and Search, including source references and back navigation.
- [x] Save a new checkpoint after the shared evidence-detail flow is fully validated.

## Evidence Detail Verification Gap

- [x] Retest Search Buka bukti through citation-panel expansion and back-navigation, then record the result.
- [x] Save a new checkpoint after the shared Buka bukti flow is fully validated and record its version.

## Search Detail Return Behavior

- [x] Preserve the originating Search query when opening Buka bukti from Search results.
- [x] Make the detail back action return to Search results when the detail was opened from Search, while keeping list-page back behavior unchanged.
- [x] Explicitly expand the Search-derived citation panel, record visible source references in the audit notes, and save a new checkpoint with its version.

## Phase 10 — Beginner Learning Portal Redesign

- [x] Audit the current information architecture and identify why the existing flow feels like a catalog/quiz instead of a learning portal.
- [x] Define beginner-oriented Indonesian learning aspects and map each aspect to audited in-app material, related tasks, glossary terms, and source references.
- [x] Redesign the landing page so a new user can choose an environmental aspect as the primary entry point.
- [x] Implement in-app learning material pages that render the supplied audited content directly without requiring external file loading.
- [x] Reposition Search, AI, evidence, and handover as supporting tools rather than the primary learning flow.
- [x] Validate the new-person journey, content readability, source traceability, mobile behavior, and key navigation interactions.
- [x] Save a new checkpoint after the complete learning-portal redesign is validated.

## Phase 10 Follow-up Corrections

- [x] Surface related glossary terms on each in-app learning aspect page using audited glossary records or an explicit empty state when no relationship is source-stated.
- [x] Simplify the global navigation so learning aspects are the primary path and Search, AI, evidence, and Handover are clearly secondary support tools.
- [x] Save and record a new checkpoint after these Phase 10 corrections are validated.

## Final Indonesian Accessibility and Repository Delivery

- [x] Audit every primary route, button, link, evidence action, search action, AI action, learning action, and back-navigation path.
- [x] Complete the Indonesian UI sweep and remove remaining prominent English interface labels without translating source-derived evidence incorrectly.
- [x] Fix every interaction, routing, loading, empty-state, or mobile issue found during the audit.
- [x] Run the complete regression suite, TypeScript validation, build/runtime checks, and visual verification before delivery.
- [x] Push the final validated code to the user's GitHub repository and verify the remote branch state.
- [x] Save a final checkpoint and report only verified access and repository details.

- [x] Final Indonesian sweep: translate dynamic status, metadata, error, and accessibility labels found during live route audit
- [x] Re-run regression tests, TypeScript check, build, and primary click-path verification after final localization fixes
- [x] Push the validated final commit to the private GitHub repository
- [x] Save and deliver the final published checkpoint

- [x] Replace remaining English empty-evidence fallbacks in task and document detail fields
- [x] Retest all primary route families, mobile navigation, AI, handover, and detail back paths after the final fallback fix
- [x] Save a new final checkpoint after the last verified changes

## Perubahan Scope — Portal Baca-Saja dan GitHub Pages

- [x] Hapus menu dan rute Login dari pengalaman pengguna publik
- [x] Hapus menu dan rute Asisten AI dari pengalaman pengguna publik
- [x] Hapus menu dan rute Serah Terima dari pengalaman pengguna publik
- [x] Pastikan seluruh materi, pencarian, sitasi, glosarium, FAQ, kepatuhan, dan detail bukti tetap dapat dibaca tanpa autentikasi
- [x] Perbaiki konfigurasi build/deploy GitHub Pages agar URL publik tidak 404
- [x] Uji akses baca-saja dan responsif pada seluruh rute publik
- [x] Push perubahan final dan verifikasi URL GitHub Pages
- [x] Simpan checkpoint final setelah perubahan teruji

## Bug Follow-up — 404 pada Navigasi Pilih Aspek

- [x] Reproduksi 404 saat tombol “Pilih aspek”/“Mulai belajar” dibuka dari GitHub Pages
- [x] Perbaiki fallback SPA dan routing materi aspek pada host project Pages
- [x] Uji langsung Beranda → `/learn/D01` pada URL Pages, termasuk tombol dan mobile
- [x] Push perbaikan dan simpan checkpoint baru setelah URL terverifikasi
