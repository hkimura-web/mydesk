# MYDESK — Teaching Workspace

MYDESK is a teaching-centered personal workspace. The GPT Edition introduces a new persistent left sidebar, a calmer navy/white visual system, a lesson-first daily dashboard, and a shared editing experience while retaining the established lesson and work-management functions.

## Design principle

- **New MYDESK experience:** left navigation, persistent workspace shell, date/term controls, lesson-first home screen, compact cards, responsive layout, unified dialogs, and a keyboard-first Quick Access palette (Ctrl/⌘+K or /).
- **Retained functional foundation:** the original `myClassBlueprint.log` lesson-management and work-management engine is kept. The original plan, grid/list, unit management, summaries, lesson status editing, automatic plan shifting after cancellations, carry-forward, reminders, material links, task management, annual work, link library, procedure notes, calendar export, backup/import, and GitHub synchronization remain available.
- **No feature removal policy:** features are retained by default. Any proposed removal or material behavior change should be discussed and approved first.

## Included data and resources

`data/index.json` indexes the supplied term backups: 2024-2, 2024-3, 2025-1, 2025-2, 2025-3 and 2026-2. The six lesson JSON files are copied without rewriting their lesson records. The previous MYDESK portal is retained under `portal/` and can be opened from the sidebar at 「ポータル資料・過年度」. Quick Access supports searching and switching among all main sections, and can open the annual task creation dialog. It preserves its resource search, year archives and favorites.

## MYDESK interface additions

- The Today dashboard places today’s lesson schedule first, with today’s work tasks alongside it on wide screens and below it on smaller screens.
- The lesson progress, upcoming week, and upcoming events remain below the main daily workspace.
- Quick Access can be opened from the top bar, with `Ctrl+K` / `⌘+K` or `/`. Use the arrow keys and Enter to navigate.
- The mobile sidebar has a backdrop and closes after navigation or Escape.

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/ . Do not open `index.html` directly as a file, because the app loads JSON data with `fetch()`.

## GitHub Pages and synchronization

Upload the **contents of this folder** to the repository root (so `index.html` is at the repository root). Enable GitHub Pages from the `main` branch / root. In MYDESK, open 「同期・設定」 and enter a fine-grained GitHub token restricted to this repository with Contents read/write permission. The token stays in the browser's local storage; configure each device separately.

The work-management data file `data/work.json` is created automatically from the built-in seed when first used. Lesson changes are stored in their respective `data/*.json` files.

## Privacy

GitHub Pages hosted from a public repository is publicly accessible. The supplied lesson data includes class schedules and classroom/resource links. Keep the repository private unless you have reviewed all files and confirmed they are safe to publish. Do not publish student names, grades, personal details, or confidential school information.

## Data safety

- Original supplied term JSON backups are retained under `data/`.
- The previous portal is retained under `portal/`.
- Export backups regularly, especially before making structural changes or connecting a new device.
