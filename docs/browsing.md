# Browsing behavior

How the atlas frontend loads and filters data. The pipeline (`src/`) is
untouched by these notes — this only describes `frontend/src`.

## Progressive chunk loading

The catalog is split into `stars-001.json…N` (100 repos each). Browsing is
progressive by default:

- On load: `catalog.json` + the **first chunk only** (`store.ts`,
  `INITIAL_CHUNKS = 1`), then more chunks as the infinite sentinel scrolls
  into view (`hooks/useInfiniteScroll.ts`).
- As soon as a **narrowing filter** is active (search text, language,
  license, or visibility), the full dataset is fetched first
  (`useCatalogData.ts` → `store.ensureAllLoaded()`), so result counts and
  category pills always reflect the complete catalog, never a partial page.
- Category + sort alone never trigger a full fetch — they stay paginated.

The toolbar shows `Showing X of Y loaded` while partial, and switches to
`N repositories shown` once complete.

## Debounced search

The search input stays live for responsiveness, but filtering commits
250 ms after the last keystroke (`hooks/useDebouncedValue.ts`). Category
counts and the infinite-scroll pause use the debounced value, so fast
typing causes a single filter pass.

## Shortcuts and filter controls

- `/` focuses search (ignored while typing in a field), `Esc` clears it.
- Active filters render as removable chips (`FilterChips.tsx`); `Reset
  filters` / `Reset all` restores defaults (`store.INITIAL_FILTERS`).

## Layout contract

`layout.ts` owns the card geometry (`CARD_HEIGHT = 265`). `RepositoryCard`
renders at that height and `VirtualizedRepoGrid` reserves `ROW_HEIGHT`
per row — change the constant, never one side alone.

## Accessibility notes

- Skip-to-catalog link, `aria-live` result count, semantic `ul` / `li`
  across the virtualized grid (positioning wrappers are
  `role="presentation"`).
- `:focus-visible` lime ring for keyboard users (`styles.css`).
- The category strip is `position: sticky`; this is why `body` uses
  `overflow-x: clip` instead of `hidden` (hidden breaks sticky).
