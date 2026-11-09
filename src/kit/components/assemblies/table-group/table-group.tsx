import type { HTMLAttributes, ReactNode } from 'react';

import {
  getLwTableGroupDefaults,
  mergeClassNames,
  mergeComponentProps,
} from 'kit/components/components.config';
import './table-group.css';

type LwTableGroupOwnedProps = {
  /**
   * Call-site owns the items. Pass N `LwTableGroupItem`s (or any inline
   * content) — this assembly does not invent product-shaped slots.
   */
  children?: ReactNode;
  /**
   * Keeps items on one line instead of wrapping to a second row. Opt-in for
   * a known-small, fixed item count (e.g. exactly one item per severity) —
   * the PF table cell's own `nowrap` modifier only affects text `white-space`
   * and has no effect on this flex container's own wrap behavior, so a
   * caller that needs the row to never wrap has to say so here instead.
   * Default `false` (wraps), matching the original page CSS this replaced.
   */
  noWrap?: boolean;
};

/** Layout host — children passthrough; paint in `table-group.css`. */
export type LwTableGroupProps = LwTableGroupOwnedProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * Kit **assembly** — row of standard items inside a table cell (icon+count
 * pairs, status chips, …). Layout only: gap / wrap in CSS. No domain wiring —
 * severities, statuses, and any other repeated count group share this instead
 * of each table inventing its own gap classes.
 */
export function LwTableGroup({ children, noWrap = false, className, ...rest }: LwTableGroupProps) {
  const props = mergeComponentProps(getLwTableGroupDefaults(), {
    ...rest,
    className: mergeClassNames('lw-c-table-group', noWrap ? 'lw-m-no-wrap' : undefined, className),
  });

  return <div {...props}>{children}</div>;
}

type LwTableGroupItemOwnedProps = {
  children?: ReactNode;
};

/** One item's layout host — icon/content passthrough; paint in `table-group.css`. */
export type LwTableGroupItemProps = LwTableGroupItemOwnedProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * One `LwTableGroup` item — icon beside its content (count, label, …), same
 * small gap everywhere it's used. Domain supplies the icon and content
 * (and any tooltip around the whole item); this only owns the pairing.
 */
export function LwTableGroupItem({ children, className, ...rest }: LwTableGroupItemProps) {
  return (
    <div {...rest} className={mergeClassNames('lw-c-table-group-item', className)}>
      {children}
    </div>
  );
}

export default LwTableGroup;
