
# HireFlow AI — Project State

> **Purpose:** This document is the single source of truth for the HireFlow AI capstone. At the start of each future session, use this plan and the progress recorded here to identify the current task. Update this document whenever a task, decision, requirement, or project structure changes. Do not silently change locked decisions.

## Latest Progress Update — 2026-11-08

- **D01.8d is completed.** Reviewed the current FastAPI lifespan, SQLAlchemy async engine/session setup, and Pydantic Settings configuration.
- **Runtime verification passed:** `uv run uvicorn hireflow.main:app --reload` started successfully; `/` and `/health` returned HTTP 200; Ctrl+C completed application shutdown and engine disposal.
- **Environment-file check passed:** `git check-ignore .env` returned `.env`, and `.env` was absent from the reported `git status --short` output.
- **Backend Git repository is initialized but not yet committed:** the reported untracked items were `.gitignore`, `.python-version`, `README.md`, `pyproject.toml`, `src/`, and `uv.lock`.
- **Next task:** D01.9a. First inspect the project root and repository layout before initializing the Next.js frontend or changing Git structure.
- **Pending cleanup:** `check_db.py` currently lives at `backend/src/scripts/check_db.py`; the intended location is `backend/scripts/check_db.py`.


## 1. Project Overview

HireFlow AI is an AI-powered recruitment operations SaaS for companies and recruitment agencies, helping recruiters manage CV intake and parsing, candidate matching, interview preparation, scheduling, candidate communication, and recruitment analytics from one platform. It uses asynchronous, explainable AI-assisted workflows with human approval and oversight, while supporting multi-tenant B2B subscriptions, optional usage-based AI credits, integrations, and future white-label licensing.

## 2. Core Rules & Architecture

### 2.1 Locked project decisions

- **Project name:** HireFlow AI. This is the only active capstone project.
- **Product:** B2B recruitment operations SaaS for companies and recruitment agencies.
- **Core capabilities:** CV parsing, candidate matching, interview question and scorecard generation, scheduling, candidate communication, analytics, and recruiter dashboard.
- **Human oversight:** AI assists recruiters; it must not make final hiring decisions autonomously.
- **Business model:** Company/agency subscriptions, optional usage-based AI credits, integrations, and potential white-label licensing.
- **Cost discipline:** AI inference and operational costs must be measurable and controllable so that usage costs do not exceed the revenue allocated to them.

### 2.2 Non-negotiable development constraints

- Use **free tools and free service tiers only** during development and the capstone.
- Do not activate paid subscriptions, paid API usage, paid credits, or paid hosting for this project.
- Supabase Free and Groq Free may be used only within their available free limits. Recheck current limits when they materially affect a decision; never assume free tiers are suitable for high-volume production.
- If Groq quota or rate limits are reached, use a mock/fallback AI provider for development and testing. Do not switch to a paid model.
- Keep the AI integration provider-independent so another provider can be added later without rewriting business logic.
- Develop locally with Docker first; deploy to a VPS later.
- Teach and implement incrementally: explain the current task, provide a practical exercise, review the user's result, and only then proceed. Do not skip ahead before review.
- For coding challenges, provide requirements and expected behavior—not starter or placeholder code. Guided implementation examples are allowed.
- Prefer `uv` for Python dependency and environment management; do not use `pip3` as the project workflow.
- **Local ASGI server preference:** Use **Uvicorn** to run the FastAPI application; do not instruct the user to use `fastapi dev`. From the `backend/` directory, the development command is `uv run uvicorn hireflow.main:app --reload`.
- Keep the application lightweight on the development laptop. Avoid unnecessary local model hosting and heavyweight services. The current machine has 8 GB RAM, an older Intel i5-4200U CPU, and no dedicated GPU.

### 2.3 Technology stack

| Area | Selected technology | Role / notes |
|---|---|---|
| Frontend | Next.js (App Router), React, TypeScript | Recruiter application, dashboard, routing, and server/client UI |
| Styling / UI | Tailwind CSS; accessible reusable component system | Responsive layouts, consistent design tokens, forms, tables, dialogs, and feedback states |
| Frontend data layer | Typed API client; React state and server-state tools selected when needed | Centralized FastAPI communication, request validation, caching, and loading/error handling |
| Backend | Python 3.12, FastAPI | API, validation, authorization, business logic |
| Python tooling | `uv` | Project, dependencies, and execution |
| Database | Supabase PostgreSQL | Persistent relational data |
| Database access | SQLAlchemy 2.x async + `asyncpg` | Async PostgreSQL access from FastAPI |
| Configuration | Pydantic Settings + `.env` | Typed application configuration and local secrets |
| Authentication | Supabase Auth | Authentication; backend must verify identity and membership |
| File storage | Supabase Storage | CV and related document storage |
| AI inference | Groq Free tier | Development/portfolio inference, subject to free limits |
| AI orchestration | LangGraph | Stateful AI workflows and controlled agent orchestration |
| Automation | n8n | Workflow automation and external integrations |
| Vector search / RAG | pgvector on PostgreSQL | Embeddings and retrieval when introduced |
| Background work | Async processing; Redis/worker only when needed | Long-running CV and AI jobs must not block HTTP requests |
| Containers | Docker and Docker Compose | Reproducible local development and later deployment |
| Deployment | Existing VPS | Later deployment target; no new paid hosting |

**Important:** Redis is a later, conditional addition—not a requirement for the first database connection or initial API foundation. Use a reliable background-job design when implementing asynchronous CV processing.

### 2.4 Architecture rules

1. **Next.js is the presentation layer.** It renders the recruiter interface and calls backend APIs; it must not own trusted business rules.
2. **FastAPI is the business-logic and authorization boundary.** It validates requests, enforces organization membership and permissions, coordinates workflows, and accesses protected data.
3. **The frontend must be a real product interface, not just an API demo.** Use reusable components, consistent design tokens, responsive layouts, accessible interactions, typed API contracts, and complete loading, empty, success, and error states.
4. **Keep frontend and backend responsibilities separate.** The frontend may validate for usability, but the backend must repeat all security-sensitive validation and enforce permissions.
5. **PostgreSQL is the source of truth** for structured application data.
6. Derive organization scope from the authenticated identity and verified membership. Never trust a browser-supplied `organization_id` as proof of access.
7. Enforce tenant isolation in backend queries and add database-level protections such as Row Level Security where appropriate.
8. Never expose database passwords, Supabase service-role/secret keys, or other server secrets in frontend code or Git. Browser code may use only explicitly public client configuration and keys, with appropriate RLS.
9. Use asynchronous processing for long-running CV parsing and AI tasks: accept and validate the request, store the file, create a job, return promptly (for example, HTTP 202), process in the background, and expose job status to the frontend.
10. AI agents must receive only the minimum authorized data and tools needed for their task. Do not give agents unrestricted database or cross-tenant access.
11. Add human approval for consequential recruiter actions. Keep explanations, audit records, and traceability for AI-assisted recommendations.
12. Build privacy, security, bias evaluation, and access controls into the product rather than treating them as optional final polish.

### 2.5 Frontend product-quality rules

- Use Next.js App Router, React, and TypeScript; keep components focused and reusable.
- Organize the UI by product feature/domain (for example, dashboard, jobs, candidates, CV processing, interviews, and settings) rather than placing all components in one large directory.
- Establish a small design system early: typography, spacing, colors, borders, buttons, inputs, badges, tables, dialogs, navigation, and responsive breakpoints.
- Build responsive layouts for desktop and tablet, with usable mobile behavior for essential recruiter tasks.
- Use semantic HTML, keyboard-accessible controls, visible focus states, sensible labels, and accessible dialog/menu behavior.
- Centralize API communication in a typed client layer. Do not scatter raw `fetch` calls or duplicate endpoint definitions throughout components.
- Keep authentication/session handling secure. Never put server secrets or service-role credentials in browser bundles.
- Represent all important request states: loading, empty, success, validation error, permission error, network/server error, and retry where appropriate.
- Use optimistic updates only when safe and provide a clear recovery path if the server rejects the change.
- Keep forms validated and understandable; show field-level errors and prevent accidental duplicate submissions.
- Use pagination or server-side filtering for potentially large candidate and job lists.
- Add frontend tests for critical interactions and API-state behavior; verify responsive layouts and accessibility basics.
- Prefer a coherent, usable MVP over decorative complexity. Avoid adding a heavy UI library or state-management dependency without a demonstrated need.

### 2.6 AI cost and safety rules

- Track usage by organization and workflow, including model, tokens, and estimated cost where available.
- Set configurable per-organization budgets, usage limits, token limits, concurrency limits, and maximum agent/tool-call counts.
- Use model routing and bounded retries; prevent runaway loops.
- Reserve and settle usage safely so concurrent requests cannot overspend an organization's allowance.
- Provide graceful quota-exhaustion behavior using a mock/fallback provider.
- Candidate matching must provide evidence and explanations; it must not infer protected characteristics or make autonomous hiring decisions.
- Evaluate quality, bias, privacy, and failure cases before presenting AI outputs as recruiter-facing recommendations.

### 2.7 Repository and naming conventions

**Intended repository layout (target):**

```text
hireflow-ai/
├── backend/
│   ├── pyproject.toml
│   ├── uv.lock
│   ├── .python-version
│   ├── .env                 # local only; never commit
│   ├── .env.example         # safe variable names/placeholders only
│   ├── src/
│   │   └── hireflow/
│   │       ├── __init__.py
│   │       ├── main.py
│   │       ├── config.py
│   │       ├── db.py
│   │       └── api/
│   │           ├── __init__.py
│   │           └── routes/
│   │               ├── __init__.py
│   │               └── health.py
│   ├── scripts/
│   └── tests/
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── app/                 # Next.js App Router routes and layouts
│   │   ├── components/          # shared UI components/design system
│   │   ├── features/            # domain-specific feature modules
│   │   ├── lib/                 # typed API client and shared utilities
│   │   └── types/               # shared frontend types
│   └── ...
├── infra/
│   └── docker/
├── docs/
│   ├── PROJECT_STATE.md
│   ├── PRD.md
│   └── architecture/
└── README.md
```

The backend was initialized separately under `backend/`, and its Git repository was created there by `uv init`. The intended end state is one Git repository at `hireflow-ai/` containing backend, frontend, infrastructure, and documentation. **Repository consolidation is still pending; do not move or delete Git metadata without first checking the current repository state.**

**Backend conventions currently established:**

- Distribution/project name: `hireflow-backend` (if retained in `pyproject.toml`); Python import package: `hireflow`.
- Source layout: `backend/src/hireflow/`.
- FastAPI application entry point: `hireflow.main:app`.
- Configuration module: `hireflow.config`; shared settings object: `settings`.
- Database module: `hireflow.db`; shared async engine: `engine`; session factory: `SessionLocal`; dependency: `get_db`.
- API route modules live under `hireflow/api/routes/`.
- Use `APIRouter` per route module and export routers through package `__init__.py` files.
- Use lowercase `snake_case` for Python modules, functions, variables, and database columns; use `PascalCase` for Python classes.
- Use clear, domain-oriented names for tables, models, schemas, services, and routes.
- Keep secrets in `.env`; commit only `.env.example` with placeholder values.
- `.gitignore` must ignore `.env`, `.env.*`, and `.venv/`, while allowing `.env.example`.

**Current backend files created:**

```text
backend/
├── .gitignore
├── .python-version
├── README.md
├── pyproject.toml
├── uv.lock
├── src/
│   └── hireflow/
│       ├── __init__.py
│       ├── main.py
│       ├── config.py
│       └── api/
│           ├── __init__.py
│           └── routes/
│               ├── __init__.py
│               └── health.py
└── scripts/
    └── check_db.py             # created for the connection test
```

The connection test succeeded when run from `backend/` with `uv run python src/scripts/check_db.py`; output: `Database connection successful!` and `Query result: 1`. The script currently resides at `src/scripts/check_db.py`, although the intended long-term location is `backend/scripts/check_db.py`; relocation remains a small cleanup item.

**Latest backend verification (2026-11-08):** The user ran `uv run uvicorn hireflow.main:app --reload` from `backend/`. Uvicorn reported application startup complete; `GET /` and `GET /health` both returned `200 OK`; Ctrl+C triggered application shutdown complete. Browser requests for `/favicon.ico` returned `404`, which is harmless until a favicon is added. The user reviewed and shared the current `main.py`, `db.py`, and `config.py`; review found no blocking issues. Import ordering in `main.py` can be cleaned up as a style improvement. `git check-ignore .env` returned `.env`; `git status --short` showed `.gitignore`, `.python-version`, `README.md`, `pyproject.toml`, `src/`, and `uv.lock` as untracked, with `.env` absent. The backend Git repository is therefore initialized but its initial files have not yet been committed (based on the reported status).

## 3. Day-by-Day Checklist

Status labels: **Completed**, **In Progress**, **Not Started**. Update individual task statuses as work is reviewed and accepted.

### Day 1 — Architecture & Foundations

**Status: In Progress**

- [x] D01.1 — Understand HireFlow workflow and high-level architecture. **Completed**
- [x] D01.2 — Define frontend/backend responsibilities. **Completed**
- [x] D01.3 — Understand multi-tenancy and authorization boundaries. **Completed**
- [x] D01.4 — Understand asynchronous processing for long-running work. **Completed**
- [x] D01.5 — Assess development machine and local tooling. **Completed**
- [x] D01.6 — Initialize Python backend with `uv` and dependencies. **Completed**
- [x] D01.7 — Create and run FastAPI foundation with root, health, and docs endpoints. **Completed**
- [x] D01.8a — Create Supabase project and choose the Singapore region. **Completed**
- [x] D01.8b — Configure local environment loading and install SQLAlchemy, asyncpg, and python-dotenv. **Completed**
- [x] D01.8c — Verify the real Supabase PostgreSQL connection using `src/scripts/check_db.py`. **Completed** — real async PostgreSQL connection succeeded; query returned `1`.
- [x] D01.8d — Review database connection lifecycle and secure configuration. **Completed** — reviewed `main.py`, `db.py`, and `config.py`; confirmed FastAPI lifespan disposes the shared async engine on shutdown, request-scoped sessions close through `async with`, transaction commits remain explicit in service/business logic, and `.env` is ignored by Git. Uvicorn startup, `/`, `/health`, and graceful shutdown were verified.
- [ ] D01.9a — Initialize the Next.js App Router project with React and TypeScript. **Next task; first inspect the project-root repository/layout before creating or moving files.**
- [ ] D01.9b — Configure Tailwind CSS and establish initial design tokens (typography, spacing, colors, breakpoints).
- [ ] D01.9c — Create the frontend folder structure, root layout, shared navigation, and responsive application shell.
- [ ] D01.9d — Build the first dashboard shell with reusable cards, buttons, form controls, tables, badges, and feedback components.
- [ ] D01.9e — Create a typed API client foundation for communicating with FastAPI; configure environment variables safely.
- [ ] D01.9f — Add representative loading, empty, error, and success states; verify keyboard access and responsive behavior.
- [ ] D01.10 — Integrate and review the Day 1 backend/frontend foundations; document decisions and commit the working baseline.

### Day 2 — Automation & Integrations

**Status: Not Started**

- [ ] D02.1 — Understand automation architecture and event-driven workflows.
- [ ] D02.2 — Learn and implement webhooks.
- [ ] D02.3 — Integrate external APIs and handle errors, retries, and timeouts.
- [ ] D02.4 — Understand OAuth 2.0 and secure credential handling.
- [ ] D02.5 — Introduce n8n using a free/local setup.
- [ ] D02.6 — Build a HireFlow integration workflow.
- [ ] D02.7 — Test idempotency, retry behavior, logging, and failure handling.

### Day 3 — LLM Engineering

**Status: Not Started**

- [ ] D03.1 — Understand LLMs, inference providers, model limits, and token usage.
- [ ] D03.2 — Configure a provider-independent AI adapter with Groq Free.
- [ ] D03.3 — Design prompts and structured outputs.
- [ ] D03.4 — Implement function/tool calling with strict schemas and permissions.
- [ ] D03.5 — Build the CV parsing workflow.
- [ ] D03.6 — Build candidate matching with evidence and explanations.
- [ ] D03.7 — Add mock-provider fallback, usage tracking, and basic evaluation.

### Day 4 — AI Agents & Orchestration

**Status: Not Started**

- [ ] D04.1 — Understand agents, tools, state, and orchestration boundaries.
- [ ] D04.2 — Learn LangGraph fundamentals.
- [ ] D04.3 — Design bounded HireFlow agent workflows.
- [ ] D04.4 — Implement interview question and scorecard generation.
- [ ] D04.5 — Implement scheduling/communication workflow prototypes.
- [ ] D04.6 — Add human approval and safe tool permissions.
- [ ] D04.7 — Test agent failures, loops, retries, and state transitions.

### Day 5 — RAG & MCP

**Status: Not Started**

- [ ] D05.1 — Understand embeddings, vector search, and retrieval-augmented generation.
- [ ] D05.2 — Enable and understand pgvector in Supabase PostgreSQL.
- [ ] D05.3 — Design document chunking, metadata, and retrieval.
- [ ] D05.4 — Implement a grounded retrieval workflow.
- [ ] D05.5 — Understand the Model Context Protocol (MCP).
- [ ] D05.6 — Build a small HireFlow MCP server/tool integration.
- [ ] D05.7 — Evaluate retrieval quality, access boundaries, and data leakage risks.

### Day 6 — Frontend Product Build, Voice AI & Integration

**Status: Not Started**

**Frontend focus: turn the Day 1 UI foundation into a coherent recruiter-facing MVP.**

- [ ] D06.1 — Define the main recruiter journeys and navigation: dashboard, jobs, candidates, candidate detail, interviews, and settings.
- [ ] D06.2 — Build the responsive dashboard overview with useful metrics, recent activity, and actionable empty states.
- [ ] D06.3 — Build job management screens: job list, create/edit form, job details, status, and candidate pipeline entry points.
- [ ] D06.4 — Build candidate management screens: searchable/filterable/paginated list, candidate profile, CV preview/download, and parsing status.
- [ ] D06.5 — Build CV upload and processing UX: file validation, upload progress, queued/processing/completed/failed states, and retry.
- [ ] D06.6 — Build candidate matching and review UI with evidence, explanations, uncertainty/limitations, and recruiter-controlled decisions.
- [ ] D06.7 — Build interview preparation and scorecard review screens; keep generated suggestions editable and subject to human approval.
- [ ] D06.8 — Integrate frontend screens with typed FastAPI APIs, authentication/session handling, and appropriate permission/error states.
- [ ] D06.9 — Add speech-to-text/text-to-speech exploration and a voice interaction prototype only if a genuinely free option is available.
- [ ] D06.10 — Add application logging/basic monitoring and test key end-to-end workflows, responsive behavior, accessibility, and graceful failure states.

**Frontend quality gate:** the core recruiter journey must be usable end-to-end; important screens must handle loading, empty, success, validation, permission, and server/network error states; layouts must work at desktop and tablet widths and remain usable on mobile.

### Day 7 — Production Readiness & Portfolio

**Status: Not Started**

- [ ] D07.1 — Review authentication, authorization, tenant isolation, and secrets handling.
- [ ] D07.2 — Add tests for core workflows, permissions, and failure cases.
- [ ] D07.3 — Evaluate AI quality, explainability, privacy, and bias risks.
- [ ] D07.4 — Review usage accounting, budgets, rate limits, and cost controls.
- [ ] D07.5 — Containerize and verify the application with Docker Compose.
- [ ] D07.6 — Deploy to the existing VPS without introducing paid services.
- [ ] D07.7 — Write setup, architecture, API, and operational documentation.
- [ ] D07.8 — Prepare the GitHub portfolio case study and demo.

## 4. Current Status & Next Step

### 4.1 Overall progress

| Area | Status | Notes |
|---|---|---|
| Day 1 — Architecture & Foundations | **In Progress** | Architecture, backend foundation, Supabase connectivity, database lifecycle review, and secure `.env` ignore verification are complete. Next: inspect the project-root repository/layout, then begin the Next.js foundation. |
| Day 2 — Automation & Integrations | **Not Started** | Do not begin until Day 1 is reviewed and completed. |
| Day 3 — LLM Engineering | **Not Started** | Use Groq Free within limits and retain mock fallback. |
| Day 4 — AI Agents & Orchestration | **Not Started** | Use bounded workflows and human approval. |
| Day 5 — RAG & MCP | **Not Started** | Use Supabase PostgreSQL/pgvector where appropriate. |
| Day 6 — Frontend Product Build, Voice AI & Integration | **Not Started** | Build the recruiter-facing MVP; voice is optional and must use no-cost options. |
| Day 7 — Production Readiness & Portfolio | **Not Started** | Deploy to the existing VPS after local validation. |

### 4.2 Completed foundation

- HireFlow AI is the locked capstone project and its high-level architecture has been agreed.
- The user has reviewed frontend/backend responsibilities, multi-tenancy, and asynchronous processing.
- Development environment and hardware constraints have been assessed.
- A Python 3.12 FastAPI backend has been initialized using `uv`.
- Root, health, and OpenAPI documentation endpoints were run and tested successfully.
- A Supabase project named `hireflow-ai-dev` was created in the Singapore region.
- SQLAlchemy, asyncpg, greenlet, python-dotenv, and Pydantic Settings are installed.
- `.env` is ignored by Git, and the settings loader successfully reads `DATABASE_URL` without printing its value.

### 4.3 Immediate next step

**Begin D01.9a only after inspecting the existing repository and project-root layout.** From `~/projects/hireflow-ai` (not `backend/`), run:

```bash
pwd
ls -la
```

The user should share both command outputs. Use them to decide how to organize the frontend and backend together without disturbing the existing Git repository inside `backend/`. Do not move or delete Git metadata before inspecting the actual repository state. D01.8d is complete; the only noted cleanup items are the optional import-order cleanup in `main.py` and deciding whether to relocate `src/scripts/check_db.py` to `backend/scripts/check_db.py`.

### 4.4 Session handoff rules

At the beginning of each future session:

1. Read this `PROJECT_STATE.md` before proposing the next implementation task.
2. Check the actual repository and files when the document's state may be stale; the document is the plan, not proof that code exists or works.
3. Resume from the earliest incomplete task in the current day.
4. Give one focused task at a time, with clear explanation and a practical verification step.
5. Review the user's result before marking a task complete or moving forward.
6. Update this document's checklist, current status, decisions, and next step after meaningful progress.
7. Preserve locked decisions and no-paid-tools constraints unless the user explicitly changes them.
