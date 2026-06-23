import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url'; 
import {mockMetadataResponse} from '../fixtures/mockData'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




test('file upload extracts metadata', async ({ page }) => {
    // In CI environments mock the API — locally runs as true E2E against the real Go API
  if (process.env.CI) {
    await page.route('**/extract', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMetadataResponse)
      });
    });
  }

  await page.goto('/'); // baseURL handles full path

  const fileInput = page.locator('input[type="file"]');
  const filePath = path.resolve(__dirname, '../fixtures/SampleVideo_1280x720_1mb.mp4');

  await fileInput.setInputFiles(filePath);
  await page.locator('button:has-text("Upload")').click();

await expect(page.getByTestId('metadata-list')).toContainText('Duration');
});