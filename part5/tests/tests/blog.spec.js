const { test, expect, beforeEach, describe } = require('@playwright/test')

const user = {name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen'}

const blog = {title: 'Luukkainen jornal', author: 'Matti Luukkainen', url: 'api.com'}

const sendLogin = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
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
      await page.getByRole('button', { name: 'Create Blog' }).click()
      await page.getByLabel('title').fill(blog.title)
      await page.getByLabel('author').fill(blog.author)
      await page.getByLabel('url').fill(blog.url)
      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.getByText(`a new blog ${blog.title} by ${blog.author} added`)).toBeVisible()
      const blogContainer = page.locator('.blog-container').filter({ hasText: blog.title })
      await expect(blogContainer).toBeVisible()
      await expect(blogContainer).toContainText(blog.title)
      await expect(blogContainer).toContainText(blog.author)
    })
  })
})