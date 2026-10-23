# TVK Member Network Platform
## Backend Engineering Specification for Claude

You are acting as a Principal Backend Architect, Security Architect and Senior Python Engineer.

Build the backend for:

TVK Member Network

The backend must support:

- Member management
- Organisation hierarchy
- Wings
- Professional profiles
- Business profiles
- Legal disclosures
- Verification
- Messaging
- Groups
- Announcements
- Events
- Volunteers
- Service requests
- Training
- Documents
- Notifications
- AI agent integration
- Audit logging
- RBAC
- Consent and privacy

The system must be designed as an enterprise-grade API platform.

---

# 1. TECHNOLOGY

Use:

Python 3.12+
FastAPI
Pydantic v2
SQLAlchemy 2
PostgreSQL
Alembic
Redis
WebSockets
Celery or equivalent background job mechanism
Pytest
OpenAPI

Use async where appropriate.

Do not introduce microservices prematurely.

Start as a modular monolith.

---

# 2. ARCHITECTURE

Use:

API Layer
Application Layer
Domain Layer
Repository Layer
Infrastructure Layer

Suggested:

app/
  main.py
  config/
  api/
  models/
  schemas/
  repositories/
  services/
  security/
  agents/
  websocket/
  workers/
  utils/
  tests/

Keep business logic out of route handlers.

---

# 3. CORE DOMAIN

Create these major entities:

Member
Membership
MemberIdentity
MemberContact
MemberAddress
MemberProfession
MemberBusiness
MemberSkill
MemberQualification
LegalDisclosure
Verification
OrganisationUnit
MemberOrganisation
Wing
MemberWing
Role
Permission
MemberRole
Group
GroupMember
Message
MessageAttachment
Announcement
Event
EventParticipant
VolunteerProfile
ServiceRequest
TrainingCourse
TrainingEnrollment
Document
Notification
AuditLog
Consent
SearchQuery

---

# 4. MEMBER MODEL

Member:

id
member_number
status
joined_at
created_at
updated_at

Identity should be separated where possible.

MemberIdentity:

member_id
full_name
tamil_name
date_of_birth
gender
profile_photo
preferred_language

Do not unnecessarily store government identity documents.

---

# 5. ADDRESS

MemberAddress:

member_id
address_type
address_line_1
address_line_2
district
taluk
city
pincode
ward
booth
assembly_constituency
parliamentary_constituency

Geographic hierarchy should be represented using OrganisationUnit.

---

# 6. PROFESSIONAL PROFILE

MemberProfession:

member_id
profession_category
profession
designation
organisation
specialisation
years_experience
verification_status

MemberSkill:

member_id
skill
skill_level
verification_status

MemberQualification:

member_id
qualification
institution
year
verification_status

---

# 7. BUSINESS PROFILE

MemberBusiness:

member_id
business_name
business_category
industry
location
services
website
verification_status

Do not store:

- Bank account information
- Passwords
- unnecessary financial data
- private tax information

---

# 8. LEGAL DISCLOSURE

Create a separate LegalDisclosure domain.

Fields:

id
member_id
case_number
court
year
case_type
member_role
legal_sections
status
stage
disposition
source
member_statement
verification_status
last_verified_at

Statuses:

FIR_REGISTERED
CHARGE_SHEET_FILED
TRIAL_PENDING
DISCHARGED
ACQUITTED
CONVICTED
APPEAL_PENDING
CLOSED
OTHER

IMPORTANT:

Never represent an FIR or pending case as a conviction.

Do not create a generic "criminal member" boolean.

Legal information must be access-controlled.

---

# 9. ORGANISATION HIERARCHY

OrganisationUnit:

id
parent_id
type
name
name_tamil
code
level
status

Types:

STATE
REGION
DISTRICT
PARLIAMENTARY_CONSTITUENCY
ASSEMBLY_CONSTITUENCY
LOCAL_BODY
WARD
BOOTH

Hierarchy:

STATE
→ REGION
→ DISTRICT
→ PARLIAMENTARY_CONSTITUENCY
→ ASSEMBLY_CONSTITUENCY
→ LOCAL_BODY
→ WARD
→ BOOTH

Support future changes in political/geographic boundaries.

Do not hardcode Tamil Nadu geography into application logic.

---

# 10. WINGS

Wing:

id
name
name_tamil
category
description
status

Categories:

PROFESSIONAL
OCCUPATIONAL
SOCIAL
FUNCTIONAL

Support:

IT
Medical
Lawyers
Engineers
Education
Farmers
Fishermen
Weavers
Labour
Women
Youth
Students
Senior Citizens
Differently Abled
Entrepreneurs
Traders
MSME
Government Employees
Retired Government Employees
Media
Social Media
Research
Policy
Training
Technology
Data
Disaster Response
Public Service
and configurable future wings.

Do not hardcode the wing list.

---

# 11. MEMBER-WING RELATIONSHIP

MemberWing:

member_id
wing_id
role_id
organisation_unit_id
joined_at
status
verification_status

A member may belong to multiple wings.

---

# 12. ROLES

Roles:

MEMBER
BOOTH_COORDINATOR
WARD_COORDINATOR
CONSTITUENCY_ADMIN
DISTRICT_ADMIN
WING_COORDINATOR
STATE_ADMIN
SUPER_ADMIN
AUDITOR

Use RBAC.

Permissions should be granular.

Example:

members.read
members.read_sensitive
members.update
members.verify
members.export

wings.read
wings.manage

messages.send
groups.manage

legal.read
legal.manage

audit.read

---

# 13. DATA VISIBILITY

Implement field-level access rules.

Example:

Member:

Can see:
- Public profile
- permitted contact
- organisation
- wings

Authorised administrator:

Can see:
- sensitive organisational information

Restricted roles:

Can see legal disclosure only when explicitly permitted.

Never rely on frontend hiding fields.

Backend must remove restricted fields from API responses.

---

# 14. MEMBER SEARCH API

Implement:

GET /api/v1/members

Filters:

name
member_number
district
assembly
parliamentary_constituency
ward
booth
profession
wing
skill
qualification
language
verification_status
organisation_role

Support pagination.

Never allow unrestricted database dumps.

Apply permission filters automatically.

---

# 15. GLOBAL SEARCH

Create:

GET /api/v1/search

Search:

members
wings
organisation
events
documents
announcements
groups

Support keyword search.

AI natural-language search will be handled by the AI service.

---

# 16. AI SEARCH API

Create:

POST /api/v1/ai/search

Request:

{
  "query": "Find verified lawyers in Salem North"
}

Response:

{
  "answer": "...",
  "results": [],
  "filters_applied": {},
  "sources": [],
  "confidence": "high"
}

The AI must never bypass RBAC.

The AI receives only data the authenticated user is allowed to access.

---

# 17. MESSAGING

Implement:

POST /messages
GET /messages
GET /conversations
POST /groups

Use WebSockets for realtime delivery.

Message fields:

id
conversation_id
sender_id
content
message_type
created_at
edited_at
deleted_at

Support:

TEXT
IMAGE
DOCUMENT
SYSTEM

Add:

read receipts
typing indicators
delivery status

---

# 18. GROUP TYPES

BOOTH
WARD
CONSTITUENCY
DISTRICT
WING
PROJECT
EVENT
VOLUNTEER

Each group must have an organisation scope.

---

# 19. ANNOUNCEMENTS

Announcement:

id
title
content
priority
target_type
target_id
published_at
expires_at
created_by

Target types:

STATE
DISTRICT
CONSTITUENCY
WARD
BOOTH
WING
GROUP

---

# 20. EVENTS

Event:

id
name
description
type
location
start_time
end_time
capacity
organisation_unit_id
wing_id
created_by
status

Participant:

event_id
member_id
registration_status
attendance_status

---

# 21. VOLUNTEER SYSTEM

VolunteerProfile:

member_id
availability
skills
preferred_locations
emergency_response
status

Implement search by:

skill
location
availability
wing

---

# 22. SERVICE REQUESTS

ServiceRequest:

id
member_id
category
description
priority
assigned_wing
assigned_member
status
created_at
resolved_at

Workflow:

SUBMITTED
ASSIGNED
IN_PROGRESS
RESOLVED
CLOSED

All transitions must be audited.

---

# 23. DOCUMENTS

Document:

id
title
category
storage_key
visibility
organisation_scope
wing_scope
created_by
version
status

Support:

versioning
access control
metadata
search indexing

---

# 24. NOTIFICATIONS

Support:

in-app
push-ready
email-ready
SMS-ready

Types:

MESSAGE
ANNOUNCEMENT
EVENT
SERVICE_REQUEST
TRAINING
VERIFICATION
SYSTEM

Do not tightly couple the application to one notification provider.

---

# 25. AUDIT LOGGING

Audit every sensitive operation.

AuditLog:

id
actor_id
action
entity_type
entity_id
timestamp
ip_address
user_agent
old_value
new_value
reason

Audit:

profile changes
role changes
legal disclosure access
member verification
data exports
organisation changes
wing changes
permission changes

Audit logs should be append-only.

---

# 26. CONSENT

Consent:

member_id
purpose
consent_type
status
granted_at
revoked_at
version

Support purpose-specific consent.

Do not assume one global consent grants access to everything.

---

# 27. SECURITY

Implement:

- JWT/OAuth-compatible authentication
- MFA-ready architecture
- Password hashing using Argon2/bcrypt
- Rate limiting
- Input validation
- SQL injection protection
- XSS-safe output
- CORS configuration
- CSRF strategy where applicable
- Secure headers
- Request logging
- Audit logs
- Permission checks
- Data minimisation

Sensitive data should be encrypted where appropriate.

---

# 28. SEARCH ENGINE

Use PostgreSQL full-text search initially.

If scale requires it:

OpenSearch.

Do not add Elasticsearch/OpenSearch simply for the sake of architecture.

Create an abstraction:

SearchProvider

Implement:

PostgresSearchProvider

Future:

OpenSearchProvider

---

# 29. DATABASE

Use PostgreSQL.

Create proper indexes.

Important indexes:

member_number
mobile hash where appropriate
district
assembly
ward
booth
profession
wing
organisation_unit
verification_status

Use foreign keys.

Use constraints.

Avoid JSON blobs for core relational data.

---

# 30. API VERSIONING

Use:

/api/v1/

Document APIs using OpenAPI.

Frontend should consume the generated OpenAPI schema where practical.

---

# 31. BACKGROUND JOBS

Use background workers for:

- notifications
- search indexing
- document processing
- bulk verification
- duplicate detection
- analytics aggregation

Do not perform heavy processing inside request handlers.

---

# 32. DUPLICATE DETECTION

Build a duplicate detection service.

Potential matching:

- mobile
- email
- name
- DOB
- address
- membership number

Return:

POSSIBLE_DUPLICATE
CONFIRMED_DUPLICATE
NO_MATCH

Do not automatically merge members.

Require authorised review.

---

# 33. API RESPONSE DESIGN

Use consistent response models.

Success:

{
  "data": {},
  "meta": {}
}

Error:

{
  "error": {
    "code": "...",
    "message": "...",
    "details": {}
  }
}

Never return stack traces.

---

# 34. TESTING

Write:

- Unit tests
- Repository tests
- API tests
- Permission tests
- Authentication tests
- Search tests
- WebSocket tests
- AI authorization tests

Most important:

Test that an AI query cannot retrieve data outside the user's permissions.

---

# 35. SEED DATA

Create development seed data for:

- Tamil Nadu
- sample districts
- sample constituencies
- sample wards
- sample booths
- sample wings
- sample members

All data must be fictional.

---

# 36. DO NOT IMPLEMENT

Do not build:

- political persuasion profiling
- caste profiling
- religion profiling
- member loyalty scores
- political opinion scores
- voter psychological profiling
- financial scoring
- unrestricted database export

The system is for organisational member management and communication.

---

# 37. DEVELOPMENT METHOD

Before coding:

1. Inspect repository.
2. Create architecture plan.
3. Create database ERD.
4. Create API contract.
5. Create migrations.
6. Implement authentication.
7. Implement RBAC.
8. Implement members.
9. Implement organisation.
10. Implement wings.
11. Implement messaging.
12. Implement remaining modules.
13. Implement AI integration.

After each module:

- run tests
- run type/static checks
- run migrations
- verify API
- update OpenAPI

Do not generate fake implementations just to make endpoints appear complete.

---

# 38. FINAL REQUIREMENT

The backend must be capable of supporting a large member population.

Design for:

10 million+ members eventually.

Do not optimise prematurely.

But avoid architecture that makes horizontal scaling impossible.

Start modular monolith.

Keep domain boundaries clear.

---

Start by inspecting the existing repository and produce:

1. Backend architecture
2. ERD
3. API catalogue
4. RBAC matrix
5. Security model
6. Implementation plan

Then implement Phase 1.