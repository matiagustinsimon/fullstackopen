import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogCreate from './BlogCreate'

const submitBlog = vi.fn()

describe('Blog form test', () => {
  beforeEach(() => {
    render( <BlogCreate submitBlog={submitBlog}/>)
  })
  test('Blog form', async () => {
    const user = userEvent.setup()
    const inputTitle = screen.getByLabelText('title')
    const inputAuthor = screen.getByLabelText('author')
    const inputUrl = screen.getByLabelText('url')
    const sendButton = screen.getByText('create')

    await user.type(inputTitle, 'testing a form...')
    await user.type(inputAuthor, 'testing author')
    await user.type(inputUrl, 'testing_form.com')

    await user.click(sendButton)

    expect(submitBlog.mock.calls).toHaveLength(1)

    expect(submitBlog.mock.calls[0][0]).toBe('testing a form...')
    expect(submitBlog.mock.calls[0][1]).toBe('testing author')
    expect(submitBlog.mock.calls[0][2]).toBe('testing_form.com')
  })
})