# MYDESK — Teaching Workspace

MYDESK is the integrated main workspace. The Claude-built `myClassBlueprint.log` application is the functional foundation; its lesson-management, editing, carry-forward, reminder, backup, GitHub sync, work-management, calendar, link and document functions are retained. The main navigation has been redesigned as a persistent left sidebar, with the lesson dashboard as the default entry point.

## Included data

`data/index.json` indexes all supplied term backups: 2024-2, 2024-3, 2025-1, 2025-2, 2025-3 and 2026-2. The previous MYDESK portal is retained under `portal/` and can be opened from the sidebar as 「ポータル資料・過年度」. It preserves its year archives, search and favorites. Existing lesson JSON content is copied without rewriting its lesson records.

## Run locally

```bash
python3 -m http.server 8000
```
Open http://localhost:8000/ . Do not open `index.html` directly as a file.

## GitHub Pages / sync

Upload the contents of this folder to a GitHub repository. Enable Pages on `main` / root. In MYDESK Settings, enter a fine-grained GitHub token restricted to this repository with Contents read/write. The token stays in the browser's local storage. Each device needs its own token configuration.

## Privacy

GitHub Pages is public when hosted from a public repository. Do not publish student names, grades, personal details, or confidential school information. The provided lesson data contains class schedules and classroom links; review the repository visibility and contents before publishing. Consider a private hosting approach if any included material is not suitable for public access.

## Data safety

- Supplied term JSON backups are retained under `data/`.
- App-generated exports should be backed up regularly.
