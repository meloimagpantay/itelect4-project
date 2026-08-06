# itelect4-project — ITELECT4 class demo (Course Submission Tracker)

The running demo application for **ITELECT4 — IT Elective 4 (System Development)**,
De La Salle Lipa, AY 2026–2027. One project, carried forward every session, so the
class can see it grow into a complete app instead of starting over each week.

Students build their **own** app for GT1–GT6 using the same techniques — this repo is
the worked example shown in the lecture, not a template to copy.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # type-checks; run this before every push
```

`npm run dev` does **not** type-check — Vite transpiles without checking types. A file can
run fine in dev and still fail `npm run build`, so always build before pushing.

## Session history

Each session ends with one commit and one tag, so any past state can be recovered:

```bash
git checkout s5     # jump to the state Session 6 starts from
git checkout main   # come back
```

| Tag | Session | Date | What it adds |
|---|---|---|---|
| `s5` | Sessions 1–5 | Aug 1, 2026 | TS types, typed components, hooks, Tailwind CSS v4 |
| `s6` | Session 6 | Aug 8, 2026 | React Router v8, Layout + Outlet, URL params, Zustand auth guard |

## Current structure

```
src/
  App.tsx                  route table only — no UI
  main.tsx                 <BrowserRouter>
  components/
    Layout.tsx             nav bar, dark mode toggle, <Outlet />
    ProtectedRoute.tsx     auth guard (pathless layout route)
    UserCard  CourseCard  SubmissionBadge
  pages/                   Dashboard Courses CourseDetail Login Submissions NotFound
  hooks/                   useToggle  usePrevious
  store/authStore.ts       typed Zustand store (token, login, logout)
  data/mockData.ts         mock data shared across pages
  types/index.ts           the GT1 interfaces every file imports from
```

## Two things that bite

- **React Router is v8.** Import from `react-router`. The `react-router-dom` package was
  removed in v8 (June 2026) and no longer exists — nearly every tutorial online is out of date.
- **`"erasableSyntaxOnly": true` is removed from `tsconfig.app.json`.** The current Vite
  React+TS template ships it, and it throws **TS1294** on any `enum` — which every student
  has, from GT1. It fails `npm run build` but never `npm run dev`.

## Adding the next session

```bash
git add .
git commit -m "Session 7: Zustand store, TanStack Query"
git tag -a s7 -m "End of Session 7"
git push && git push --tags
```
