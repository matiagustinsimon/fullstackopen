import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing props',
  author: 'T. Tester',
  url: 'test.com',
  likes: 0,
  user: { name: 'Admin', username: 'adminuser' }
}

const handleNewLike = vi.fn()

describe('Blog', () => {
  beforeEach(() => {
    render( <Blog
      blog={blog}
      blogs={[]}
      setBlogs={vi.fn()}
      setNotification={vi.fn()}
      user={{ username: 'testuser' }}
      handleNewLike={handleNewLike}
    /> )
  })
  test('renders only title and author', () => {
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
  test('after clicking the view button, url, likes and users are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const elementUrl = screen.getByText(/test.com/)
    expect(elementUrl).toBeVisible()
    const elementLikes = screen.getByText(/likes 0/)
    expect(elementLikes).toBeVisible()
    const elementUser = screen.getByText(/Admin/)
    expect(elementUser).toBeVisible()
  })
  test('after clicking the like button twice, 2 likes ', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(handleNewLike.mock.calls).toHaveLength(2)
    const elementLikes = screen.getByText(/likes 0/)
    expect(elementLikes).toBeVisible()
    const elementUser = screen.getByText(/Admin/)
    expect(elementUser).toBeVisible()
  })
})