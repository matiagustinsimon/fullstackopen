const { test, expect, beforeEach, describe } = require('@playwright/test')

const user = {name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen'}

const blog = {title: 'Luukkainen jornal', author: 'Matti Luukkainen', url: 'api.com'}

const sendLogin = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Create Blog' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const likesCounter = async (blogContainers) => {
  let numberArray = []
  for (let i = 0; i < blogContainers.length; i++) {
    const like = await blogContainers[i].getByTestId('likes-amount').innerText()
    numberArray.push(Number(like))
  }
  return numberArray
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: user
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await sendLogin(page, user.username, user.password)
      await expect(page.getByText(`${user.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await sendLogin(page, user.username, 'wrongPassword')
      await expect(page.getByText(`${user.name} logged in`)).not.toBeVisible()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await sendLogin(page, user.username, user.password)
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, blog.title, blog.author, blog.url)
      await expect(page.getByText(`a new blog ${blog.title} by ${blog.author} added`)).toBeVisible()
      const blogContainer = page.locator('.blog-container').filter({ hasText: blog.title })
      await expect(blogContainer).toBeVisible()
      await expect(blogContainer).toContainText(blog.title)
      await expect(blogContainer).toContainText(blog.author)
    })
    test('a like can be given', async ({ page }) => {
      await createBlog(page, blog.title, blog.author, blog.url)
      const blogContainer = page.locator('.blog-container').filter({ hasText: blog.title })
      const viewButton = blogContainer.getByRole('button', { name: 'view' })
      await viewButton.click()
      const likesCount = blogContainer.getByTestId('likes-amount')
      await expect(likesCount).toHaveText('0')
      await blogContainer.getByRole('button', { name: 'like' }).click()
      await expect(likesCount).toHaveText('1')
    })
    test('a user can delete his own blog', async ({ page }) => {
      await createBlog(page, blog.title, blog.author, blog.url)
      const blogContainer = page.locator('.blog-container').filter({ hasText: blog.title })
      const viewButton = blogContainer.getByRole('button', { name: 'view' })
      await viewButton.click()
      page.on('dialog', dialog => dialog.accept())
      await blogContainer.getByRole('button', { name: 'remove' }).click()
      await expect(blogContainer).not.toBeVisible()
    })
    test('a user can only remove his own blogs', async ({ page, request }) => {
      await createBlog(page, blog.title, blog.author, blog.url)
      const firstBlogContainer = page.locator('.blog-container').filter({ hasText: blog.title })
      await page.getByRole('button', { name: 'Log Out' }).click()
      const diferentUser = { name: 'matias', username: 'MatiasGamer', password: '1234' }
      await request.post('/api/users', { data: diferentUser })
      await sendLogin(page, diferentUser.username, diferentUser.password)
      await createBlog(page, 'blog Gamer', 'Matias gamer', 'gamer.com')
      const lastBlogContainer = page.locator('.blog-container').filter({ hasText: 'blog Gamer' })
      await firstBlogContainer.getByRole('button', { name: 'view' }).click()
      await expect(firstBlogContainer.getByRole('button', { name: 'remove' })).not.toBeVisible()
      await lastBlogContainer.getByRole('button', { name: 'view' }).click()
      await expect(lastBlogContainer.getByRole('button', { name: 'remove' })).toBeVisible()
    })
    test('blogs are arranged in the order according to the likes', async ({ page, request }) => {
      await request.post('/api/testing/create/10')
      await page.reload()
      await expect(page.locator('.blog-container').filter({ hasText: 'blog1' })).toBeVisible()
      const blogContainers = await page.locator('.blog-container').all()
      const likesArray = await likesCounter(blogContainers)
      expect(likesArray).toEqual(likesArray.toSorted((a, b) => b - a))
    })
  })
})