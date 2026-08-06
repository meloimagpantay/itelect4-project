# itelect4-project — Sessions 1–5 (class demo, starting point for Session 6)

The state of the ITELECT4 class demo at the **end of Session 5 (GT2 tagged)** — the exact code the
Session 6 lecture starts from. Use this to live-code Session 6 from the same place the students are.

Built line-for-line from the delivered `ITELECT4_Session5_TailwindCSS_UIPolish.pptx`, so it matches
what the class was told to type, not a hand-tidied version.

## Run it

```bash
npm install
npm run dev
```

## What is here

- `src/types/index.ts` — GT1 (Sessions 1–2)
- `src/components/` — `UserCard`, `CourseCard`, `SubmissionBadge` (Session 3, styled in Session 5)
- `src/hooks/` — `useToggle`, `usePrevious` (Session 4)
- `src/App.tsx` — **everything in one file**: mock data, all state, all JSX. This is the file
  Session 6 breaks apart.
- Tailwind CSS v4 already installed and wired (`@tailwindcss/vite` + `@import "tailwindcss";`)

## To start Session 6

```bash
npm install react-router zustand
```

Verified with `npx tsc -b --force` and `npm run build` — zero errors.

Note: `"erasableSyntaxOnly": true` is already removed from `tsconfig.app.json` (it throws TS1294
on GT1's enums).
