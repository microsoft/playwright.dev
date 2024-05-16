// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { exportAxeAsSarifTestResult } from './export-to-sarif';

test.describe('[passing examples] index.html', () => {
  for (const url of ['/', '/intro']) {
    test(`accessibility for ${url}`, async ({ page }) => {
      await page.goto(url);
      const accessibilityScanResults = await new AxeBuilder({ page })
        // This withTags directive restricts Axe to only run tests that detect known violations of
        // WCAG 2.1 A and AA rules (similar to what Accessibility Insights reports). If you omit
        // this, Axe will additionally run several "best practice" rules, which are good ideas to
        // check for periodically but may report false positives in certain edge cases.
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      await exportAxeAsSarifTestResult('index-h1-element.sarif', accessibilityScanResults);

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
