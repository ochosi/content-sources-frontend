# LwTableGroup — roadmap

**Scope of this file:** this unit only — `LwTableGroup` / `LwTableGroupItem`,
their job, API, and implementation phases.

**Not in this file:** `LwDataView` family roadmap (table/toolbar/column
decisions). Those live in [`../data-view/ROADMAP.md`](../data-view/ROADMAP.md).

**Prerequisite:** this roadmap + [`README.md`](./README.md) before unit
`*.tsx` / CSS. **Written retroactively** — the unit shipped (Beacon package
view, severity/status counts) before this doc did. Logged here, not silently
back-filled, so the gap is visible rather than erased.

---

## Job

A **layout-only row** for standard items inside a table cell — icon+count
pairs, status chips, any other small "N things side by side, same gap"
group. Layout assembly in the same family as `LwButtonGroup`
([`../button-group/`](../button-group/)): `children` only, no product-shaped
slots, paint in co-located CSS.

**Host:** plain `div` (`display: inline-flex`) — PF has no component for
this job, so kit invents a plain host per the usual rule ("kit invents plain
header host when PF has no equivalent").

**Why it exists:** Beacon's package table rendered severity counts and
status counts with two near-identical page-local classes
(`beacon-package-counts` / `beacon-package-counts__item` in
`lightwell-beacon.scss`) — the same "icon beside a count, small gap, items
wrapped and spaced" shape, written twice, in page CSS invisible to this
family. Per CHECK FIRST ("≥2 independent consumers hand-roll the same
workaround → promote, don't re-point"), that duplication was the signal to
promote the gap/layout job into a shared unit instead of a third page
reinventing it.

---

## Features (unit)

1. `LwTableGroup` — container; `inline-flex`, wraps, gap from
   `components.config.css` (`--lw-space--table-group-gap`)
2. `LwTableGroupItem` — one item; `inline-flex`, smaller gap between its own
   icon and content (`--lw-space--table-group-item-gap`)
3. Children passthrough only on both — domain supplies icon, count/label,
   and any tooltip around an item; this unit never sees product data
4. `LwTableGroup`'s `noWrap` — keeps items on one line. Added once Beacon's
   fixed-4-item severity-count column needed to never wrap, and the table
   cell's own `nowrap` modifier turned out not to reach this: PF's `Td`
   modifier only sets `white-space` on the cell's text, which has no effect
   on this unit's own `flex-wrap`. The wrap/no-wrap decision belongs to the
   assembly that owns the flex container, not the surrounding cell.

---

## Proposed API

```tsx
<LwTableGroup>
  <LwTooltip content='Critical' position='top'>
    <LwTableGroupItem aria-label='Critical: 2' tabIndex={0}>
      <CriticalIcon />
      <span>2</span>
    </LwTableGroupItem>
  </LwTooltip>
  {/* …one LwTableGroupItem per status/severity… */}
</LwTableGroup>
```

---

## Implementation phases (unit)

| Phase | Deliverable                                                   | Done when         |
| ----- | -------------------------------------------------------------- | ------------------ |
| T0    | README + this roadmap (retroactive)                             | This file exists   |
| T1    | `LwTableGroup` / `LwTableGroupItem` shells, co-located CSS       | Unit tests         |
| T2    | `componentsConfig.tableGroup` entry (empty — PF-default pattern) | Config cascade     |
| T3    | Product replace: Beacon package table severity + status counts  | Call sites swapped |
| T4    | `noWrap` prop + `.lw-m-no-wrap` class; applied to severity counts | Unit tests         |

**Progress:** T0–T4 complete. No second consumer yet — `componentsConfig.tableGroup`
stays empty until a real Lightwell baseline (not a guess) earns an entry.
