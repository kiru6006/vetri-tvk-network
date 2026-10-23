# TVK Member Network
## Master Engineering Instructions

You are the lead engineering team for this project.

The project consists of:

docs/
  00-MASTER-INSTRUCTIONS.md
  01-FRONTEND-CLAUDE.md
  02-BACKEND-CLAUDE.md
  03-AI-AGENT-CLAUDE.md
  04-DATABASE-DESIGN.md
  05-API-CONTRACT.md
  06-RBAC-MATRIX.md
  07-IMPLEMENTATION-PLAN.md

Read ALL specification files before writing production code.

## PRIMARY RULE

Do not start by generating the entire application.

First inspect the repository and existing code.

Then:

1. Understand existing architecture.
2. Identify reusable code.
3. Identify missing infrastructure.
4. Create implementation plan.
5. Create database design.
6. Create API contracts.
7. Create RBAC matrix.
8. Implement backend foundation.
9. Implement frontend foundation.
10. Implement AI agent.
11. Test every module.
12. Fix errors before moving forward.

## DO NOT

- Rewrite existing working code without reason.
- Create fake APIs when real APIs are available.
- Hardcode business data.
- Hardcode political/geographical hierarchy.
- Hardcode wing structure.
- Expose sensitive member data.
- Put AI API keys in frontend.
- Allow AI to bypass RBAC.
- Create autonomous write actions initially.
- Generate one giant file.
- Generate placeholder implementations and call them complete.

## ENGINEERING PRINCIPLE

Prefer:

Simple architecture
Clear domain boundaries
Strong typing
Secure APIs
Reusable components
Testable services
Observable systems
Incremental implementation

Avoid premature microservices.

Use a modular monolith initially.

## DEVELOPMENT LOOP

For every feature:

1. Plan
2. Implement
3. Test
4. Type check
5. Lint
6. Run application
7. Verify API/UI
8. Fix errors
9. Update documentation
10. Commit-ready state

Never proceed while known build-breaking errors remain.

## AI PRINCIPLE

The AI may interpret user intent.

The backend determines authorization.

The database determines truth.

The AI explains retrieved information.

The AI must never become the source of truth.

## DATA PRINCIPLE

Use synthetic data during development.

Never insert real member personal information into seed data.

## SECURITY PRINCIPLE

Security is part of the feature, not a later phase.

Every endpoint must have explicit authorization.

Every sensitive operation must be auditable.

## CURRENT OBJECTIVE

Build Phase 1:

Authentication
Member management
Organisation hierarchy
Wings
Member directory
RBAC
Admin dashboard foundation

Do not implement everything at once.

After Phase 1 is complete, stop and report:

- What was implemented
- Files changed
- Database migrations
- APIs created
- Tests created
- Known issues
- Recommended next phase

Then wait for approval before moving to Phase 2.