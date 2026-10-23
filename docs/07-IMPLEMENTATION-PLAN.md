PHASE 0
Repository + architecture

PHASE 1
Authentication
RBAC
Member
Organisation
Wings

PHASE 2
Directory
Search
Profiles
Verification

PHASE 3
Groups
Messaging
Announcements
Events

PHASE 4
Volunteers
Service Requests
Training
Documents

PHASE 5
AI Member Search
AI Wing Search
AI Organisation Search

PHASE 6
RAG
Tamil search
Analytics
AI evaluation

PHASE 7
Security hardening
Performance
Production deployment


Read the complete /docs directory before making any code changes.

You are building the TVK Member Network platform according to the specifications.

Do NOT generate the application yet.

First inspect the existing repository and produce:

1. Current architecture assessment
2. Technology/dependency assessment
3. Proposed folder structure
4. Database ERD
5. API architecture
6. RBAC implementation plan
7. AI integration architecture
8. Security risks
9. Implementation phases
10. Exact Phase 1 task list

Identify contradictions or missing requirements in the specification.

Do not silently make major architectural assumptions.

Do not write production code until the architecture assessment is complete.


Proceed with Phase 1 only.

Implement the approved architecture.

Work incrementally.

After each major module:

1. Run tests.
2. Run type checks.
3. Run linting.
4. Start the application.
5. Verify the APIs.
6. Fix all errors.

Do not move to Phase 2.

At the end, provide:

- Files created
- Files modified
- Database migrations
- APIs implemented
- Tests implemented
- Security controls
- Known limitations
- Commands to run the project
- Phase 2 prerequisites

                    /docs
                      |
          ┌───────────┼───────────┐
          ↓           ↓           ↓
      FRONTEND     BACKEND       AI
          |           |           |
          └───────────┼───────────┘
                      ↓
                 Integration
                      ↓
                   Testing
                      ↓
                 Production