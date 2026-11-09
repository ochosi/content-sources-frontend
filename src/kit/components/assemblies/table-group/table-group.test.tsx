import { render, screen } from '@testing-library/react';

import { LwTableGroup, LwTableGroupItem } from './table-group';

it('renders children in the table-group host', () => {
  render(
    <LwTableGroup>
      <LwTableGroupItem aria-label='Critical: 1'>1</LwTableGroupItem>
      <LwTableGroupItem aria-label='Important: 2'>2</LwTableGroupItem>
    </LwTableGroup>,
  );

  const group = document.querySelector('.lw-c-table-group');
  expect(group).toBeInTheDocument();
  expect(screen.getByLabelText('Critical: 1')).toBeInTheDocument();
  expect(screen.getByLabelText('Important: 2')).toBeInTheDocument();
  expect(group).toContainElement(screen.getByLabelText('Critical: 1'));
  expect(group).toContainElement(screen.getByLabelText('Important: 2'));
});

it('merges call-site className onto the group host', () => {
  const { container } = render(
    <LwTableGroup className='extra'>
      <span>child</span>
    </LwTableGroup>,
  );

  expect(container.firstChild).toHaveClass('lw-c-table-group');
  expect(container.firstChild).toHaveClass('extra');
});

it('wraps by default and opts out via noWrap', () => {
  const { container, rerender } = render(
    <LwTableGroup>
      <span>child</span>
    </LwTableGroup>,
  );
  expect(container.firstChild).not.toHaveClass('lw-m-no-wrap');

  rerender(
    <LwTableGroup noWrap>
      <span>child</span>
    </LwTableGroup>,
  );
  expect(container.firstChild).toHaveClass('lw-m-no-wrap');
});

it('merges call-site className onto an item host', () => {
  render(
    <LwTableGroupItem className='extra' aria-label='item'>
      content
    </LwTableGroupItem>,
  );

  const item = screen.getByLabelText('item');
  expect(item).toHaveClass('lw-c-table-group-item');
  expect(item).toHaveClass('extra');
});
