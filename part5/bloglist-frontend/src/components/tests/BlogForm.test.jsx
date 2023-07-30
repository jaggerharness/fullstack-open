import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlogForm from '../BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> calls the event handler with correct data', async () => {
  const handleCreateBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm handleCreateBlog={handleCreateBlog} />);

  const titleInput = screen.getByPlaceholderText('Input Title');
  const authorInput = screen.getByPlaceholderText('Input Author');
  const urlInput = screen.getByPlaceholderText('Input URL');
  const submitButton = screen.getByText('Submit');

  await user.type(titleInput, 'Test Title');
  await user.type(authorInput, 'Test Author');
  await user.type(urlInput, 'Test URL');
  await user.click(submitButton);

  expect(handleCreateBlog.mock.calls).toHaveLength(1);
  expect(handleCreateBlog.mock.calls[0][0].title).toBe('Test Title');
  expect(handleCreateBlog.mock.calls[0][0].author).toBe('Test Author');
  expect(handleCreateBlog.mock.calls[0][0].url).toBe('Test URL');
});
