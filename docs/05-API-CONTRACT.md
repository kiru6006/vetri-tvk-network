# API Contract

Backend is the source of truth for API contracts.

All APIs use:

/api/v1/

Every API must have:

- Request schema
- Response schema
- Error schema
- Authentication requirement
- Required permissions
- Pagination where applicable

Core APIs:

/auth
/members
/organisation
/wings
/roles
/groups
/messages
/events
/volunteers
/service-requests
/documents
/announcements
/notifications
/ai

Use OpenAPI.

Frontend must consume these contracts.

Do not invent frontend-only API responses.

When an API changes:

1. Update backend schema.
2. Update OpenAPI.
3. Update frontend API client.
4. Update tests.
5. Update documentation.