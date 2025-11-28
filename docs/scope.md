# data-peek v1.0 Scope Document

> A minimal, fast, beautiful Postgres client for developers who want to quickly peek at their data.

## Target User

Developers who need a lightweight alternative to pgAdmin/DBeaver for day-to-day queries.

## Core Principles

- **Simple over feature-rich** — Do less, but do it well
- **Fast to open, fast to query** — No bloat
- **Keyboard-first** — Power users shouldn't need a mouse

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Desktop | Electron | Community, TS-native, contributor-friendly |
| Frontend | React + TypeScript | Industry standard, type safety |
| Bundler | electron-vite | Fast, modern, great DX |
| UI | shadcn/ui + Tailwind | Beautiful, accessible, customizable |
| State | Zustand | Simple, minimal boilerplate |
| Query Editor | Monaco | VS Code engine, excellent SQL support |
| Local Storage | SQLite (better-sqlite3) | Query history, cached schemas |
| Config | electron-store | Encrypted connection credentials |
| Database Client | pg | Native Postgres driver |

---

## In Scope (v1.0)

### Connection Management

- [x] Add new Postgres connection (host, port, database, user, password)
- [x] Edit existing connection
- [x] Delete connection
- [x] Test connection before saving
- [x] Encrypted credential storage (electron-store)
- [x] Connection list in sidebar
- [x] SSL connection support (basic)

### Query Editor

- [x] Monaco editor with SQL syntax highlighting
- [x] Single query tab (multi-tab is v1.1) — *Actually implemented multi-tab!*
- [x] Run query: `Cmd/Ctrl + Enter`
- [ ] Clear editor: `Cmd/Ctrl + L`
- [x] Basic error display with message

### Results Viewer

- [x] Table view with columns and rows
- [x] Column headers with data type indicators
- [x] Row count and query duration display
- [x] Client-side pagination (100 rows per page)
- [x] Copy cell value on click
- [x] Copy row as JSON
- [x] Export results to CSV
- [x] Export results to JSON
- [x] NULL value indicator styling

### Schema Explorer

- [x] Tree view: Connection → Schemas → Tables/Views
- [x] Show columns under each table:
  - Column name
  - Data type
  - Nullable indicator
  - Primary key indicator
- [x] Click table name to insert into editor
- [x] Refresh schema button
- [x] Collapse/expand nodes

### Query History

- [x] Auto-save last 100 executed queries (local SQLite)
- [x] Store: query text, timestamp, duration, row count
- [x] Display in sidebar panel
- [x] Click to load query into editor
- [x] Clear history option
- [x] Persist across sessions

### UI/UX

- [x] Dark mode only (light mode is v1.1) — *Actually implemented light mode + system preference!*
- [x] Resizable sidebar (drag handle)
- [x] Loading states for queries
- [x] Empty states with helpful messages
- [x] Error states with clear messaging
- [x] Keyboard shortcuts:
  - `Cmd/Ctrl + Enter` — Run query
  - `Cmd/Ctrl + S` — Save query to file
  - `Cmd/Ctrl + O` — Open query from file
  - `Cmd/Ctrl + ,` — Open settings

### Platform Support

- [x] macOS build (DMG, Apple Silicon + Intel)
- [x] Linux build (AppImage)
- [x] Windows build (exe/msi)

---

## Out of Scope (v1.0)

These features are explicitly deferred to future versions. When tempted to add them, resist.

| Feature | Target Version | Status |
|---------|----------------|--------|
| Multiple query tabs | v1.1 | ✅ Done |
| MySQL adapter | v1.1 | |
| SQLite adapter | v1.1 | |
| Light theme | v1.1 | ✅ Done |
| Connection groups/folders | v1.1 | |
| Autocomplete (tables/columns) | v1.2 | ✅ Done (schema-aware) |
| Query formatting/beautify | v1.2 | ✅ Done |
| Saved queries / snippets library | v1.2 | |
| SSH tunnel connections | v1.2 | |
| Query cancellation | v1.2 | |
| Table data editing (inline UPDATE/INSERT) | v2.0 | ✅ Done |
| ER diagram visualization | v2.0 | ✅ Done |
| Query EXPLAIN/ANALYZE visualizer | v2.0 | ✅ Done |
| Import data from CSV | v2.0 | |
| Database diff tool | v2.0 | |
| Cloud sync (connections, history) | Pro | |
| Team workspaces | Pro | |
| Shared query library | Pro | |
| SSO / SAML | Pro | |
| Audit logs | Pro | |

---

## Technical Boundaries

- **No ORM** — Raw `pg` client only, keep it simple
- **No server component** — Pure desktop app, no backend
- **No auth in v1** — Local app, no user accounts
- **No auto-updates in v1** — Manual download for updates
- **No telemetry** — Privacy first, no tracking

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Renderer Process (React)                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐│
│  │  Sidebar    │ │ Query Editor│ │     Results Viewer      ││
│  │  - Conns    │ │ (Monaco)    │ │  - Table/JSON/Export    ││
│  │  - Schema   │ │             │ │                         ││
│  │  - History  │ │             │ │                         ││
│  └─────────────┘ └─────────────┘ └─────────────────────────┘│
│                            │                                 │
│                    ┌───────▼───────┐                        │
│                    │   IPC Bridge   │                        │
│                    └───────┬───────┘                        │
└────────────────────────────┼────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────┐
│                    Main Process (Node.js)                    │
│                    ┌───────▼───────┐                        │
│                    │ Service Layer │                        │
│                    └───────┬───────┘                        │
│        ┌───────────────────┼───────────────────┐            │
│        ▼                   ▼                   ▼            │
│  ┌──────────┐       ┌──────────┐        ┌──────────┐       │
│  │Connection│       │  Query   │        │  Schema  │       │
│  │ Manager  │       │  Engine  │        │ Explorer │       │
│  └────┬─────┘       └────┬─────┘        └────┬─────┘       │
│       └──────────────────┼───────────────────┘              │
│                    ┌─────▼─────┐                            │
│                    │  Postgres │                            │
│                    │  Adapter  │                            │
│                    └───────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

---

## UI Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  data-peek                        [Connection: prod-db ▼]  [⚙️]  │
├────────────────┬─────────────────────────────────────────────────┤
│                │                                                 │
│  CONNECTIONS   │  SELECT * FROM users                            │
│  ├─ prod-db ●  │  WHERE created_at > '2024-01-01'                │
│  ├─ staging    │  LIMIT 100;                                     │
│  └─ local      │                                                 │
│                │                                        [▶ Run]  │
│  SCHEMA        ├─────────────────────────────────────────────────┤
│  ▼ public      │                                                 │
│    ├─ users    │  id │ name    │ email           │ created_at    │
│    ├─ orders   │  ───┼─────────┼─────────────────┼────────────── │
│    └─ products │  1  │ Alice   │ alice@test.com  │ 2024-01-15    │
│                │  2  │ Bob     │ bob@test.com    │ 2024-02-20    │
│  HISTORY       │  3  │ Carol   │ carol@test.com  │ 2024-03-10    │
│  ├─ SELECT ... │  ...                                            │
│  ├─ UPDATE ... ├─────────────────────────────────────────────────┤
│  └─ ...        │  ✓ 100 rows │ 24ms │ Page 1/10 │ [CSV] [JSON]   │
└────────────────┴─────────────────────────────────────────────────┘
```

---

## Milestones

### M1: Foundation
- [x] Electron app scaffolded with electron-vite
- [x] Monorepo structure with pnpm workspaces
- [x] Can connect to a Postgres database
- [x] Can run a hardcoded query and log results

### M2: Connection Management
- [x] Connection form UI (add/edit)
- [x] Connection list in sidebar
- [x] Test connection functionality
- [x] Encrypted storage with electron-store
- [x] Delete connection

### M3: Schema Explorer
- [x] Fetch and display schemas
- [x] Fetch and display tables per schema
- [x] Fetch and display columns per table
- [x] Tree view component with expand/collapse
- [x] Click to insert table name

### M4: Query Editor
- [x] Monaco editor integration
- [x] SQL syntax highlighting
- [x] Run query button
- [x] Keyboard shortcut (Cmd+Enter)
- [x] Error display

### M5: Results Viewer
- [x] Table component for results
- [x] Column headers
- [x] Pagination
- [x] Copy cell/row
- [x] Export to CSV
- [x] Export to JSON

### M6: Query History
- [x] SQLite setup for local storage
- [x] Auto-save executed queries
- [x] History list in sidebar
- [x] Click to load into editor
- [x] Clear history

### M7: Polish & Release
- [x] Keyboard shortcuts complete
- [x] Loading states
- [x] Error handling
- [x] Empty states
- [x] Build for macOS
- [x] Build for Linux
- [x] Build for Windows
- [ ] README with screenshots
- [ ] v1.0 release

---

## Success Criteria

v1.0 is complete when:

1. ✅ Can connect to a Postgres database
2. ✅ Can browse schema (schemas, tables, columns)
3. ✅ Can write and run SQL queries
4. ✅ Can view results in a table
5. ✅ Can export results to CSV/JSON
6. ✅ Query history persists across sessions
7. ✅ App opens in under 2 seconds
8. ✅ Feels snappy — no UI lag
9. ✅ Builds available for macOS, Linux, Windows

---

## Non-Goals

To keep scope tight, these are explicitly NOT goals for v1:

- Being a full database administration tool
- Competing with DataGrip/TablePlus on features
- Supporting every Postgres feature
- Having a plugin system
- Mobile support

---

## Open Source Strategy

### License
MIT — Maximum adoption, contributor-friendly.

### Contribution Guidelines
- PRs welcome for bug fixes and v1 scope items
- Features outside v1 scope will be reviewed for v1.1+
- All PRs require tests for new functionality

### Future Monetization (Post v1)
Open core model:
- Free: Everything in v1 scope, forever
- Pro: Cloud sync, team features, priority support

---

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-vite](https://electron-vite.org/)
- [Monaco Editor React](https://github.com/suren-atoyan/monaco-react)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [node-postgres (pg)](https://node-postgres.com/)

---

## Changelog

| Date | Change |
|------|--------|
| 2024-XX-XX | Initial scope document created |
| 2025-11-28 | Updated implementation status - v1.0 scope complete + bonus v2.0 features |

---

*Remember: When in doubt, leave it out. Ship v1, then iterate.*