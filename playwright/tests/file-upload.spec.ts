import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('file upload extracts metadata', async ({ page }) => {
  await page.goto('/'); // baseURL handles full path

  const fileInput = await page.locator('input[type="file"]');
  const filePath = path.resolve(__dirname, '../fixtures/SampleVideo_1280x720_1mb.mp4');

  await fileInput.setInputFiles(filePath);
  await page.locator('button:has-text("Upload")').click();

await expect(page.getByTestId('metadata-list')).toContainText('Duration');
});