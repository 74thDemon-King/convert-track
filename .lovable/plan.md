

## Plan: Move IconRail to Top Horizontal Bar

### Changes

**1. Refactor `IconRail.tsx` to horizontal layout**
- Change from vertical `flex-col` to horizontal `flex-row` layout
- Set height instead of width (e.g., `h-14` instead of `w-16`)
- Remove vertical writing mode from "MeetingOps 2025" label, display it inline
- Move logo to left, nav icons horizontal, settings to right
- Replace separator from horizontal line to vertical divider
- Remove `min-w-[64px]`, add `w-full`

**2. Update `Index.tsx` layout**
- Change outer container from `flex` (row) to `flex flex-col`
- Place `<IconRail>` at the top, spanning full width
- Move it inside the header bar area (line 54), to the left of the search input — replacing the empty `<div />` placeholder
- The body below becomes `flex` row with sidebar + main content
- Remove IconRail as a standalone sibling; embed it in the header bar of the main card

**Specific layout structure:**
```text
┌─────────────────────────────────────────────────┐
│ [Logo] [icons...] MeetingOps 2025 | [Search]    │  ← top bar
├────────┬────────────────────────────┬───────────┤
│Sidebar │   Main Content             │Traceabil. │
│        │                            │           │
└────────┴────────────────────────────┴───────────┘
```

**3. Detailed edits:**

- **`IconRail.tsx`**: Rewrite container to `flex items-center h-auto gap-2 px-4`. Nav becomes `flex-row gap-1`. Label becomes horizontal with normal text orientation. Settings icon moves to end with `ml-auto`. Remove rounded corners and margin.
- **`Index.tsx`**: Remove `<IconRail>` from its current position (line 43). In the header bar (line 54), replace `<div />` with `<IconRail>`. Keep the search bar on the right. The outer div stays `flex` row for sidebar + main, but IconRail is now inside main's header.

