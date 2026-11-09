# LwTableGroup

> **Status:** implemented — layout row for standard table-cell items. Unit roadmap: [`ROADMAP.md`](./ROADMAP.md)

## Why it exists

Beacon's package table needed to show severity counts and status counts as
small icon+count groups inside a table cell. Both groups are the exact same
shape — N items, each an icon beside a count, same gaps — but were first
written as two page-local CSS classes (`beacon-package-counts` /
`beacon-package-counts__item`) duplicated for each group. That duplication is
the signal (per kit's CHECK FIRST) that the layout job belongs in a shared
unit, not a third page copy. `LwTableGroup` is that unit — same family as
[`LwButtonGroup`](../button-group/): a **layout-only** assembly, no product
data, no PF host (none fits; kit invents a plain one).

## What it can do

| Capability     | Notes                                                              |
| -------------- | -------------------------------------------------------------------- |
| Group row      | `LwTableGroup` — `inline-flex`, wraps, gap between items             |
| One item       | `LwTableGroupItem` — `inline-flex`, smaller gap between icon/content |
| Opt out of wrap | `noWrap` — keeps items on one line (default `false`, wraps)         |
| Children only  | Both are pure layout hosts — no `items` prop, no domain copy         |
| Kit host       | Plain `div` — PF has no "table group" component                      |

## How it works

- **Tier:** assembly under `assemblies/table-group/` (layout-only, like `LwButtonGroup`)
- **Composition:** `children` passthrough only on both exports — no slot-build cascade
- **Defaults:** `componentsConfig.tableGroup` (empty — PF-default pattern, no baseline yet)

## API

```tsx
import { LwTableGroup, LwTableGroupItem } from 'kit/components/assemblies';
import { LwTooltip } from 'kit/components/primitives';

<LwTableGroup>
  <LwTooltip content='Critical' position='top'>
    <LwTableGroupItem aria-label='Critical: 2' tabIndex={0}>
      <CriticalIcon />
      <span>2</span>
    </LwTableGroupItem>
  </LwTooltip>
</LwTableGroup>;
```

| Prop (`LwTableGroup`)     | Role                                                   |
| ------------------------- | ------------------------------------------------------- |
| `children?`                | N `LwTableGroupItem`s (or any inline content)           |
| `noWrap?`                  | Keeps items on one line instead of wrapping. Default `false`. The table cell's own `nowrap` modifier only sets `white-space` on the cell's text — it has no effect on this flex container, so a caller that needs the row to never wrap sets this instead |
| `className?` / host attrs | Merge onto the group's `div` root                        |

| Prop (`LwTableGroupItem`) | Role                                                   |
| -------------------------- | ------------------------------------------------------- |
| `children?`                | Icon + content for this one item                         |
| `className?` / host attrs | Merge onto the item's `div` root (e.g. `aria-label`, `tabIndex`) |

## Related

- Layout-assembly sibling: [`../button-group/`](../button-group/) (`LwButtonGroup`)
- First consumer: `src/Pages/Lightwell/Beacon/utils/packageTableRows.tsx` (severity counts, status counts)
