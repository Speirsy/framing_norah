import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeasonalTheme from './SeasonalTheme';

test('enabled theme adds one decorative background without changing children', () => {
  const view = render(<SeasonalTheme enabled><p>Existing page content</p></SeasonalTheme>);
  expect(view.container.querySelector('.site-theme')).toHaveClass('site-theme--christmas');
  expect(view.container.querySelectorAll('.seasonal-background')).toHaveLength(1);
  expect(view.container.querySelector('.seasonal-background')).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByText('Existing page content')).toBeInTheDocument();
  expect(screen.queryByRole('group', { name: 'Local Christmas preview' })).not.toBeInTheDocument();
});
test('turning the theme off removes decoration and preserves page content', () => {
  const view = render(<SeasonalTheme enabled><p>Existing page content</p></SeasonalTheme>);
  view.rerender(<SeasonalTheme enabled={false}><p>Existing page content</p></SeasonalTheme>);
  expect(view.container.querySelector('.site-theme')).not.toHaveClass('site-theme--christmas');
  expect(view.container.querySelector('.seasonal-background')).toBeNull();
  expect(screen.getByText('Existing page content')).toBeInTheDocument();
});
