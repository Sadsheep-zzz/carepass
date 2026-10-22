# CarePass — Challenge 2 Build Plan

## Goal

Deliver a small, working CarePass demonstration for RMIT Hackathon Challenge 2: a patient reviews a verified clinician's request, approves only selected synthetic record categories for a limited period, and the clinician sees only the approved sample. Clearly label every simulated step.

## Challenge 2 acceptance criteria

- Show the real-world emergency-care problem and explain why broad, permanent record access is a trust problem.
- Demonstrate a complete clinician request → patient decision → clinician result flow.
- Use TideCloak for identity and record encryption. Do not claim that login or same-user encryption proves patient-to-clinician authorization.
- Bind any real shared decryption permission to patient, named clinician, selected record tags, expiry, and revocation. First confirm the current TideCloak policy API and realm can enforce this.
- Clearly mark synthetic data, simulated requests, and any unimplemented policy enforcement.
- Package a public repository, `sourcecodes.zip`, `summary.doc`, two-minute demo video, and run instructions.

## Current repository audit

- Existing: Vite + vanilla JavaScript UI, Patient/Doctor login selection, client-side realm-role checks, synthetic record data, same-session TideCloak encrypt/decrypt sample.
- Simulated: doctor request, grant/revoke, audit trail, quorum UI, and access expiry.
- Missing: `tidecloak.json`, running TideCloak realm, server-side access-token verification, durable encrypted-record API, and policy-governed patient-to-specific-clinician sharing.
- Environment note: `pnpm install` failed in the sandbox (Windows symlink permission, then npm registry TLS certificate validation even with Windows system CAs); Docker is not installed in this environment.

## ECC workflow and phases

### Phase 1 — Make the demo a coherent vertical slice (implemented; needs browser run-through)

**ECC roles:** spec-miner → planner → frontend implementation → code-reviewer.

Implemented demo-only clinician requests, patient approve/deny, minimum-category selection, clinician display of approved synthetic records, timed expiry, revoke, and audit entries. Added a static-file preview path so the UI demo does not need TideCloak packages. Keep the demo clearly labelled; the flow is browser-memory simulation, not Tide policy enforcement.

**Gate:** switching between the demo Patient and Doctor views demonstrates request, decision, minimum disclosure, expiry/revoke messaging, and audit history without implying production security.

### Phase 2 — TideCloak identity and app setup

**ECC roles:** architect → implementation → verification-loop.

Install the pinned SDK dependencies; configure a TideCloak realm/client; export the adapter; create `carepass.patient` and `carepass.doctor` roles; verify server-side identity on API routes.

**Gate:** each account can sign in only to its assigned role, and protected API routes reject missing/invalid tokens.

### Phase 3 — Policy capability spike, then encrypted sharing

**ECC roles:** architect → security-reviewer → implementation.

Use the supported TideCloak/Forseti path to bind the request to patient identity, named clinician, selected tags, expiry, and revocation. Current vanilla SDK docs prove tag-based E2EE; they do not by themselves prove this per-grant sharing flow. Policy signing/API support must be validated against the connected realm before implementation claims are upgraded.

**Gate:** wrong clinician, missing approval, expired grant, revoked grant, or unselected category cannot decrypt.

### Phase 4 — Challenge submission

**ECC roles:** code-reviewer → security-reviewer → doc-updater.

Prepare public repository, `sourcecodes.zip`, `summary.doc`, two-minute demo, run instructions, team naming, and Google Form submission. Identify simulated functions on-screen and in the README.

**Gate:** a clean launch path and a rehearsal showing the complete vertical slice plus truthful TideCloak boundaries.

## Immediate execution order

1. Build the self-contained synthetic clinician-request demo flow.
2. Make dependency installation and local Vite startup repeatable.
3. Resume real TideCloak setup when a realm adapter and working SDK install are available.
4. Validate policy support before claiming patient-specific doctor access.
