import React from 'react';
import { describe, test, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../Blog';

describe('Blog component tests', () => {
  let container;

  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'https://www.google.com',
    likes: 42,
    user: {
      username: 'jagger.dev',
      name: 'jagger',
      id: '12345',
    },
    id: '99999',
  };

  const user = {
    id: '12345',
  };

  const mockHandleBlogLiked = vi.fn();
  const mockHandleRemoveBlog = vi.fn();

  beforeEach(() => {
    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        handleBlogLiked={mockHandleBlogLiked}
        handleRemoveBlog={mockHandleRemoveBlog}
        user={user}
      />
    ).container;
  });

  test('Blog initially renders with url and likes hidden', () => {
    // Check for blog title and author
    const title = screen.findByText('Blog Title');
    const author = screen.findByText('Blog Author');

    // Verify that blogDetails are hidden initially
    const blogDetailDiv = container.querySelector('.blogDetail');
    const isHidden = blogDetailDiv.style.display === 'none';

    expect(title, author).toBeDefined();
    expect(isHidden).toBe(true);
  });

  test('After button click, blog details are shown', async () => {
    const user = userEvent.setup();
    const button = container.querySelector('.toggleDetailsBtn');
    await user.click(button);
    const blogDetailDiv = container.querySelector('.blogDetail');
    const isHiddenAfterClick = blogDetailDiv.style.display === 'none';
    // Verify details are shown
    expect(isHiddenAfterClick).toBe(false);
  });

  test('Event handler called multiple times, after multiple button clicks', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('Like');
    await user.click(button);
    await user.click(button);
    expect(mockHandleBlogLiked).toHaveBeenCalledTimes(2);
  });
});
