import { test, expect } from './baseTest';

test.beforeEach(async ({page}) => {
  await page.goto('/');
})

test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.locator('text=Get Started');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

test('component testing has separate guides', { annotation: { type: 'issue', description: 'https://github.com/microsoft/playwright/issues/44328' } }, async ({ page }) => {
  for (const prefix of ['/docs', '/docs/next']) {
    await page.goto(`${prefix}/test-components-introduction`);
    const sidebar = page.locator('.theme-doc-sidebar-menu');
    const category = sidebar.locator('li.theme-doc-sidebar-item-category').filter({
      has: page.getByRole('button', { name: 'Component testing', exact: true }),
    });
    const guides = [
      ['Introduction', 'test-components-introduction', 'How it works'],
      ['Getting started', 'test-components-getting-started', 'Step 2: Configure Playwright'],
      ['Stories and testing patterns', 'test-components-stories', 'Record state for assertions'],
      ['Migration', 'test-components-migration', 'Migration from the experimental packages'],
      ['Frequently asked questions', 'test-components-faq', "How do I access the component's methods or its instance?"],
    ];
    await expect(category.getByRole('link')).toHaveCount(guides.length);
    for (const [title, id, heading] of guides) {
      await category.getByRole('link', { name: title, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/${id}$`));
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
      if (id === 'test-components-introduction') {
        await expect(page.getByRole('heading', { name: 'Step 2: Configure Playwright' })).toHaveCount(0);
        await expect(page.getByRole('link', { name: 'migration guide', exact: true })).toHaveAttribute('href', `${prefix}/test-components-migration#migration-from-the-experimental-packages`);
      }
    }
    await page.goto(`${prefix}/test-components#handling-network-requests`);
    await expect(page.getByRole('heading', { name: 'Handling network requests' })).toBeVisible();
  }
});

test.describe('next switcher', () => {
  test('home -> next intro', async ({ page, switchToNext }) => {
    const getStarted = page.locator('text=Get Started');
    await expect(getStarted).toHaveAttribute('href', '/docs/intro');
    await expect(page).toHaveURL(/\/$/);

    await switchToNext();

    await expect(page).toHaveURL(/\/docs\/next\/intro$/);
    await expect(page.locator('text=Get started by installing Playwright')).toBeVisible();
  });

  test('community -> next intro', async ({ page, switchToNext }) => {
    await page.goto('/community/welcome');
    await expect(page.locator('text=Welcome to the Playwright Community')).toBeVisible();
    await expect(page).toHaveURL(/\/community\/welcome$/);

    await switchToNext();

    await expect(page).toHaveURL(/\/docs\/next\/intro$/);
    await expect(page.locator('text=Get started by installing Playwright')).toBeVisible();
  });
  
  test('docs -> next docs', async ({ page, switchToNext }) => {
    await page.goto('/docs/locators');
    await expect(page.locator('text=locators represent a way to find')).toBeVisible();
    await expect(page).toHaveURL(/\/docs\/locators$/);

    await switchToNext();

    await expect(page).toHaveURL(/\/docs\/next\/locators$/);
    await expect(page.locator('text=locators represent a way to find')).toBeVisible();
  });

  test('api -> next api (with fragment)', async ({ page, switchToNext }) => {
    await page.goto('/docs/api/class-browser#browser-version');
    await expect(page.locator('text=Returns the browser version.')).toBeVisible();
    await expect(page).toHaveURL(/\/docs\/api\/class-browser#browser-version$/);

    await switchToNext();

    await expect(page.locator('text=Returns the browser version.')).toBeVisible();
    await expect(page).toHaveURL(/\/docs\/next\/api\/class-browser#browser-version$/);
  });
});
