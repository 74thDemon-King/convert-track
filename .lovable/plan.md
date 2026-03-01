

## Plan: Restyle Left Sidebar + Move Dark Mode Toggle to Top Bar

### 1. Change left sidebar (`WorkflowSidebar.tsx`) background to `#2D2D2D`
- Replace `bg-sidebar` with a hardcoded `bg-[#2D2D2D]` on the `<aside>` element
- Update text colors within the sidebar to light variants for contrast (white/gray text on dark background)
- Update border, accent, badge, and muted colors inline to work on the dark background
- Remove the dark mode toggle section (lines 205-219)
- Remove `Moon`, `Sun` imports and `useTheme` hook from this file

### 2. Add dark mode toggle to top bar (`IconRail.tsx`)
- Import `Moon`, `Sun` from lucide-react and `useTheme` from `@/hooks/use-theme`
- Add a theme toggle button next to the Settings button (before or after it, right side)
- Style it consistently with the existing icon buttons

### 3. Files changed
- `src/components/dashboard/WorkflowSidebar.tsx` — dark background, remove theme toggle
- `src/components/dashboard/IconRail.tsx` — add theme toggle button

