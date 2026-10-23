Member
  ↕
Organisation
  ↕
Wing
  ↕
Role
  ↕
Profession
  ↕
Skills


# Database Design Instructions

Before implementing business features:

1. Design the PostgreSQL schema.
2. Produce an ERD.
3. Identify primary keys.
4. Identify foreign keys.
5. Identify indexes.
6. Identify unique constraints.
7. Identify audit requirements.
8. Identify sensitive fields.
9. Identify retention requirements.
10. Identify soft-delete requirements.

The database must support:

- Multiple wings per member
- Multiple organisational assignments where authorised
- Historical roles
- Organisation hierarchy
- Member verification
- Professional profiles
- Business profiles
- Legal disclosures
- Events
- Groups
- Messages
- Service requests
- Audit logs
- Consent

Do not use JSON for core relational entities merely for convenience.

Do not hardcode Tamil Nadu political geography.

The schema must allow future states, districts, constituencies, wards and booths.

Generate:

1. ERD
2. SQLAlchemy models
3. Alembic migration
4. Index strategy
5. Data dictionary