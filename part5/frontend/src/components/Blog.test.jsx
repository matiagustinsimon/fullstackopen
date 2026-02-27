import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'Testing props',
    author: 'T. Tester',
    url: 'test.com',
    likes: 0,
    user: { name: 'Admin', username: 'adminuser' }
  }
  render( <Blog
    blog={blog}
    blogs={[]}
    setBlogs={vi.fn()}
    setNotification={vi.fn()}
    user={{ username: 'testuser' }}
  /> )

  const elementTitle = screen.getByText(/Testing props T. Tester/)
  expect(elementTitle).toBeDefined()
  expect(elementTitle).toBeVisible()
  const elementUrl = screen.getByText(/test.com/)
  expect(elementUrl).not.toBeVisible()
  const elementLikes = screen.getByText(/0/)
  expect(elementLikes).not.toBeVisible()
  const elementUser = screen.getByText(/Admin/)
  expect(elementUser).not.toBeVisible()
})