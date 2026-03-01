const { test, expect, beforeEach, describe } = require('@playwright/test')

const user = {name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen'}

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
      await page.getByLabel('username').fill(user.username)
      await page.getByLabel('password').fill(user.password)
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText(`${user.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill(user.username)
      await page.getByLabel('password').fill('wrong-wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText(`${user.name} logged in`)).not.toBeVisible()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })
})