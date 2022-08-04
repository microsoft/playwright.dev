import { test as _test, expect } from "@playwright/test";

const test = _test.extend<{ switchToNext: () => Promise<void>; basePath: string }>({
  switchToNext: async ({ page }, use) => {
    const switchToNext = async () => {
      for (let i = 0; i < 5; i++)
        await page.keyboard.press('Shift');
    };
    await use(switchToNext);
  },
});

export { expect, test };