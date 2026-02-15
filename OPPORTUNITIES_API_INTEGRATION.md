# Opportunities API Integration Guide

This document describes how to integrate the Opportunities-related endpoints added to the Magna Coders backend: Applications, Bookmarks, Files, and Companies. It includes request/response shapes, authentication notes, and example usage.

Base path: `/api` (examples below use `/api/...`).

Authentication
- Most endpoints require Bearer JWT in `Authorization: Bearer <token>` header. Public company read endpoints are available without auth.

Endpoints

1) Applications

- POST /api/applications/{id}/apply (auth)
  - Purpose: Apply to an opportunity (id = opportunity id)
  - Request (application/json): { "resumeUrl": "https://...", "coverLetter": "...", "metadata": { ... } }
  - Response 201: { "application_id": "app_uuid", "status": "submitted", "submitted_at": "ISO8601" }

- GET /api/applications/me (auth)
  - Purpose: Get authenticated user's applications
  - Response 200: { "total": number, "items": [ { application object with `opportunity` nested } ] }

- GET /api/applications/{id}/applications (auth, owner/admin)
  - Purpose: Get applications for opportunity `id` (owner or admin only)
  - Response 200: { "total": number, "items": [ { application objects with applicant `user` } ] }

2) Bookmarks

- POST /api/bookmarks/{id}/bookmark (auth)
  - Purpose: Toggle save/bookmark for opportunity `id`
  - Response 201 / 200: { "bookmarked": true|false, "id": "bookmark_uuid" }

- GET /api/bookmarks/{id}/bookmark (auth)
  - Purpose: Get bookmark state for current user
  - Response 200: { "bookmarked": boolean, "id": string|null }

3) Files

- POST /api/files (auth)
  - Purpose: Record uploaded file metadata (use signed uploads or direct S3 elsewhere)
  - Request (application/json): { "url": "https://...", "filename":"...","mime_type":"...","size":12345,"purpose":"application-resume" }
  - Response 201: file object { id, url, filename, mime_type, size, uploaded_by, uploaded_at, purpose }

- DELETE /api/files/{id} (auth + owner)
  - Purpose: Remove file metadata (and optionally delete from storage separately)
  - Response 200: { "message": "Deleted" }

4) Companies

- GET /api/companies/{id}
  - Purpose: Get company profile
  - Response 200: company object { id, name, slug, logo_url, website_url, description, verified, location }

- GET /api/companies/slug/{slug}
  - Purpose: Lookup by slug

- GET /api/companies/{id}/opportunities
  - Purpose: Return opportunities for a company
  - Response 200: { total, items: [ opportunities ] }

Request/Response Notes
- Opportunity summary objects used in list endpoints include: `id, title, short_description, company (id,name), location, salary, posted_at, skills[], is_bookmarked`.
- Full opportunity object returned by detailed endpoints includes: `id,title,slug,description,company (nested),location,remote,salary_min,salary_max,currency,skills,attachments,application_deadline,views_count,applicants_count,is_bookmarked,application_status_for_current_user`.
- Application and bookmark objects include `id` UUIDs.
- Files are metadata only; your frontend should upload to S3 (or other) and then call POST /api/files to register the URL.

Best Practices
- Use cursor pagination for large lists like applicants or comments.
- Use signed uploads for secure file storage; delete files from storage separately when deleting file metadata.
- Protect owner-only routes by verifying `req.user` against `opportunity.author_id` or admin role.
- Emit events (view, apply, save) to analytics pipeline for conversion tracking.

Swagger
- All Opportunities endpoints are documented in the code with Swagger JSDoc blocks. Visit `/api/docs` (or your Swagger UI route) to view interactive API docs after starting the server.

Example: Apply to an opportunity (curl)

```bash
curl -X POST "http://localhost:3000/api/applications/<OPPORTUNITY_ID>/apply" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"resumeUrl":"https://files.example.com/resume.pdf","coverLetter":"Excited to apply"}'
```

File: [src/routes/applications.ts](src/routes/applications.ts)
File: [src/routes/bookmarks.ts](src/routes/bookmarks.ts)
File: [src/routes/files.ts](src/routes/files.ts)
File: [src/routes/companies.ts](src/routes/companies.ts)

---
If you want, I can extend these docs with OpenAPI schema components and examples or generate a Postman collection next.
