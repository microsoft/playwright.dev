import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/python/');
})

test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.locator('text=Get Started');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/python/docs/intro');

  // Click the get started link.
  await getStarted.click();

  await expect(page.locator('text=pytest-playwright')).toBeVisible();
});
