import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PhotoList from './PhotoList';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
});
test('preserves image sources, opens by button and restores focus after closing', () => {
  render(<PhotoList photos={[{ url: 'https://example.test/art.jpg', name: 'Gallery wall', description: 'Original description' }]} />);
  const image = screen.getByAltText('Gallery wall');
  expect(image).toHaveAttribute('src', 'https://example.test/art.jpg');
  expect(image).toHaveAttribute('loading', 'lazy');
  const opener = screen.getByRole('button', { name: 'Enlarge Gallery wall' });
  opener.focus();
  fireEvent.click(opener);
  const dialog = screen.getByRole('dialog', { name: 'Gallery wall' });
  expect(dialog).toHaveAttribute('open');
  expect(screen.getByText('Original description')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Close image' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(opener).toHaveFocus();
  fireEvent.click(opener);
  fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true, cancelable: true }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
