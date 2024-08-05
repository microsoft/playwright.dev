import { test, expect } from './baseTest';

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

  await expect(page.getByRole('heading', { name: 'Installing Playwright Pytest' })).toBeVisible();
});

test.describe('next switcher', () => {
  test('home -> next intro', async ({ page, switchToNext }) => {
    const getStarted = page.locator('text=Get Started');
    await expect(getStarted).toHaveAttribute('href', '/python/docs/intro');
    await expect(page).toHaveURL(/\/$/);

    await switchToNext();

    await expect(page).toHaveURL(/\/python\/docs\/next\/intro$/);
    await expect(page.locator('text=Get started by installing Playwright')).toBeVisible();
  });

  test('community -> next intro', async ({ page, switchToNext }) => {
    await page.goto('/python/community/welcome');
    await expect(page.locator('text=Welcome to the Playwright Community')).toBeVisible();
    await expect(page).toHaveURL(/\/python\/community\/welcome$/);

    await switchToNext();

    await expect(page).toHaveURL(/\/python\/docs\/next\/intro$/);
    await expect(page.locator('text=Get started by installing Playwright')).toBeVisible();
  });

  test('docs -> next docs', async ({ page, switchToNext }) => {
    await page.goto('/python/docs/locators');
    await expect(page.locator('text=locators represent a way to find')).toBeVisible();
    await expect(page).toHaveURL(/\/python\/docs\/locators$/);

    await switchToNext();

    await expect(page).toHaveURL(/\/python\/docs\/next\/locators$/);
    await expect(page.locator('text=locators represent a way to find')).toBeVisible();
  });

  test('api -> next api (with fragment)', async ({ page, switchToNext }) => {
    await page.goto('/python/docs/api/class-browser#browser-version');
    await expect(page.locator('text=Returns the browser version.')).toBeVisible();
    await expect(page).toHaveURL(/\/python\/docs\/api\/class-browser#browser-version$/);

    await switchToNext();

    await expect(page.locator('text=Returns the browser version.')).toBeVisible();
    await expect(page).toHaveURL(/\/python\/docs\/next\/api\/class-browser#browser-version$/);
  });
});