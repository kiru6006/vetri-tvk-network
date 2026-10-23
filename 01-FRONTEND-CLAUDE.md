# TVK Member Network Platform
## Frontend Engineering Specification for Claude

You are acting as a Senior Frontend Architect, Senior Product Engineer and UI/UX Engineer.

Build a production-quality web application for a political party member network called:

TVK Member Network

The application is intended for verified party members, organisational functionaries, wing coordinators and authorised administrators.

IMPORTANT:
This is NOT a generic social-media application.
It is a secure organisational member-management and communication platform.

The application must be modular, scalable, responsive and ready for integration with a Python FastAPI backend and AI agent services.

---

# 1. TECHNOLOGY STACK

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Lucide React
- Recharts
- WebSocket support
- i18n-ready architecture

Do NOT use Angular.

Prefer clean functional components.

Use TypeScript strict mode.

Avoid unnecessary dependencies.

---

# 2. DESIGN PRINCIPLES

The application should look like a serious enterprise application.

Avoid:

- flashy political graphics
- excessive animations
- social-media-style clutter
- unnecessary gradients
- excessive cards
- oversized typography
- gaming-style dashboards

Use:

- clean layouts
- strong information hierarchy
- professional tables
- searchable directories
- clear status badges
- accessible forms
- responsive navigation
- Tamil + English readiness

The UI should work well on:

- Desktop
- Tablet
- Mobile

---

# 3. APPLICATION STRUCTURE

Create the following primary areas:

1. Authentication
2. Dashboard
3. Member Directory
4. Member Profile
5. Organisation
6. Wings
7. Messages
8. Groups
9. Announcements
10. Events
11. Volunteers
12. Service Requests
13. Training
14. Documents
15. AI Assistant
16. Notifications
17. My Profile
18. Administration

---

# 4. AUTHENTICATION

Screens:

- Login
- OTP verification
- Forgot password
- MFA
- Session/device management
- Logout

Authentication should support:

- Access token
- Refresh token
- Role-based permissions
- MFA
- Session expiry
- Device tracking

Never store sensitive authentication information in plain localStorage.

Use secure token handling.

---

# 5. MAIN APPLICATION SHELL

Create:

- Sidebar navigation
- Top navigation
- Global search
- AI search button
- Notifications
- User profile menu
- Organisation context

Desktop:

Sidebar + main content.

Mobile:

Bottom navigation or collapsible drawer.

---

# 6. DASHBOARD

Create role-aware dashboards.

Member dashboard:

- Membership status
- Organisation hierarchy
- My wings
- Upcoming events
- Recent announcements
- Messages
- Volunteer opportunities
- Service requests
- AI search

Functionary dashboard:

- Members under responsibility
- Pending verification
- Events
- Announcements
- Organisation activity
- Wing activity

Admin dashboard:

- Total members
- Verified members
- Pending verification
- Members by district
- Members by constituency
- Members by wing
- Profession distribution
- Activity metrics
- Verification queue

---

# 7. MEMBER DIRECTORY

This is one of the most important modules.

Create:

/members

Features:

- Search
- Advanced filters
- Sort
- Pagination
- Grid view
- Table view
- Map view placeholder
- AI search

Filters:

- Name
- Member ID
- District
- Parliamentary constituency
- Assembly constituency
- Ward
- Booth
- Profession
- Wing
- Skills
- Qualification
- Language
- Verification status
- Organisation role
- Availability

Example:

"Find verified lawyers in Salem North."

The frontend should send this query to the AI agent instead of implementing natural-language parsing locally.

---

# 8. MEMBER CARD

Display:

- Profile photo
- Name
- Member ID
- Verification status
- District
- Constituency
- Ward
- Booth
- Profession
- Wings
- Organisation role
- Skills

Actions:

- View Profile
- Message
- Contact
- Add to group if authorised
- Report
- Share profile if permitted

Never expose restricted personal information.

---

# 9. MEMBER PROFILE

Sections:

Identity

- Name
- Tamil name
- Photo
- Membership number
- Membership status

Organisation

- State
- District
- Parliamentary constituency
- Assembly constituency
- Local body
- Ward
- Booth
- Organisation role

Professional

- Profession
- Designation
- Organisation
- Specialisation
- Qualifications
- Skills
- Languages

Wings

- Current wings
- Wing roles
- Wing verification

Business

- Business name
- Category
- Location
- Services
- Verification

Legal disclosure

Display only authorised information.

Clearly distinguish:

- Self-declared
- Verified
- Pending
- Closed
- Acquitted
- Convicted
- Appeal pending

NEVER display a simplistic "criminal" label.

Communication:

- Message
- Contact if permitted

---

# 10. ORGANISATION MODULE

Create a hierarchy explorer:

TVK
  → State
    → Region
      → District
        → Parliamentary Constituency
          → Assembly Constituency
            → Local Body
              → Ward
                → Booth

Users should be able to navigate the hierarchy.

Show:

- Office bearers
- Members
- Responsibilities
- Events
- Announcements

---

# 11. WINGS

Create:

/wings

Categories:

Professional Wings:

- IT
- Medical
- Lawyers
- Engineers
- Education
- Government Employees
- Retired Government Employees
- Entrepreneurs
- Traders
- Scientists / Researchers
- Finance Professionals
- Media

Occupational Wings:

- Farmers
- Fishermen
- Weavers
- Labour
- Transport
- Construction
- MSME
- Small Businesses

Social / Participation:

- Women
- Youth
- Students
- Senior Citizens
- Differently Abled
- Volunteers

Functional:

- Social Media
- Media & Communications
- Research
- Policy
- Training
- Technology
- Data & Analytics
- Membership
- Disaster Response
- Public Service

Each wing should have:

- Overview
- Leadership
- Members
- Organisation hierarchy
- Events
- Announcements
- Documents
- Groups
- Activities
- Statistics

---

# 12. MESSAGING

Create:

/messages

Features:

- One-to-one chat
- Group chat
- Wing chat
- Organisation group
- Search messages
- Attachments
- Images
- Documents
- Reply
- Forward where permitted
- Read status
- Typing indicator
- Online/offline status
- Notifications

Use WebSocket integration.

Do not build a WhatsApp clone.

Prioritise organisational communication.

---

# 13. GROUPS

Group types:

- Booth group
- Ward group
- Constituency group
- District group
- Wing group
- Project group
- Event group
- Volunteer group

Group permissions:

- Owner
- Admin
- Moderator
- Member

---

# 14. ANNOUNCEMENTS

Announcements should be different from chat.

Support:

- State announcement
- District announcement
- Constituency announcement
- Wing announcement
- Event announcement

Fields:

- Title
- Content
- Target audience
- Priority
- Publish date
- Expiry date
- Attachments

Priority:

- Normal
- Important
- Urgent

---

# 15. EVENTS

Create:

/events

Fields:

- Event name
- Type
- Location
- Date
- Time
- Organiser
- Target group
- Capacity
- Registration
- Attendance

Event types:

- Party meeting
- Booth meeting
- Wing meeting
- Training
- Public service
- Medical camp
- Legal camp
- Blood donation
- Disaster response
- Community activity

---

# 16. VOLUNTEERS

Create:

/volunteers

Skills:

- Medical
- Legal
- IT
- AI
- Photography
- Video
- Driving
- Translation
- Event management
- Disaster response
- Teaching
- Public service

Allow authorised users to search volunteers by skills and location.

---

# 17. SERVICE REQUESTS

Create:

/service-requests

Categories:

- Medical
- Legal
- Education
- Employment
- Government scheme
- Agriculture
- Business
- Emergency
- Disability
- Documentation

Workflow:

Submitted
→ Assigned
→ In Progress
→ Resolved
→ Closed

Show responsible wing/member where permitted.

---

# 18. TRAINING

Create:

/training

Features:

- Courses
- Training events
- Registration
- Completion
- Certificates
- Training history

---

# 19. DOCUMENTS

Create:

/documents

Categories:

- Party constitution
- Circulars
- Policies
- Resolutions
- Training materials
- Wing guidelines
- Organisation documents
- FAQs

Features:

- Search
- Filter
- Preview
- Download based on permission

---

# 20. AI ASSISTANT UI

Create a dedicated:

/ai-assistant

The interface should resemble an enterprise research assistant.

Example:

User:

"Find verified cardiologists in Salem North."

AI response:

"Found 18 verified members."

Then show:

- Results
- Filters
- Source fields
- Verification status
- Organisation
- Actions

Other examples:

"Who is responsible for Booth 143?"

"Find IT professionals in Dharmapuri who know Python."

"Show active Medical Wing members in Salem."

"Find lawyers who practice MACT."

"Show upcoming events for my constituency."

"Who manages the Salem North Medical Wing?"

The frontend must send natural language queries to the backend AI service.

Do NOT put LLM API keys in the frontend.

---

# 21. GLOBAL SEARCH

Global search should support:

- Members
- Wings
- Organisations
- Events
- Documents
- Groups
- Announcements

Search modes:

Keyword search
Natural language AI search

Example:

Search:

"lawyers in Salem"

Can return:

Members
Wings
Events
Documents

---

# 22. ADMINISTRATION

Create:

/admin

Sections:

- Members
- Verification
- Organisation
- Wings
- Roles
- Permissions
- Groups
- Events
- Announcements
- Documents
- Audit logs
- System settings

---

# 23. RBAC UI

Permissions must control UI visibility.

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

Never rely only on frontend permission checks.

Backend must enforce them too.

Frontend permissions are for UX only.

---

# 24. DATA PRIVACY

Sensitive fields must have visibility indicators.

Examples:

Public
Organisation
Wing
Authorised
Private

Sensitive fields should not appear in normal member search.

Examples:

- Full residential address
- Phone number
- Legal disclosures
- Emergency contact
- Identity documents

---

# 25. COMPONENT ARCHITECTURE

Create reusable components:

MemberCard
MemberTable
MemberSearch
MemberFilters
MemberProfile
VerificationBadge
OrganisationTree
WingCard
WingMemberList
ChatWindow
GroupCard
AnnouncementCard
EventCard
ServiceRequestCard
AIAnswer
AIResultCard
PermissionGuard
StatusBadge
DataTable
SearchBar
AdvancedFilter
EmptyState
LoadingState
ErrorState
ConfirmationDialog

---

# 26. API CLIENT

Create a central API layer.

Example:

src/api/

auth.ts
members.ts
organisation.ts
wings.ts
messages.ts
groups.ts
events.ts
volunteers.ts
services.ts
training.ts
documents.ts
ai.ts
admin.ts

Use TanStack Query for server state.

Use Zustand only for client state.

---

# 27. ERROR HANDLING

Every API call must handle:

- Loading
- Empty
- Error
- Unauthorized
- Forbidden
- Timeout
- Network failure

Show useful messages.

Never expose backend stack traces.

---

# 28. ACCESSIBILITY

Follow WCAG principles.

Keyboard navigation.

Accessible forms.

ARIA labels.

Readable contrast.

Responsive layouts.

---

# 29. SECURITY

Frontend must:

- Avoid exposing secrets
- Avoid storing sensitive data unnecessarily
- Validate forms
- Sanitize user-generated content
- Handle token expiration
- Implement permission-aware UI
- Prevent obvious XSS
- Use HTTPS assumptions
- Support CSP-compatible architecture

---

# 30. MOCK DATA

Initially create realistic mock data for:

- Members
- Districts
- Constituencies
- Wings
- Events
- Groups
- Messages

Do not use real personal data.

Mark all mock data clearly.

---

# 31. DEVELOPMENT PHASES

Phase 1:

Authentication
Dashboard
Member Directory
Member Profile
Organisation
Wings
RBAC

Phase 2:

Messaging
Groups
Announcements
Events
Volunteers

Phase 3:

Service Requests
Training
Documents
AI Assistant

Phase 4:

Advanced analytics
AI workflows
Notifications
Mobile optimisation

---

# 32. CODING REQUIREMENT

Do not generate the entire application in one enormous file.

Use feature-based architecture.

Example:

src/
  app/
  components/
  features/
    auth/
    members/
    organisation/
    wings/
    messaging/
    events/
    volunteers/
    services/
    training/
    documents/
    ai/
    admin/
  hooks/
  lib/
  api/
  stores/
  types/
  routes/

Keep components small and reusable.

---

# 33. IMPORTANT

Before writing code:

1. Inspect the existing repository.
2. Identify current architecture.
3. Do not destroy working code.
4. Create an implementation plan.
5. Identify missing dependencies.
6. Implement incrementally.
7. Run tests/type checks after each major module.
8. Fix errors before moving forward.
9. Do not create fake backend APIs if real APIs already exist.
10. Keep frontend contracts aligned with backend OpenAPI schemas.

Start by producing the frontend architecture and implementation plan.

Then implement Phase 1.